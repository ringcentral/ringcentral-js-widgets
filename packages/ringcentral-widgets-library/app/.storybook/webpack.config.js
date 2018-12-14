const path = require("path");

const VERSION = {
  JUPITER: 'JUPITER',
  DEFAULT: 'DEFAULT'
};
module.exports = (baseConf, type) => {
  const STORYBOOK_VERSION = process.env.STORYBOOK_VERSION;
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
        "css-loader?modules&localIdentName=[local]",
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
      test: /\.(ttf|svg|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      use: 'base64-inline-loader?name=[name].[ext]',
      include: [
        path.resolve(__dirname, '../assets/DynamicsFont')
      ],
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

  // TODO
  // if (STORYBOOK_VERSION === VERSION.JUPITER) {
  //   const alias = baseConf.resolve.alias;
  //   baseConf.resolve.alias = {
  //     ...alias,
  //     '@test': './new'
  //   }
  // } else {
  //   const alias = baseConf.resolve.alias;
  //   baseConf.resolve.alias = {
  //     ...alias,
  //     '@test': '.'
  //   }
  // }

  return baseConf;
};
