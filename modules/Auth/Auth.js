"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.some");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.set");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.for-each");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerSyncTokenEvent = exports.LoginStatusChangeEvent = exports.Auth = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _trackEvents = require("../../enums/trackEvents");
var _createRefreshTokenHelper = require("../../lib/createRefreshTokenHelper");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _authErrors = require("./authErrors");
var _authMessages = require("./authMessages");
var _loginStatus = require("./loginStatus");
var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) { o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } } return t; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
var LoginStatusChangeEvent = 'loginStatusChange';
exports.LoginStatusChangeEvent = LoginStatusChangeEvent;
var TriggerSyncTokenEvent = 'triggerSyncTokenEvent';
exports.TriggerSyncTokenEvent = TriggerSyncTokenEvent;
var Auth = (_dec = (0, _di.Module)({
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
  _inherits(Auth, _RcModuleV);
  var _super = _createSuper(Auth);
  function Auth(deps) {
    var _this;
    _classCallCheck(this, Auth);
    _this = _super.call(this, {
      deps: deps
    });
    _this._loggedIn = false;
    _this._beforeLogoutHandlers = new Set();
    _this._afterLoggedInHandlers = new Set();
    _this._onRefreshErrorHandlers = new Set();
    _this._unbindEvents = void 0;
    _this._lastEnvironmentCounter = 0;
    _this.refreshTokenHelper = (0, _createRefreshTokenHelper.createRefreshTokenHelper)(function () {
      return _this._deps.client.service.platform();
    }, console);
    _initializerDefineProperty(_this, "loginStatus", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "isFreshLogin", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "token", _descriptor3, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "_triggerSyncToken", _descriptor4, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(Auth, [{
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
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(error) {
          var matches, logoutRequired, alerts;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return (0, _authErrors.matchKnownRequestErrors)(error);
                case 2:
                  matches = _context.sent;
                  // logout solution
                  logoutRequired = matches.some(function (_ref3) {
                    var _ref4 = _slicedToArray(_ref3, 3),
                      _0 = _ref4[0],
                      _1 = _ref4[1],
                      solutions = _ref4[2];
                    return solutions === null || solutions === void 0 ? void 0 : solutions.logout;
                  });
                  if (!(logoutRequired && _this2.loginStatus === _loginStatus.loginStatus.loggedIn)) {
                    _context.next = 7;
                    break;
                  }
                  _context.next = 7;
                  return _this2.logout();
                case 7:
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
                case 9:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
        return function onRequestError(_x) {
          return _ref2.apply(this, arguments);
        };
      }();
      var onLoginSuccess = /*#__PURE__*/function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var token, handlers, _iterator, _step, handler;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return platform.auth().data();
                case 2:
                  token = _context2.sent;
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
                case 7:
                case "end":
                  return _context2.stop();
              }
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
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          var token;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return platform.auth().data();
                case 2:
                  token = _context3.sent;
                  _this2.setRefreshSuccess(token);
                case 4:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));
        return function onRefreshSuccess() {
          return _ref8.apply(this, arguments);
        };
      }();
      var onRefreshError = /*#__PURE__*/function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(error) {
          var _yield$_this2$refresh, refreshTokenValid, resStatus, handlers, results;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return _this2.refreshTokenHelper.getRefreshTokenState(error);
                case 2:
                  _yield$_this2$refresh = _context5.sent;
                  refreshTokenValid = _yield$_this2$refresh.refreshTokenValid;
                  resStatus = _yield$_this2$refresh.resStatus;
                  handlers = _toConsumableArray(_this2._onRefreshErrorHandlers);
                  _context5.next = 8;
                  return Promise.allSettled(handlers.map( /*#__PURE__*/function () {
                    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(handler) {
                      return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                          switch (_context4.prev = _context4.next) {
                            case 0:
                              _context4.next = 2;
                              return handler(refreshTokenValid);
                            case 2:
                              return _context4.abrupt("return", _context4.sent);
                            case 3:
                            case "end":
                              return _context4.stop();
                          }
                        }
                      }, _callee4);
                    }));
                    return function (_x3) {
                      return _ref10.apply(this, arguments);
                    };
                  }()));
                case 8:
                  results = _context5.sent;
                  results.forEach(function (x) {
                    if (x.status === 'rejected') {
                      console.warn('Trigger [RefreshErrorHandler] failed', x.reason);
                    }
                  });
                  _this2.setRefreshError(refreshTokenValid);
                  _context5.next = 13;
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
                case 13:
                case "end":
                  return _context5.stop();
              }
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
      var _onStateChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var _this$_deps$tabManage, _this$_deps$tabManage2;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(this._deps.tabManager && this._deps.tabManager.ready && this.ready)) {
                  _context6.next = 10;
                  break;
                }
                if (!(this._loggedIn && this.loginStatus === _loginStatus.loginStatus.notLoggedIn || !this._loggedIn && this.loginStatus === _loginStatus.loginStatus.loggedIn)) {
                  _context6.next = 6;
                  break;
                }
                this._loggedIn = !this._loggedIn;
                this._deps.tabManager.send(LoginStatusChangeEvent, this._loggedIn);
                _context6.next = 10;
                break;
              case 6:
                if (!(this._deps.tabManager.event && this._deps.tabManager.event.name === LoginStatusChangeEvent && ((_this$_deps$tabManage = this._deps.tabManager.event.args) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage[0]) !== this.loggedIn)) {
                  _context6.next = 10;
                  break;
                }
                /* eslint { "prefer-destructuring": 0 } */
                this._loggedIn = (_this$_deps$tabManage2 = this._deps.tabManager.event.args) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2[0];
                _context6.next = 10;
                return this.fetchToken();
              case 10:
                if (this.ready && this._deps.environment && this._deps.environment.changeCounter !== this._lastEnvironmentCounter) {
                  this._lastEnvironmentCounter = this._deps.environment.changeCounter;
                  this._bindEvents();
                }
              case 11:
              case "end":
                return _context6.stop();
            }
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
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var _this3 = this;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.refreshTokenHelper.loggedIn();
              case 2:
                this._loggedIn = _context7.sent;
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
                _context7.next = 8;
                return this.fetchToken();
              case 8:
              case "end":
                return _context7.stop();
            }
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
      var _fetchToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var platform, token;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                platform = this._deps.client.service.platform();
                if (!this._loggedIn) {
                  _context8.next = 7;
                  break;
                }
                _context8.next = 4;
                return platform.auth().data();
              case 4:
                _context8.t0 = _context8.sent;
                _context8.next = 8;
                break;
              case 7:
                _context8.t0 = null;
              case 8:
                token = _context8.t0;
                this.setInitLogin({
                  loggedIn: this._loggedIn,
                  token: token
                });
              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function fetchToken() {
        return _fetchToken.apply(this, arguments);
      }
      return fetchToken;
    }()
  }, {
    key: "login",
    /**
     * @description Login either with username/password or with authorization code
     */
    value: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_ref11) {
        var username, password, extension, remember, code, redirectUri, accessToken, expiresIn, endpointId, tokenType, scope, tokenUri, discoveryUri, ownerId, extensionData;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                username = _ref11.username, password = _ref11.password, extension = _ref11.extension, remember = _ref11.remember, code = _ref11.code, redirectUri = _ref11.redirectUri, accessToken = _ref11.accessToken, expiresIn = _ref11.expiresIn, endpointId = _ref11.endpointId, tokenType = _ref11.tokenType, scope = _ref11.scope, tokenUri = _ref11.tokenUri, discoveryUri = _ref11.discoveryUri;
                this.setLogin();
                if (!accessToken) {
                  _context9.next = 9;
                  break;
                }
                _context9.next = 5;
                return this._deps.client.service.platform().auth().setData({
                  token_type: tokenType,
                  access_token: accessToken,
                  expires_in: expiresIn,
                  refresh_token_expires_in: expiresIn,
                  scope: scope
                });
              case 5:
                _context9.next = 7;
                return this._deps.client.account().extension().get();
              case 7:
                extensionData = _context9.sent;
                ownerId = extensionData.id;
              case 9:
                // TODO: support to set redirectUri in js sdk v4 login function
                if (!this._deps.client.service.platform()._redirectUri) {
                  this._deps.client.service.platform()._redirectUri = redirectUri;
                }
                return _context9.abrupt("return", this._deps.client.service.platform().login({
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
              case 11:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));
      function login(_x4) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
  }, {
    key: "refreshToken",
    value: function () {
      var _refreshToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var resp, token;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this._deps.client.service.platform().refresh();
              case 2:
                resp = _context10.sent;
                _context10.next = 5;
                return resp.json();
              case 5:
                token = _context10.sent;
                return _context10.abrupt("return", token);
              case 7:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));
      function refreshToken() {
        return _refreshToken.apply(this, arguments);
      }
      return refreshToken;
    }()
  }, {
    key: "getLoginUrl",
    value: function getLoginUrl(_ref12) {
      var redirectUri = _ref12.redirectUri,
        force = _ref12.force,
        _ref12$implicit = _ref12.implicit,
        implicit = _ref12$implicit === void 0 ? false : _ref12$implicit,
        options = _objectWithoutProperties(_ref12, ["redirectUri", "force", "implicit"]);
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
    value: function () {
      var _logout = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        var _this4 = this;
        var _ref13,
          _ref13$dismissAllAler,
          dismissAllAlert,
          _this$_deps$rateLimit,
          handlers,
          _iterator2,
          _step2,
          _loop,
          _ret,
          _args13 = arguments;
        return regeneratorRuntime.wrap(function _callee12$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _ref13 = _args13.length > 0 && _args13[0] !== undefined ? _args13[0] : {}, _ref13$dismissAllAler = _ref13.dismissAllAlert, dismissAllAlert = _ref13$dismissAllAler === void 0 ? true : _ref13$dismissAllAler;
                this.setBeforeLogout();
                if (dismissAllAlert) {
                  // fix bug [https://jira_domain/browse/RCINT-17381]
                  this._deps.alert.dismissAllExpectSpecified({
                    specifiedAlertIds: [(_this$_deps$rateLimit = this._deps.rateLimiter) === null || _this$_deps$rateLimit === void 0 ? void 0 : _this$_deps$rateLimit.rateLimitAlertId]
                  });
                }
                handlers = _toConsumableArray(this._beforeLogoutHandlers);
                _context13.prev = 4;
                if (this._deps.tabManager && this._deps.tabManager.ready) {
                  this._deps.tabManager.send(LoginStatusChangeEvent, false);
                }
                _iterator2 = _createForOfIteratorHelper(handlers);
                _context13.prev = 7;
                _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {
                  var handler, result;
                  return regeneratorRuntime.wrap(function _loop$(_context12) {
                    while (1) {
                      switch (_context12.prev = _context12.next) {
                        case 0:
                          handler = _step2.value;
                          _context12.next = 3;
                          return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
                            return regeneratorRuntime.wrap(function _callee11$(_context11) {
                              while (1) {
                                switch (_context11.prev = _context11.next) {
                                  case 0:
                                    return _context11.abrupt("return", handler());
                                  case 1:
                                  case "end":
                                    return _context11.stop();
                                }
                              }
                            }, _callee11);
                          }))();
                        case 3:
                          result = _context12.sent;
                          if (!result) {
                            _context12.next = 8;
                            break;
                          }
                          _this4.setCancelLogout();
                          if (_this4._deps.tabManager && _this4._deps.tabManager.ready) {
                            _this4._deps.tabManager.send(LoginStatusChangeEvent, true);
                          }
                          return _context12.abrupt("return", {
                            v: Promise.reject(result)
                          });
                        case 8:
                        case "end":
                          return _context12.stop();
                      }
                    }
                  }, _loop);
                });
                _iterator2.s();
              case 10:
                if ((_step2 = _iterator2.n()).done) {
                  _context13.next = 17;
                  break;
                }
                return _context13.delegateYield(_loop(), "t0", 12);
              case 12:
                _ret = _context13.t0;
                if (!(_typeof(_ret) === "object")) {
                  _context13.next = 15;
                  break;
                }
                return _context13.abrupt("return", _ret.v);
              case 15:
                _context13.next = 10;
                break;
              case 17:
                _context13.next = 22;
                break;
              case 19:
                _context13.prev = 19;
                _context13.t1 = _context13["catch"](7);
                _iterator2.e(_context13.t1);
              case 22:
                _context13.prev = 22;
                _iterator2.f();
                return _context13.finish(22);
              case 25:
                _context13.next = 30;
                break;
              case 27:
                _context13.prev = 27;
                _context13.t2 = _context13["catch"](4);
                console.error(_context13.t2);
              case 30:
                this.setLogout();
                if (!this.isImplicit) {
                  _context13.next = 35;
                  break;
                }
                this._deps.client.service.platform()._cache.clean();
                this.setLogoutSuccess();
                return _context13.abrupt("return", null);
              case 35:
                return _context13.abrupt("return", this._deps.client.service.platform().logout());
              case 36:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee12, this, [[4, 27], [7, 19, 22, 25]]);
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
      var _refreshImplicitToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(_ref15) {
        var tokenType, accessToken, expiresIn, endpointId, extensionData, ownerId, platform, newAuthData;
        return regeneratorRuntime.wrap(function _callee13$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                tokenType = _ref15.tokenType, accessToken = _ref15.accessToken, expiresIn = _ref15.expiresIn, endpointId = _ref15.endpointId;
                _context14.prev = 1;
                _context14.next = 4;
                return this._deps.client.account().extension().get();
              case 4:
                extensionData = _context14.sent;
                ownerId = String(extensionData.id);
                if (!(ownerId !== String(this.ownerId))) {
                  _context14.next = 8;
                  break;
                }
                return _context14.abrupt("return");
              case 8:
                platform = this._deps.client.service.platform();
                newAuthData = {
                  token_type: tokenType,
                  access_token: accessToken,
                  expires_in: expiresIn,
                  refresh_token_expires_in: expiresIn,
                  endpoint_id: endpointId
                };
                _context14.next = 12;
                return platform.auth().setData(newAuthData);
              case 12:
                platform.emit(platform.events.refreshSuccess, newAuthData);
                _context14.next = 18;
                break;
              case 15:
                _context14.prev = 15;
                _context14.t0 = _context14["catch"](1);
                console.error('refreshImplicitToken error:', _context14.t0);
              case 18:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee13, this, [[1, 15]]);
      }));
      function refreshImplicitToken(_x5) {
        return _refreshImplicitToken.apply(this, arguments);
      }
      return refreshImplicitToken;
    }()
  }, {
    key: "checkIsLoggedIn",
    value: function () {
      var _checkIsLoggedIn = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        return regeneratorRuntime.wrap(function _callee14$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return this._deps.client.service.platform().loggedIn();
              case 2:
                return _context15.abrupt("return", this.loginStatus === _loginStatus.loginStatus.loggedIn);
              case 3:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee14, this);
      }));
      function checkIsLoggedIn() {
        return _checkIsLoggedIn.apply(this, arguments);
      }
      return checkIsLoggedIn;
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
  return Auth;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "loginStatus", [_core.state], {
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
}), _applyDecoratedDescriptor(_class2.prototype, "_setToken", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLoginSuccess", [_dec2, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLoginSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLoginError", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLoginError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLogoutSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLogoutSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setRefreshSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setRefreshSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setRefreshError", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setRefreshError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLogoutError", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLogoutError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLogin", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLogin"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setBeforeLogout", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setBeforeLogout"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCancelLogout", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCancelLogout"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLogout", [_dec3, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLogout"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setInitLogin", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setInitLogin"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "login", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "login"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "refreshToken", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "refreshToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "logout", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "logout"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "refreshImplicitToken", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "refreshImplicitToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkIsLoggedIn", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "checkIsLoggedIn"), _class2.prototype)), _class2)) || _class);
exports.Auth = Auth;
//# sourceMappingURL=Auth.js.map
