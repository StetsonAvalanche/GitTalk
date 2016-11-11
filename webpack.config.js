/*
Referenced from:
https://semaphoreci.com/community/tutorials/testing-react-components-with-enzyme-and-mocha
*/

const path = require('path');
const webpack = require('webpack');

// env
const buildDirectory = './public/';

module.exports = {
  entry: './client/index.js',
  devServer: {
    hot: true,
    inline: true,
    port: 8000,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(buildDirectory),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8000/public',
  },
  externals: {
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      // loader: 'babel-loader',
      // resolveLoader: {
      //   root: path.join(__dirname, 'node_modules')
      // },
      query: {
        presets: ['react', 'es2015', 'stage-0'],
      },
    }],
  },
  plugins: [],
  // devtool: 'source-map',
};