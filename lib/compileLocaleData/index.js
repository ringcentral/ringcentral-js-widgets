"use strict";

require("core-js/modules/es6.array.reduce");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findLocaleFiles = findLocaleFiles;
exports.compileData = compileData;
exports["default"] = compileLocaleData;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.regexp.replace");

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _ramda = require("ramda");

var _formatLocale = _interopRequireDefault(require("@ringcentral-integration/i18n/lib/formatLocale"));

var _isLocaleFile = _interopRequireDefault(require("../isLocaleFile"));

var _findLoaderFiles = _interopRequireDefault(require("../findLoaderFiles"));

var _parseLocaleFile = _interopRequireDefault(require("../parseLocaleFile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function findLocaleFiles(folderPath) {
  return (0, _ramda.filter)(_isLocaleFile["default"], _fsExtra["default"].readdirSync(folderPath));
}

function compileData(_ref) {
  var folderPath = _ref.folderPath,
      sourceLocale = _ref.sourceLocale,
      supportedLocales = _ref.supportedLocales;
  return (0, _ramda.reduce)(function (data, file) {
    var locale = (0, _formatLocale["default"])(file.replace(/\.(js|ts|json)$/i, ''));

    if (locale === sourceLocale || supportedLocales.indexOf(locale) > -1) {
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
      supportedLocales = _ref2.supportedLocales;
  return (0, _ramda.reduce)(function (data, file) {
    var folderPath = _path["default"].resolve(_path["default"].dirname(file));

    data[folderPath] = compileData({
      folderPath: folderPath,
      sourceLocale: sourceLocale,
      supportedLocales: supportedLocales
    });
    return data;
  }, {}, (0, _findLoaderFiles["default"])(sourceFolder));
}
//# sourceMappingURL=index.js.map
