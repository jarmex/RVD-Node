"use strict";

exports.__esModule = true;
exports.default = void 0;

var _ioredis = _interopRequireDefault(require("ioredis"));

var _RvdController = _interopRequireDefault(require("./RvdController"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const redis = new _ioredis.default({
  keyPrefix: 'paic:'
});
const debug = (0, _util.getLogger)().debugContext('newsub');
const SESSION_TIMEOUT = 40;

let USSDFlow = function USSDFlow() {
  _defineProperty(this, "getSessionData", async (sessionid, msisdn) => {
    try {
      // check if the subscriber key exist
      const sessionsubdata = await redis.get(sessionid || msisdn);

      if (sessionsubdata) {
        return JSON.parse(sessionsubdata);
      }
    } catch (error) {
      debug('ERROR: %s', error.message);
    }

    return null;
  });

  _defineProperty(this, "saveSessionData", async (sessionid, msisdn, data = {}) => {
    try {
      await redis.setex(sessionid || msisdn, SESSION_TIMEOUT, JSON.stringify(data));
    } catch (error) {
      debug('ERROR: %s', error.message);
    }
  });

  _defineProperty(this, "entryPoint", async (req, res) => {
    const {
      msisdn,
      imsi,
      cellid,
      sessionid,
      input
    } = req.query;
    debug('REQ: %o', req.query); // get the session. if the session does not exist then process the first stage of rvd

    const subSession = await this.getSessionData(sessionid || msisdn); // application state

    const state = {
      msisdn,
      imsi,
      cellid,
      sessionid,
      input
    };
    const rvdController = new _RvdController.default(subSession, state);
    const response = await rvdController.rvd(input); // save session data
    // console.log('====================================');
    // console.log(response);
    // console.log('====================================');

    if (response.data) {
      await this.saveSessionData(sessionid, msisdn, response.data);
    }

    const Freeflow = response.next ? 'FC' : 'FB';
    res.type('txt');
    res.set({
      Freeflow,
      Expires: -1,
      'Cache-Control': 'max-age=0',
      Pragma: 'no-cache'
    });
    res.status(200).send(response.message);
  });
};

exports.default = USSDFlow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db250cm9sbGVyL1VTU0RGbG93LmpzIl0sIm5hbWVzIjpbInJlZGlzIiwiUmVkaXMiLCJrZXlQcmVmaXgiLCJkZWJ1ZyIsImRlYnVnQ29udGV4dCIsIlNFU1NJT05fVElNRU9VVCIsIlVTU0RGbG93Iiwic2Vzc2lvbmlkIiwibXNpc2RuIiwic2Vzc2lvbnN1YmRhdGEiLCJnZXQiLCJKU09OIiwicGFyc2UiLCJlcnJvciIsIm1lc3NhZ2UiLCJkYXRhIiwic2V0ZXgiLCJzdHJpbmdpZnkiLCJyZXEiLCJyZXMiLCJpbXNpIiwiY2VsbGlkIiwiaW5wdXQiLCJxdWVyeSIsInN1YlNlc3Npb24iLCJnZXRTZXNzaW9uRGF0YSIsInN0YXRlIiwicnZkQ29udHJvbGxlciIsIlJWRENvbnRyb2xsZXIiLCJyZXNwb25zZSIsInJ2ZCIsInNhdmVTZXNzaW9uRGF0YSIsIkZyZWVmbG93IiwibmV4dCIsInR5cGUiLCJzZXQiLCJFeHBpcmVzIiwiUHJhZ21hIiwic3RhdHVzIiwic2VuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsTUFBTUEsS0FBSyxHQUFHLElBQUlDLGdCQUFKLENBQVU7QUFBRUMsRUFBQUEsU0FBUyxFQUFFO0FBQWIsQ0FBVixDQUFkO0FBRUEsTUFBTUMsS0FBSyxHQUFHLHVCQUFZQyxZQUFaLENBQXlCLFFBQXpCLENBQWQ7QUFFQSxNQUFNQyxlQUFlLEdBQUcsRUFBeEI7O0lBRXFCQyxROzBDQUVGLE9BQU9DLFNBQVAsRUFBa0JDLE1BQWxCLEtBQTZCO0FBQzVDLFFBQUk7QUFDRjtBQUNBLFlBQU1DLGNBQWMsR0FBRyxNQUFNVCxLQUFLLENBQUNVLEdBQU4sQ0FBVUgsU0FBUyxJQUFJQyxNQUF2QixDQUE3Qjs7QUFDQSxVQUFJQyxjQUFKLEVBQW9CO0FBQ2xCLGVBQU9FLElBQUksQ0FBQ0MsS0FBTCxDQUFXSCxjQUFYLENBQVA7QUFDRDtBQUNGLEtBTkQsQ0FNRSxPQUFPSSxLQUFQLEVBQWM7QUFDZFYsTUFBQUEsS0FBSyxDQUFDLFdBQUQsRUFBY1UsS0FBSyxDQUFDQyxPQUFwQixDQUFMO0FBQ0Q7O0FBQ0QsV0FBTyxJQUFQO0FBQ0QsRzs7MkNBRWlCLE9BQU9QLFNBQVAsRUFBa0JDLE1BQWxCLEVBQTBCTyxJQUFJLEdBQUcsRUFBakMsS0FBd0M7QUFDeEQsUUFBSTtBQUNGLFlBQU1mLEtBQUssQ0FBQ2dCLEtBQU4sQ0FDSlQsU0FBUyxJQUFJQyxNQURULEVBRUpILGVBRkksRUFHSk0sSUFBSSxDQUFDTSxTQUFMLENBQWVGLElBQWYsQ0FISSxDQUFOO0FBS0QsS0FORCxDQU1FLE9BQU9GLEtBQVAsRUFBYztBQUNkVixNQUFBQSxLQUFLLENBQUMsV0FBRCxFQUFjVSxLQUFLLENBQUNDLE9BQXBCLENBQUw7QUFDRDtBQUNGLEc7O3NDQUdZLE9BQU9JLEdBQVAsRUFBWUMsR0FBWixLQUFvQjtBQUMvQixVQUFNO0FBQUVYLE1BQUFBLE1BQUY7QUFBVVksTUFBQUEsSUFBVjtBQUFnQkMsTUFBQUEsTUFBaEI7QUFBd0JkLE1BQUFBLFNBQXhCO0FBQW1DZSxNQUFBQTtBQUFuQyxRQUE2Q0osR0FBRyxDQUFDSyxLQUF2RDtBQUNBcEIsSUFBQUEsS0FBSyxDQUFDLFNBQUQsRUFBWWUsR0FBRyxDQUFDSyxLQUFoQixDQUFMLENBRitCLENBRy9COztBQUNBLFVBQU1DLFVBQVUsR0FBRyxNQUFNLEtBQUtDLGNBQUwsQ0FBb0JsQixTQUFTLElBQUlDLE1BQWpDLENBQXpCLENBSitCLENBSy9COztBQUNBLFVBQU1rQixLQUFLLEdBQUc7QUFBRWxCLE1BQUFBLE1BQUY7QUFBVVksTUFBQUEsSUFBVjtBQUFnQkMsTUFBQUEsTUFBaEI7QUFBd0JkLE1BQUFBLFNBQXhCO0FBQW1DZSxNQUFBQTtBQUFuQyxLQUFkO0FBQ0EsVUFBTUssYUFBYSxHQUFHLElBQUlDLHNCQUFKLENBQWtCSixVQUFsQixFQUE4QkUsS0FBOUIsQ0FBdEI7QUFDQSxVQUFNRyxRQUFRLEdBQUcsTUFBTUYsYUFBYSxDQUFDRyxHQUFkLENBQWtCUixLQUFsQixDQUF2QixDQVIrQixDQVMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxRQUFJTyxRQUFRLENBQUNkLElBQWIsRUFBbUI7QUFDakIsWUFBTSxLQUFLZ0IsZUFBTCxDQUFxQnhCLFNBQXJCLEVBQWdDQyxNQUFoQyxFQUF3Q3FCLFFBQVEsQ0FBQ2QsSUFBakQsQ0FBTjtBQUNEOztBQUNELFVBQU1pQixRQUFRLEdBQUdILFFBQVEsQ0FBQ0ksSUFBVCxHQUFnQixJQUFoQixHQUF1QixJQUF4QztBQUNBZCxJQUFBQSxHQUFHLENBQUNlLElBQUosQ0FBUyxLQUFUO0FBQ0FmLElBQUFBLEdBQUcsQ0FBQ2dCLEdBQUosQ0FBUTtBQUNOSCxNQUFBQSxRQURNO0FBRU5JLE1BQUFBLE9BQU8sRUFBRSxDQUFDLENBRko7QUFHTix1QkFBaUIsV0FIWDtBQUlOQyxNQUFBQSxNQUFNLEVBQUU7QUFKRixLQUFSO0FBTUFsQixJQUFBQSxHQUFHLENBQUNtQixNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUJWLFFBQVEsQ0FBQ2YsT0FBOUI7QUFDRCxHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlZGlzIGZyb20gJ2lvcmVkaXMnO1xuaW1wb3J0IFJWRENvbnRyb2xsZXIgZnJvbSAnLi9SdmRDb250cm9sbGVyJztcbmltcG9ydCB7IGdldExvZ2dlciB9IGZyb20gJy4uL3V0aWwnO1xuXG5jb25zdCByZWRpcyA9IG5ldyBSZWRpcyh7IGtleVByZWZpeDogJ3BhaWM6JyB9KTtcblxuY29uc3QgZGVidWcgPSBnZXRMb2dnZXIoKS5kZWJ1Z0NvbnRleHQoJ25ld3N1YicpO1xuXG5jb25zdCBTRVNTSU9OX1RJTUVPVVQgPSA0MDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVVNTREZsb3cge1xuICAvLyBnZXQgdGhlIHN1YnNjcmliZXIgc3RhdGUgZnJvbSBtZW1vcnlcbiAgZ2V0U2Vzc2lvbkRhdGEgPSBhc3luYyAoc2Vzc2lvbmlkLCBtc2lzZG4pID0+IHtcbiAgICB0cnkge1xuICAgICAgLy8gY2hlY2sgaWYgdGhlIHN1YnNjcmliZXIga2V5IGV4aXN0XG4gICAgICBjb25zdCBzZXNzaW9uc3ViZGF0YSA9IGF3YWl0IHJlZGlzLmdldChzZXNzaW9uaWQgfHwgbXNpc2RuKTtcbiAgICAgIGlmIChzZXNzaW9uc3ViZGF0YSkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzZXNzaW9uc3ViZGF0YSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGRlYnVnKCdFUlJPUjogJXMnLCBlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgc2F2ZVNlc3Npb25EYXRhID0gYXN5bmMgKHNlc3Npb25pZCwgbXNpc2RuLCBkYXRhID0ge30pID0+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgcmVkaXMuc2V0ZXgoXG4gICAgICAgIHNlc3Npb25pZCB8fCBtc2lzZG4sXG4gICAgICAgIFNFU1NJT05fVElNRU9VVCxcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBkZWJ1ZygnRVJST1I6ICVzJywgZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGFsbCBlbnRyeSBwb2ludCBmb3IgdGhlIGFwcGxpY2F0aW9uXG4gIGVudHJ5UG9pbnQgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgICBjb25zdCB7IG1zaXNkbiwgaW1zaSwgY2VsbGlkLCBzZXNzaW9uaWQsIGlucHV0IH0gPSByZXEucXVlcnk7XG4gICAgZGVidWcoJ1JFUTogJW8nLCByZXEucXVlcnkpO1xuICAgIC8vIGdldCB0aGUgc2Vzc2lvbi4gaWYgdGhlIHNlc3Npb24gZG9lcyBub3QgZXhpc3QgdGhlbiBwcm9jZXNzIHRoZSBmaXJzdCBzdGFnZSBvZiBydmRcbiAgICBjb25zdCBzdWJTZXNzaW9uID0gYXdhaXQgdGhpcy5nZXRTZXNzaW9uRGF0YShzZXNzaW9uaWQgfHwgbXNpc2RuKTtcbiAgICAvLyBhcHBsaWNhdGlvbiBzdGF0ZVxuICAgIGNvbnN0IHN0YXRlID0geyBtc2lzZG4sIGltc2ksIGNlbGxpZCwgc2Vzc2lvbmlkLCBpbnB1dCB9O1xuICAgIGNvbnN0IHJ2ZENvbnRyb2xsZXIgPSBuZXcgUlZEQ29udHJvbGxlcihzdWJTZXNzaW9uLCBzdGF0ZSk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBydmRDb250cm9sbGVyLnJ2ZChpbnB1dCk7XG4gICAgLy8gc2F2ZSBzZXNzaW9uIGRhdGFcbiAgICAvLyBjb25zb2xlLmxvZygnPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Jyk7XG4gICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgIC8vIGNvbnNvbGUubG9nKCc9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0nKTtcbiAgICBpZiAocmVzcG9uc2UuZGF0YSkge1xuICAgICAgYXdhaXQgdGhpcy5zYXZlU2Vzc2lvbkRhdGEoc2Vzc2lvbmlkLCBtc2lzZG4sIHJlc3BvbnNlLmRhdGEpO1xuICAgIH1cbiAgICBjb25zdCBGcmVlZmxvdyA9IHJlc3BvbnNlLm5leHQgPyAnRkMnIDogJ0ZCJztcbiAgICByZXMudHlwZSgndHh0Jyk7XG4gICAgcmVzLnNldCh7XG4gICAgICBGcmVlZmxvdyxcbiAgICAgIEV4cGlyZXM6IC0xLFxuICAgICAgJ0NhY2hlLUNvbnRyb2wnOiAnbWF4LWFnZT0wJyxcbiAgICAgIFByYWdtYTogJ25vLWNhY2hlJyxcbiAgICB9KTtcbiAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChyZXNwb25zZS5tZXNzYWdlKTtcbiAgfTtcbn1cbiJdfQ==