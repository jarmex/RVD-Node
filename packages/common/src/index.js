import Redis from 'ioredis';
import { EventEmitter } from 'events';
import RVDNode from './RVDNode';
import getLogger, { LoggerClass } from './logger';

const { debug, printinfo, printerror } = getLogger().getContext('flow');

export class RVDController extends EventEmitter {
  constructor(params = {}) {
    super(params);
    const {
      redisparam,
      SESSION_TIMEOUT = 40,
      USSD_SAVE_TRANSACTION = 'NONE',
      defaultRVDJson = {},
      defaultWorkSpace,
      defaultErrorMsg,
    } = params;
    if (!redisparam) {
      throw new Error('Redis parameters are required');
    }
    this.redis = new Redis({ keyPrefix: 'paic:', ...redisparam });
    // is save transaction enabled. possible values ALL, END, or default NONE
    this.isSaveTransEnabled = USSD_SAVE_TRANSACTION;
    this.SESSION_TIMEOUT = SESSION_TIMEOUT;
    this.rvdjson = defaultRVDJson;
    this.defaultWorkSpace = defaultWorkSpace;
    this.defaultErrorMsg = defaultErrorMsg || 'Error processing request';
  }

  /**
   * Read the current subscriber session from the database.
   * If the session doesn't exist return null
   * @param {String} sessionid The USSD GW sessionID
   * @param {String} msisdn The subscriber number
   * @memberof USSDFlowController
   */
  getSessionData = async (sessionid, msisdn) => {
    try {
      // check if the subscriber key exist
      const sessionsubdata = await this.redis.get(sessionid || msisdn);
      if (sessionsubdata) {
        return JSON.parse(sessionsubdata);
      }
    } catch (error) {
      printerror('ERROR: %s', error.message);
    }
    return null;
  };

  /**
   * Save the subscriber session to database with the default timeout
   * @param {String} sessionid the USSD GW session ID
   * @param {String} msisdn The subscriber number
   * @param {Object} data the information to be save to database
   * @memberof USSDFlowController
   */
  saveSessionData = async (sessionid, msisdn, data = {}) => {
    try {
      await this.redis.setex(sessionid || msisdn, this.SESSION_TIMEOUT, JSON.stringify(data));
    } catch (error) {
      printerror('ERROR: %s', error.message);
    }
  };

  /**
   * emit the data to be save to the transaction table
   * @param {Object} pResponse The object contains all data to be stored in the database
   * @param {String} reply the reply message to the subscriber
   * @memberof USSDFlowController
   */
  saveTransaction = async (pRespons, reply, updateOnly = false) => {
    try {
      const { rvdmodule = {}, data, next } = pRespons;
      const toDatabase = { ...rvdmodule };
      toDatabase.msisdn = data.$core_From;
      toDatabase.cellid = data.$cell_id;
      toDatabase.sessionid = data.$session_id;
      toDatabase.imsi = data.$imsi;
      toDatabase.shortcode = data.$shortcode;
      toDatabase.flowend = next;
      toDatabase.replyMessage = reply;
      if (updateOnly) {
        this.emit('updatetrans', { dbobject: { ...toDatabase } });
      } else {
        this.emit('savetrans', { dbobject: { ...toDatabase } });
      }
    } catch (error) {
      printerror(`ERROR: ${error.message} - saveTransaction`);
    }
  };

  /**
   * The endpoint to process the RVD Node. The main entry point for the application.
   * The sid is the default SID for the shortcode. if the sid does not exist, the rvdjson will be
   * used. NOTE: if the session does not exist, the input is the same as the shortcode
   * @param {Object} request An object containing the msisdn, cellid,sessionid,input,imsi & sid
   * @memberof USSDFlowController
   */
  entryPoint = async (request) => {
    try {
      const { msisdn, imsi, cellid, sessionid, input, sid, shortcode } = request;
      printinfo('REQ: %o', request);
      // get the session. if the session does not exist then process the first stage of rvd
      const subSession = await this.getSessionData(sessionid || msisdn);
      // application state
      const state = {
        $core_From: msisdn,
        $cell_id: cellid,
        $session_id: sessionid,
        $imsi: imsi,
        $core_Body: input,
        $cellid: cellid,
      };
      if (!subSession) {
        // the first time request, the input is the same as the shortcode
        state.$shortcode = shortcode || input;
      }
      const rvdController = new RVDNode({
        session: subSession,
        state,
        cache: this.redis,
        rvdjson: this.rvdjson,
        config: {
          workSpaceDir: this.defaultWorkSpace,
          sid,
        },
      });

      const response = await rvdController.rvd(input);

      const Freeflow = response.next ? 'FC' : 'FB';

      // check if storing session is needed
      if (response.data && Freeflow === 'FC') {
        await this.saveSessionData(sessionid, msisdn, response.data);
      }
      let reply = response.message;
      if (!reply) {
        debug(`${msisdn}: No reply message found. Replying default message`);
        reply = this.defaultErrorMsg;
      }

      if (this.isSaveTransEnabled === 'ALL') {
        await this.saveTransaction(response, reply);
      } else if (this.isSaveTransEnabled === 'END' && Freeflow === 'FB') {
        await this.saveTransaction(response, reply);
      } else if (this.isSaveTransEnabled === 'UPDATE') {
        await this.saveTransaction(response, reply, true);
      } else if (this.isSaveTransEnabled === 'STARTEND') {
        if (!subSession || Freeflow === 'FB') {
          await this.saveTransaction(response, reply);
        }
      }

      return {
        status: 200,
        header: {
          Freeflow,
          Expires: -1,
          'Cache-Control': 'max-age=0',
          Pragma: 'no-cache',
        },
        message: reply,
      };
    } catch (error) {
      printerror(error.message);
      return {
        status: 401,
        header: {
          Freeflow: 'FB',
          Expires: -1,
          'Cache-Control': 'max-age=0',
          Pragma: 'no-cache',
        },
        message: this.defaultErrorMsg,
      };
    }
  };
}

export { LoggerClass };
