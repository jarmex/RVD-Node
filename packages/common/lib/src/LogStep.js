"use strict";

exports.__esModule = true;
exports.default = void 0;

var _ReplaceVariables = _interopRequireDefault(require("./ReplaceVariables"));

var _logger = _interopRequireDefault(require("./logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  printinfo
} = (0, _logger.default)().getContext('logging');

let LogSteps = function LogSteps() {
  _defineProperty(this, "process", async (step, appdata = {}, tempdata = {}) => {
    const {
      message
    } = step;

    if (message) {
      const logmsg = (0, _ReplaceVariables.default)(message, appdata, tempdata);
      printinfo(logmsg);
    }
  });
};

exports.default = LogSteps;
//# sourceMappingURL=LogStep.js.map