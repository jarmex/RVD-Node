import { ReplaceVariables } from './common';

import { getLogger } from '../util';

const debug = getLogger().debugContext('logging');

export default class LogSteps {
  process = async (step, appdata = {}, tempdata = {}) => {
    const { message } = step;

    if (message) {
      const logmsg = ReplaceVariables(message, appdata, tempdata);
      debug(logmsg);
    }
  };
}
