"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.join");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.parse-int");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
require("core-js/modules/web.timers");
require("core-js/modules/web.url");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProxyFrameOAuth = void 0;
require("regenerator-runtime/runtime");
var _background = _interopRequireDefault(require("@ringcentral-integration/commons/lib/background"));
var _di = require("@ringcentral-integration/commons/lib/di");
var _proxify = require("@ringcentral-integration/commons/lib/proxy/proxify");
var _core = require("@ringcentral-integration/core");
var uuid = _interopRequireWildcard(require("uuid"));
var _OAuthBase2 = require("../../lib/OAuthBase");
var _dec, _class, _class2, _descriptor;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));) { ; } return t; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var DEFAULT_PROXY_RETRY = 5000;
var ProxyFrameOAuth = (_dec = (0, _di.Module)({
  name: 'OAuth',
  deps: ['Client', 'RouterInteraction', {
    dep: 'OAuthOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_OAuthBase) {
  _inherits(ProxyFrameOAuth, _OAuthBase);
  var _super = _createSuper(ProxyFrameOAuth);
  function ProxyFrameOAuth(_ref) {
    var _this;
    var _ref$oAuthOptions = _ref.oAuthOptions;
    _ref$oAuthOptions = _ref$oAuthOptions === void 0 ? {} : _ref$oAuthOptions;
    var _ref$oAuthOptions$log = _ref$oAuthOptions.loginPath,
      loginPath = _ref$oAuthOptions$log === void 0 ? '/' : _ref$oAuthOptions$log,
      _ref$oAuthOptions$red = _ref$oAuthOptions.redirectUri,
      redirectUri = _ref$oAuthOptions$red === void 0 ? './redirect.html' : _ref$oAuthOptions$red,
      _ref$oAuthOptions$pro = _ref$oAuthOptions.proxyUri,
      proxyUri = _ref$oAuthOptions$pro === void 0 ? './proxy.html' : _ref$oAuthOptions$pro,
      _ref$oAuthOptions$def = _ref$oAuthOptions.defaultProxyRetry,
      defaultProxyRetry = _ref$oAuthOptions$def === void 0 ? DEFAULT_PROXY_RETRY : _ref$oAuthOptions$def,
      restOAuthOptions = _objectWithoutProperties(_ref$oAuthOptions, ["loginPath", "redirectUri", "proxyUri", "defaultProxyRetry"]),
      deps = _objectWithoutProperties(_ref, ["oAuthOptions"]);
    _classCallCheck(this, ProxyFrameOAuth);
    _this = _super.call(this, _objectSpread(_objectSpread({}, deps), {}, {
      oAuthOptions: _objectSpread({
        loginPath: loginPath,
        redirectUri: redirectUri,
        proxyUri: proxyUri,
        defaultProxyRetry: defaultProxyRetry
      }, restOAuthOptions)
    }));
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
    _this._retryTimeoutId = null;
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
    _this._implicitRefreshTimeoutId = null;
    _this._uuid = uuid.v4();
    // @ts-expect-error TS(2564): Property '_proxyFrame' has no initializer and is n... Remove this comment to see the full error message
    _this._proxyFrame = void 0;
    // @ts-expect-error TS(2564): Property '_implicitRefreshFrame' has no initialize... Remove this comment to see the full error message
    _this._implicitRefreshFrame = void 0;
    _this._loggedIn = false;
    _initializerDefineProperty(_this, "proxyRetryCount", _descriptor, _assertThisInitialized(_this));
    _this._callbackHandler = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
        var origin, data, callbackUri, proxyLoaded;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                origin = _ref2.origin, data = _ref2.data;
                if (data) {
                  _context.next = 3;
                  break;
                }
                return _context.abrupt("return");
              case 3:
                callbackUri = data.callbackUri, proxyLoaded = data.proxyLoaded;
                if (callbackUri) {
                  _this._handleCallbackUri(callbackUri);
                } else if (proxyLoaded) {
                  clearTimeout(_this._retryTimeoutId);
                  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
                  _this._retryTimeoutId = null;
                  _this.setOAuthReady(true);
                }
              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }();
    _this._createProxyFrame = function () {
      var _this$_deps$oAuthOpti;
      _this._proxyFrame = document.createElement('iframe');
      _this._proxyFrame.src = _this.proxyUri;
      _this._proxyFrame.style.display = 'none';
      var isEdge = window && window.navigator && window.navigator.userAgent.indexOf('Edge') > -1;
      var isIE = window && window.navigator && /MSIE|Trident/i.test(window.navigator.userAgent);
      if (!isEdge && !isIE) {
        _this._proxyFrame.setAttribute('sandbox', ['allow-scripts', 'allow-popups', 'allow-same-origin', 'allow-forms'].join(' '));
      }
      document.body.appendChild(_this._proxyFrame);
      window.addEventListener('message', _this._callbackHandler);
      _this._retryTimeoutId = setTimeout(function () {
        _this._retrySetupProxyFrame();
      }, (_this$_deps$oAuthOpti = _this._deps.oAuthOptions) === null || _this$_deps$oAuthOpti === void 0 ? void 0 : _this$_deps$oAuthOpti.defaultProxyRetry);
    };
    _this._implicitRefreshCallBack = function (_ref4) {
      var data = _ref4.data;
      var refreshCallbackUri = data.refreshCallbackUri;
      if (refreshCallbackUri && _this._deps.auth.loggedIn) {
        _this._handleCallbackUri(refreshCallbackUri, true);
        _this._clearImplicitRefreshIframe();
      }
    };
    return _this;
  }
  _createClass(ProxyFrameOAuth, [{
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      _get(_getPrototypeOf(ProxyFrameOAuth.prototype), "onInitOnce", this) && _get(_getPrototypeOf(ProxyFrameOAuth.prototype), "onInitOnce", this).call(this);
      (0, _core.watch)(this, function () {
        var _this2$_deps$oAuthOpt;
        return [_this2.ready, _this2._deps.auth.loggedIn, _this2._deps.routerInteraction.currentPath, (_this2$_deps$oAuthOpt = _this2._deps.oAuthOptions) === null || _this2$_deps$oAuthOpt === void 0 ? void 0 : _this2$_deps$oAuthOpt.loginPath, _this2.oAuthReady, _this2._proxyFrame];
      }, function () {
        var _this2$_deps$oAuthOpt2;
        var atLoginPage = _this2._deps.routerInteraction.currentPath === ((_this2$_deps$oAuthOpt2 = _this2._deps.oAuthOptions) === null || _this2$_deps$oAuthOpt2 === void 0 ? void 0 : _this2$_deps$oAuthOpt2.loginPath);
        if (_this2.ready && !_this2._deps.auth.loggedIn && atLoginPage && !_this2.oAuthReady && !_this2._proxyFrame) {
          _this2.setupOAuth();
        } else if (_this2._proxyFrame && (_this2._deps.auth.loggedIn || !atLoginPage)) {
          _this2.destroyOAuth();
        }
        if (_this2._deps.auth.loggedIn === _this2._loggedIn) return;
        _this2._loggedIn = _this2._deps.auth.loggedIn;
        if (_this2._deps.auth.isImplicit) {
          if (_this2._loggedIn) {
            _this2._createImplicitRefreshTimeout();
          } else if (!_this2._loggedIn) {
            _this2._clearImplicitRefreshIframe();
            if (_this2._implicitRefreshTimeoutId) {
              clearTimeout(_this2._implicitRefreshTimeoutId);
            }
          }
        }
      }, {
        multiple: true
      });
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "_handleCallbackUri",
    value: function () {
      var _handleCallbackUri2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(callbackUri) {
        var refresh,
          _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                refresh = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;
                _context2.next = 3;
                return _get(_getPrototypeOf(ProxyFrameOAuth.prototype), "_handleCallbackUri", this).call(this, callbackUri, refresh);
              case 3:
                if (this._deps.auth.isImplicit && this._deps.auth.loggedIn) {
                  this._createImplicitRefreshTimeout();
                }
              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function _handleCallbackUri(_x2) {
        return _handleCallbackUri2.apply(this, arguments);
      }
      return _handleCallbackUri;
    }() // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "setProxyRetryCount",
    value: function setProxyRetryCount(val) {
      this.proxyRetryCount = val;
    }
  }, {
    key: "setOAuthReady",
    value: function setOAuthReady(val) {
      _get(_getPrototypeOf(ProxyFrameOAuth.prototype), "setOAuthReady", this).call(this, val);
      this.setProxyRetryCount(0);
    }
  }, {
    key: "_retrySetupProxyFrame",
    value: function _retrySetupProxyFrame() {
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
      this._retryTimeoutId = null;
      if (this.oAuthReady) return;
      this.setProxyRetryCount(this.proxyRetryCount + 1);
      this._destroyProxyFrame();
      this._createProxyFrame();
    }
  }, {
    key: "_destroyProxyFrame",
    value: function _destroyProxyFrame() {
      document.body.removeChild(this._proxyFrame);
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'HTMLIFrameE... Remove this comment to see the full error message
      this._proxyFrame = null;
      window.removeEventListener('message', this._callbackHandler);
    }
  }, {
    key: "setupOAuth",
    value: function () {
      var _setupOAuth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this._proxyFrame) {
                  _context3.next = 2;
                  break;
                }
                return _context3.abrupt("return");
              case 2:
                this._createProxyFrame();
                this.setProxyRetryCount(0);
              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function setupOAuth() {
        return _setupOAuth.apply(this, arguments);
      }
      return setupOAuth;
    }()
  }, {
    key: "destroyOAuth",
    value: function () {
      var _destroyOAuth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this._proxyFrame) {
                  _context4.next = 2;
                  break;
                }
                return _context4.abrupt("return");
              case 2:
                if (this._retryTimeoutId) {
                  clearTimeout(this._retryTimeoutId);
                  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
                  this._retryTimeoutId = null;
                }
                this._destroyProxyFrame();
                this.setOAuthReady(false);
              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function destroyOAuth() {
        return _destroyOAuth.apply(this, arguments);
      }
      return destroyOAuth;
    }()
  }, {
    key: "openOAuthPage",
    value: function () {
      var _openOAuthPage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this.oAuthReady) {
                  _context5.next = 2;
                  break;
                }
                return _context5.abrupt("return");
              case 2:
                if (!this._deps.client.service.platform().discovery()) {
                  _context5.next = 5;
                  break;
                }
                _context5.next = 5;
                return this._deps.client.service.platform().loginUrlWithDiscovery();
              case 5:
                // @ts-expect-error TS(2531): Object is possibly 'null'.
                this._proxyFrame.contentWindow.postMessage({
                  oAuthUri: this.oAuthUri
                }, '*');
              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function openOAuthPage() {
        return _openOAuthPage.apply(this, arguments);
      }
      return openOAuthPage;
    }()
  }, {
    key: "_createImplicitRefreshIframe",
    value: function _createImplicitRefreshIframe() {
      this._clearImplicitRefreshIframe();
      this._implicitRefreshFrame = document.createElement('iframe');
      this._implicitRefreshFrame.src = this.implicitRefreshOAuthUri;
      this._implicitRefreshFrame.style.display = 'none';
      document.body.appendChild(this._implicitRefreshFrame);
      // eslint-disable-next-line

      window.addEventListener('message', this._implicitRefreshCallBack);
    }
  }, {
    key: "_clearImplicitRefreshIframe",
    value: function _clearImplicitRefreshIframe() {
      if (!this._implicitRefreshFrame) return;
      document.body.removeChild(this._implicitRefreshFrame);
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'HTMLIFrameE... Remove this comment to see the full error message
      this._implicitRefreshFrame = null;
      window.removeEventListener('message', this._implicitRefreshCallBack);
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type '({ origin, ... Remove this comment to see the full error message
      this._callbackHandler = null;
    } // create a time out to refresh implicit flow token
  }, {
    key: "_createImplicitRefreshTimeout",
    value: function _createImplicitRefreshTimeout() {
      var _this3 = this;
      if (this._implicitRefreshTimeoutId) {
        clearTimeout(this._implicitRefreshTimeoutId);
      }
      var authData = this._deps.auth.token;
      var refreshTokenExpiresIn = authData.expiresIn;
      var expireTime = authData.expireTime;
      if (!refreshTokenExpiresIn || !expireTime) return;

      // * set refresh time to (token expose time) / 3
      var refreshTokenTimeoutTime = parseInt("".concat(refreshTokenExpiresIn), 10) * 1000 / 3;
      if (refreshTokenTimeoutTime + Date.now() > expireTime) {
        refreshTokenTimeoutTime = expireTime - Date.now() - 5000;
        if (refreshTokenTimeoutTime < 0) return;
      }
      this._implicitRefreshTimeoutId = setTimeout(function () {
        var _this3$_deps$tabManag;
        if (!_this3._deps.auth.loggedIn) return;
        if (!((_this3$_deps$tabManag = _this3._deps.tabManager) === null || _this3$_deps$tabManag === void 0 ? void 0 : _this3$_deps$tabManag.active)) {
          _this3._createImplicitRefreshTimeout();
          return;
        }
        _this3._createImplicitRefreshIframe();
        // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
        _this3._implicitRefreshTimeoutId = null;
      }, refreshTokenTimeoutTime);
    }
  }, {
    key: "name",
    get: function get() {
      return 'proxyFrameOAuth';
    }
  }, {
    key: "prefix",
    get: function get() {
      var _this$_deps$oAuthOpti2;
      return (_this$_deps$oAuthOpti2 = this._deps.oAuthOptions) === null || _this$_deps$oAuthOpti2 === void 0 ? void 0 : _this$_deps$oAuthOpti2.prefix;
    }
  }, {
    key: "proxyUri",
    get: function get() {
      var _this$_deps$oAuthOpti3;
      // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      var prefix = encodeURIComponent(this.prefix);
      var proxyUri = new URL((_this$_deps$oAuthOpti3 = this._deps.oAuthOptions) === null || _this$_deps$oAuthOpti3 === void 0 ? void 0 : _this$_deps$oAuthOpti3.proxyUri, window.location.href).href;
      var hash = encodeURIComponent(btoa(this._uuid));
      return "".concat(proxyUri, "?hash=").concat(hash, "&prefix=").concat(prefix);
    }
  }]);
  return ProxyFrameOAuth;
}(_OAuthBase2.OAuthBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "proxyRetryCount", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setProxyRetryCount", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setProxyRetryCount"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setOAuthReady", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setOAuthReady"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setupOAuth", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setupOAuth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "destroyOAuth", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "destroyOAuth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "openOAuthPage", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "openOAuthPage"), _class2.prototype)), _class2)) || _class);
exports.ProxyFrameOAuth = ProxyFrameOAuth;
//# sourceMappingURL=ProxyFrameOAuth.js.map
