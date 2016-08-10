import webpack from 'webpack';
import path from 'path';


export default {
  entry: [
    'webpack-dev-server/client?http://localhost:8191',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'app'),
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      'node-fetch': 'whatwg-fetch',
    },
  },
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
