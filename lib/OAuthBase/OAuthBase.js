"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
require("core-js/modules/web.url");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OAuthBase = void 0;
require("regenerator-runtime/runtime");
var _di = require("@ringcentral-integration/commons/lib/di");
var _proxify = require("@ringcentral-integration/commons/lib/proxy/proxify");
var _required = _interopRequireDefault(require("@ringcentral-integration/commons/lib/required"));
var _Auth = require("@ringcentral-integration/commons/modules/Auth");
var _core = require("@ringcentral-integration/core");
var _parseCallbackUri = _interopRequireDefault(require("../parseCallbackUri"));
var _dec, _class, _class2, _descriptor;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var DEFAULT_UI_OPTIONS = [];
var OAuthBase = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Alert', 'Locale', 'Brand', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'OAuthOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(OAuthBase, _RcModuleV);
  var _super = _createSuper(OAuthBase);
  function OAuthBase(deps) {
    var _this;
    _classCallCheck(this, OAuthBase);
    _this = _super.call(this, {
      deps: deps
    });
    _initializerDefineProperty(_this, "oAuthReady", _descriptor, _assertThisInitialized(_this));
    if (!_this._redirectUri) {
      throw new Error('redirectUri is required');
    }
    return _this;
  }
  _createClass(OAuthBase, [{
    key: "setOAuthReady",
    value: function setOAuthReady(val) {
      this.oAuthReady = val;
    }
  }, {
    key: "_handleCallbackUri",
    value: function () {
      var _handleCallbackUri2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(callbackUri) {
        var refresh,
          query,
          message,
          _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                refresh = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
                _context.prev = 1;
                query = (0, _parseCallbackUri["default"])(callbackUri);
                if (!refresh) {
                  _context.next = 8;
                  break;
                }
                _context.next = 6;
                return this._refreshWithCallbackQuery(query);
              case 6:
                _context.next = 10;
                break;
              case 8:
                _context.next = 10;
                return this._loginWithCallbackQuery(query);
              case 10:
                _context.next = 23;
                break;
              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](1);
                console.error('oauth error: ', _context.t0);
                _context.t1 = _context.t0.message;
                _context.next = _context.t1 === 'invalid_request' ? 18 : _context.t1 === 'unauthorized_client' ? 18 : _context.t1 === 'access_denied' ? 18 : _context.t1 === 'unsupported_response_type' ? 18 : _context.t1 === 'invalid_scope' ? 18 : _context.t1 === 'interaction_required' ? 18 : _context.t1 === 'login_required' ? 18 : _context.t1 === 'server_error' ? 20 : _context.t1 === 'temporarily_unavailable' ? 20 : 20;
                break;
              case 18:
                message = _Auth.authMessages.accessDenied;
                return _context.abrupt("break", 22);
              case 20:
                message = _Auth.authMessages.internalError;
                return _context.abrupt("break", 22);
              case 22:
                this._deps.alert.danger({
                  message: message,
                  payload: _context.t0
                });
              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 12]]);
      }));
      function _handleCallbackUri(_x) {
        return _handleCallbackUri2.apply(this, arguments);
      }
      return _handleCallbackUri;
    }()
  }, {
    key: "_loginWithCallbackQuery",
    value: function () {
      var _loginWithCallbackQuery2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(query) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (query.code || query.access_token) {
                  _context2.next = 2;
                  break;
                }
                return _context2.abrupt("return");
              case 2:
                _context2.next = 4;
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
              case 4:
              case "end":
                return _context2.stop();
            }
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
      var _refreshWithCallbackQuery2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(query) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (query.access_token) {
                  _context3.next = 2;
                  break;
                }
                return _context3.abrupt("return");
              case 2:
                _context3.next = 4;
                return this._deps.auth.refreshImplicitToken({
                  tokenType: query.token_type,
                  accessToken: query.access_token,
                  expiresIn: query.expires_in,
                  endpointId: query.endpoint_id
                });
              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function _refreshWithCallbackQuery(_x3) {
        return _refreshWithCallbackQuery2.apply(this, arguments);
      }
      return _refreshWithCallbackQuery;
    }()
  }, {
    key: "destroyOAuth",
    value: function () {
      var _destroyOAuth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
              case "end":
                return _context4.stop();
            }
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
      var _openOAuthPage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));
      function openOAuthPage() {
        return _openOAuthPage.apply(this, arguments);
      }
      return openOAuthPage;
    }()
  }, {
    key: "name",
    get: function get() {
      /* require implementation in descendent */
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
      return null;
    }
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
  return OAuthBase;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "oAuthReady", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setOAuthReady", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setOAuthReady"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "name", [_required["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "name"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_handleCallbackUri", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_handleCallbackUri"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "destroyOAuth", [_required["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "destroyOAuth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "openOAuthPage", [_required["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "openOAuthPage"), _class2.prototype)), _class2)) || _class);
exports.OAuthBase = OAuthBase;
//# sourceMappingURL=OAuthBase.js.map
