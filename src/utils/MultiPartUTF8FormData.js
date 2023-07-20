"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.flat");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.join");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.unscopables.flat");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.function.name");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.entries");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.regexp.to-string");
require("core-js/modules/es.string.iterator");
require("core-js/modules/es.string.split");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiPartUTF8FormData = void 0;
require("regenerator-runtime/runtime");
var _base64Handler = require("./base64Handler");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * make you can send custom form data with `filename*=`
 */
var MultiPartUTF8FormData = /*#__PURE__*/function () {
  function MultiPartUTF8FormData(dataList) {
    _classCallCheck(this, MultiPartUTF8FormData);
    this.dataList = dataList;
    this._boundary = "----Boundary".concat(Math.random().toString(35).substring(2));
  }
  _createClass(MultiPartUTF8FormData, [{
    key: "getData",
    value: function () {
      var _getData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var contentType,
          formDataStringList,
          wrappedBoundary,
          outputRowData,
          _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                contentType = _args.length > 0 && _args[0] !== undefined ? _args[0] : 'multipart/form-data';
                _context.next = 3;
                return this.getFormStringList();
              case 3:
                formDataStringList = _context.sent;
                wrappedBoundary = "--".concat(this._boundary);
                outputRowData = "".concat(formDataStringList.map(function (body) {
                  return "".concat(wrappedBoundary, "\r\n").concat(body);
                }).join('\r\n'));
                return _context.abrupt("return", {
                  contentType: "".concat(contentType, "; boundary=").concat(this._boundary),
                  formData: "".concat(outputRowData, "\r\n").concat(wrappedBoundary, "--")
                });
              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function getData() {
        return _getData.apply(this, arguments);
      }
      return getData;
    }()
  }, {
    key: "getFormStringList",
    value: function () {
      var _getFormStringList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _this = this;
        var result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return Promise.all([].concat(_toConsumableArray(Object.entries(this.dataList.fields || {}).map( /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref) {
                    var _ref3, key, value;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _ref3 = _slicedToArray(_ref, 2), key = _ref3[0], value = _ref3[1];
                            if (!(_typeof(value) === 'object')) {
                              _context2.next = 3;
                              break;
                            }
                            return _context2.abrupt("return", _this.getJsonFormString({
                              key: key,
                              source: JSON.stringify(value)
                            }));
                          case 3:
                            return _context2.abrupt("return", _this.getJsonFormString({
                              key: key,
                              source: value
                            }));
                          case 4:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));
                  return function (_x) {
                    return _ref2.apply(this, arguments);
                  };
                }())), _toConsumableArray(Object.entries(this.dataList.files || {}).map( /*#__PURE__*/function () {
                  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref4) {
                    var _ref6, key, value;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _ref6 = _slicedToArray(_ref4, 2), key = _ref6[0], value = _ref6[1];
                            if (!Array.isArray(value)) {
                              _context3.next = 3;
                              break;
                            }
                            return _context3.abrupt("return", Promise.all(value.map(function (file) {
                              return _this.processFile(key, file);
                            })));
                          case 3:
                            return _context3.abrupt("return", _this.processFile(key, value));
                          case 4:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));
                  return function (_x2) {
                    return _ref5.apply(this, arguments);
                  };
                }()))));
              case 2:
                result = _context4.sent;
                return _context4.abrupt("return", result.flat());
              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function getFormStringList() {
        return _getFormStringList.apply(this, arguments);
      }
      return getFormStringList;
    }()
  }, {
    key: "processFile",
    value: function () {
      var _processFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(key, file) {
        var base64;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return (0, _base64Handler.fileToBase64)(file);
              case 2:
                base64 = _context5.sent;
                return _context5.abrupt("return", this.getBase64FormString({
                  key: key,
                  source: base64,
                  filename: file instanceof File ? file.name : 'blob',
                  type: file.type
                }));
              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function processFile(_x3, _x4) {
        return _processFile.apply(this, arguments);
      }
      return processFile;
    }()
  }, {
    key: "getJsonFormString",
    value: function getJsonFormString(_ref7) {
      var key = _ref7.key,
        source = _ref7.source,
        _ref7$type = _ref7.type,
        type = _ref7$type === void 0 ? 'application/json' : _ref7$type;
      return ["Content-Disposition: form-data; name=\"".concat(key, "\""), "Content-type: ".concat(type), '', "".concat(source)].join('\r\n');
    }
  }, {
    key: "getBase64FormString",
    value: function getBase64FormString(_ref8) {
      var key = _ref8.key,
        source = _ref8.source,
        _ref8$filename = _ref8.filename,
        filename = _ref8$filename === void 0 ? 'blob' : _ref8$filename,
        _ref8$type = _ref8.type,
        type = _ref8$type === void 0 ? 'application/octet-stream' : _ref8$type;
      var encodedFileName = encodeURI(filename);
      var contentType = type;
      var dataUrl = source.split('base64,')[1];
      return ["Content-Disposition: form-data; name=\"".concat(key, "\"; filename*=\"UTF-8''").concat(encodedFileName, "\"; filename=\"").concat(encodedFileName, "\""), "Content-Type: ".concat(contentType), 'Content-Transfer-Encoding: base64', '', dataUrl].join('\r\n');
    }
  }]);
  return MultiPartUTF8FormData;
}();
exports.MultiPartUTF8FormData = MultiPartUTF8FormData;
//# sourceMappingURL=MultiPartUTF8FormData.js.map
