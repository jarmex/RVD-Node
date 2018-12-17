"use strict";

exports.__esModule = true;
exports.default = void 0;

var _debug = _interopRequireDefault(require("debug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Logger =
/*#__PURE__*/
function () {
  function Logger(config) {
    this.config = Object.assign({}, {
      context: 'ussd',
      debug: true
    }, config || {});
    this.debug = (0, _debug.default)(this.config.context);
  }

  var _proto = Logger.prototype;

  _proto.debug = function debug(message) {
    if (this.config.debug) {
      this.debug(message);
    }
  };

  _proto.warn = function warn(message) {
    console.warn(`(${this.config.context}) Warning: ${message}`); //eslint-disable-line
  };

  _proto.debugContext = function debugContext(childContext) {
    if (!childContext) {
      throw new Error('No context supplied to debug');
    }

    return (0, _debug.default)([this.config.context, childContext].join(':'));
  };

  return Logger;
}();

var _default = () => new Logger(); // module.exports.getLogger = () => new Logger();


exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlsL2xvZ2dlci5qcyJdLCJuYW1lcyI6WyJMb2dnZXIiLCJjb25maWciLCJPYmplY3QiLCJhc3NpZ24iLCJjb250ZXh0IiwiZGVidWciLCJtZXNzYWdlIiwid2FybiIsImNvbnNvbGUiLCJkZWJ1Z0NvbnRleHQiLCJjaGlsZENvbnRleHQiLCJFcnJvciIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7SUFFTUEsTTs7O0FBQ0osa0JBQVlDLE1BQVosRUFBb0I7QUFDbEIsU0FBS0EsTUFBTCxHQUFjQyxNQUFNLENBQUNDLE1BQVAsQ0FDWixFQURZLEVBRVo7QUFDRUMsTUFBQUEsT0FBTyxFQUFFLE1BRFg7QUFFRUMsTUFBQUEsS0FBSyxFQUFFO0FBRlQsS0FGWSxFQU1aSixNQUFNLElBQUksRUFORSxDQUFkO0FBU0EsU0FBS0ksS0FBTCxHQUFhLG9CQUFNLEtBQUtKLE1BQUwsQ0FBWUcsT0FBbEIsQ0FBYjtBQUNEOzs7O1NBRURDLEssa0JBQU1DLE8sRUFBUztBQUNiLFFBQUksS0FBS0wsTUFBTCxDQUFZSSxLQUFoQixFQUF1QjtBQUNyQixXQUFLQSxLQUFMLENBQVdDLE9BQVg7QUFDRDtBQUNGLEc7O1NBRURDLEksaUJBQUtELE8sRUFBUztBQUNaRSxJQUFBQSxPQUFPLENBQUNELElBQVIsQ0FBYyxJQUFHLEtBQUtOLE1BQUwsQ0FBWUcsT0FBUSxjQUFhRSxPQUFRLEVBQTFELEVBRFksQ0FDa0Q7QUFDL0QsRzs7U0FFREcsWSx5QkFBYUMsWSxFQUFjO0FBQ3pCLFFBQUksQ0FBQ0EsWUFBTCxFQUFtQjtBQUNqQixZQUFNLElBQUlDLEtBQUosQ0FBVSw4QkFBVixDQUFOO0FBQ0Q7O0FBQ0QsV0FBTyxvQkFBTSxDQUFDLEtBQUtWLE1BQUwsQ0FBWUcsT0FBYixFQUFzQk0sWUFBdEIsRUFBb0NFLElBQXBDLENBQXlDLEdBQXpDLENBQU4sQ0FBUDtBQUNELEc7Ozs7O2VBR1ksTUFBTSxJQUFJWixNQUFKLEUsRUFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuXG5jbGFzcyBMb2dnZXIge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7fSxcbiAgICAgIHtcbiAgICAgICAgY29udGV4dDogJ3Vzc2QnLFxuICAgICAgICBkZWJ1ZzogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBjb25maWcgfHwge30sXG4gICAgKTtcblxuICAgIHRoaXMuZGVidWcgPSBkZWJ1Zyh0aGlzLmNvbmZpZy5jb250ZXh0KTtcbiAgfVxuXG4gIGRlYnVnKG1lc3NhZ2UpIHtcbiAgICBpZiAodGhpcy5jb25maWcuZGVidWcpIHtcbiAgICAgIHRoaXMuZGVidWcobWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgd2FybihtZXNzYWdlKSB7XG4gICAgY29uc29sZS53YXJuKGAoJHt0aGlzLmNvbmZpZy5jb250ZXh0fSkgV2FybmluZzogJHttZXNzYWdlfWApOyAvL2VzbGludC1kaXNhYmxlLWxpbmVcbiAgfVxuXG4gIGRlYnVnQ29udGV4dChjaGlsZENvbnRleHQpIHtcbiAgICBpZiAoIWNoaWxkQ29udGV4dCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjb250ZXh0IHN1cHBsaWVkIHRvIGRlYnVnJyk7XG4gICAgfVxuICAgIHJldHVybiBkZWJ1ZyhbdGhpcy5jb25maWcuY29udGV4dCwgY2hpbGRDb250ZXh0XS5qb2luKCc6JykpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IG5ldyBMb2dnZXIoKTtcbi8vIG1vZHVsZS5leHBvcnRzLmdldExvZ2dlciA9ICgpID0+IG5ldyBMb2dnZXIoKTtcbiJdfQ==