'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.writeXlf = writeXlf;
exports.default = exportLocale;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ramda = require('ramda');

var _compileLocaleData = require('../compileLocaleData');

var _compileLocaleData2 = _interopRequireDefault(_compileLocaleData);

var _defaultConfig = require('../defaultConfig');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

var _generateXlfData = require('../generateXlfData');

var _generateXlfData2 = _interopRequireDefault(_generateXlfData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function writeXlf(_ref) {
  var localizationFolder = _ref.localizationFolder,
      xlfData = _ref.xlfData;

  _fsExtra2.default.ensureDirSync(localizationFolder);
  (0, _ramda.forEach)(function (locale) {
    var fileName = _path2.default.resolve(localizationFolder, locale + '.xlf');
    _fsExtra2.default.writeFileSync(fileName, xlfData[locale]);
  }, (0, _keys2.default)(xlfData));
}

function exportLocale() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$sourceFolder = _ref2.sourceFolder,
      sourceFolder = _ref2$sourceFolder === undefined ? _defaultConfig2.default.sourceFolder : _ref2$sourceFolder,
      _ref2$localizationFol = _ref2.localizationFolder,
      localizationFolder = _ref2$localizationFol === undefined ? _defaultConfig2.default.localizationFolder : _ref2$localizationFol,
      _ref2$sourceLocale = _ref2.sourceLocale,
      sourceLocale = _ref2$sourceLocale === undefined ? _defaultConfig2.default.sourceLocale : _ref2$sourceLocale,
      supportedLocales = _ref2.supportedLocales,
      _ref2$exportType = _ref2.exportType,
      exportType = _ref2$exportType === undefined ? 'diff' : _ref2$exportType;

  if (!supportedLocales) {
    throw new Error('options.supportedLocales is missing');
  }
  var localeData = (0, _compileLocaleData2.default)({
    sourceFolder: sourceFolder,
    sourceLocale: sourceLocale,
    supportedLocales: supportedLocales
  });
  var xlfData = (0, _generateXlfData2.default)({
    localeData: localeData,
    sourceFolder: sourceFolder,
    sourceLocale: sourceLocale,
    supportedLocales: supportedLocales,
    exportType: exportType
  });
  writeXlf({
    xlfData: xlfData,
    localizationFolder: localizationFolder
  });
}
//# sourceMappingURL=index.js.map
