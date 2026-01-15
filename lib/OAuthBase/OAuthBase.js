"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
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
var _di = require("@ringcentral-integration/commons/lib/di");
var _proxify = require("@ringcentral-integration/commons/lib/proxy/proxify");
var _required = _interopRequireDefault(require("@ringcentral-integration/commons/lib/required"));
var _Auth = require("@ringcentral-integration/commons/modules/Auth");
var _core = require("@ringcentral-integration/core");
var _parseCallbackUri = _interopRequireDefault(require("../parseCallbackUri"));
var _dec, _class, _class2, _descriptor;
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
var OAuthBase = exports.OAuthBase = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Alert', 'Locale', 'Brand', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'OAuthOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function OAuthBase(deps) {
    var _this;
    _classCallCheck(this, OAuthBase);
    _this = _callSuper(this, OAuthBase, [{
      deps: deps
    }]);
    _initializerDefineProperty(_this, "oAuthReady", _descriptor, _this);
    if (!_this._redirectUri) {
      throw new Error('redirectUri is required');
    }
    return _this;
  }
  _inherits(OAuthBase, _RcModuleV);
  return _createClass(OAuthBase, [{
    key: "setOAuthReady",
    value: function setOAuthReady(val) {
      this.oAuthReady = val;
    }
  }, {
    key: "name",
    get: function get() {
      /* require implementation in descendent */
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
      return null;
    }
  }, {
    key: "_handleCallbackUri",
    value: function () {
      var _handleCallbackUri2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(callbackUri) {
        var refresh,
          query,
          message,
          _args = arguments,
          _t,
          _t2;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              refresh = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
              _context.p = 1;
              query = (0, _parseCallbackUri["default"])(callbackUri);
              if (!refresh) {
                _context.n = 3;
                break;
              }
              _context.n = 2;
              return this._refreshWithCallbackQuery(query);
            case 2:
              _context.n = 4;
              break;
            case 3:
              _context.n = 4;
              return this._loginWithCallbackQuery(query);
            case 4:
              _context.n = 9;
              break;
            case 5:
              _context.p = 5;
              _t = _context.v;
              console.error('oauth error: ', _t);
              _t2 = _t.message;
              _context.n = _t2 === 'invalid_request' ? 6 : _t2 === 'unauthorized_client' ? 6 : _t2 === 'access_denied' ? 6 : _t2 === 'unsupported_response_type' ? 6 : _t2 === 'invalid_scope' ? 6 : _t2 === 'interaction_required' ? 6 : _t2 === 'login_required' ? 6 : _t2 === 'server_error' ? 7 : _t2 === 'temporarily_unavailable' ? 7 : 7;
              break;
            case 6:
              message = _Auth.authMessages.accessDenied;
              return _context.a(3, 8);
            case 7:
              message = _Auth.authMessages.internalError;
              return _context.a(3, 8);
            case 8:
              this._deps.alert.danger({
                message: message,
                payload: _t
              });
            case 9:
              return _context.a(2);
          }
        }, _callee, this, [[1, 5]]);
      }));
      function _handleCallbackUri(_x) {
        return _handleCallbackUri2.apply(this, arguments);
      }
      return _handleCallbackUri;
    }()
  }, {
    key: "_loginWithCallbackQuery",
    value: function () {
      var _loginWithCallbackQuery2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(query) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (query.code || query.access_token) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              _context2.n = 2;
              return this._deps.auth.login({
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
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function _loginWithCallbackQuery(_x2) {
        return _loginWithCallbackQuery2.apply(this, arguments);
      }
      return _loginWithCallbackQuery;
    }()
  }, {
    key: "_refreshWithCallbackQuery",
    value: function () {
      var _refreshWithCallbackQuery2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(query) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              if (query.access_token) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2);
            case 1:
              _context3.n = 2;
              return this._deps.auth.refreshImplicitToken({
                tokenType: query.token_type,
                accessToken: query.access_token,
                expiresIn: query.expires_in,
                endpointId: query.endpoint_id
              });
            case 2:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function _refreshWithCallbackQuery(_x3) {
        return _refreshWithCallbackQuery2.apply(this, arguments);
      }
      return _refreshWithCallbackQuery;
    }()
  }, {
    key: "_redirectUri",
    get: function get() {
      var _this$_deps$oAuthOpti;
      return (_this$_deps$oAuthOpti = this._deps.oAuthOptions) === null || _this$_deps$oAuthOpti === void 0 ? void 0 : _this$_deps$oAuthOpti.redirectUri;
    }
  }, {
    key: "_uiOptions",
    get: function get() {
      var _this$_deps$oAuthOpti2;
      return ((_this$_deps$oAuthOpti2 = this._deps.oAuthOptions) === null || _this$_deps$oAuthOpti2 === void 0 ? void 0 : _this$_deps$oAuthOpti2.uiOptions) || DEFAULT_UI_OPTIONS;
    }
  }, {
    key: "destroyOAuth",
    value: function () {
      var _destroyOAuth = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              return _context4.a(2);
          }
        }, _callee4);
      }));
      function destroyOAuth() {
        return _destroyOAuth.apply(this, arguments);
      }
      return destroyOAuth;
    }()
  }, {
    key: "openOAuthPage",
    value: function () {
      var _openOAuthPage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              return _context5.a(2);
          }
        }, _callee5);
      }));
      function openOAuthPage() {
        return _openOAuthPage.apply(this, arguments);
      }
      return openOAuthPage;
    }()
  }, {
    key: "oAuthUri",
    get: function get() {
      return this._deps.auth.getLoginUrl({
        redirectUri: this.redirectUri,
        brandId: this._deps.brand.defaultConfig.id,
        state: this.authState,
        display: 'page',
        localeId: this._deps.locale.currentLocale,
        uiOptions: this._uiOptions,
        implicit: this._deps.auth.isImplicit,
        force: true
      });
    }
  }, {
    key: "implicitRefreshOAuthUri",
    get: function get() {
      return this._deps.auth.getLoginUrl({
        redirectUri: this.redirectUri,
        brandId: this._deps.brand.id,
        state: this.authState,
        display: 'page',
        prompt: 'none',
        implicit: this._deps.auth.isImplicit
      });
    }
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
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "oAuthReady", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setOAuthReady", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setOAuthReady"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "name", [_required["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "name"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_handleCallbackUri", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_handleCallbackUri"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "destroyOAuth", [_required["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "destroyOAuth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "openOAuthPage", [_required["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "openOAuthPage"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=OAuthBase.js.map
