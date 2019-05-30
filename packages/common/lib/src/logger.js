"use strict";

exports.__esModule = true;
exports.LoggerClass = exports.Logger = exports.default = void 0;

var _debug = _interopRequireDefault(require("debug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let LoggerClass =
/*#__PURE__*/
function () {
  function LoggerClass(config) {
    this.config = Object.assign({}, {
      context: 'ussd',
      debug: true,
      info: true,
      error: true
    }, config || {});
    this.debug = (0, _debug.default)(this.config.context);
    this.info = (0, _debug.default)(this.config.context);
    this.error = (0, _debug.default)(this.config.context);
  }

  var _proto = LoggerClass.prototype;

  _proto.debug = function debug(message) {
    if (this.config.debug) {
      this.debug(message);
    }
  };

  _proto.printinfo = function printinfo(message) {
    if (this.config.info) {
      this.info(message);
    }
  };

  _proto.warn = function warn(message) {
    console.warn(`(${this.config.context}) Warning: ${message}`); //eslint-disable-line
  };

  _proto.printerror = function printerror(message) {
    if (this.config.error) {
      this.error(message);
    }
  };

  _proto.debugContext = function debugContext(childContext) {
    if (!childContext) {
      throw new Error('No context supplied to debug');
    }

    const deg = (0, _debug.default)([this.config.context, childContext].join(':'));
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
  ;

  _proto.getContext = function getContext(childContext) {
    // if (!childContext) {
    //   throw new Error('No context supplied to debug');
    // }
    const debugcontext = childContext ? `${childContext}:debug` : 'debug';
    const printinfo = (0, _debug.default)([this.config.context, childContext || 'info'].join(':'));
    const printerror = (0, _debug.default)([this.config.context, childContext || 'error'].join(':'));
    const printdebug = (0, _debug.default)([this.config.context, debugcontext].join(':'));
    printdebug.log = console.log.bind(console); // eslint-disable-line

    printinfo.log = console.info.bind(console); // eslint-disable-line

    return {
      printinfo,
      printerror,
      printdebug,
      debug: printdebug
    };
  };

  return LoggerClass;
}();

exports.LoggerClass = LoggerClass;

var _default = () => new LoggerClass(); // eslint-disable-next-line


exports.default = _default;

const Logger = ch => new LoggerClass().getContext(ch);

exports.Logger = Logger;
//# sourceMappingURL=logger.js.map