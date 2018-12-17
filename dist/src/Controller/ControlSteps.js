"use strict";

exports.__esModule = true;
exports.default = void 0;

var _common = require("./common");

var _util = require("../util");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const debug = (0, _util.getLogger)().debugContext('ctrlStep');

let ControlSteps = function ControlSteps() {
  _defineProperty(this, "process", async (step, appdata = {}, tempdata = {}) => {
    const data = Object.assign({}, appdata);
    const temp = Object.assign({}, tempdata);
    let continueTo = null; // check for the conditions and loop through

    let isValid = true; // default to through

    const {
      conditions,
      actions
    } = step; // loop through to check all the conditions are met

    conditions.forEach(cod => {
      // equal to
      const {
        operand1,
        operand2,
        type: mtype
      } = cod.comparison;
      const first = (0, _common.ReplaceVariables)(operand1, data, temp);
      const second = (0, _common.ReplaceVariables)(operand2, data, temp);
      let op1 = first;
      let op2 = second;

      if (mtype === _common.ConType.numeric) {
        op1 = parseFloat(first, 10);
        op2 = parseFloat(second, 10);
      }

      debug(`operand1 = ${op1}, operand2 = ${op2}, type=${cod.operator}`);

      switch (cod.operator) {
        case _common.ConOperator.eq:
          isValid = isValid && op1 === op2;
          break;

        case _common.ConOperator.gt:
          isValid = isValid && op1 > op2;
          break;

        case _common.ConOperator.lt:
          isValid = isValid && op1 < op2;
          break;

        case _common.ConOperator.gte:
          isValid = isValid && op1 >= op2;
          break;

        case _common.ConOperator.lte:
          isValid = isValid && op1 <= op2;
          break;

        case _common.ConOperator.ne:
          isValid = isValid && op1 !== op2;
          break;

        default:
          isValid = isValid && op1 === op2;
          break;
      }
    }); // take Actions

    if (isValid) {
      // eslint-disable-next-line
      for (let j = 0; j < actions.length; j++) {
        const act = actions[j];

        if (act.assign) {
          const expr = (0, _common.ReplaceVariables)(act.assign.expression, data, temp);

          if (act.assign.varScope === 'app') {
            data[`$${act.assign.varName}`] = expr;
          } else {
            temp[`$${act.assign.varName}`] = expr;
          }
        } // capture


        if (act.capture) {
          try {
            const {
              data: capdata,
              regex
            } = act.capture;
            const strdata = (0, _common.ReplaceVariables)(capdata, data, temp);
            const mex = new RegExp(regex);
            const value = strdata.match(mex);

            if (value) {
              data[`$${act.capture.varName}`] = value[0]; // eslint-disable-line
            }
          } catch (error) {
            console.error(error); // eslint-disable-line
          }
        } // check if there is contineTo


        if (act.continueTo) {
          continueTo = act.continueTo.target;
          break;
        }
      }
    }

    return {
      data,
      temp,
      continueTo
    };
  });
};

