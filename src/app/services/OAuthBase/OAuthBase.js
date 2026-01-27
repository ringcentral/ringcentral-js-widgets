"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OAuthBase = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url.js");
require("core-js/modules/web.url.to-json.js");
require("core-js/modules/web.url-search-params.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _parseCallbackUri = _interopRequireDefault(require("@ringcentral-integration/widgets/lib/parseCallbackUri"));
var _rxjs = require("rxjs");
var _Analytics = require("../Analytics");
var _i18n = require("./i18n");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _descriptor;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
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
var DEFAULT_UI_OPTIONS = [];
var OAuthBase = exports.OAuthBase = (_dec = Reflect.metadata("design:type", Function), _dec2 = Reflect.metadata("design:paramtypes", [Boolean]), _dec3 = (0, _nextCore.delegate)('server'), _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [String]), _dec6 = (0, _nextCore.delegate)('server'), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", []), _class = /*#__PURE__*/function (_RcModule) {
  function OAuthBase(_auth, _toast, _locale, _brand, _tabManager, _oAuthOptions) {
    var _this;
    _classCallCheck(this, OAuthBase);
    _this = _callSuper(this, OAuthBase);
    _this._auth = _auth;
    _this._toast = _toast;
    _this._locale = _locale;
    _this._brand = _brand;
    _this._tabManager = _tabManager;
    _this._oAuthOptions = _oAuthOptions;
    _initializerDefineProperty(_this, "oAuthReady", _descriptor, _this);
    if (!_this._redirectUri) {
      throw new Error('redirectUri is required');
    }
    return _this;
  }
  _inherits(OAuthBase, _RcModule);
  return _createClass(OAuthBase, [{
    key: "setOAuthReady",
    value: function setOAuthReady(val) {
      this.oAuthReady = val;
    }
  }, {
    key: "handleCallbackLogin",
    value: function () {
      var _handleCallbackLogin = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(callbackUri) {
        var _this2 = this;
        var result;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return this._handleCallbackUri(callbackUri);
            case 1:
              result = _context.v;
              if (!result) {
                _context.n = 2;
                break;
              }
              _context.n = 2;
              return (0, _rxjs.firstValueFrom)(this._auth.ownerId$.pipe((0, _rxjs.filter)(Boolean), (0, _rxjs.timeout)({
                // in some slow device the sync time may longer, up to 5s to prevent that not be tracked
                each: 5000,
                "with": function _with() {
                  _this2.logger.error('Login success but timeout 5s for the ownerId be exist');
                  return (0, _rxjs.of)('timeout');
                }
              })));
            case 2:
              (0, _Analytics.trackEvent)('Int_signIn', {
                signInSource: 'CLW',
                signInResult: result ? 'Successfully signed in' : 'Failed'
              });
            case 3:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function handleCallbackLogin(_x) {
        return _handleCallbackLogin.apply(this, arguments);
      }
      return handleCallbackLogin;
    }()
  }, {
    key: "_handleCallbackUri",
    value: function () {
      var _handleCallbackUri2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(callbackUri) {
        var query, _this$_oAuthOptions, message, showCustomToast, status, _t, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              query = (0, _parseCallbackUri["default"])(callbackUri);
              _context2.n = 1;
              return this._loginWithCallbackQuery(query);
            case 1:
              return _context2.a(2, true);
            case 2:
              _context2.p = 2;
              _t = _context2.v;
              console.error('oauth error: ', _t);
              _t2 = _t.message;
              _context2.n = _t2 === 'invalid_request' ? 3 : _t2 === 'unauthorized_client' ? 3 : _t2 === 'access_denied' ? 3 : _t2 === 'unsupported_response_type' ? 3 : _t2 === 'invalid_scope' ? 3 : _t2 === 'interaction_required' ? 3 : _t2 === 'login_required' ? 3 : _t2 === 'server_error' ? 4 : _t2 === 'temporarily_unavailable' ? 4 : 4;
              break;
            case 3:
              message = (0, _i18n.t)('accessDenied');
              return _context2.a(3, 5);
            case 4:
              message = (0, _i18n.t)('internalError');
              return _context2.a(3, 5);
            case 5:
              showCustomToast = (_this$_oAuthOptions = this._oAuthOptions) === null || _this$_oAuthOptions === void 0 ? void 0 : _this$_oAuthOptions.showCustomToast;
              if (!showCustomToast) {
                _context2.n = 6;
                break;
              }
              status = showCustomToast(_t.message, _t.error_description);
              if (!status) {
                _context2.n = 6;
                break;
              }
              return _context2.a(2);
            case 6:
              this._toast.danger({
                message: message
              });
              return _context2.a(2, false);
          }
        }, _callee2, this, [[0, 2]]);
      }));
      function _handleCallbackUri(_x2) {
        return _handleCallbackUri2.apply(this, arguments);
      }
      return _handleCallbackUri;
    }()
  }, {
    key: "_loginWithCallbackQuery",
    value: function () {
      var _loginWithCallbackQuery2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(query) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              if (query.code || query.access_token) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2);
            case 1:
              _context3.n = 2;
              return this._auth.login({
                code: query.code,
                accessToken: query.access_token,
                expiresIn: query.expires_in,
                endpointId: query.endpoint_id,
                redirectUri: this.redirectUri,
                tokenType: query.token_type,
                scope: query.scope,
                tokenUri: query.token_uri,
                discoveryUri: query.discovery_uri
              });
            case 2:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function _loginWithCallbackQuery(_x3) {
        return _loginWithCallbackQuery2.apply(this, arguments);
      }
      return _loginWithCallbackQuery;
    }()
  }, {
    key: "_refreshWithCallbackQuery",
    value: function () {
      var _refreshWithCallbackQuery2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(query) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              if (query.access_token) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2);
            case 1:
              _context4.n = 2;
              return this._auth.refreshImplicitToken({
                tokenType: query.token_type,
                accessToken: query.access_token,
                expiresIn: query.expires_in,
                endpointId: query.endpoint_id
              });
            case 2:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function _refreshWithCallbackQuery(_x4) {
        return _refreshWithCallbackQuery2.apply(this, arguments);
      }
      return _refreshWithCallbackQuery;
    }()
  }, {
    key: "_redirectUri",
    get: function get() {
      var _this$_oAuthOptions2;
      return (_this$_oAuthOptions2 = this._oAuthOptions) === null || _this$_oAuthOptions2 === void 0 ? void 0 : _this$_oAuthOptions2.redirectUri;
    }
  }, {
    key: "_uiOptions",
    get: function get() {
      var _this$_oAuthOptions3;
      return ((_this$_oAuthOptions3 = this._oAuthOptions) === null || _this$_oAuthOptions3 === void 0 ? void 0 : _this$_oAuthOptions3.uiOptions) || DEFAULT_UI_OPTIONS;
    }
  }, {
    key: "getOAuthUri",
    value: function () {
      var _getOAuthUri = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var authState, redirectUri, loginUrl;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return this.getAuthState();
            case 1:
              authState = _context5.v;
              _context5.n = 2;
              return this.getRedirectUri();
            case 2:
              redirectUri = _context5.v;
              _context5.n = 3;
              return this._auth.getLoginUrl({
                redirectUri: redirectUri,
                brandId: this._brand.defaultConfig.id,
                state: authState,
                display: 'page',
                localeId: this._locale.currentLocale,
                uiOptions: this._uiOptions,
                implicit: this._auth.isImplicit,
                force: true
              });
            case 3:
              loginUrl = _context5.v;
              return _context5.a(2, loginUrl);
          }
        }, _callee5, this);
      }));
      function getOAuthUri() {
        return _getOAuthUri.apply(this, arguments);
      }
      return getOAuthUri;
    }()
  }, {
    key: "getImplicitRefreshOAuthUri",
    value: function () {
      var _getImplicitRefreshOAuthUri = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var authState, redirectUri, loginUrl;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              _context6.n = 1;
              return this.getAuthState();
            case 1:
              authState = _context6.v;
              _context6.n = 2;
              return this.getRedirectUri();
            case 2:
              redirectUri = _context6.v;
              _context6.n = 3;
              return this._auth.getLoginUrl({
                redirectUri: redirectUri,
                brandId: this._brand.id,
                state: authState,
                display: 'page',
                prompt: 'none',
                implicit: this._auth.isImplicit
              });
            case 3:
              loginUrl = _context6.v;
              return _context6.a(2, loginUrl);
          }
        }, _callee6, this);
      }));
      function getImplicitRefreshOAuthUri() {
        return _getImplicitRefreshOAuthUri.apply(this, arguments);
      }
      return getImplicitRefreshOAuthUri;
    }()
    /**
     * Make `authState` getter to be overridable for async scenario
     */
  }, {
    key: "getAuthState",
    value: (function () {
      var _getAuthState = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              return _context7.a(2, this.authState);
          }
        }, _callee7, this);
      }));
      function getAuthState() {
        return _getAuthState.apply(this, arguments);
      }
      return getAuthState;
    }()
    /**
     * Make `redirectUri` getter to be overridable for async scenario
     */
    )
  }, {
    key: "getRedirectUri",
    value: (function () {
      var _getRedirectUri = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              return _context8.a(2, this.redirectUri);
          }
        }, _callee8, this);
      }));
      function getRedirectUri() {
        return _getRedirectUri.apply(this, arguments);
      }
      return getRedirectUri;
    }())
  }, {
    key: "authState",
    get: function get() {
      return btoa("".concat(Date.now()));
    }
  }, {
    key: "redirectUri",
    get: function get() {
      return new URL(this._redirectUri, global.location.href).href;
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class.prototype, "oAuthReady", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class.prototype, "setOAuthReady", [_nextCore.action, _dec, _dec2], Object.getOwnPropertyDescriptor(_class.prototype, "setOAuthReady"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_handleCallbackUri", [_dec3, _dec4, _dec5], Object.getOwnPropertyDescriptor(_class.prototype, "_handleCallbackUri"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "getRedirectUri", [_dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class.prototype, "getRedirectUri"), _class.prototype), _class);
//# sourceMappingURL=OAuthBase.js.map
