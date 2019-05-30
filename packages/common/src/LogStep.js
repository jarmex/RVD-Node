import ReplaceVariables from './ReplaceVariables';
import getLogger from './logger';

const { printinfo } = getLogger().getContext('logging');

export default class LogSteps {
  process = async (step, appdata = {}, tempdata = {}) => {
    const { message } = step;

    if (message) {
      const logmsg = ReplaceVariables(message, appdata, tempdata);
      printinfo(logmsg);
    }
  };
}
