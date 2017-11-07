const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer'); // eslint-disable-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  root: path.join(__dirname, '..'),
  src: path.join(__dirname, '..', 'src'),
  dist: path.join(__dirname, '..', 'dist'),
};

module.exports = {
  context: paths.root,
  devtool: 'cheap-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'webpack/hot/dev-server',
    path.join(paths.src, 'app.js'),
  ],
  output: {
    path: paths.dist,
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.json', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        }
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      }, {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              sourceMap: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: () => ([
                autoprefixer({ browsers: ['last 2 versions'] }),
              ]),
            },
          }, {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
