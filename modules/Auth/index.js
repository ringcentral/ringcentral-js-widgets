'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

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

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _getAuthReducer = require('./getAuthReducer');

var _getAuthReducer2 = _interopRequireDefault(_getAuthReducer);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _loginStatus = require('./loginStatus');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

var _authMessages = require('./authMessages');

var _authMessages2 = _interopRequireDefault(_authMessages);

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var Auth = function (_RcModule) {
  (0, _inherits3.default)(Auth, _RcModule);

  /**
   * @constructor
   */
  function Auth() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        client = _ref.client,
        alert = _ref.alert,
        _ref$redirectUri = _ref.redirectUri,
        redirectUri = _ref$redirectUri === undefined ? getDefaultRedirectUri() : _ref$redirectUri,
        _ref$proxyUri = _ref.proxyUri,
        proxyUri = _ref$proxyUri === undefined ? getDefaultProxyUri() : _ref$proxyUri,
        brand = _ref.brand,
        locale = _ref.locale,
        tabManager = _ref.tabManager,
        environment = _ref.environment,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client', 'alert', 'redirectUri', 'proxyUri', 'brand', 'locale', 'tabManager', 'environment']);

    (0, _classCallCheck3.default)(this, Auth);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Auth.__proto__ || (0, _getPrototypeOf2.default)(Auth)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._client = client;
    _this._alert = alert;
    _this._brand = brand;
    _this._locale = locale;
    _this._redirectUri = redirectUri;
    _this._proxyUri = proxyUri;
    _this._tabManager = tabManager;
    _this._environment = environment;
    _this._reducer = (0, _getAuthReducer2.default)(_this.actionTypes);
    _this._beforeLogoutHandlers = new _set2.default();
    return _this;
  }

  (0, _createClass3.default)(Auth, [{
    key: '_bindEvents',
    value: function _bindEvents() {
      var _this2 = this;

      var platform = this._client.service.platform();
      platform.on(platform.events.loginSuccess, function () {
        _this2.store.dispatch({
          type: _this2.actionTypes.loginSuccess,
          token: platform.auth().data()
        });
      });
      platform.on(platform.events.loginError, function (error) {
        _this2.store.dispatch({
          type: _this2.actionTypes.loginError,
          error: error
        });
        if (error) {
          _this2._alert.danger({
            message: _authMessages2.default.loginError,
            payload: error
          });
        }
      });
      platform.on(platform.events.logoutSuccess, function () {
        _this2.store.dispatch({
          type: _this2.actionTypes.logoutSuccess
        });
      });
      platform.on(platform.events.logoutError, function (error) {
        _this2.store.dispatch({
          type: _this2.actionTypes.logoutError,
          error: error
        });
        if (error) {
          _this2._alert.danger({
            message: _authMessages2.default.logoutError,
            payload: error
          });
        }
      });
      platform.on(platform.events.refreshSuccess, function () {
        _this2.store.dispatch({
          type: _this2.actionTypes.refreshSuccess,
          token: platform.auth().data()
        });
      });
      platform.on(platform.events.refreshError, function (error) {
        // user is still considered logged in if the refreshToken is still valid
        var refreshTokenValid = platform.auth().refreshTokenValid();
        _this2.store.dispatch({
          type: _this2.actionTypes.refreshError,
          error: error,
          refreshTokenValid: refreshTokenValid
        });
        if (!refreshTokenValid && _this2._client.service.platform().auth().data().access_token !== '') {
          _this2._alert.danger({
            message: _authMessages2.default.sessionExpired,
            payload: error,
            ttl: 0
          });
          // clean the cache so the error doesn't show again
          platform._cache.clean();
        }
      });
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      var _this3 = this;

      var loggedIn = void 0;
      this._bindEvents();
      this.store.subscribe((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var platform;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_this3.status === _moduleStatus2.default.pending && _this3._locale.ready && (!_this3._tabManager || _this3._tabManager.ready) && (!_this3._environment || _this3._environment.ready))) {
                  _context.next = 7;
                  break;
                }

                _this3.store.dispatch({
                  type: _this3.actionTypes.init
                });
                platform = _this3._client.service.platform();
                _context.next = 5;
                return platform.loggedIn();

              case 5:
                loggedIn = _context.sent;

                _this3.store.dispatch({
                  type: _this3.actionTypes.initSuccess,
                  loggedIn: loggedIn,
                  token: loggedIn ? platform.auth().data() : null
                });

              case 7:
                if (_this3._tabManager && _this3._tabManager.ready && _this3.ready) {
                  if (loggedIn && _this3.loginStatus === _loginStatus2.default.notLoggedIn || !loggedIn && _this3.loginStatus === _loginStatus2.default.loggedIn) {
                    loggedIn = !loggedIn;
                    _this3._tabManager.send('loginStatusChange', loggedIn);
                  } else if (_this3._tabManager.event && _this3._tabManager.event.name === 'loginStatusChange' && _this3._tabManager.event.args[0] !== loggedIn) {
                    loggedIn = _this3._tabManager.event.args[0];
                    _this3.store.dispatch({
                      type: _this3.actionTypes.tabSync,
                      loggedIn: loggedIn,
                      token: loggedIn ? _this3._client.service.platform().auth().data() : null
                    });
                  }
                }
                if (_this3.ready && _this3._environment && _this3._environment.changed) {
                  _this3._bindEvents();
                }

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this3);
      })));
    }
  }, {
    key: 'login',


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
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref4) {
        var username = _ref4.username,
            password = _ref4.password,
            extension = _ref4.extension,
            remember = _ref4.remember,
            code = _ref4.code,
            redirectUri = _ref4.redirectUri;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.login
                });
                _context2.next = 3;
                return this._client.login({
                  username: username,
                  password: password,
                  extension: extension,
                  remember: remember,
                  code: code,
                  redirectUri: redirectUri
                });

              case 3:
                return _context2.abrupt('return', _context2.sent);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function login(_x2) {
        return _ref3.apply(this, arguments);
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
    value: function getLoginUrl(_ref5) {
      var redirectUri = _ref5.redirectUri,
          state = _ref5.state,
          brandId = _ref5.brandId,
          display = _ref5.display,
          prompt = _ref5.prompt,
          force = _ref5.force;

      return '' + this._client.loginUrl({
        redirectUri: redirectUri,
        state: state,
        brandId: brandId,
        display: display,
        prompt: prompt
      }) + (force ? '&force' : '');
    }
    /**
     * @function
     * @param {String} callbackUri
     * @return {String} code
     */

  }, {
    key: 'parseCallbackUri',
    value: function parseCallbackUri(callbackUri) {
      var _url$parse = _url2.default.parse(callbackUri, true),
          query = _url$parse.query;

      if (query.error) {
        var error = new Error(query.error);
        for (var key in query) {
          if (Object.prototype.hasOwnProperty.call(query, key)) {
            error[key] = query[key];
          }
        }
        throw error;
      }
      return query.code;
    }

    /**
     * @function
     * @description Triggers the beforeLogoutHandlers to run
     *  and then proceed to logout from ringcentral.
     */

  }, {
    key: 'logout',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        var _this4 = this;

        var handlers, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _ret;

        return _regenerator2.default.wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.beforeLogout
                });
                handlers = [].concat((0, _toConsumableArray3.default)(this._beforeLogoutHandlers));
                _context5.prev = 2;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context5.prev = 6;
                _loop = _regenerator2.default.mark(function _loop() {
                  var handler, result;
                  return _regenerator2.default.wrap(function _loop$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          handler = _step.value;
                          _context4.next = 3;
                          return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
                            return _regenerator2.default.wrap(function _callee3$(_context3) {
                              while (1) {
                                switch (_context3.prev = _context3.next) {
                                  case 0:
                                    return _context3.abrupt('return', handler());

                                  case 1:
                                  case 'end':
                                    return _context3.stop();
                                }
                              }
                            }, _callee3, _this4);
                          }))();

                        case 3:
                          result = _context4.sent;

                          if (!result) {
                            _context4.next = 7;
                            break;
                          }

                          _this4.store.dispatch({
                            type: _this4.actionTypes.cancelLogout
                          });
                          return _context4.abrupt('return', {
                            v: _promise2.default.reject(result)
                          });

                        case 7:
                        case 'end':
                          return _context4.stop();
                      }
                    }
                  }, _loop, _this4);
                });
                _iterator = (0, _getIterator3.default)(handlers);

              case 9:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context5.next = 17;
                  break;
                }

                return _context5.delegateYield(_loop(), 't0', 11);

              case 11:
                _ret = _context5.t0;

                if (!((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object")) {
                  _context5.next = 14;
                  break;
                }

                return _context5.abrupt('return', _ret.v);

              case 14:
                _iteratorNormalCompletion = true;
                _context5.next = 9;
                break;

              case 17:
                _context5.next = 23;
                break;

              case 19:
                _context5.prev = 19;
                _context5.t1 = _context5['catch'](6);
                _didIteratorError = true;
                _iteratorError = _context5.t1;

              case 23:
                _context5.prev = 23;
                _context5.prev = 24;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 26:
                _context5.prev = 26;

                if (!_didIteratorError) {
                  _context5.next = 29;
                  break;
                }

                throw _iteratorError;

              case 29:
                return _context5.finish(26);

              case 30:
                return _context5.finish(23);

              case 31:
                _context5.next = 36;
                break;

              case 33:
                _context5.prev = 33;
                _context5.t2 = _context5['catch'](2);

                this._alert.danger({
                  message: _authMessages2.default.beforeLogoutError,
                  payload: _context5.t2
                });

              case 36:
                this.store.dispatch({
                  type: this.actionTypes.logout
                });
                _context5.next = 39;
                return this._client.logout();

              case 39:
                return _context5.abrupt('return', _context5.sent);

              case 40:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee4, this, [[2, 33], [6, 19, 23, 31], [24,, 26, 30]]);
      }));

      function logout() {
        return _ref6.apply(this, arguments);
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
    key: 'removeBeforeLogoutHandler',
    value: function removeBeforeLogoutHandler(handler) {
      this._beforeLogoutHandlers.remove(handler);
    }
  }, {
    key: 'checkIsLoggedIn',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
        return _regenerator2.default.wrap(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._client.service.platform().loggedIn();

              case 2:
                return _context6.abrupt('return', this.state.loginStatus === _loginStatus2.default.loggedIn);

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee5, this);
      }));

      function checkIsLoggedIn() {
        return _ref8.apply(this, arguments);
      }

      return checkIsLoggedIn;
    }()
  }, {
    key: 'loggedIn',
    value: function loggedIn() {
      return this.state.loginStatus === _loginStatus2.default.loggedIn || this.state.loginStatus === _loginStatus2.default.beforeLogout;
    }

    /**
     * @function
     * @description Create the proxy frame and append to document if available.
     * @param {Function} onLogin - Function to be called when user successfully logged in
     *  through oAuth.
     */

  }, {
    key: 'setupProxyFrame',
    value: function setupProxyFrame(onLogin) {
      var _this6 = this;

      if (typeof window !== 'undefined' && typeof document !== 'undefined' && this._proxyUri && this._proxyUri !== '' && !this._proxyFrame) {
        this._proxyFrame = document.createElement('iframe');
        this._proxyFrame.src = this.proxyUri;
        this._proxyFrame.style.display = 'none';
        document.body.appendChild(this._proxyFrame);
        this._callbackHandler = function () {
          var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(_ref10) {
            var origin = _ref10.origin,
                data = _ref10.data;
            var callbackUri, code, message;
            return _regenerator2.default.wrap(function _callee6$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    if (!data) {
                      _context7.next = 22;
                      break;
                    }

                    callbackUri = data.callbackUri;

                    if (!callbackUri) {
                      _context7.next = 22;
                      break;
                    }

                    _context7.prev = 3;
                    code = _this6.parseCallbackUri(callbackUri);

                    if (!code) {
                      _context7.next = 9;
                      break;
                    }

                    _context7.next = 8;
                    return _this6.login({
                      code: code,
                      redirectUri: _this6.redirectUri
                    });

                  case 8:
                    if (typeof onLogin === 'function') {
                      onLogin();
                    }

                  case 9:
                    _context7.next = 22;
                    break;

                  case 11:
                    _context7.prev = 11;
                    _context7.t0 = _context7['catch'](3);
                    message = void 0;
                    _context7.t1 = _context7.t0.message;
                    _context7.next = _context7.t1 === 'invalid_request' ? 17 : _context7.t1 === 'unauthorized_client' ? 17 : _context7.t1 === 'access_denied' ? 17 : _context7.t1 === 'unsupported_response_type' ? 17 : _context7.t1 === 'invalid_scope' ? 17 : _context7.t1 === 'server_error' ? 19 : _context7.t1 === 'temporarily_unavailable' ? 19 : 19;
                    break;

                  case 17:
                    message = _authMessages2.default.accessDenied;
                    return _context7.abrupt('break', 21);

                  case 19:
                    message = _authMessages2.default.internalError;
                    return _context7.abrupt('break', 21);

                  case 21:

                    _this6._alert.danger({
                      message: message,
                      payload: _context7.t0
                    });

                  case 22:
                  case 'end':
                    return _context7.stop();
                }
              }
            }, _callee6, _this6, [[3, 11]]);
          }));

          return function (_x3) {
            return _ref9.apply(this, arguments);
          };
        }();
        window.addEventListener('message', this._callbackHandler);
      }
    }
  }, {
    key: 'clearProxyFrame',
    value: function clearProxyFrame() {
      if (this._proxyFrame) {
        document.body.removeChild(this._proxyFrame);
        this._proxyFrame = null;
        window.removeEventListener('message', this._callbackHandler);
        this._callbackHandler = null;
      }
    }
  }, {
    key: 'openOAuthPage',
    value: function openOAuthPage() {
      if (this._proxyFrame) {
        this._proxyFrame.contentWindow.postMessage({
          oAuthUri: this.getLoginUrl({
            redirectUri: this.redirectUri,
            brandId: this._brand.id
          }) + '&force=true&localeId=' + encodeURIComponent(this._locale.currentLocale)
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
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.state.status === _moduleStatus2.default.ready;
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
  }]);
  return Auth;
}(_RcModule3.default);

exports.default = Auth;
//# sourceMappingURL=index.js.map
