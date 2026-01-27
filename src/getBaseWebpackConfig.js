"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFinalFilePathMap = exports.getBaseWebpackConfig = void 0;
Object.defineProperty(exports, "merge", {
  enumerable: true,
  get: function get() {
    return _webpackMerge.merge;
  }
});
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _processI18n = require("@ringcentral-integration/i18n/lib/processI18n");
var _getArgs = require("@ringcentral-integration/next-integration/lib/getArgs");
var _getBaseWebpackConfig = require("@ringcentral-integration/widgets/lib/getBaseWebpackConfig");
var _copyWebpackPlugin = _interopRequireDefault(require("copy-webpack-plugin"));
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));
var _template = _interopRequireDefault(require("lodash/template"));
var _path = _interopRequireDefault(require("path"));
var nodeUrl = _interopRequireWildcard(require("url"));
var _webpack = require("webpack");
var _webpackMerge = require("webpack-merge");
var _getFilenameMap = require("./getFilenameMap");
var _getPrimaryColor = require("./getPrimaryColor");
var _getLoadWorkerTemplate = require("./scriptsLoadFail/getLoadWorkerTemplate");
var _getScriptsLoadFailTemplate = require("./scriptsLoadFail/getScriptsLoadFailTemplate");
var _getThemeInjectTemplate = require("./themeInject/getThemeInjectTemplate");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DEFAULT_FILENAME = '[name].js';
// * only contenthash is supported in worker build
var DEFAULT_CHUNK_FILENAME = '[id]-[contenthash].js';
/**
 * default vendor chunk name
 */
