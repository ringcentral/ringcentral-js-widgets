const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const dotenv = require('dotenv');
const packageConfig = require('./package');

const buildPath = path.resolve(__dirname, 'src');

dotenv.config();

const apiConfig = {
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
  server: process.env.RINGCENTRAL_SERVER_URL,
  redirectUri: process.env.REDIRECT_URI,
};
const version = packageConfig.version;

const config = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    proxy: './src/proxy.js',
    redirect: './src/redirect.js',
  },
  devServer: {
    static: buildPath,
    hot: true,
    port: 8080,
    client: {
      overlay: false,
    },
  },
  devtool: 'eval-source-map',
  output: {
    path: buildPath,
    filename: '[name].js',
  },
  resolve: {
    // webpack < 5 used to include polyfills for node.js core modules by default.
    // This is no longer the case. Verify if you need this module and configure a polyfill for it.
    //
    // more doc: https://webpack.js.org/configuration/resolve/#resolvefallback
    //
    fallback: {
      vm: require.resolve('vm-browserify'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      events: require.resolve('events'),
      querystring: require.resolve('querystring-es3')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
      setImmediate: ['setimmediate', 'setImmedate'],
      clearImmediate: ['setimmediate', 'clearImmedate'],
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        API_CONFIG: JSON.stringify(apiConfig),
        APP_VERSION: JSON.stringify(version),
        HOSTING_URL: JSON.stringify('http://localhost:8080'),
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
        loader: '@ringcentral-integration/locale-loader',
        options: {
          supportedLocales: [],
          chunk: true,
        },
      },
      {
        test: /\.md$/,
        use: 'raw-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg/,
        exclude: /font|src(\/|\\)assets(\/|\\)images/,
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
        test: /\.woff|\.woff2|.eot|\.ttf/,
        resourceQuery: { not: [/url|raw/] },
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name]_[hash][ext]',
        },
      },
      {
        test: /\.png|\.jpg|\.gif|fonts(\/|\\).*\.svg/,
        resourceQuery: { not: [/url|raw/] },
        type: 'asset/resource',
        generator: {
          filename: `images/[name]_[hash][ext]`,
        },
      },
      {
        test: /\.sass|\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[folder]_[local]',
              }
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [autoprefixer],
              }
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'expanded',
                includePaths: ['src', 'node_modules'],
              }
            },
          },
        ],
      },
      {
        test: /\.ogg$|\.wav$|\.mp3$/,
        resourceQuery: { not: [/url|raw/] },
        type: 'asset/resource',
        generator: {
          filename: 'audio/[name]_[hash][ext]',
        },
      },
    ],
  },
};

module.exports = config;
