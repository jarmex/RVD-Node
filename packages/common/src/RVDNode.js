import { promisify } from 'util';
import fs from 'fs';
import { join } from 'path';
import { Kinds, ussdCollectGatherType } from './Constants';
import UssdSaySteps from './UssdSay';
import UssdCollectSteps from './UssdCollectStep';
import LogSteps from './LogStep';
import ExternalServiceSteps from './ExternalServiceStep';
import ControlSteps from './ControlSteps';
import { isObjEmpty } from './utils';
import getLogger from './logger';

// create a promise version of the fs readFile
const freadAsync = promisify(fs.readFile);

const { debug, printinfo, printerror } = getLogger().getContext('rvd');

export default class RVDNode {
  /**
   *Creates an instance of RVDNode.
   * @param {Object} options The options are session, cache (Redis), state, rvdjson (default)
   * @memberof RVDNode
   */
  constructor(options = {}) {
    const {
      session = {},
      cache,
      state = {},
      rvdjson = {},
      config = {},
    } = options;
    this.sessionInfo = session;
    this.temp = {};
    if (!cache) {
      throw new Error('The cache cannot be empty');
    }
    this.cache = cache;
    if (!isObjEmpty(session)) {
      const { responses, ...rest } = session;
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
  readStates = async (shortcode) => {
    let retvalue = null;
    try {
      const rvdjs = await this.cache.get(shortcode);
      if (rvdjs) {
        return JSON.parse(rvdjs);
      }
      const { sid, workSpaceDir } = this.config;

      if (sid && workSpaceDir) {
        try {
          const spath = join(workSpaceDir, sid, 'state');
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
  };

  /**
   *Process the RVD for USSD
   * @param {String} moduleName the name of the module to load for the USSD flow
   * @memberof RVDNode
   */
  rvdProcess = async (moduleName) => {
    const { $core_From: msisdn, $cell_id: cellid, $shortcode } = this.data;
    const cRvd = await this.readStates($shortcode);
    const allnodes = cRvd.nodes.find((item) => item.name === moduleName);
    const moduleLabel = allnodes ? allnodes.label : '';
    printinfo(
      `MODULE: ${moduleName}, NAME: ${moduleLabel}, MSISDN=${msisdn}, cellid=${cellid}`,
    );
    if (!allnodes) {
      return {
        message: process.env.DefaultMsg,
        data: null,
        next: false,
      }; // for the error message
    }

    let continueTo = null;
    const retmsg = { next: false, rvdmodule: { moduleName, moduleLabel } };
    const { steps } = allnodes;

    // process all the steps in the module. Check for each of the steps and call the
    // appropriate control to process it.
    // eslint-disable-next-line
    for (let i = 0; i < steps.length; i++) {
      const item = steps[i];
      // need to stored in the database
      retmsg.rvdmodule.stepName = item.name;
      retmsg.rvdmodule.stepKind = item.kind;
      debug(`processing step: ${item.name || ''}, kind: ${item.kind}`);
      // process the ControlStep
      if (item.kind === Kinds.control) {
        const ctrlStep = new ControlSteps();
        // eslint-disable-next-line
        const retdata = await ctrlStep.process(
          item,
          this.data,
          this.temp,
          moduleName,
        );

        this.data = Object.assign(this.data, retdata.data);
        this.temp = Object.assign(this.temp, retdata.temp);
        if (retdata.continueTo) {
          // eslint-disable-next-line
          continueTo = retdata.continueTo;
          break;
        }
      } else if (item.kind === Kinds.externalService) {
        // process the external service
        const extStep = new ExternalServiceSteps();
        // eslint-disable-next-line
        const exdata = await extStep.process(item, this.data, this.temp);

        this.data = Object.assign(this.data, exdata.data);
        this.temp = Object.assign(this.temp, exdata.temp);
      } else if (item.kind === Kinds.log) {
        // process the logSteps
        const logStep = new LogSteps();
        logStep.process(item, this.data, this.temp);
      } else if (item.kind === Kinds.ussdCollect) {
        // process the ussdCollect steps
        const colData = new UssdCollectSteps();
        // eslint-disable-next-line
        const ucollect = await colData.process(item, this.data, this.temp);
        retmsg.message = ucollect.message;
        retmsg.next = true;
        this.data = Object.assign(this.data, {
          responses: ucollect.responses,
        });
        break;
      } else if (item.kind === Kinds.ussdSay) {
        // process the ussd say steps
        const uSay = new UssdSaySteps();
        // eslint-disable-next-line
        const uMsg = await uSay.process(item, this.data, this.temp);
        retmsg.message = uMsg.message;
        retmsg.next = false;
      } else {
        printinfo('INFO %o', item);
      }
    }
    if (continueTo) {
      return this.rvdProcess(continueTo);
    }
    // return the message
    retmsg.data = { ...this.data };
    return retmsg;
  };

  /**
   * check if a user session already exist. If so pick the information from the session
   * and process it. If the user session does not exist, it assume that the input is the shortcode
   * and queries the database using the shortcode
   * @param {String} input the USSD input string
   * @memberof RVDNode
   */
  rvd = async (input) => {
    // check if the session exist
    if (this.sessionInfo) {
      // check if there input is in relation with a response
      if (this.responses) {
        const { menu, collectdigits } = ussdCollectGatherType;
        // map through to get the next module
        if (this.responses.gatherType === menu) {
          const uinput = parseInt(input, 10);
          const mm = this.responses.mappings.find(
            (rep) => parseInt(rep.digits, 10) === uinput,
          );
          if (mm) {
            return this.rvdProcess(mm.next);
          }
          // PROCESS WHEN INFO DOES NOT EXIST
        } else if (this.responses.gatherType === collectdigits) {
          const { next, collectVariable, scope } = this.responses.collectdigits;
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
  };
}
