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
        test: /\.svg/,
        exclude: /node_modules|font/,
        loaders: [
          'babel',
          'svg-react',
        ],
      },
      {
        test: /\.png|\.jpg|\.gif|\.svg/,
        exclude: /assets\/images\/.+\.svg/,
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
    includePaths: __dirname,
  },
  entry: {
    index: [path.resolve(__dirname, './index')],
    proxy: [path.resolve(__dirname, './proxy')],
    redirect: [path.resolve(__dirname, './redirect')],
  },
  output: {
    path: path.resolve(__dirname, './'),
    filename: '[name].js',
    publicPath: '/',
  },
}];

config.port = '8191';

export default config;
