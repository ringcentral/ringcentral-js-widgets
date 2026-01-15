"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multipartHttpRequest = multipartHttpRequest;
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.entries.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.object.values.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _utils = require("@ringcentral-integration/utils");
var _excluded = ["fields", "files", "query", "headers", "batch"];
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var MULTIPART_MIXED = 'multipart/mixed';
/**
 * create a http with multipart/form-data, let you can send multiple easily
 *
 * and handle `ASCII` encoding issue in multipart/form-data with `filename*=`
 */
function multipartHttpRequest(platform) {
  function checkAllFilesNameNotHaveASCII(files) {
    return Object.values(files || {}).some(function (value) {
      if (Array.isArray(value)) {
        return value.some(function (file) {
          return file instanceof File && !(0, _utils.isASCII)(file.name);
        });
      }
      return value instanceof File && !(0, _utils.isASCII)(value.name);
    });
  }
  function getFormData(_ref) {
    var fields = _ref.fields,
      files = _ref.files;
    var formData = new FormData();
    Object.entries(fields || {}).forEach(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
        key = _ref3[0],
        value = _ref3[1];
      formData.append(key, new Blob([JSON.stringify(value)], {
        type: 'application/json'
      }));
    });
    Object.entries(files || {}).forEach(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
        key = _ref5[0],
        value = _ref5[1];
      if (Array.isArray(value)) {
        value.forEach(function (item, i) {
          formData.append(key, item, item instanceof File ? item.name : "blob-".concat(i));
        });
      } else {
        formData.append(key, value, value instanceof File ? value.name : "blob");
      }
    });
    return formData;
  }
  var sendRequest = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(method, url, _ref6) {
      var _multipartResult$;
      var fields, files, query, _ref6$headers, headers, batch, rest, contentType, result, hasNonASCII, uTF8FormData, formData, response, multipartResult, _result, responseData, _t, _t2;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            fields = _ref6.fields, files = _ref6.files, query = _ref6.query, _ref6$headers = _ref6.headers, headers = _ref6$headers === void 0 ? {} : _ref6$headers, batch = _ref6.batch, rest = _objectWithoutProperties(_ref6, _excluded);
            contentType = headers.contentType;
            _t = method;
            _context.n = _t === 'get' ? 1 : _t === 'delete' ? 1 : 3;
            break;
          case 1:
            _context.n = 2;
            return platform[method](url, query, _objectSpread(_objectSpread({}, rest), {}, {
              headers: _objectSpread(_objectSpread({}, headers), {}, {
                'Content-Type': contentType || MULTIPART_MIXED
              })
            }));
          case 2:
            result = _context.v;
            return _context.a(3, 10);
          case 3:
            hasNonASCII = checkAllFilesNameNotHaveASCII(files);
            if (!hasNonASCII) {
              _context.n = 7;
              break;
            }
            _t2 = fields || files;
            if (!_t2) {
              _context.n = 5;
              break;
            }
            _context.n = 4;
            return new _utils.MultiPartUTF8FormData({
              fields: fields,
              files: files
            }).getData(contentType);
          case 4:
            _t2 = _context.v;
          case 5:
            uTF8FormData = _t2;
            _context.n = 6;
            return platform[method](url, uTF8FormData === null || uTF8FormData === void 0 ? void 0 : uTF8FormData.formData, query, _objectSpread(_objectSpread({}, rest), {}, {
              headers: _objectSpread(_objectSpread({}, headers), {}, {
                'Content-Type': (uTF8FormData === null || uTF8FormData === void 0 ? void 0 : uTF8FormData.contentType) || MULTIPART_MIXED
              })
            }));
          case 6:
            result = _context.v;
            _context.n = 9;
            break;
          case 7:
            // when not be ASCII, use platform API directly
            formData = getFormData({
              fields: fields,
              files: files
            });
            _context.n = 8;
            return platform[method](url, formData, query, rest);
          case 8:
            response = _context.v;
            return _context.a(2, response.json());
          case 9:
            return _context.a(3, 10);
          case 10:
            _context.n = 11;
            return platform._client.toMultipart(result);
          case 11:
            multipartResult = _context.v;
            if (!batch) {
              _context.n = 13;
              break;
            }
            _context.n = 12;
            return Promise.all(multipartResult.map(function (res) {
              return res.json();
            }));
          case 12:
            _result = _context.v;
            return _context.a(2, _result);
          case 13:
            _context.n = 14;
            return multipartResult === null || multipartResult === void 0 ? void 0 : (_multipartResult$ = multipartResult[0]) === null || _multipartResult$ === void 0 ? void 0 : _multipartResult$.json();
          case 14:
            responseData = _context.v;
            return _context.a(2, responseData);
        }
      }, _callee);
    }));
    return function sendRequest(_x, _x2, _x3) {
      return _ref7.apply(this, arguments);
    };
  }();
  return {
    get: function get(url, options) {
      return sendRequest('get', url, options);
    },
    post: function post(url, options) {
      return sendRequest('post', url, options);
    },
    put: function put(url, options) {
      return sendRequest('put', url, options);
    },
    patch: function patch(url, options) {
      return sendRequest('patch', url, options);
    },
    "delete": function _delete(url, options) {
      return sendRequest('delete', url, options);
    }
  };
}
//# sourceMappingURL=multipartHttpRequest.js.map
