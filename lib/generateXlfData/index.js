"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.reduce");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateXlfData;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.filter");

var _path = _interopRequireDefault(require("path"));

var _xmlJs = _interopRequireDefault(require("xml-js"));

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
      exportType = _ref.exportType,
      fillEmptyWithSource = _ref.fillEmptyWithSource;
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
          var fileName = targetFile && targetFile.file || "".concat(locale, ".js");

          var original = _path["default"].relative(sourceFolder, _path["default"].join(folderData.path, fileName));

          var transUnits = (0, _ramda.reduce)(function (transUnits, _ref2) {
            var _ref3 = _slicedToArray(_ref2, 1),
                key = _ref3[0];

            if (onlyTranslated) {
              if (targetFile && targetFile.data.get(key) && (!targetFile.data.get(key).source || targetFile.data.get(key).source === sourceFile.data.get(key).value)) {
                var unit = {
                  _attributes: {
                    id: "[".concat(key, "]")
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
                    id: "[".concat(key, "]")
                  },
                  source: {
                    _text: sourceFile.data.get(key).value
                  }
                };

                if (diff) {
                  if (fillEmptyWithSource) {
                    _unit.target = {
                      _text: sourceFile.data.get(key).value
                    };
                  } else {
                    _unit.target = {
                      _text: ''
                    };
                  }
                } else {
                  _unit.target = {
                    _text: targetFile.data.get(key).value
                  };
                }

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
  }, generateBaseData(allLocales), Object.keys(localeData));
  return (0, _ramda.reduce)(function (xlfData, locale) {
    xlfData[locale] = _xmlJs["default"].json2xml(jsonData[locale], {
      compact: true,
      spaces: 4
    });
    return xlfData;
  }, {}, allLocales);
}
//# sourceMappingURL=index.js.map
