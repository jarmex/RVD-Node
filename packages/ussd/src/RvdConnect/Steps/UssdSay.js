import { ReplaceVariables } from '../Common';

export default class UssdSaySteps {
  process = async (step, appdata = {}, tempdata = {}) => {
    const retmsg = {};

    const { text } = step;

    retmsg.message = ReplaceVariables(text, appdata, tempdata);

    return retmsg;
  };
}
