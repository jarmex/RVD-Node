export const Kinds = {
  externalService: 'externalService',
  log: 'log',
  control: 'control',
  ussdCollect: 'ussdCollect',
  ussdSay: 'ussdSay',
  ussdLanguage: 'ussdLanguage',
  gather: 'gather',
  ussdMessage: 'ussdSay',
};

export const ConOperator = {
  eq: 'equals',
  ne: 'notequal',
  gt: 'greater',
  gte: 'greaterEqual',
  lt: 'less',
  lte: 'lessEqual',
};

export const ConType = {
  numeric: 'numeric',
};

export const ConActions = {};
export const ussdCollectGatherType = {
  menu: 'menu',
  collectdigits: 'collectdigits',
};

// replace the variable in the string
export const ReplaceVariables = (strName, appdata = {}, tempdata = {}) => {
  if (!strName) return '';
  const regex = /\$([A-Za-z]+[A-Za-z0-9_]*)/gi;
  const retvalue = strName.match(regex);
  if (retvalue) {
    let retstr = strName;
    retvalue.forEach((item) => {
      if (appdata[item] !== undefined) {
        retstr = retstr.replace(item, appdata[item]);
      } else if (tempdata[item] !== undefined) {
        retstr = retstr.replace(item, tempdata[item]);
      }
    });
    return retstr;
  }
  return strName;
};
