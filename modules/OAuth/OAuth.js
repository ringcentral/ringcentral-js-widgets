"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OAuth = void 0;
require("regenerator-runtime/runtime");
var _background = _interopRequireDefault(require("@ringcentral-integration/commons/lib/background"));
var _di = require("@ringcentral-integration/commons/lib/di");
var _proxify = require("@ringcentral-integration/commons/lib/proxy/proxify");
var _core = require("@ringcentral-integration/core");
var _utils = require("@ringcentral-integration/utils");
var uuid = _interopRequireWildcard(require("uuid"));
var _OAuthBase2 = require("../../lib/OAuthBase");
var _popWindow = require("../../lib/popWindow");
var _dec, _class, _class2;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var OAuth = (_dec = (0, _di.Module)({
  name: 'OAuth',
  deps: ['Client', 'RouterInteraction', {
    dep: 'OAuthOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_OAuthBase) {
  _inherits(OAuth, _OAuthBase);
  var _super = _createSuper(OAuth);
  function OAuth(_ref) {
    var _this;
    var _ref$oAuthOptions = _ref.oAuthOptions;
    _ref$oAuthOptions = _ref$oAuthOptions === void 0 ? {} : _ref$oAuthOptions;
    var _ref$oAuthOptions$log = _ref$oAuthOptions.loginPath,
      loginPath = _ref$oAuthOptions$log === void 0 ? '/' : _ref$oAuthOptions$log,
      _ref$oAuthOptions$red = _ref$oAuthOptions.redirectUri,
      redirectUri = _ref$oAuthOptions$red === void 0 ? './redirect.html' : _ref$oAuthOptions$red,
      _ref$oAuthOptions$res = _ref$oAuthOptions.restrictSameOriginRedirectUri,
      restrictSameOriginRedirectUri = _ref$oAuthOptions$res === void 0 ? true : _ref$oAuthOptions$res,
      restOAuthOptions = _objectWithoutProperties(_ref$oAuthOptions, ["loginPath", "redirectUri", "restrictSameOriginRedirectUri"]),
      deps = _objectWithoutProperties(_ref, ["oAuthOptions"]);
    _classCallCheck(this, OAuth);
    // @ts-expect-error TS(2345): Argument of type '{ oAuthOptions: { prefix?: strin... Remove this comment to see the full error message
    _this = _super.call(this, _objectSpread(_objectSpread({}, deps), {}, {
      oAuthOptions: _objectSpread({
        loginPath: loginPath,
        redirectUri: redirectUri,
        restrictSameOriginRedirectUri: restrictSameOriginRedirectUri
      }, restOAuthOptions)
    }));
    _this._uuid = uuid.v4();
    _this._loginWindow = null;
    _this._redirectCheckTimeout = null;
    _this._isInElectron = (0, _utils.isElectron)();
    return _this;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _createClass(OAuth, [{
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      _get(_getPrototypeOf(OAuth.prototype), "onInitOnce", this) && _get(_getPrototypeOf(OAuth.prototype), "onInitOnce", this).call(this);
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
      window.addEventListener('message', function (_ref2) {
        var _ref2$data = _ref2.data,
          data = _ref2$data === void 0 ? {} : _ref2$data;
        if (!data) {
          return;
        }
        var callbackUri = data.callbackUri;
        if (callbackUri) {
          _this2._clearRedirectCheckTimeout();
          _this2._handleCallbackUri(callbackUri);
        }
      });
      // listen callback uri from storage, works only with same origin
      window.addEventListener('storage', function (e) {
        if (e.key === _this2.callbackUriStorageKey && e.newValue && e.newValue !== '') {
          var callbackUri = e.newValue;
          localStorage.removeItem(_this2.callbackUriStorageKey);
          _this2._clearRedirectCheckTimeout();
          _this2._handleCallbackUri(callbackUri);
        }
      });
      (0, _core.watch)(this, function () {
        var _this2$_deps$oAuthOpt;
        return [_this2.ready, _this2._deps.auth.loggedIn, _this2._deps.routerInteraction.currentPath, (_this2$_deps$oAuthOpt = _this2._deps.oAuthOptions) === null || _this2$_deps$oAuthOpt === void 0 ? void 0 : _this2$_deps$oAuthOpt.loginPath, _this2.oAuthReady];
      }, function () {
        var _this2$_deps$oAuthOpt2;
        var atLoginPage = _this2._deps.routerInteraction.currentPath === ((_this2$_deps$oAuthOpt2 = _this2._deps.oAuthOptions) === null || _this2$_deps$oAuthOpt2 === void 0 ? void 0 : _this2$_deps$oAuthOpt2.loginPath);
        if (_this2.ready && !_this2._deps.auth.loggedIn && atLoginPage && !_this2.oAuthReady) {
          _this2.setupOAuth();
        } else if (_this2._deps.auth.loggedIn || !atLoginPage) {
          _this2.destroyOAuth();
        }
      }, {
        multiple: true
      });
    }
  }, {
    key: "setupOAuth",
    value: function () {
      var _setupOAuth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this3 = this;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.oAuthReady) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt("return");
              case 2:
                window.oAuthCallback = function (callbackUri) {
                  _this3._clearRedirectCheckTimeout();
                  _this3._handleCallbackUri(callbackUri);
                };
                this.setOAuthReady(true);
              case 4:
              case "end":
                return _context.stop();
            }
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
      var _destroyOAuth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.oAuthReady) {
                  _context2.next = 2;
                  break;
                }
                return _context2.abrupt("return");
              case 2:
                // @ts-ignore
                window.oAuthCallback = null;
                this.setOAuthReady(false);
              case 4:
              case "end":
                return _context2.stop();
            }
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
      var _openOAuthPage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.oAuthReady) {
                  _context3.next = 2;
                  break;
                }
                return _context3.abrupt("return");
              case 2:
                _context3.next = 4;
                return this.openOAuthPageInOtherRouter();
              case 4:
              case "end":
                return _context3.stop();
            }
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
      var _openOAuthPageInOtherRouter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this._deps.client.service.platform().discovery()) {
                  _context4.next = 3;
                  break;
                }
                _context4.next = 3;
                return this._deps.client.service.platform().loginUrlWithDiscovery();
              case 3:
                this._loginWindow = (0, _popWindow.popWindow)(this.oAuthUri, 'rc-oauth', 700, 700);
                if (this.isRedirectUriSameOrigin) {
                  this._setupRedirectCheckTimeout();
                }
              case 5:
              case "end":
                return _context4.stop();
            }
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
    value: function _setupRedirectCheckTimeout() {
      var _this4 = this;
      this._clearRedirectCheckTimeout();
      this._redirectCheckTimeout = setTimeout(function () {
        _this4._redirectCheckTimeout = null;
        if (!_this4._loginWindow || _this4._loginWindow.closed ||
        // for electron, the .window is always undefined
        !_this4._isInElectron && !_this4._loginWindow.window) {
          _this4._loginWindow = null;
          return;
        }
        try {
          var callbackUri = _this4._loginWindow.location.href;
          if (callbackUri.indexOf(_this4.redirectUri) !== -1) {
            _this4._loginWindow.close();
            _this4._loginWindow = null;
            _this4._handleCallbackUri(callbackUri);
            return;
          }
        } catch (e) {
          // ignore e
          // console.log('checking redirect uri');
        }
        _this4._setupRedirectCheckTimeout();
      }, 1000);
    }
  }, {
    key: "name",
    get: function get() {
      return 'OAuth';
    }
  }, {
    key: "prefix",
    get: function get() {
      var _this$_deps$oAuthOpti;
      return (_this$_deps$oAuthOpti = this._deps.oAuthOptions) === null || _this$_deps$oAuthOpti === void 0 ? void 0 : _this$_deps$oAuthOpti.prefix;
    }
  }, {
    key: "restrictSameOriginRedirectUri",
    get: function get() {
      var _this$_deps$oAuthOpti2;
      return (_this$_deps$oAuthOpti2 = this._deps.oAuthOptions) === null || _this$_deps$oAuthOpti2 === void 0 ? void 0 : _this$_deps$oAuthOpti2.restrictSameOriginRedirectUri;
    }
  }, {
    key: "isRedirectUriSameOrigin",
    get: function get() {
      return this.restrictSameOriginRedirectUri ? this.redirectUri.indexOf(window.origin) === 0 : true;
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "authState",
    get: function get() {
      return "".concat(btoa("".concat(Date.now())), "-").concat(this.prefix, "-").concat(encodeURIComponent(btoa(this._uuid)));
    }
  }, {
    key: "callbackUriStorageKey",
    get: function get() {
      return "".concat(this.prefix, "-").concat(encodeURIComponent(btoa(this._uuid)), "-callbackUri");
    }
  }]);
  return OAuth;
}(_OAuthBase2.OAuthBase), (_applyDecoratedDescriptor(_class2.prototype, "setupOAuth", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setupOAuth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "destroyOAuth", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "destroyOAuth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "openOAuthPage", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "openOAuthPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "openOAuthPageInOtherRouter", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "openOAuthPageInOtherRouter"), _class2.prototype)), _class2)) || _class);
exports.OAuth = OAuth;
//# sourceMappingURL=OAuth.js.map
