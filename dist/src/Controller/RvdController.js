"use strict";

exports.__esModule = true;
exports.default = void 0;

var _state = _interopRequireDefault(require("../../state/state.json"));

var _common = require("./common");

var _ControlSteps = _interopRequireDefault(require("./ControlSteps"));

var _ExternalServiceStep = _interopRequireDefault(require("./ExternalServiceStep"));

var _LogStep = _interopRequireDefault(require("./LogStep"));

var _UssdCollectStep = _interopRequireDefault(require("./UssdCollectStep"));

var _UssdSay = _interopRequireDefault(require("./UssdSay"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require('dotenv').config();

let RVDController = function RVDController(session = {}, state = {}) {
  _defineProperty(this, "rvdProcess", async moduleName => {
    const allnodes = _state.default.nodes.find(item => item.name === moduleName);

    if (!allnodes) {
      return {
        message: process.env.DefaultMsg,
        data: null,
        next: false
      }; // for the error message
    }

    const {
      msisdn,
      cellid
    } = this.data;
    this.data = Object.assign(this.data, {
      $core_From: msisdn,
      $cell_id: cellid
    });
    let continueTo = null;
    const retmsg = {
      next: false
    };
    const {
      steps
    } = allnodes;
    const ctrlStep = new _ControlSteps.default(); // eslint-disable-next-line

    for (let i = 0; i < steps.length; i++) {
      const item = steps[i];

      if (item.kind === _common.Kinds.control) {
        // eslint-disable-next-line
        const retdata = await ctrlStep.process(item, this.data, this.temp);
        this.data = Object.assign(this.data, retdata.data);
        this.temp = Object.assign(this.temp, retdata.temp);

        if (retdata.continueTo) {
          // eslint-disable-next-line
          continueTo = retdata.continueTo;
          break;
        }
      } else if (item.kind === _common.Kinds.externalService) {
        const extStep = new _ExternalServiceStep.default(); // eslint-disable-next-line

        const exdata = await extStep.process(item, this.data, this.temp);
        this.data = Object.assign(this.data, exdata.data);
        this.temp = Object.assign(this.temp, exdata.temp); // check for the control to continueTo
      } else if (item.kind === _common.Kinds.log) {
        const logStep = new _LogStep.default();
        logStep.process(item, this.data, this.temp);
      } else if (item.kind === _common.Kinds.ussdCollect) {
        const colData = new _UssdCollectStep.default(); // eslint-disable-next-line

        const ucollect = await colData.process(item, this.data, this.temp);
        retmsg.message = ucollect.message;
        retmsg.next = true;
        this.data = Object.assign(this.data, {
          prevModule: moduleName,
          responses: ucollect.responses
        });
        break;
      } else if (item.kind === _common.Kinds.ussdSay) {
        const uSay = new _UssdSay.default(); // eslint-disable-next-line

        const uMsg = await uSay.process(item, this.data, this.temp);
        retmsg.message = uMsg.message;
        retmsg.next = false;
      } else {
        console.error(item); // eslint-disable-line
      }
    }

    if (continueTo) {
      return this.rvdProcess(continueTo);
    } // return the message


    retmsg.data = _objectSpread({}, this.data);
    return retmsg;
  });

  _defineProperty(this, "rvd", async input => {
    // check if the session exist
    if (this.sessionInfo) {
      // check if there input is in relation with a response
      if (this.responses) {
        // map through to get the next module
        if (this.responses.gatherType === _common.ussdCollectGatherType.menu) {
          const uinput = parseInt(input, 10);
          const mm = this.responses.mappings.find(rep => parseInt(rep.digits, 10) === uinput);

          if (mm) {
            return this.rvdProcess(mm.next);
          } // PROCESS WHEN INFO DOES NOT EXIST

        } else if (this.responses.gatherType === _common.ussdCollectGatherType.collectdigits) {
          const {
            next,
            collectVariable,
            scope
          } = this.responses.collectdigits;

          if (scope === 'application') {
            this.data[`$${collectVariable}`] = input;
          } else {
            this.temp[`$${collectVariable}`] = input;
          }

          return this.rvdProcess(next);
        }
      } else {
        return this.rvdProcess(this.sessionInfo.moduleName);
      }
    }

    const currentModule = _state.default.header.startNodeName;
    return this.rvdProcess(currentModule);
  });

  this.sessionInfo = session;
  this.temp = {};

  if (session) {
    const {
      responses
    } = session,
          rest = _objectWithoutProperties(session, ["responses"]);

    this.responses = responses;
    this.data = Object.assign({}, rest, state);
  } else {
    this.data = state;
    this.responses = null;
  }
};

exports.default = RVDController;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db250cm9sbGVyL1J2ZENvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImNvbmZpZyIsIlJWRENvbnRyb2xsZXIiLCJzZXNzaW9uIiwic3RhdGUiLCJtb2R1bGVOYW1lIiwiYWxsbm9kZXMiLCJydmRqc29uIiwibm9kZXMiLCJmaW5kIiwiaXRlbSIsIm5hbWUiLCJtZXNzYWdlIiwicHJvY2VzcyIsImVudiIsIkRlZmF1bHRNc2ciLCJkYXRhIiwibmV4dCIsIm1zaXNkbiIsImNlbGxpZCIsIk9iamVjdCIsImFzc2lnbiIsIiRjb3JlX0Zyb20iLCIkY2VsbF9pZCIsImNvbnRpbnVlVG8iLCJyZXRtc2ciLCJzdGVwcyIsImN0cmxTdGVwIiwiQ29udHJvbFN0ZXBzIiwiaSIsImxlbmd0aCIsImtpbmQiLCJLaW5kcyIsImNvbnRyb2wiLCJyZXRkYXRhIiwidGVtcCIsImV4dGVybmFsU2VydmljZSIsImV4dFN0ZXAiLCJFeHRlcm5hbFNlcnZpY2VTdGVwcyIsImV4ZGF0YSIsImxvZyIsImxvZ1N0ZXAiLCJMb2dTdGVwcyIsInVzc2RDb2xsZWN0IiwiY29sRGF0YSIsIlVzc2RDb2xsZWN0U3RlcHMiLCJ1Y29sbGVjdCIsInByZXZNb2R1bGUiLCJyZXNwb25zZXMiLCJ1c3NkU2F5IiwidVNheSIsIlVzc2RTYXlTdGVwcyIsInVNc2ciLCJjb25zb2xlIiwiZXJyb3IiLCJydmRQcm9jZXNzIiwiaW5wdXQiLCJzZXNzaW9uSW5mbyIsImdhdGhlclR5cGUiLCJ1c3NkQ29sbGVjdEdhdGhlclR5cGUiLCJtZW51IiwidWlucHV0IiwicGFyc2VJbnQiLCJtbSIsIm1hcHBpbmdzIiwicmVwIiwiZGlnaXRzIiwiY29sbGVjdGRpZ2l0cyIsImNvbGxlY3RWYXJpYWJsZSIsInNjb3BlIiwiY3VycmVudE1vZHVsZSIsImhlYWRlciIsInN0YXJ0Tm9kZU5hbWUiLCJyZXN0Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOztBQUNBOztBQUNB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TCxDQUFXLElBQUdvRCxlQUFnQixFQUE5QixJQUFtQ1osS0FBbkM7QUFDRCxXQUZELE1BRU87QUFDTCxpQkFBS3JCLElBQUwsQ0FBVyxJQUFHaUMsZUFBZ0IsRUFBOUIsSUFBbUNaLEtBQW5DO0FBQ0Q7O0FBQ0QsaUJBQU8sS0FBS0QsVUFBTCxDQUFnQnRDLElBQWhCLENBQVA7QUFDRDtBQUNGLE9BdEJELE1Bc0JPO0FBQ0wsZUFBTyxLQUFLc0MsVUFBTCxDQUFnQixLQUFLRSxXQUFMLENBQWlCcEQsVUFBakMsQ0FBUDtBQUNEO0FBQ0Y7O0FBQ0QsVUFBTWlFLGFBQWEsR0FBRy9ELGVBQVFnRSxNQUFSLENBQWVDLGFBQXJDO0FBQ0EsV0FBTyxLQUFLakIsVUFBTCxDQUFnQmUsYUFBaEIsQ0FBUDtBQUNELEdBeEhxQzs7QUFDcEMsT0FBS2IsV0FBTCxHQUFtQnRELE9BQW5CO0FBQ0EsT0FBS2dDLElBQUwsR0FBWSxFQUFaOztBQUNBLE1BQUloQyxPQUFKLEVBQWE7QUFDWCxVQUFNO0FBQUU2QyxNQUFBQTtBQUFGLFFBQXlCN0MsT0FBL0I7QUFBQSxVQUFzQnNFLElBQXRCLDRCQUErQnRFLE9BQS9COztBQUNBLFNBQUs2QyxTQUFMLEdBQWlCQSxTQUFqQjtBQUNBLFNBQUtoQyxJQUFMLEdBQVlJLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JvRCxJQUFsQixFQUF3QnJFLEtBQXhCLENBQVo7QUFDRCxHQUpELE1BSU87QUFDTCxTQUFLWSxJQUFMLEdBQVlaLEtBQVo7QUFDQSxTQUFLNEMsU0FBTCxHQUFpQixJQUFqQjtBQUNEO0FBQ0YsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBydmRqc29uIGZyb20gJy4uLy4uL3N0YXRlL3N0YXRlLmpzb24nO1xuaW1wb3J0IHsgS2luZHMsIHVzc2RDb2xsZWN0R2F0aGVyVHlwZSB9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBDb250cm9sU3RlcHMgZnJvbSAnLi9Db250cm9sU3RlcHMnO1xuaW1wb3J0IEV4dGVybmFsU2VydmljZVN0ZXBzIGZyb20gJy4vRXh0ZXJuYWxTZXJ2aWNlU3RlcCc7XG5pbXBvcnQgTG9nU3RlcHMgZnJvbSAnLi9Mb2dTdGVwJztcbmltcG9ydCBVc3NkQ29sbGVjdFN0ZXBzIGZyb20gJy4vVXNzZENvbGxlY3RTdGVwJztcbmltcG9ydCBVc3NkU2F5U3RlcHMgZnJvbSAnLi9Vc3NkU2F5JztcblxucmVxdWlyZSgnZG90ZW52JykuY29uZmlnKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJWRENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihzZXNzaW9uID0ge30sIHN0YXRlID0ge30pIHtcbiAgICB0aGlzLnNlc3Npb25JbmZvID0gc2Vzc2lvbjtcbiAgICB0aGlzLnRlbXAgPSB7fTtcbiAgICBpZiAoc2Vzc2lvbikge1xuICAgICAgY29uc3QgeyByZXNwb25zZXMsIC4uLnJlc3QgfSA9IHNlc3Npb247XG4gICAgICB0aGlzLnJlc3BvbnNlcyA9IHJlc3BvbnNlcztcbiAgICAgIHRoaXMuZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHJlc3QsIHN0YXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRhID0gc3RhdGU7XG4gICAgICB0aGlzLnJlc3BvbnNlcyA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcnZkUHJvY2VzcyA9IGFzeW5jIChtb2R1bGVOYW1lKSA9PiB7XG4gICAgY29uc3QgYWxsbm9kZXMgPSBydmRqc29uLm5vZGVzLmZpbmQoKGl0ZW0pID0+IGl0ZW0ubmFtZSA9PT0gbW9kdWxlTmFtZSk7XG5cbiAgICBpZiAoIWFsbG5vZGVzKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtZXNzYWdlOiBwcm9jZXNzLmVudi5EZWZhdWx0TXNnLFxuICAgICAgICBkYXRhOiBudWxsLFxuICAgICAgICBuZXh0OiBmYWxzZSxcbiAgICAgIH07IC8vIGZvciB0aGUgZXJyb3IgbWVzc2FnZVxuICAgIH1cblxuICAgIGNvbnN0IHsgbXNpc2RuLCBjZWxsaWQgfSA9IHRoaXMuZGF0YTtcbiAgICB0aGlzLmRhdGEgPSBPYmplY3QuYXNzaWduKHRoaXMuZGF0YSwge1xuICAgICAgJGNvcmVfRnJvbTogbXNpc2RuLFxuICAgICAgJGNlbGxfaWQ6IGNlbGxpZCxcbiAgICB9KTtcbiAgICBsZXQgY29udGludWVUbyA9IG51bGw7XG4gICAgY29uc3QgcmV0bXNnID0geyBuZXh0OiBmYWxzZSB9O1xuICAgIGNvbnN0IHsgc3RlcHMgfSA9IGFsbG5vZGVzO1xuICAgIGNvbnN0IGN0cmxTdGVwID0gbmV3IENvbnRyb2xTdGVwcygpO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGVwcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaXRlbSA9IHN0ZXBzW2ldO1xuICAgICAgaWYgKGl0ZW0ua2luZCA9PT0gS2luZHMuY29udHJvbCkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgY29uc3QgcmV0ZGF0YSA9IGF3YWl0IGN0cmxTdGVwLnByb2Nlc3MoaXRlbSwgdGhpcy5kYXRhLCB0aGlzLnRlbXApO1xuXG4gICAgICAgIHRoaXMuZGF0YSA9IE9iamVjdC5hc3NpZ24odGhpcy5kYXRhLCByZXRkYXRhLmRhdGEpO1xuICAgICAgICB0aGlzLnRlbXAgPSBPYmplY3QuYXNzaWduKHRoaXMudGVtcCwgcmV0ZGF0YS50ZW1wKTtcbiAgICAgICAgaWYgKHJldGRhdGEuY29udGludWVUbykge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgIGNvbnRpbnVlVG8gPSByZXRkYXRhLmNvbnRpbnVlVG87XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5raW5kID09PSBLaW5kcy5leHRlcm5hbFNlcnZpY2UpIHtcbiAgICAgICAgY29uc3QgZXh0U3RlcCA9IG5ldyBFeHRlcm5hbFNlcnZpY2VTdGVwcygpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgY29uc3QgZXhkYXRhID0gYXdhaXQgZXh0U3RlcC5wcm9jZXNzKGl0ZW0sIHRoaXMuZGF0YSwgdGhpcy50ZW1wKTtcblxuICAgICAgICB0aGlzLmRhdGEgPSBPYmplY3QuYXNzaWduKHRoaXMuZGF0YSwgZXhkYXRhLmRhdGEpO1xuICAgICAgICB0aGlzLnRlbXAgPSBPYmplY3QuYXNzaWduKHRoaXMudGVtcCwgZXhkYXRhLnRlbXApO1xuICAgICAgICAvLyBjaGVjayBmb3IgdGhlIGNvbnRyb2wgdG8gY29udGludWVUb1xuICAgICAgfSBlbHNlIGlmIChpdGVtLmtpbmQgPT09IEtpbmRzLmxvZykge1xuICAgICAgICBjb25zdCBsb2dTdGVwID0gbmV3IExvZ1N0ZXBzKCk7XG4gICAgICAgIGxvZ1N0ZXAucHJvY2VzcyhpdGVtLCB0aGlzLmRhdGEsIHRoaXMudGVtcCk7XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0ua2luZCA9PT0gS2luZHMudXNzZENvbGxlY3QpIHtcbiAgICAgICAgY29uc3QgY29sRGF0YSA9IG5ldyBVc3NkQ29sbGVjdFN0ZXBzKCk7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICBjb25zdCB1Y29sbGVjdCA9IGF3YWl0IGNvbERhdGEucHJvY2VzcyhpdGVtLCB0aGlzLmRhdGEsIHRoaXMudGVtcCk7XG4gICAgICAgIHJldG1zZy5tZXNzYWdlID0gdWNvbGxlY3QubWVzc2FnZTtcbiAgICAgICAgcmV0bXNnLm5leHQgPSB0cnVlO1xuICAgICAgICB0aGlzLmRhdGEgPSBPYmplY3QuYXNzaWduKHRoaXMuZGF0YSwge1xuICAgICAgICAgIHByZXZNb2R1bGU6IG1vZHVsZU5hbWUsXG4gICAgICAgICAgcmVzcG9uc2VzOiB1Y29sbGVjdC5yZXNwb25zZXMsXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5raW5kID09PSBLaW5kcy51c3NkU2F5KSB7XG4gICAgICAgIGNvbnN0IHVTYXkgPSBuZXcgVXNzZFNheVN0ZXBzKCk7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICBjb25zdCB1TXNnID0gYXdhaXQgdVNheS5wcm9jZXNzKGl0ZW0sIHRoaXMuZGF0YSwgdGhpcy50ZW1wKTtcbiAgICAgICAgcmV0bXNnLm1lc3NhZ2UgPSB1TXNnLm1lc3NhZ2U7XG4gICAgICAgIHJldG1zZy5uZXh0ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKGl0ZW0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjb250aW51ZVRvKSB7XG4gICAgICByZXR1cm4gdGhpcy5ydmRQcm9jZXNzKGNvbnRpbnVlVG8pO1xuICAgIH1cbiAgICAvLyByZXR1cm4gdGhlIG1lc3NhZ2VcbiAgICByZXRtc2cuZGF0YSA9IHsgLi4udGhpcy5kYXRhIH07XG4gICAgcmV0dXJuIHJldG1zZztcbiAgfTtcblxuICBydmQgPSBhc3luYyAoaW5wdXQpID0+IHtcbiAgICAvLyBjaGVjayBpZiB0aGUgc2Vzc2lvbiBleGlzdFxuICAgIGlmICh0aGlzLnNlc3Npb25JbmZvKSB7XG4gICAgICAvLyBjaGVjayBpZiB0aGVyZSBpbnB1dCBpcyBpbiByZWxhdGlvbiB3aXRoIGEgcmVzcG9uc2VcbiAgICAgIGlmICh0aGlzLnJlc3BvbnNlcykge1xuICAgICAgICAvLyBtYXAgdGhyb3VnaCB0byBnZXQgdGhlIG5leHQgbW9kdWxlXG4gICAgICAgIGlmICh0aGlzLnJlc3BvbnNlcy5nYXRoZXJUeXBlID09PSB1c3NkQ29sbGVjdEdhdGhlclR5cGUubWVudSkge1xuICAgICAgICAgIGNvbnN0IHVpbnB1dCA9IHBhcnNlSW50KGlucHV0LCAxMCk7XG4gICAgICAgICAgY29uc3QgbW0gPSB0aGlzLnJlc3BvbnNlcy5tYXBwaW5ncy5maW5kKFxuICAgICAgICAgICAgKHJlcCkgPT4gcGFyc2VJbnQocmVwLmRpZ2l0cywgMTApID09PSB1aW5wdXQsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAobW0pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJ2ZFByb2Nlc3MobW0ubmV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFBST0NFU1MgV0hFTiBJTkZPIERPRVMgTk9UIEVYSVNUXG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgdGhpcy5yZXNwb25zZXMuZ2F0aGVyVHlwZSA9PT0gdXNzZENvbGxlY3RHYXRoZXJUeXBlLmNvbGxlY3RkaWdpdHNcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3QgeyBuZXh0LCBjb2xsZWN0VmFyaWFibGUsIHNjb3BlIH0gPSB0aGlzLnJlc3BvbnNlcy5jb2xsZWN0ZGlnaXRzO1xuICAgICAgICAgIGlmIChzY29wZSA9PT0gJ2FwcGxpY2F0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5kYXRhW2AkJHtjb2xsZWN0VmFyaWFibGV9YF0gPSBpbnB1dDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50ZW1wW2AkJHtjb2xsZWN0VmFyaWFibGV9YF0gPSBpbnB1dDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMucnZkUHJvY2VzcyhuZXh0KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucnZkUHJvY2Vzcyh0aGlzLnNlc3Npb25JbmZvLm1vZHVsZU5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBjdXJyZW50TW9kdWxlID0gcnZkanNvbi5oZWFkZXIuc3RhcnROb2RlTmFtZTtcbiAgICByZXR1cm4gdGhpcy5ydmRQcm9jZXNzKGN1cnJlbnRNb2R1bGUpO1xuICB9O1xufVxuIl19