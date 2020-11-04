"use strict";

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.reduce");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = importLocale;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.map");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _generator = _interopRequireDefault(require("@babel/generator"));

var _parser = require("@babel/parser");

var _formatLocale = _interopRequireDefault(require("@ringcentral-integration/i18n/lib/formatLocale"));

var _chalk = _interopRequireDefault(require("chalk"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _path = _interopRequireDefault(require("path"));

var _ramda = require("ramda");

var _asyncForEach = _interopRequireDefault(require("../asyncForEach"));

var _asyncReduce = _interopRequireDefault(require("../asyncReduce"));

var _compileLocaleData = _interopRequireDefault(require("../compileLocaleData"));

var _defaultConfig = _interopRequireDefault(require("../defaultConfig"));

var _readJsonData = require("../readJsonData");

var _readXlfData = _interopRequireDefault(require("../readXlfData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var prompt = _inquirer["default"].createPromptModule();

function writeFiles(_ref) {
  var localeData = _ref.localeData,
      sourceFolder = _ref.sourceFolder,
      sourceLocale = _ref.sourceLocale;
  (0, _ramda.forEach)(function (folderPath) {
    (0, _ramda.forEach)(function (locale) {
      if (locale !== sourceLocale) {
        // write file
        var targetData = localeData[folderPath].files[locale];

        var _generate = (0, _generator["default"])(targetData.ast),
            code = _generate.code;

        var annotations = (0, _ramda.reduce)(function (result, _ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              key = _ref3[0],
              value = _ref3[1];

          result.push("// @key: @#@".concat(JSON.stringify(key), "@#@ @source: @#@").concat(JSON.stringify(value), "@#@"));
          return result;
        }, [], targetData.annotations).join('\n');
        var output = "".concat(code, "\n\n").concat(annotations, "\n");

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
                            var filePath, folderPath, sourceData, originalData, translatedData;
                            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                              while (1) {
                                switch (_context5.prev = _context5.next) {
                                  case 0:
                                    filePath = _path["default"].resolve(sourceFolder, fileName);
                                    folderPath = _path["default"].dirname(filePath);

                                    if (!(localeData[folderPath] && localeData[folderPath].files[sourceLocale])) {
                                      _context5.next = 10;
                                      break;
                                    }

                                    sourceData = localeData[folderPath].files[sourceLocale].data;

                                    if (!localeData[folderPath].files[locale]) {
                                      localeData[folderPath].files[locale] = {
                                        file: "".concat((0, _formatLocale["default"])(locale), ".js")
                                      };
                                    }

                                    if (!localeData[folderPath].files[locale].data) {
                                      localeData[folderPath].files[locale].data = new Map();
                                    }

                                    originalData = localeData[folderPath].files[locale].data;
                                    translatedData = translations[locale][fileName];
                                    _context5.next = 10;
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

                                  case 10:
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
                  var targetData = localeData[folderPath].files[locale];
                  var sourceData = localeData[folderPath].files[sourceLocale];
                  targetData.ast = (0, _parser.parse)(sourceData.content, {
                    sourceType: 'module'
                  });
                  targetData.annotations = new Map();
                  var defaultExport = (0, _ramda.find)(function (item) {
                    return item.type === 'ExportDefaultDeclaration';
                  }, targetData.ast.program.body);
                  var properties = (0, _ramda.filter)(function (prop) {
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
                  }, defaultExport.declaration.properties);
                  defaultExport.declaration.properties = properties;
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
        _ref6$interactive,
        interactive,
        _ref6$silent,
        silent,
        _ref6$json,
        json,
        rawData,
        localeData,
        translations,
        mergedData,
        _args8 = arguments;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _ref6 = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {}, _ref6$sourceFolder = _ref6.sourceFolder, sourceFolder = _ref6$sourceFolder === void 0 ? _defaultConfig["default"].sourceFolder : _ref6$sourceFolder, _ref6$localizationFol = _ref6.localizationFolder, localizationFolder = _ref6$localizationFol === void 0 ? _defaultConfig["default"].localizationFolder : _ref6$localizationFol, _ref6$sourceLocale = _ref6.sourceLocale, sourceLocale = _ref6$sourceLocale === void 0 ? _defaultConfig["default"].sourceLocale : _ref6$sourceLocale, supportedLocales = _ref6.supportedLocales, _ref6$interactive = _ref6.interactive, interactive = _ref6$interactive === void 0 ? _defaultConfig["default"].interactive : _ref6$interactive, _ref6$silent = _ref6.silent, silent = _ref6$silent === void 0 ? _defaultConfig["default"].silent : _ref6$silent, _ref6$json = _ref6.json, json = _ref6$json === void 0 ? false : _ref6$json, rawData = _ref6.rawData;

            if (supportedLocales) {
              _context8.next = 3;
              break;
            }

            throw new Error('options.supportedLocales is missing');

          case 3:
            localeData = (0, _compileLocaleData["default"])({
              sourceFolder: sourceFolder,
              sourceLocale: sourceLocale,
              supportedLocales: supportedLocales
            });
            translations = json ? (0, _readJsonData.readJsonData)({
              localizationFolder: localizationFolder,
              supportedLocales: supportedLocales,
              sourceLocale: sourceLocale,
              rawData: rawData
            }) : (0, _readXlfData["default"])({
              localizationFolder: localizationFolder,
              supportedLocales: supportedLocales
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
              sourceLocale: sourceLocale
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
