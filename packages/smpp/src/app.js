import { logger } from './utils';
import { UssdOverSmpp } from './services/ussdoversmpp';
import config from './config/smppsetting';
import models from './models';

require('dotenv').config();

const { printerror, debug } = logger().getContext('app');

const syncdb = () => {
  models.sequelize
    .sync()
    .then(() => {
      debug('Sync database complete');
    })
    .catch((err) => printerror(err.message));
};

// sync the database
syncdb();

debug('starting application');
const smppSession = new UssdOverSmpp(config.smsc);
debug('%o', config.smsc);
smppSession.startSession();

// pm2 inititate shutdown.
process.on('SIGINT', (msg) => {
  debug(msg);
  // process reload ongoing
  smppSession.unBind();
  // close connections, clear cache, etc
  // by default, you have 1600ms
  process.exit(0);
});
