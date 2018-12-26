import { ConOperator, ConType, ReplaceVariables } from './common';

import { getLogger, ensureArray } from '../util';

const { debug, printerror, printinfo } = getLogger().getContext('ctrlStep');

export default class ControlSteps {
  process = async (step, appdata = {}, tempdata = {}) => {
    const data = Object.assign({}, appdata);
    const temp = Object.assign({}, tempdata);
    let continueTo = null;
    // check for the conditions and loop through
    let isValid = true; // default to through
    const { conditions, actions: reAction } = step;
    // loop through to check all the conditions are met
    if (conditions) {
      conditions.forEach((cod) => {
        // equal to
        const { operand1, operand2, type: mtype } = cod.comparison;
        const first = ReplaceVariables(operand1, data, temp);
        const second = ReplaceVariables(operand2, data, temp);
        let op1 = first;
        let op2 = second;
        if (mtype === ConType.numeric) {
          op1 = parseFloat(first, 10);
          op2 = parseFloat(second, 10);
        }
        debug(`isValid before expression evaluation = ${isValid}`);
        switch (cod.operator) {
          case ConOperator.eq:
            isValid = isValid && op1 === op2;
            break;
          case ConOperator.gt:
            isValid = isValid && op1 > op2;
            break;
          case ConOperator.lt:
            isValid = isValid && op1 < op2;
            break;
          case ConOperator.gte:
            isValid = isValid && op1 >= op2;
            break;
          case ConOperator.lte:
            isValid = isValid && op1 <= op2;
            break;
          case ConOperator.ne:
            isValid = isValid && op1 !== op2;
            break;
          default:
            isValid = isValid && op1 === op2;
            break;
        }
        printinfo(
          `operand1 = ${op1}, operand2 = ${op2}, type=${
            cod.operator
          }, isValid=${isValid}`,
        );
      });
    }

    // take Actions
    if (isValid) {
      const actions = ensureArray(reAction);
      // eslint-disable-next-line
      for (let j = 0; j < actions.length; j++) {
        const act = actions[j];
        if (act.assign) {
          const expr = ReplaceVariables(act.assign.expression, data, temp);
          if (act.assign.varScope === 'app') {
            data[`$${act.assign.varName}`] = expr;
          } else {
            temp[`$${act.assign.varName}`] = expr;
          }
        }
        // capture
        if (act.capture) {
          try {
            const { data: capdata, regex } = act.capture;
            const strdata = ReplaceVariables(capdata, data, temp);
            const mex = new RegExp(regex, 'g');
            const value = strdata.match(mex);
            if (value) {
              data[`$${act.capture.varName}`] = value[0]; // eslint-disable-line
            }
          } catch (error) {
            printerror('ERROR: %s', error.message);
          }
        }
        // check if there is contineTo
        if (act.continueTo) {
          continueTo = act.continueTo.target;
          break;
        }
      }
    }

    return {
      data,
      temp,
      continueTo,
    };
  };
}
