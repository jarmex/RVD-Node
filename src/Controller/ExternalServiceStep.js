import axios from 'axios';
import jsonpath from 'jsonpath';
import { ReplaceVariables } from './common';
import { getLogger } from '../util';

const debug = getLogger().debugContext('extSrv');

export default class ExternalServiceSteps {
  process = async (step, appdata = {}, tempdata = {}) => {
    const data = Object.assign({}, appdata);
    const temp = Object.assign({}, tempdata);

    const headers = {};
    step.httpHeaders.forEach((hd) => {
      headers[hd.name] = ReplaceVariables(hd.value, data, temp);
    });
    if (step.contentType) {
      headers['Content-Type'] = step.contentType;
    }
    // params
    const params = {};
    step.urlParams.forEach((urlp) => {
      params[urlp.name] = ReplaceVariables(urlp.value, data, temp); // check the variables
    });
    // requestBody
    const body = {};
    if (step.requestBody) {
      // console.log(step.requestBody);
      const replacebody = ReplaceVariables(step.requestBody, data, temp);
      Object.assign(body, JSON.parse(replacebody));
    }

    const url = ReplaceVariables(step.url, data, temp);

    try {
      const config = {
        method: step.method || 'GET',
        headers,
        params,
        url,
        data: body,
      };
      console.log('====================================');
      console.log(config);
      console.log('====================================');
      const { data: axiosdata } = await axios(config);
      if (step.assignments) {
        // extract the values into the variables
        step.assignments.forEach((ass) => {
          if (ass.valueExtractor) {
            const { accessOperations } = ass.valueExtractor;
            // concatenate the query path
            let querypath = '';
            accessOperations.forEach((aco) => {
              if (aco.kind === 'object' && aco.terminal === false) {
                querypath += aco.expression;
              }
              if (aco.kind === 'array') {
                // work on the array
                querypath += aco.expression;
              }
            });
            // check if there is a query path
            if (querypath) {
              // check if the first leter is ., if so remove it;
              if (querypath[0] === '.') {
                querypath = querypath.substr(1);
              }
              let chm = jsonpath.query(axiosdata, querypath);
              debug(querypath);
              debug(chm);
              if (Array.isArray(chm) && chm.length === 1) {
                chm = chm[0]; // eslint-disable-line
              }
              // /* ****** this should be removed after testing ***** */
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
      }
      // EXTRACT DATA HERE
    } catch (error) {
      debug(error.message);
    }

    return {
      data,
      temp,
    };
  };
}
