import { ConOperator, ConType } from './Constants';
import ReplaceVariables from './ReplaceVariables';
import getLogger from './logger';
import ensureArray from './ensureArray';

const { debug, printerror } = getLogger().getContext('ctrlStep');

export default class ControlSteps {
  process = async (step, appdata = {}, tempdata = {}, moduleName) => {
    const data = Object.assign({}, appdata);
    const temp = Object.assign({}, tempdata);
    let continueTo = null;
    // check for the conditions and loop through
    let isValid = true; // default to through
    const { conditions, actions: reAction, conditionExpression } = step;
    // get the conditionExpression
    const conditionResults = {};
    // loop through to check all the conditions are met
    if (conditions) {
      // each condition
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
        // debug(`isValid before expression evaluation = ${isValid}`);
        const name = (cod.name || '').toLowerCase();
        switch (cod.operator) {
          case ConOperator.eq:
            conditionResults[name] = op1 === op2;
            break;
          case ConOperator.gt:
            conditionResults[name] = op1 > op2;
            break;
          case ConOperator.lt:
            conditionResults[name] = op1 < op2;
            break;
          case ConOperator.gte:
            conditionResults[name] = op1 >= op2;
            break;
          case ConOperator.lte:
            conditionResults[name] = op1 <= op2;
            break;
          case ConOperator.ne:
            conditionResults[name] = op1 !== op2;
            break;
          default:
            conditionResults[name] = op1 === op2;
            break;
        }
        debug(
          `${cod.name}: ${op1} "${cod.operator}" ${op2} = ${
            conditionResults[name]
          }`,
        );
      });
    }
    debug('%o', conditionResults);
    // check for the condition expression
    if (conditionExpression) {
      debug(conditionExpression);
      const conditionSplit = conditionExpression.toLowerCase().split(' ');
      let prevAnd = false;
      let prevOr = false;
      // C1 AND C2 AND C3 => c1 and c2 and c3 => ['c1', 'and', 'c2', 'or', 'c3' ]
      conditionSplit.forEach((nameOrcond) => {
        if (nameOrcond === 'and') {
          // hold onto the and!!
          prevAnd = true;
          prevOr = false;
        } else if (nameOrcond === 'or') {
          prevOr = true;
          prevAnd = false;
        } else {
          const resultExist = conditionResults[nameOrcond];
          // check if result computed exist
          if (resultExist !== undefined) {
            if (prevAnd) {
              // the operand was AND
              isValid = isValid && conditionResults[nameOrcond];
              prevAnd = false;
            } else if (prevOr) {
              // the operand was OR
              isValid = isValid || conditionResults[nameOrcond];
              prevOr = false;
            } else {
              isValid = resultExist;
            }
          }
        }
      });
    }
    debug(`isValid = ${isValid}`);
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
          const { target } = act.continueTo;
          if (!target) {
            printerror('ERROR: No target module specified');
          } else if (target && target === moduleName) {
            printerror('ERROR: Cyclic module execution detected');
          } else {
            continueTo = target;
          }
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
