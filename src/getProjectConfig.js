"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBrands = void 0;
exports.getBuildEnv = getBuildEnv;
exports.getRawProjectConfig = exports.getProjectConfig = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.includes.js");
var _getArgs3 = require("@ringcentral-integration/next-integration/lib/getArgs");
var _cliTable = _interopRequireDefault(require("cli-table"));
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _os = _interopRequireDefault(require("os"));
var _path = _interopRequireDefault(require("path"));
var _excluded = ["brand"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } /* eslint-disable no-console */ /* eslint-disable @typescript-eslint/no-var-requires */
var defaultMode = 'development';
var defaultPort = 8080;
var _getArgs = (0, _getArgs3.getArgs)(),
  ci = _getArgs.ci,
  buildEnv = _getArgs.buildEnv,
  _getArgs$brand = _slicedToArray(_getArgs.brand, 1),
  brand = _getArgs$brand[0],
  pages = _getArgs.pages,
  excludePages = _getArgs.excludePages;
var getRawProjectConfig = exports.getRawProjectConfig = function getRawProjectConfig() {
  var rootPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.cwd();
  var projectConfigPath = _path["default"].resolve(rootPath, './project.config.json');
  var projectConfigFileSchema = _fsExtra["default"].readJSONSync(projectConfigPath);
  return projectConfigFileSchema;
};
var getBrands = exports.getBrands = function getBrands(env) {
  var projectConfig = getRawProjectConfig();
  var environmentConfig = projectConfig.environment[env];
  if (!environmentConfig) {
    throw new Error("There is no config with \"".concat(env, "\" environment"));
  }
  return environmentConfig.brand.map(function (brand) {
    return Array.isArray(brand) ? brand[0] : brand;
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
var defaultPrint = function defaultPrint(projectConfig) {
  var _projectConfig$useDev, _projectConfig$prefer, _mfeConfig;
  var _getArgs2 = (0, _getArgs3.getArgs)(),
    ci = _getArgs2.ci,
    buildHash = _getArgs2.buildHash,
    tag = _getArgs2.tag,
    brand = _getArgs2.brand,
    buildEnv = _getArgs2.buildEnv,
    appMode = _getArgs2.appMode;
  var table = new _cliTable["default"]({
    head: ['Config', 'Value', 'Type']
  });
  table.push(['Build Environment', "".concat(buildEnv), "string (optional, default: 'dev')"], ['Brand', "".concat(brand), "string (optional, default: 'rc')"], ['CI', "".concat(ci), 'boolean (optional, default: false)'], ['Build Hash', "".concat(buildHash), "string (optional, default: '')"], ['Tag', "".concat(tag), "string (optional, default: '')"], ['Build Mode', "".concat(projectConfig.mode), "'development' | 'production'"], ['App Mode', "".concat(appMode), "string (optional)"], ['Use Devtool', "".concat((_projectConfig$useDev = projectConfig.useDevtool) !== null && _projectConfig$useDev !== void 0 ? _projectConfig$useDev : ''), "boolean (optional, default: false)"], ['Preferred Devtool', "".concat((_projectConfig$prefer = projectConfig.preferredDevtool) !== null && _projectConfig$prefer !== void 0 ? _projectConfig$prefer : ''), "string (optional)"], ['MFE Config', "".concat((0, _getArgs3.getArgs)().env === 'mfe' ? JSON.stringify((_mfeConfig = projectConfig.appConfig.mfeConfig) !== null && _mfeConfig !== void 0 ? _mfeConfig : '', null, 2) : ''), "object (default: '')"], ['Entries', "".concat(Object.keys(projectConfig.mainEntries).join(_os["default"].EOL)), ""]);
  console.log("".concat(_os["default"].EOL).concat(table.toString()).concat(_os["default"].EOL));
};

/**
 * get project configuration from project.config.json
 * @param rootPath folder root path
 * @param print print function for custom print
 * @returns
 */
var getProjectConfig = exports.getProjectConfig = function getProjectConfig() {
  var _projectConfigFileSch, _projectConfigFileSch2, _projectConfigFileSch3, _projectConfigFileSch4, _projectConfigFileSch5;
  var rootPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.cwd();
  var print = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultPrint;
  var projectConfigFileSchema = getRawProjectConfig(rootPath);
  var appConfigPath = _path["default"].resolve(rootPath, (_projectConfigFileSch = projectConfigFileSchema.appConfigPath) !== null && _projectConfigFileSch !== void 0 ? _projectConfigFileSch : './config');
  var appConfig = require(appConfigPath).appConfig;
  if (!appConfig) {
    throw new Error("appConfig is not defined in ".concat(appConfigPath));
  }
  var environment = getBuildEnv(projectConfigFileSchema);
  var _environment = environment[buildEnv],
    brands = _environment.brand,
    config = _objectWithoutProperties(_environment, _excluded);
  var envConfig = brands.map(function (item) {
    var _ref;
    return _objectSpread(_objectSpread(_objectSpread({
      brand: Array.isArray(item) ? item[0] : item
    }, config), Array.isArray(item) ? item[1] : {}), {}, {
      mode: (_ref = Array.isArray(item) ? item[1].mode : config.mode) !== null && _ref !== void 0 ? _ref : defaultMode
    });
  }).filter(function (item) {
    return item.brand === brand;
  })[0];
  if (!envConfig) {
    throw new Error("brand '".concat(brand, "' is not defined in env '").concat(buildEnv, "'"));
  }
  var _envConfig$mode = envConfig.mode,
    mode = _envConfig$mode === void 0 ? defaultMode : _envConfig$mode;
  var assetsEntries = (_projectConfigFileSch2 = projectConfigFileSchema.assets) === null || _projectConfigFileSch2 === void 0 ? void 0 : _projectConfigFileSch2.map(function (asset) {
    if (typeof asset === 'string') {
      var _fromPath = _path["default"].join(rootPath, asset);
      return {
        from: _fromPath,
        to: _path["default"].relative(_path["default"].join(rootPath, 'src'), _fromPath)
      };
    }
    var fromPath = _path["default"].join(rootPath, asset.from);
    return {
      from: fromPath,
      to: asset.to
    };
  });
  (_projectConfigFileSch3 = projectConfigFileSchema.pages).push.apply(_projectConfigFileSch3, _toConsumableArray(projectConfigFileSchema.includeUpgradePage ? [{
    main: _path["default"].join(__dirname, 'templates/upgrade/upgrade.ts'),
    index: _path["default"].join(__dirname, 'templates/upgrade/upgrade.html')
  }] : []).concat(_toConsumableArray(projectConfigFileSchema.includeHiddenDownloadPage ? [{
    main: _path["default"].join(__dirname, 'templates/hidden-download/hidden-download.ts'),
    index: _path["default"].join(__dirname, 'templates/hidden-download/hidden-download.html')
  }] : [])));

  // when pages is set, only include the pages in the list
  if (pages && pages.length > 0) {
    var originalPages = projectConfigFileSchema.pages;
    projectConfigFileSchema.pages = originalPages.filter(function (page) {
      return pages.includes(_path["default"].parse(page.main).name);
    });
    if (projectConfigFileSchema.pages.length !== pages.length) {
      console.log("\nSome pages not found in project.config.json:\nyour input page: ".concat(pages.join(', '), "\n\npages list: ").concat(originalPages.map(function (page) {
        return _path["default"].parse(page.main).name;
      }).join(', '), "\n"));
      process.exit(1);
    }
  }
  if (excludePages && excludePages.length > 0) {
    projectConfigFileSchema.pages = projectConfigFileSchema.pages.filter(function (page) {
      return !excludePages.includes(_path["default"].parse(page.main).name);
    });
  }
  var mainEntries = projectConfigFileSchema.pages.reduce(function (acc, curr) {
    var entryName = _path["default"].basename(curr.main).split('.').slice(0, -1).join('.');
    acc[entryName] = _path["default"].resolve(rootPath, curr.main);
    return acc;
  }, {});
  var distPath = projectConfigFileSchema.distPath ? _path["default"].resolve(rootPath, projectConfigFileSchema.distPath) : undefined;
  var buildPath = _path["default"].resolve(rootPath, projectConfigFileSchema.buildPath);
  var themePath = _path["default"].resolve(rootPath, (_projectConfigFileSch4 = projectConfigFileSchema.themePath) !== null && _projectConfigFileSch4 !== void 0 ? _projectConfigFileSch4 : '.');
  var projectConfig = {
    env: buildEnv,
    brand: brand,
    projectConfig: projectConfigFileSchema,
    assetsEntries: assetsEntries,
    mainEntries: mainEntries,
    distPath: distPath,
    buildPath: buildPath,
    appConfig: appConfig,
    mode: ci ? defaultMode : mode,
    devServerPort: (_projectConfigFileSch5 = projectConfigFileSchema.devServerPort) !== null && _projectConfigFileSch5 !== void 0 ? _projectConfigFileSch5 : defaultPort,
    rootPath: rootPath,
    themePath: themePath,
    preferredDevtool: envConfig.preferredDevtool,
    useDevtool: envConfig.useDevtool,
    useStyleTransform: envConfig.useStyleTransform,
    runtimeEnvironment: projectConfigFileSchema.runtimeEnvironment,
    themeSystem: projectConfigFileSchema.themeSystem
  };
  if (print) {
    print(projectConfig);
  }
  return projectConfig;
};
function getBuildEnv(projectConfigFileSchema) {
  var _projectConfigFileSch6;
  var environment = (_projectConfigFileSch6 = projectConfigFileSchema.environment) !== null && _projectConfigFileSch6 !== void 0 ? _projectConfigFileSch6 : {};
  if (!environment[buildEnv]) {
    throw new Error("env '".concat(buildEnv, "' is not defined in environment '").concat(JSON.stringify(environment, null, 2), "'"));
  }
  return environment;
}
//# sourceMappingURL=getProjectConfig.js.map
