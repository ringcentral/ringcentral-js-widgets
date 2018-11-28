const path = require("path");
module.exports = (baseConf, configType) => {
  baseConf.module.rules = [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.css$/,
      loader: 'css-loader'
    },
    {
      test: /\.scss$/,
      loaders: [
        "style-loader",
        "css-loader?modules&localIdentName=[path]_[name]_[local]_[hash:base64:5]",
        "sass-loader"],
      include: path.resolve(__dirname, "../")
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash].[ext]'
        }
      }
    },
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: '[name].[hash].[ext]'
        }
      }
    },
    {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: '[name].[hash].[ext]'
        }
      }
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream',
          name: '[name].[hash].[ext]'
        }
      }
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]'
        }
      }
    },
    {
      test: /\.svg$/,
      use: [
        {
          loader: "babel-loader"
        },
        {
          loader: "react-svg-loader",
          options: {
            jsx: true // true outputs JSX tags
          }
        }
      ]
    },
    {
      test: /\.mkd$/,
      use: 'raw-loader'
    }
  ];

  return baseConf;
};
