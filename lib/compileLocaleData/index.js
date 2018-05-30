'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.findLocaleFiles = findLocaleFiles;
exports.compileData = compileData;
exports.default = compileLocaleData;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ramda = require('ramda');

var _formatLocale = require('@ringcentral-integration/i18n/lib/formatLocale');

var _formatLocale2 = _interopRequireDefault(_formatLocale);

var _isLocaleFile = require('../isLocaleFile');

var _isLocaleFile2 = _interopRequireDefault(_isLocaleFile);

var _findLoaderFiles = require('../findLoaderFiles');

var _findLoaderFiles2 = _interopRequireDefault(_findLoaderFiles);

var _parseLocaleFile = require('../parseLocaleFile');

var _parseLocaleFile2 = _interopRequireDefault(_parseLocaleFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findLocaleFiles(folderPath) {
  return (0, _ramda.filter)(_isLocaleFile2.default, _fsExtra2.default.readdirSync(folderPath));
}

function compileData(_ref) {
  var folderPath = _ref.folderPath,
      sourceLocale = _ref.sourceLocale,
      supportedLocales = _ref.supportedLocales;

  return (0, _ramda.reduce)(function (data, file) {
    var locale = (0, _formatLocale2.default)(file.replace(/\.(js|json)$/i, ''));
    if (locale === sourceLocale || supportedLocales.indexOf(locale) > -1) {
      var rawContent = _fsExtra2.default.readFileSync(_path2.default.resolve(folderPath, file), 'utf8');
      data.files[locale] = (0, _extends3.default)({
        file: file,
        locale: locale,
        rawContent: rawContent
      }, (0, _parseLocaleFile2.default)(rawContent));
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
    var folderPath = _path2.default.resolve(_path2.default.dirname(file));
    data[folderPath] = compileData({
      folderPath: folderPath,
      sourceLocale: sourceLocale,
      supportedLocales: supportedLocales
    });
    return data;
  }, {}, (0, _findLoaderFiles2.default)(sourceFolder));
}
//# sourceMappingURL=index.js.map
