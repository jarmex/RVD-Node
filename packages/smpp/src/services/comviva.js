import { Buffer } from 'buffer';
import { ensureArray } from '@rvd/common';

const paramSpecification = (paramid) => {
  const id = parseInt(paramid, 10);
  if (id === 100) return 'msisdn';
  if (id === 101) return 'msc';
  if (id === 102) return 'imsi';
  if (id === 103) return 'hlr';
  if (id === 104) return 'connectiontype';
  if (id === 105) return 'subscriberlocation';
  if (id === 106) return 'cellid';
  if (id === 107) return 'language';
  if (id === 108) return 'region';
  if (id === 109) return 'input'; // subscriber Input
  if (id === 110) return 'sessionid';
  if (id === 111) return 'uniqueidentifier';
  if (id === 112) return 'multiaccesscode';
  if (id === 113) return 'chargingtag';
  if (id === 114) return 'amountTag';
  if (id === 115) return 'shortcodetag';
  if (id === 116) return 'statuscode';
  if (id === 119) return 'menucode';
  if (id === 120) return 'applicationid';
  if (id === 121) return 'applicationresponse';
  if (id === 122) return 'dataFormat';
  if (id === 123) return 'newrequest';
  if (id === 124) return 'transactionID';
  if (id > 200 && id < 301) return 'inputparameter';
  if (id > 300 && id < 401) return 'staticcontent';
  if (id > 400 && id < 500) return 'freeflow';
  if (id >= 500 && id <= 600) return 'serviceauthentication';
  return paramid; // `${paramid}`;
};

export const decodeSMPPMessage = (message) => {
  // split the message using the |
  if (!message) return {};
  const msArray = ensureArray(message.toString().split('|'));

  const retValue = {};
  msArray.forEach((item) => {
    // split using :
    const datapairs = item.split(':');
    if (datapairs.length === 1) {
      // only one item found. possibly the message_type
      const [messageType] = datapairs;
      retValue.messageType = messageType;
    } else if (datapairs.length === 2) {
      const [param, value] = datapairs;
      const paramname = paramSpecification(param);
      // decode the message
      const decodemsg = Buffer.from(value, 'base64').toString();
      retValue[paramname] = decodemsg;
    } else {
      // unknown parameter
      throw new Error(`Unknown parameter: '${item}'`);
    }
  });
  return retValue;
};

export const encodeMessage = (message, sessionId, state = 1) => {
  let replyMsg = `${state}|`;
  if (sessionId) {
    const baseSession = Buffer.from(sessionId).toString('base64');
    replyMsg += `110:${baseSession}|`;
  }
  const applicationresponse = Buffer.from(message).toString('base64');
  replyMsg += `121:${applicationresponse}`;
  return replyMsg;
};
