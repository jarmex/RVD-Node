"use strict";

exports.__esModule = true;
exports.default = void 0;

var _common = require("./common");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let UssdSaySteps = function UssdSaySteps() {
  _defineProperty(this, "process", async (step, appdata = {}, tempdata = {}) => {
    const retmsg = {};
    const {
      text
    } = step;
    retmsg.message = (0, _common.ReplaceVariables)(text, appdata, tempdata);
    return retmsg;
  });
};

exports.default = UssdSaySteps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db250cm9sbGVyL1Vzc2RTYXkuanMiXSwibmFtZXMiOlsiVXNzZFNheVN0ZXBzIiwic3RlcCIsImFwcGRhdGEiLCJ0ZW1wZGF0YSIsInJldG1zZyIsInRleHQiLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7O0lBRXFCQSxZO21DQUNULE9BQU9DLElBQVAsRUFBYUMsT0FBTyxHQUFHLEVBQXZCLEVBQTJCQyxRQUFRLEdBQUcsRUFBdEMsS0FBNkM7QUFDckQsVUFBTUMsTUFBTSxHQUFHLEVBQWY7QUFFQSxVQUFNO0FBQUVDLE1BQUFBO0FBQUYsUUFBV0osSUFBakI7QUFFQUcsSUFBQUEsTUFBTSxDQUFDRSxPQUFQLEdBQWlCLDhCQUFpQkQsSUFBakIsRUFBdUJILE9BQXZCLEVBQWdDQyxRQUFoQyxDQUFqQjtBQUVBLFdBQU9DLE1BQVA7QUFDRCxHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVwbGFjZVZhcmlhYmxlcyB9IGZyb20gJy4vY29tbW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNzZFNheVN0ZXBzIHtcbiAgcHJvY2VzcyA9IGFzeW5jIChzdGVwLCBhcHBkYXRhID0ge30sIHRlbXBkYXRhID0ge30pID0+IHtcbiAgICBjb25zdCByZXRtc2cgPSB7fTtcblxuICAgIGNvbnN0IHsgdGV4dCB9ID0gc3RlcDtcblxuICAgIHJldG1zZy5tZXNzYWdlID0gUmVwbGFjZVZhcmlhYmxlcyh0ZXh0LCBhcHBkYXRhLCB0ZW1wZGF0YSk7XG5cbiAgICByZXR1cm4gcmV0bXNnO1xuICB9O1xufVxuIl19