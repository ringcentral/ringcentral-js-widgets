'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = getWebpackConfig;

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getBaseConfig(_ref) {
  var themeFolder = _ref.themeFolder;

  return {
    module: {
      rules: [{
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }, {
        test: /\.js$/,
        use: ['babel-loader', 'locale-loader'],
        exclude: /node_modules/
      }, {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.woff|\.woff2|.eot|\.ttf/,
        use: 'url-loader?limit=15000&name=fonts/[name]_[hash].[ext]'
      }, {
        test: /\.svg/,
        exclude: /fonts/,
        use: ['babel-loader', 'react-svg-loader']
      }, {
        test: /\.png|\.jpg|\.gif|fonts(\/|\\).*\.svg/,
        use: 'url-loader?limit=20000&name=images/[name]_[hash].[ext]'
      }, {
        test: /\.sass|\.scss/,
        use: [{
          loader: 'style-loader'
        }, 'css-loader?modules&localIdentName=[path]_[name]_[local]_[hash:base64:5]', {
          loader: 'postcss-loader',
          options: {
            plugins: function plugins() {
              return [_autoprefixer2.default];
            }
          }
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: [themeFolder, _path2.default.resolve(process.cwd(), 'node_modules')],
            outputStyle: 'expanded'
          }
        }]
      }, {
        test: /\.ogg$/,
        use: 'file-loader?name=audio/[name]_[hash].[ext]'
      }]
    },
    plugins: [new _webpack2.default.optimize.ModuleConcatenationPlugin()]
  };
}

function getWebpackConfig(_ref2) {
  var _ref2$env = _ref2.env,
      env = _ref2$env === undefined ? 'development' : _ref2$env,
      options = (0, _objectWithoutProperties3.default)(_ref2, ['env']);

  var base = getBaseConfig((0, _extends3.default)({}, options));
  if (env === 'production') {
    return (0, _extends3.default)({}, base, {
      plugins: [].concat((0, _toConsumableArray3.default)(base.plugins), [new _webpack2.default.DefinePlugin({
        'process.env': {
          NODE_ENV: (0, _stringify2.default)('production')
        }
      }), new _webpack2.default.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true
        },
        comments: false,
        sourceMap: true
      })])
    });
  }
  return (0, _extends3.default)({}, base, {
    devtool: 'inline-source-map',
    plugins: [].concat((0, _toConsumableArray3.default)(base.plugins), [new _webpack2.default.DefinePlugin({
      'process.env': {
        NODE_ENV: (0, _stringify2.default)('development')
      }
    })])
  });
}
//# sourceMappingURL=index.js.map
