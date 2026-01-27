"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerSyncTokenEvent = exports.LoginStatusChangeEvent = exports.Auth = void 0;
exports.extractBody = extractBody;
exports.extractHeaders = extractHeaders;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.starts-with.js");
require("core-js/modules/esnext.promise.all-settled.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _createRefreshTokenHelper = require("@ringcentral-integration/commons/lib/createRefreshTokenHelper");
var _plugins = require("@ringcentral-integration/micro-core/src/app/plugins");
var _services = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _rxjs = require("rxjs");
var _uuid = require("uuid");
var _Analytics = require("../Analytics");
var _Client = require("../Client");
var _Environment = require("../Environment");
var _RateLimiter = require("../RateLimiter");
var _authErrors = require("./authErrors");
var _getProfileImage = require("./getProfileImage");
var _i18n = require("./i18n");
var _loginStatus = require("./loginStatus");
var _excluded = ["redirectUri", "force", "implicit"];
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var LoginStatusChangeEvent = exports.LoginStatusChangeEvent = 'loginStatusChange';
var TriggerSyncTokenEvent = exports.TriggerSyncTokenEvent = 'triggerSyncTokenEvent';
var REQUEST_LOG_KEY = Symbol('requestLog');
function extractHeaders(source) {
  var result = {};
  if (source === null || source === void 0 ? void 0 : source.headers) {
    source.headers.forEach(function (value, key) {
      if (key === 'authorization') {
        // mask bearer token for security and privacy, also less noise in logs
        result[key] = value.startsWith('bearer ') ? value.replace(/^bearer (.{5}).*(.{5})$/, 'bearer $1**$2') : value;
      } else {
        result[key] = value;
      }
    });
  }
  return result;
}
function extractBody(_x) {
  return _extractBody.apply(this, arguments);
}
function _extractBody() {
  _extractBody = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(
  // ringcentral-js sdk sometimes put the original request body into originalBody
  source) {
    var _source$originalBody2;
    var _source$originalBody, blobContent, data, _t16;
    return _regenerator().w(function (_context24) {
      while (1) switch (_context24.p = _context24.n) {
        case 0:
          if (!(!source || !source.body)) {
            _context24.n = 1;
            break;
          }
          return _context24.a(2, null);
        case 1:
          if (!source.bodyUsed) {
            _context24.n = 2;
            break;
          }
          return _context24.a(2, (_source$originalBody = source.originalBody) !== null && _source$originalBody !== void 0 ? _source$originalBody : null);
        case 2:
          if (!((_source$originalBody2 = source.originalBody) === null || _source$originalBody2 === void 0 ? void 0 : _source$originalBody2.values)) {
            _context24.n = 3;
            break;
          }
          blobContent = _toConsumableArray(source.originalBody.values()).find(function (x) {
            return x instanceof Blob;
          });
          if (!blobContent) {
            _context24.n = 3;
            break;
          }
          return _context24.a(2, "body contains blob, size is ".concat(blobContent.size, ", type is ").concat(blobContent.type));
        case 3:
          _context24.p = 3;
          _context24.n = 4;
          return source.clone().text();
        case 4:
          data = _context24.v;
          return _context24.a(2, data);
        case 5:
          _context24.p = 5;
          _t16 = _context24.v;
          return _context24.a(2, 'unable to read body');
      }
    }, _callee23, null, [[3, 5]]);
  }));
  return _extractBody.apply(this, arguments);
}
/**
 * Authentication service that handles login, logout and token management
 *
 * @class
 */
