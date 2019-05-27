"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getWebpackConfig;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _autoprefixer = _interopRequireDefault(require("autoprefixer"));

var _path = _interopRequireDefault(require("path"));

var _webpack = _interopRequireDefault(require("webpack"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function getBaseConfig(_ref) {
  var _ref$cacheDirectory = _ref.cacheDirectory,
      cacheDirectory = _ref$cacheDirectory === void 0 ? false : _ref$cacheDirectory,
      _ref$hashPrefix = _ref.hashPrefix,
      hashPrefix = _ref$hashPrefix === void 0 ? '' : _ref$hashPrefix,
      _ref$supportedLocales = _ref.supportedLocales,
      supportedLocales = _ref$supportedLocales === void 0 ? [] : _ref$supportedLocales,
      themeFolder = _ref.themeFolder;
  return {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
      rules: [{
        enforce: 'pre',
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'source-map-loader'
      }, {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: cacheDirectory
          }
        }, {
          loader: '@ringcentral-integration/locale-loader',
          options: {
            supportedLocales: supportedLocales
          }
        }],
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
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: "".concat(hashPrefix, "_[path]_[name]_[local]_[hash:base64:5]")
          }
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function plugins() {
              return [_autoprefixer["default"]];
            }
          }
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: [themeFolder, _path["default"].resolve(process.cwd(), 'node_modules')],
            outputStyle: 'expanded'
          }
        }]
      }, {
        test: /\.ogg$/,
        use: 'file-loader?name=audio/[name]_[hash].[ext]'
      }]
    },
    plugins: []
  };
}

function getWebpackConfig(_ref2) {
  var _ref2$env = _ref2.env,
      env = _ref2$env === void 0 ? 'development' : _ref2$env,
      options = _objectWithoutProperties(_ref2, ["env"]);

  var base = getBaseConfig(_objectSpread({}, options));

  if (env === 'production') {
    return _objectSpread({}, base, {
      mode: 'production',
      plugins: [].concat(_toConsumableArray(base.plugins), [new _webpack["default"].DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      })])
    });
  }

  return _objectSpread({}, base, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [].concat(_toConsumableArray(base.plugins), [new _webpack["default"].DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })])
  });
}
//# sourceMappingURL=index.js.map
