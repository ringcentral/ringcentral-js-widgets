'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = generateXlfData;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _xmlJs = require('xml-js');

var _xmlJs2 = _interopRequireDefault(_xmlJs);

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateBaseData(allLocales) {
  return (0, _ramda.reduce)(function (data, locale) {
    data[locale] = {
      _declaration: {
        _attributes: {
          version: '1.0'
        }
      },
      xliff: {
        _attributes: {
          version: '1.2',
          xmlns: 'urn:oasis:names:tc:xliff:document:1.2'
        }
      }
    };
    return data;
  }, {}, allLocales);
}

function generateXlfData(_ref) {
  var localeData = _ref.localeData,
      sourceLocale = _ref.sourceLocale,
      supportedLocales = _ref.supportedLocales,
      sourceFolder = _ref.sourceFolder,
      exportType = _ref.exportType;

  var isFull = exportType.toLowerCase() === 'full';
  var onlyTranslated = exportType.toLowerCase() === 'translated';
  var allLocales = supportedLocales.filter(function (locale) {
    return locale !== sourceLocale;
  });

  var jsonData = (0, _ramda.reduce)(function (result, folderPath) {
    var folderData = localeData[folderPath];
    var sourceFile = folderData.files[sourceLocale];
    if (sourceFile) {
      (0, _ramda.forEach)(function (locale) {
        if (locale !== sourceLocale) {
          var targetFile = folderData.files[locale];
          var fileName = targetFile && targetFile.file || locale + '.js';
          var original = _path2.default.relative(sourceFolder, _path2.default.join(folderData.path, fileName));
          var transUnits = (0, _ramda.reduce)(function (transUnits, _ref2) {
            var _ref3 = (0, _slicedToArray3.default)(_ref2, 1),
                key = _ref3[0];

            if (onlyTranslated) {
              if (targetFile && targetFile.data.get(key) && (!targetFile.data.get(key).source || targetFile.data.get(key).source === sourceFile.data.get(key).value)) {
                var unit = {
                  _attributes: {
                    id: '[' + key + ']'
                  },
                  source: {
                    _text: sourceFile.data.get(key).value
                  },
                  target: {
                    _text: targetFile.data.get(key).value
                  }
                };
                transUnits.push(unit);
              }
            } else {
              var diff = !targetFile || !targetFile.data.get(key) || targetFile.data.get(key).source && targetFile.data.get(key).source !== sourceFile.data.get(key).value;
              if (!onlyTranslated && diff || isFull) {
                var _unit = {
                  _attributes: {
                    id: '[' + key + ']'
                  },
                  source: {
                    _text: sourceFile.data.get(key).value
                  },
                  target: {
                    _text: diff ? sourceFile.data.get(key).value : targetFile.data.get(key).value
                  }
                };
                transUnits.push(_unit);
              }
            }
            return transUnits;
          }, [], sourceFile.data);
          if (transUnits.length) {
            var unit = {
              _attributes: {
                original: original,
                'source-language': sourceLocale,
                'target-language': locale,
                datatype: 'plaintext'
              },
              body: {
                'trans-unit': transUnits
              }
            };
            if (!result[locale].xliff.file) {
              result[locale].xliff.file = [];
            }
            result[locale].xliff.file.push(unit);
          }
        }
      }, supportedLocales);
    }
    return result;
  }, generateBaseData(allLocales), (0, _keys2.default)(localeData));
  return (0, _ramda.reduce)(function (xlfData, locale) {
    xlfData[locale] = _xmlJs2.default.json2xml(jsonData[locale], { compact: true, spaces: 4 });
    return xlfData;
  }, {}, allLocales);
}
//# sourceMappingURL=index.js.map
