const path = require('path');
const autoprefixer = require('autoprefixer');
const pcssImport = require('postcss-import');
const pcssNested = require('postcss-nested');
const pcssVar = require('postcss-simple-vars');
const pcssMixins = require('postcss-mixins');

module.exports = {
  entry: [
    path.resolve(__dirname, 'src/index.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ringcentral-js-widget.js',
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules\/(?!cleave.js)/,
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
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
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
