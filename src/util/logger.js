import debug from 'debug';

class Logger {
  constructor(config) {
    this.config = Object.assign(
      {},
      {
        context: 'ussd',
        debug: true,
      },
      config || {},
    );

    this.debug = debug(this.config.context);
  }

  debug(message) {
    if (this.config.debug) {
      this.debug(message);
    }
  }

  warn(message) {
    console.warn(`(${this.config.context}) Warning: ${message}`); //eslint-disable-line
  }

  debugContext(childContext) {
    if (!childContext) {
      throw new Error('No context supplied to debug');
    }
    return debug([this.config.context, childContext].join(':'));
  }
}

export default () => new Logger();
// module.exports.getLogger = () => new Logger();
