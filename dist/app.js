#!/usr/bin/env node
"use strict";

var _http = require("http");

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _ioredis = _interopRequireDefault(require("ioredis"));

var _express = _interopRequireWildcard(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _util = require("./src/util");

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _util.getLogger)().debugContext('paic:server');
const redis = new _ioredis.default();
const app = (0, _express.default)();
const isDev = app.get('env') === 'development'; // use helmet

app.use((0, _helmet.default)());
app.use(_helmet.default.noCache());

if (isDev) {
  app.use((0, _morgan.default)('dev'));
} else {
  app.use((0, _morgan.default)('common'));
  app.disable('x-powered-by');
}

app.use((0, _express.json)());
app.use((0, _express.urlencoded)({
  extended: false
})); // import the routing

(0, _routes.default)(app); // catch 404 and forward to error handler

app.use((req, res, next) => {
  next((0, _httpErrors.default)(404));
}); // error handler

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
const port = (0, _util.normalizePort)(process.env.PORT || 8000);
app.set('port', port); // read the file. If the file does not exist exit the application

const server = (0, _http.createServer)(app); // listen for errors

server.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe  ${port}` : `Port ${port}`; // handle specific listen errors with friendly messages

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
}); // Event listener for HTTP server "listening" event.

server.on('listening', async () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe  ${addr}` : `port ${addr.port}`;
  debug(`Listening on  ${bind}`);
}); // for shutting down the application gracefully

process.on('SIGINT', async () => {
  debug('SIGINT signal received.');
  debug('Stoping server.......');
  server.close(async err => {
    if (err) {
      debug('ERROR: %s', err.message);
      process.exit(1);
    }

    debug('Server successfully closed'); // close the redis database and flush all

    try {
      debug('Closing and flushing all data in memory');
      await redis.flushall();
      debug('Cleaning memory completed successfully');
    } catch (error) {
      debug('ERROR: %s', error.message);
    }
  });
}); // Listen on provided port, on all network interfaces.

