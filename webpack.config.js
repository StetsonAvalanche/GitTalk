const path = require('path');
const webpack = require('webpack');

let PROD = process.argv[2] === '-prod' ? 1 : 0;

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
      loader: 'babel-loader',
      resolveLoader: {
        root: path.join(__dirname, 'node_modules')
      },
      query: {
        presets: ['react', 'es2015', 'stage-0'],
      },
    }],
  },
  plugins: PROD ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ] : [],
  // devtool: 'source-map',
};
