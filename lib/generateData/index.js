"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.reduce");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateJsonData = generateJsonData;
exports.generateXlfData = generateXlfData;

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _path = _interopRequireDefault(require("path"));

var _xmlJs = _interopRequireDefault(require("xml-js"));

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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
} // the new json export-import flow will only require exporting en-US files


function generateJsonData(_ref) {
  var localeData = _ref.localeData,
      sourceFolder = _ref.sourceFolder,
      sourceLocale = _ref.sourceLocale,
      translationLocales = _ref.translationLocales;
  return (0, _ramda.reduce)(function (result, folderPath) {
    var folderData = localeData[folderPath]; // console.log(folderData, folderPath);

    var sourceFile = folderData.files[sourceLocale];

    if (sourceFile) {
      (0, _ramda.forEach)(function (locale) {
        var targetFile = folderData.files[locale];

        if (targetFile) {
          var relativePath = _path["default"].relative(sourceFolder, _path["default"].join(folderData.path, sourceFile.file));

          result[locale][relativePath] = (0, _ramda.reduce)(function (acc, _ref2) {
            var _targetFile$data, _targetFile$data$get;

            var _ref3 = _slicedToArray(_ref2, 2),
                _ref3$ = _ref3[1],
                key = _ref3$.key,
                value = _ref3$.value;

            if (locale === sourceLocale) {
              acc[key] = value;
            } else if ((targetFile === null || targetFile === void 0 ? void 0 : (_targetFile$data = targetFile.data) === null || _targetFile$data === void 0 ? void 0 : (_targetFile$data$get = _targetFile$data.get(key)) === null || _targetFile$data$get === void 0 ? void 0 : _targetFile$data$get.source) === value) {
              acc[key] = targetFile.data.get(key).value;
            }

            return acc;
          }, {}, sourceFile.data);
        }
      }, translationLocales);
    }

    return result;
  }, (0, _ramda.reduce)(function (acc, locale) {
    acc[locale] = {};
    return acc;
  }, {}, translationLocales), Object.keys(localeData));
}

function generateXlfData(_ref4) {
  var localeData = _ref4.localeData,
      sourceLocale = _ref4.sourceLocale,
      translationLocales = _ref4.translationLocales,
      sourceFolder = _ref4.sourceFolder,
      exportType = _ref4.exportType,
      fillEmptyWithSource = _ref4.fillEmptyWithSource;
  var isFull = exportType.toLowerCase() === 'full';
  var onlyTranslated = exportType.toLowerCase() === 'translated';
  var allLocales = translationLocales.filter(function (locale) {
    return locale !== sourceLocale;
  });
  var jsonData = (0, _ramda.reduce)(function (result, folderPath) {
    var folderData = localeData[folderPath];
    var sourceFile = folderData.files[sourceLocale];

    if (sourceFile) {
      (0, _ramda.forEach)(function (locale) {
        if (locale !== sourceLocale) {
          var targetFile = folderData.files[locale];
          var fileName = targetFile && targetFile.file || "".concat(locale).concat(_path["default"].extname(sourceFile.file));

          var original = _path["default"].relative(sourceFolder, _path["default"].join(folderData.path, fileName));

          var transUnits = (0, _ramda.reduce)(function (transUnits, _ref5) {
            var _ref6 = _slicedToArray(_ref5, 1),
                key = _ref6[0];

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
      }, translationLocales);
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
