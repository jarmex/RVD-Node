import Redis from 'ioredis';
import { RVDNode } from '../RvdConnect';
import { getLogger } from '../util';
import config from '../config';
// eslint-disable-next-line
import { Transactions } from '../models';

// read configuration variables
require('dotenv').config();

const redis = new Redis({ keyPrefix: 'paic:', ...config.redis });

const { debug, printinfo, printerror } = getLogger().getContext('flow');

// the default session timeout.
const { SESSION_TIMEOUT = 40, USSD_SAVE_TRANSACTION = 'NONE' } = process.env;
// is save transaction enabled. possible values ALL, END, or default NONE
const isSaveTransEnabled = USSD_SAVE_TRANSACTION;

export default class USSDFlowController {
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
      const sessionsubdata = await redis.get(sessionid || msisdn);
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
      await redis.setex(
        sessionid || msisdn,
        SESSION_TIMEOUT,
        JSON.stringify(data),
      );
    } catch (error) {
      printerror('ERROR: %s', error.message);
    }
  };

  /**
   * save or update the transaction to database. If enabled it might slow down performance
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
        if (toDatabase.sessionid) {
          const toUpdatedb = await Transactions.findOne({
            where: {
              sessionid: toDatabase.sessionid,
            },
          });
          if (toUpdatedb) {
            toUpdatedb.replyMessage = reply;
            toUpdatedb.flowend = next;
            toUpdatedb.moduleName = toDatabase.moduleName;
            toUpdatedb.moduleLabel = toDatabase.moduleLabel;
            toUpdatedb.stepName = toDatabase.stepName;
            toUpdatedb.stepKind = toDatabase.stepKind;
            await toUpdatedb.save();
          } else {
            // create a new record for this
            await Transactions.create(toDatabase);
          }
        } else {
          // no sessionid. insert the object to database anytime
          await Transactions.create(toDatabase);
        }
      } else {
        await Transactions.create(toDatabase);
      }
    } catch (error) {
      printerror(`ERROR: ${error.message} - saveTransaction`);
    }
  };

  /**
   * The endpoint to process the RVD Node. The main entry point for the application
   * @param {Object} req The Expressjs request Object
   * @param {Object} res The Expressjs response Object
   * @memberof USSDFlowController
   */
  entryPoint = async (req, res) => {
    const { msisdn, imsi, cellid, sessionid, input } = req.query;
    printinfo('REQ: %o', req.query);
    // get the session. if the session does not exist then process the first stage of rvd
    const subSession = await this.getSessionData(sessionid || msisdn);
    // application state
    const state = {
      $core_From: msisdn,
      $cell_id: cellid,
      $session_id: sessionid,
      $imsi: imsi,
      $core_Body: input,
    };
    if (!subSession) {
      // the first time request, the input is the same as the shortcode
      state.$shortcode = input;
    }
    const rvdController = new RVDNode(subSession, state);
    const response = await rvdController.rvd(input);

    const Freeflow = response.next ? 'FC' : 'FB';

    // check if storing session is needed
    if (response.data && Freeflow === 'FC') {
      await this.saveSessionData(sessionid, msisdn, response.data);
    }
    let reply = response.message;
    if (!reply) {
      debug(`${msisdn}: No reply message found. Replying default message`);
      reply = process.env.DefaultMsg;
    }

    if (isSaveTransEnabled === 'ALL') {
      await this.saveTransaction(response, reply);
    } else if (isSaveTransEnabled === 'END' && Freeflow === 'FB') {
      await this.saveTransaction(response, reply);
    } else if (isSaveTransEnabled === 'UPDATE') {
      await this.saveTransaction(response, reply, true);
    } else if (isSaveTransEnabled === 'STARTEND') {
      if (!subSession || Freeflow === 'FB') {
        await this.saveTransaction(response, reply);
      }
    }
    // else NONE.

    res.type('txt');
    res.set({
      Freeflow,
      Expires: -1,
      'Cache-Control': 'max-age=0',
      Pragma: 'no-cache',
    });
    res.status(200).send(reply);
  };
}
