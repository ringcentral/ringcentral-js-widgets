'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _desc, _value, _class;

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _getAuthReducer = require('./getAuthReducer');

var _getAuthReducer2 = _interopRequireDefault(_getAuthReducer);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _loginStatus = require('./loginStatus');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

var _authMessages = require('./authMessages');

var _authMessages2 = _interopRequireDefault(_authMessages);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _parseCallbackUri = require('../../lib/parseCallbackUri');

var _parseCallbackUri2 = _interopRequireDefault(_parseCallbackUri);

var _ensureExist = require('../../lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var DEFAULT_PROXY_RETRY = 5000;

function getDefaultRedirectUri() {
  if (typeof window !== 'undefined') {
    return _url2.default.resolve(window.location.href, './redirect.html');
  }
  return null;
}

function getDefaultProxyUri() {
  if (typeof window !== 'undefined') {
    return _url2.default.resolve(window.location.href, './proxy.html');
  }
  return null;
}

/**
 * @class
 * @description Authentication module
 */
var Auth = (_class = function (_RcModule) {
  (0, _inherits3.default)(Auth, _RcModule);

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
    var _this2 = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var client = _ref.client,
        alert = _ref.alert,
        _ref$redirectUri = _ref.redirectUri,
        redirectUri = _ref$redirectUri === undefined ? getDefaultRedirectUri() : _ref$redirectUri,
        _ref$proxyUri = _ref.proxyUri,
        proxyUri = _ref$proxyUri === undefined ? getDefaultProxyUri() : _ref$proxyUri,
        brand = _ref.brand,
        locale = _ref.locale,
        tabManager = _ref.tabManager,
        environment = _ref.environment,
        _ref$defaultProxyRetr = _ref.defaultProxyRetry,
        defaultProxyRetry = _ref$defaultProxyRetr === undefined ? DEFAULT_PROXY_RETRY : _ref$defaultProxyRetr,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client', 'alert', 'redirectUri', 'proxyUri', 'brand', 'locale', 'tabManager', 'environment', 'defaultProxyRetry']);
    (0, _classCallCheck3.default)(this, Auth);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Auth.__proto__ || (0, _getPrototypeOf2.default)(Auth)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._createProxyFrame = function (onLogin) {
      _this._proxyFrame = document.createElement('iframe');
      _this._proxyFrame.src = _this.proxyUri;
      _this._proxyFrame.style.display = 'none';

      document.body.appendChild(_this._proxyFrame);
      _this._callbackHandler = function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref3) {
          var origin = _ref3.origin,
              data = _ref3.data;
          var callbackUri, proxyLoaded, fromLocalStorage, code, message;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!data) {
                    _context.next = 25;
                    break;
                  }

                  callbackUri = data.callbackUri, proxyLoaded = data.proxyLoaded, fromLocalStorage = data.fromLocalStorage;

                  if (!(callbackUri && (fromLocalStorage !== true || !_this._tabManager || _this._tabManager.active))) {
                    _context.next = 24;
                    break;
                  }

                  _context.prev = 3;
                  code = (0, _parseCallbackUri2.default)(callbackUri);

                  if (!code) {
                    _context.next = 9;
                    break;
                  }

                  _context.next = 8;
                  return _this.login({
                    code: code,
                    redirectUri: _this.redirectUri
                  });

                case 8:
                  if (typeof onLogin === 'function') {
                    onLogin();
                  }

                case 9:
                  _context.next = 22;
                  break;

                case 11:
                  _context.prev = 11;
                  _context.t0 = _context['catch'](3);
                  message = void 0;
                  _context.t1 = _context.t0.message;
                  _context.next = _context.t1 === 'invalid_request' ? 17 : _context.t1 === 'unauthorized_client' ? 17 : _context.t1 === 'access_denied' ? 17 : _context.t1 === 'unsupported_response_type' ? 17 : _context.t1 === 'invalid_scope' ? 17 : _context.t1 === 'server_error' ? 19 : _context.t1 === 'temporarily_unavailable' ? 19 : 19;
                  break;

                case 17:
                  message = _authMessages2.default.accessDenied;
                  return _context.abrupt('break', 21);

                case 19:
                  message = _authMessages2.default.internalError;
                  return _context.abrupt('break', 21);

                case 21:

                  _this._alert.danger({
                    message: message,
                    payload: _context.t0
                  });

                case 22:
                  _context.next = 25;
                  break;

                case 24:
                  if (proxyLoaded) {
                    clearTimeout(_this._retryTimeoutId);
                    _this._retryTimeoutId = null;
                    _this.store.dispatch({
                      type: _this.actionTypes.proxyLoaded
                    });
                  }

                case 25:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2, [[3, 11]]);
        }));

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }();
      window.addEventListener('message', _this._callbackHandler);
      _this._retryTimeoutId = setTimeout(function () {
        _this._retrySetupProxyFrame(onLogin);
      }, _this._defaultProxyRetry);
    };

    _this._client = (0, _ensureExist2.default)(client, 'client');
    _this._alert = (0, _ensureExist2.default)(alert, 'alert');
    _this._brand = (0, _ensureExist2.default)(brand, 'brand');
    _this._locale = (0, _ensureExist2.default)(locale, 'locale');
    _this._redirectUri = redirectUri;
    _this._proxyUri = proxyUri;
    _this._tabManager = tabManager;
    _this._environment = environment;
    _this._defaultProxyRetry = defaultProxyRetry;
    _this._reducer = (0, _getAuthReducer2.default)(_this.actionTypes);
    _this._beforeLogoutHandlers = new _set2.default();
    _this._proxyFrame = null;
    _this._proxyFrameLoaded = false;
    _this._unbindEvents = null;
    _this._lastEnvironmentCounter = 0;
    return _this;
  }

  (0, _createClass3.default)(Auth, [{
    key: '_bindEvents',
    value: function _bindEvents() {
      var _this3 = this;

      if (this._unbindEvents) this._unbindEvents();

      var platform = this._client.service.platform();
      var onLoginSuccess = function onLoginSuccess() {
        _this3.store.dispatch({
          type: _this3.actionTypes.loginSuccess,
          token: platform.auth().data()
        });
      };
      var onLoginError = function onLoginError(error) {
        _this3.store.dispatch({
          type: _this3.actionTypes.loginError,
          error: error
        });
        if (error) {
          _this3._alert.danger({
            message: _authMessages2.default.loginError,
            payload: error
          });
        }
      };
      var onLogoutSuccess = function onLogoutSuccess() {
        _this3.store.dispatch({
          type: _this3.actionTypes.logoutSuccess
        });
      };
      var onLogoutError = function onLogoutError(error) {
        platform._cache.clean();
        _this3.store.dispatch({
          type: _this3.actionTypes.logoutError,
          error: error
        });
        if (error) {
          _this3._alert.danger({
            message: _authMessages2.default.logoutError,
            payload: error
          });
        }
      };
      var onRefreshSuccess = function onRefreshSuccess() {
        _this3.store.dispatch({
          type: _this3.actionTypes.refreshSuccess,
          token: platform.auth().data()
        });
      };
      var onRefreshError = function onRefreshError(error) {
        // user is still considered logged in if the refreshToken is still valid
        var refreshTokenValid = platform.auth().refreshTokenValid();
        _this3.store.dispatch({
          type: _this3.actionTypes.refreshError,
          error: error,
          refreshTokenValid: refreshTokenValid
        });
        if (!refreshTokenValid && _this3._client.service.platform().auth().data().access_token !== '') {
          _this3._alert.danger({
            message: _authMessages2.default.sessionExpired,
            payload: error,
            ttl: 0
          });
          // clean the cache so the error doesn't show again
          platform._cache.clean();
        }
      };
      platform.addListener(platform.events.loginSuccess, onLoginSuccess);
      platform.addListener(platform.events.loginError, onLoginError);
      platform.addListener(platform.events.logoutSuccess, onLogoutSuccess);
      platform.addListener(platform.events.logoutError, onLogoutError);
      platform.addListener(platform.events.refreshSuccess, onRefreshSuccess);
      platform.addListener(platform.events.refreshError, onRefreshError);
      this._unbindEvents = function () {
        platform.removeListener(platform.events.loginSuccess, onLoginSuccess);
        platform.removeListener(platform.events.loginError, onLoginError);
        platform.removeListener(platform.events.logoutSuccess, onLogoutSuccess);
        platform.removeListener(platform.events.logoutError, onLogoutError);
        platform.removeListener(platform.events.refreshSuccess, onRefreshSuccess);
        platform.removeListener(platform.events.refreshError, onRefreshError);
      };
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      var _this4 = this;

      var loggedIn = void 0;
      this.store.subscribe((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var platform;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_this4.status === _moduleStatuses2.default.pending && _this4._locale.ready && (!_this4._tabManager || _this4._tabManager.ready) && (!_this4._environment || _this4._environment.ready))) {
                  _context2.next = 8;
                  break;
                }

                _this4.store.dispatch({
                  type: _this4.actionTypes.init
                });
                platform = _this4._client.service.platform();
                _context2.next = 5;
                return platform.loggedIn();

              case 5:
                loggedIn = _context2.sent;

                _this4._bindEvents();
                _this4.store.dispatch({
                  type: _this4.actionTypes.initSuccess,
                  loggedIn: loggedIn,
                  token: loggedIn ? platform.auth().data() : null
                });

              case 8:
                if (_this4._tabManager && _this4._tabManager.ready && _this4.ready) {
                  if (loggedIn && _this4.loginStatus === _loginStatus2.default.notLoggedIn || !loggedIn && _this4.loginStatus === _loginStatus2.default.loggedIn) {
                    loggedIn = !loggedIn;
                    _this4._tabManager.send('loginStatusChange', loggedIn);
                  } else if (_this4._tabManager.event && _this4._tabManager.event.name === 'loginStatusChange' && _this4._tabManager.event.args[0] !== loggedIn) {
                    loggedIn = _this4._tabManager.event.args[0];
                    _this4.store.dispatch({
                      type: _this4.actionTypes.tabSync,
                      loggedIn: loggedIn,
                      token: loggedIn ? _this4._client.service.platform().auth().data() : null
                    });
                  }
                }
                if (_this4.ready && _this4._environment && _this4._environment.changeCounter !== _this4._lastEnvironmentCounter) {
                  _this4._lastEnvironmentCounter = _this4._environment.changeCounter;
                  _this4._bindEvents();
                }

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this4);
      })));
    }
  }, {
    key: 'login',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref6) {
        var username = _ref6.username,
            password = _ref6.password,
            extension = _ref6.extension,
            remember = _ref6.remember,
            code = _ref6.code,
            redirectUri = _ref6.redirectUri;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.login
                });
                return _context3.abrupt('return', this._client.service.platform().login({
                  username: username,
                  password: password,
                  extension: extension,
                  remember: remember,
                  code: code,
                  redirectUri: redirectUri
                }));

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function login(_x3) {
        return _ref5.apply(this, arguments);
      }

      return login;
    }()
    /**
     * @function
     * @param {String} options.redirectUri
     * @param {String} options.brandId
     * @param {Boolean} options.force
     * @return {String}
     * @description get OAuth page url
     */

  }, {
    key: 'getLoginUrl',
    value: function getLoginUrl(_ref7) {
      var redirectUri = _ref7.redirectUri,
          state = _ref7.state,
          brandId = _ref7.brandId,
          display = _ref7.display,
          prompt = _ref7.prompt,
          force = _ref7.force;

      return '' + this._client.service.platform().loginUrl({
        redirectUri: redirectUri,
        state: state,
        brandId: brandId,
        display: display,
        prompt: prompt
      }) + (force ? '&force' : '');
    }

    /**
     * @function
     * @description Triggers the beforeLogoutHandlers to run
     *  and then proceed to logout from ringcentral.
     */

  }, {
    key: 'logout',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
        var _this5 = this;

        var handlers, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _ret;

        return _regenerator2.default.wrap(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.beforeLogout
                });
                handlers = [].concat((0, _toConsumableArray3.default)(this._beforeLogoutHandlers));
                _context6.prev = 2;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context6.prev = 6;
                _loop = _regenerator2.default.mark(function _loop() {
                  var handler, result;
                  return _regenerator2.default.wrap(function _loop$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          handler = _step.value;
                          _context5.next = 3;
                          return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
                            return _regenerator2.default.wrap(function _callee4$(_context4) {
                              while (1) {
                                switch (_context4.prev = _context4.next) {
                                  case 0:
                                    return _context4.abrupt('return', handler());

                                  case 1:
                                  case 'end':
                                    return _context4.stop();
                                }
                              }
                            }, _callee4, _this5);
                          }))();

                        case 3:
                          result = _context5.sent;

                          if (!result) {
                            _context5.next = 7;
                            break;
                          }

                          _this5.store.dispatch({
                            type: _this5.actionTypes.cancelLogout
                          });
                          return _context5.abrupt('return', {
                            v: _promise2.default.reject(result)
                          });

                        case 7:
                        case 'end':
                          return _context5.stop();
                      }
                    }
                  }, _loop, _this5);
                });
                _iterator = (0, _getIterator3.default)(handlers);

              case 9:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context6.next = 17;
                  break;
                }

                return _context6.delegateYield(_loop(), 't0', 11);

              case 11:
                _ret = _context6.t0;

                if (!((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object")) {
                  _context6.next = 14;
                  break;
                }

                return _context6.abrupt('return', _ret.v);

              case 14:
                _iteratorNormalCompletion = true;
                _context6.next = 9;
                break;

              case 17:
                _context6.next = 23;
                break;

              case 19:
                _context6.prev = 19;
                _context6.t1 = _context6['catch'](6);
                _didIteratorError = true;
                _iteratorError = _context6.t1;

              case 23:
                _context6.prev = 23;
                _context6.prev = 24;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 26:
                _context6.prev = 26;

                if (!_didIteratorError) {
                  _context6.next = 29;
                  break;
                }

                throw _iteratorError;

              case 29:
                return _context6.finish(26);

              case 30:
                return _context6.finish(23);

              case 31:
                _context6.next = 36;
                break;

              case 33:
                _context6.prev = 33;
                _context6.t2 = _context6['catch'](2);

                this._alert.danger({
                  message: _authMessages2.default.beforeLogoutError,
                  payload: _context6.t2
                });

              case 36:
                this.store.dispatch({
                  type: this.actionTypes.logout
                });
                return _context6.abrupt('return', this._client.service.platform().logout());

              case 38:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee5, this, [[2, 33], [6, 19, 23, 31], [24,, 26, 30]]);
      }));

      function logout() {
        return _ref8.apply(this, arguments);
      }

      return logout;
    }()

    /**
    * @function
    * @param {Function} handler
    * @returns {Function}
    */

  }, {
    key: 'addBeforeLogoutHandler',
    value: function addBeforeLogoutHandler(handler) {
      var _this6 = this;

      this._beforeLogoutHandlers.add(handler);
      return function () {
        _this6.removeBeforeLogoutHandler(handler);
      };
    }

    /**
    * @function
    * @param {Function} handler
    */

  }, {
    key: 'removeBeforeLogoutHandler',
    value: function removeBeforeLogoutHandler(handler) {
      this._beforeLogoutHandlers.remove(handler);
    }
  }, {
    key: 'checkIsLoggedIn',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
        return _regenerator2.default.wrap(function _callee6$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this._client.service.platform().loggedIn();

              case 2:
                return _context7.abrupt('return', this.state.loginStatus === _loginStatus2.default.loggedIn);

              case 3:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee6, this);
      }));

      function checkIsLoggedIn() {
        return _ref10.apply(this, arguments);
      }

      return checkIsLoggedIn;
    }()
  }, {
    key: 'setupProxyFrame',

    /**
     * @function
     * @description Create the proxy frame and append to document if available.
     * @param {Function} onLogin - Function to be called when user successfully logged in
     *  through oAuth.
     */
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(onLogin) {
        return _regenerator2.default.wrap(function _callee7$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (typeof window !== 'undefined' && typeof document !== 'undefined' && this._proxyUri && this._proxyUri !== '' && !this._proxyFrame) {
                  this.store.dispatch({
                    type: this.actionTypes.proxySetup
                  });
                  this._createProxyFrame(onLogin);
                }

              case 1:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee7, this);
      }));

      function setupProxyFrame(_x4) {
        return _ref11.apply(this, arguments);
      }

      return setupProxyFrame;
    }()
  }, {
    key: '_retrySetupProxyFrame',
    value: function _retrySetupProxyFrame(onLogin) {
      this._retryTimeoutId = null;
      if (!this.proxyLoaded) {
        this.store.dispatch({
          type: this.actionTypes.proxyRetry
        });
        this._destroyProxyFrame();
        this._createProxyFrame(onLogin);
      }
    }
  }, {
    key: '_destroyProxyFrame',
    value: function _destroyProxyFrame() {
      document.body.removeChild(this._proxyFrame);
      this._proxyFrame = null;
      window.removeEventListener('message', this._callbackHandler);
      this._callbackHandler = null;
    }
  }, {
    key: 'clearProxyFrame',
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
        return _regenerator2.default.wrap(function _callee8$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (this._proxyFrame) {
                  if (this._retryTimeoutId) {
                    clearTimeout(this._retryTimeoutId);
                    this._retryTimeoutId = null;
                  }
                  this._destroyProxyFrame();
                  this.store.dispatch({
                    type: this.actionTypes.proxyCleared
                  });
                }

              case 1:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee8, this);
      }));

      function clearProxyFrame() {
        return _ref12.apply(this, arguments);
      }

      return clearProxyFrame;
    }()
  }, {
    key: 'openOAuthPage',
    value: function openOAuthPage() {
      if (this.proxyLoaded) {
        var extendedQuery = _qs2.default.stringify({
          force: true,
          localeId: this._locale.currentLocale,
          ui_options: 'hide_remember_me hide_tos'
        });
        this._proxyFrame.contentWindow.postMessage({
          oAuthUri: this.getLoginUrl({
            redirectUri: this.redirectUri,
            brandId: this._brand.id,
            state: btoa(Date.now()),
            display: 'page'
          }) + '&' + extendedQuery
        }, '*');
      }
    }
  }, {
    key: 'redirectUri',
    get: function get() {
      return this._redirectUri;
    }
  }, {
    key: 'proxyUri',
    get: function get() {
      return this._proxyUri;
    }
  }, {
    key: 'ownerId',
    get: function get() {
      return this.state.ownerId;
    }
  }, {
    key: 'endpointId',
    get: function get() {
      return this.state.endpointId;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.state.status === _moduleStatuses2.default.ready;
    }
  }, {
    key: 'loginStatus',
    get: function get() {
      return this.state.loginStatus;
    }
  }, {
    key: 'isFreshLogin',
    get: function get() {
      return this.state.freshLogin;
    }
  }, {
    key: 'proxyLoaded',
    get: function get() {
      return this.state.proxyLoaded;
    }
  }, {
    key: 'proxyRetryCount',
    get: function get() {
      return this.state.proxyRetryCount;
    }

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

  }, {
    key: 'loggedIn',
    get: function get() {
      return this.state.loginStatus === _loginStatus2.default.loggedIn || this.state.loginStatus === _loginStatus2.default.beforeLogout;
    }
  }, {
    key: 'notLoggedIn',
    get: function get() {
      return this.state.loginStatus === _loginStatus2.default.notLoggedIn;
    }
  }]);
  return Auth;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class.prototype, 'login', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'login'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'logout', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'logout'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'checkIsLoggedIn', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'checkIsLoggedIn'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setupProxyFrame', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'setupProxyFrame'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'clearProxyFrame', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'clearProxyFrame'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'openOAuthPage', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'openOAuthPage'), _class.prototype)), _class);
exports.default = Auth;
//# sourceMappingURL=index.js.map
