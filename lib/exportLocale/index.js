"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exportLocale;
exports.writeData = writeData;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _ramda = require("ramda");

var _compileLocaleData = _interopRequireDefault(require("../compileLocaleData"));

var _defaultConfig = _interopRequireDefault(require("../defaultConfig"));

var _generateData = require("../generateData");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function writeData(_ref) {
  var localizationFolder = _ref.localizationFolder,
      data = _ref.data,
      ext = _ref.ext;

  _fsExtra["default"].ensureDirSync(localizationFolder);

  (0, _ramda.forEach)(function (locale) {
    var fileName = _path["default"].resolve(localizationFolder, "".concat(locale, ".").concat(ext));

    _fsExtra["default"].writeFileSync(fileName, ext === 'json' ? JSON.stringify(data[locale], null, 2) : data[locale]);
  }, Object.keys(data));
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
      _ref2$translationLoca = _ref2.translationLocales,
      translationLocales = _ref2$translationLoca === void 0 ? supportedLocales : _ref2$translationLoca,
      _ref2$exportType = _ref2.exportType,
      exportType = _ref2$exportType === void 0 ? 'diff' : _ref2$exportType,
      _ref2$fillEmptyWithSo = _ref2.fillEmptyWithSource,
      fillEmptyWithSource = _ref2$fillEmptyWithSo === void 0 ? true : _ref2$fillEmptyWithSo,
      _ref2$json = _ref2.json,
      json = _ref2$json === void 0 ? false : _ref2$json,
      _ref2$writeFile = _ref2.writeFile,
      writeFile = _ref2$writeFile === void 0 ? true : _ref2$writeFile;

  if (!supportedLocales) {
    throw new Error('options.supportedLocales is missing');
  }

  var localeData = (0, _compileLocaleData["default"])({
    sourceFolder: sourceFolder,
    sourceLocale: sourceLocale,
    translationLocales: translationLocales
  });
  var data = json ? (0, _generateData.generateJsonData)({
    localeData: localeData,
    sourceFolder: sourceFolder,
    sourceLocale: sourceLocale,
    translationLocales: translationLocales
  }) : (0, _generateData.generateXlfData)({
    localeData: localeData,
    sourceFolder: sourceFolder,
    sourceLocale: sourceLocale,
    translationLocales: translationLocales,
    exportType: exportType,
    fillEmptyWithSource: fillEmptyWithSource
  });

  if (writeFile) {
    return writeData({
      data: data,
      localizationFolder: localizationFolder,
      ext: json ? 'json' : 'xlf'
    });
  }

  return data;
}
//# sourceMappingURL=index.js.map
