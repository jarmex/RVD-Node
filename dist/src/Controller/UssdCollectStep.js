"use strict";

exports.__esModule = true;
exports.default = void 0;

var _util = require("../util");

var _common = require("./common");

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
    } = step;
    const msgs = (0, _util.ensureArray)(messages);
    retmsg.message = text;

    if (messages) {
      const mMenu = msgs.map(item => (0, _common.ReplaceVariables)(item.text, data, temp)).join('\n');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db250cm9sbGVyL1Vzc2RDb2xsZWN0U3RlcC5qcyJdLCJuYW1lcyI6WyJVc3NkQ29sbGVjdFN0ZXBzIiwic3RlcCIsImRhdGEiLCJ0ZW1wIiwicmV0bXNnIiwibWVzc2FnZXMiLCJ0ZXh0IiwiZ2F0aGVyVHlwZSIsIm1lbnUiLCJjb2xsZWN0ZGlnaXRzIiwibXNncyIsIm1lc3NhZ2UiLCJtTWVudSIsIm1hcCIsIml0ZW0iLCJqb2luIiwicmVzcG9uc2VzIiwibWFwcGluZ3MiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBQ0E7Ozs7SUFFcUJBLGdCO21DQUNULE9BQU9DLElBQVAsRUFBYUMsSUFBSSxHQUFHLEVBQXBCLEVBQXdCQyxJQUFJLEdBQUcsRUFBL0IsS0FBc0M7QUFDOUMsVUFBTUMsTUFBTSxHQUFHLEVBQWYsQ0FEOEMsQ0FFOUM7O0FBQ0EsVUFBTTtBQUFFQyxNQUFBQSxRQUFGO0FBQVlDLE1BQUFBLElBQVo7QUFBa0JDLE1BQUFBLFVBQWxCO0FBQThCQyxNQUFBQSxJQUE5QjtBQUFvQ0MsTUFBQUE7QUFBcEMsUUFBc0RSLElBQTVEO0FBQ0EsVUFBTVMsSUFBSSxHQUFHLHVCQUFZTCxRQUFaLENBQWI7QUFDQUQsSUFBQUEsTUFBTSxDQUFDTyxPQUFQLEdBQWlCTCxJQUFqQjs7QUFDQSxRQUFJRCxRQUFKLEVBQWM7QUFDWixZQUFNTyxLQUFLLEdBQUdGLElBQUksQ0FDZkcsR0FEVyxDQUNOQyxJQUFELElBQVUsOEJBQWlCQSxJQUFJLENBQUNSLElBQXRCLEVBQTRCSixJQUE1QixFQUFrQ0MsSUFBbEMsQ0FESCxFQUVYWSxJQUZXLENBRU4sSUFGTSxDQUFkO0FBR0FYLE1BQUFBLE1BQU0sQ0FBQ08sT0FBUCxHQUFrQixHQUFFTCxJQUFLLEdBQUVNLEtBQU0sRUFBakM7QUFDRDs7QUFFRCxVQUFNSSxTQUFTLEdBQUc7QUFDaEJULE1BQUFBO0FBRGdCLEtBQWxCLENBYjhDLENBZ0I5Qzs7QUFDQSxRQUFJQyxJQUFKLEVBQVU7QUFDUlEsTUFBQUEsU0FBUyxDQUFDQyxRQUFWLEdBQXFCVCxJQUFJLENBQUNTLFFBQTFCO0FBQ0Q7O0FBQ0QsUUFBSVIsYUFBSixFQUFtQjtBQUNqQk8sTUFBQUEsU0FBUyxDQUFDUCxhQUFWLEdBQTBCQSxhQUExQjtBQUNEOztBQUNETCxJQUFBQSxNQUFNLENBQUNZLFNBQVAsR0FBbUJBLFNBQW5CO0FBQ0EsV0FBT1osTUFBUDtBQUNELEciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBlbnN1cmVBcnJheSB9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHsgUmVwbGFjZVZhcmlhYmxlcyB9IGZyb20gJy4vY29tbW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNzZENvbGxlY3RTdGVwcyB7XG4gIHByb2Nlc3MgPSBhc3luYyAoc3RlcCwgZGF0YSA9IHt9LCB0ZW1wID0ge30pID0+IHtcbiAgICBjb25zdCByZXRtc2cgPSB7fTtcbiAgICAvLyBnZXQgdGhlIG1lc3NhZ2UgdG8gZGlzcGxheVxuICAgIGNvbnN0IHsgbWVzc2FnZXMsIHRleHQsIGdhdGhlclR5cGUsIG1lbnUsIGNvbGxlY3RkaWdpdHMgfSA9IHN0ZXA7XG4gICAgY29uc3QgbXNncyA9IGVuc3VyZUFycmF5KG1lc3NhZ2VzKTtcbiAgICByZXRtc2cubWVzc2FnZSA9IHRleHQ7XG4gICAgaWYgKG1lc3NhZ2VzKSB7XG4gICAgICBjb25zdCBtTWVudSA9IG1zZ3NcbiAgICAgICAgLm1hcCgoaXRlbSkgPT4gUmVwbGFjZVZhcmlhYmxlcyhpdGVtLnRleHQsIGRhdGEsIHRlbXApKVxuICAgICAgICAuam9pbignXFxuJyk7XG4gICAgICByZXRtc2cubWVzc2FnZSA9IGAke3RleHR9JHttTWVudX1gO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlcyA9IHtcbiAgICAgIGdhdGhlclR5cGUsXG4gICAgfTtcbiAgICAvLyBtYXAgdGhlIHJlc3BvbnNlc1xuICAgIGlmIChtZW51KSB7XG4gICAgICByZXNwb25zZXMubWFwcGluZ3MgPSBtZW51Lm1hcHBpbmdzO1xuICAgIH1cbiAgICBpZiAoY29sbGVjdGRpZ2l0cykge1xuICAgICAgcmVzcG9uc2VzLmNvbGxlY3RkaWdpdHMgPSBjb2xsZWN0ZGlnaXRzO1xuICAgIH1cbiAgICByZXRtc2cucmVzcG9uc2VzID0gcmVzcG9uc2VzO1xuICAgIHJldHVybiByZXRtc2c7XG4gIH07XG59XG4iXX0=