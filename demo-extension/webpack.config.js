import path from 'path';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';

const base = {
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'babel',
          'locale',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/i,
        loader: 'json',
      },
      {
        test: /\.css$/i,
        loaders: [
          'style',
          'css',
        ],
      },
      {
        test: /\.woff|\.woff2|.eot|\.ttf/,
        loader: 'url?limit=15000&publicPath=./&name=fonts/[name]_[hash].[ext]',
      },
      {
        test: /\.png|\.jpg|\.gif|\.svg/,
        loader: 'url?limit=20000&publicPath=./&name=images/[name]_[hash].[ext]',
      },
      {
        test: /\.sass|\.scss/,
        loaders: [
          'style',
          'css?modules&localIdentName=[path]_[name]_[local]_[hash:base64:5]',
          'postcss-loader',
          'sass?outputStyle=expanded',
        ],
      },
      {
        test: /\.ogg$/,
        loader: 'url?publicPath=./&name=audio/[name]_[hash].[ext]',
      },
    ],
  },
  devtool: 'inline-source-map',
  postcss: () => [autoprefixer],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};

const config = [{
  ...base,
  sassLoader: {
    includePaths: path.resolve(__dirname, '../dev-server'),
  },
  entry: {
    background: [
      path.resolve(__dirname, 'background'),
    ],
    client: [
      path.resolve(__dirname, 'client'),
    ],
    proxy: [
      path.resolve(__dirname, 'proxy'),
    ],
  },
  output: {
    path: 'demo-extension-build',
    filename: '[name].js',
    publicPath: '/',
  },
}];

export default config;
