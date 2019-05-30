"use strict";

exports.__esModule = true;
exports.RVDController = void 0;

var _ioredis = _interopRequireDefault(require("ioredis"));

var _events = require("events");

var _RVDNode = _interopRequireDefault(require("./RVDNode"));

var _logger = _interopRequireWildcard(require("./logger"));

exports.LoggerClass = _logger.LoggerClass;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  debug,
  printinfo,
  printerror
} = (0, _logger.default)().getContext('flow');

let RVDController =
/*#__PURE__*/
function (_EventEmitter) {
  _inheritsLoose(RVDController, _EventEmitter);

  function RVDController(params = {}) {
    var _this;

    _this = _EventEmitter.call(this, params) || this;

    _defineProperty(_assertThisInitialized(_this), "getSessionData", async (sessionid, msisdn) => {
      try {
        // check if the subscriber key exist
        const sessionsubdata = await _this.redis.get(sessionid || msisdn);

        if (sessionsubdata) {
          return JSON.parse(sessionsubdata);
        }
      } catch (error) {
        printerror('ERROR: %s', error.message);
      }

      return null;
    });

    _defineProperty(_assertThisInitialized(_this), "saveSessionData", async (sessionid, msisdn, data = {}) => {
      try {
        await _this.redis.setex(sessionid || msisdn, _this.SESSION_TIMEOUT, JSON.stringify(data));
      } catch (error) {
        printerror('ERROR: %s', error.message);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveTransaction", async (pRespons, reply, updateOnly = false) => {
      try {
        const {
          rvdmodule = {},
          data,
          next
        } = pRespons;

        const toDatabase = _objectSpread({}, rvdmodule);

        toDatabase.msisdn = data.$core_From;
        toDatabase.cellid = data.$cell_id;
        toDatabase.sessionid = data.$session_id;
        toDatabase.imsi = data.$imsi;
        toDatabase.shortcode = data.$shortcode;
        toDatabase.flowend = next;
        toDatabase.replyMessage = reply;

        if (updateOnly) {
          _this.emit('updatetrans', {
            dbobject: _objectSpread({}, toDatabase)
          });
        } else {
          _this.emit('savetrans', {
            dbobject: _objectSpread({}, toDatabase)
          });
        }
      } catch (error) {
        printerror(`ERROR: ${error.message} - saveTransaction`);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "entryPoint", async request => {
      try {
        const {
          msisdn,
          imsi,
          cellid,
          sessionid,
          input,
          sid,
          shortcode
        } = request;
        printinfo('REQ: %o', request); // get the session. if the session does not exist then process the first stage of rvd

        const subSession = await _this.getSessionData(sessionid || msisdn); // application state

        const state = {
          $core_From: msisdn,
          $cell_id: cellid,
          $session_id: sessionid,
          $imsi: imsi,
          $core_Body: input,
          $cellid: cellid
        };

        if (!subSession) {
          // the first time request, the input is the same as the shortcode
          state.$shortcode = shortcode || input;
        }

        const rvdController = new _RVDNode.default({
          session: subSession,
          state,
          cache: _this.redis,
          rvdjson: _this.rvdjson,
          config: {
            workSpaceDir: _this.defaultWorkSpace,
            sid
          }
        });
        const response = await rvdController.rvd(input);
        const Freeflow = response.next ? 'FC' : 'FB'; // check if storing session is needed

        if (response.data && Freeflow === 'FC') {
          await _this.saveSessionData(sessionid, msisdn, response.data);
        }

        let reply = response.message;

        if (!reply) {
          debug(`${msisdn}: No reply message found. Replying default message`);
          reply = _this.defaultErrorMsg;
        }

        if (_this.isSaveTransEnabled === 'ALL') {
          await _this.saveTransaction(response, reply);
        } else if (_this.isSaveTransEnabled === 'END' && Freeflow === 'FB') {
          await _this.saveTransaction(response, reply);
        } else if (_this.isSaveTransEnabled === 'UPDATE') {
          await _this.saveTransaction(response, reply, true);
        } else if (_this.isSaveTransEnabled === 'STARTEND') {
          if (!subSession || Freeflow === 'FB') {
            await _this.saveTransaction(response, reply);
          }
        }

        return {
          status: 200,
          header: {
            Freeflow,
            Expires: -1,
            'Cache-Control': 'max-age=0',
            Pragma: 'no-cache'
          },
          message: reply
        };
      } catch (error) {
        printerror(error.message);
        return {
          status: 401,
          header: {
            Freeflow: 'FB',
            Expires: -1,
            'Cache-Control': 'max-age=0',
            Pragma: 'no-cache'
          },
          message: _this.defaultErrorMsg
        };
      }
    });

    const {
      redisparam,
      SESSION_TIMEOUT = 40,
      USSD_SAVE_TRANSACTION = 'NONE',
      defaultRVDJson = {},
      defaultWorkSpace,
      defaultErrorMsg
    } = params;

    if (!redisparam) {
      throw new Error('Redis parameters are required');
    }

    _this.redis = new _ioredis.default(_objectSpread({
      keyPrefix: 'paic:'
    }, redisparam)); // is save transaction enabled. possible values ALL, END, or default NONE

    _this.isSaveTransEnabled = USSD_SAVE_TRANSACTION;
    _this.SESSION_TIMEOUT = SESSION_TIMEOUT;
    _this.rvdjson = defaultRVDJson;
    _this.defaultWorkSpace = defaultWorkSpace;
    _this.defaultErrorMsg = defaultErrorMsg || 'Error processing request';
    return _this;
  }
  /**
   * Read the current subscriber session from the database.
   * If the session doesn't exist return null
   * @param {String} sessionid The USSD GW sessionID
   * @param {String} msisdn The subscriber number
   * @memberof USSDFlowController
   */


  return RVDController;
}(_events.EventEmitter);

exports.RVDController = RVDController;
//# sourceMappingURL=index.js.map