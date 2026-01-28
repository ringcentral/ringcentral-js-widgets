"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.regexp.exec.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiPartUTF8FormData = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.flat.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.unscopables.flat.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.entries.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _base64Handler = require("./base64Handler");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * make you can send custom form data with `filename*=`
 */
var MultiPartUTF8FormData = exports.MultiPartUTF8FormData = /*#__PURE__*/function () {
  function MultiPartUTF8FormData(dataList) {
    _classCallCheck(this, MultiPartUTF8FormData);
    this.dataList = dataList;
    this._boundary = "----Boundary".concat(Math.random().toString(35).substring(2));
  }
  return _createClass(MultiPartUTF8FormData, [{
    key: "getData",
    value: function () {
      var _getData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var contentType,
          formDataStringList,
          wrappedBoundary,
          outputRowData,
          _args = arguments;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              contentType = _args.length > 0 && _args[0] !== undefined ? _args[0] : 'multipart/form-data';
              _context.n = 1;
              return this.getFormStringList();
            case 1:
              formDataStringList = _context.v;
              wrappedBoundary = "--".concat(this._boundary);
              outputRowData = "".concat(formDataStringList.map(function (body) {
                return "".concat(wrappedBoundary, "\r\n").concat(body);
              }).join('\r\n'));
              return _context.a(2, {
                contentType: "".concat(contentType, "; boundary=").concat(this._boundary),
                formData: "".concat(outputRowData, "\r\n").concat(wrappedBoundary, "--")
              });
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
      var _getFormStringList = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var _this = this;
        var result;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return Promise.all([].concat(_toConsumableArray(Object.entries(this.dataList.fields || {}).map(/*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_ref) {
                  var _ref3, key, value;
                  return _regenerator().w(function (_context2) {
                    while (1) switch (_context2.n) {
                      case 0:
                        _ref3 = _slicedToArray(_ref, 2), key = _ref3[0], value = _ref3[1];
                        if (!(_typeof(value) === 'object')) {
                          _context2.n = 1;
                          break;
                        }
                        return _context2.a(2, _this.getJsonFormString({
                          key: key,
                          source: JSON.stringify(value)
                        }));
                      case 1:
                        return _context2.a(2, _this.getJsonFormString({
                          key: key,
                          source: value
                        }));
                    }
                  }, _callee2);
                }));
                return function (_x) {
                  return _ref2.apply(this, arguments);
                };
              }())), _toConsumableArray(Object.entries(this.dataList.files || {}).map(/*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(_ref4) {
                  var _ref6, key, value;
                  return _regenerator().w(function (_context3) {
                    while (1) switch (_context3.n) {
                      case 0:
                        _ref6 = _slicedToArray(_ref4, 2), key = _ref6[0], value = _ref6[1];
                        if (!Array.isArray(value)) {
                          _context3.n = 1;
                          break;
                        }
                        return _context3.a(2, Promise.all(value.map(function (file) {
                          return _this.processFile(key, file);
                        })));
                      case 1:
                        return _context3.a(2, _this.processFile(key, value));
                    }
                  }, _callee3);
                }));
                return function (_x2) {
                  return _ref5.apply(this, arguments);
                };
              }()))));
            case 1:
              result = _context4.v;
              return _context4.a(2, result.flat());
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
      var _processFile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(key, file) {
        var base64;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return (0, _base64Handler.fileToBase64)(file);
            case 1:
              base64 = _context5.v;
              return _context5.a(2, this.getBase64FormString({
                key: key,
                source: base64,
                filename: file instanceof File ? file.name : 'blob',
                type: file.type
              }));
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
}();
//# sourceMappingURL=MultiPartUTF8FormData.js.map
