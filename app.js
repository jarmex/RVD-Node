#!/usr/bin/env node

import { createServer } from 'http';
import createError from 'http-errors';
import Redis from 'ioredis';
import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { normalizePort, getLogger } from './src/util';
import routings from './routes';

const debug = getLogger().debugContext('paic:server');

const redis = new Redis();

const app = express();
const isDev = app.get('env') === 'development';
// use helmet
app.use(helmet());
app.use(helmet.noCache());

if (isDev) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('common'));
  app.disable('x-powered-by');
}

app.use(json());
app.use(urlencoded({ extended: false }));

// import the routing
routings(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = normalizePort(process.env.PORT || 8000);
app.set('port', port);

// read the file. If the file does not exist exit the application
const server = createServer(app);

// listen for errors
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe  ${port}` : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      debug(`${bind} requires elevated privileges`); // eslint-disable-line
      process.exit(1);
      break;
    case 'EADDRINUSE':
      debug(`${bind} is already in use`); // eslint-disable-line
      process.exit(1);
      break;
    default:
      throw error;
  }
});
// Event listener for HTTP server "listening" event.
server.on('listening', async () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe  ${addr}` : `port ${addr.port}`;
  debug(`Listening on  ${bind}`);
});

// for shutting down the application gracefully
process.on('SIGINT', async () => {
  debug('SIGINT signal received.');
  debug('Stoping server.......');
  server.close(async (err) => {
    if (err) {
      debug('ERROR: %s', err.message);
      process.exit(1);
    }
    debug('Server successfully closed');
    // close the redis database and flush all
    try {
      debug('Closing and flushing all data in memory');
      await redis.flushall();
      debug('Cleaning memory completed successfully');
    } catch (error) {
      debug('ERROR: %s', error.message);
    }
  });
});

// Listen on provided port, on all network interfaces.
server.listen(port);
