"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeXlf = writeXlf;
exports["default"] = exportLocale;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _ramda = require("ramda");

var _compileLocaleData = _interopRequireDefault(require("../compileLocaleData"));

var _defaultConfig = _interopRequireDefault(require("../defaultConfig"));

var _generateXlfData = _interopRequireDefault(require("../generateXlfData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function writeXlf(_ref) {
  var localizationFolder = _ref.localizationFolder,
      xlfData = _ref.xlfData;

  _fsExtra["default"].ensureDirSync(localizationFolder);

  (0, _ramda.forEach)(function (locale) {
    var fileName = _path["default"].resolve(localizationFolder, "".concat(locale, ".xlf"));

    _fsExtra["default"].writeFileSync(fileName, xlfData[locale]);
  }, Object.keys(xlfData));
}

function exportLocale() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$sourceFolder = _ref2.sourceFolder,
      sourceFolder = _ref2$sourceFolder === void 0 ? _defaultConfig["default"].sourceFolder : _ref2$sourceFolder,
      _ref2$localizationFol = _ref2.localizationFolder,
      localizationFolder = _ref2$localizationFol === void 0 ? _defaultConfig["default"].localizationFolder : _ref2$localizationFol,
      _ref2$sourceLocale = _ref2.sourceLocale,
      sourceLocale = _ref2$sourceLocale === void 0 ? _defaultConfig["default"].sourceLocale : _ref2$sourceLocale,
      supportedLocales = _ref2.supportedLocales,
      _ref2$exportType = _ref2.exportType,
      exportType = _ref2$exportType === void 0 ? 'diff' : _ref2$exportType,
      _ref2$fillEmptyWithSo = _ref2.fillEmptyWithSource,
      fillEmptyWithSource = _ref2$fillEmptyWithSo === void 0 ? true : _ref2$fillEmptyWithSo;

  if (!supportedLocales) {
    throw new Error('options.supportedLocales is missing');
  }

  var localeData = (0, _compileLocaleData["default"])({
    sourceFolder: sourceFolder,
    sourceLocale: sourceLocale,
    supportedLocales: supportedLocales
  });
  var xlfData = (0, _generateXlfData["default"])({
    localeData: localeData,
    sourceFolder: sourceFolder,
    sourceLocale: sourceLocale,
    supportedLocales: supportedLocales,
    exportType: exportType,
    fillEmptyWithSource: fillEmptyWithSource
  });
  writeXlf({
    xlfData: xlfData,
    localizationFolder: localizationFolder
  });
}
//# sourceMappingURL=index.js.map
