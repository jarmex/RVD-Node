import debug from 'debug';

class Logger {
  constructor(config) {
    this.config = Object.assign(
      {},
      {
        context: 'ussd',
        debug: true,
        info: true,
        error: true,
      },
      config || {},
    );

    this.debug = debug(this.config.context);
    this.info = debug(this.config.context);
    this.error = debug(this.config.context);
  }

  debug(message) {
    if (this.config.debug) {
      this.debug(message);
    }
  }

  printinfo(message) {
    if (this.config.info) {
      this.info(message);
    }
  }

  warn(message) {
    console.warn(`(${this.config.context}) Warning: ${message}`); //eslint-disable-line
  }

  printerror(message) {
    if (this.config.error) {
      this.error(message);
    }
  }

  debugContext(childContext) {
    if (!childContext) {
      throw new Error('No context supplied to debug');
    }
    const deg = debug([this.config.context, childContext].join(':'));
    deg.log = console.log.bind(console); // eslint-disable-line
    return deg;
  }

  /**
   *print error using the debug module
   *
   * @param {string} childContext the child context.
   * @returns an object for printing error, info and debug
   * @memberof Logger
   */
  getContext(childContext) {
    // if (!childContext) {
    //   throw new Error('No context supplied to debug');
    // }
    const debugcontext = childContext ? `${childContext}:debug` : 'debug';
    const printinfo = debug(
      [this.config.context, childContext || 'info'].join(':'),
    );
    const printerror = debug(
      [this.config.context, childContext || 'error'].join(':'),
    );
    const printdebug = debug([this.config.context, debugcontext].join(':'));

    printdebug.log = console.log.bind(console); // eslint-disable-line
    printinfo.log = console.info.bind(console); // eslint-disable-line
    return {
      printinfo,
      printerror,
      printdebug,
      debug: printdebug,
    };
  }
}

export default () => new Logger();
// module.exports.getLogger = () => new Logger();
