import { RVDController } from '@rvd/common';
import { logger, getUSSDServiceOp } from '../utils';
import redisconfig from './redisconfig';
import defaultrvd from '../state/state.json';
// eslint-disable-next-line
import { Transactions } from '../models';
import { decodeSMPPMessage } from './comviva';

const { printerror, debug } = logger().getContext('deliversm');

const getSessionInfo = (itsInfo) => {
  debug(itsInfo);
  if (itsInfo) {
    return Buffer.from(itsInfo).toString('hex');
  }
  return 0;
};

// SESSION_TIMEOUT,USSD_SAVE_TRANSACTION, defaultRVDJson, defaultWorkSpace, defaultErrorMsg
const {
  SESSION_TIMEOUT = 40,
  USSD_SAVE_TRANSACTION = 'NONE',
  RESTCOMM_WORKSPACE_DIR,
  DefaultMsg,
} = process.env;

const rvdparam = {
  redisparam: redisconfig,
  SESSION_TIMEOUT,
  USSD_SAVE_TRANSACTION,
  defaultWorkSpace: RESTCOMM_WORKSPACE_DIR,
  defaultErrorMsg: DefaultMsg,
  defaultRVDJson: defaultrvd,
};
// create an instance of the RVDController
const rvdprocess = new RVDController(rvdparam);

// update database for continuing transaction
rvdprocess.on('updatetrans', async ({ dbobject }) => {
  // update transaction in the database
  debug('Update Transaction');
  debug('%o', dbobject);
  try {
    if (dbobject.sessionid) {
      const toUpdatedb = await Transactions.findOne({
        where: {
          sessionid: dbobject.sessionid,
        },
      });
      if (toUpdatedb) {
        Object.keys(dbobject).forEach((item) => {
          toUpdatedb[item] = dbobject[item];
        });
        await toUpdatedb.save();
      } else {
        // create a new record for this
        await Transactions.create(dbobject);
      }
    } else {
      // no sessionid. insert the object to database anytime
      await Transactions.create(dbobject);
    }
  } catch (error) {
    printerror(error.message);
  }
});

rvdprocess.on('savetrans', async ({ dbobject }) => {
  // save transaction to database
  debug('Save Transaction');
  debug('%o', dbobject);
  try {
    await Transactions.create(dbobject);
  } catch (error) {
    printerror(error.message);
  }
});

// extract the information from the PDU
const extractdata = (msisdn, destination, message, pdu) => {
  const { cellid, ...decodemsg } = decodeSMPPMessage(message);
  // get the shortcode and the sid for the shortcode
  decodemsg.cellid = cellid || decodemsg.subscriberlocation || '';
  decodemsg.shortcode = destination;
  decodemsg.msisdn = decodemsg.msisdn || msisdn;
  const itssessionInfo = getSessionInfo(pdu.its_session_info);
  decodemsg.itssessionInfo = itssessionInfo;
  debug(`its_session_info: ${itssessionInfo}`);
  decodemsg.serviceop = pdu.ussd_service_op;
  debug(`ussd_service_op = ${pdu.ussd_service_op}`);
  return decodemsg;
};

/**
 * process the USSD response and send feedback to the user.
 * @param {Object} pdu the PDU response from the SMSC or the USSD GW
 */
export default async (pdu) => {
  const { source_addr: source, destination_addr: destination, short_message: shortMessage } = pdu;
  const { message } = shortMessage;
  debug(`MSISDN=${source}, DESTINATION=${destination}, MSG=${message}`);
  // process the message and result
  try {
    // Extract the following from the pdu + message
    // msisdn,
    // imsi,
    // cellid,
    // sessionid,
    // input,
    // sid,
    // shortcode,
    const request = extractdata(source, destination, message, pdu);
    const response = await rvdprocess.entryPoint(request);
    debug('%o', response);
    const serviceOp = getUSSDServiceOp(request.serviceop, response.header.Freeflow === 'FB');
    // its_session_info: Buffer.from(`${sendparam.its_session_info || 0}`, 'hex'),
    const retvalue = {
      source_addr: destination,
      destination_addr: source,
      short_message: response.message,
      ussd_service_op: serviceOp,
      its_session_info: request.itssessionInfo,
    };
    debug('%o', retvalue);
    return retvalue;
  } catch (error) {
    printerror(`${source}: ERROR: ${error.message}`);
    return null;
  }
};
