const app = require('express')();
const server = require('http').Server(app); // eslint-disable-line new-cap
const io = require('socket.io')(server);

const port = 3000;

/* eslint-disable import/no-extraneous-dependencies, import/newline-after-import */
// Will be fixed when there is a seperate production server.
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const compiler = webpack(config);
/* eslint-enable */

const { bindSocket } = require('./utils');
const game = require('./routes/api/game');
const {
  onActionHandler,
  onGameJoinHandler,
  onGameLeaveHandler,
  onGameStartHandler,
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
server.listen(port, 'localhost', (error) => {
  io.on('connection', (socket) => {
    const bindSocketCurried = bindSocket(io, socket);

    socket.on('gameJoin', bindSocketCurried(onGameJoinHandler));
    socket.on('gameLeave', bindSocketCurried(onGameLeaveHandler));
    socket.on('gameStart', bindSocketCurried(onGameStartHandler));
    socket.on('action', bindSocketCurried(onActionHandler));
  });

  /* eslint-disable no-console */
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}. ` +
                 `Open up http://localhost:${port}/ in your browser.`);
  }
  /* eslint-enable no-console */
});
