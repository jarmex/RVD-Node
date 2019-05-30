import { LoggerClass } from '@rvd/common';

const logger = () => {
  const loggerClass = new LoggerClass({ context: 'smpp' });
  return loggerClass;
};

export { logger };

export const decodeFromBase64 = (param) => {
  if (param) {
    return Buffer.from(param, 'base64').toString('ascii');
  }
  return '';
};

export const UssdServiceOp = (text) => {
  // eslint-disable-next-line
  const smpp_service_op = {
    pssdindication: 0, // PSSD Indication
    pssrIndication: 1, // PSSR Indication
    ussrrequest: 2, // USSR Request
    ussnrequest: 3, // USSN Request
    pssdresponse: 16, // 16 = PSSD Response
    pssrresponse: 17, // 17 = PSSR Response
    ussrconfirm: 18, // 18 = USSR Confirm
    ussnconfirm: 19, // 19 = USSN Confirm
  };
  const result = smpp_service_op[text];
  if (result) {
    return parseInt(result, 10);
  }
  // other
  switch (text) {
    case 'requesttext':
    case 'ussdpush':
      return 3;
    case 'menu':
      return 2;
    case 'text':
      return 19;
    default:
      return 19;
  }
};
