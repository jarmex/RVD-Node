import { ensureArray } from '../util';
import { ReplaceVariables } from './common';

export default class UssdCollectSteps {
  process = async (step, data = {}, temp = {}) => {
    const retmsg = {};
    // get the message to display
    const { messages, text, gatherType, menu, collectdigits } = step;
    const msgs = ensureArray(messages);
    retmsg.message = text;
    if (messages) {
      const mMenu = msgs
        .map((item) => ReplaceVariables(item.text, data, temp))
        .join('\n');
      retmsg.message = `${text}${mMenu}`;
    }

    const responses = {
      gatherType,
    };
    // map the responses
    if (menu) {
      responses.mappings = menu.mappings;
    }
    if (collectdigits) {
      responses.collectdigits = collectdigits;
    }
    retmsg.responses = responses;
    return retmsg;
  };
}
