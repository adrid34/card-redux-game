const app = require('express')();
const server = require('http').Server(app); // eslint-disable-line
const io = require('socket.io')(server);
const uuid = require('uuid');

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const port = 3000;

app.post('/api/game/new', (req, res) => {
  console.log(req.body);

  setTimeout(() => {
    res.json({
      gameId: uuid.v4(),
    });
  }, 5000);
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
