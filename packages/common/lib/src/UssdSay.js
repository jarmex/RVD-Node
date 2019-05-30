"use strict";

exports.__esModule = true;
exports.default = void 0;

var _ReplaceVariables = _interopRequireDefault(require("./ReplaceVariables"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let UssdSaySteps = function UssdSaySteps() {
  _defineProperty(this, "process", async (step, appdata = {}, tempdata = {}) => {
    const retmsg = {};
    const {
      text
    } = step;
    retmsg.message = (0, _ReplaceVariables.default)(text, appdata, tempdata);
    return retmsg;
  });
};

exports.default = UssdSaySteps;
//# sourceMappingURL=UssdSay.js.map