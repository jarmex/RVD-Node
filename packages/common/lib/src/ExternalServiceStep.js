"use strict";

exports.__esModule = true;
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _jsonpath = _interopRequireDefault(require("jsonpath"));

var _ReplaceVariables = _interopRequireDefault(require("./ReplaceVariables"));

var _logger = _interopRequireDefault(require("./logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  debug,
  printerror,
  printinfo
} = (0, _logger.default)().getContext('extSrv');

let ExternalServiceSteps = function ExternalServiceSteps() {
  _defineProperty(this, "process", async (step, appdata = {}, tempdata = {}) => {
    const data = Object.assign({}, appdata);
    const temp = Object.assign({}, tempdata);
    const headers = {};
    const {
      httpHeaders,
      contentType,
      urlParams,
      requestBody,
      url
    } = step; // add the header if it exist

    if (httpHeaders) {
      httpHeaders.forEach(hd => {
        headers[hd.name] = (0, _ReplaceVariables.default)(hd.value, data, temp);
      });
    } // if there is content header


    if (contentType) {
      headers['Content-Type'] = contentType;
    } // params


    const params = {};

    if (urlParams) {
      urlParams.forEach(urlp => {
        params[urlp.name] = (0, _ReplaceVariables.default)(urlp.value, data, temp); // check the variables
      });
    } // requestBody


    const body = {};

    if (requestBody) {
      // console.log(step.requestBody);
      try {
        const replacebody = (0, _ReplaceVariables.default)(requestBody, data, temp);
        Object.assign(body, JSON.parse(replacebody));
      } catch (error) {
        debug(requestBody);
        printerror('ERROR: %s', error.message);
      }
    } // if the url exist proceed


    if (url) {
      // replace all the variables in the url
      const nurl = (0, _ReplaceVariables.default)(url, data, temp);

      try {
        const config = {
          method: step.method || 'GET',
          headers,
          params,
          url: nurl,
          data: body
        };
        debug('%o', config);
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

                if (Array.isArray(chm) && chm.length === 1) {
                  chm = chm[0]; // eslint-disable-line
                }

                printinfo(`${querypath} = ${chm}`);

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
        printerror('ERROR: %s', error.message);
      }
    }

    return {
      data,
      temp
    };
  });
};

exports.default = ExternalServiceSteps;
//# sourceMappingURL=ExternalServiceStep.js.map