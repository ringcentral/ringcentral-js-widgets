"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.is-array");

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

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.set");

var _url = _interopRequireDefault(require("url"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _getAuthReducer = _interopRequireDefault(require("./getAuthReducer"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _loginStatus = _interopRequireDefault(require("./loginStatus"));

var _authMessages = _interopRequireDefault(require("./authMessages"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _dec, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

var Auth = (
/**
 * @class
 * @description Authentication module
 */
_dec = (0, _di.Module)({
  deps: ['Client', 'Alert', 'Brand', 'Locale', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'Environment',
    optional: true
  }, {
    dep: 'AuthOptions',
    optional: true
  }, {
    dep: 'ConnectivityMonitor',
    optional: true
  }]
}), _dec(_class = (_class2 =
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
   * @param {connectivityMonitor} params.connectivityMonitor - connectivityMonitor module instance
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
        connectivityMonitor = _ref.connectivityMonitor,
        options = _objectWithoutProperties(_ref, ["client", "alert", "brand", "locale", "tabManager", "environment", "connectivityMonitor"]);

    _classCallCheck(this, Auth);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Auth).call(this, _objectSpread({}, options, {
      actionTypes: _actionTypes.default
    })));
    _this._client = (0, _ensureExist.default)(client, 'client');
    _this._alert = (0, _ensureExist.default)(alert, 'alert');
    _this._brand = (0, _ensureExist.default)(brand, 'brand');
    _this._locale = (0, _ensureExist.default)(locale, 'locale');
    _this._tabManager = tabManager;
    _this._environment = environment;
    _this._connectivityMonitor = connectivityMonitor;
    _this._reducer = (0, _getAuthReducer.default)(_this.actionTypes);
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

      var onLoginSuccess =
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2() {
          var handlers, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

          return regeneratorRuntime.wrap(function _callee2$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _this2.store.dispatch({
                    type: _this2.actionTypes.loginSuccess,
                    token: platform.auth().data()
                  });

                  handlers = _toConsumableArray(_this2._afterLoggedInHandlers);
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context3.prev = 5;
                  _loop =
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _loop() {
                    var handler;
                    return regeneratorRuntime.wrap(function _loop$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            handler = _step.value;
                            _context2.next = 3;
                            return _asyncToGenerator(
                            /*#__PURE__*/
                            regeneratorRuntime.mark(function _callee() {
                              return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                  switch (_context.prev = _context.next) {
                                    case 0:
                                      return _context.abrupt("return", handler());

                                    case 1:
                                    case "end":
                                      return _context.stop();
                                  }
                                }
                              }, _callee);
                            }))();

                          case 3:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _loop);
                  });
                  _iterator = handlers[Symbol.iterator]();

                case 8:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    _context3.next = 13;
                    break;
                  }

                  return _context3.delegateYield(_loop(), "t0", 10);

                case 10:
                  _iteratorNormalCompletion = true;
                  _context3.next = 8;
                  break;

                case 13:
                  _context3.next = 19;
                  break;

                case 15:
                  _context3.prev = 15;
                  _context3.t1 = _context3["catch"](5);
                  _didIteratorError = true;
                  _iteratorError = _context3.t1;

                case 19:
                  _context3.prev = 19;
                  _context3.prev = 20;

                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }

                case 22:
                  _context3.prev = 22;

                  if (!_didIteratorError) {
                    _context3.next = 25;
                    break;
                  }

                  throw _iteratorError;

                case 25:
                  return _context3.finish(22);

                case 26:
                  return _context3.finish(19);

                case 27:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee2, null, [[5, 15, 19, 27], [20,, 22, 26]]);
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

        if (error) {
          _this2._alert.danger({
            message: _authMessages.default.loginError,
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
            message: _authMessages.default.logoutError,
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
        var isOffline = error.message === 'Failed to fetch' || error.message === 'The Internet connection appears to be offline.' || error.message === 'NetworkError when attempting to fetch resource.' || error.message === 'Network Error 0x2ee7, Could not complete the operation due to error 00002ee7.';

        if (_this2._connectivityMonitor && _this2._connectivityMonitor.ready && _this2._connectivityMonitor.connectivity === false) {
          isOffline = true;
        }

        var refreshTokenValid = isOffline && platform.auth().refreshTokenValid();

        _this2.store.dispatch({
          type: _this2.actionTypes.refreshError,
          error: error,
          refreshTokenValid: refreshTokenValid
        });

        if (!refreshTokenValid && _this2._client.service.platform().auth().data().access_token !== '') {
          _this2._alert.danger({
            message: _authMessages.default.sessionExpired,
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
      this.store.subscribe(
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var platform;
        return regeneratorRuntime.wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(_this3.status === _moduleStatuses.default.pending && _this3._locale.ready && (!_this3._tabManager || _this3._tabManager.ready) && (!_this3._environment || _this3._environment.ready))) {
                  _context4.next = 8;
                  break;
                }

                _this3.store.dispatch({
                  type: _this3.actionTypes.init
                });

                platform = _this3._client.service.platform();
                _context4.next = 5;
                return platform.loggedIn();

              case 5:
                loggedIn = _context4.sent;

                _this3._bindEvents();

                _this3.store.dispatch({
                  type: _this3.actionTypes.initSuccess,
                  loggedIn: loggedIn,
                  token: loggedIn ? platform.auth().data() : null
                });

              case 8:
                if (_this3._tabManager && _this3._tabManager.ready && _this3.ready) {
                  if (loggedIn && _this3.loginStatus === _loginStatus.default.notLoggedIn || !loggedIn && _this3.loginStatus === _loginStatus.default.loggedIn) {
                    loggedIn = !loggedIn;

                    _this3._tabManager.send('loginStatusChange', loggedIn);
                  } else if (_this3._tabManager.event && _this3._tabManager.event.name === 'loginStatusChange' && _this3._tabManager.event.args[0] !== loggedIn) {
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
                return _context4.stop();
            }
          }
        }, _callee3);
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
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(_ref5) {
        var username, password, extension, remember, code, redirectUri, accessToken, expiresIn, endpointId, tokenType, ownerId, extensionData;
        return regeneratorRuntime.wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                username = _ref5.username, password = _ref5.password, extension = _ref5.extension, remember = _ref5.remember, code = _ref5.code, redirectUri = _ref5.redirectUri, accessToken = _ref5.accessToken, expiresIn = _ref5.expiresIn, endpointId = _ref5.endpointId, tokenType = _ref5.tokenType;
                this.store.dispatch({
                  type: this.actionTypes.login
                });

                if (!accessToken) {
                  _context5.next = 8;
                  break;
                }

                this._client.service.platform().auth().setData({
                  token_type: tokenType,
                  access_token: accessToken,
                  expires_in: expiresIn,
                  refresh_token_expires_in: expiresIn
                });

                _context5.next = 6;
                return this._client.account().extension().get();

              case 6:
                extensionData = _context5.sent;
                ownerId = extensionData.id;

              case 8:
                return _context5.abrupt("return", this._client.service.platform().login({
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
                return _context5.stop();
            }
          }
        }, _callee4, this);
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
    value: function getLoginUrl(_ref6) {
      var redirectUri = _ref6.redirectUri,
          state = _ref6.state,
          brandId = _ref6.brandId,
          display = _ref6.display,
          prompt = _ref6.prompt,
          force = _ref6.force,
          _ref6$implicit = _ref6.implicit,
          implicit = _ref6$implicit === void 0 ? false : _ref6$implicit;
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
      var _logout = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var _this4 = this;

        var handlers, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _loop2, _iterator2, _step2, _ret;

        return regeneratorRuntime.wrap(function _callee6$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                this._alert.dismissAll();

                this.store.dispatch({
                  type: this.actionTypes.beforeLogout
                });
                handlers = _toConsumableArray(this._beforeLogoutHandlers);
                _context8.prev = 3;
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context8.prev = 7;
                _loop2 =
                /*#__PURE__*/
                regeneratorRuntime.mark(function _loop2() {
                  var handler, result;
                  return regeneratorRuntime.wrap(function _loop2$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          handler = _step2.value;
                          _context7.next = 3;
                          return _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee5() {
                            return regeneratorRuntime.wrap(function _callee5$(_context6) {
                              while (1) {
                                switch (_context6.prev = _context6.next) {
                                  case 0:
                                    return _context6.abrupt("return", handler());

                                  case 1:
                                  case "end":
                                    return _context6.stop();
                                }
                              }
                            }, _callee5);
                          }))();

                        case 3:
                          result = _context7.sent;

                          if (!result) {
                            _context7.next = 7;
                            break;
                          }

                          _this4.store.dispatch({
                            type: _this4.actionTypes.cancelLogout
                          });

                          return _context7.abrupt("return", {
                            v: Promise.reject(result)
                          });

                        case 7:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _loop2);
                });
                _iterator2 = handlers[Symbol.iterator]();

              case 10:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context8.next = 18;
                  break;
                }

                return _context8.delegateYield(_loop2(), "t0", 12);

              case 12:
                _ret = _context8.t0;

                if (!(_typeof(_ret) === "object")) {
                  _context8.next = 15;
                  break;
                }

                return _context8.abrupt("return", _ret.v);

              case 15:
                _iteratorNormalCompletion2 = true;
                _context8.next = 10;
                break;

              case 18:
                _context8.next = 24;
                break;

              case 20:
                _context8.prev = 20;
                _context8.t1 = _context8["catch"](7);
                _didIteratorError2 = true;
                _iteratorError2 = _context8.t1;

              case 24:
                _context8.prev = 24;
                _context8.prev = 25;

                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }

              case 27:
                _context8.prev = 27;

                if (!_didIteratorError2) {
                  _context8.next = 30;
                  break;
                }

                throw _iteratorError2;

              case 30:
                return _context8.finish(27);

              case 31:
                return _context8.finish(24);

              case 32:
                _context8.next = 37;
                break;

              case 34:
                _context8.prev = 34;
                _context8.t2 = _context8["catch"](3);

                this._alert.danger({
                  message: _authMessages.default.beforeLogoutError,
                  payload: _context8.t2
                });

              case 37:
                this.store.dispatch({
                  type: this.actionTypes.logout
                });

                if (!this.isImplicit) {
                  _context8.next = 42;
                  break;
                }

                this._client.service.platform()._cache.clean();

                this.store.dispatch({
                  type: this.actionTypes.logoutSuccess
                });
                return _context8.abrupt("return", null);

              case 42:
                return _context8.abrupt("return", this._client.service.platform().logout());

              case 43:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee6, this, [[3, 34], [7, 20, 24, 32], [25,, 27, 31]]);
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
      this._beforeLogoutHandlers.delete(handler);
    }
  }, {
    key: "addAfterLoggedInHandler",
    value: function addAfterLoggedInHandler(handler) {
      var _this6 = this;

      this._afterLoggedInHandlers.add(handler);

      return function () {
        _this6._afterLoggedInHandlers.delete(handler);
      };
    }
  }, {
    key: "refreshImplicitToken",
    value: function () {
      var _refreshImplicitToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(_ref8) {
        var tokenType, accessToken, expiresIn, endpointId, extensionData, ownerId, platform, newAuthData;
        return regeneratorRuntime.wrap(function _callee7$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                tokenType = _ref8.tokenType, accessToken = _ref8.accessToken, expiresIn = _ref8.expiresIn, endpointId = _ref8.endpointId;
                _context9.prev = 1;
                _context9.next = 4;
                return this._client.account().extension().get();

              case 4:
                extensionData = _context9.sent;
                ownerId = String(extensionData.id);

                if (!(ownerId !== String(this.ownerId))) {
                  _context9.next = 8;
                  break;
                }

                return _context9.abrupt("return");

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
                _context9.next = 17;
                break;

              case 14:
                _context9.prev = 14;
                _context9.t0 = _context9["catch"](1);
                console.error('refreshImplicitToken error:', _context9.t0);

              case 17:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee7, this, [[1, 14]]);
      }));

      function refreshImplicitToken(_x2) {
        return _refreshImplicitToken.apply(this, arguments);
      }

      return refreshImplicitToken;
    }()
  }, {
    key: "checkIsLoggedIn",
    value: function () {
      var _checkIsLoggedIn = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this._client.service.platform().loggedIn();

              case 2:
                return _context10.abrupt("return", this.state.loginStatus === _loginStatus.default.loggedIn);

              case 3:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee8, this);
      }));

      function checkIsLoggedIn() {
        return _checkIsLoggedIn.apply(this, arguments);
      }

      return checkIsLoggedIn;
    }()
  }, {
    key: "redirectUri",
    get: function get() {
      return _url.default.resolve(window.location.href, this._redirectUri);
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
      return this.state.status === _moduleStatuses.default.ready;
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
      return this.state.loginStatus === _loginStatus.default.loggedIn || this.state.loginStatus === _loginStatus.default.beforeLogout;
    }
  }, {
    key: "notLoggedIn",
    get: function get() {
      return this.state.loginStatus === _loginStatus.default.notLoggedIn;
    }
  }, {
    key: "isImplicit",
    get: function get() {
      return !(this._client.service.platform()._appSecret && this._client.service.platform()._appSecret.length > 0);
    }
  }]);

  return Auth;
}(_RcModule2.default), (_applyDecoratedDescriptor(_class2.prototype, "login", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "login"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "logout", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "logout"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "refreshImplicitToken", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "refreshImplicitToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkIsLoggedIn", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "checkIsLoggedIn"), _class2.prototype)), _class2)) || _class);
exports.default = Auth;
//# sourceMappingURL=index.js.map
