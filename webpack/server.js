const app = require('express')();
const server = require('http').Server(app); // eslint-disable-line
const io = require('socket.io')(server);

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const compiler = webpack(config);

const game = require('./routes/api/game');
const {
  onGameJoinHandler,
  onGameLeaveHandler,
  onActionHandler,
} = require('./handlers');

// - Routes -------------------------------------------------------------------/
app.post('/api/game/new', game.generateNewGameId);

// - Middlewares --------------------------------------------------------------/
app.use(webpackMiddleware(compiler, {
  hot: true,
  filename: config.output.filename,
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
}));
app.use(webpackHotMiddleware(compiler));

// - Server launch ------------------------------------------------------------/
server.listen(config.port, 'localhost', (error) => {
  io.on('connection', (socket) => {
    const bindSocket = require('./utils').bindSocket(io, socket);

    socket.on('gameJoin', bindSocket(onGameJoinHandler));
    socket.on('gameLeave', bindSocket(onGameLeaveHandler));
    socket.on('action', bindSocket(onActionHandler));
  });

  /* eslint-disable no-console */
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${config.port}. ` +
                 `Open up http://localhost:${config.port}/ in your browser.`);
  }
  /* eslint-enable no-console */
});
