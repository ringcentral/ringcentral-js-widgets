const webpack = require('webpack');
const path = require('path');

const buildPath = path.resolve(__dirname, 'src/www');
const outputPath = path.resolve(__dirname, 'release');

const config = {
  entry: './src/app/index.js',
  output: {
    path: outputPath,
    filename: 'index.js',
  },
  resolve: {
    alias: {
      'ringcentral-widget': path.resolve(__dirname, '../src'),
    },
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
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
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
        test: /\.png|\.jpg|\.gif|\.svg/,
        use: 'url-loader?limit=20000&publicPath=./&name=images/[name]_[hash].[ext]',
      },
      {
        test: /\.sass|\.scss/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]',
          {
            loader: 'postcss-loader',
            options: {
              config: 'postcss.config.js'
            }
          },
          'sass-loader?outputStyle=expanded',
        ],
      },
    ],
  }
};

module.exports = config;
