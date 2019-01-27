// replace the variable in the string
const ReplaceVariables = (strName, appdata = {}, tempdata = {}) => {
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

export default ReplaceVariables;
