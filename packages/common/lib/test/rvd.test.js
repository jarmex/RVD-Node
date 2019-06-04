"use strict";

var _should = _interopRequireDefault(require("should"));

var _src = require("../src");

var _state = _interopRequireDefault(require("../../smpp/src/state/state.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe.skip('RVD testing http functionality', () => {
  describe('testing http functionality with REDIS', () => {
    it('should throw an error without Redis parameters', done => {
      try {
        const rvd = new _src.RVDController({});

        _should.default.not.exist(rvd);
      } catch (error) {
        _should.default.exist(error);

        'Redis parameters are required'.should.equal(error.message);
      }

      done();
    });
    it('should throw error with incorrect Redis parameters', done => {
      try {
        const rvd = new _src.RVDController({
          redisparam: 'test'
        });

        _should.default.not.exist(rvd);
      } catch (error) {
        _should.default.exist(error);

        'Invalid Redis parameters'.should.be.equal(error.message);
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

        _should.default.exist(rvd);
      } catch (error) {
        _should.default.not.exist(error);
      }

      done();
    });
    it('should create a session in the redis database', done => {
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

        _should.default.exist(rvd);

        rvd.SESSION_TIMEOUT.should.be.equal(40);
        rvd.defaultErrorMsg.should.be.equal('Error processing request');
        rvd.entryPoint({
          msisdn: '123456',
          cellid: '',
          shortcode: '530',
          sessionid: '23412341234123423'
        }).then(result => {
          _should.default.exist(result);

          result.status.should.equal(200);
          result.should.have.property('message').be.ok();
          done();
        }).catch(err => {
          _should.default.not.exist(err);

          done();
        });
      } catch (error) {
        _should.default.not.exist(error);
      }

      done();
    });
  });
});
//# sourceMappingURL=rvd.test.js.map