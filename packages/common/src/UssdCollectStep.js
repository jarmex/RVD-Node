import ensureArray from './ensureArray';
import ReplaceVariables from './ReplaceVariables';

export default class UssdCollectSteps {
  process = async (step, data = {}, temp = {}) => {
    const retmsg = {};
    // get the message to display
    const { messages, text, gatherType, menu, collectdigits } = step;

    // replace the variables in the text
    retmsg.message = ReplaceVariables(text, data, temp);
    // ensure the message is an array
    const msgs = ensureArray(messages);

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
