const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.config.js');

const port = 3000;

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  hot: true,
  filename: config.output.filename,
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
});
server.listen(port, 'localhost', (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
  }
});