server.listen(port);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC5qcyJdLCJuYW1lcyI6WyJkZWJ1ZyIsImRlYnVnQ29udGV4dCIsInJlZGlzIiwiUmVkaXMiLCJhcHAiLCJpc0RldiIsImdldCIsInVzZSIsImhlbG1ldCIsIm5vQ2FjaGUiLCJkaXNhYmxlIiwiZXh0ZW5kZWQiLCJyZXEiLCJyZXMiLCJuZXh0IiwiZXJyIiwibG9jYWxzIiwibWVzc2FnZSIsImVycm9yIiwic3RhdHVzIiwicmVuZGVyIiwicG9ydCIsInByb2Nlc3MiLCJlbnYiLCJQT1JUIiwic2V0Iiwic2VydmVyIiwib24iLCJzeXNjYWxsIiwiYmluZCIsImNvZGUiLCJleGl0IiwiYWRkciIsImFkZHJlc3MiLCJjbG9zZSIsImZsdXNoYWxsIiwibGlzdGVuIl0sIm1hcHBpbmdzIjoiQUFBQTs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLE1BQU1BLEtBQUssR0FBRyx1QkFBWUMsWUFBWixDQUF5QixhQUF6QixDQUFkO0FBRUEsTUFBTUMsS0FBSyxHQUFHLElBQUlDLGdCQUFKLEVBQWQ7QUFFQSxNQUFNQyxHQUFHLEdBQUcsdUJBQVo7QUFDQSxNQUFNQyxLQUFLLEdBQUdELEdBQUcsQ0FBQ0UsR0FBSixDQUFRLEtBQVIsTUFBbUIsYUFBakMsQyxDQUNBOztBQUNBRixHQUFHLENBQUNHLEdBQUosQ0FBUSxzQkFBUjtBQUNBSCxHQUFHLENBQUNHLEdBQUosQ0FBUUMsZ0JBQU9DLE9BQVAsRUFBUjs7QUFFQSxJQUFJSixLQUFKLEVBQVc7QUFDVEQsRUFBQUEsR0FBRyxDQUFDRyxHQUFKLENBQVEscUJBQU8sS0FBUCxDQUFSO0FBQ0QsQ0FGRCxNQUVPO0FBQ0xILEVBQUFBLEdBQUcsQ0FBQ0csR0FBSixDQUFRLHFCQUFPLFFBQVAsQ0FBUjtBQUNBSCxFQUFBQSxHQUFHLENBQUNNLE9BQUosQ0FBWSxjQUFaO0FBQ0Q7O0FBRUROLEdBQUcsQ0FBQ0csR0FBSixDQUFRLG9CQUFSO0FBQ0FILEdB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T0FBbEIsQ0FBTDtBQUNBSyxNQUFBQSxPQUFPLENBQUNTLElBQVIsQ0FBYSxDQUFiO0FBQ0Q7O0FBQ0QvQixJQUFBQSxLQUFLLENBQUMsNEJBQUQsQ0FBTCxDQUwwQixDQU0xQjs7QUFDQSxRQUFJO0FBQ0ZBLE1BQUFBLEtBQUssQ0FBQyx5Q0FBRCxDQUFMO0FBQ0EsWUFBTUUsS0FBSyxDQUFDaUMsUUFBTixFQUFOO0FBQ0FuQyxNQUFBQSxLQUFLLENBQUMsd0NBQUQsQ0FBTDtBQUNELEtBSkQsQ0FJRSxPQUFPa0IsS0FBUCxFQUFjO0FBQ2RsQixNQUFBQSxLQUFLLENBQUMsV0FBRCxFQUFja0IsS0FBSyxDQUFDRCxPQUFwQixDQUFMO0FBQ0Q7QUFDRixHQWREO0FBZUQsQ0FsQkQsRSxDQW9CQTs7QUFDQVMsTUFBTSxDQUFDVSxNQUFQLENBQWNmLElBQWQiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cbmltcG9ydCB7IGNyZWF0ZVNlcnZlciB9IGZyb20gJ2h0dHAnO1xuaW1wb3J0IGNyZWF0ZUVycm9yIGZyb20gJ2h0dHAtZXJyb3JzJztcbmltcG9ydCBSZWRpcyBmcm9tICdpb3JlZGlzJztcbmltcG9ydCBleHByZXNzLCB7IGpzb24sIHVybGVuY29kZWQgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCBtb3JnYW4gZnJvbSAnbW9yZ2FuJztcbmltcG9ydCBoZWxtZXQgZnJvbSAnaGVsbWV0JztcbmltcG9ydCB7IG5vcm1hbGl6ZVBvcnQsIGdldExvZ2dlciB9IGZyb20gJy4vc3JjL3V0aWwnO1xuaW1wb3J0IHJvdXRpbmdzIGZyb20gJy4vcm91dGVzJztcblxuY29uc3QgZGVidWcgPSBnZXRMb2dnZXIoKS5kZWJ1Z0NvbnRleHQoJ3BhaWM6c2VydmVyJyk7XG5cbmNvbnN0IHJlZGlzID0gbmV3IFJlZGlzKCk7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmNvbnN0IGlzRGV2ID0gYXBwLmdldCgnZW52JykgPT09ICdkZXZlbG9wbWVudCc7XG4vLyB1c2UgaGVsbWV0XG5hcHAudXNlKGhlbG1ldCgpKTtcbmFwcC51c2UoaGVsbWV0Lm5vQ2FjaGUoKSk7XG5cbmlmIChpc0Rldikge1xuICBhcHAudXNlKG1vcmdhbignZGV2JykpO1xufSBlbHNlIHtcbiAgYXBwLnVzZShtb3JnYW4oJ2NvbW1vbicpKTtcbiAgYXBwLmRpc2FibGUoJ3gtcG93ZXJlZC1ieScpO1xufVxuXG5hcHAudXNlKGpzb24oKSk7XG5hcHAudXNlKHVybGVuY29kZWQoeyBleHRlbmRlZDogZmFsc2UgfSkpO1xuXG4vLyBpbXBvcnQgdGhlIHJvdXRpbmdcbnJvdXRpbmdzKGFwcCk7XG5cbi8vIGNhdGNoIDQwNCBhbmQgZm9yd2FyZCB0byBlcnJvciBoYW5kbGVyXG5hcHAudXNlKChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICBuZXh0KGNyZWF0ZUVycm9yKDQwNCkpO1xufSk7XG5cbi8vIGVycm9yIGhhbmRsZXJcbmFwcC51c2UoKGVyciwgcmVxLCByZXMsIG5leHQpID0+IHtcbiAgLy8gc2V0IGxvY2Fscywgb25seSBwcm92aWRpbmcgZXJyb3IgaW4gZGV2ZWxvcG1lbnRcbiAgcmVzLmxvY2Fscy5tZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG4gIHJlcy5sb2NhbHMuZXJyb3IgPSByZXEuYXBwLmdldCgnZW52JykgPT09ICdkZXZlbG9wbWVudCcgPyBlcnIgOiB7fTtcblxuICAvLyByZW5kZXIgdGhlIGVycm9yIHBhZ2VcbiAgcmVzLnN0YXR1cyhlcnIuc3RhdHVzIHx8IDUwMCk7XG4gIHJlcy5yZW5kZXIoJ2Vycm9yJyk7XG59KTtcblxuY29uc3QgcG9ydCA9IG5vcm1hbGl6ZVBvcnQocHJvY2Vzcy5lbnYuUE9SVCB8fCA4MDAwKTtcbmFwcC5zZXQoJ3BvcnQnLCBwb3J0KTtcblxuLy8gcmVhZCB0aGUgZmlsZS4gSWYgdGhlIGZpbGUgZG9lcyBub3QgZXhpc3QgZXhpdCB0aGUgYXBwbGljYXRpb25cbmNvbnN0IHNlcnZlciA9IGNyZWF0ZVNlcnZlcihhcHApO1xuXG4vLyBsaXN0ZW4gZm9yIGVycm9yc1xuc2VydmVyLm9uKCdlcnJvcicsIChlcnJvcikgPT4ge1xuICBpZiAoZXJyb3Iuc3lzY2FsbCAhPT0gJ2xpc3RlbicpIHtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxuICBjb25zdCBiaW5kID0gdHlwZW9mIHBvcnQgPT09ICdzdHJpbmcnID8gYFBpcGUgICR7cG9ydH1gIDogYFBvcnQgJHtwb3J0fWA7XG4gIC8vIGhhbmRsZSBzcGVjaWZpYyBsaXN0ZW4gZXJyb3JzIHdpdGggZnJpZW5kbHkgbWVzc2FnZXNcbiAgc3dpdGNoIChlcnJvci5jb2RlKSB7XG4gICAgY2FzZSAnRUFDQ0VTJzpcbiAgICAgIGRlYnVnKGAke2JpbmR9IHJlcXVpcmVzIGVsZXZhdGVkIHByaXZpbGVnZXNgKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnRUFERFJJTlVTRSc6XG4gICAgICBkZWJ1ZyhgJHtiaW5kfSBpcyBhbHJlYWR5IGluIHVzZWApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgZXJyb3I7XG4gIH1cbn0pO1xuLy8gRXZlbnQgbGlzdGVuZXIgZm9yIEhUVFAgc2VydmVyIFwibGlzdGVuaW5nXCIgZXZlbnQuXG5zZXJ2ZXIub24oJ2xpc3RlbmluZycsIGFzeW5jICgpID0+IHtcbiAgY29uc3QgYWRkciA9IHNlcnZlci5hZGRyZXNzKCk7XG4gIGNvbnN0IGJpbmQgPSB0eXBlb2YgYWRkciA9PT0gJ3N0cmluZycgPyBgcGlwZSAgJHthZGRyfWAgOiBgcG9ydCAke2FkZHIucG9ydH1gO1xuICBkZWJ1ZyhgTGlzdGVuaW5nIG9uICAke2JpbmR9YCk7XG59KTtcblxuLy8gZm9yIHNodXR0aW5nIGRvd24gdGhlIGFwcGxpY2F0aW9uIGdyYWNlZnVsbHlcbnByb2Nlc3Mub24oJ1NJR0lOVCcsIGFzeW5jICgpID0+IHtcbiAgZGVidWcoJ1NJR0lOVCBzaWduYWwgcmVjZWl2ZWQuJyk7XG4gIGRlYnVnKCdTdG9waW5nIHNlcnZlci4uLi4uLi4nKTtcbiAgc2VydmVyLmNsb3NlKGFzeW5jIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBkZWJ1ZygnRVJST1I6ICVzJywgZXJyLm1lc3NhZ2UpO1xuICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH1cbiAgICBkZWJ1ZygnU2VydmVyIHN1Y2Nlc3NmdWxseSBjbG9zZWQnKTtcbiAgICAvLyBjbG9zZSB0aGUgcmVkaXMgZGF0YWJhc2UgYW5kIGZsdXNoIGFsbFxuICAgIHRyeSB7XG4gICAgICBkZWJ1ZygnQ2xvc2luZyBhbmQgZmx1c2hpbmcgYWxsIGRhdGEgaW4gbWVtb3J5Jyk7XG4gICAgICBhd2FpdCByZWRpcy5mbHVzaGFsbCgpO1xuICAgICAgZGVidWcoJ0NsZWFuaW5nIG1lbW9yeSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGRlYnVnKCdFUlJPUjogJXMnLCBlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbi8vIExpc3RlbiBvbiBwcm92aWRlZCBwb3J0LCBvbiBhbGwgbmV0d29yayBpbnRlcmZhY2VzLlxuc2VydmVyLmxpc3Rlbihwb3J0KTtcbiJdfQ==