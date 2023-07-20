"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.some");
require("core-js/modules/es.function.name");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.set");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerSyncTokenEvent = exports.LoginStatusChangeEvent = exports.Auth = void 0;
require("regenerator-runtime/runtime");
var _url = _interopRequireDefault(require("url"));
var _core = require("@ringcentral-integration/core");
var _trackEvents = require("../../enums/trackEvents");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _validateIsOffline = _interopRequireDefault(require("../../lib/validateIsOffline"));
var _authMessages = require("./authMessages");
var _loginStatus = require("./loginStatus");
var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
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
    // @ts-expect-error
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
    _this._unbindEvents = void 0;
    _this._lastEnvironmentCounter = 0;
    _this._proxyUri = void 0;
    _this._redirectUri = void 0;
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
      var client = this._deps.client.service._client;
      var onRequestError = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(error) {
          var _error$response;
          var _error$response2, _ref3, _ref3$errors, errors;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(((_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status) === 403)) {
                    _context.next = 13;
                    break;
                  }
                  _context.next = 3;
                  return (_error$response2 = error.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.clone().json();
                case 3:
                  _context.t0 = _context.sent;
                  if (_context.t0) {
                    _context.next = 6;
                    break;
                  }
                  _context.t0 = {};
                case 6:
                  _ref3 = _context.t0;
                  _ref3$errors = _ref3.errors;
                  errors = _ref3$errors === void 0 ? [] : _ref3$errors;
                  if (!errors.some(function () {
                    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                      errorCode = _ref4.errorCode;
                    return errorCode === 'OAU-167';
                  })) {
                    _context.next = 13;
                    break;
                  }
                  _this2.logout();
                  _this2._deps.alert.warning({
                    message: _authMessages.authMessages.siteAccessForbidden,
                    payload: error,
                    ttl: 0
                  });
                  return _context.abrupt("return");
                case 13:
                  if (error instanceof Error && error.message === 'Token revoked') {
                    _this2.logout();
                  }
                case 14:
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
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
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
          return _ref5.apply(this, arguments);
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
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
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
          return _ref6.apply(this, arguments);
        };
      }();
      var onRefreshError = /*#__PURE__*/function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(error) {
          var _error$response3, _yield$error$response, _yield$error$response2, _error$response4;
          var isOffline, resStatus, refreshTokenValid, isAARError;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  // user is still considered logged in if the refreshToken is still valid
                  isOffline = (0, _validateIsOffline["default"])(error.message);
                  resStatus = Number((_error$response3 = error.response) === null || _error$response3 === void 0 ? void 0 : _error$response3.status);
                  _context4.t0 = Boolean;
                  _context4.t1 = isOffline || resStatus >= 500;
                  if (!_context4.t1) {
                    _context4.next = 8;
                    break;
                  }
                  _context4.next = 7;
                  return platform.auth().refreshTokenValid();
                case 7:
                  _context4.t1 = _context4.sent;
                case 8:
                  _context4.t2 = _context4.t1;
                  refreshTokenValid = (0, _context4.t0)(_context4.t2);
                  _this2.setRefreshError(refreshTokenValid);
                  _context4.t3 = resStatus === 403;
                  if (!_context4.t3) {
                    _context4.next = 25;
                    break;
                  }
                  _context4.next = 15;
                  return (_error$response4 = error.response) === null || _error$response4 === void 0 ? void 0 : _error$response4.clone().json();
                case 15:
                  _context4.t5 = _yield$error$response = _context4.sent;
                  _context4.t4 = _context4.t5 === null;
                  if (_context4.t4) {
                    _context4.next = 19;
                    break;
                  }
                  _context4.t4 = _yield$error$response === void 0;
                case 19:
                  if (!_context4.t4) {
                    _context4.next = 23;
                    break;
                  }
                  _context4.t6 = void 0;
                  _context4.next = 24;
                  break;
                case 23:
                  _context4.t6 = (_yield$error$response2 = _yield$error$response.error) === null || _yield$error$response2 === void 0 ? void 0 : _yield$error$response2.some(function () {
                    var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                      _ref8$errorCode = _ref8.errorCode,
                      errorCode = _ref8$errorCode === void 0 ? '' : _ref8$errorCode;
                    return errorCode === 'OAU-167';
                  });
                case 24:
                  _context4.t3 = _context4.t6;
                case 25:
                  isAARError = _context4.t3;
                  _context4.t7 = !isAARError && !refreshTokenValid;
                  if (!_context4.t7) {
                    _context4.next = 32;
                    break;
                  }
                  _context4.next = 30;
                  return platform.auth().data();
                case 30:
                  _context4.t8 = _context4.sent.access_token;
                  _context4.t7 = _context4.t8 !== '';
                case 32:
                  if (!_context4.t7) {
                    _context4.next = 36;
                    break;
                  }
                  _this2._deps.alert.danger({
                    message: _authMessages.authMessages.sessionExpired,
                    payload: error,
                    ttl: 0
                  });
                  // clean the cache so the error doesn't show again
                  platform._cache.clean();
                  return _context4.abrupt("return");
                case 36:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));
        return function onRefreshError(_x2) {
          return _ref7.apply(this, arguments);
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
      var _onStateChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _this$_deps$tabManage, _this$_deps$tabManage2;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(this._deps.tabManager && this._deps.tabManager.ready && this.ready)) {
                  _context5.next = 10;
                  break;
                }
                if (!(this._loggedIn && this.loginStatus === _loginStatus.loginStatus.notLoggedIn || !this._loggedIn && this.loginStatus === _loginStatus.loginStatus.loggedIn)) {
                  _context5.next = 6;
                  break;
                }
                this._loggedIn = !this._loggedIn;
                this._deps.tabManager.send(LoginStatusChangeEvent, this._loggedIn);
                _context5.next = 10;
                break;
              case 6:
                if (!(this._deps.tabManager.event && this._deps.tabManager.event.name === LoginStatusChangeEvent && ((_this$_deps$tabManage = this._deps.tabManager.event.args) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage[0]) !== this.loggedIn)) {
                  _context5.next = 10;
                  break;
                }
                /* eslint { "prefer-destructuring": 0 } */
                this._loggedIn = (_this$_deps$tabManage2 = this._deps.tabManager.event.args) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2[0];
                _context5.next = 10;
                return this.fetchToken();
              case 10:
                if (this.ready && this._deps.environment && this._deps.environment.changeCounter !== this._lastEnvironmentCounter) {
                  this._lastEnvironmentCounter = this._deps.environment.changeCounter;
                  this._bindEvents();
                }
              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function onStateChange() {
        return _onStateChange.apply(this, arguments);
      }
      return onStateChange;
    }()
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var _this3 = this;
        var platform;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                platform = this._deps.client.service.platform();
                _context6.next = 3;
                return platform.loggedIn();
              case 3:
                this._loggedIn = _context6.sent;
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
              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function onInit() {
        return _onInit.apply(this, arguments);
      }
      return onInit;
    }()
  }, {
    key: "fetchToken",
    value: function () {
      var _fetchToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var platform, token;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                platform = this._deps.client.service.platform();
                if (!this._loggedIn) {
                  _context7.next = 7;
                  break;
                }
                _context7.next = 4;
                return platform.auth().data();
              case 4:
                _context7.t0 = _context7.sent;
                _context7.next = 8;
                break;
              case 7:
                _context7.t0 = null;
              case 8:
                token = _context7.t0;
                this.setInitLogin({
                  loggedIn: this._loggedIn,
                  token: token
                });
              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function fetchToken() {
        return _fetchToken.apply(this, arguments);
      }
      return fetchToken;
    }()
  }, {
    key: "onInitSuccess",
    value: function () {
      var _onInitSuccess = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.fetchToken();
              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function onInitSuccess() {
        return _onInitSuccess.apply(this, arguments);
      }
      return onInitSuccess;
    }()
  }, {
    key: "login",
    /**
     * @description Login either with username/password or with authorization code
     */
    value: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_ref9) {
        var username, password, extension, remember, code, redirectUri, accessToken, expiresIn, endpointId, tokenType, scope, tokenUri, discoveryUri, ownerId, extensionData;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                username = _ref9.username, password = _ref9.password, extension = _ref9.extension, remember = _ref9.remember, code = _ref9.code, redirectUri = _ref9.redirectUri, accessToken = _ref9.accessToken, expiresIn = _ref9.expiresIn, endpointId = _ref9.endpointId, tokenType = _ref9.tokenType, scope = _ref9.scope, tokenUri = _ref9.tokenUri, discoveryUri = _ref9.discoveryUri;
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
      function login(_x3) {
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
    value: function getLoginUrl(_ref10) {
      var redirectUri = _ref10.redirectUri,
        force = _ref10.force,
        _ref10$implicit = _ref10.implicit,
        implicit = _ref10$implicit === void 0 ? false : _ref10$implicit,
        options = _objectWithoutProperties(_ref10, ["redirectUri", "force", "implicit"]);
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
        var _ref11,
          _ref11$dismissAllAler,
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
                _ref11 = _args13.length > 0 && _args13[0] !== undefined ? _args13[0] : {}, _ref11$dismissAllAler = _ref11.dismissAllAlert, dismissAllAlert = _ref11$dismissAllAler === void 0 ? true : _ref11$dismissAllAler;
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
     * @function
     * @param {Function} handler
     * @returns {Function} return that delete handler event, call that will delete that event
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
     * @function
     * @param {Function} handler
     */
  }, {
    key: "removeBeforeLogoutHandler",
    value: function removeBeforeLogoutHandler(handler) {
      this._beforeLogoutHandlers["delete"](handler);
    }
  }, {
    key: "addAfterLoggedInHandler",
    value: function addAfterLoggedInHandler(handler) {
      var _this6 = this;
      this._afterLoggedInHandlers.add(handler);
      return function () {
        _this6._afterLoggedInHandlers["delete"](handler);
      };
    }
  }, {
    key: "refreshImplicitToken",
    value: function () {
      var _refreshImplicitToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(_ref13) {
        var tokenType, accessToken, expiresIn, endpointId, extensionData, ownerId, platform, newAuthData;
        return regeneratorRuntime.wrap(function _callee13$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                tokenType = _ref13.tokenType, accessToken = _ref13.accessToken, expiresIn = _ref13.expiresIn, endpointId = _ref13.endpointId;
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
      function refreshImplicitToken(_x4) {
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
    key: "redirectUri",
    get: function get() {
      return _url["default"].resolve(window.location.href, this._redirectUri);
    }
  }, {
    key: "proxyUri",
    get: function get() {
      return this._proxyUri;
    }
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
