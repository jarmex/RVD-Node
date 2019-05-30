require('dotenv').config();

export const toCamelCase = (strkey) => {
  const str = strkey.replace(/^REDIS_/g, '');
  return str.replace(/^([A-Z])|[\s-_](\w)/g, (match, p1, p2) => {
    if (p2) return p2.toUpperCase();
    return p1.toLowerCase();
  });
};

const tosmpp = (strkey, regex) => {
  const str = strkey.replace(regex, '') || '';
  return str.toLowerCase();
};

const getSMBMITSMConfig = () => {
  const regex = /^SUBMITSM_.+/;

  const envKeys = Object.keys(process.env)
    .filter((item) => regex.test(item))
    .map((item) => ({
      [tosmpp(item, /^SUBMITSM_/g)]: process.env[item],
    }));
  if (envKeys && envKeys.length > 0) {
    return Object.assign(...envKeys);
  }
  return {};
};

const getSMSCConfig = () => {
  const regex = /^SMSC_.+/;

  const envKeys = Object.keys(process.env)
    .filter((item) => regex.test(item))
    .map((item) => ({
      [tosmpp(item, /^SMSC_/g)]: process.env[item],
    }));
  if (envKeys && envKeys.length > 0) {
    const retval = Object.assign(...envKeys);
    const { ip, port, enquirelink, maxenquirelink, ...rest } = retval;
    const submitSm = getSMBMITSMConfig();
    return {
      ipaddress: ip,
      port,
      enquirelink,
      maxenquirelink,
      bind: rest,
      submitSm,
    };
  }
  return {};
};

export default {
  smsc: {
    ...getSMSCConfig(),
  },
};
