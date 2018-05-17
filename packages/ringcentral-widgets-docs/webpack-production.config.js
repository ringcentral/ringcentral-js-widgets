const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

const buildPath = path.resolve(__dirname, 'src/app');
const outputPath = path.resolve(__dirname, 'gh-pages');

const config = {
  entry: './src/app/index.js',
  output: {
    path: outputPath,
    filename: 'index.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
    new CopyWebpackPlugin([
      { from: 'src/www/css', to: 'css' },
      { from: 'src/www/images', to: 'images' },
      { from: 'src/www/index.html', to: 'index.html' },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: '@ringcentral-integration/locale-loader',
        include: /ringcentral-widgets/,
      },
      {
        test: /\.md$/,
        use: 'raw-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.woff|\.woff2|.eot|\.ttf/,
        use: 'url-loader?limit=15000&publicPath=./&name=fonts/[name]_[hash].[ext]',
      },
      {
        test: /\.svg/,
        exclude: /node_modules|font/,
        use: [
          'babel-loader',
          'react-svg-loader',
        ],
      },
      {
        test: /\.png|\.jpg|\.gif|\.svg/,
        exclude: /assets(\/|\\)images(\/|\\).+\.svg/,
        use: 'url-loader?limit=20000&publicPath=./&name=images/[name]_[hash].[ext]',
      },
      {
        test: /\.sass|\.scss/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[local]_[hash:base64:5]',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              includePaths: [buildPath],
            },
          },
        ],
      },
    ],
  }
};

module.exports = config;
