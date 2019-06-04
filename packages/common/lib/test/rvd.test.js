"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _src = require("../src");

var _state = _interopRequireDefault(require("../../smpp/src/state/state.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const should = _chai.default.should();

describe('RVD testing http functionality', () => {
  describe('testing http functionality with REDIS', () => {
    it('should throw an error without Redis parameters', done => {
      try {
        const rvd = new _src.RVDController({});
        done(rvd.SESSION_TIMEOUT);
      } catch (error) {
        should.exist(error);
        'Redis parameters are required'.should.equal(error.message);
      }

      done();
    });
    it('should throw error with incorrect Redis parameters', done => {
      try {
        const rvd = new _src.RVDController({
          redisparam: 'test'
        });
        should.not.exist(rvd);
      } catch (error) {
        should.exist(error);
        'Invalid Redis parameters'.should.equal(error.message);
      }

      done();
    });
    it('should connect to Redis database', done => {
      try {
        const rvd = new _src.RVDController({
          redisparam: {
            host: '127.0.0.1',
            port: 6379,
            family: 4
          }
        });
        should.exist(rvd);
      } catch (error) {
        should.not.exist(error);
      }

      done();
    });
    it('should create a session in the redis database', async done => {
      try {
        const rvd = new _src.RVDController({
          redisparam: {
            host: '127.0.0.1',
            port: 6379,
            family: 4
          },
          defaultWorkSpace: '/Users/jamo/Documents/Projects/Node/PAiC/RVDNode/packages/ussd/state',
          defaultRVDJson: _state.default
        });
        should.exist(rvd);
        rvd.SESSION_TIMEOUT.should.equal(40);
        rvd.defaultErrorMsg.should.eqal('Error processing request');
        const result = await rvd.entryPoint({
          msisdn: '123456',
          cellid: '',
          shortcode: '530',
          sessionid: '23412341234123423'
        });
        should.exist(result);
      } catch (error) {
        should.not.exist(error);
      }

      done();
    });
  });
});
//# sourceMappingURL=rvd.test.js.map