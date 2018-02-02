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

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _dec, _class, _desc, _value, _class2;

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../../lib/di');

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

/**
 * @class
 * @description Authentication module
 */
var Auth = (_dec = (0, _di.Module)({
  deps: ['Client', 'Alert', 'Brand', 'Locale', { dep: 'TabManager', optional: true }, { dep: 'Environment', optional: true }, { dep: 'AuthOptions', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
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
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var client = _ref.client,
        alert = _ref.alert,
        brand = _ref.brand,
        locale = _ref.locale,
        tabManager = _ref.tabManager,
        environment = _ref.environment,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client', 'alert', 'brand', 'locale', 'tabManager', 'environment']);
    (0, _classCallCheck3.default)(this, Auth);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Auth.__proto__ || (0, _getPrototypeOf2.default)(Auth)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._client = (0, _ensureExist2.default)(client, 'client');
    _this._alert = (0, _ensureExist2.default)(alert, 'alert');
    _this._brand = (0, _ensureExist2.default)(brand, 'brand');
    _this._locale = (0, _ensureExist2.default)(locale, 'locale');
    _this._tabManager = tabManager;
    _this._environment = environment;
    _this._reducer = (0, _getAuthReducer2.default)(_this.actionTypes);
    _this._beforeLogoutHandlers = new _set2.default();
    _this._afterLoggedInHandlers = new _set2.default();
    _this._proxyFrame = null;
    _this._proxyFrameLoaded = false;
    _this._unbindEvents = null;
    _this._lastEnvironmentCounter = 0;
    return _this;
  }

  (0, _createClass3.default)(Auth, [{
    key: '_bindEvents',
    value: function _bindEvents() {
      var _this2 = this;

      if (this._unbindEvents) this._unbindEvents();

      var platform = this._client.service.platform();
      var client = this._client.service._client;
      var onRequestError = function onRequestError(apiResponse) {
        if (apiResponse instanceof Error && apiResponse.message === 'Roken revoked') {
          _this2.logout();
        }
      };

      var onLoginSuccess = function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
          var handlers, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

          return _regenerator2.default.wrap(function _callee2$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _this2.store.dispatch({
                    type: _this2.actionTypes.loginSuccess,
                    token: platform.auth().data()
                  });
                  handlers = [].concat((0, _toConsumableArray3.default)(_this2._afterLoggedInHandlers));
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context3.prev = 5;
                  _loop = _regenerator2.default.mark(function _loop() {
                    var handler;
                    return _regenerator2.default.wrap(function _loop$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            handler = _step.value;
                            _context2.next = 3;
                            return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                              return _regenerator2.default.wrap(function _callee$(_context) {
                                while (1) {
                                  switch (_context.prev = _context.next) {
                                    case 0:
                                      return _context.abrupt('return', handler());

                                    case 1:
                                    case 'end':
                                      return _context.stop();
                                  }
                                }
                              }, _callee, _this2);
                            }))();

                          case 3:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _loop, _this2);
                  });
                  _iterator = (0, _getIterator3.default)(handlers);

                case 8:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    _context3.next = 13;
                    break;
                  }

                  return _context3.delegateYield(_loop(), 't0', 10);

                case 10:
                  _iteratorNormalCompletion = true;
                  _context3.next = 8;
                  break;

                case 13:
                  _context3.next = 19;
                  break;

                case 15:
                  _context3.prev = 15;
                  _context3.t1 = _context3['catch'](5);
                  _didIteratorError = true;
                  _iteratorError = _context3.t1;

                case 19:
                  _context3.prev = 19;
                  _context3.prev = 20;

                  if (!_iteratorNormalCompletion && _iterator.return) {
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
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee2, _this2, [[5, 15, 19, 27], [20,, 22, 26]]);
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
            message: _authMessages2.default.loginError,
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
            message: _authMessages2.default.logoutError,
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

        var refreshTokenValid = error.message === 'Failed to fetch' && platform.auth().refreshTokenValid();
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
    key: 'initialize',
    value: function initialize() {
      var _this3 = this;

      var loggedIn = void 0;
      this.store.subscribe((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var platform;
        return _regenerator2.default.wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(_this3.status === _moduleStatuses2.default.pending && _this3._locale.ready && (!_this3._tabManager || _this3._tabManager.ready) && (!_this3._environment || _this3._environment.ready))) {
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
                  if (loggedIn && _this3.loginStatus === _loginStatus2.default.notLoggedIn || !loggedIn && _this3.loginStatus === _loginStatus2.default.loggedIn) {
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
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee3, _this3);
      })));
    }
  }, {
    key: 'login',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref6) {
        var username = _ref6.username,
            password = _ref6.password,
            extension = _ref6.extension,
            remember = _ref6.remember,
            code = _ref6.code,
            redirectUri = _ref6.redirectUri,
            accessToken = _ref6.accessToken,
            expiresIn = _ref6.expiresIn,
            endpointId = _ref6.endpointId,
            tokenType = _ref6.tokenType;
        var ownerId, extensionData;
        return _regenerator2.default.wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.login
                });
                ownerId = void 0;

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
                return _context5.abrupt('return', this._client.service.platform().login({
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
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee4, this);
      }));

      function login(_x2) {
        return _ref5.apply(this, arguments);
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
    key: 'getLoginUrl',
    value: function getLoginUrl(_ref7) {
      var redirectUri = _ref7.redirectUri,
          state = _ref7.state,
          brandId = _ref7.brandId,
          display = _ref7.display,
          prompt = _ref7.prompt,
          force = _ref7.force,
          _ref7$implicit = _ref7.implicit,
          implicit = _ref7$implicit === undefined ? false : _ref7$implicit;

      return '' + this._client.service.platform().loginUrl({
        redirectUri: redirectUri,
        state: state,
        brandId: brandId,
        display: display,
        prompt: prompt,
        implicit: implicit
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
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
        var _this4 = this;

        var handlers, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _loop2, _iterator2, _step2, _ret2;

        return _regenerator2.default.wrap(function _callee6$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                this._alert.dismissAll();
                this.store.dispatch({
                  type: this.actionTypes.beforeLogout
                });
                handlers = [].concat((0, _toConsumableArray3.default)(this._beforeLogoutHandlers));
                _context8.prev = 3;
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context8.prev = 7;
                _loop2 = _regenerator2.default.mark(function _loop2() {
                  var handler, result;
                  return _regenerator2.default.wrap(function _loop2$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          handler = _step2.value;
                          _context7.next = 3;
                          return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
                            return _regenerator2.default.wrap(function _callee5$(_context6) {
                              while (1) {
                                switch (_context6.prev = _context6.next) {
                                  case 0:
                                    return _context6.abrupt('return', handler());

                                  case 1:
                                  case 'end':
                                    return _context6.stop();
                                }
                              }
                            }, _callee5, _this4);
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
                          return _context7.abrupt('return', {
                            v: _promise2.default.reject(result)
                          });

                        case 7:
                        case 'end':
                          return _context7.stop();
                      }
                    }
                  }, _loop2, _this4);
                });
                _iterator2 = (0, _getIterator3.default)(handlers);

              case 10:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context8.next = 18;
                  break;
                }

                return _context8.delegateYield(_loop2(), 't0', 12);

              case 12:
                _ret2 = _context8.t0;

                if (!((typeof _ret2 === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret2)) === "object")) {
                  _context8.next = 15;
                  break;
                }

                return _context8.abrupt('return', _ret2.v);

              case 15:
                _iteratorNormalCompletion2 = true;
                _context8.next = 10;
                break;

              case 18:
                _context8.next = 24;
                break;

              case 20:
                _context8.prev = 20;
                _context8.t1 = _context8['catch'](7);
                _didIteratorError2 = true;
                _iteratorError2 = _context8.t1;

              case 24:
                _context8.prev = 24;
                _context8.prev = 25;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
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
                _context8.t2 = _context8['catch'](3);

                this._alert.danger({
                  message: _authMessages2.default.beforeLogoutError,
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
                return _context8.abrupt('return', null);

              case 42:
                return _context8.abrupt('return', this._client.service.platform().logout());

              case 43:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee6, this, [[3, 34], [7, 20, 24, 32], [25,, 27, 31]]);
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
    key: 'addAfterLoggedInHandler',
    value: function addAfterLoggedInHandler(handler) {
      var _this6 = this;

      this._afterLoggedInHandlers.add(handler);
      return function () {
        _this6._afterLoggedInHandlers.remove(handler);
      };
    }
  }, {
    key: 'refreshImplicitToken',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(_ref11) {
        var tokenType = _ref11.tokenType,
            accessToken = _ref11.accessToken,
            expiresIn = _ref11.expiresIn,
            endpointId = _ref11.endpointId;
        var extensionData, ownerId, platform, newAuthData;
        return _regenerator2.default.wrap(function _callee7$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return this._client.account().extension().get();

              case 3:
                extensionData = _context9.sent;
                ownerId = extensionData.id;

                if (!(ownerId !== this.ownerId)) {
                  _context9.next = 7;
                  break;
                }

                return _context9.abrupt('return');

              case 7:
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
                _context9.next = 16;
                break;

              case 13:
                _context9.prev = 13;
                _context9.t0 = _context9['catch'](0);

                console.error('refreshImplicitToken error:', _context9.t0);

              case 16:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee7, this, [[0, 13]]);
      }));

      function refreshImplicitToken(_x3) {
        return _ref10.apply(this, arguments);
      }

      return refreshImplicitToken;
    }()
  }, {
    key: 'checkIsLoggedIn',
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
        return _regenerator2.default.wrap(function _callee8$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this._client.service.platform().loggedIn();

              case 2:
                return _context10.abrupt('return', this.state.loginStatus === _loginStatus2.default.loggedIn);

              case 3:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee8, this);
      }));

      function checkIsLoggedIn() {
        return _ref12.apply(this, arguments);
      }

      return checkIsLoggedIn;
    }()
  }, {
    key: 'redirectUri',
    get: function get() {
      return _url2.default.resolve(window.location.href, this._redirectUri);
    }
  }, {
    key: 'proxyUri',
    get: function get() {
      return this._proxyUri;
    }
  }, {
    key: 'token',
    get: function get() {
      return this.state.token;
    }
  }, {
    key: 'ownerId',
    get: function get() {
      return this.token.ownerId;
    }
  }, {
    key: 'endpointId',
    get: function get() {
      return this.token.endpointId;
    }
  }, {
    key: 'accessToken',
    get: function get() {
      return this.token.accessToken;
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
  }, {
    key: 'isImplicit',
    get: function get() {
      return !(this._client.service.platform()._appSecret && this._client.service.platform()._appSecret.length > 0);
    }
  }]);
  return Auth;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'login', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'login'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'logout', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'logout'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'refreshImplicitToken', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'refreshImplicitToken'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'checkIsLoggedIn', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'checkIsLoggedIn'), _class2.prototype)), _class2)) || _class);
exports.default = Auth;
//# sourceMappingURL=index.js.map
