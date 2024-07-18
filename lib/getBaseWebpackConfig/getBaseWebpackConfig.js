"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.slice");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBaseWebpackConfig = void 0;
var _autoprefixer = _interopRequireDefault(require("autoprefixer"));
var _crypto = _interopRequireDefault(require("crypto"));
var _path = _interopRequireDefault(require("path"));
var _threadLoader = require("thread-loader");
var _webpack = require("webpack");
var _webpackBundleAnalyzer = require("webpack-bundle-analyzer");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function hash(input) {
  return _crypto["default"].createHash('sha256').update(input).digest('hex').slice(0, 20);
}
var getBaseWebpackConfig = function getBaseWebpackConfig(_ref) {
  var _ref$analyzeBundle = _ref.analyzeBundle,
    analyzeBundle = _ref$analyzeBundle === void 0 ? false : _ref$analyzeBundle,
    _ref$inlineFont = _ref.inlineFont,
    inlineFont = _ref$inlineFont === void 0 ? false : _ref$inlineFont,
    _ref$enableHash = _ref.enableHash,
    enableHash = _ref$enableHash === void 0 ? true : _ref$enableHash,
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
    babelLoaderExcludes = _ref$babelLoaderExclu === void 0 ? /node_modules/ : _ref$babelLoaderExclu,
    _ref$chunkLocale = _ref.chunkLocale,
    chunkLocale = _ref$chunkLocale === void 0 ? true : _ref$chunkLocale,
    _ref$useStyleTransfor = _ref.useStyleTransform,
    useStyleTransform = _ref$useStyleTransfor === void 0 ? false : _ref$useStyleTransfor;
  var devtool = useDevtool ? preferredDevtool : false;
  var threadLoader = [];
  // set process.env.NODE_ENV to mode to make sure the same as webpack mode
  process.env.NODE_ENV = mode;
  if (useThreadLoader) {
    (0, _threadLoader.warmup)(threadLoaderOptions, ['postcss-loader', 'sass-loader', 'source-map-loader', 'babel-loader', 'style-loader', 'css-loader', 'react-svg-loader'
    // TODO: locale-loader not able to use thread-loader
    // '@ringcentral-integration/locale-loader',
    ]);
    threadLoader.push({
      loader: 'thread-loader',
      options: threadLoaderOptions
    });
  }
  var plugins = [new _webpack.ProvidePlugin({
    process: 'process/browser.js',
    Buffer: ['buffer', 'Buffer'],
    setImmediate: ['setimmediate', 'setImmedate'],
    clearImmediate: ['setimmediate', 'clearImmedate']
  }), new _webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(mode)
  })];
  if (analyzeBundle) {
    // eslint-disable-next-line no-console
    console.log('Analyze bundle will be open after completed...');
    plugins.push(new _webpackBundleAnalyzer.BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: true
    }));
  }
  var rules = [{
    test: /\.m?js/,
    resolve: {
      fullySpecified: false
    }
  },
  // material-ui v4.0 issue:
  // Multiple modules with names that only differ in casing in Popper module.
  // https://github.com/mui-org/material-ui/issues/14711
  {
    test: /node_modules\/@material-ui\/core\/esm\/Popper\/Popper\.js$/,
    use: {
      loader: 'string-replace-loader',
      options: {
        search: "import PopperJS from 'popper.js';",
        replace: 'import PopperJS from "../../../../popper.js/dist/esm/popper";'
      }
    }
  },
  // some setImmediate ployfill issue
  // https://github.com/Stuk/jszip/issues/909
  {
    test: /node_modules\/jszip\/dist\/jszip\.min\.js$/,
    use: {
      loader: 'string-replace-loader',
      options: {
        search: '{setImmediate(',
        replace: '{window.setImmediate('
      }
    }
  },
  // Some setTimeout issue in SIP.js v0.13.5:
  // https://github.com/onsip/SIP.js/issues/1071
  {
    test: /node_modules\/sip.js\/lib\/RegisterContext\.js$/,
    use: {
      loader: 'string-replace-loader',
      options: {
        search: '_this.registrationTimer = setTimeout',
        replace: '_this.registrationTimer = (globalThis.externalSetTimeout || setTimeout)'
      }
    }
  }, {
    test: /node_modules\/sip.js\/lib\/RegisterContext\.js$/,
    use: {
      loader: 'string-replace-loader',
      options: {
        search: 'clearTimeout(_this.registrationTimer)',
        replace: '(globalThis.externalClearTimeout || clearTimeout)(_this.registrationTimer)'
      }
    }
  }, {
    test: /node_modules\/sip.js\/lib\/RegisterContext\.js$/,
    use: {
      loader: 'string-replace-loader',
      options: {
        search: '_this.registrationExpiredTimer = setTimeout',
        replace: '_this.registrationExpiredTimer = (globalThis.externalSetTimeout || setTimeout)'
      }
    }
  }, {
    test: /node_modules\/sip.js\/lib\/RegisterContext\.js$/,
    use: {
      loader: 'string-replace-loader',
      options: {
        search: 'clearTimeout(_this.registrationExpiredTimer)',
        replace: '(globalThis.externalClearTimeout || clearTimeout)(_this.registrationExpiredTimer)'
      }
    }
  }];

  // source-map-loader
  if (useDevtool) {
    rules.push({
      enforce: 'pre',
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: sourceMapLoaderExcludes,
      use: [].concat(threadLoader, ['source-map-loader'])
    });
  }
  // babel-loader
  rules.push({
    test: /\.(js|jsx|ts|tsx)$/,
    use: [
    // TODO: locale-loader not able to use thread-loader
    // ...threadLoader,
    {
      loader: 'babel-loader',
      options: {
        // in production mode, not use cache
        cacheDirectory: mode !== 'production'
      }
    }, {
      loader: '@ringcentral-integration/locale-loader',
      options: {
        supportedLocales: supportedLocales,
        chunk: chunkLocale
      }
    }].concat(threadLoader),
    exclude: babelLoaderExcludes
  });
  var styleLoaderOptions = useStyleTransform ? {
    injectType: 'styleTag',
    insert: function insert(element) {
      if (!globalThis.window) return;
      document.head.appendChild(element);
    }
  } : {};
  var globalTest = /(\.global)\.(sass|scss)/;
  // css
  rules.push({
    test: /\.css$/i,
    use: [].concat(threadLoader, [{
      loader: 'style-loader',
      options: styleLoaderOptions
    }, 'css-loader'])
  });

  // sass & scss
  rules.push({
    test: /\.sass|\.scss/,
    exclude: globalTest,
    use: [].concat(threadLoader, [{
      loader: 'style-loader',
      options: styleLoaderOptions
    }, {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: "".concat(hashPrefix, "_[path]_[name]_[local]_[hash:base64:5]")
        }
      }
    }, {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: function plugins() {
            return [_autoprefixer["default"]];
          }
        }
      }
    }, {
      loader: 'sass-loader',
      options: {
        sassOptions: {
          includePaths: [themeFolder, _path["default"].resolve(process.cwd(), 'node_modules'), _path["default"].resolve(process.cwd(), '../../node_modules')],
          outputStyle: 'expanded'
        }
      }
    }])
  });

  // use global should not have any css module with localIdentName
  // global sass & scss
  rules.push({
    test: globalTest,
    use: [].concat(threadLoader, [{
      loader: 'style-loader',
      options: styleLoaderOptions
    }, {
      loader: 'css-loader'
    }, {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: function plugins() {
            return [_autoprefixer["default"]];
          }
        }
      }
    }, {
      loader: 'sass-loader',
      options: {
        sassOptions: {
          includePaths: [themeFolder, _path["default"].resolve(process.cwd(), 'node_modules'), _path["default"].resolve(process.cwd(), '../../node_modules')],
          outputStyle: 'expanded'
        }
      }
    }])
  });

  // audio
  rules.push({
    test: /\.ogg$|\.wav$|\.mp3$/,
    resourceQuery: {
      not: [/url|raw/]
    },
    type: 'asset/resource',
    generator: {
      filename: "audio/[name]".concat(enableHash ? '_[hash]' : '', "[ext]")
    }
  });

  // images and svg font
  rules.push({
    test: /\.png|\.jpg|\.gif|fonts(\/|\\).*\.svg/,
    resourceQuery: {
      not: [/url|raw/]
    },
    type: 'asset/resource',
    generator: {
      filename: "images/[name]".concat(enableHash ? '_[hash]' : '', "[ext]")
    }
  });

  // svg
  rules.push({
    test: /\.svg$/,
    resourceQuery: {
      not: [/url|raw/]
    },
    exclude: /fonts/,
    use: function use(_ref2) {
      var resource = _ref2.resource;
      return [].concat(threadLoader, ['babel-loader', {
        loader: 'react-svg-loader',
        options: {
          jsx: true,
          svgo: {
            plugins: [{
              removeViewBox: false
            }].concat(_toConsumableArray(prefixSvgId ? [{
              cleanupIDs: {
                prefix: "".concat(hash(_path["default"].basename(resource, '.svg')), "-")
              }
            }] : []))
          }
        }
      }]);
    }
  });
  if (inlineFont) {
    // font
    rules.push({
      test: /\.woff|\.woff2|.eot|\.ttf/,
      type: 'asset/inline'
    });
  } else {
    // font
    rules.push({
      test: /\.woff|\.woff2|.eot|\.ttf/,
      resourceQuery: {
        not: [/url|raw/]
      },
      type: 'asset/resource',
      generator: {
        filename: "fonts/[name]".concat(enableHash ? '_[hash]' : '', "[ext]")
      }
    });
  }
  rules.push(
  // https://webpack.js.org/guides/asset-modules/#replacing-inline-loader-syntax
  {
    resourceQuery: /raw/,
    type: 'asset/source'
  }, {
    resourceQuery: /url/,
    type: 'asset/inline'
  });
  return {
    mode: mode,
    devtool: devtool,
    plugins: plugins,
    resolve: {
      // webpack < 5 used to include polyfills for node.js core modules by default.
      // This is no longer the case. Verify if you need this module and configure a polyfill for it.
      //
      // more doc: https://webpack.js.org/configuration/resolve/#resolvefallback
      //
      fallback: {
        // * ringcentral cdk need
        vm: require.resolve('vm-browserify'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        events: require.resolve('events'),
        // * react-markdown need that polyfill, can be remove after we not need
        path: require.resolve('path-browserify')
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
      rules: rules
    }
  };
};
exports.getBaseWebpackConfig = getBaseWebpackConfig;
//# sourceMappingURL=getBaseWebpackConfig.js.map
