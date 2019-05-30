import { RVDController } from '@rvd/common';
import { logger } from '../utils';
import redisconfig from './redisconfig';

const { printerror, debug } = logger().getContext('deliversm');

const getSessionInfo = (itsInfo) => {
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
};
// create an instance of the RVDController
const rvdprocess = new RVDController(rvdparam);

rvdprocess.on('updatetrans', (data) => {
  // update transaction in the database
  debug('Update Transaction');
  debug('%o', data);
});

rvdprocess.on('savetrans', (data) => {
  // save transaction to database
  debug('Save Transaction');
  debug('%o', data);
});

const extractdata = (msisdn, message, pdu) => {
  const { imsi, cellid, sessionid, input, shortcode, sid } = pdu;
  debug(`ussd_service_op = ${pdu.ussd_service_op}`);
  const itssessionInfo = getSessionInfo(pdu.its_session_info);
  debug(itssessionInfo);
  return {
    msisdn,
    imsi,
    cellid,
    sessionid,
    input,
    sid,
    shortcode,
  };
};

/**
 * process the USSD response and send feedback to the user.
 * @param {Object} pdu the PDU response from the SMSC or the USSD GW
 */
export default async (pdu) => {
  const { source_addr: source, destination_addr: destination, short_message: shortMessage } = pdu;
  const { message } = shortMessage;
  debug(`MSISDN=${source}, DESTINATION=${destination}, MSG=${shortMessage}`);
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
    const request = extractdata(source, message, pdu);
    const response = await rvdprocess.entryPoint(request);
    // format the response message for SMS
    return response;
  } catch (error) {
    printerror(`${source}: ERROR: ${error.message}`);
    return null;
  }
};
