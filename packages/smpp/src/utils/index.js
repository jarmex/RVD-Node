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

export const USSDSERVICEOP = {
  PSSD_Indication: 0,
  PSSR_Indication: 1,
  USSR_Request: 2,
  USSN_Request: 3,
  PSSD_Response: 16,
  PSSR_Response: 17,
  USSR_Confirm: 18,
  USSN_Confirm: 19,
};

export const getUSSDServiceOp = (serviceop, fb) => {
  if (fb) {
    return USSDSERVICEOP.PSSR_Response;
  }
  switch (serviceop) {
    case 0:
      return USSDSERVICEOP.USSR_Request;
    case 2:
      return USSDSERVICEOP.USSR_Request;
    case 3:
      return USSDSERVICEOP.PSSR_Response;

    default:
      return USSDSERVICEOP.PSSR_Response;
  }
  // check if the sericeop number is in the list
  // const result = USSDSERVICEOP[text];
  // if (result) {
  //   return parseInt(result, 10);
  // }
  // other
  // switch (text) {
  //   case 'requesttext':
  //   case 'ussdpush':
  //     return 3;
  //   case 'menu':
  //     return 2;
  //   case 'text':
  //     return 19;
  //   default:
  //     return 19;
  // }
};
