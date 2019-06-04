import should from 'should';
import { RVDController } from '../src';
import rvdjson from '../../smpp/src/state/state.json';

describe.skip('RVD testing http functionality', () => {
  describe('testing http functionality with REDIS', () => {
    it('should throw an error without Redis parameters', (done) => {
      try {
        const rvd = new RVDController({});
        should.not.exist(rvd);
      } catch (error) {
        should.exist(error);
        'Redis parameters are required'.should.equal(error.message);
      }
      done();
    });
    it('should throw error with incorrect Redis parameters', (done) => {
      try {
        const rvd = new RVDController({
          redisparam: 'test',
        });
        should.not.exist(rvd);
      } catch (error) {
        should.exist(error);
        'Invalid Redis parameters'.should.be.equal(error.message);
      }
      done();
    });
    it('should connect to Redis database', (done) => {
      try {
        const rvd = new RVDController({
          redisparam: {
            host: '127.0.0.1',
            port: 6379,
            family: 4,
          },
        });
        should.exist(rvd);
      } catch (error) {
        should.not.exist(error);
      }
      done();
    });
    it('should create a session in the redis database', (done) => {
      try {
        const rvd = new RVDController({
          redisparam: {
            host: '127.0.0.1',
            port: 6379,
            family: 4,
          },
          defaultWorkSpace: '/Users/jamo/Documents/Projects/Node/PAiC/RVDNode/packages/ussd/state',
          defaultRVDJson: rvdjson,
        });
        should.exist(rvd);
        rvd.SESSION_TIMEOUT.should.be.equal(40);
        rvd.defaultErrorMsg.should.be.equal('Error processing request');
        rvd
          .entryPoint({
            msisdn: '123456',
            cellid: '',
            shortcode: '530',
            sessionid: '23412341234123423',
          })
          .then((result) => {
            should.exist(result);
            result.status.should.equal(200);
            result.should.have.property('message').be.ok();
            done();
          })
          .catch((err) => {
            should.not.exist(err);
            done();
          });
      } catch (error) {
        should.not.exist(error);
      }
      done();
    });
  });
});
