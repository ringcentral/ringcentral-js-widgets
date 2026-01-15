"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerSyncTokenEvent = exports.LoginStatusChangeEvent = exports.Auth = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/esnext.promise.all-settled.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _core = require("@ringcentral-integration/core");
var _trackEvents = require("../../enums/trackEvents");
var _createRefreshTokenHelper = require("../../lib/createRefreshTokenHelper");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _authErrors = require("./authErrors");
var _authMessages = require("./authMessages");
var _loginStatus = require("./loginStatus");
var _excluded = ["redirectUri", "force", "implicit"];
var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
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
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var LoginStatusChangeEvent = exports.LoginStatusChangeEvent = 'loginStatusChange';
var TriggerSyncTokenEvent = exports.TriggerSyncTokenEvent = 'triggerSyncTokenEvent';
var Auth = exports.Auth = (_dec = (0, _di.Module)({
  name: 'Auth',
  deps: ['Client', 'Alert', 'Locale', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'RateLimiter',
    optional: true
  }, {
    dep: 'Environment',
    optional: true
  }, {
    dep: 'AuthOptions',
    optional: true
  }]
}), _dec2 = (0, _core.track)(function () {
  return function (analytics) {
    // @ts-expect-error TS(2339): Property 'setUserId' does not exist on type 'IAnal... Remove this comment to see the full error message
    analytics.setUserId();
    return [_trackEvents.trackEvents.authentication];
  };
}), _dec3 = (0, _core.track)(_trackEvents.trackEvents.logout), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function Auth(deps) {
    var _this;
    _classCallCheck(this, Auth);
    _this = _callSuper(this, Auth, [{
      deps: deps
    }]);
    _this._loggedIn = false;
    _this._beforeLogoutHandlers = new Set();
    _this._afterLoggedInHandlers = new Set();
    _this._onRefreshErrorHandlers = new Set();
    _this._unbindEvents = void 0;
    _this._lastEnvironmentCounter = 0;
    _this.refreshTokenHelper = (0, _createRefreshTokenHelper.createRefreshTokenHelper)(function () {
      return _this._deps.client.service.platform();
    }, console);
    _initializerDefineProperty(_this, "loginStatus", _descriptor, _this);
    _initializerDefineProperty(_this, "isFreshLogin", _descriptor2, _this);
    _initializerDefineProperty(_this, "token", _descriptor3, _this);
    _initializerDefineProperty(_this, "_triggerSyncToken", _descriptor4, _this);
    return _this;
  }
  _inherits(Auth, _RcModuleV);
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
    value: function setInitLogin(_ref) {
      var loggedIn = _ref.loggedIn,
        token = _ref.token;
      this.loginStatus = loggedIn ? _loginStatus.loginStatus.loggedIn : _loginStatus.loginStatus.notLoggedIn;
      this.isFreshLogin = loggedIn ? false : null;
      this._setToken(token !== null && token !== void 0 ? token : {}, false);
    }
  }, {
    key: "_bindEvents",
    value: function _bindEvents() {
      var _this2 = this;
      if (this._unbindEvents) this._unbindEvents();
      var platform = this._deps.client.service.platform();
      var client = this._deps.client.service.client();
      var onRequestError = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(error) {
          var matches, logoutRequired, alerts;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _context.n = 1;
                return (0, _authErrors.matchKnownRequestErrors)(error);
              case 1:
                matches = _context.v;
                // logout solution
                logoutRequired = matches.some(function (_ref3) {
                  var _ref4 = _slicedToArray(_ref3, 3),
                    _0 = _ref4[0],
                    _1 = _ref4[1],
                    solutions = _ref4[2];
                  return solutions === null || solutions === void 0 ? void 0 : solutions.logout;
                });
                if (!(logoutRequired && _this2.loginStatus === _loginStatus.loginStatus.loggedIn)) {
                  _context.n = 2;
                  break;
                }
                _context.n = 2;
                return _this2.logout();
              case 2:
                // alert solution
                alerts = matches.map(function (_ref5) {
                  var _ref6 = _slicedToArray(_ref5, 3),
                    _0 = _ref6[0],
                    _1 = _ref6[1],
                    solutions = _ref6[2];
                  return solutions === null || solutions === void 0 ? void 0 : solutions.alert;
                }).filter(function (x) {
                  return !!x;
                }) // remove empty
                .filter(function (x, index, array) {
                  return array.indexOf(x) === index;
                }); // remove duplicates
                alerts.forEach(function (alert) {
                  _this2._deps.alert.warning({
                    message: alert,
                    payload: error,
                    ttl: 0
                  });
                });
              case 3:
                return _context.a(2);
            }
          }, _callee);
        }));
        return function onRequestError(_x) {
          return _ref2.apply(this, arguments);
        };
      }();
      var onLoginSuccess = /*#__PURE__*/function () {
        var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var token, handlers, _iterator, _step, handler;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                _context2.n = 1;
                return platform.auth().data();
              case 1:
                token = _context2.v;
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
                return _context2.a(2);
            }
          }, _callee2);
        }));
        return function onLoginSuccess() {
          return _ref7.apply(this, arguments);
        };
      }();
      var onLoginError = function onLoginError() {
        _this2.setLoginError();
      };
      var onLogoutSuccess = function onLogoutSuccess() {
        _this2.setLogoutSuccess();
      };
      var onLogoutError = function onLogoutError() {
        platform._cache.clean();
        _this2.setLogoutError();
      };
      var onRefreshSuccess = /*#__PURE__*/function () {
        var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var token;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                _context3.n = 1;
                return platform.auth().data();
              case 1:
                token = _context3.v;
                _this2.setRefreshSuccess(token);
              case 2:
                return _context3.a(2);
            }
          }, _callee3);
        }));
        return function onRefreshSuccess() {
          return _ref8.apply(this, arguments);
        };
      }();
      var onRefreshError = /*#__PURE__*/function () {
        var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(error) {
          var _yield$_this2$refresh, refreshTokenValid, resStatus, handlers, results;
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.n) {
              case 0:
                _context5.n = 1;
                return _this2.refreshTokenHelper.getRefreshTokenState(error);
              case 1:
                _yield$_this2$refresh = _context5.v;
                refreshTokenValid = _yield$_this2$refresh.refreshTokenValid;
                resStatus = _yield$_this2$refresh.resStatus;
                handlers = _toConsumableArray(_this2._onRefreshErrorHandlers);
                _context5.n = 2;
                return Promise.allSettled(handlers.map(/*#__PURE__*/function () {
                  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(handler) {
                    return _regenerator().w(function (_context4) {
                      while (1) switch (_context4.n) {
                        case 0:
                          _context4.n = 1;
                          return handler(refreshTokenValid);
                        case 1:
                          return _context4.a(2, _context4.v);
                      }
                    }, _callee4);
                  }));
                  return function (_x3) {
                    return _ref0.apply(this, arguments);
                  };
                }()));
              case 2:
                results = _context5.v;
                results.forEach(function (x) {
                  if (x.status === 'rejected') {
                    console.warn('Trigger [RefreshErrorHandler] failed', x.reason);
                  }
                });
                _this2.setRefreshError(refreshTokenValid);
                _context5.n = 3;
                return _this2.refreshTokenHelper.processRefreshError({
                  error: error,
                  refreshTokenValid: refreshTokenValid,
                  resStatus: resStatus,
                  onSessionExpired: function onSessionExpired() {
                    _this2._deps.alert.danger({
                      message: _authMessages.authMessages.sessionExpired,
                      payload: error,
                      ttl: 0
                    });
                  }
                });
              case 3:
                return _context5.a(2);
            }
          }, _callee5);
        }));
        return function onRefreshError(_x2) {
          return _ref9.apply(this, arguments);
        };
      }();
      platform.addListener(platform.events.loginSuccess, onLoginSuccess);
      platform.addListener(platform.events.loginError, onLoginError);
      platform.addListener(platform.events.logoutSuccess, onLogoutSuccess);
      platform.addListener(platform.events.logoutError, onLogoutError);
      platform.addListener(platform.events.refreshSuccess, onRefreshSuccess);
      platform.addListener(platform.events.refreshError, onRefreshError);
      client.addListener(client.events.requestError, onRequestError);
      this._unbindEvents = function () {
        platform.removeListener(platform.events.loginSuccess, onLoginSuccess);
        platform.removeListener(platform.events.loginError, onLoginError);
        platform.removeListener(platform.events.logoutSuccess, onLogoutSuccess);
        platform.removeListener(platform.events.logoutError, onLogoutError);
        platform.removeListener(platform.events.refreshSuccess, onRefreshSuccess);
        platform.removeListener(platform.events.refreshError, onRefreshError);
        client.removeListener(client.events.requestError, onRequestError);
      };
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this.pending && this._deps.locale.ready && (!this._deps.tabManager || this._deps.tabManager.ready) && (!this._deps.environment || this._deps.environment.ready);
    }
  }, {
    key: "onStateChange",
    value: function () {
      var _onStateChange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var _this$_deps$tabManage, _this$_deps$tabManage2;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              if (!(this._deps.tabManager && this._deps.tabManager.ready && this.ready)) {
                _context6.n = 2;
                break;
              }
              if (!(this._loggedIn && this.loginStatus === _loginStatus.loginStatus.notLoggedIn || !this._loggedIn && this.loginStatus === _loginStatus.loginStatus.loggedIn)) {
                _context6.n = 1;
                break;
              }
              this._loggedIn = !this._loggedIn;
              this._deps.tabManager.send(LoginStatusChangeEvent, this._loggedIn);
              _context6.n = 2;
              break;
            case 1:
              if (!(this._deps.tabManager.event && this._deps.tabManager.event.name === LoginStatusChangeEvent && ((_this$_deps$tabManage = this._deps.tabManager.event.args) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage[0]) !== this.loggedIn)) {
                _context6.n = 2;
                break;
              }
              /* eslint { "prefer-destructuring": 0 } */
              this._loggedIn = (_this$_deps$tabManage2 = this._deps.tabManager.event.args) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2[0];
              _context6.n = 2;
              return this.fetchToken();
            case 2:
              if (this.ready && this._deps.environment && this._deps.environment.changeCounter !== this._lastEnvironmentCounter) {
                this._lastEnvironmentCounter = this._deps.environment.changeCounter;
                this._bindEvents();
              }
            case 3:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function onStateChange() {
        return _onStateChange.apply(this, arguments);
      }
      return onStateChange;
    }()
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var _this3 = this;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              _context7.n = 1;
              return this.refreshTokenHelper.loggedIn();
            case 1:
              this._loggedIn = _context7.v;
              this._bindEvents();
              (0, _core.watch)(this, function () {
                return [_this3.token, _this3._triggerSyncToken];
              }, function () {
                if (_this3._triggerSyncToken) {
                  var _this3$_deps$tabManag;
                  (_this3$_deps$tabManag = _this3._deps.tabManager) === null || _this3$_deps$tabManag === void 0 ? void 0 : _this3$_deps$tabManag.send(TriggerSyncTokenEvent);
                }
              });
              (0, _core.watch)(this, function () {
                var _this3$_deps$tabManag2;
                return (_this3$_deps$tabManag2 = _this3._deps.tabManager) === null || _this3$_deps$tabManag2 === void 0 ? void 0 : _this3$_deps$tabManag2.event;
              }, function () {
                var _this3$_deps$tabManag3, _this3$_deps$tabManag4;
                if (((_this3$_deps$tabManag3 = _this3._deps.tabManager) === null || _this3$_deps$tabManag3 === void 0 ? void 0 : (_this3$_deps$tabManag4 = _this3$_deps$tabManag3.event) === null || _this3$_deps$tabManag4 === void 0 ? void 0 : _this3$_deps$tabManag4.name) === TriggerSyncTokenEvent) {
                  _this3.fetchToken();
                }
              });

              // must check token from storage before that module ready, put that inside onInit lifeCycle
              _context7.n = 2;
              return this.fetchToken();
            case 2:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function onInit() {
        return _onInit.apply(this, arguments);
      }
      return onInit;
    }()
  }, {
    key: "fetchToken",
    value: function () {
      var _fetchToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var platform, token, _t;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              platform = this._deps.client.service.platform();
              if (!this._loggedIn) {
                _context8.n = 2;
                break;
              }
              _context8.n = 1;
              return platform.auth().data();
            case 1:
              _t = _context8.v;
              _context8.n = 3;
              break;
            case 2:
              _t = null;
            case 3:
              token = _t;
              this.setInitLogin({
                loggedIn: this._loggedIn,
                token: token
              });
            case 4:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function fetchToken() {
        return _fetchToken.apply(this, arguments);
      }
      return fetchToken;
    }()
  }, {
    key: "ownerId",
    get: function get() {
      return this.token.ownerId;
    }
  }, {
    key: "endpointId",
    get: function get() {
      return this.token.endpointId;
    }
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
      var _login = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(_ref1) {
        var username, password, extension, remember, code, redirectUri, accessToken, expiresIn, endpointId, tokenType, scope, tokenUri, discoveryUri, ownerId, extensionData;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              username = _ref1.username, password = _ref1.password, extension = _ref1.extension, remember = _ref1.remember, code = _ref1.code, redirectUri = _ref1.redirectUri, accessToken = _ref1.accessToken, expiresIn = _ref1.expiresIn, endpointId = _ref1.endpointId, tokenType = _ref1.tokenType, scope = _ref1.scope, tokenUri = _ref1.tokenUri, discoveryUri = _ref1.discoveryUri;
              this.setLogin();
              if (!accessToken) {
                _context9.n = 3;
                break;
              }
              _context9.n = 1;
              return this._deps.client.service.platform().auth().setData({
                token_type: tokenType,
                access_token: accessToken,
                expires_in: expiresIn,
                refresh_token_expires_in: expiresIn,
                scope: scope
              });
            case 1:
              _context9.n = 2;
              return this._deps.client.account().extension().get();
            case 2:
              extensionData = _context9.v;
              ownerId = extensionData.id;
            case 3:
              // TODO: support to set redirectUri in js sdk v4 login function
              if (!this._deps.client.service.platform()._redirectUri) {
                this._deps.client.service.platform()._redirectUri = redirectUri;
              }
              return _context9.a(2, this._deps.client.service.platform().login({
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
        }, _callee9, this);
      }));
      function login(_x4) {
        return _login.apply(this, arguments);
      }
      return login;
    }())
  }, {
    key: "refreshToken",
    value: function () {
      var _refreshToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        var resp, token;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              _context0.n = 1;
              return this._deps.client.service.platform().refresh();
            case 1:
              resp = _context0.v;
              _context0.n = 2;
              return resp.json();
            case 2:
              token = _context0.v;
              return _context0.a(2, token);
          }
        }, _callee0, this);
      }));
      function refreshToken() {
        return _refreshToken.apply(this, arguments);
      }
      return refreshToken;
    }()
  }, {
    key: "getLoginUrl",
    value: function getLoginUrl(_ref10) {
      var redirectUri = _ref10.redirectUri,
        force = _ref10.force,
        _ref10$implicit = _ref10.implicit,
        implicit = _ref10$implicit === void 0 ? false : _ref10$implicit,
        options = _objectWithoutProperties(_ref10, _excluded);
      // TODO: support to set redirectUri in js sdk v4 login function
      if (!this._deps.client.service.platform()._redirectUri) {
        this._deps.client.service.platform()._redirectUri = redirectUri;
      }
      return "".concat(this._deps.client.service.platform().loginUrl(_objectSpread(_objectSpread({}, options), {}, {
        redirectUri: redirectUri,
        implicit: implicit,
        usePKCE: this.usePKCE
      }))).concat(force ? '&force=true' : '');
    }

    /**
     * @description Triggers the beforeLogoutHandlers to run
     *  and then proceed to logout from ringcentral.
     */
  }, {
    key: "logout",
    value: (function () {
      var _logout = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        var _this4 = this;
        var _ref11,
          _ref11$dismissAllAler,
          dismissAllAlert,
          _this$_deps$rateLimit,
          handlers,
          _iterator2,
          _step2,
          _loop,
          _ret,
          _args11 = arguments,
          _t2,
          _t3;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              _ref11 = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : {}, _ref11$dismissAllAler = _ref11.dismissAllAlert, dismissAllAlert = _ref11$dismissAllAler === void 0 ? true : _ref11$dismissAllAler;
              this.setBeforeLogout();
              if (dismissAllAlert) {
                // fix bug [https://jira_domain/browse/RCINT-17381]
                this._deps.alert.dismissAllExpectSpecified({
                  specifiedAlertIds: [(_this$_deps$rateLimit = this._deps.rateLimiter) === null || _this$_deps$rateLimit === void 0 ? void 0 : _this$_deps$rateLimit.rateLimitAlertId]
                });
              }
              handlers = _toConsumableArray(this._beforeLogoutHandlers);
              _context11.p = 1;
              if (this._deps.tabManager && this._deps.tabManager.ready) {
                this._deps.tabManager.send(LoginStatusChangeEvent, false);
              }
              _iterator2 = _createForOfIteratorHelper(handlers);
              _context11.p = 2;
              _loop = /*#__PURE__*/_regenerator().m(function _loop() {
                var handler, result;
                return _regenerator().w(function (_context10) {
                  while (1) switch (_context10.n) {
                    case 0:
                      handler = _step2.value;
                      _context10.n = 1;
                      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
                        return _regenerator().w(function (_context1) {
                          while (1) switch (_context1.n) {
                            case 0:
                              return _context1.a(2, handler());
                          }
                        }, _callee1);
                      }))();
                    case 1:
                      result = _context10.v;
                      if (!result) {
                        _context10.n = 2;
                        break;
                      }
                      _this4.setCancelLogout();
                      if (_this4._deps.tabManager && _this4._deps.tabManager.ready) {
                        _this4._deps.tabManager.send(LoginStatusChangeEvent, true);
                      }
                      return _context10.a(2, {
                        v: Promise.reject(result)
                      });
                    case 2:
                      return _context10.a(2);
                  }
                }, _loop);
              });
              _iterator2.s();
            case 3:
              if ((_step2 = _iterator2.n()).done) {
                _context11.n = 6;
                break;
              }
              return _context11.d(_regeneratorValues(_loop()), 4);
            case 4:
              _ret = _context11.v;
              if (!_ret) {
                _context11.n = 5;
                break;
              }
              return _context11.a(2, _ret.v);
            case 5:
              _context11.n = 3;
              break;
            case 6:
              _context11.n = 8;
              break;
            case 7:
              _context11.p = 7;
              _t2 = _context11.v;
              _iterator2.e(_t2);
            case 8:
              _context11.p = 8;
              _iterator2.f();
              return _context11.f(8);
            case 9:
              _context11.n = 11;
              break;
            case 10:
              _context11.p = 10;
              _t3 = _context11.v;
              console.error(_t3);
            case 11:
              this.setLogout();
              if (!this.isImplicit) {
                _context11.n = 12;
                break;
              }
              this._deps.client.service.platform()._cache.clean();
              this.setLogoutSuccess();
              return _context11.a(2, null);
            case 12:
              return _context11.a(2, this._deps.client.service.platform().logout());
          }
        }, _callee10, this, [[2, 7, 8, 9], [1, 10]]);
      }));
      function logout() {
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
      var _refreshImplicitToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(_ref13) {
        var tokenType, accessToken, expiresIn, endpointId, extensionData, ownerId, platform, newAuthData, _t4;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              tokenType = _ref13.tokenType, accessToken = _ref13.accessToken, expiresIn = _ref13.expiresIn, endpointId = _ref13.endpointId;
              _context12.p = 1;
              _context12.n = 2;
              return this._deps.client.account().extension().get();
            case 2:
              extensionData = _context12.v;
              ownerId = String(extensionData.id);
              if (!(ownerId !== String(this.ownerId))) {
                _context12.n = 3;
                break;
              }
              return _context12.a(2);
            case 3:
              platform = this._deps.client.service.platform();
              newAuthData = {
                token_type: tokenType,
                access_token: accessToken,
                expires_in: expiresIn,
                refresh_token_expires_in: expiresIn,
                endpoint_id: endpointId
              };
              _context12.n = 4;
              return platform.auth().setData(newAuthData);
            case 4:
              platform.emit(platform.events.refreshSuccess, newAuthData);
              _context12.n = 6;
              break;
            case 5:
              _context12.p = 5;
              _t4 = _context12.v;
              console.error('refreshImplicitToken error:', _t4);
            case 6:
              return _context12.a(2);
          }
        }, _callee11, this, [[1, 5]]);
      }));
      function refreshImplicitToken(_x5) {
        return _refreshImplicitToken.apply(this, arguments);
      }
      return refreshImplicitToken;
    }()
  }, {
    key: "checkIsLoggedIn",
    value: function () {
      var _checkIsLoggedIn = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              _context13.n = 1;
              return this._deps.client.service.platform().loggedIn();
            case 1:
              return _context13.a(2, this.loginStatus === _loginStatus.loginStatus.loggedIn);
          }
        }, _callee12, this);
      }));
      function checkIsLoggedIn() {
        return _checkIsLoggedIn.apply(this, arguments);
      }
      return checkIsLoggedIn;
    }()
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
      return !(this.usePKCE || this._deps.client.service.platform()._clientSecret && this._deps.client.service.platform()._clientSecret.length > 0);
    }
  }, {
    key: "usePKCE",
    get: function get() {
      var _this$_deps$authOptio, _this$_deps$authOptio2;
      return (_this$_deps$authOptio = (_this$_deps$authOptio2 = this._deps.authOptions) === null || _this$_deps$authOptio2 === void 0 ? void 0 : _this$_deps$authOptio2.usePKCE) !== null && _this$_deps$authOptio !== void 0 ? _this$_deps$authOptio : false;
    }
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "loginStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "isFreshLogin", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "token", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_triggerSyncToken", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setToken", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLoginSuccess", [_dec2, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLoginSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLoginError", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLoginError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLogoutSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLogoutSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setRefreshSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setRefreshSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setRefreshError", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setRefreshError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLogoutError", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLogoutError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLogin", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLogin"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setBeforeLogout", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setBeforeLogout"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCancelLogout", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCancelLogout"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLogout", [_dec3, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLogout"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setInitLogin", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setInitLogin"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "login", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "login"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "refreshToken", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "refreshToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "logout", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "logout"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "refreshImplicitToken", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "refreshImplicitToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkIsLoggedIn", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "checkIsLoggedIn"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=Auth.js.map
