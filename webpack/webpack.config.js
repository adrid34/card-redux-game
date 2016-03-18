const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: [
    path.join(__dirname, '..', 'src', 'app.js'),
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3000/',
  ],
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    modulesDirectories: ['src', 'node_modules'],
    extensions: ['', '.json', '.js', '.jsx'],
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]',
          'postcss-loader?browsers=last 2 version',
          'sass?outputStyle=expanded&sourceMap',
        ],
      },
    ],
  },
  postcss: () => [autoprefixer],
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
