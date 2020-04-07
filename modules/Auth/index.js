"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.function.name");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_RcModule) {
  _inherits(Auth, _RcModule);

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

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Auth).call(this, _objectSpread({}, options, {
      actionTypes: _actionTypes["default"]
    })));
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

      var onLoginSuccess = function onLoginSuccess() {
        var handlers, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, handler;

        return regeneratorRuntime.async(function onLoginSuccess$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this2.store.dispatch({
                  type: _this2.actionTypes.loginSuccess,
                  token: platform.auth().data()
                });

                handlers = _toConsumableArray(_this2._afterLoggedInHandlers);
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 5;

                for (_iterator = handlers[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  handler = _step.value;
                  handler();
                }

                _context.next = 13;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](5);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 13:
                _context.prev = 13;
                _context.prev = 14;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 16:
                _context.prev = 16;

                if (!_didIteratorError) {
                  _context.next = 19;
                  break;
                }

                throw _iteratorError;

              case 19:
                return _context.finish(16);

              case 20:
                return _context.finish(13);

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, null, null, [[5, 9, 13, 21], [14,, 16, 20]]);
      };

      var onLoginError = function onLoginError(error) {
        _this2.store.dispatch({
          type: _this2.actionTypes.loginError,
          error: error
        });

        if (error) {
          _this2._alert.danger({
            message: _authMessages["default"].loginError,
            payload: error
          });
        }
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
      this.store.subscribe(function _callee() {
        var platform;
        return regeneratorRuntime.async(function _callee$(_context2) {
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
                return regeneratorRuntime.awrap(platform.loggedIn());

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
        });
      });
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
    value: function login(_ref2) {
      var username, password, extension, remember, code, redirectUri, accessToken, expiresIn, endpointId, tokenType, scope, ownerId, extensionData;
      return regeneratorRuntime.async(function login$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              username = _ref2.username, password = _ref2.password, extension = _ref2.extension, remember = _ref2.remember, code = _ref2.code, redirectUri = _ref2.redirectUri, accessToken = _ref2.accessToken, expiresIn = _ref2.expiresIn, endpointId = _ref2.endpointId, tokenType = _ref2.tokenType, scope = _ref2.scope;
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
              return regeneratorRuntime.awrap(this._client.account().extension().get());

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
      }, null, this);
    }
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
    value: function getLoginUrl(_ref3) {
      var redirectUri = _ref3.redirectUri,
          state = _ref3.state,
          brandId = _ref3.brandId,
          display = _ref3.display,
          prompt = _ref3.prompt,
          force = _ref3.force,
          _ref3$implicit = _ref3.implicit,
          implicit = _ref3$implicit === void 0 ? false : _ref3$implicit;
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
    value: function logout() {
      var _this4 = this;

      var _ref4,
          _ref4$dismissAllAlert,
          dismissAllAlert,
          handlers,
          _iteratorNormalCompletion2,
          _didIteratorError2,
          _iteratorError2,
          _loop,
          _iterator2,
          _step2,
          _ret,
          _args6 = arguments;

      return regeneratorRuntime.async(function logout$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _ref4 = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {}, _ref4$dismissAllAlert = _ref4.dismissAllAlert, dismissAllAlert = _ref4$dismissAllAlert === void 0 ? true : _ref4$dismissAllAlert;

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

              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context6.prev = 9;

              _loop = function _loop() {
                var handler, result;
                return regeneratorRuntime.async(function _loop$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        handler = _step2.value;
                        _context5.next = 3;
                        return regeneratorRuntime.awrap(function _callee2() {
                          return regeneratorRuntime.async(function _callee2$(_context4) {
                            while (1) {
                              switch (_context4.prev = _context4.next) {
                                case 0:
                                  return _context4.abrupt("return", handler());

                                case 1:
                                case "end":
                                  return _context4.stop();
                              }
                            }
                          });
                        }());

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
                });
              };

              _iterator2 = handlers[Symbol.iterator]();

            case 12:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context6.next = 21;
                break;
              }

              _context6.next = 15;
              return regeneratorRuntime.awrap(_loop());

            case 15:
              _ret = _context6.sent;

              if (!(_typeof(_ret) === "object")) {
                _context6.next = 18;
                break;
              }

              return _context6.abrupt("return", _ret.v);

            case 18:
              _iteratorNormalCompletion2 = true;
              _context6.next = 12;
              break;

            case 21:
              _context6.next = 27;
              break;

            case 23:
              _context6.prev = 23;
              _context6.t0 = _context6["catch"](9);
              _didIteratorError2 = true;
              _iteratorError2 = _context6.t0;

            case 27:
              _context6.prev = 27;
              _context6.prev = 28;

              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }

            case 30:
              _context6.prev = 30;

              if (!_didIteratorError2) {
                _context6.next = 33;
                break;
              }

              throw _iteratorError2;

            case 33:
              return _context6.finish(30);

            case 34:
              return _context6.finish(27);

            case 35:
              _context6.next = 40;
              break;

            case 37:
              _context6.prev = 37;
              _context6.t1 = _context6["catch"](4);

              this._alert.danger({
                message: _authMessages["default"].beforeLogoutError,
                payload: _context6.t1
              });

            case 40:
              this.store.dispatch({
                type: this.actionTypes.logout
              });

              if (!this.isImplicit) {
                _context6.next = 45;
                break;
              }

              this._client.service.platform()._cache.clean();

              this.store.dispatch({
                type: this.actionTypes.logoutSuccess
              });
              return _context6.abrupt("return", null);

            case 45:
              return _context6.abrupt("return", this._client.service.platform().logout());

            case 46:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this, [[4, 37], [9, 23, 27, 35], [28,, 30, 34]]);
    }
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
    value: function refreshImplicitToken(_ref5) {
      var tokenType, accessToken, expiresIn, endpointId, extensionData, ownerId, platform, newAuthData;
      return regeneratorRuntime.async(function refreshImplicitToken$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              tokenType = _ref5.tokenType, accessToken = _ref5.accessToken, expiresIn = _ref5.expiresIn, endpointId = _ref5.endpointId;
              _context7.prev = 1;
              _context7.next = 4;
              return regeneratorRuntime.awrap(this._client.account().extension().get());

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
      }, null, this, [[1, 14]]);
    }
  }, {
    key: "checkIsLoggedIn",
    value: function checkIsLoggedIn() {
      return regeneratorRuntime.async(function checkIsLoggedIn$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(this._client.service.platform().loggedIn());

            case 2:
              return _context8.abrupt("return", this.state.loginStatus === _loginStatus["default"].loggedIn);

            case 3:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
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
