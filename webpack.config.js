var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  debug: true,
  context: path.resolve(__dirname, '.'),
  entry:  './src/app.js',
  output: {
    path: './dist',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: ['src', 'node_modules'],
    extensions: ['', '.json', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
