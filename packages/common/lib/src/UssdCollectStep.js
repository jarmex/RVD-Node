"use strict";

exports.__esModule = true;
exports.default = void 0;

var _ensureArray = _interopRequireDefault(require("./ensureArray"));

var _ReplaceVariables = _interopRequireDefault(require("./ReplaceVariables"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let UssdCollectSteps = function UssdCollectSteps() {
  _defineProperty(this, "process", async (step, data = {}, temp = {}) => {
    const retmsg = {}; // get the message to display

    const {
      messages,
      text,
      gatherType,
      menu,
      collectdigits
    } = step; // replace the variables in the text

    retmsg.message = (0, _ReplaceVariables.default)(text, data, temp); // ensure the message is an array

    const msgs = (0, _ensureArray.default)(messages);

    if (messages) {
      const mMenu = msgs.map(item => (0, _ReplaceVariables.default)(item.text, data, temp)).join('\n');
      retmsg.message = `${text}${mMenu}`;
    }

    const responses = {
      gatherType
    }; // map the responses

    if (menu) {
      responses.mappings = menu.mappings;
    }

    if (collectdigits) {
      responses.collectdigits = collectdigits;
    }

    retmsg.responses = responses;
    return retmsg;
  });
};

exports.default = UssdCollectSteps;
//# sourceMappingURL=UssdCollectStep.js.map