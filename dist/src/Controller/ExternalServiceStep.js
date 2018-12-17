"use strict";

exports.__esModule = true;
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _jsonpath = _interopRequireDefault(require("jsonpath"));

var _common = require("./common");

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const debug = (0, _util.getLogger)().debugContext('extSrv');

let ExternalServiceSteps = function ExternalServiceSteps() {
  _defineProperty(this, "process", async (step, appdata = {}, tempdata = {}) => {
    const data = Object.assign({}, appdata);
    const temp = Object.assign({}, tempdata);
    const headers = {};
    step.httpHeaders.forEach(hd => {
      headers[hd.name] = (0, _common.ReplaceVariables)(hd.value, data, temp);
    });

    if (step.contentType) {
      headers['Content-Type'] = step.contentType;
    } // params


    const params = {};
    step.urlParams.forEach(urlp => {
      params[urlp.name] = (0, _common.ReplaceVariables)(urlp.value, data, temp); // check the variables
    }); // requestBody

    const body = {};

    if (step.requestBody) {
      // console.log(step.requestBody);
      const replacebody = (0, _common.ReplaceVariables)(step.requestBody, data, temp);
      Object.assign(body, JSON.parse(replacebody));
    }

    const url = (0, _common.ReplaceVariables)(step.url, data, temp);

    try {
      const config = {
        method: step.method || 'GET',
        headers,
        params,
        url,
        data: body
      };
      const {
        data: axiosdata
      } = await (0, _axios.default)(config);

      if (step.assignments) {
        // extract the values into the variables
        step.assignments.forEach(ass => {
          if (ass.valueExtractor) {
            const {
              accessOperations
            } = ass.valueExtractor; // concatenate the query path

            let querypath = '';
            accessOperations.forEach(aco => {
              if (aco.kind === 'object' && aco.terminal === false) {
                querypath += aco.expression;
              }

              if (aco.kind === 'array') {
                // work on the array
                querypath += aco.expression;
              }
            }); // check if there is a query path

            if (querypath) {
              // check if the first leter is ., if so remove it;
              if (querypath[0] === '.') {
                querypath = querypath.substr(1);
              }

              let chm = _jsonpath.default.query(axiosdata, querypath);

              debug(querypath);
              debug(chm);

              if (Array.isArray(chm) && chm.length === 1) {
                chm = chm[0]; // eslint-disable-line
              } // /* ****** this should be removed after testing ***** */
              // if (querypath === 'data.categoriesDataCount') {
              //   chm = 4;
              // }


              if (ass.scope === 'module') {
                temp[`$${ass.destVariable}`] = chm;
              } else {
                data[`$${ass.destVariable}`] = chm;
              }
            }
          }
        });
      } // EXTRACT DATA HERE

    } catch (error) {
      debug(error.message);
    }

    return {
      data,
      temp
    };
  });
};