var VENDOR_KEY = 'vendor';
var getFinalFilePathMap = exports.getFinalFilePathMap = function getFinalFilePathMap(projectConfig) {
  var filenameMap = projectConfig.projectConfig.pages.reduce(function (acc, _ref) {
    var main = _ref.main,
      index = _ref.index,
      filename = _ref.filename;
    var chunkName = _path["default"].parse(main).name;
    acc[chunkName] = filename !== null && filename !== void 0 ? filename :
    // when have index page, use contenthash to avoid cache, because that always use index.html cache mechanism, once index.html be update will get all new js entry
    // others always want original name, that may load manually
    index ? '[name]-[contenthash].js' : DEFAULT_FILENAME;
    return acc;
  }, {});
  return filenameMap;
};
var args = (0, _getArgs.getArgs)();
var getBaseWebpackConfig = exports.getBaseWebpackConfig = function getBaseWebpackConfig(_ref2) {
  var _appConfig$brandConfi, _projectConfig$assets;
  var projectConfig = _ref2.projectConfig,
    devServer = _ref2.devServer,
    _ref2$analyzeBundle = _ref2.analyzeBundle,
    analyzeBundle = _ref2$analyzeBundle === void 0 ? !!args.analyze : _ref2$analyzeBundle,
    _templateParameters = _ref2.templateParameters,
    outputAlwaysUseProdFileName = _ref2.outputAlwaysUseProdFileName,
    publicPath = _ref2.publicPath,
    _ref2$blockSegmentSou = _ref2.blockSegmentSourceCode,
    blockSegmentSourceCode = _ref2$blockSegmentSou === void 0 ? false : _ref2$blockSegmentSou,
    _ref2$blockPendoSourc = _ref2.blockPendoSourceCode,
    blockPendoSourceCode = _ref2$blockPendoSourc === void 0 ? false : _ref2$blockPendoSourc;
  var mode = projectConfig.mode,
    appConfig = projectConfig.appConfig,
    _projectConfig$themeS = projectConfig.themeSystem,
    themeSystem = _projectConfig$themeS === void 0 ? 'juno' : _projectConfig$themeS,
    _projectConfig$runtim = projectConfig.runtimeEnvironment,
    runtimeEnvironment = _projectConfig$runtim === void 0 ? 'web' : _projectConfig$runtim;
  var defaultLocale = (_appConfig$brandConfi = appConfig.brandConfig.defaultLocale) !== null && _appConfig$brandConfi !== void 0 ? _appConfig$brandConfi : 'en-US';
  var customEntryUrl = _fsExtra["default"].readFileSync(_path["default"].join(__dirname, './templates/customEntryUrl.js')).toString();
  var loading = _fsExtra["default"].readFileSync(_path["default"].join(__dirname, 'templates/loading.html')).toString();
  var loadingSpring = _fsExtra["default"].readFileSync(_path["default"].join(__dirname, 'templates/loading-spring.html')).toString();
  var meta = _fsExtra["default"].readFileSync(_path["default"].join(__dirname, 'templates/meta.html')).toString();
  var isExtension = runtimeEnvironment === 'extension';
  var font = _fsExtra["default"].readFileSync(_path["default"].join(__dirname, isExtension ? 'templates/font-extension.html' : 'templates/font.html')).toString();
  var fontSpring = _fsExtra["default"].readFileSync(_path["default"].join(__dirname, isExtension ? 'templates/font-spring-extension.html' : 'templates/font-spring.html')).toString();
  var primaryColor = (0, _template["default"])(_fsExtra["default"].readFileSync(_path["default"].join(__dirname, 'templates/primary-color.html')).toString())({
    primaryColor: (0, _getPrimaryColor.getPrimaryColor)(appConfig.brandConfig).foreground
  });
  var preferredDevtool = function () {
    if (isExtension) return projectConfig.preferredDevtool || (
    // in development mode, use inline-source-map, content script not able to load .map file,
    // in production mode, use source-map for separate source map file adn upload to sentry
    mode === 'development' ? 'inline-source-map' : 'source-map');
    return projectConfig.preferredDevtool;
  }();
  var chunkLocale = function () {
    return isExtension ?
    // not chunk i18n files, because we need to load all i18n files in content script, and also chrome extension not need lazy load
    false : function (local) {
      return local !== defaultLocale;
    };
  }();
  var baseConfig = (0, _getBaseWebpackConfig.getBaseWebpackConfig)({
    mode: mode,
    useThreadLoader: true,
    themeFolder: projectConfig.themePath,
    supportedLocales: projectConfig.appConfig.brandConfig.supportedLocales,
    useDevtool: projectConfig.useDevtool,
    preferredDevtool: preferredDevtool,
    analyzeBundle: analyzeBundle,
    chunkLocale: chunkLocale,
    useStyleTransform: projectConfig.useStyleTransform,
    hashPrefix: projectConfig.appConfig.hashPrefix,
    env: args.buildEnv
  });
  var chunkInfoMap = new Map();
  var isProd = projectConfig.mode === 'production';
  // In MFE mode, exported files are typically split separately.
  var outputUsePropsMode = isProd || outputAlwaysUseProdFileName;
  var developmentConfig = (0, _webpackMerge.merge)(baseConfig, {
    entry: _objectSpread({}, projectConfig.mainEntries),
    output: {
      path: _path["default"].join(projectConfig.buildPath, projectConfig.appConfig.brandConfig.code),
      filename: DEFAULT_FILENAME,
      clean: true,
      publicPath: publicPath !== null && publicPath !== void 0 ? publicPath : 'auto'
    },
    plugins: [
    // TODO: use @babel/plugin-transform-react-jsx
    new _webpack.ProvidePlugin({
      React: 'react'
    })].concat(_toConsumableArray(((_projectConfig$assets = projectConfig.assetsEntries) === null || _projectConfig$assets === void 0 ? void 0 : _projectConfig$assets.length) ? [new _copyWebpackPlugin["default"]({
      patterns: projectConfig.assetsEntries
    })] : []), [new _webpack.DefinePlugin({
      // TODO: processDefaultDarkAndHighContactTheme
      'process.env.APP_CONFIG': JSON.stringify(appConfig),
      'process.env.THEME_SYSTEM': JSON.stringify(themeSystem),
      'process.env.BLOCK_PENDO_SOURCE_CODE': JSON.stringify(blockPendoSourceCode),
      'process.env.BLOCK_SEGMENT_SOURCE_CODE': JSON.stringify(blockSegmentSourceCode)
    })], _toConsumableArray(projectConfig.projectConfig.pages.filter(function (x) {
      return !!x.index;
    }).map(function (_ref3) {
      var index = _ref3.index,
        params = _ref3.params,
        main = _ref3.main;
      var mainChunk = _path["default"].parse(main).name;
      return new _htmlWebpackPlugin["default"](_objectSpread(_objectSpread({
        filename: _path["default"].basename(index),
        template: index,
        chunks: [mainChunk]
      }, params), {}, {
        templateParameters: function templateParameters(compilation, assets, assetTags, options) {
          var fileUrlMap = (0, _getFilenameMap.getFilenameMap)(compilation, chunkInfoMap);
          var getChunkUrl = function getChunkUrl(chunkName) {
            if (!outputUsePropsMode) return "".concat(chunkName, ".js");
            var url = fileUrlMap === null || fileUrlMap === void 0 ? void 0 : fileUrlMap.get(chunkName);
            if (!url) {
              throw new Error("chunk \"".concat(chunkName, "\" url not found"));
            }
            return nodeUrl.resolve(publicPath !== null && publicPath !== void 0 ? publicPath : '', url);
          };
          var workerScript = function workerScript() {
            var nameSpace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '__rc_shared_worker__';
            var chunkName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'worker';
            var queryString = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
            var workerUrl = "".concat(getChunkUrl(chunkName)).concat(queryString);
            var mfeConfig =
            // TODO: fix type
            //@ts-ignore
            projectConfig.appConfig.mfeConfig;
            return (0, _getLoadWorkerTemplate.getLoadWorkerTemplate)(nameSpace, workerUrl, chunkName, mfeConfig ? JSON.stringify(mfeConfig) : '');
          };
          var formattedBrandConfig = (0, _processI18n.processI18n)(projectConfig.appConfig.brandConfig, defaultLocale);
          var appName = formattedBrandConfig.appName;
          return _objectSpread({
            // #region default templateParameters
            compilation: compilation,
            webpackConfig: compilation.options,
            htmlWebpackPlugin: {
              tags: assetTags,
              files: assets,
              options: options
            },
            //#endregion
            appName: appName,
            meta: meta,
            font: font,
            fontSpring: fontSpring,
            primaryColor: primaryColor,
            loading: loading,
            loadingSpring: loadingSpring,
            getChunkUrl: getChunkUrl,
            workerScript: workerScript,
            themeInject: (0, _getThemeInjectTemplate.getThemeInjectTemplate)(appConfig.brandConfig.code),
            /**
             * support custom entry for we can test preview env in production env
             */
            customEntryUrl: "<script>".concat(customEntryUrl, "</script>"),
            inlineScriptsLoadFailDetect: _getScriptsLoadFailTemplate.getScriptsLoadFailTemplate
          }, _templateParameters);
        },
        minify: isProd ? {
          // https://github.com/kangax/html-minifier#options-quick-reference
          // default minify options with HTMLWebpackPlugin
          // https://github.com/jantimon/html-webpack-plugin#minification
          collapseWhitespace: true,
          keepClosingSlash: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
          // minify inline index.html css and scripts
          minifyCSS: true,
          minifyJS: true
        } : 'auto'
      }));
    })))
  });
  if (outputUsePropsMode) {
    var filenameMap = getFinalFilePathMap(projectConfig);
    var chunkFilenames = projectConfig.projectConfig.chunkFilenames;
    // MFE with module federation should not use splitChunks
    // issue: https://github.com/module-federation/module-federation-examples/issues/692
    var enabledAutoSplitChunks = projectConfig.projectConfig.disabledAutoSplitChunks !== true && args.env !== 'mfe';
    if (args.env === 'mfe' && projectConfig.projectConfig.disabledAutoSplitChunks === false) {
      throw new Error('MFE with module federation should not use splitChunks');
    }
    if (enabledAutoSplitChunks) {
      // find all pure entry files
      var pureEntryFiles = projectConfig.projectConfig.pages.filter(function (x) {
        return !x.index;
      }).map(function (x) {
        return _path["default"].basename(x.main).split('.')[0];
      });
      var chunks = function chunks(chunk) {
        var notBePureEntryFile = Boolean(chunk.name && !pureEntryFiles.includes(chunk.name));
        // only non pure entry files should be split
        return notBePureEntryFile;
      };
      var isString = typeof chunkFilenames === 'string';
      var vendorFilename = (isString ? chunkFilenames : chunkFilenames === null || chunkFilenames === void 0 ? void 0 : chunkFilenames[VENDOR_KEY]) || DEFAULT_CHUNK_FILENAME;

      // always optimize vendor and commons chunk to separate file into small size
      // otherwise, the main chunk will be too large to host on CDN
      developmentConfig.optimization = {
        splitChunks: {
          chunks: chunks,
          filename: vendorFilename,
          // Ensure hash is included
          minSize: 1000000,
          // 1MB
          maxSize: 9000000,
          /**
           * https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ServingCompressedFiles.html
           *
           * Size of objects that CloudFront compresses
           * CloudFront compresses objects that are between 1,000 bytes and 10,000,000 bytes in size.
           */
          enforceSizeThreshold: 9000000,
          // for safely
          cacheGroups: {
            vendor: {
              // import file path containing node_modules
              test: /[\\/]node_modules[\\/]/,
              filename: "modules-".concat(vendorFilename),
              // Ensure hash is included
              reuseExistingChunk: true
            },
            commons: {
              // import file path containing ringcentral-js-widgets
              test: /[\\/]ringcentral-js-widgets[\\/]/,
              filename: "commons-".concat(vendorFilename),
              // Ensure hash is included
              reuseExistingChunk: true
            }
          }
        }
      };
    }
    return (0, _webpackMerge.merge)(developmentConfig, {
      output: {
        filename: function filename(pathData) {
          var _pathData$chunk;
          var chunkName = pathData === null || pathData === void 0 ? void 0 : (_pathData$chunk = pathData.chunk) === null || _pathData$chunk === void 0 ? void 0 : _pathData$chunk.name;
          if (chunkName && filenameMap[chunkName]) {
            return filenameMap[chunkName];
          }
          return DEFAULT_FILENAME;
        },
        chunkFilename: function chunkFilename(pathData, assetInfo) {
          var _pathData$chunk2;
          var isString = typeof chunkFilenames === 'string';
          if (isString) return chunkFilenames;
          var chunkName = (_pathData$chunk2 = pathData.chunk) === null || _pathData$chunk2 === void 0 ? void 0 : _pathData$chunk2.name;
          if (!chunkName) return DEFAULT_CHUNK_FILENAME;
          if (assetInfo) {
            chunkInfoMap.set(chunkName, assetInfo);
          }
          return (chunkFilenames === null || chunkFilenames === void 0 ? void 0 : chunkFilenames[chunkName]) || DEFAULT_CHUNK_FILENAME;
        }
      }
    });
  }
  return developmentConfig;
};
//# sourceMappingURL=getBaseWebpackConfig.js.map
