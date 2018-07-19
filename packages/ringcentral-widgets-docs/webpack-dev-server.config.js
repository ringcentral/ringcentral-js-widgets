const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

const buildPath = path.resolve(__dirname, 'src/app');
const outputPath = path.resolve(__dirname, 'src/www');

const config = {
  entry: './src/app/index.js',
  devServer: {
    contentBase: 'src/www',
    hot: true,
    inline: true,
    port: 8300,
  },
  devtool: 'eval',
  output: {
    path: outputPath,
    filename: 'index.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader'
      },
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
          'css-loader?modules&localIdentName=[path]_[name]_[local]_[hash:base64:5]',
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
