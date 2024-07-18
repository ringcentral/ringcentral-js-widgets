"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.join");
require("core-js/modules/es.map");
require("core-js/modules/es.object.keys");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = importLocale;
require("regenerator-runtime/runtime");
var _generator = _interopRequireDefault(require("@babel/generator"));
var _parser = require("@babel/parser");
var _formatLocale = _interopRequireDefault(require("@ringcentral-integration/i18n/lib/formatLocale"));
var _chalk = _interopRequireDefault(require("chalk"));
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _inquirer = _interopRequireDefault(require("inquirer"));
var _path = _interopRequireDefault(require("path"));
var _prettier = _interopRequireDefault(require("prettier"));
var _ramda = require("ramda");
var _asyncForEach = _interopRequireDefault(require("../asyncForEach"));
var _asyncReduce = _interopRequireDefault(require("../asyncReduce"));
var _compileLocaleData = _interopRequireDefault(require("../compileLocaleData"));
var _defaultConfig = _interopRequireDefault(require("../defaultConfig"));
var _readJsonData = require("../readJsonData");
var _readXlfData = _interopRequireDefault(require("../readXlfData"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } /* eslint-disable no-inner-declarations */
var prompt = _inquirer["default"].createPromptModule();
var getAnnotations = function getAnnotations(source) {
  var annotations = (0, _ramda.reduce)(function (result, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    result.push("// @key: @#@".concat(JSON.stringify(key), "@#@ @source: @#@").concat(JSON.stringify(value), "@#@"));
    return result;
  }, [], source).join('\n');
  return annotations;
};
function writeFiles(_ref3) {
  var localeData = _ref3.localeData,
    sourceFolder = _ref3.sourceFolder,
    sourceLocale = _ref3.sourceLocale,
    _ref3$disableEslint = _ref3.disableEslint,
    disableEslint = _ref3$disableEslint === void 0 ? true : _ref3$disableEslint;
  var eslint = disableEslint ? '/* eslint-disable */\n' : '';
  (0, _ramda.forEach)(function (folderPath) {
    (0, _ramda.forEach)(function (locale) {
      if (locale !== sourceLocale) {
        // write file
        var targetData = localeData[folderPath].files[locale];
        var _generate = (0, _generator["default"])(targetData.ast),
          code = _generate.code;
        var annotations = getAnnotations(targetData.annotations);
        var output = _prettier["default"].format("".concat(eslint).concat(code, "\n\n").concat(annotations, "\n"), {
          parser: 'typescript',
          // this copy from integration basic prettier config
          // TODO: read prettier config by user's project
          bracketSpacing: true,
          singleQuote: true,
          trailingComma: 'all',
          arrowParens: 'always',
          bracketSameLine: false,
          endOfLine: 'auto'
        });
        _fsExtra["default"].writeFileSync(_path["default"].resolve(sourceFolder, folderPath, targetData.file), output);
      }
    }, Object.keys(localeData[folderPath].files));
  }, Object.keys(localeData));
}
function formatReason(_ref4) {
  var reason = _ref4.reason,
    key = _ref4.key,
    fileName = _ref4.fileName,
    type = _ref4.type;
  return "[locale] ".concat(_chalk["default"].red("{".concat(type, "}")), " Key: '").concat(key, "', File: '").concat(fileName, "', Reason: ").concat(reason, ".");
}
function mergeTranslationData(_x) {
  return _mergeTranslationData.apply(this, arguments);
}
function _mergeTranslationData() {
  _mergeTranslationData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_ref5) {
    var localeData, _ref5$translations, translations, sourceFolder, sourceLocale, _ref5$interactive, interactive, _ref5$silent, silent;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            localeData = _ref5.localeData, _ref5$translations = _ref5.translations, translations = _ref5$translations === void 0 ? {} : _ref5$translations, sourceFolder = _ref5.sourceFolder, sourceLocale = _ref5.sourceLocale, _ref5$interactive = _ref5.interactive, interactive = _ref5$interactive === void 0 ? true : _ref5$interactive, _ref5$silent = _ref5.silent, silent = _ref5$silent === void 0 ? false : _ref5$silent;
            _context7.next = 3;
            return (0, _asyncForEach["default"])( /*#__PURE__*/function () {
              var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(folderPath) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return (0, _asyncForEach["default"])( /*#__PURE__*/function () {
                          var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(locale) {
                            var targetData, sourceData, relativePath;
                            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                              while (1) {
                                switch (_context2.prev = _context2.next) {
                                  case 0:
                                    if (!(locale !== sourceLocale)) {
                                      _context2.next = 7;
                                      break;
                                    }
                                    targetData = localeData[folderPath].files[locale];
                                    sourceData = localeData[folderPath].files[sourceLocale];
                                    relativePath = _path["default"].relative(sourceFolder, _path["default"].resolve(folderPath, targetData.file));
                                    _context2.next = 6;
                                    return (0, _asyncReduce["default"])( /*#__PURE__*/function () {
                                      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(newData, _ref9) {
                                        var _ref11, key, value, type, shouldDelete, message;
                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                          while (1) {
                                            switch (_context.prev = _context.next) {
                                              case 0:
                                                _ref11 = _slicedToArray(_ref9, 2), key = _ref11[0], value = _ref11[1];
                                                type = 'Delete';
                                                shouldDelete = false;
                                                if (!sourceData.data.has(key)) {
                                                  _context.next = 15;
                                                  break;
                                                }
                                                if (!(sourceData.data.get(key).value !== value.source)) {
                                                  _context.next = 13;
                                                  break;
                                                }
                                                message = formatReason({
                                                  type: type,
                                                  reason: 'Source value changed',
                                                  key: key,
                                                  fileName: relativePath
                                                });
                                                if (!interactive) {
                                                  _context.next = 12;
                                                  break;
                                                }
                                                _context.next = 9;
                                                return prompt({
                                                  name: 'result',
                                                  type: 'confirm',
                                                  message: message
                                                });
                                              case 9:
                                                shouldDelete = _context.sent.result;
                                                _context.next = 13;
                                                break;
                                              case 12:
                                                shouldDelete = true;
                                              case 13:
                                                _context.next = 23;
                                                break;
                                              case 15:
                                                message = formatReason({
                                                  type: type,
                                                  reason: 'Source no longer exists',
                                                  key: key,
                                                  fileName: relativePath
                                                });
                                                if (!interactive) {
                                                  _context.next = 22;
                                                  break;
                                                }
                                                _context.next = 19;
                                                return prompt({
                                                  name: 'result',
                                                  type: 'confirm',
                                                  message: message
                                                });
                                              case 19:
                                                shouldDelete = _context.sent.result;
                                                _context.next = 23;
                                                break;
                                              case 22:
                                                shouldDelete = true;
                                              case 23:
                                                if (shouldDelete) {
                                                  if (!interactive && !silent) {
                                                    console.log(message);
                                                  }
                                                } else {
                                                  newData.set(key, value);
                                                }
                                                return _context.abrupt("return", newData);
                                              case 25:
                                              case "end":
                                                return _context.stop();
                                            }
                                          }
                                        }, _callee);
                                      }));
                                      return function (_x4, _x5) {
                                        return _ref10.apply(this, arguments);
                                      };
                                    }(), new Map(), targetData.data);
                                  case 6:
                                    targetData.data = _context2.sent;
                                  case 7:
                                  case "end":
                                    return _context2.stop();
                                }
                              }
                            }, _callee2);
                          }));
                          return function (_x3) {
                            return _ref8.apply(this, arguments);
                          };
                        }(), Object.keys(localeData[folderPath].files));
                      case 2:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));
              return function (_x2) {
                return _ref7.apply(this, arguments);
              };
            }(), Object.keys(localeData));
          case 3:
            _context7.next = 5;
            return (0, _asyncForEach["default"])( /*#__PURE__*/function () {
              var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(locale) {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return (0, _asyncForEach["default"])( /*#__PURE__*/function () {
                          var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(fileName) {
                            var filePath, folderPath, sourceLocaleFile, sourceData, ext, originalData, translatedData;
                            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                              while (1) {
                                switch (_context5.prev = _context5.next) {
                                  case 0:
                                    filePath = _path["default"].resolve(sourceFolder, fileName);
                                    folderPath = _path["default"].dirname(filePath);
                                    sourceLocaleFile = localeData[folderPath] && localeData[folderPath].files[sourceLocale];
                                    if (!sourceLocaleFile) {
                                      _context5.next = 12;
                                      break;
                                    }
                                    sourceData = sourceLocaleFile.data;
                                    ext = _path["default"].extname(sourceLocaleFile.file) || '.ts';
                                    if (!localeData[folderPath].files[locale]) {
                                      localeData[folderPath].files[locale] = {
                                        file: "".concat((0, _formatLocale["default"])(locale)).concat(ext)
                                      };
                                    }
                                    if (!localeData[folderPath].files[locale].data) {
                                      localeData[folderPath].files[locale].data = new Map();
                                    }
                                    originalData = localeData[folderPath].files[locale].data;
                                    translatedData = translations[locale][fileName];
                                    _context5.next = 12;
                                    return (0, _asyncForEach["default"])( /*#__PURE__*/function () {
                                      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(key) {
                                        var type, shouldSkip, message;
                                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                          while (1) {
                                            switch (_context4.prev = _context4.next) {
                                              case 0:
                                                type = 'Skip';
                                                shouldSkip = false;
                                                if (sourceData.has(key)) {
                                                  _context4.next = 13;
                                                  break;
                                                }
                                                message = formatReason({
                                                  type: type,
                                                  reason: 'Source no longer exists',
                                                  key: key,
                                                  fileName: fileName
                                                });
                                                if (!interactive) {
                                                  _context4.next = 10;
                                                  break;
                                                }
                                                _context4.next = 7;
                                                return prompt({
                                                  name: 'result',
                                                  type: 'confirm',
                                                  message: message
                                                });
                                              case 7:
                                                shouldSkip = _context4.sent.result;
                                                _context4.next = 11;
                                                break;
                                              case 10:
                                                shouldSkip = true;
                                              case 11:
                                                _context4.next = 22;
                                                break;
                                              case 13:
                                                if (!(sourceData.get(key).value !== translatedData[key].source)) {
                                                  _context4.next = 22;
                                                  break;
                                                }
                                                message = formatReason({
                                                  type: type,
                                                  reason: 'Source value changed',
                                                  key: key,
                                                  fileName: fileName
                                                });
                                                if (!interactive) {
                                                  _context4.next = 21;
                                                  break;
                                                }
                                                _context4.next = 18;
                                                return prompt({
                                                  name: 'result',
                                                  type: 'confirm',
                                                  message: message
                                                });
                                              case 18:
                                                shouldSkip = _context4.sent.result;
                                                _context4.next = 22;
                                                break;
                                              case 21:
                                                shouldSkip = true;
                                              case 22:
                                                if (shouldSkip) {
                                                  if (!interactive && !silent) {
                                                    console.log(message);
                                                  }
                                                } else {
                                                  originalData.set(key, _objectSpread(_objectSpread({}, translatedData[key]), {}, {
                                                    key: key
                                                  }));
                                                }
                                              case 23:
                                              case "end":
                                                return _context4.stop();
                                            }
                                          }
                                        }, _callee4);
                                      }));
                                      return function (_x8) {
                                        return _ref14.apply(this, arguments);
                                      };
                                    }(), Object.keys(translatedData));
                                  case 12:
                                  case "end":
                                    return _context5.stop();
                                }
                              }
                            }, _callee5);
                          }));
                          return function (_x7) {
                            return _ref13.apply(this, arguments);
                          };
                        }(), Object.keys(translations[locale]));
                      case 2:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));
              return function (_x6) {
                return _ref12.apply(this, arguments);
              };
            }(), Object.keys(translations));
          case 5:
            // Update ast and generate code
            (0, _ramda.forEach)(function (folderPath) {
              (0, _ramda.forEach)(function (locale) {
                if (locale !== sourceLocale) {
                  var getData = function getData(source) {
                    var properties = source.properties.filter(function (prop) {
                      var wrapInBracket = prop.key.type === 'MemberExpression' || prop.key.type === 'TemplateLiteral';
                      var key = wrapInBracket ? "[".concat((0, _generator["default"])(prop.key).code, "]") : (0, _generator["default"])(prop.key).code;
                      var entry = targetData.data.get(key);
                      if (entry && entry.value) {
                        prop.value = {
                          type: 'StringLiteral',
                          value: entry.value,
                          extra: {
                            // generate desired raw to by pass babel jsesc use
                            raw: JSON.stringify(entry.value),
                            rawValue: entry.value
                          }
                        };
                        targetData.annotations.set(key, sourceData.data.get(key).value);
                        return true;
                      }
                      return false;
                    });
                    source.properties = properties;
                  };
                  var targetData = localeData[folderPath].files[locale];
                  var sourceData = localeData[folderPath].files[sourceLocale];
                  targetData.ast = (0, _parser.parse)(sourceData.content, {
                    sourceType: 'module',
                    plugins: ['typescript']
                  });
                  targetData.annotations = new Map();
                  var defaultExport = targetData.ast.program.body.find(function (item) {
                    return item.type === 'ExportDefaultDeclaration';
                  });
                  if (defaultExport) {
                    if (defaultExport.declaration.type === 'ObjectExpression') {
                      getData(defaultExport.declaration);
                    } else if (defaultExport.declaration.type === 'TSAsExpression') {
                      var nest = defaultExport.declaration.expression;
                      if (nest.type === 'ObjectExpression') {
                        getData(nest);
                      }
                    }
                  }
                }
              }, Object.keys(localeData[folderPath].files));
            }, Object.keys(localeData));
            return _context7.abrupt("return", localeData);
          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _mergeTranslationData.apply(this, arguments);
}
function importLocale() {
  return _importLocale.apply(this, arguments);
}
function _importLocale() {
  _importLocale = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    var _ref6,
      _ref6$sourceFolder,
      sourceFolder,
      _ref6$localizationFol,
      localizationFolder,
      _ref6$sourceLocale,
      sourceLocale,
      supportedLocales,
      _ref6$translationLoca,
      translationLocales,
      _ref6$interactive,
      interactive,
      _ref6$silent,
      silent,
      _ref6$json,
      json,
      _ref6$disableEslint,
      disableEslint,
      _ref6$rawData,
      rawData,
      localeData,
      translations,
      mergedData,
      _args8 = arguments;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _ref6 = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {}, _ref6$sourceFolder = _ref6.sourceFolder, sourceFolder = _ref6$sourceFolder === void 0 ? _defaultConfig["default"].sourceFolder : _ref6$sourceFolder, _ref6$localizationFol = _ref6.localizationFolder, localizationFolder = _ref6$localizationFol === void 0 ? _defaultConfig["default"].localizationFolder : _ref6$localizationFol, _ref6$sourceLocale = _ref6.sourceLocale, sourceLocale = _ref6$sourceLocale === void 0 ? _defaultConfig["default"].sourceLocale : _ref6$sourceLocale, supportedLocales = _ref6.supportedLocales, _ref6$translationLoca = _ref6.translationLocales, translationLocales = _ref6$translationLoca === void 0 ? supportedLocales : _ref6$translationLoca, _ref6$interactive = _ref6.interactive, interactive = _ref6$interactive === void 0 ? _defaultConfig["default"].interactive : _ref6$interactive, _ref6$silent = _ref6.silent, silent = _ref6$silent === void 0 ? _defaultConfig["default"].silent : _ref6$silent, _ref6$json = _ref6.json, json = _ref6$json === void 0 ? false : _ref6$json, _ref6$disableEslint = _ref6.disableEslint, disableEslint = _ref6$disableEslint === void 0 ? true : _ref6$disableEslint, _ref6$rawData = _ref6.rawData, rawData = _ref6$rawData === void 0 ? undefined : _ref6$rawData;
            if (supportedLocales) {
              _context8.next = 3;
              break;
            }
            throw new Error('options.supportedLocales is missing');
          case 3:
            localeData = (0, _compileLocaleData["default"])({
              sourceFolder: sourceFolder,
              sourceLocale: sourceLocale,
              translationLocales: translationLocales
            });
            translations = json ? (0, _readJsonData.readJsonData)({
              localizationFolder: localizationFolder,
              translationLocales: translationLocales,
              sourceLocale: sourceLocale,
              rawData: rawData
            }) : (0, _readXlfData["default"])({
              localizationFolder: localizationFolder,
              translationLocales: translationLocales
            });
            _context8.next = 7;
            return mergeTranslationData({
              localeData: localeData,
              translations: translations,
              sourceFolder: sourceFolder,
              sourceLocale: sourceLocale,
              interactive: interactive,
              silent: silent
            });
          case 7:
            mergedData = _context8.sent;
            writeFiles({
              localeData: mergedData,
              sourceFolder: sourceFolder,
              sourceLocale: sourceLocale,
              disableEslint: disableEslint
            });
          case 9:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _importLocale.apply(this, arguments);
}
//# sourceMappingURL=index.js.map
