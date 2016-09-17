const app = require('express')();
const server = require('http').Server(app); // eslint-disable-line
const io = require('socket.io')(server);
const uuid = require('uuid');

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const { newGame, lengthOfRoom, clientsForRoom, isClientInRoom } = require('./utils');

const port = 3000;

app.post('/api/game/new', (req, res) => {
  setTimeout(() => {
    res.json({
      gameId: uuid.v4(),
    });
  }, 1000);
});

const compiler = webpack(config);
app.use(webpackMiddleware(compiler, {
  hot: true,
  filename: config.output.filename,
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
}));
app.use(webpackHotMiddleware(compiler));

server.listen(port, 'localhost', (error) => {
  io.on('connection', (socket) => {
    socket.on('gameJoin', ({ gameId }) => {
      const getPlayerCount = () => lengthOfRoom(io, gameId);

      if (getPlayerCount() === 2) return;

      socket.join(gameId);
      io.to(gameId).emit('playerJoined', { playerCount: getPlayerCount() });

      console.log('[GAMEJOIN] Current players:', clientsForRoom(io, gameId));

      if (getPlayerCount() === 2) {
        console.log('[GAMEJOIN] [START] Time to start the game', gameId);
        const playerOneStarts = Math.random() >= 0.5;
        const [playerOne, playerTwo] = clientsForRoom(io, gameId);

        io.to(playerOne).emit('newGame', newGame(gameId, 'GuardianBanana', playerOneStarts));
        io.to(playerTwo).emit('newGame', newGame(gameId, 'Boyd', !playerOneStarts));
      }
    });

    // TODO: implment in client and notify other players
    socket.on('gameLeave', (gameId) => {
      socket.leave(gameId);
    });

    socket.on('action', ({ gameId, action }) => {
      console.log('[ACTION] current clients:', clientsForRoom(io, gameId));
      console.log('[ACTION] Current action from:',
                  `Player${clientsForRoom(io, gameId).indexOf(socket.id) + 1}`);

      // Validate if player is actually part of this game.
      if (!isClientInRoom(io, gameId, socket.id)) return;

      let newAction = action;
      if (action.target || action.source) {
        newAction = Object.assign({}, action, {
          source: action.source === 'PLAYER' ? 'OPPONENT' : 'PLAYER',
          target: action.target === 'PLAYER' ? 'OPPONENT' : 'PLAYER',
        });
      }

      console.log('[ACTION] Broadcasting an action to:', gameId);
      console.log('[ACTION] Action being sent is:', newAction);
      socket.broadcast.to(gameId).emit('action', { action: newAction });
    });
  });

  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
  }
});