var Auth = exports.Auth = (_dec = (0, _nextCore.injectable)({
  name: 'Auth'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.inject)('SdkConfig')(target, undefined, 5);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 6);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 7);
}, _dec5 = function _dec5(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 8);
}, _dec6 = function _dec6(target, key) {
  return (0, _nextCore.optional)('AuthOptions')(target, undefined, 9);
}, _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [typeof _Client.Client === "undefined" ? Object : _Client.Client, typeof _services.Toast === "undefined" ? Object : _services.Toast, typeof _services.Locale === "undefined" ? Object : _services.Locale, typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin, typeof _nextCore.Root === "undefined" ? Object : _nextCore.Root, typeof SDKConfig === "undefined" ? Object : SDKConfig, typeof _RateLimiter.RateLimiter === "undefined" ? Object : _RateLimiter.RateLimiter, typeof _Environment.Environment === "undefined" ? Object : _Environment.Environment, typeof _Analytics.Analytics === "undefined" ? Object : _Analytics.Analytics, typeof AuthOptions === "undefined" ? Object : AuthOptions]), _dec9 = (0, _nextCore.dynamic)('BlockPlugin'), _dec0 = Reflect.metadata("design:type", typeof _plugins.BlockPlugin === "undefined" ? Object : _plugins.BlockPlugin), _dec1 = Reflect.metadata("design:type", String), _dec10 = Reflect.metadata("design:type", Boolean), _dec11 = Reflect.metadata("design:type", typeof Token === "undefined" ? Object : Token), _dec12 = Reflect.metadata("design:type", Function), _dec13 = Reflect.metadata("design:paramtypes", [typeof TokenInfo === "undefined" ? Object : TokenInfo, void 0]), _dec14 = (0, _Analytics.track)(_trackEvents.trackEvents.authentication), _dec15 = Reflect.metadata("design:type", Function), _dec16 = Reflect.metadata("design:paramtypes", [typeof TokenInfo === "undefined" ? Object : TokenInfo]), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", []), _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", []), _dec21 = Reflect.metadata("design:type", Function), _dec22 = Reflect.metadata("design:paramtypes", [typeof TokenInfo === "undefined" ? Object : TokenInfo]), _dec23 = Reflect.metadata("design:type", Function), _dec24 = Reflect.metadata("design:paramtypes", [Boolean]), _dec25 = Reflect.metadata("design:type", Function), _dec26 = Reflect.metadata("design:paramtypes", []), _dec27 = Reflect.metadata("design:type", Function), _dec28 = Reflect.metadata("design:paramtypes", []), _dec29 = Reflect.metadata("design:type", Function), _dec30 = Reflect.metadata("design:paramtypes", []), _dec31 = Reflect.metadata("design:type", Function), _dec32 = Reflect.metadata("design:paramtypes", []), _dec33 = (0, _Analytics.track)(_trackEvents.trackEvents.logout), _dec34 = Reflect.metadata("design:type", Function), _dec35 = Reflect.metadata("design:paramtypes", []), _dec36 = Reflect.metadata("design:type", Function), _dec37 = Reflect.metadata("design:paramtypes", [Object]), _dec38 = (0, _nextCore.dynamic)('BrowserLogger'), _dec39 = Reflect.metadata("design:type", typeof BrowserLogger === "undefined" ? Object : BrowserLogger), _dec40 = (0, _nextCore.delegate)('server'), _dec41 = Reflect.metadata("design:type", Function), _dec42 = Reflect.metadata("design:paramtypes", [typeof Partial === "undefined" ? Object : Partial]), _dec43 = (0, _nextCore.delegate)('server'), _dec44 = Reflect.metadata("design:type", Function), _dec45 = Reflect.metadata("design:paramtypes", []), _dec46 = (0, _nextCore.delegate)('server'), _dec47 = Reflect.metadata("design:type", Function), _dec48 = Reflect.metadata("design:paramtypes", [typeof LoginUrlOptions === "undefined" ? Object : LoginUrlOptions]), _dec49 = (0, _nextCore.delegate)('server'), _dec50 = Reflect.metadata("design:type", Function), _dec51 = Reflect.metadata("design:paramtypes", [typeof AuthLogoutOptions === "undefined" ? Object : AuthLogoutOptions]), _dec52 = (0, _nextCore.delegate)('server'), _dec53 = Reflect.metadata("design:type", Function), _dec54 = Reflect.metadata("design:paramtypes", [Object]), _dec55 = (0, _nextCore.delegate)('server'), _dec56 = Reflect.metadata("design:type", Function), _dec57 = Reflect.metadata("design:paramtypes", []), _dec58 = (0, _nextCore.delegate)('server'), _dec59 = Reflect.metadata("design:type", Function), _dec60 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function Auth(_client, _toast, _locale, _storage, _root, _sdkConfig, _rateLimiter, _environment, _analytics, _authOptions) {
    var _this$_authOptions;
    var _this;
    _classCallCheck(this, Auth);
    _this = _callSuper(this, Auth);
    _this._client = _client;
    _this._toast = _toast;
    _this._locale = _locale;
    _this._storage = _storage;
    _this._root = _root;
    _this._sdkConfig = _sdkConfig;
    _this._rateLimiter = _rateLimiter;
    _this._environment = _environment;
    _this._analytics = _analytics;
    _this._authOptions = _authOptions;
    _initializerDefineProperty(_this, "_block", _descriptor, _this);
    /**
     * Observable that emits the owner ID when it changes
     * @type {Observable<string>}
     */
    _this.ownerId$ = _this.ready$.pipe((0, _rxjs.switchMap)(function () {
      return (0, _nextCore.fromWatchValue)(_this, function () {
        return _this.ownerId || null;
      });
    }));
    /**
     * Indicates if the user is currently logged in
     * @type {boolean}
     */
    _this.notLoggedIn$ = (0, _nextCore.fromWatchValue)(_this, function () {
      return _this.notLoggedIn;
    }).pipe((0, _rxjs.filter)(Boolean));
    /**
     * Observable that emits the login status
     * @type {Observable<boolean>}
     */
    _this.loggedIn$ = (0, _nextCore.fromWatchValue)(_this, function () {
      return _this.loggedIn;
    });
    /**
     * Observable that emits the login status
     * @type {Observable<boolean>}
     */
    _this.isLoggedIn$ = _this.loggedIn$.pipe((0, _rxjs.filter)(Boolean));
    /**
     * Observable that emits when the user logs out.
     * It is created by piping the `isLoggedIn$` observable into `switchMap` and then into `notLoggedIn$`.
     * @type {Observable<void>}
     */
    _this.afterLogout$ = _this.isLoggedIn$.pipe((0, _rxjs.switchMap)(function () {
      return _this.notLoggedIn$;
    }));
    _this.beforeLogout$ = _this.isLoggedIn$.pipe((0, _rxjs.switchMap)(function () {
      return (0, _nextCore.fromWatchValue)(_this, function () {
        return _this.loginStatus === _loginStatus.loginStatus.beforeLogout;
      }).pipe((0, _rxjs.filter)(Boolean));
    }));
    _this._loggedIn = false;
    _this._beforeLogoutHandlers = new Set();
    _this._afterLoggedInHandlers = new Set();
    _this._onRefreshErrorHandlers = new Set();
    _this._onEnsureLoggedInFail = void 0;
    _this._unbindEvents = void 0;
    _this._lastEnvironmentCounter = 0;
    /**
     * emit event when sdk refresh error, like refresh token expired
     */
    _this.refreshError$ = new _rxjs.Subject();
    /**
     * emit when request error
     */
    _this.requestError$ = new _rxjs.Subject();
    _this.refreshTokenHelper = (0, _createRefreshTokenHelper.createRefreshTokenHelper)(function () {
      return _this._client.service.platform();
    }, _nextCore.logger);
    /**
     * Current login status
     * @type {loginStatus}
     */
    _initializerDefineProperty(_this, "loginStatus", _descriptor2, _this);
    /**
     * Indicates if the current login is a fresh login (not a token refresh)
     * @type {boolean|null}
     */
    _initializerDefineProperty(_this, "isFreshLogin", _descriptor3, _this);
    /**
     * Current auth token information
     * @type {TokenInfo}
     */
    _initializerDefineProperty(_this, "token", _descriptor4, _this);
    _initializerDefineProperty(_this, "_triggerSyncToken", _descriptor5, _this);
    _initializerDefineProperty(_this, "_browserLogger", _descriptor6, _this);
    _this._logBeforeRequest = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(request) {
        var _this$_browserLogger;
        var log, _t, _t2, _t3, _t4;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if ((_this$_browserLogger = _this._browserLogger) === null || _this$_browserLogger === void 0 ? void 0 : _this$_browserLogger.enabled) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              _t = (0, _uuid.v4)();
              _t2 = Date.now();
              _t3 = extractHeaders(request);
              _context.n = 2;
              return extractBody(request);
            case 2:
              _t4 = _context.v;
              log = {
                id: _t,
                startTime: _t2,
                requestHeaders: _t3,
                requestBody: _t4
              };
              request[REQUEST_LOG_KEY] = log;
              _this.logger.log('beforeRequest', request.method, request.url, log);
            case 3:
              return _context.a(2);
          }
        }, _callee);
      }));
      return function (_x2) {
        return _ref.apply(this, arguments);
      };
    }();
    _this._logRequest = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(request, response, requestError) {
        var _this$_browserLogger2, _request$REQUEST_LOG_;
        var log, _t5, _t6, _t7, _t8, _t9;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if ((_this$_browserLogger2 = _this._browserLogger) === null || _this$_browserLogger2 === void 0 ? void 0 : _this$_browserLogger2.enabled) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              if (!((_request$REQUEST_LOG_ = request === null || request === void 0 ? void 0 : request[REQUEST_LOG_KEY]) !== null && _request$REQUEST_LOG_ !== void 0)) {
                _context2.n = 2;
                break;
              }
              _t5 = _request$REQUEST_LOG_;
              _context2.n = 4;
              break;
            case 2:
              _t6 = (0, _uuid.v4)();
              _t7 = undefined;
              _t8 = extractHeaders(request);
              _context2.n = 3;
              return extractBody(request);
            case 3:
              _t9 = _context2.v;
              _t5 = {
                id: _t6,
                startTime: _t7,
                requestHeaders: _t8,
                requestBody: _t9
              };
            case 4:
              log = _t5;
              log.endTime = Date.now();
              log.duration = log.startTime ? log.endTime - log.startTime : undefined;
              log.responseHeaders = extractHeaders(response);
              _context2.n = 5;
              return extractBody(response);
            case 5:
              log.responseBody = _context2.v;
              if (requestError) {
                log.requestError = requestError;
              }
              // some mocks may not have response in tests
              log.status = response === null || response === void 0 ? void 0 : response.status;
              _this.logger.log("afterRequest ".concat(log.duration, "ms"), request === null || request === void 0 ? void 0 : request.method, request === null || request === void 0 ? void 0 : request.url, log);
            case 6:
              return _context2.a(2);
          }
        }, _callee2);
      }));
      return function (_x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
      };
    }();
    if (!((_this$_authOptions = _this._authOptions) === null || _this$_authOptions === void 0 ? void 0 : _this$_authOptions.disabledAutoStorageUserId)) {
      _this._storage.getUserId = function () {
        return _this.ownerId;
      };
    }
    _this.requestError$.pipe((0, _rxjs.tap)(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        reason = _ref4[0],
        error = _ref4[1];
      return _this.logger.error('auth requestError', reason, error);
    }), _this._root.takeUntilAppDestroy).subscribe();
    _this.refreshError$.pipe((0, _rxjs.tap)(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
        reason = _ref6[0],
        error = _ref6[1];
      return _this.logger.error('token refreshError', reason, error);
    }), _this._root.takeUntilAppDestroy).subscribe();
    if (process.env.THEME_SYSTEM === 'spring-ui') {
      _this.afterLogout$.pipe((0, _rxjs.tap)(function () {
        _this._root.setExpanded(false);
      }), _this._root.takeUntilAppDestroy).subscribe();
    }
    return _this;
  }
  _inherits(Auth, _RcModule);
  return _createClass(Auth, [{
    key: "_setToken",
    value: function _setToken(token) {
      var triggerSyncToken = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.token = {
        ownerId: token.owner_id,
        endpointId: token.endpoint_id,
        accessToken: token.access_token,
        tokenType: token.token_type,
        expireTime: token.expire_time,
        expiresIn: token.expires_in,
        scope: token.scope
      };
      this._triggerSyncToken = triggerSyncToken;
    }
  }, {
    key: "setLoginSuccess",
    value: function setLoginSuccess(token) {
      this.loginStatus = _loginStatus.loginStatus.loggedIn;
      this._setToken(token);
    }
  }, {
    key: "setLoginError",
    value: function setLoginError() {
      this.loginStatus = _loginStatus.loginStatus.notLoggedIn;
      this._setToken({});
      this.isFreshLogin = null;
    }
  }, {
    key: "setLogoutSuccess",
    value: function setLogoutSuccess() {
      this.loginStatus = _loginStatus.loginStatus.notLoggedIn;
      this._setToken({});
      this.isFreshLogin = null;
    }
  }, {
    key: "setRefreshSuccess",
    value: function setRefreshSuccess(token) {
      this.loginStatus = _loginStatus.loginStatus.loggedIn;
      this._setToken(token);
    }
  }, {
    key: "setRefreshError",
    value: function setRefreshError(refreshTokenValid) {
      this.isFreshLogin = null;
      if (!refreshTokenValid) {
        this._setToken({});
        this.logger.error('setRefreshError set to not logged in');
        this.loginStatus = _loginStatus.loginStatus.notLoggedIn;
      }
    }
  }, {
    key: "setLogoutError",
    value: function setLogoutError() {
      this.loginStatus = _loginStatus.loginStatus.notLoggedIn;
      this._setToken({});
      this.isFreshLogin = null;
    }
  }, {
    key: "setLogin",
    value: function setLogin() {
      this.loginStatus = _loginStatus.loginStatus.loggingIn;
      this.isFreshLogin = true;
    }
  }, {
    key: "setBeforeLogout",
    value: function setBeforeLogout() {
      this.logger.log('setBeforeLogout');
      this.loginStatus = _loginStatus.loginStatus.beforeLogout;
    }
  }, {
    key: "setCancelLogout",
    value: function setCancelLogout() {
      this.loginStatus = _loginStatus.loginStatus.loggedIn;
    }
  }, {
    key: "setLogout",
    value: function setLogout() {
      this.loginStatus = _loginStatus.loginStatus.loggingOut;
    }
  }, {
    key: "setInitLogin",
    value: function setInitLogin(_ref7) {
      var loggedIn = _ref7.loggedIn,
        token = _ref7.token;
      this.loginStatus = loggedIn ? _loginStatus.loginStatus.loggedIn : _loginStatus.loginStatus.notLoggedIn;
      this.logger.log("setInitLogin loginStatus to: ".concat(this.loginStatus));
      this.isFreshLogin = loggedIn ? false : null;
      this._setToken(token !== null && token !== void 0 ? token : {}, false);
    }
  }, {
    key: "_bindEvents",
    value: function _bindEvents() {
      var _this2 = this;
      if (this._unbindEvents) this._unbindEvents();
      var platform = this._client.service.platform();
      var client = this._client.service.client();
      var onLoginSuccess = /*#__PURE__*/function () {
        var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var token, handlers, _iterator, _step, handler;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                _context3.n = 1;
                return platform.auth().data();
              case 1:
                token = _context3.v;
                _this2.setLoginSuccess(token);
                handlers = _toConsumableArray(_this2._afterLoggedInHandlers);
                _iterator = _createForOfIteratorHelper(handlers);
                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    handler = _step.value;
                    handler();
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
              case 2:
                return _context3.a(2);
            }
          }, _callee3);
        }));
        return function onLoginSuccess() {
          return _ref8.apply(this, arguments);
        };
      }();
      var onLoginError = function onLoginError() {
        _this2.setLoginError();
      };
      var onLogoutSuccess = function onLogoutSuccess() {
        _this2.setLogoutSuccess();
      };
      var onLogoutError = function onLogoutError() {
        _this2.logger.log('onLogoutError');
        platform._cache.clean();
        _this2.setLogoutError();
      };
      var onRefreshSuccess = /*#__PURE__*/function () {
        var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          var token;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                _context4.n = 1;
                return platform.auth().data();
              case 1:
                token = _context4.v;
                _this2.setRefreshSuccess(token);
              case 2:
                return _context4.a(2);
            }
          }, _callee4);
        }));
        return function onRefreshSuccess() {
          return _ref9.apply(this, arguments);
        };
      }();
      var onRefreshError = /*#__PURE__*/function () {
        var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(error) {
          var _error$request, _error$response;
          var _yield$_this2$refresh, refreshTokenValid, resStatus, handlers, results, expired;
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.n) {
              case 0:
                _this2.logger.error('refresh token error', error === null || error === void 0 ? void 0 : (_error$request = error.request) === null || _error$request === void 0 ? void 0 : _error$request.url, error === null || error === void 0 ? void 0 : error.message, error === null || error === void 0 ? void 0 : (_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status);
                // user is still considered logged in if the refreshToken is still valid
                _context6.n = 1;
                return _this2.refreshTokenHelper.getRefreshTokenState(error);
              case 1:
                _yield$_this2$refresh = _context6.v;
                refreshTokenValid = _yield$_this2$refresh.refreshTokenValid;
                resStatus = _yield$_this2$refresh.resStatus;
                _this2.logger.log('RefreshTokenValid:', refreshTokenValid);
                handlers = _toConsumableArray(_this2._onRefreshErrorHandlers);
                _context6.n = 2;
                return Promise.allSettled(handlers.map(/*#__PURE__*/function () {
                  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(handler) {
                    return _regenerator().w(function (_context5) {
                      while (1) switch (_context5.n) {
                        case 0:
                          _context5.n = 1;
                          return handler(refreshTokenValid);
                        case 1:
                          return _context5.a(2, _context5.v);
                      }
                    }, _callee5);
                  }));
                  return function (_x7) {
                    return _ref1.apply(this, arguments);
                  };
                }()));
              case 2:
                results = _context6.v;
                results.forEach(function (x) {
                  if (x.status === 'rejected') {
                    _this2.logger.warn('Trigger [RefreshErrorHandler] failed', x.reason);
                  }
                });
                _this2.setRefreshError(refreshTokenValid);
                _context6.n = 3;
                return _this2.refreshTokenHelper.processRefreshError({
                  error: error,
                  refreshTokenValid: refreshTokenValid,
                  resStatus: resStatus,
                  onSessionExpired: function onSessionExpired() {
                    _this2.refreshError$.next(['expired', error]);
                    (0, _Analytics.trackEvent)('Int_signOut', {
                      signOutSource: 'Token expired'
                    });
                    _this2._toast.danger({
                      message: (0, _i18n.t)('sessionExpired'),
                      ttl: 0
                    });
                  }
                });
              case 3:
                expired = _context6.v;
                if (!expired) {
                  _this2.refreshError$.next(['others', error]);
                  _this2.logger.error('refresh token error', error);
                }
              case 4:
                return _context6.a(2);
            }
          }, _callee6);
        }));
        return function onRefreshError(_x6) {
          return _ref0.apply(this, arguments);
        };
      }();
      var onBeforeRequest = /*#__PURE__*/function () {
        var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(request) {
          return _regenerator().w(function (_context7) {
            while (1) switch (_context7.n) {
              case 0:
                _context7.n = 1;
                return _this2._logBeforeRequest(request);
              case 1:
                return _context7.a(2);
            }
          }, _callee7);
        }));
        return function onBeforeRequest(_x8) {
          return _ref10.apply(this, arguments);
        };
      }();
      var onRequestSuccess = /*#__PURE__*/function () {
        var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(response, request) {
          return _regenerator().w(function (_context8) {
            while (1) switch (_context8.n) {
              case 0:
                _context8.n = 1;
                return _this2._logRequest(request, response);
              case 1:
                return _context8.a(2);
            }
          }, _callee8);
        }));
        return function onRequestSuccess(_x9, _x0) {
          return _ref11.apply(this, arguments);
        };
      }();
      var onRequestError = /*#__PURE__*/function () {
        var _ref12 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(error) {
          var matches, logoutRequired, messages;
          return _regenerator().w(function (_context9) {
            while (1) switch (_context9.n) {
              case 0:
                if (!(process.env.THEME_SYSTEM === 'spring-ui')) {
                  _context9.n = 1;
                  break;
                }
                _this2.logger.log('onRequestError', error);
                _context9.n = 2;
                break;
              case 1:
                _context9.n = 2;
                return _this2._logRequest(error.request, error.response, error.message);
              case 2:
                _context9.n = 3;
                return (0, _authErrors.matchKnownRequestErrors)(error, _this2.authErrors);
              case 3:
                matches = _context9.v;
                // logout solution
                logoutRequired = matches.some(function (_ref13) {
                  var _ref14 = _slicedToArray(_ref13, 3),
                    _0 = _ref14[0],
                    _1 = _ref14[1],
                    solutions = _ref14[2];
                  return solutions === null || solutions === void 0 ? void 0 : solutions.logout;
                });
                if (!(logoutRequired && _this2.loginStatus === _loginStatus.loginStatus.loggedIn)) {
                  _context9.n = 4;
                  break;
                }
                _context9.n = 4;
                return _this2.logout({
                  reason: 'Request error'
                });
              case 4:
                // alert solution
                messages = matches.map(function (_ref15) {
                  var _solutions$message;
                  var _ref16 = _slicedToArray(_ref15, 3),
                    _0 = _ref16[0],
                    _1 = _ref16[1],
                    solutions = _ref16[2];
                  return solutions === null || solutions === void 0 ? void 0 : (_solutions$message = solutions.message) === null || _solutions$message === void 0 ? void 0 : _solutions$message.call(solutions);
                }).filter(function (x) {
                  return !!x;
                });
                messages.forEach(function (message) {
                  _this2._toast.warning({
                    message: message,
                    allowDuplicates: false,
                    ttl: 0
                  });
                });
                // track error
                matches.forEach(function (_ref17) {
                  var _ref18 = _slicedToArray(_ref17, 2),
                    errorCode = _ref18[1];
                  _this2.requestError$.next([errorCode, error]);
                });
                if (logoutRequired) {
                  _this2.requestError$.next(['revoke', error]);
                } else {
                  _this2.requestError$.next(['others', error]);
                }
              case 5:
                return _context9.a(2);
            }
          }, _callee9);
        }));
        return function onRequestError(_x1) {
          return _ref12.apply(this, arguments);
        };
      }();
      platform.addListener(platform.events.loginSuccess, onLoginSuccess);
      platform.addListener(platform.events.loginError, onLoginError);
      platform.addListener(platform.events.logoutSuccess, onLogoutSuccess);
      platform.addListener(platform.events.logoutError, onLogoutError);
      platform.addListener(platform.events.refreshSuccess, onRefreshSuccess);
      platform.addListener(platform.events.refreshError, onRefreshError);
      client.addListener(client.events.beforeRequest, onBeforeRequest);
      client.addListener(client.events.requestSuccess, onRequestSuccess);
      client.addListener(client.events.requestError, onRequestError);
      this._unbindEvents = function () {
        platform.removeListener(platform.events.loginSuccess, onLoginSuccess);
        platform.removeListener(platform.events.loginError, onLoginError);
        platform.removeListener(platform.events.logoutSuccess, onLogoutSuccess);
        platform.removeListener(platform.events.logoutError, onLogoutError);
        platform.removeListener(platform.events.refreshSuccess, onRefreshSuccess);
        platform.removeListener(platform.events.refreshError, onRefreshError);
        client.removeListener(client.events.beforeRequest, onBeforeRequest);
        client.removeListener(client.events.requestSuccess, onRequestSuccess);
        client.removeListener(client.events.requestError, onRequestError);
      };
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this.pending && this._locale.ready && (!this._environment || this._environment.ready);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return this.ready && (!this._locale.ready || !(!this._environment || this._environment.ready));
    }
  }, {
    key: "onStateChange",
    value: function () {
      var _onStateChange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              if (this.ready && this._environment && this._environment.changeCounter !== this._lastEnvironmentCounter) {
                this._lastEnvironmentCounter = this._environment.changeCounter;
                this._bindEvents();
              }
            case 1:
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function onStateChange() {
        return _onStateChange.apply(this, arguments);
      }
      return onStateChange;
    }()
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
        var _this3 = this;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              _context1.n = 1;
              return this.refreshTokenHelper.loggedIn(function (result) {
                if (!(result === null || result === void 0 ? void 0 : result.refreshTokenValid)) {
                  var _this3$_onEnsureLogge;
                  // track refresh token invalid logout actions
                  (_this3$_onEnsureLogge = _this3._onEnsureLoggedInFail) === null || _this3$_onEnsureLogge === void 0 ? void 0 : _this3$_onEnsureLogge.call(_this3, result);
                }
              });
            case 1:
              this._loggedIn = _context1.v;
              this.logger.log("Auth::onInit, checked is loggedIn: ".concat(this._loggedIn));
              this._bindEvents();

              // must check token from storage before that module ready, put that inside onInit lifeCycle
              _context1.n = 2;
              return this.fetchToken();
            case 2:
              return _context1.a(2);
          }
        }, _callee1, this);
      }));
      function onInit() {
        return _onInit.apply(this, arguments);
      }
      return onInit;
    }()
  }, {
    key: "fetchToken",
    value: function () {
      var _fetchToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        var platform, token, _t0;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              platform = this._client.service.platform();
              if (!this._loggedIn) {
                _context10.n = 2;
                break;
              }
              _context10.n = 1;
              return platform.auth().data();
            case 1:
              _t0 = _context10.v;
              _context10.n = 3;
              break;
            case 2:
              _t0 = null;
            case 3:
              token = _t0;
              this.setInitLogin({
                loggedIn: this._loggedIn,
                token: token
              });
            case 4:
              return _context10.a(2);
          }
        }, _callee10, this);
      }));
      function fetchToken() {
        return _fetchToken.apply(this, arguments);
      }
      return fetchToken;
    }()
    /**
     * Gets the user's owner ID (usually the extension ID)
     * @type {string}
     */
  }, {
    key: "ownerId",
    get: function get() {
      return this.token.ownerId;
    }

    /**
     * Gets the endpoint ID from the token
     * @type {string}
     */
  }, {
    key: "endpointId",
    get: function get() {
      return this.token.endpointId;
    }

    /**
     * Gets the access token for API calls
     * @type {string}
     */
  }, {
    key: "accessToken",
    get: function get() {
      return this.token.accessToken;
    }

    /**
     * @description Login either with username/password or with authorization code
     */
  }, {
    key: "login",
    value: (function () {
      var _login = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(_ref19) {
        var username, password, extension, remember, code, redirectUri, accessToken, expiresIn, endpointId, tokenType, scope, tokenUri, discoveryUri, ownerId, extensionData;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              username = _ref19.username, password = _ref19.password, extension = _ref19.extension, remember = _ref19.remember, code = _ref19.code, redirectUri = _ref19.redirectUri, accessToken = _ref19.accessToken, expiresIn = _ref19.expiresIn, endpointId = _ref19.endpointId, tokenType = _ref19.tokenType, scope = _ref19.scope, tokenUri = _ref19.tokenUri, discoveryUri = _ref19.discoveryUri;
              this.setLogin();
              if (!accessToken) {
                _context11.n = 3;
                break;
              }
              _context11.n = 1;
              return this._client.service.platform().auth().setData({
                token_type: tokenType,
                access_token: accessToken,
                expires_in: expiresIn,
                refresh_token_expires_in: expiresIn,
                scope: scope
              });
            case 1:
              _context11.n = 2;
              return this._client.account().extension().get();
            case 2:
              extensionData = _context11.v;
              ownerId = extensionData.id;
            case 3:
              // TODO: support to set redirectUri in js sdk v4 login function
              if (redirectUri) {
                this._client.confirmRedirectUri(redirectUri);
              }
              return _context11.a(2, this._client.service.platform().login({
                username: username,
                password: password,
                extension: extension,
                remember: remember,
                code: code,
                redirectUri: redirectUri,
                endpoint_id: endpointId,
                expires_in: expiresIn,
                access_token: accessToken,
                token_type: tokenType,
                owner_id: ownerId,
                token_uri: tokenUri,
                discovery_uri: discoveryUri
              }));
          }
        }, _callee11, this);
      }));
      function login(_x10) {
        return _login.apply(this, arguments);
      }
      return login;
    }())
  }, {
    key: "refreshToken",
    value: function () {
      var _refreshToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
        var token;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              _context12.n = 1;
              return this._client.service.platform().refresh().then(function (response) {
                return response.json();
              });
            case 1:
              token = _context12.v;
              return _context12.a(2, token);
          }
        }, _callee12, this);
      }));
      function refreshToken() {
        return _refreshToken.apply(this, arguments);
      }
      return refreshToken;
    }()
  }, {
    key: "getLoginUrl",
    value: function () {
      var _getLoginUrl = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(_ref20) {
        var redirectUri, force, _ref20$implicit, implicit, options;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              redirectUri = _ref20.redirectUri, force = _ref20.force, _ref20$implicit = _ref20.implicit, implicit = _ref20$implicit === void 0 ? false : _ref20$implicit, options = _objectWithoutProperties(_ref20, _excluded);
              // TODO: support to set redirectUri in js sdk v4 login function
              if (redirectUri) {
                this._client.confirmRedirectUri(redirectUri);
              }
              return _context13.a(2, "".concat(this._client.service.platform().loginUrl(_objectSpread(_objectSpread({}, options), {}, {
                redirectUri: redirectUri,
                implicit: implicit,
                usePKCE: this.usePKCE
              }))).concat(force ? '&force=true' : ''));
          }
        }, _callee13, this);
      }));
      function getLoginUrl(_x11) {
        return _getLoginUrl.apply(this, arguments);
      }
      return getLoginUrl;
    }()
    /**
     * @description Triggers the beforeLogoutHandlers to run
     *  and then proceed to logout from ringcentral.
     */
  }, {
    key: "logout",
    value: (function () {
      var _logout = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(_ref21) {
        var _this4 = this;
        var _ref21$dismissAllAler, dismissAllAlert, _ref21$reason, reason, payload, logout;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.n) {
            case 0:
              _ref21$dismissAllAler = _ref21.dismissAllAlert, dismissAllAlert = _ref21$dismissAllAler === void 0 ? true : _ref21$dismissAllAler, _ref21$reason = _ref21.reason, reason = _ref21$reason === void 0 ? 'Unknown' : _ref21$reason, payload = _ref21.payload;
              this.logger.log('Int.auth.logout is called! Reason=', reason);
              (0, _Analytics.trackEvent)('Int_signOut', {
                signOutSource: reason,
                payload: payload
              });
              logout = /*#__PURE__*/function () {
                var _ref22 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15() {
                  var _this4$_rateLimiter, rateLimiterId, handlers, _iterator2, _step2, _loop, _ret, _t1, _t10;
                  return _regenerator().w(function (_context16) {
                    while (1) switch (_context16.p = _context16.n) {
                      case 0:
                        _this4.setBeforeLogout();
                        if (!dismissAllAlert) {
                          _context16.n = 3;
                          break;
                        }
                        rateLimiterId = (_this4$_rateLimiter = _this4._rateLimiter) === null || _this4$_rateLimiter === void 0 ? void 0 : _this4$_rateLimiter.identifier; // fix bug [https://jira_domain/browse/RCINT-17381]
                        if (!rateLimiterId) {
                          _context16.n = 2;
                          break;
                        }
                        _context16.n = 1;
                        return _this4._toast.dismissAllExpectSpecifiedGroup(rateLimiterId);
                      case 1:
                        _context16.n = 3;
                        break;
                      case 2:
                        _context16.n = 3;
                        return _this4._toast.dismissByGroup('*');
                      case 3:
                        handlers = _toConsumableArray(_this4._beforeLogoutHandlers);
                        _context16.p = 4;
                        _iterator2 = _createForOfIteratorHelper(handlers);
                        _context16.p = 5;
                        _loop = /*#__PURE__*/_regenerator().m(function _loop() {
                          var handler, result;
                          return _regenerator().w(function (_context15) {
                            while (1) switch (_context15.n) {
                              case 0:
                                handler = _step2.value;
                                _context15.n = 1;
                                return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
                                  return _regenerator().w(function (_context14) {
                                    while (1) switch (_context14.n) {
                                      case 0:
                                        return _context14.a(2, handler());
                                    }
                                  }, _callee14);
                                }))();
                              case 1:
                                result = _context15.v;
                                if (!result) {
                                  _context15.n = 2;
                                  break;
                                }
                                _this4.setCancelLogout();
                                return _context15.a(2, {
                                  v: Promise.reject(result)
                                });
                              case 2:
                                return _context15.a(2);
                            }
                          }, _loop);
                        });
                        _iterator2.s();
                      case 6:
                        if ((_step2 = _iterator2.n()).done) {
                          _context16.n = 9;
                          break;
                        }
                        return _context16.d(_regeneratorValues(_loop()), 7);
                      case 7:
                        _ret = _context16.v;
                        if (!_ret) {
                          _context16.n = 8;
                          break;
                        }
                        return _context16.a(2, _ret.v);
                      case 8:
                        _context16.n = 6;
                        break;
                      case 9:
                        _context16.n = 11;
                        break;
                      case 10:
                        _context16.p = 10;
                        _t1 = _context16.v;
                        _iterator2.e(_t1);
                      case 11:
                        _context16.p = 11;
                        _iterator2.f();
                        return _context16.f(11);
                      case 12:
                        _context16.n = 14;
                        break;
                      case 13:
                        _context16.p = 13;
                        _t10 = _context16.v;
                        _this4.logger.error('Auth|Logout error.', _t10);
                      case 14:
                        _this4.setLogout();
                        if (!_this4.isImplicit) {
                          _context16.n = 15;
                          break;
                        }
                        _this4._client.service.platform()._cache.clean();
                        _this4.setLogoutSuccess();
                        return _context16.a(2);
                      case 15:
                        _context16.n = 16;
                        return _this4._client.service.platform().logout();
                      case 16:
                        return _context16.a(2);
                    }
                  }, _callee15, null, [[5, 10, 11, 12], [4, 13]]);
                }));
                return function logout() {
                  return _ref22.apply(this, arguments);
                };
              }(); // in new version app, logout will block the app
              if (!(process.env.THEME_SYSTEM === 'spring-ui' && this._block)) {
                _context17.n = 2;
                break;
              }
              _context17.n = 1;
              return this._block.next(logout);
            case 1:
              _context17.n = 3;
              break;
            case 2:
              _context17.n = 3;
              return logout();
            case 3:
              return _context17.a(2);
          }
        }, _callee16, this);
      }));
      function logout(_x12) {
        return _logout.apply(this, arguments);
      }
      return logout;
    }()
    /**
     * Add handler on "before logout" event
     * - Return anything not empty in the handler to cancel the logout as needed
     * @param handler event handler function
     * @returns cancel current handler, call that will delete the handler from that event
     */
    )
  }, {
    key: "addBeforeLogoutHandler",
    value: function addBeforeLogoutHandler(handler) {
      var _this5 = this;
      this._beforeLogoutHandlers.add(handler);
      return function () {
        _this5.removeBeforeLogoutHandler(handler);
      };
    }

    /**
     * Remove handler from "before logout" event
     * @param handler event handler function
     */
  }, {
    key: "removeBeforeLogoutHandler",
    value: function removeBeforeLogoutHandler(handler) {
      this._beforeLogoutHandlers["delete"](handler);
    }

    /**
     * Add handler on "after logged in" event
     * @param handler event handler function
     * @returns cancel current handler, call that will delete the handler from that event
     */
  }, {
    key: "addAfterLoggedInHandler",
    value: function addAfterLoggedInHandler(handler) {
      var _this6 = this;
      this._afterLoggedInHandlers.add(handler);
      return function () {
        _this6.removeAfterLoggedInHandler(handler);
      };
    }

    /**
     * Remove handler from "after logged in" event
     * @param handler event handler function
     */
  }, {
    key: "removeAfterLoggedInHandler",
    value: function removeAfterLoggedInHandler(handler) {
      this._afterLoggedInHandlers["delete"](handler);
    }

    /**
     * Add handler on "refresh error" event
     * @param handler event handler function
     * @returns cancel current handler, call that will delete the handler from that event
     */
  }, {
    key: "addRefreshErrorHandler",
    value: function addRefreshErrorHandler(handler) {
      var _this7 = this;
      this._onRefreshErrorHandlers.add(handler);
      return function () {
        _this7.removeRefreshErrorHandler(handler);
      };
    }

    /**
     * Remove handler from "refresh error" event
     * @param handler event handler function
     */
  }, {
    key: "removeRefreshErrorHandler",
    value: function removeRefreshErrorHandler(handler) {
      this._onRefreshErrorHandlers["delete"](handler);
    }
  }, {
    key: "refreshImplicitToken",
    value: function () {
      var _refreshImplicitToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(_ref24) {
        var tokenType, accessToken, expiresIn, endpointId, extensionData, ownerId, platform, newAuthData, _t11;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.p = _context18.n) {
            case 0:
              tokenType = _ref24.tokenType, accessToken = _ref24.accessToken, expiresIn = _ref24.expiresIn, endpointId = _ref24.endpointId;
              _context18.p = 1;
              _context18.n = 2;
              return this._client.account().extension().get();
            case 2:
              extensionData = _context18.v;
              ownerId = String(extensionData.id);
              if (!(ownerId !== String(this.ownerId))) {
                _context18.n = 3;
                break;
              }
              return _context18.a(2);
            case 3:
              platform = this._client.service.platform();
              newAuthData = {
                token_type: tokenType,
                access_token: accessToken,
                expires_in: expiresIn,
                refresh_token_expires_in: expiresIn,
                endpoint_id: endpointId
              };
              _context18.n = 4;
              return platform.auth().setData(newAuthData);
            case 4:
              platform.emit(platform.events.refreshSuccess, newAuthData);
              _context18.n = 6;
              break;
            case 5:
              _context18.p = 5;
              _t11 = _context18.v;
              this.logger.error('refreshImplicitToken error:', _t11);
            case 6:
              return _context18.a(2);
          }
        }, _callee17, this, [[1, 5]]);
      }));
      function refreshImplicitToken(_x13) {
        return _refreshImplicitToken.apply(this, arguments);
      }
      return refreshImplicitToken;
    }()
  }, {
    key: "checkIsLoggedIn",
    value: function () {
      var _checkIsLoggedIn = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18() {
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.n) {
            case 0:
              _context19.n = 1;
              return this._client.service.platform().loggedIn();
            case 1:
              return _context19.a(2, this.loginStatus === _loginStatus.loginStatus.loggedIn);
          }
        }, _callee18, this);
      }));
      function checkIsLoggedIn() {
        return _checkIsLoggedIn.apply(this, arguments);
      }
      return checkIsLoggedIn;
    }()
    /**
     * Ensures the access token is valid by checking and refreshing if necessary
     * This method should be used before directly accessing this.accessToken
     * @throws {Error} If token validation fails and logout is required
     */
  }, {
    key: "ensureValidAccessToken",
    value: (function () {
      var _ensureValidAccessToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19() {
        var isValidToken, _t12, _t13;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.p = _context20.n) {
            case 0:
              _context20.p = 0;
              if (this.loggedIn) {
                _context20.n = 1;
                break;
              }
              this.logger.error('[Auth] User is not logged in, cannot proceed');
              throw new Error('User is not authenticated');
            case 1:
              _context20.n = 2;
              return this.checkIsLoggedIn();
            case 2:
              isValidToken = _context20.v;
              if (isValidToken) {
                _context20.n = 7;
                break;
              }
              // Try to refresh the token
              this.logger.log('[Auth] Token appears invalid, attempting refresh');
              _context20.p = 3;
              _context20.n = 4;
              return this.refreshToken();
            case 4:
              this.logger.log('[Auth] Token refreshed successfully');
              _context20.n = 7;
              break;
            case 5:
              _context20.p = 5;
              _t12 = _context20.v;
              // If refresh fails, trigger logout
              this.logger.error('[Auth] Token refresh failed, triggering logout', _t12);
              _context20.n = 6;
              return this.logout({
                reason: 'Token expired'
              });
            case 6:
              throw new Error('Authentication failed, user has been logged out');
            case 7:
              this.logger.log('[Auth] Access token is valid');
              _context20.n = 9;
              break;
            case 8:
              _context20.p = 8;
              _t13 = _context20.v;
              this.logger.error('[Auth] Error in token validation:', _t13);
              throw _t13;
            case 9:
              return _context20.a(2);
          }
        }, _callee19, this, [[3, 5], [0, 8]]);
      }));
      function ensureValidAccessToken() {
        return _ensureValidAccessToken.apply(this, arguments);
      }
      return ensureValidAccessToken;
    }()
    /**
     * the user is loggedIn, both `loggedIn` and `beforeLogout` be true
     */
    )
  }, {
    key: "loggedIn",
    get: function get() {
      return this.loginStatus === _loginStatus.loginStatus.loggedIn || this.loginStatus === _loginStatus.loginStatus.beforeLogout;
    }
  }, {
    key: "notLoggedIn",
    get: function get() {
      return this.loginStatus === _loginStatus.loginStatus.notLoggedIn;
    }
  }, {
    key: "isImplicit",
    get: function get() {
      var _this$_client$service;
      return !(this.usePKCE || ((_this$_client$service = this._client.service.platform()._clientSecret) === null || _this$_client$service === void 0 ? void 0 : _this$_client$service.length) > 0);
    }
  }, {
    key: "usePKCE",
    get: function get() {
      var _this$_authOptions$us, _this$_authOptions2;
      return (_this$_authOptions$us = (_this$_authOptions2 = this._authOptions) === null || _this$_authOptions2 === void 0 ? void 0 : _this$_authOptions2.usePKCE) !== null && _this$_authOptions$us !== void 0 ? _this$_authOptions$us : false;
    }
  }, {
    key: "authErrors",
    get: function get() {
      var _this$_authOptions3;
      var additionalAuthErrors = (_this$_authOptions3 = this._authOptions) === null || _this$_authOptions3 === void 0 ? void 0 : _this$_authOptions3.additionalAuthErrors;
      return additionalAuthErrors ? _objectSpread(_objectSpread({}, _authErrors.AUTH_ERRORS), additionalAuthErrors) : _authErrors.AUTH_ERRORS;
    }
  }, {
    key: "_generateAuthCode",
    value: function () {
      var _generateAuthCode2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(clientId) {
        var ttl,
          resp,
          _yield$resp$json,
          code,
          _args21 = arguments,
          _t14;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              ttl = _args21.length > 1 && _args21[1] !== undefined ? _args21[1] : 180;
              _context21.p = 1;
              _context21.n = 2;
              return this._client.service.platform().post('/restapi/v1.0/interop/generate-code', {
                ttl: ttl,
                clientId: clientId
              });
            case 2:
              resp = _context21.v;
              _context21.n = 3;
              return resp.json();
            case 3:
              _yield$resp$json = _context21.v;
              code = _yield$resp$json.code;
              return _context21.a(2, code);
            case 4:
              _context21.p = 4;
              _t14 = _context21.v;
              this.logger.error('generateAuthCode fail', _t14);
              throw _t14;
            case 5:
              return _context21.a(2);
          }
        }, _callee20, this, [[1, 4]]);
      }));
      function _generateAuthCode(_x14) {
        return _generateAuthCode2.apply(this, arguments);
      }
      return _generateAuthCode;
    }()
  }, {
    key: "_getDiscoveryData",
    value: function () {
      var _getDiscoveryData2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21() {
        var tokenUri, discoveryUri, _platform$discovery, platform, discoveryData, _platform$discovery2, _platform$discovery4, _platform$discovery3, initialDiscoveryData, _t15;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              _context22.p = 0;
              platform = this._client.service.platform();
              _context22.n = 1;
              return (_platform$discovery = platform.discovery()) === null || _platform$discovery === void 0 ? void 0 : _platform$discovery.externalData();
            case 1:
              discoveryData = _context22.v;
              if (!discoveryData) {
                _context22.n = 2;
                break;
              }
              tokenUri = discoveryData.authApi.tokenUri;
              discoveryUri = discoveryData.discoveryApi.externalUri;
              _context22.n = 5;
              break;
            case 2:
              if (!((_platform$discovery2 = platform.discovery()) === null || _platform$discovery2 === void 0 ? void 0 : _platform$discovery2._discoveryInitPromise)) {
                _context22.n = 3;
                break;
              }
              _context22.n = 3;
              return (_platform$discovery3 = platform.discovery()) === null || _platform$discovery3 === void 0 ? void 0 : _platform$discovery3._discoveryInitPromise;
            case 3:
              _context22.n = 4;
              return (_platform$discovery4 = platform.discovery()) === null || _platform$discovery4 === void 0 ? void 0 : _platform$discovery4.initialData();
            case 4:
              initialDiscoveryData = _context22.v;
              if (initialDiscoveryData) {
                tokenUri = initialDiscoveryData.authApi.defaultTokenUri;
                discoveryUri = initialDiscoveryData.discoveryApi.defaultExternalUri;
              }
            case 5:
              _context22.n = 7;
              break;
            case 6:
              _context22.p = 6;
              _t15 = _context22.v;
              this.logger.error('get discovery endpoint error', _t15);
            case 7:
              return _context22.a(2, {
                tokenUri: tokenUri,
                discoveryUri: discoveryUri
              });
          }
        }, _callee21, this, [[0, 6]]);
      }));
      function _getDiscoveryData() {
        return _getDiscoveryData2.apply(this, arguments);
      }
      return _getDiscoveryData;
    }()
  }, {
    key: "getAuthCode",
    value: function getAuthCode() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.getAuthCodeForClient(this._sdkConfig.clientId, options);
    }
  }, {
    key: "getAuthCodeForClient",
    value: function () {
      var _getAuthCodeForClient = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(clientId) {
        var _ref25,
          _ref25$discovery,
          discovery,
          code,
          _yield$this$_getDisco,
          tokenUri,
          discoveryUri,
          _args23 = arguments;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.n) {
            case 0:
              _ref25 = _args23.length > 1 && _args23[1] !== undefined ? _args23[1] : {}, _ref25$discovery = _ref25.discovery, discovery = _ref25$discovery === void 0 ? true : _ref25$discovery;
              _context23.n = 1;
              return this._generateAuthCode(clientId);
            case 1:
              code = _context23.v;
              if (!discovery) {
                _context23.n = 3;
                break;
              }
              _context23.n = 2;
              return this._getDiscoveryData();
            case 2:
              _yield$this$_getDisco = _context23.v;
              tokenUri = _yield$this$_getDisco.tokenUri;
              discoveryUri = _yield$this$_getDisco.discoveryUri;
              return _context23.a(2, {
                code: code,
                tokenUri: tokenUri,
                discoveryUri: discoveryUri
              });
            case 3:
              return _context23.a(2, {
                code: code,
                tokenUri: undefined,
                discoveryUri: undefined
              });
          }
        }, _callee22, this);
      }));
      function getAuthCodeForClient(_x15) {
        return _getAuthCodeForClient.apply(this, arguments);
      }
      return getAuthCodeForClient;
    }()
    /**
     * Gets the profile image URL synchronously
     * @returns {string|null} The profile image URL or null
     */
  }, {
    key: "getProfileImageSync",
    value: function getProfileImageSync(profileImage, size) {
      return (0, _getProfileImage.getProfileImage)({
        profileImage: profileImage,
        accessToken: this.accessToken,
        size: size
      });
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_block", [_dec9, _dec0], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "loginStatus", [_nextCore.state, _dec1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "isFreshLogin", [_nextCore.state, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "token", [_nextCore.state, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_triggerSyncToken", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setToken", [_nextCore.action, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "_setToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLoginSuccess", [_dec14, _nextCore.action, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "setLoginSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLoginError", [_nextCore.action, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "setLoginError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLogoutSuccess", [_nextCore.action, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "setLogoutSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setRefreshSuccess", [_nextCore.action, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "setRefreshSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setRefreshError", [_nextCore.action, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "setRefreshError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLogoutError", [_nextCore.action, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "setLogoutError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLogin", [_nextCore.action, _dec27, _dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "setLogin"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setBeforeLogout", [_nextCore.action, _dec29, _dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "setBeforeLogout"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCancelLogout", [_nextCore.action, _dec31, _dec32], Object.getOwnPropertyDescriptor(_class2.prototype, "setCancelLogout"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLogout", [_dec33, _nextCore.action, _dec34, _dec35], Object.getOwnPropertyDescriptor(_class2.prototype, "setLogout"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setInitLogin", [_nextCore.action, _dec36, _dec37], Object.getOwnPropertyDescriptor(_class2.prototype, "setInitLogin"), _class2.prototype), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_browserLogger", [_dec38, _dec39], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "login", [_dec40, _dec41, _dec42], Object.getOwnPropertyDescriptor(_class2.prototype, "login"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "refreshToken", [_dec43, _dec44, _dec45], Object.getOwnPropertyDescriptor(_class2.prototype, "refreshToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getLoginUrl", [_dec46, _dec47, _dec48], Object.getOwnPropertyDescriptor(_class2.prototype, "getLoginUrl"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "logout", [_dec49, _dec50, _dec51], Object.getOwnPropertyDescriptor(_class2.prototype, "logout"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "refreshImplicitToken", [_dec52, _dec53, _dec54], Object.getOwnPropertyDescriptor(_class2.prototype, "refreshImplicitToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkIsLoggedIn", [_dec55, _dec56, _dec57], Object.getOwnPropertyDescriptor(_class2.prototype, "checkIsLoggedIn"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ensureValidAccessToken", [_dec58, _dec59, _dec60], Object.getOwnPropertyDescriptor(_class2.prototype, "ensureValidAccessToken"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Auth.js.map