exports.default = ControlSteps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db250cm9sbGVyL0NvbnRyb2xTdGVwcy5qcyJdLCJuYW1lcyI6WyJkZWJ1ZyIsImRlYnVnQ29udGV4dCIsIkNvbnRyb2xTdGVwcyIsInN0ZXAiLCJhcHBkYXRhIiwidGVtcGRhdGEiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwidGVtcCIsImNvbnRpbnVlVG8iLCJpc1ZhbGlkIiwiY29uZGl0aW9ucyIsImFjdGlvbnMiLCJmb3JFYWNoIiwiY29kIiwib3BlcmFuZDEiLCJvcGVyYW5kMiIsInR5cGUiLCJtdHlwZSIsImNvbXBhcmlzb24iLCJmaXJzdCIsInNlY29uZCIsIm9wMSIsIm9wMiIsIkNvblR5cGUiLCJudW1lcmljIiwicGFyc2VGbG9hdCIsIm9wZXJhdG9yIiwiQ29uT3BlcmF0b3IiLCJlcSIsImd0IiwibHQiLCJndGUiLCJsdGUiLCJuZSIsImoiLCJsZW5ndGgiLCJhY3QiLCJleHByIiwiZXhwcmVzc2lvbiIsInZhclNjb3BlIiwidmFyTmFtZSIsImNhcHR1cmUiLCJjYXBkYXRhIiwicmVnZXgiLCJzdHJkYXRhIiwibWV4IiwiUmVnRXhwIiwidmFsdWUiLCJtYXRjaCIsImVycm9yIiwiY29uc29sZSIsInRhcmdldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFFQTs7OztBQUVBLE1BQU1BLEtBQUssR0FBRyx1QkFBWUMsWUFBWixDQUF5QixVQUF6QixDQUFkOztJQUVxQkMsWTttQ0FDVCxPQUFPQyxJQUFQLEVBQWFDLE9BQU8sR0FBRyxFQUF2QixFQUEyQkMsUUFBUSxHQUFHLEVBQXRDLEtBQTZDO0FBQ3JELFVBQU1DLElBQUksR0FBR0MsTUFBTSxDQUFDQyxNQUFQLENBQWMsRUFBZCxFQUFrQkosT0FBbEIsQ0FBYjtBQUNBLFVBQU1LLElBQUksR0FBR0YsTUFBTSxDQUFDQyxNQUFQLENBQWMsRUFBZCxFQUFrQkgsUUFBbEIsQ0FBYjtBQUNBLFFBQUlLLFVBQVUsR0FBRyxJQUFqQixDQUhxRCxDQUlyRDs7QUFDQSxR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QVEsRUFBeEIsQ0FBSixHQUFpQ0gsSUFBakM7QUFDRDtBQUNGLFNBVHNDLENBVXZDOzs7QUFDQSxZQUFJRCxHQUFHLENBQUNLLE9BQVIsRUFBaUI7QUFDZixjQUFJO0FBQ0Ysa0JBQU07QUFBRXJDLGNBQUFBLElBQUksRUFBRXNDLE9BQVI7QUFBaUJDLGNBQUFBO0FBQWpCLGdCQUEyQlAsR0FBRyxDQUFDSyxPQUFyQztBQUNBLGtCQUFNRyxPQUFPLEdBQUcsOEJBQWlCRixPQUFqQixFQUEwQnRDLElBQTFCLEVBQWdDRyxJQUFoQyxDQUFoQjtBQUNBLGtCQUFNc0MsR0FBRyxHQUFHLElBQUlDLE1BQUosQ0FBV0gsS0FBWCxDQUFaO0FBQ0Esa0JBQU1JLEtBQUssR0FBR0gsT0FBTyxDQUFDSSxLQUFSLENBQWNILEdBQWQsQ0FBZDs7QUFDQSxnQkFBSUUsS0FBSixFQUFXO0FBQ1QzQyxjQUFBQSxJQUFJLENBQUUsSUFBR2dDLEdBQUcsQ0FBQ0ssT0FBSixDQUFZRCxPQUFRLEVBQXpCLENBQUosR0FBa0NPLEtBQUssQ0FBQyxDQUFELENBQXZDLENBRFMsQ0FDbUM7QUFDN0M7QUFDRixXQVJELENBUUUsT0FBT0UsS0FBUCxFQUFjO0FBQ2RDLFlBQUFBLE9BQU8sQ0FBQ0QsS0FBUixDQUFjQSxLQUFkLEVBRGMsQ0FDUTtBQUN2QjtBQUNGLFNBdkJzQyxDQXdCdkM7OztBQUNBLFlBQUliLEdBQUcsQ0FBQzVCLFVBQVIsRUFBb0I7QUFDbEJBLFVBQUFBLFVBQVUsR0FBRzRCLEdBQUcsQ0FBQzVCLFVBQUosQ0FBZTJDLE1BQTVCO0FBQ0E7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsV0FBTztBQUNML0MsTUFBQUEsSUFESztBQUVMRyxNQUFBQSxJQUZLO0FBR0xDLE1BQUFBO0FBSEssS0FBUDtBQUtELEciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25PcGVyYXRvciwgQ29uVHlwZSwgUmVwbGFjZVZhcmlhYmxlcyB9IGZyb20gJy4vY29tbW9uJztcblxuaW1wb3J0IHsgZ2V0TG9nZ2VyIH0gZnJvbSAnLi4vdXRpbCc7XG5cbmNvbnN0IGRlYnVnID0gZ2V0TG9nZ2VyKCkuZGVidWdDb250ZXh0KCdjdHJsU3RlcCcpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250cm9sU3RlcHMge1xuICBwcm9jZXNzID0gYXN5bmMgKHN0ZXAsIGFwcGRhdGEgPSB7fSwgdGVtcGRhdGEgPSB7fSkgPT4ge1xuICAgIGNvbnN0IGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBhcHBkYXRhKTtcbiAgICBjb25zdCB0ZW1wID0gT2JqZWN0LmFzc2lnbih7fSwgdGVtcGRhdGEpO1xuICAgIGxldCBjb250aW51ZVRvID0gbnVsbDtcbiAgICAvLyBjaGVjayBmb3IgdGhlIGNvbmRpdGlvbnMgYW5kIGxvb3AgdGhyb3VnaFxuICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTsgLy8gZGVmYXVsdCB0byB0aHJvdWdoXG4gICAgY29uc3QgeyBjb25kaXRpb25zLCBhY3Rpb25zIH0gPSBzdGVwO1xuICAgIC8vIGxvb3AgdGhyb3VnaCB0byBjaGVjayBhbGwgdGhlIGNvbmRpdGlvbnMgYXJlIG1ldFxuICAgIGNvbmRpdGlvbnMuZm9yRWFjaCgoY29kKSA9PiB7XG4gICAgICAvLyBlcXVhbCB0b1xuICAgICAgY29uc3QgeyBvcGVyYW5kMSwgb3BlcmFuZDIsIHR5cGU6IG10eXBlIH0gPSBjb2QuY29tcGFyaXNvbjtcbiAgICAgIGNvbnN0IGZpcnN0ID0gUmVwbGFjZVZhcmlhYmxlcyhvcGVyYW5kMSwgZGF0YSwgdGVtcCk7XG4gICAgICBjb25zdCBzZWNvbmQgPSBSZXBsYWNlVmFyaWFibGVzKG9wZXJhbmQyLCBkYXRhLCB0ZW1wKTtcbiAgICAgIGxldCBvcDEgPSBmaXJzdDtcbiAgICAgIGxldCBvcDIgPSBzZWNvbmQ7XG4gICAgICBpZiAobXR5cGUgPT09IENvblR5cGUubnVtZXJpYykge1xuICAgICAgICBvcDEgPSBwYXJzZUZsb2F0KGZpcnN0LCAxMCk7XG4gICAgICAgIG9wMiA9IHBhcnNlRmxvYXQoc2Vjb25kLCAxMCk7XG4gICAgICB9XG4gICAgICBkZWJ1Zyhgb3BlcmFuZDEgPSAke29wMX0sIG9wZXJhbmQyID0gJHtvcDJ9LCB0eXBlPSR7Y29kLm9wZXJhdG9yfWApO1xuICAgICAgc3dpdGNoIChjb2Qub3BlcmF0b3IpIHtcbiAgICAgICAgY2FzZSBDb25PcGVyYXRvci5lcTpcbiAgICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiBvcDEgPT09IG9wMjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBDb25PcGVyYXRvci5ndDpcbiAgICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiBvcDEgPiBvcDI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQ29uT3BlcmF0b3IubHQ6XG4gICAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgb3AxIDwgb3AyO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIENvbk9wZXJhdG9yLmd0ZTpcbiAgICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiBvcDEgPj0gb3AyO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIENvbk9wZXJhdG9yLmx0ZTpcbiAgICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiBvcDEgPD0gb3AyO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIENvbk9wZXJhdG9yLm5lOlxuICAgICAgICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIG9wMSAhPT0gb3AyO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIG9wMSA9PT0gb3AyO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gdGFrZSBBY3Rpb25zXG4gICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhY3Rpb25zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGNvbnN0IGFjdCA9IGFjdGlvbnNbal07XG4gICAgICAgIGlmIChhY3QuYXNzaWduKSB7XG4gICAgICAgICAgY29uc3QgZXhwciA9IFJlcGxhY2VWYXJpYWJsZXMoYWN0LmFzc2lnbi5leHByZXNzaW9uLCBkYXRhLCB0ZW1wKTtcbiAgICAgICAgICBpZiAoYWN0LmFzc2lnbi52YXJTY29wZSA9PT0gJ2FwcCcpIHtcbiAgICAgICAgICAgIGRhdGFbYCQke2FjdC5hc3NpZ24udmFyTmFtZX1gXSA9IGV4cHI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRlbXBbYCQke2FjdC5hc3NpZ24udmFyTmFtZX1gXSA9IGV4cHI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGNhcHR1cmVcbiAgICAgICAgaWYgKGFjdC5jYXB0dXJlKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YTogY2FwZGF0YSwgcmVnZXggfSA9IGFjdC5jYXB0dXJlO1xuICAgICAgICAgICAgY29uc3Qgc3RyZGF0YSA9IFJlcGxhY2VWYXJpYWJsZXMoY2FwZGF0YSwgZGF0YSwgdGVtcCk7XG4gICAgICAgICAgICBjb25zdCBtZXggPSBuZXcgUmVnRXhwKHJlZ2V4KTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gc3RyZGF0YS5tYXRjaChtZXgpO1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgIGRhdGFbYCQke2FjdC5jYXB0dXJlLnZhck5hbWV9YF0gPSB2YWx1ZVswXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBjb250aW5lVG9cbiAgICAgICAgaWYgKGFjdC5jb250aW51ZVRvKSB7XG4gICAgICAgICAgY29udGludWVUbyA9IGFjdC5jb250aW51ZVRvLnRhcmdldDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBkYXRhLFxuICAgICAgdGVtcCxcbiAgICAgIGNvbnRpbnVlVG8sXG4gICAgfTtcbiAgfTtcbn1cbiJdfQ==