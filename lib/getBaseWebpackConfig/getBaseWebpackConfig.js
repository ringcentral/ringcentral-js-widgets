"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBaseWebpackConfig = void 0;

var _autoprefixer = _interopRequireDefault(require("autoprefixer"));

var _crypto = _interopRequireDefault(require("crypto"));

var _path = _interopRequireDefault(require("path"));

var _threadLoader = require("thread-loader");

var _webpackBundleAnalyzer = require("webpack-bundle-analyzer");

var _webpack = require("webpack");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function MD5(input) {
  return _crypto["default"].createHash('MD5').update(input).digest('hex');
}

var getBaseWebpackConfig = function getBaseWebpackConfig(_ref) {
  var _ref$analyzeBundle = _ref.analyzeBundle,
      analyzeBundle = _ref$analyzeBundle === void 0 ? false : _ref$analyzeBundle,
      _ref$cacheDirectory = _ref.cacheDirectory,
      cacheDirectory = _ref$cacheDirectory === void 0 ? false : _ref$cacheDirectory,
      _ref$fontFileSizeLimi = _ref.fontFileSizeLimit,
      fontFileSizeLimit = _ref$fontFileSizeLimi === void 0 ? 15000 : _ref$fontFileSizeLimi,
      _ref$imageFileSizeLim = _ref.imageFileSizeLimit,
      imageFileSizeLimit = _ref$imageFileSizeLim === void 0 ? 20000 : _ref$imageFileSizeLim,
      _ref$hashPrefix = _ref.hashPrefix,
      hashPrefix = _ref$hashPrefix === void 0 ? '' : _ref$hashPrefix,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? 'production' : _ref$mode,
      _ref$prefixSvgId = _ref.prefixSvgId,
      prefixSvgId = _ref$prefixSvgId === void 0 ? false : _ref$prefixSvgId,
      _ref$supportedLocales = _ref.supportedLocales,
      supportedLocales = _ref$supportedLocales === void 0 ? [] : _ref$supportedLocales,
      themeFolder = _ref.themeFolder,
      _ref$threadLoaderOpti = _ref.threadLoaderOptions,
      threadLoaderOptions = _ref$threadLoaderOpti === void 0 ? {} : _ref$threadLoaderOpti,
      _ref$useThreadLoader = _ref.useThreadLoader,
      useThreadLoader = _ref$useThreadLoader === void 0 ? false : _ref$useThreadLoader,
      _ref$preferredDevtool = _ref.preferredDevtool,
      preferredDevtool = _ref$preferredDevtool === void 0 ? 'eval-source-map' : _ref$preferredDevtool,
      _ref$useDevtool = _ref.useDevtool,
      useDevtool = _ref$useDevtool === void 0 ? mode === 'development' : _ref$useDevtool,
      _ref$sourceMapLoaderE = _ref.sourceMapLoaderExcludes,
      sourceMapLoaderExcludes = _ref$sourceMapLoaderE === void 0 ? /node_modules/ : _ref$sourceMapLoaderE,
      _ref$babelLoaderExclu = _ref.babelLoaderExcludes,
      babelLoaderExcludes = _ref$babelLoaderExclu === void 0 ? /node_modules/ : _ref$babelLoaderExclu;
  var devtool = useDevtool ? preferredDevtool : false;
  var threadLoader = [];

  if (useThreadLoader) {
    (0, _threadLoader.warmup)(threadLoaderOptions, ['source-map-loader', 'babel-loader', 'sass-loader']);
    threadLoader.push({
      loader: 'thread-loader',
      options: threadLoaderOptions
    });
  }

  var plugins = [new _webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(mode)
  })];

  if (analyzeBundle) {
    plugins.push(new _webpackBundleAnalyzer.BundleAnalyzerPlugin());
  }

  var rules = []; // source-map-loader

  if (useDevtool) {
    rules.push({
      enforce: 'pre',
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: sourceMapLoaderExcludes,
      use: ['source-map-loader'].concat(threadLoader)
    });
  } // babel-loader


  rules.push({
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
    }].concat(threadLoader),
    exclude: babelLoaderExcludes
  }); // css

  rules.push({
    test: /\.css$/i,
    use: ['style-loader', 'css-loader'].concat(threadLoader)
  }); // font

  rules.push({
    test: /\.woff|\.woff2|.eot|\.ttf/,
    use: "url-loader?limit=".concat(fontFileSizeLimit, "&name=fonts/[name]_[hash].[ext]")
  }); // svg

  rules.push({
    test: /\.svg/,
    exclude: /fonts/,
    use: function use(_ref2) {
      var resource = _ref2.resource;
      return ['babel-loader', {
        loader: 'react-svg-loader',
        options: {
          jsx: true,
          svgo: {
            plugins: [{
              removeViewBox: false
            }].concat(_toConsumableArray(prefixSvgId ? [{
              cleanupIDs: {
                prefix: "".concat(MD5(_path["default"].basename(resource, '.svg')), "-")
              }
            }] : []))
          }
        }
      }];
    }
  }); // images and svg font

  rules.push({
    test: /\.png|\.jpg|\.gif|fonts(\/|\\).*\.svg/,
    use: "url-loader?limit=".concat(imageFileSizeLimit, "&name=images/[name]_[hash].[ext]")
  }); // sass & scss

  rules.push({
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
        includePaths: [themeFolder, _path["default"].resolve(process.cwd(), 'node_modules'), _path["default"].resolve(process.cwd(), '../../node_modules')],
        outputStyle: 'expanded'
      }
    }].concat(threadLoader)
  }); // audio

  rules.push({
    test: /\.ogg$|\.wav$/,
    use: 'file-loader?name=audio/[name]_[hash].[ext]'
  });
  return {
    mode: mode,
    devtool: devtool,
    plugins: plugins,
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
      rules: rules
    }
  };
};

exports.getBaseWebpackConfig = getBaseWebpackConfig;
//# sourceMappingURL=getBaseWebpackConfig.js.map
