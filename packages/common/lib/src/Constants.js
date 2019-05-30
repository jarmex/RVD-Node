"use strict";

exports.__esModule = true;
exports.ussdCollectGatherType = exports.ConActions = exports.ConType = exports.ConOperator = exports.Kinds = void 0;
const Kinds = {
  externalService: 'externalService',
  log: 'log',
  control: 'control',
  ussdCollect: 'ussdCollect',
  ussdSay: 'ussdSay',
  ussdLanguage: 'ussdLanguage',
  gather: 'gather',
  ussdMessage: 'ussdSay'
};
exports.Kinds = Kinds;
const ConOperator = {
  eq: 'equals',
  ne: 'notequal',
  gt: 'greater',
  gte: 'greaterEqual',
  lt: 'less',
  lte: 'lessEqual'
};
exports.ConOperator = ConOperator;
const ConType = {
  numeric: 'numeric'
};
exports.ConType = ConType;
const ConActions = {};
exports.ConActions = ConActions;
const ussdCollectGatherType = {
  menu: 'menu',
  collectdigits: 'collectdigits'
};
exports.ussdCollectGatherType = ussdCollectGatherType;
//# sourceMappingURL=Constants.js.map