exports.default = ExternalServiceSteps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db250cm9sbGVyL0V4dGVybmFsU2VydmljZVN0ZXAuanMiXSwibmFtZXMiOlsiZGVidWciLCJkZWJ1Z0NvbnRleHQiLCJFeHRlcm5hbFNlcnZpY2VTdGVwcyIsInN0ZXAiLCJhcHBkYXRhIiwidGVtcGRhdGEiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwidGVtcCIsImhlYWRlcnMiLCJodHRwSGVhZGVycyIsImZvckVhY2giLCJoZCIsIm5hbWUiLCJ2YWx1ZSIsImNvbnRlbnRUeXBlIiwicGFyYW1zIiwidXJsUGFyYW1zIiwidXJscCIsImJvZHkiLCJyZXF1ZXN0Qm9keSIsInJlcGxhY2Vib2R5IiwiSlNPTiIsInBhcnNlIiwidXJsIiwiY29uZmlnIiwibWV0aG9kIiwiYXhpb3NkYXRhIiwiYXNzaWdubWVudHMiLCJhc3MiLCJ2YWx1ZUV4dHJhY3RvciIsImFjY2Vzc09wZXJhdGlvbnMiLCJxdWVyeXBhdGgiLCJhY28iLCJraW5kIiwidGVybWluYWwiLCJleHByZXNzaW9uIiwic3Vic3RyIiwiY2htIiwianNvbnBhdGgiLCJxdWVyeSIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsInNjb3BlIiwiZGVzdFZhcmlhYmxlIiwiZXJyb3IiLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxLQUFLLEdBQUcsdUJBQVlDLFlBQVosQ0FBeUIsUUFBekIsQ0FBZDs7SUFFcUJDLG9CO21DQUNULE9BQU9DLElBQVAsRUFBYUMsT0FBTyxHQUFHLEVBQXZCLEVBQTJCQyxRQUFRLEdBQUcsRUFBdEMsS0FBNkM7QUFDckQsVUFBTUMsSUFBSSxHQUFHQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCSixPQUFsQixDQUFiO0FBQ0EsVUFBTUssSUFBSSxHQUFHRixNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCSCxRQUFsQixDQUFiO0FBRUEsVUFBTUssT0FB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SyxTQUExQixDQUFWOztBQUNBakMsY0FBQUEsS0FBSyxDQUFDaUMsU0FBRCxDQUFMO0FBQ0FqQyxjQUFBQSxLQUFLLENBQUN1QyxHQUFELENBQUw7O0FBQ0Esa0JBQUlHLEtBQUssQ0FBQ0MsT0FBTixDQUFjSixHQUFkLEtBQXNCQSxHQUFHLENBQUNLLE1BQUosS0FBZSxDQUF6QyxFQUE0QztBQUMxQ0wsZ0JBQUFBLEdBQUcsR0FBR0EsR0FBRyxDQUFDLENBQUQsQ0FBVCxDQUQwQyxDQUM1QjtBQUNmLGVBVlksQ0FXYjtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0Esa0JBQUlULEdBQUcsQ0FBQ2UsS0FBSixLQUFjLFFBQWxCLEVBQTRCO0FBQzFCcEMsZ0JBQUFBLElBQUksQ0FBRSxJQUFHcUIsR0FBRyxDQUFDZ0IsWUFBYSxFQUF0QixDQUFKLEdBQStCUCxHQUEvQjtBQUNELGVBRkQsTUFFTztBQUNMakMsZ0JBQUFBLElBQUksQ0FBRSxJQUFHd0IsR0FBRyxDQUFDZ0IsWUFBYSxFQUF0QixDQUFKLEdBQStCUCxHQUEvQjtBQUNEO0FBQ0Y7QUFDRjtBQUNGLFNBckNEO0FBc0NELE9BbkRDLENBb0RGOztBQUNELEtBckRELENBcURFLE9BQU9RLEtBQVAsRUFBYztBQUNkL0MsTUFBQUEsS0FBSyxDQUFDK0MsS0FBSyxDQUFDQyxPQUFQLENBQUw7QUFDRDs7QUFFRCxXQUFPO0FBQ0wxQyxNQUFBQSxJQURLO0FBRUxHLE1BQUFBO0FBRkssS0FBUDtBQUlELEciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IGpzb25wYXRoIGZyb20gJ2pzb25wYXRoJztcbmltcG9ydCB7IFJlcGxhY2VWYXJpYWJsZXMgfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgeyBnZXRMb2dnZXIgfSBmcm9tICcuLi91dGlsJztcblxuY29uc3QgZGVidWcgPSBnZXRMb2dnZXIoKS5kZWJ1Z0NvbnRleHQoJ2V4dFNydicpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeHRlcm5hbFNlcnZpY2VTdGVwcyB7XG4gIHByb2Nlc3MgPSBhc3luYyAoc3RlcCwgYXBwZGF0YSA9IHt9LCB0ZW1wZGF0YSA9IHt9KSA9PiB7XG4gICAgY29uc3QgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGFwcGRhdGEpO1xuICAgIGNvbnN0IHRlbXAgPSBPYmplY3QuYXNzaWduKHt9LCB0ZW1wZGF0YSk7XG5cbiAgICBjb25zdCBoZWFkZXJzID0ge307XG4gICAgc3RlcC5odHRwSGVhZGVycy5mb3JFYWNoKChoZCkgPT4ge1xuICAgICAgaGVhZGVyc1toZC5uYW1lXSA9IFJlcGxhY2VWYXJpYWJsZXMoaGQudmFsdWUsIGRhdGEsIHRlbXApO1xuICAgIH0pO1xuICAgIGlmIChzdGVwLmNvbnRlbnRUeXBlKSB7XG4gICAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHN0ZXAuY29udGVudFR5cGU7XG4gICAgfVxuICAgIC8vIHBhcmFtc1xuICAgIGNvbnN0IHBhcmFtcyA9IHt9O1xuICAgIHN0ZXAudXJsUGFyYW1zLmZvckVhY2goKHVybHApID0+IHtcbiAgICAgIHBhcmFtc1t1cmxwLm5hbWVdID0gUmVwbGFjZVZhcmlhYmxlcyh1cmxwLnZhbHVlLCBkYXRhLCB0ZW1wKTsgLy8gY2hlY2sgdGhlIHZhcmlhYmxlc1xuICAgIH0pO1xuICAgIC8vIHJlcXVlc3RCb2R5XG4gICAgY29uc3QgYm9keSA9IHt9O1xuICAgIGlmIChzdGVwLnJlcXVlc3RCb2R5KSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhzdGVwLnJlcXVlc3RCb2R5KTtcbiAgICAgIGNvbnN0IHJlcGxhY2Vib2R5ID0gUmVwbGFjZVZhcmlhYmxlcyhzdGVwLnJlcXVlc3RCb2R5LCBkYXRhLCB0ZW1wKTtcbiAgICAgIE9iamVjdC5hc3NpZ24oYm9keSwgSlNPTi5wYXJzZShyZXBsYWNlYm9keSkpO1xuICAgIH1cblxuICAgIGNvbnN0IHVybCA9IFJlcGxhY2VWYXJpYWJsZXMoc3RlcC51cmwsIGRhdGEsIHRlbXApO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICAgbWV0aG9kOiBzdGVwLm1ldGhvZCB8fCAnR0VUJyxcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgcGFyYW1zLFxuICAgICAgICB1cmwsXG4gICAgICAgIGRhdGE6IGJvZHksXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB7IGRhdGE6IGF4aW9zZGF0YSB9ID0gYXdhaXQgYXhpb3MoY29uZmlnKTtcblxuICAgICAgaWYgKHN0ZXAuYXNzaWdubWVudHMpIHtcbiAgICAgICAgLy8gZXh0cmFjdCB0aGUgdmFsdWVzIGludG8gdGhlIHZhcmlhYmxlc1xuICAgICAgICBzdGVwLmFzc2lnbm1lbnRzLmZvckVhY2goKGFzcykgPT4ge1xuICAgICAgICAgIGlmIChhc3MudmFsdWVFeHRyYWN0b3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgYWNjZXNzT3BlcmF0aW9ucyB9ID0gYXNzLnZhbHVlRXh0cmFjdG9yO1xuICAgICAgICAgICAgLy8gY29uY2F0ZW5hdGUgdGhlIHF1ZXJ5IHBhdGhcbiAgICAgICAgICAgIGxldCBxdWVyeXBhdGggPSAnJztcbiAgICAgICAgICAgIGFjY2Vzc09wZXJhdGlvbnMuZm9yRWFjaCgoYWNvKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChhY28ua2luZCA9PT0gJ29iamVjdCcgJiYgYWNvLnRlcm1pbmFsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5cGF0aCArPSBhY28uZXhwcmVzc2lvbjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoYWNvLmtpbmQgPT09ICdhcnJheScpIHtcbiAgICAgICAgICAgICAgICAvLyB3b3JrIG9uIHRoZSBhcnJheVxuICAgICAgICAgICAgICAgIHF1ZXJ5cGF0aCArPSBhY28uZXhwcmVzc2lvbjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhIHF1ZXJ5IHBhdGhcbiAgICAgICAgICAgIGlmIChxdWVyeXBhdGgpIHtcbiAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGZpcnN0IGxldGVyIGlzIC4sIGlmIHNvIHJlbW92ZSBpdDtcbiAgICAgICAgICAgICAgaWYgKHF1ZXJ5cGF0aFswXSA9PT0gJy4nKSB7XG4gICAgICAgICAgICAgICAgcXVlcnlwYXRoID0gcXVlcnlwYXRoLnN1YnN0cigxKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBsZXQgY2htID0ganNvbnBhdGgucXVlcnkoYXhpb3NkYXRhLCBxdWVyeXBhdGgpO1xuICAgICAgICAgICAgICBkZWJ1ZyhxdWVyeXBhdGgpO1xuICAgICAgICAgICAgICBkZWJ1ZyhjaG0pO1xuICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjaG0pICYmIGNobS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICBjaG0gPSBjaG1bMF07IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyAvKiAqKioqKiogdGhpcyBzaG91bGQgYmUgcmVtb3ZlZCBhZnRlciB0ZXN0aW5nICoqKioqICovXG4gICAgICAgICAgICAgIC8vIGlmIChxdWVyeXBhdGggPT09ICdkYXRhLmNhdGVnb3JpZXNEYXRhQ291bnQnKSB7XG4gICAgICAgICAgICAgIC8vICAgY2htID0gNDtcbiAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICBpZiAoYXNzLnNjb3BlID09PSAnbW9kdWxlJykge1xuICAgICAgICAgICAgICAgIHRlbXBbYCQke2Fzcy5kZXN0VmFyaWFibGV9YF0gPSBjaG07XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0YVtgJCR7YXNzLmRlc3RWYXJpYWJsZX1gXSA9IGNobTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICAvLyBFWFRSQUNUIERBVEEgSEVSRVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBkZWJ1ZyhlcnJvci5tZXNzYWdlKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgZGF0YSxcbiAgICAgIHRlbXAsXG4gICAgfTtcbiAgfTtcbn1cbiJdfQ==