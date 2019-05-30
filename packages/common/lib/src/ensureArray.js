"use strict";

exports.__esModule = true;
exports.default = void 0;

var _default = a => {
  if (Array.isArray(a)) {
    return a;
  }

  if (typeof a !== 'undefined') {
    return [a];
  }

  return [];
};

exports.default = _default;
//# sourceMappingURL=ensureArray.js.map