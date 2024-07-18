"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compileData = compileData;
exports["default"] = compileLocaleData;
exports.findLocaleFiles = findLocaleFiles;
var _formatLocale = _interopRequireDefault(require("@ringcentral-integration/i18n/lib/formatLocale"));
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _path = _interopRequireDefault(require("path"));
var _ramda = require("ramda");
var _findLoaderFiles = _interopRequireDefault(require("../findLoaderFiles"));
var _isLocaleFile = _interopRequireDefault(require("../isLocaleFile"));
var _parseLocaleFile = _interopRequireDefault(require("../parseLocaleFile"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function findLocaleFiles(folderPath) {
  return (0, _ramda.filter)(_isLocaleFile["default"], _fsExtra["default"].readdirSync(folderPath));
}
function compileData(_ref) {
  var folderPath = _ref.folderPath,
    sourceLocale = _ref.sourceLocale,
    translationLocales = _ref.translationLocales;
  return (0, _ramda.reduce)(function (data, file) {
    var locale = (0, _formatLocale["default"])(file.replace(/\.(js|ts|json)$/i, ''));
    if (locale === sourceLocale || translationLocales.indexOf(locale) > -1) {
      var rawContent = _fsExtra["default"].readFileSync(_path["default"].resolve(folderPath, file), 'utf8');
      data.files[locale] = _objectSpread({
        file: file,
        locale: locale,
        rawContent: rawContent
      }, (0, _parseLocaleFile["default"])(rawContent));
    }
    return data;
  }, {
    path: folderPath,
    files: {}
  }, findLocaleFiles(folderPath));
}
function compileLocaleData(_ref2) {
  var sourceFolder = _ref2.sourceFolder,
    sourceLocale = _ref2.sourceLocale,
    translationLocales = _ref2.translationLocales;
  return (0, _ramda.reduce)(function (data, file) {
    var folderPath = _path["default"].resolve(_path["default"].dirname(file));
    data[folderPath] = compileData({
      folderPath: folderPath,
      sourceLocale: sourceLocale,
      translationLocales: translationLocales
    });
    return data;
  }, {}, (0, _findLoaderFiles["default"])(sourceFolder));
}
//# sourceMappingURL=index.js.map
