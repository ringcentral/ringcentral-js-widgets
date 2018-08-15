'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var mergeTranslationData = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(_ref5) {
    var _this = this;

    var localeData = _ref5.localeData,
        _ref5$translations = _ref5.translations,
        translations = _ref5$translations === undefined ? {} : _ref5$translations,
        sourceFolder = _ref5.sourceFolder,
        sourceLocale = _ref5.sourceLocale,
        _ref5$interactive = _ref5.interactive,
        interactive = _ref5$interactive === undefined ? true : _ref5$interactive,
        _ref5$silent = _ref5.silent,
        silent = _ref5$silent === undefined ? false : _ref5$silent;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _asyncForEach2.default)(function () {
              var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(folderPath) {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return (0, _asyncForEach2.default)(function () {
                          var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(locale) {
                            var targetData, sourceData, relativePath;
                            return _regenerator2.default.wrap(function _callee2$(_context2) {
                              while (1) {
                                switch (_context2.prev = _context2.next) {
                                  case 0:
                                    if (!(locale !== sourceLocale)) {
                                      _context2.next = 7;
                                      break;
                                    }

                                    targetData = localeData[folderPath].files[locale];
                                    sourceData = localeData[folderPath].files[sourceLocale];
                                    relativePath = _path2.default.relative(sourceFolder, _path2.default.resolve(folderPath, targetData.file));
                                    _context2.next = 6;
                                    return (0, _asyncReduce2.default)(function () {
                                      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(newData, _ref9) {
                                        var _ref11 = (0, _slicedToArray3.default)(_ref9, 2),
                                            key = _ref11[0],
                                            value = _ref11[1];

                                        var type, shouldDelete, message;
                                        return _regenerator2.default.wrap(function _callee$(_context) {
                                          while (1) {
                                            switch (_context.prev = _context.next) {
                                              case 0:
                                                type = 'Delete';
                                                shouldDelete = false;
                                                message = void 0;

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

                                                return _context.abrupt('return', newData);

                                              case 25:
                                              case 'end':
                                                return _context.stop();
                                            }
                                          }
                                        }, _callee, _this);
                                      }));

                                      return function (_x4, _x5) {
                                        return _ref10.apply(this, arguments);
                                      };
                                    }(), new _map2.default(), targetData.data);

                                  case 6:
                                    targetData.data = _context2.sent;

                                  case 7:
                                  case 'end':
                                    return _context2.stop();
                                }
                              }
                            }, _callee2, _this);
                          }));

                          return function (_x3) {
                            return _ref8.apply(this, arguments);
                          };
                        }(), (0, _keys2.default)(localeData[folderPath].files));

                      case 2:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, _this);
              }));

              return function (_x2) {
                return _ref7.apply(this, arguments);
              };
            }(), (0, _keys2.default)(localeData));

          case 2:
            _context7.next = 4;
            return (0, _asyncForEach2.default)(function () {
              var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(locale) {
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return (0, _asyncForEach2.default)(function () {
                          var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(fileName) {
                            var filePath, folderPath, sourceData, originalData, translatedData;
                            return _regenerator2.default.wrap(function _callee5$(_context5) {
                              while (1) {
                                switch (_context5.prev = _context5.next) {
                                  case 0:
                                    filePath = _path2.default.resolve(sourceFolder, fileName);
                                    folderPath = _path2.default.dirname(filePath);

                                    if (!(localeData[folderPath] && localeData[folderPath].files[sourceLocale])) {
                                      _context5.next = 10;
                                      break;
                                    }

                                    sourceData = localeData[folderPath].files[sourceLocale].data;

                                    if (!localeData[folderPath].files[locale]) {
                                      localeData[folderPath].files[locale] = {
                                        file: (0, _formatLocale2.default)(locale) + '.js'
                                      };
                                    }
                                    if (!localeData[folderPath].files[locale].data) {
                                      localeData[folderPath].files[locale].data = new _map2.default();
                                    }
                                    originalData = localeData[folderPath].files[locale].data;
                                    translatedData = translations[locale][fileName];
                                    _context5.next = 10;
                                    return (0, _asyncForEach2.default)(function () {
                                      var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(key) {
                                        var type, shouldSkip, message;
                                        return _regenerator2.default.wrap(function _callee4$(_context4) {
                                          while (1) {
                                            switch (_context4.prev = _context4.next) {
                                              case 0:
                                                type = 'Skip';
                                                shouldSkip = false;
                                                message = void 0;

                                                if (sourceData.has(key)) {
                                                  _context4.next = 14;
                                                  break;
                                                }

                                                message = formatReason({
                                                  type: type,
                                                  reason: 'Source no longer exists',
                                                  key: key,
                                                  fileName: fileName
                                                });

                                                if (!interactive) {
                                                  _context4.next = 11;
                                                  break;
                                                }

                                                _context4.next = 8;
                                                return prompt({
                                                  name: 'result',
                                                  type: 'confirm',
                                                  message: message
                                                });

                                              case 8:
                                                shouldSkip = _context4.sent.result;
                                                _context4.next = 12;
                                                break;

                                              case 11:
                                                shouldSkip = true;

                                              case 12:
                                                _context4.next = 23;
                                                break;

                                              case 14:
                                                if (!(sourceData.get(key).value !== translatedData[key].source)) {
                                                  _context4.next = 23;
                                                  break;
                                                }

                                                message = formatReason({
                                                  type: type,
                                                  reason: 'Source value changed',
                                                  key: key,
                                                  fileName: fileName
                                                });

                                                if (!interactive) {
                                                  _context4.next = 22;
                                                  break;
                                                }

                                                _context4.next = 19;
                                                return prompt({
                                                  name: 'result',
                                                  type: 'confirm',
                                                  message: message
                                                });

                                              case 19:
                                                shouldSkip = _context4.sent.result;
                                                _context4.next = 23;
                                                break;

                                              case 22:
                                                shouldSkip = true;

                                              case 23:

                                                if (shouldSkip) {
                                                  if (!interactive && !silent) {
                                                    console.log(message);
                                                  }
                                                } else {
                                                  originalData.set(key, (0, _extends3.default)({}, translatedData[key], {
                                                    key: key
                                                  }));
                                                }

                                              case 24:
                                              case 'end':
                                                return _context4.stop();
                                            }
                                          }
                                        }, _callee4, _this);
                                      }));

                                      return function (_x8) {
                                        return _ref14.apply(this, arguments);
                                      };
                                    }(), (0, _keys2.default)(translatedData));

                                  case 10:
                                  case 'end':
                                    return _context5.stop();
                                }
                              }
                            }, _callee5, _this);
                          }));

                          return function (_x7) {
                            return _ref13.apply(this, arguments);
                          };
                        }(), (0, _keys2.default)(translations[locale]));

                      case 2:
                      case 'end':
                        return _context6.stop();
                    }
                  }
                }, _callee6, _this);
              }));

              return function (_x6) {
                return _ref12.apply(this, arguments);
              };
            }(), (0, _keys2.default)(translations));

          case 4:

            // Update ast and generate code
            (0, _ramda.forEach)(function (folderPath) {
              (0, _ramda.forEach)(function (locale) {
                if (locale !== sourceLocale) {
                  var targetData = localeData[folderPath].files[locale];
                  var sourceData = localeData[folderPath].files[sourceLocale];
                  targetData.ast = (0, _babylon.parse)(sourceData.content, { sourceType: 'module' });
                  targetData.annotations = new _map2.default();

                  var defaultExport = (0, _ramda.find)(function (item) {
                    return item.type === 'ExportDefaultDeclaration';
                  }, targetData.ast.program.body);
                  var properties = (0, _ramda.filter)(function (prop) {
                    var wrapInBracket = prop.key.type === 'MemberExpression' || prop.key.type === 'TemplateLiteral';
                    var key = wrapInBracket ? '[' + (0, _babelGenerator2.default)(prop.key).code + ']' : (0, _babelGenerator2.default)(prop.key).code;
                    var entry = targetData.data.get(key);
                    if (entry && entry.value) {
                      prop.value = {
                        type: 'StringLiteral',
                        value: entry.value,
                        extra: {
                          // generate desired raw to by pass babel jsesc use
                          raw: (0, _stringify2.default)(entry.value),
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
              }, (0, _keys2.default)(localeData[folderPath].files));
            }, (0, _keys2.default)(localeData));
            return _context7.abrupt('return', localeData);

          case 6:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function mergeTranslationData(_x) {
    return _ref6.apply(this, arguments);
  };
}();

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _ramda = require('ramda');

var _babylon = require('babylon');

var _babelGenerator = require('babel-generator');

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _formatLocale = require('@ringcentral-integration/i18n/lib/formatLocale');

var _formatLocale2 = _interopRequireDefault(_formatLocale);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _compileLocaleData = require('../compileLocaleData');

var _compileLocaleData2 = _interopRequireDefault(_compileLocaleData);

var _defaultConfig = require('../defaultConfig');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

var _readXlfData = require('../readXlfData');

var _readXlfData2 = _interopRequireDefault(_readXlfData);

var _asyncReduce = require('../asyncReduce');

var _asyncReduce2 = _interopRequireDefault(_asyncReduce);

var _asyncForEach = require('../asyncForEach');

var _asyncForEach2 = _interopRequireDefault(_asyncForEach);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prompt = _inquirer2.default.createPromptModule();

function writeFiles(_ref) {
  var localeData = _ref.localeData,
      sourceFolder = _ref.sourceFolder,
      sourceLocale = _ref.sourceLocale;

  (0, _ramda.forEach)(function (folderPath) {
    (0, _ramda.forEach)(function (locale) {
      if (locale !== sourceLocale) {
        // write file
        var targetData = localeData[folderPath].files[locale];

        var _generate = (0, _babelGenerator2.default)(targetData.ast),
            code = _generate.code;

        var annotations = (0, _ramda.reduce)(function (result, _ref2) {
          var _ref3 = (0, _slicedToArray3.default)(_ref2, 2),
              key = _ref3[0],
              value = _ref3[1];

          result.push('// @key: @#@' + (0, _stringify2.default)(key) + '@#@ @source: @#@' + (0, _stringify2.default)(value) + '@#@');
          return result;
        }, [], targetData.annotations).join('\n');
        var output = code + '\n\n' + annotations + '\n';
        _fsExtra2.default.writeFileSync(_path2.default.resolve(sourceFolder, folderPath, targetData.file), output);
      }
    }, (0, _keys2.default)(localeData[folderPath].files));
  }, (0, _keys2.default)(localeData));
}

function formatReason(_ref4) {
  var reason = _ref4.reason,
      key = _ref4.key,
      fileName = _ref4.fileName,
      type = _ref4.type;

  return '[locale] ' + _chalk2.default.red('{' + type + '}') + ' Key: \'' + key + '\', File: \'' + fileName + '\', Reason: ' + reason + '.';
}

exports.default = function () {
  var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
    var _ref16 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref16$sourceFolder = _ref16.sourceFolder,
        sourceFolder = _ref16$sourceFolder === undefined ? _defaultConfig2.default.sourceFolder : _ref16$sourceFolder,
        _ref16$localizationFo = _ref16.localizationFolder,
        localizationFolder = _ref16$localizationFo === undefined ? _defaultConfig2.default.localizationFolder : _ref16$localizationFo,
        _ref16$sourceLocale = _ref16.sourceLocale,
        sourceLocale = _ref16$sourceLocale === undefined ? _defaultConfig2.default.sourceLocale : _ref16$sourceLocale,
        supportedLocales = _ref16.supportedLocales,
        _ref16$interactive = _ref16.interactive,
        interactive = _ref16$interactive === undefined ? _defaultConfig2.default.interactive : _ref16$interactive,
        _ref16$silent = _ref16.silent,
        silent = _ref16$silent === undefined ? _defaultConfig2.default.silent : _ref16$silent;

    var localeData, translations, mergedData;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            if (supportedLocales) {
              _context8.next = 2;
              break;
            }

            throw new Error('options.supportedLocales is missing');

          case 2:
            localeData = (0, _compileLocaleData2.default)({
              sourceFolder: sourceFolder,
              sourceLocale: sourceLocale,
              supportedLocales: supportedLocales
            });
            translations = (0, _readXlfData2.default)({
              localizationFolder: localizationFolder,
              supportedLocales: supportedLocales
            });
            _context8.next = 6;
            return mergeTranslationData({
              localeData: localeData,
              translations: translations,
              sourceFolder: sourceFolder,
              sourceLocale: sourceLocale,
              interactive: interactive,
              silent: silent
            });

          case 6:
            mergedData = _context8.sent;

            writeFiles({
              localeData: mergedData,
              sourceFolder: sourceFolder,
              sourceLocale: sourceLocale
            });

          case 8:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  function importLocale() {
    return _ref15.apply(this, arguments);
  }

  return importLocale;
}();
//# sourceMappingURL=index.js.map
