"use strict";

exports.__esModule = true;
exports.default = void 0;

var _common = require("./common");

var _util = require("../util");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const debug = (0, _util.getLogger)().debugContext('logging');

let LogSteps = function LogSteps() {
  _defineProperty(this, "process", async (step, appdata = {}, tempdata = {}) => {
    const {
      message
    } = step;
    const logmsg = (0, _common.ReplaceVariables)(message, appdata, tempdata);
    debug(logmsg);
  });
};

exports.default = LogSteps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db250cm9sbGVyL0xvZ1N0ZXAuanMiXSwibmFtZXMiOlsiZGVidWciLCJkZWJ1Z0NvbnRleHQiLCJMb2dTdGVwcyIsInN0ZXAiLCJhcHBkYXRhIiwidGVtcGRhdGEiLCJtZXNzYWdlIiwibG9nbXNnIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBOzs7O0FBRUEsTUFBTUEsS0FBSyxHQUFHLHVCQUFZQyxZQUFaLENBQXlCLFNBQXpCLENBQWQ7O0lBRXFCQyxRO21DQUNULE9BQU9DLElBQVAsRUFBYUMsT0FBTyxHQUFHLEVBQXZCLEVBQTJCQyxRQUFRLEdBQUcsRUFBdEMsS0FBNkM7QUFDckQsVUFBTTtBQUFFQyxNQUFBQTtBQUFGLFFBQWNILElBQXBCO0FBQ0EsVUFBTUksTUFBTSxHQUFHLDhCQUFpQkQsT0FBakIsRUFBMEJGLE9BQTFCLEVBQW1DQyxRQUFuQyxDQUFmO0FBQ0FMLElBQUFBLEtBQUssQ0FBQ08sTUFBRCxDQUFMO0FBQ0QsRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcGxhY2VWYXJpYWJsZXMgfSBmcm9tICcuL2NvbW1vbic7XG5cbmltcG9ydCB7IGdldExvZ2dlciB9IGZyb20gJy4uL3V0aWwnO1xuXG5jb25zdCBkZWJ1ZyA9IGdldExvZ2dlcigpLmRlYnVnQ29udGV4dCgnbG9nZ2luZycpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dTdGVwcyB7XG4gIHByb2Nlc3MgPSBhc3luYyAoc3RlcCwgYXBwZGF0YSA9IHt9LCB0ZW1wZGF0YSA9IHt9KSA9PiB7XG4gICAgY29uc3QgeyBtZXNzYWdlIH0gPSBzdGVwO1xuICAgIGNvbnN0IGxvZ21zZyA9IFJlcGxhY2VWYXJpYWJsZXMobWVzc2FnZSwgYXBwZGF0YSwgdGVtcGRhdGEpO1xuICAgIGRlYnVnKGxvZ21zZyk7XG4gIH07XG59XG4iXX0=