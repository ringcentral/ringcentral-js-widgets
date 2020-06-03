"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getWebpackConfig;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
      themeFolder = _ref.themeFolder,
      _ref$fontFileSizeLimi = _ref.fontFileSizeLimit,
      fontFileSizeLimit = _ref$fontFileSizeLimi === void 0 ? 15000 : _ref$fontFileSizeLimi;
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
        use: "url-loader?limit=".concat(fontFileSizeLimit, "&name=fonts/[name]_[hash].[ext]")
      }, {
        test: /\.svg/,
        exclude: /fonts/,
        use: ['babel-loader', {
          loader: 'react-svg-loader',
          options: {
            jsx: true,
            svgo: {
              plugins: [{
                removeViewBox: false
              }]
            }
          }
        }]
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
        test: /\.ogg$|\.wav$/,
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
    return _objectSpread(_objectSpread({}, base), {}, {
      mode: 'production',
      plugins: [].concat(_toConsumableArray(base.plugins), [new _webpack["default"].DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      })])
    });
  }

  return _objectSpread(_objectSpread({}, base), {}, {
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
