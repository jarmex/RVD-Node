// import flatcache from 'flat-cache';
import Redis from 'ioredis';
import { promisify } from 'util';
import fs from 'fs';
import { join } from 'path';
import { ActivatedProjects } from '../models'; // eslint-disable-line
import rvdjson from '../../state/state.json';
import { Kinds, ussdCollectGatherType } from './Common/Constants';

import {
  UssdSaySteps,
  UssdCollectSteps,
  LogSteps,
  ExternalServiceSteps,
  ControlSteps,
} from './Steps';

import { getLogger } from '../util';
import config from '../config';

// create a promise version of the fs readFile
const freadAsync = promisify(fs.readFile);

const { debug, printinfo, printerror } = getLogger().getContext('rvd');

// const cache = flatcache.load('rvdCache');
const cache = new Redis({ keyPrefix: 'paic:', ...config.redis });

export default class RVDController {
  constructor(session = {}, state = {}) {
    this.sessionInfo = session;
    this.temp = {};
    if (session) {
      const { responses, ...rest } = session;
      this.responses = responses;
      this.data = Object.assign({}, rest, state);
    } else {
      this.data = state;
      this.responses = null;
    }
  }

  readStates = async (shortcode) => {
    let retvalue = null;
    try {
      const rvdjs = await cache.get(shortcode);
      if (rvdjs) {
        return JSON.parse(rvdjs);
      }

      // read from the databae all shortcode to be processed and cache them
      const acPro = await ActivatedProjects.findAll();
      if (acPro) {
        acPro.forEach(async (item) => {
          try {
            const spath = join(
              process.env.RESTCOMM_WORKSPACE_DIR,
              item.sid,
              'state',
            );
            const result = await freadAsync(spath, 'utf8');
            await cache.set(item.shortcode, result);
            if (item.shortcode === shortcode) {
              retvalue = JSON.parse(result);
            }
          } catch (error) {
            printerror('ERROR: %s', error.message);
          }
        });
      }
    } catch (error) {
      printerror('ERROR: %s', error.message);
    }
    if (retvalue) {
      return retvalue;
    }
    debug('................caching the shortcode to memory.................');
    await cache.set(shortcode, JSON.stringify(rvdjson));
    return rvdjson;
  };

  /**
   *Process the RVD for USSD
   * @param {String} moduleName the name of the module to load for the USSD flow
   * @memberof RVDController
   */
  rvdProcess = async (moduleName) => {
    const { $core_From: msisdn, $cell_id: cellid, $shortcode } = this.data;
    const cRvd = await this.readStates($shortcode);
    const allnodes = cRvd.nodes.find((item) => item.name === moduleName);
    printinfo(
      `MODULE: ${moduleName}, NAME: ${
        allnodes ? allnodes.label : ''
      }, MSISDN=${msisdn}, cellid=${cellid}`,
    );
    if (!allnodes) {
      return {
        message: process.env.DefaultMsg,
        data: null,
        next: false,
      }; // for the error message
    }

    let continueTo = null;
    const retmsg = { next: false };
    const { steps } = allnodes;
    const ctrlStep = new ControlSteps();

    // eslint-disable-next-line
    for (let i = 0; i < steps.length; i++) {
      const item = steps[i];
      debug(`processing step: ${item.name || ''}, kind: ${item.kind}`);
      if (item.kind === Kinds.control) {
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
        const extStep = new ExternalServiceSteps();
        // eslint-disable-next-line
        const exdata = await extStep.process(item, this.data, this.temp);

        this.data = Object.assign(this.data, exdata.data);
        this.temp = Object.assign(this.temp, exdata.temp);

        // check for the control to continueTo
      } else if (item.kind === Kinds.log) {
        const logStep = new LogSteps();
        logStep.process(item, this.data, this.temp);
      } else if (item.kind === Kinds.ussdCollect) {
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

  rvd = async (input) => {
    // check if the session exist
    if (this.sessionInfo) {
      // check if there input is in relation with a response
      if (this.responses) {
        // map through to get the next module
        if (this.responses.gatherType === ussdCollectGatherType.menu) {
          const uinput = parseInt(input, 10);
          const mm = this.responses.mappings.find(
            (rep) => parseInt(rep.digits, 10) === uinput,
          );
          if (mm) {
            return this.rvdProcess(mm.next);
          }
          // PROCESS WHEN INFO DOES NOT EXIST
        } else if (
          this.responses.gatherType === ussdCollectGatherType.collectdigits
        ) {
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
