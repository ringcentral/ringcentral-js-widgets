"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
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
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OAuth = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/web.timers.js");
var _services = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _utils = require("@ringcentral-integration/utils");
var _popWindow = require("@ringcentral-integration/widgets/lib/popWindow");
var _uuid = require("uuid");
var _Auth = require("../Auth");
var _Client = require("../Client");
var _OAuthBase2 = require("../OAuthBase");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var OAuth = exports.OAuth = (_dec = (0, _nextCore.injectable)({
  name: 'OAuth'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('TabManager')(target, undefined, 7);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('OAuthOptions')(target, undefined, 8);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _Client.Client === "undefined" ? Object : _Client.Client, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof _Auth.Auth === "undefined" ? Object : _Auth.Auth, typeof _services.Toast === "undefined" ? Object : _services.Toast, typeof _services.Locale === "undefined" ? Object : _services.Locale, typeof _services.Brand === "undefined" ? Object : _services.Brand, Object, typeof OAuthOptions === "undefined" ? Object : OAuthOptions]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = /*#__PURE__*/function (_OAuthBase) {
  function OAuth(_client, _router, _portManager, _auth, _toast, _locale, _brand, _tabManager, _oAuthOptions) {
    var _oAuthOptions2;
    var _this;
    _classCallCheck(this, OAuth);
    _oAuthOptions = (_oAuthOptions2 = _oAuthOptions) !== null && _oAuthOptions2 !== void 0 ? _oAuthOptions2 : {};
    if (_oAuthOptions) {
      var _oAuthOptions$loginPa, _oAuthOptions$redirec, _oAuthOptions$restric;
      _oAuthOptions.loginPath = (_oAuthOptions$loginPa = _oAuthOptions.loginPath) !== null && _oAuthOptions$loginPa !== void 0 ? _oAuthOptions$loginPa : '/';
      _oAuthOptions.redirectUri = (_oAuthOptions$redirec = _oAuthOptions.redirectUri) !== null && _oAuthOptions$redirec !== void 0 ? _oAuthOptions$redirec : "".concat(global.origin, "/redirect.html");
      _oAuthOptions.restrictSameOriginRedirectUri = (_oAuthOptions$restric = _oAuthOptions.restrictSameOriginRedirectUri) !== null && _oAuthOptions$restric !== void 0 ? _oAuthOptions$restric : true;
    }
    _this = _callSuper(this, OAuth, [_auth, _toast, _locale, _brand, _tabManager, _oAuthOptions]);
    _this._client = _client;
    _this._router = _router;
    _this._portManager = _portManager;
    _this._auth = _auth;
    _this._toast = _toast;
    _this._locale = _locale;
    _this._brand = _brand;
    _this._tabManager = _tabManager;
    _this._oAuthOptions = _oAuthOptions;
    _this._uuid = (0, _uuid.v4)();
    _this._loginWindow = null;
    _this._redirectCheckTimeout = null;
    _this._isInElectron = (0, _utils.isElectron)();
    if (!_nextCore.isSharedWorker && !_nextCore.isWebWorker) {
      if (_this._portManager.shared && _this._portManager.isWorkerMode) {
        _this._portManager.onClient(function () {
          // execute this code when client is opened
          _this.initialize();
        });
      } else {
        _this.initialize();
      }
    }
    return _this;
  }
  _inherits(OAuth, _OAuthBase);
  return _createClass(OAuth, [{
    key: "prefix",
    get: function get() {
      var _this$_oAuthOptions;
      return (_this$_oAuthOptions = this._oAuthOptions) === null || _this$_oAuthOptions === void 0 ? void 0 : _this$_oAuthOptions.prefix;
    }
  }, {
    key: "restrictSameOriginRedirectUri",
    get: function get() {
      var _this$_oAuthOptions2;
      return (_this$_oAuthOptions2 = this._oAuthOptions) === null || _this$_oAuthOptions2 === void 0 ? void 0 : _this$_oAuthOptions2.restrictSameOriginRedirectUri;
    }
  }, {
    key: "isRedirectUriSameOrigin",
    get: function get() {
      return this.restrictSameOriginRedirectUri ? this.redirectUri.indexOf(global.origin) === 0 : true;
    }
  }, {
    key: "combinedState",
    value: function combinedState() {
      var _this$_oAuthOptions3;
      var json = JSON.stringify(_objectSpread({
        now: Date.now(),
        uuid: this._uuid,
        prefix: this.prefix,
        origin: global.origin
      }, (_this$_oAuthOptions3 = this._oAuthOptions) === null || _this$_oAuthOptions3 === void 0 ? void 0 : _this$_oAuthOptions3.extraStateProps));
      var encoded = global.btoa(json);
      return encoded;
    }
  }, {
    key: "prefixedUuidState",
    value: function prefixedUuidState() {
      return "".concat(this.prefix, "-").concat(encodeURIComponent(btoa(this._uuid)));
    }
  }, {
    key: "authState",
    get: function get() {
      return "".concat(this.combinedState(), "-").concat(this.prefixedUuidState());
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var _this2 = this;
      // close login window when unload and login window exist
      window.addEventListener('beforeunload', function () {
        if (_this2._loginWindow) {
          try {
            _this2._loginWindow.close();
          } catch (error) {
            /* ignore error */
          }
        }
      });

      // listen callback uri from redirect page, works with coss origin redirect page
      window.addEventListener('message', function (_ref) {
        var _ref$data = _ref.data,
          data = _ref$data === void 0 ? {} : _ref$data;
        if (!data) {
          return;
        }
        var callbackUri = data.callbackUri;
        if (callbackUri) {
          _this2._clearRedirectCheckTimeout();
          _this2.handleCallbackLogin(callbackUri);
        }
      });

      // listen callback uri from storage, works only with same origin
      window.addEventListener('storage', function (e) {
        var callbackUriStorageKey = "".concat(_this2.prefixedUuidState(), "-callbackUri");
        if (e.key === callbackUriStorageKey && e.newValue) {
          var callbackUri = e.newValue;
          localStorage.removeItem(callbackUriStorageKey);
          _this2._clearRedirectCheckTimeout();
          _this2.handleCallbackLogin(callbackUri);
        }
      });

      // When a new tab is opened, there may be no dispatch running at this time.
      // So watch is not checking at the time and needs to be checked once manually.
      this.watchOAuth();
      (0, _nextCore.watch)(this, function () {
        return [_this2.ready, _this2._auth.loggedIn, _this2._router.currentPath, _this2.oAuthReady];
      }, function () {
        return _this2.watchOAuth();
      }, {
        multiple: true
      });
    }
  }, {
    key: "watchOAuth",
    value: function watchOAuth() {
      var _this$_oAuthOptions4;
      var atLoginPage = this._router.currentPath === ((_this$_oAuthOptions4 = this._oAuthOptions) === null || _this$_oAuthOptions4 === void 0 ? void 0 : _this$_oAuthOptions4.loginPath);
      if (this.ready && !this._auth.loggedIn && atLoginPage && !this.oAuthReady) {
        this.setupOAuth();
      } else if (this._auth.loggedIn || !atLoginPage) {
        this.destroyOAuth();
      }
      // Make sure that window.oAuthCallback is set in every client.
      if (this.oAuthReady && !window.oAuthCallback) {
        this.setupOAuth();
      }
    }
  }, {
    key: "setupOAuth",
    value: function () {
      var _setupOAuth = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this3 = this;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!(this.oAuthReady && window.oAuthCallback)) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              window.oAuthCallback = function (callbackUri) {
                _this3._clearRedirectCheckTimeout();
                _this3.handleCallbackLogin(callbackUri);
              };
              this.setOAuthReady(true);
            case 2:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function setupOAuth() {
        return _setupOAuth.apply(this, arguments);
      }
      return setupOAuth;
    }()
  }, {
    key: "destroyOAuth",
    value: function () {
      var _destroyOAuth = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (!(!this.oAuthReady && !window.oAuthCallback)) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              window.oAuthCallback = null;
              this.setOAuthReady(false);
            case 2:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function destroyOAuth() {
        return _destroyOAuth.apply(this, arguments);
      }
      return destroyOAuth;
    }()
  }, {
    key: "openOAuthPage",
    value: function () {
      var _openOAuthPage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              if (this.oAuthReady) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2);
            case 1:
              _context3.n = 2;
              return this.openOAuthPageInOtherRouter();
            case 2:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function openOAuthPage() {
        return _openOAuthPage.apply(this, arguments);
      }
      return openOAuthPage;
    }()
  }, {
    key: "openOAuthPageInOtherRouter",
    value: function () {
      var _openOAuthPageInOtherRouter = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var uri;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return this._client.checkLoginUrlWithDiscovery();
            case 1:
              _context4.n = 2;
              return this.getOAuthUri();
            case 2:
              uri = _context4.v;
              this._loginWindow = (0, _popWindow.popWindow)(uri, 'rc-oauth', 700, 700);
              _nextCore.logger.log('setup redirect check timeout', this.isRedirectUriSameOrigin);
              if (this.isRedirectUriSameOrigin) {
                this._setupRedirectCheckTimeout();
              }
            case 3:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function openOAuthPageInOtherRouter() {
        return _openOAuthPageInOtherRouter.apply(this, arguments);
      }
      return openOAuthPageInOtherRouter;
    }()
  }, {
    key: "_clearRedirectCheckTimeout",
    value: function _clearRedirectCheckTimeout() {
      if (this._redirectCheckTimeout === null) return;
      clearTimeout(this._redirectCheckTimeout);
    }
  }, {
    key: "_setupRedirectCheckTimeout",
    value: function () {
      var _setupRedirectCheckTimeout2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var _this4 = this;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              this._clearRedirectCheckTimeout();
              this._redirectCheckTimeout = setTimeout(function () {
                _this4._redirectCheckTimeout = null;
                if (!_this4._loginWindow || _this4._loginWindow.closed ||
                // for electron, the .window is always undefined
                !_this4._isInElectron && !_this4._loginWindow.window) {
                  _this4._loginWindow = null;
                  _nextCore.logger.log('no login window or electron, closed');
                  return;
                }
                try {
                  var callbackUri = _this4._loginWindow.location.href;
                  if (callbackUri.indexOf(_this4.redirectUri) !== -1) {
                    _this4._loginWindow.close();
                    _this4._loginWindow = null;
                    _this4.handleCallbackLogin(callbackUri);
                    _nextCore.logger.log('get call back uri, closed');
                    return;
                  }
                } catch (e) {
                  // ignore e
                  // console.log('checking redirect uri');
                }
                _this4._setupRedirectCheckTimeout();
              }, 1000);
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function _setupRedirectCheckTimeout() {
        return _setupRedirectCheckTimeout2.apply(this, arguments);
      }
      return _setupRedirectCheckTimeout;
    }()
  }]);
}(_OAuthBase2.OAuthBase)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=OAuth.js.map
