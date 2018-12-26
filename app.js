#!/usr/bin/env node

import { createServer } from 'http';
import createError from 'http-errors';
import { join } from 'path';
import Redis from 'ioredis';
import { promisify } from 'util';
import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { ApolloServer } from 'apollo-server-express';
import { normalizePort, getLogger } from './src/util';
import routings from './routes';
import { typeDefs, resolvers } from './src/GraphQL';
import models from './src/models';
import config from './src/config';

const { debug, printerror } = getLogger().getContext('paic:server');

const redis = new Redis({ ...config.redis });

const app = express();
const isDev = app.get('env') === 'development';

app.use(express.static(join(__dirname, '/public')));
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

// handle the graphql
const corOptions = {
  origin: isDev ? 'http://localhost:8080' : true,
  credentials: true,
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => ({
    models,
  }),
  formatError: (error) => ({
    message: error.message,
    code: error.originalError && error.originalError.code,
    details: (error.originalError && error.originalError.details) || null,
  }),
});
apolloServer.applyMiddleware({ app, cors: corOptions });

app.use('*', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line
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
// async close
const ServerCloseAysnc = promisify(server.close);

// listen for errors
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe  ${port}` : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      printerror(`ERROR: ${bind} requires elevated privileges`); // eslint-disable-line
      process.exit(1);
      break;
    case 'EADDRINUSE':
      printerror(`ERROR: ${bind} is already in use`); // eslint-disable-line
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
  debug(`Listening on  ${bind}. graphql path is: ${apolloServer.graphqlPath}`);
  try {
    await models.sequelize.sync();
    debug('Sync completed');
  } catch (error) {
    printerror('ERROR: %s', error.message);
  }
});

// for shutting down the application gracefully
process.on('SIGINT', async () => {
  debug('SIGINT signal received.');
  debug('Stoping server.......');
  try {
    await redis.flushall();
    debug('flushing redis database completed.');
    await redis.disconnect();
    debug('Disconnecting from redis database....');
    await ServerCloseAysnc();
    debug('server closed successfully');
  } catch (error) {
    printerror('ERROR: %s', error.message);
    process.exit(1);
  }
});

// Listen on provided port, on all network interfaces.
server.listen(port);
