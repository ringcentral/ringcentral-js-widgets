import autoprefixer from 'autoprefixer';
import path from 'path';
import webpack from 'webpack';

function getBaseConfig({
  cacheDirectory = false,
  hashPrefix = '',
  supportedLocales = [],
  themeFolder,
  fontFileSizeLimit = 15000,
}) {
  return {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'source-map-loader',
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory,
              },
            },
            {
              loader: '@ringcentral-integration/locale-loader',
              options: {
                supportedLocales,
              },
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
          use: `url-loader?limit=${fontFileSizeLimit}&name=fonts/[name]_[hash].[ext]`,
        },
        {
          test: /\.svg/,
          exclude: /fonts/,
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
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: `${hashPrefix}_[path]_[name]_[local]_[hash:base64:5]`,
              },
            },
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
                  themeFolder,
                  path.resolve(process.cwd(), 'node_modules'),
                ],
                outputStyle: 'expanded',
              },
            },
          ],
        },
        {
          test: /\.ogg$|\.wav$/,
          use: 'file-loader?name=audio/[name]_[hash].[ext]',
        },
      ],
    },
    plugins: [],
  };
}

export default function getWebpackConfig({ env = 'development', ...options }) {
  const base = getBaseConfig({
    ...options,
  });
  if (env === 'production') {
    return {
      ...base,
      mode: 'production',
      plugins: [
        ...base.plugins,
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production'),
          },
        }),
      ],
    };
  }
  return {
    ...base,
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
      ...base.plugins,
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
      }),
    ],
  };
}
