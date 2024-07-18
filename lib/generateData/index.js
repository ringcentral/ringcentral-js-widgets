"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.join");
require("core-js/modules/es.object.keys");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateJsonData = generateJsonData;
exports.generateXlfData = generateXlfData;
var _path = _interopRequireDefault(require("path"));
var _ramda = require("ramda");
var _xmlJs = _interopRequireDefault(require("xml-js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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

// the new json export-import flow will only require exporting en-US files
function generateJsonData(_ref) {
  var localeData = _ref.localeData,
    sourceFolder = _ref.sourceFolder,
    sourceLocale = _ref.sourceLocale,
    translationLocales = _ref.translationLocales;
  return (0, _ramda.reduce)(function (result, folderPath) {
    var folderData = localeData[folderPath];
    // console.log(folderData, folderPath);
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
