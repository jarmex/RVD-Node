"use strict";

exports.__esModule = true;
exports.default = exports.isObjEmpty = void 0;

const isObjEmpty = obj => {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
};

exports.isObjEmpty = isObjEmpty;
var _default = isObjEmpty;
exports.default = _default;
//# sourceMappingURL=utils.js.map