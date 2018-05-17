import autoprefixer from 'autoprefixer';
import path from 'path';
import webpack from 'webpack';

function getBaseConfig({
  themeFolder,
}) {
  return {
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
        },
        {
          test: /\.js$/,
          use: [
            'babel-loader',
            '@ringcentral-integration/locale-loader',
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.woff|\.woff2|.eot|\.ttf/,
          use: 'url-loader?limit=15000&name=fonts/[name]_[hash].[ext]',
        },
        {
          test: /\.svg/,
          exclude: /fonts/,
          use: [
            'babel-loader',
            'react-svg-loader'
          ]
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
                includePaths: [themeFolder, path.resolve(process.cwd(), 'node_modules')],
                outputStyle: 'expanded'
              }
            }
          ],
        },
        {
          test: /\.ogg$/,
          use: 'file-loader?name=audio/[name]_[hash].[ext]',
        },
      ],
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin()
    ],
  };
}


export default function getWebpackConfig({
  env = 'development',
  ...options,
}) {
  const base = getBaseConfig({
    ...options,
  });
  if (env === 'production') {
    return {
      ...base,
      plugins: [
        ...base.plugins,
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production'),
          },
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
            screw_ie8: true,
          },
          comments: false,
          sourceMap: true,
        }),
      ],
    };
  }
  return {
    ...base,
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
