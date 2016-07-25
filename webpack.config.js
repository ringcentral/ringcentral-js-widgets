// import path from 'path';
var path = require('path');

module.exports = {
  entry: [
    path.resolve(__dirname, 'src/rc-phone.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ringcentral-js-integration-commons.js',
    libraryTarget: 'umd',
    library: 'RcPhone',
  },
  resolve: {
    alias: {
      'node-fetch': 'whatwg-fetch',
    },
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/i,
        loader: 'json',
      },
    ],
  },
};
