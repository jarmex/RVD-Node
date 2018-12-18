import Redis from 'ioredis';
import RVDController from './RvdController';
import { getLogger } from '../util';

require('dotenv').config();

const redis = new Redis({ keyPrefix: 'paic:' });

const debug = getLogger().debugContext('newsub');

const SESSION_TIMEOUT = 40;

export default class USSDFlow {
  // get the subscriber state from memory
  getSessionData = async (sessionid, msisdn) => {
    try {
      // check if the subscriber key exist
      const sessionsubdata = await redis.get(sessionid || msisdn);
      if (sessionsubdata) {
        return JSON.parse(sessionsubdata);
      }
    } catch (error) {
      debug('ERROR: %s', error.message);
    }
    return null;
  };

  saveSessionData = async (sessionid, msisdn, data = {}) => {
    try {
      await redis.setex(
        sessionid || msisdn,
        SESSION_TIMEOUT,
        JSON.stringify(data),
      );
    } catch (error) {
      debug('ERROR: %s', error.message);
    }
  };

  // all entry point for the application
  entryPoint = async (req, res) => {
    const { msisdn, imsi, cellid, sessionid, input } = req.query;
    debug('REQ: %o', req.query);
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
    const rvdController = new RVDController(subSession, state);
    const response = await rvdController.rvd(input);

    const Freeflow = response.next ? 'FC' : 'FB';

    // check if storing session is needed
    if (response.data && Freeflow === 'FC') {
      await this.saveSessionData(sessionid, msisdn, response.data);
    }
    let reply = response.message;
    if (!reply) {
      reply = process.env.DefaultMsg;
    }
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
