const app = require('express')();
const server = require('http').Server(app); // eslint-disable-line
const io = require('socket.io')(server);
const uuid = require('uuid');

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

function newGame(opponentName, isStarting) {
  return {
    opponentName,
    isStarting,
  };
}

const port = 3000;

app.post('/api/game/new', (req, res) => {
  console.log(req.body);

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

const clients = [];

server.listen(port, 'localhost', (error) => {
  io.on('connection', (socket) => {
    clients.push(socket.id);

    console.log('Has more than two players connected?', io.engine.clientsCount > 1);
    if (io.engine.clientsCount > 1) {
      const playerOneStarts = Math.random() >= 0.5;
      const [playerOne, playerTwo] = clients;

      io.in(playerOne).emit('newGame', newGame('GuardianBanana', playerOneStarts));
      io.in(playerTwo).emit('newGame', newGame('Boyd', !playerOneStarts));
    }

    socket.on('action', (payload) => {
      let newAction = payload.action;
      console.log('********');
      console.log('Payload BEFORE', newAction);

      if (payload.action.target || payload.action.source) {
        newAction = Object.assign({}, newAction, {
          source: payload.action.source === 'PLAYER' ? 'OPPONENT' : 'PLAYER',
          target: payload.action.target === 'PLAYER' ? 'OPPONENT' : 'PLAYER',
        });
      }

      if (payload.action.card) {
        console.log('--------------');
        console.log('typeof card', typeof payload.action.card);
        console.log('--------------');
      }

      console.log('Payload AFTER', newAction);
      console.log('********');

      socket.broadcast.emit('action', { action: newAction });
    });
  });

  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
  }
});
