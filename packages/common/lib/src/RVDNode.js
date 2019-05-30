"use strict";

exports.__esModule = true;
exports.default = void 0;

var _util = require("util");

var _fs = _interopRequireDefault(require("fs"));

var _path = require("path");

var _Constants = require("./Constants");

var _UssdSay = _interopRequireDefault(require("./UssdSay"));

var _UssdCollectStep = _interopRequireDefault(require("./UssdCollectStep"));

var _LogStep = _interopRequireDefault(require("./LogStep"));

var _ExternalServiceStep = _interopRequireDefault(require("./ExternalServiceStep"));

var _ControlSteps = _interopRequireDefault(require("./ControlSteps"));

var _utils = require("./utils");

var _logger = _interopRequireDefault(require("./logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// create a promise version of the fs readFile
const freadAsync = (0, _util.promisify)(_fs.default.readFile);
const {
  debug,
  printinfo,
  printerror
} = (0, _logger.default)().getContext('rvd');

let RVDNode =
/**
 *Creates an instance of RVDNode.
 * @param {Object} options The options are session, cache (Redis), state, rvdjson (default)
 * @memberof RVDNode
 */
function RVDNode(options = {}) {
  _defineProperty(this, "readStates", async shortcode => {
    let retvalue = null;

    try {
      const rvdjs = await this.cache.get(shortcode);

      if (rvdjs) {
        return JSON.parse(rvdjs);
      }

      const {
        sid,
        workSpaceDir
      } = this.config;

      if (sid && workSpaceDir) {
        try {
          const spath = (0, _path.join)(workSpaceDir, sid, 'state');
          const result = await freadAsync(spath, 'utf8');
          await this.cache.set(shortcode, result);
          retvalue = JSON.parse(result);
        } catch (error) {
          printerror('ERROR: %s', error.message);
        }
      } else {
        printerror('Invalid SID or WORKSPACE_DIR');
      }
    } catch (error) {
      printerror('ERROR: %s', error.message);
    }

    if (retvalue) {
      return retvalue;
    }

    debug('................caching the shortcode to memory.................');
    await this.cache.set(shortcode, JSON.stringify(this.rvdjson));
    return this.rvdjson;
  });

  _defineProperty(this, "rvdProcess", async moduleName => {
    const {
      $core_From: msisdn,
      $cell_id: cellid,
      $shortcode
    } = this.data;
    const cRvd = await this.readStates($shortcode);
    const allnodes = cRvd.nodes.find(item => item.name === moduleName);
    const moduleLabel = allnodes ? allnodes.label : '';
    printinfo(`MODULE: ${moduleName}, NAME: ${moduleLabel}, MSISDN=${msisdn}, cellid=${cellid}`);

    if (!allnodes) {
      return {
        message: process.env.DefaultMsg,
        data: null,
        next: false
      }; // for the error message
    }

    let continueTo = null;
    const retmsg = {
      next: false,
      rvdmodule: {
        moduleName,
        moduleLabel
      }
    };
    const {
      steps
    } = allnodes; // process all the steps in the module. Check for each of the steps and call the
    // appropriate control to process it.
    // eslint-disable-next-line

    for (let i = 0; i < steps.length; i++) {
      const item = steps[i]; // need to stored in the database

      retmsg.rvdmodule.stepName = item.name;
      retmsg.rvdmodule.stepKind = item.kind;
      debug(`processing step: ${item.name || ''}, kind: ${item.kind}`); // process the ControlStep

      if (item.kind === _Constants.Kinds.control) {
        const ctrlStep = new _ControlSteps.default(); // eslint-disable-next-line

        const retdata = await ctrlStep.process(item, this.data, this.temp, moduleName);
        this.data = Object.assign(this.data, retdata.data);
        this.temp = Object.assign(this.temp, retdata.temp);

        if (retdata.continueTo) {
          // eslint-disable-next-line
          continueTo = retdata.continueTo;
          break;
        }
      } else if (item.kind === _Constants.Kinds.externalService) {
        // process the external service
        const extStep = new _ExternalServiceStep.default(); // eslint-disable-next-line

        const exdata = await extStep.process(item, this.data, this.temp);
        this.data = Object.assign(this.data, exdata.data);
        this.temp = Object.assign(this.temp, exdata.temp);
      } else if (item.kind === _Constants.Kinds.log) {
        // process the logSteps
        const logStep = new _LogStep.default();
        logStep.process(item, this.data, this.temp);
      } else if (item.kind === _Constants.Kinds.ussdCollect) {
        // process the ussdCollect steps
        const colData = new _UssdCollectStep.default(); // eslint-disable-next-line

        const ucollect = await colData.process(item, this.data, this.temp);
        retmsg.message = ucollect.message;
        retmsg.next = true;
        this.data = Object.assign(this.data, {
          responses: ucollect.responses
        });
        break;
      } else if (item.kind === _Constants.Kinds.ussdSay) {
        // process the ussd say steps
        const uSay = new _UssdSay.default(); // eslint-disable-next-line

        const uMsg = await uSay.process(item, this.data, this.temp);
        retmsg.message = uMsg.message;
        retmsg.next = false;
      } else {
        printinfo('INFO %o', item);
      }
    }

    if (continueTo) {
      return this.rvdProcess(continueTo);
    } // return the message


    retmsg.data = _objectSpread({}, this.data);
    return retmsg;
  });

  _defineProperty(this, "rvd", async input => {
    // check if the session exist
    if (this.sessionInfo) {
      // check if there input is in relation with a response
      if (this.responses) {
        const {
          menu,
          collectdigits
        } = _Constants.ussdCollectGatherType; // map through to get the next module

        if (this.responses.gatherType === menu) {
          const uinput = parseInt(input, 10);
          const mm = this.responses.mappings.find(rep => parseInt(rep.digits, 10) === uinput);

          if (mm) {
            return this.rvdProcess(mm.next);
          } // PROCESS WHEN INFO DOES NOT EXIST

        } else if (this.responses.gatherType === collectdigits) {
          const {
            next,
            collectVariable,
            scope
          } = this.responses.collectdigits;

          if (scope === 'application') {
            this.data[`$${collectVariable}`] = input;
          } else {
            this.temp[`$${collectVariable}`] = input;
          }

          return this.rvdProcess(next);
        }
      } else {
        return this.rvdProcess(this.sessionInfo.moduleName);
      }
    }

    const defaultRVD = await this.readStates(this.data.$shortcode);
    const currentModule = defaultRVD.header.startNodeName;
    return this.rvdProcess(currentModule);
  });

  const {
    session = {},
    cache,
    state = {},
    rvdjson = {},
    config = {}
  } = options;
  this.sessionInfo = session;
  this.temp = {};

  if (!cache) {
    throw new Error('The cache cannot be empty');
  }

  this.cache = cache;

  if (!(0, _utils.isObjEmpty)(session)) {
    const {
      responses
    } = session,
          rest = _objectWithoutProperties(session, ["responses"]);

    this.responses = responses;
    this.data = Object.assign({}, rest, state);
  } else {
    this.data = state;
    this.responses = null;
  }

  this.rvdjson = rvdjson;
  this.config = config;
}
/**
 * Read the state file containing all the USSD definitions based on the short code.
 * It caches the result to Redis database. If the shortcode does not exist, it loads the default
 * state file from the project folder
 * @param {String} shortcode the USSD shortcode mapping to the state file
 * @memberof RVDNode
 */
;

exports.default = RVDNode;
//# sourceMappingURL=RVDNode.js.map