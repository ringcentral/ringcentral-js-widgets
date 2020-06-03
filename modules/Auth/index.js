"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.function.name");

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.set");

var _url = _interopRequireDefault(require("url"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _di = require("../../lib/di");

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _validateIsOffline = _interopRequireDefault(require("../../lib/validateIsOffline"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _authMessages = _interopRequireDefault(require("./authMessages"));

var _getAuthReducer = _interopRequireDefault(require("./getAuthReducer"));

var _loginStatus = _interopRequireDefault(require("./loginStatus"));

var _dec, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var LoginStatusChangeEvent = 'loginStatusChange';
/**
 * @class
 * @description Authentication module
 */

var Auth = (_dec = (0, _di.Module)({
  deps: ['Client', 'Alert', 'Brand', 'Locale', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'Environment',
    optional: true
  }, {
    dep: 'AuthOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModule) {
  _inherits(Auth, _RcModule);

  var _super = _createSuper(Auth);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Alert} params.alert - alert module instance
   * @param {Brand} params.brand - brand module instance
   * @param {Locale} params.locale - locale module instance
   * @param {TabManager} params.tabManager - tabManager module instance
   * @param {environment} params.Environment - environment module instance
   * @param {String} params.redirectUri - redirect uri
   * @param {String} params.proxyUri - proxyUri module instance
   * @param {Number} params.defaultProxyRetry - default proxy retry time 5000
   */
  function Auth() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var client = _ref.client,
        alert = _ref.alert,
        brand = _ref.brand,
        locale = _ref.locale,
        tabManager = _ref.tabManager,
        environment = _ref.environment,
        options = _objectWithoutProperties(_ref, ["client", "alert", "brand", "locale", "tabManager", "environment"]);

    _classCallCheck(this, Auth);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: _actionTypes["default"]
    }));
    _this._client = void 0;
    _this._alert = void 0;
    _this._brand = void 0;
    _this._locale = void 0;
    _this._tabManager = void 0;
    _this._environment = void 0;
    _this._beforeLogoutHandlers = void 0;
    _this._afterLoggedInHandlers = void 0;
    _this._proxyFrame = void 0;
    _this._proxyFrameLoaded = void 0;
    _this._unbindEvents = void 0;
    _this._lastEnvironmentCounter = void 0;
    _this._proxyUri = void 0;
    _this._redirectUri = void 0;
    _this._client = (0, _ensureExist["default"])(client, 'client');
    _this._alert = (0, _ensureExist["default"])(alert, 'alert');
    _this._brand = (0, _ensureExist["default"])(brand, 'brand');
    _this._locale = (0, _ensureExist["default"])(locale, 'locale');
    _this._tabManager = tabManager;
    _this._environment = environment;
    _this._reducer = (0, _getAuthReducer["default"])(_this.actionTypes);
    _this._beforeLogoutHandlers = new Set();
    _this._afterLoggedInHandlers = new Set();
    _this._proxyFrame = null;
    _this._proxyFrameLoaded = false;
    _this._unbindEvents = null;
    _this._lastEnvironmentCounter = 0;
    return _this;
  }

  _createClass(Auth, [{
    key: "_bindEvents",
    value: function _bindEvents() {
      var _this2 = this;

      if (this._unbindEvents) this._unbindEvents();

      var platform = this._client.service.platform();

      var client = this._client.service._client;

      var onRequestError = function onRequestError(apiResponse) {
        if (apiResponse instanceof Error && apiResponse.message === 'Token revoked') {
          _this2.logout();
        }
      };

      var onLoginSuccess = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var handlers, _iterator, _step, handler;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _this2.store.dispatch({
                    type: _this2.actionTypes.loginSuccess,
                    token: platform.auth().data()
                  });

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

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function onLoginSuccess() {
          return _ref2.apply(this, arguments);
        };
      }();

      var onLoginError = function onLoginError(error) {
        _this2.store.dispatch({
          type: _this2.actionTypes.loginError,
          error: error
        });
      };

      var onLogoutSuccess = function onLogoutSuccess() {
        _this2.store.dispatch({
          type: _this2.actionTypes.logoutSuccess
        });
      };

      var onLogoutError = function onLogoutError(error) {
        platform._cache.clean();

        _this2.store.dispatch({
          type: _this2.actionTypes.logoutError,
          error: error
        });

        if (error) {
          _this2._alert.danger({
            message: _authMessages["default"].logoutError,
            payload: error
          });
        }
      };

      var onRefreshSuccess = function onRefreshSuccess() {
        _this2.store.dispatch({
          type: _this2.actionTypes.refreshSuccess,
          token: platform.auth().data()
        });
      };

      var onRefreshError = function onRefreshError(error) {
        // user is still considered logged in if the refreshToken is still valid
        var isOffline = (0, _validateIsOffline["default"])(error.message);
        var res_status = error.apiResponse && error.apiResponse._response && error.apiResponse._response.status || null;
        var refreshTokenValid = (isOffline || res_status >= 500) && platform.auth().refreshTokenValid();

        _this2.store.dispatch({
          type: _this2.actionTypes.refreshError,
          error: error,
          refreshTokenValid: refreshTokenValid
        });

        if (!refreshTokenValid && platform.auth().data().access_token !== '') {
          _this2._alert.danger({
            message: _authMessages["default"].sessionExpired,
            payload: error,
            ttl: 0
          }); // clean the cache so the error doesn't show again


          platform._cache.clean();
        }
      };

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
    key: "initialize",
    value: function initialize() {
      var _this3 = this;

      var loggedIn;
      this.store.subscribe( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var platform;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_this3.status === _moduleStatuses["default"].pending && _this3._locale.ready && (!_this3._tabManager || _this3._tabManager.ready) && (!_this3._environment || _this3._environment.ready))) {
                  _context2.next = 8;
                  break;
                }

                _this3.store.dispatch({
                  type: _this3.actionTypes.init
                });

                platform = _this3._client.service.platform();
                _context2.next = 5;
                return platform.loggedIn();

              case 5:
                loggedIn = _context2.sent;

                _this3._bindEvents();

                _this3.store.dispatch({
                  type: _this3.actionTypes.initSuccess,
                  loggedIn: loggedIn,
                  token: loggedIn ? platform.auth().data() : null
                });

              case 8:
                if (_this3._tabManager && _this3._tabManager.ready && _this3.ready) {
                  if (loggedIn && _this3.loginStatus === _loginStatus["default"].notLoggedIn || !loggedIn && _this3.loginStatus === _loginStatus["default"].loggedIn) {
                    loggedIn = !loggedIn;

                    _this3._tabManager.send(LoginStatusChangeEvent, loggedIn);
                  } else if (_this3._tabManager.event && _this3._tabManager.event.name === LoginStatusChangeEvent && _this3._tabManager.event.args[0] !== loggedIn) {
                    /* eslint { "prefer-destructuring": 0 } */
                    loggedIn = _this3._tabManager.event.args[0];

                    _this3.store.dispatch({
                      type: _this3.actionTypes.tabSync,
                      loggedIn: loggedIn,
                      token: loggedIn ? _this3._client.service.platform().auth().data() : null
                    });
                  }
                }

                if (_this3.ready && _this3._environment && _this3._environment.changeCounter !== _this3._lastEnvironmentCounter) {
                  _this3._lastEnvironmentCounter = _this3._environment.changeCounter;

                  _this3._bindEvents();
                }

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      })));
    }
  }, {
    key: "login",

    /**
     * @function
     * @param {String} options.username
     * @param {String} options.password
     * @param {String} options.extension
     * @param {Booleal|Number} options.remember
     * @param {String} params.code,
     * @param {String} params.redirectUri,
     * @return {Promise}
     * @description Login either with username/password or with authorization code
     */
    value: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref4) {
        var username, password, extension, remember, code, redirectUri, accessToken, expiresIn, endpointId, tokenType, scope, ownerId, extensionData;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                username = _ref4.username, password = _ref4.password, extension = _ref4.extension, remember = _ref4.remember, code = _ref4.code, redirectUri = _ref4.redirectUri, accessToken = _ref4.accessToken, expiresIn = _ref4.expiresIn, endpointId = _ref4.endpointId, tokenType = _ref4.tokenType, scope = _ref4.scope;
                this.store.dispatch({
                  type: this.actionTypes.login
                });

                if (!accessToken) {
                  _context3.next = 8;
                  break;
                }

                this._client.service.platform().auth().setData({
                  token_type: tokenType,
                  access_token: accessToken,
                  expires_in: expiresIn,
                  refresh_token_expires_in: expiresIn,
                  scope: scope
                });

                _context3.next = 6;
                return this._client.account().extension().get();

              case 6:
                extensionData = _context3.sent;
                ownerId = extensionData.id;

              case 8:
                return _context3.abrupt("return", this._client.service.platform().login({
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
                  owner_id: ownerId
                }));

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function login(_x) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
    /**
     * @function
     * @param {String} options.redirectUri
     * @param {String} options.brandId
     * @param {Boolean} options.force
     * @param {Boolean} options.implicit
     * @return {String}
     * @description get OAuth page url
     */

  }, {
    key: "getLoginUrl",
    value: function getLoginUrl(_ref5) {
      var redirectUri = _ref5.redirectUri,
          state = _ref5.state,
          brandId = _ref5.brandId,
          display = _ref5.display,
          prompt = _ref5.prompt,
          force = _ref5.force,
          _ref5$implicit = _ref5.implicit,
          implicit = _ref5$implicit === void 0 ? false : _ref5$implicit;
      return "".concat(this._client.service.platform().loginUrl({
        redirectUri: redirectUri,
        state: state,
        brandId: brandId,
        display: display,
        prompt: prompt,
        implicit: implicit
      })).concat(force ? '&force' : '');
    }
    /**
     * @function
     * @description Triggers the beforeLogoutHandlers to run
     *  and then proceed to logout from ringcentral.
     */

  }, {
    key: "logout",
    value: function () {
      var _logout = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _this4 = this;

        var _ref6,
            _ref6$dismissAllAlert,
            dismissAllAlert,
            handlers,
            _iterator2,
            _step2,
            _loop,
            _ret,
            _args6 = arguments;

        return regeneratorRuntime.wrap(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _ref6 = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {}, _ref6$dismissAllAlert = _ref6.dismissAllAlert, dismissAllAlert = _ref6$dismissAllAlert === void 0 ? true : _ref6$dismissAllAlert;

                if (dismissAllAlert) {
                  this._alert.dismissAll();
                }

                this.store.dispatch({
                  type: this.actionTypes.beforeLogout
                });
                handlers = _toConsumableArray(this._beforeLogoutHandlers);
                _context6.prev = 4;

                if (this._tabManager && this._tabManager.ready) {
                  this._tabManager.send(LoginStatusChangeEvent, false);
                }

                _iterator2 = _createForOfIteratorHelper(handlers);
                _context6.prev = 7;
                _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {
                  var handler, result;
                  return regeneratorRuntime.wrap(function _loop$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          handler = _step2.value;
                          _context5.next = 3;
                          return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                              while (1) {
                                switch (_context4.prev = _context4.next) {
                                  case 0:
                                    return _context4.abrupt("return", handler());

                                  case 1:
                                  case "end":
                                    return _context4.stop();
                                }
                              }
                            }, _callee4);
                          }))();

                        case 3:
                          result = _context5.sent;

                          if (!result) {
                            _context5.next = 8;
                            break;
                          }

                          _this4.store.dispatch({
                            type: _this4.actionTypes.cancelLogout
                          });

                          if (_this4._tabManager && _this4._tabManager.ready) {
                            _this4._tabManager.send(LoginStatusChangeEvent, true);
                          }

                          return _context5.abrupt("return", {
                            v: Promise.reject(result)
                          });

                        case 8:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _loop);
                });

                _iterator2.s();

              case 10:
                if ((_step2 = _iterator2.n()).done) {
                  _context6.next = 17;
                  break;
                }

                return _context6.delegateYield(_loop(), "t0", 12);

              case 12:
                _ret = _context6.t0;

                if (!(_typeof(_ret) === "object")) {
                  _context6.next = 15;
                  break;
                }

                return _context6.abrupt("return", _ret.v);

              case 15:
                _context6.next = 10;
                break;

              case 17:
                _context6.next = 22;
                break;

              case 19:
                _context6.prev = 19;
                _context6.t1 = _context6["catch"](7);

                _iterator2.e(_context6.t1);

              case 22:
                _context6.prev = 22;

                _iterator2.f();

                return _context6.finish(22);

              case 25:
                _context6.next = 30;
                break;

              case 27:
                _context6.prev = 27;
                _context6.t2 = _context6["catch"](4);

                this._alert.danger({
                  message: _authMessages["default"].beforeLogoutError,
                  payload: _context6.t2
                });

              case 30:
                this.store.dispatch({
                  type: this.actionTypes.logout
                });

                if (!this.isImplicit) {
                  _context6.next = 35;
                  break;
                }

                this._client.service.platform()._cache.clean();

                this.store.dispatch({
                  type: this.actionTypes.logoutSuccess
                });
                return _context6.abrupt("return", null);

              case 35:
                return _context6.abrupt("return", this._client.service.platform().logout());

              case 36:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee5, this, [[4, 27], [7, 19, 22, 25]]);
      }));

      function logout() {
        return _logout.apply(this, arguments);
      }

      return logout;
    }()
    /**
     * @function
     * @param {Function} handler
     * @returns {Function}
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
      var _refreshImplicitToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_ref8) {
        var tokenType, accessToken, expiresIn, endpointId, extensionData, ownerId, platform, newAuthData;
        return regeneratorRuntime.wrap(function _callee6$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                tokenType = _ref8.tokenType, accessToken = _ref8.accessToken, expiresIn = _ref8.expiresIn, endpointId = _ref8.endpointId;
                _context7.prev = 1;
                _context7.next = 4;
                return this._client.account().extension().get();

              case 4:
                extensionData = _context7.sent;
                ownerId = String(extensionData.id);

                if (!(ownerId !== String(this.ownerId))) {
                  _context7.next = 8;
                  break;
                }

                return _context7.abrupt("return");

              case 8:
                platform = this._client.service.platform();
                newAuthData = {
                  token_type: tokenType,
                  access_token: accessToken,
                  expires_in: expiresIn,
                  refresh_token_expires_in: expiresIn,
                  endpoint_id: endpointId
                };
                platform.auth().setData(newAuthData);
                platform.emit(platform.events.refreshSuccess, newAuthData);
                _context7.next = 17;
                break;

              case 14:
                _context7.prev = 14;
                _context7.t0 = _context7["catch"](1);
                console.error('refreshImplicitToken error:', _context7.t0);

              case 17:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee6, this, [[1, 14]]);
      }));

      function refreshImplicitToken(_x2) {
        return _refreshImplicitToken.apply(this, arguments);
      }

      return refreshImplicitToken;
    }()
  }, {
    key: "checkIsLoggedIn",
    value: function () {
      var _checkIsLoggedIn = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this._client.service.platform().loggedIn();

              case 2:
                return _context8.abrupt("return", this.state.loginStatus === _loginStatus["default"].loggedIn);

              case 3:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee7, this);
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
    key: "token",
    get: function get() {
      return this.state.token;
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
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.state.status === _moduleStatuses["default"].ready;
    }
  }, {
    key: "loginStatus",
    get: function get() {
      return this.state.loginStatus;
    }
  }, {
    key: "isFreshLogin",
    get: function get() {
      return this.state.freshLogin;
    }
  }, {
    key: "loggedIn",
    get: function get() {
      return this.state.loginStatus === _loginStatus["default"].loggedIn || this.state.loginStatus === _loginStatus["default"].beforeLogout;
    }
  }, {
    key: "notLoggedIn",
    get: function get() {
      return this.state.loginStatus === _loginStatus["default"].notLoggedIn;
    }
  }, {
    key: "isImplicit",
    get: function get() {
      return !(this._client.service.platform()._appSecret && this._client.service.platform()._appSecret.length > 0);
    }
  }]);

  return Auth;
}(_RcModule2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "login", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "login"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "logout", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "logout"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "refreshImplicitToken", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "refreshImplicitToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkIsLoggedIn", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "checkIsLoggedIn"), _class2.prototype)), _class2)) || _class);
exports["default"] = Auth;
//# sourceMappingURL=index.js.map
