const path = require('path');
const autoprefixer = require('autoprefixer');
const pcssImport = require('postcss-import');
const pcssNested = require('postcss-nested');
const pcssVar = require('postcss-simple-vars');
const pcssMixins = require('postcss-mixins');

module.exports = {
  entry: {
    'standalone.js': path.resolve(__dirname, 'demo/applications/standalone/index.js'),
    'showcase.js': path.resolve(__dirname, 'demo/applications/showcase/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'demo/dist/applications'),
    filename: '[name]',
    libraryTarget: 'umd',
    library: 'widgets',
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
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[folder]__[local]!postcss-loader',
      },
      {
        test: /\.(ogg|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader',
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
    ],
  },
  postcss(webpack) {
    return [
      pcssImport({
        addDependencyTo: webpack,
        path: ['src/styles'],
      }),
      pcssMixins,
      pcssVar,
      pcssNested,
      autoprefixer,
    ];
  },
};
