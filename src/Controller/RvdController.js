import rvdjson from '../../state/state.json';
import { Kinds, ussdCollectGatherType } from './common';
import ControlSteps from './ControlSteps';
import ExternalServiceSteps from './ExternalServiceStep';
import LogSteps from './LogStep';
import UssdCollectSteps from './UssdCollectStep';
import UssdSaySteps from './UssdSay';

require('dotenv').config();

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

  rvdProcess = async (moduleName) => {
    const allnodes = rvdjson.nodes.find((item) => item.name === moduleName);

    if (!allnodes) {
      return {
        message: process.env.DefaultMsg,
        data: null,
        next: false,
      }; // for the error message
    }

    const { msisdn, cellid } = this.data;
    this.data = Object.assign(this.data, {
      $core_From: msisdn,
      $cell_id: cellid,
    });
    let continueTo = null;
    const retmsg = { next: false };
    const { steps } = allnodes;
    const ctrlStep = new ControlSteps();

    // eslint-disable-next-line
    for (let i = 0; i < steps.length; i++) {
      const item = steps[i];
      if (item.kind === Kinds.control) {
        // eslint-disable-next-line
        const retdata = await ctrlStep.process(item, this.data, this.temp);

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
          prevModule: moduleName,
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
        console.error(item); // eslint-disable-line
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
    const currentModule = rvdjson.header.startNodeName;
    return this.rvdProcess(currentModule);
  };
}
