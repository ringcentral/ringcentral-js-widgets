import path from 'path';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';

const base = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader',
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: '@ringcentral-integration/locale-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.woff|\.woff2|.eot|\.ttf/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 15000,
              name: 'fonts/[name]_[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg/,
        exclude: /font/,
        use: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
              svgo: {
                plugins: [
                  {
                    removeViewBox: false,
                  },
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.png|\.jpg|\.gif|fonts(\/|\\).*\.svg/,
        use: 'url-loader?limit=20000&name=images/[name]_[hash].[ext]',
      },
      {
        test: /\.sass|\.scss/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[path]_[name]_[local]_[hash:base64:5]',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                __dirname,
                path.resolve(__dirname, './node_modules'),
              ],
              outputStyle: 'expanded',
            },
          },
        ],
      },
      {
        test: /\.ogg$/,
        use: 'file-loader?name=audio/[name]_[hash].[ext]',
      },
    ],
  },
  devtool: 'eval-source-map',
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  // resolve: {
  //   symlinks: false
  // },
};

const config = [
  {
    ...base,
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
  },
];

config.port = '8080';

export default config;
