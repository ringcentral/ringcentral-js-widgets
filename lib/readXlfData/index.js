'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = readXlfData;

var _xmlJs = require('xml-js');

var _xmlJs2 = _interopRequireDefault(_xmlJs);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function extractKey(str) {
  return str.substring(1, str.length - 1);
}

function extractXlfData(_ref) {
  var locale = _ref.locale,
      content = _ref.content;

  var data = _xmlJs2.default.xml2js(content, { compact: true });
  if (data.xliff && data.xliff.file) {
    var files = Array.isArray(data.xliff.file) ? data.xliff.file : [data.xliff.file];
    return (0, _ramda.reduce)(function (output, fileData) {
      if (fileData._attributes && fileData._attributes['target-language'] === locale && fileData.body && fileData.body['trans-unit']) {
        var fileName = fileData._attributes.original;

        var units = Array.isArray(fileData.body['trans-unit']) ? fileData.body['trans-unit'] : [fileData.body['trans-unit']];
        output[fileName] = (0, _ramda.reduce)(function (fileOutput, unit) {
          if (unit._attributes && unit._attributes.id && unit.target && unit.target._text) {
            fileOutput[extractKey(unit._attributes.id)] = {
              value: unit.target._text,
              source: unit.source._text
            };
          }
          return fileOutput;
        }, {}, units);
      }
      return output;
    }, {}, files);
  }
  return {};
}

function readXlfData(_ref2) {
  var localizationFolder = _ref2.localizationFolder,
      supportedLocales = _ref2.supportedLocales;

  return (0, _ramda.reduce)(function (data, locale) {
    var fileName = locale + '.xlf';
    var filePath = _path2.default.resolve(localizationFolder, fileName);
    if (_fsExtra2.default.existsSync(filePath) && _fsExtra2.default.statSync(filePath).isFile()) {
      var content = _fsExtra2.default.readFileSync(filePath, 'utf8');
      data[locale] = extractXlfData({ locale: locale, content: content });
    }
    return data;
  }, {}, supportedLocales);
}
//# sourceMappingURL=index.js.map
