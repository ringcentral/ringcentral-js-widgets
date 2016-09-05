'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

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

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _desc, _value, _class;

var _rcModule = require('../../lib/rc-module');

var _rcModule2 = _interopRequireDefault(_rcModule);

var _proxy = require('../proxy');

var _symbolMap = require('data-types/symbol-map');

var _symbolMap2 = _interopRequireDefault(_symbolMap);

var _keyValueMap = require('data-types/key-value-map');

var _keyValueMap2 = _interopRequireDefault(_keyValueMap);

var _loginStatus = require('./login-status');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

var _authActions = require('./auth-actions');

var _authActions2 = _interopRequireDefault(_authActions);

var _authReducer = require('./auth-reducer');

var _authReducer2 = _interopRequireDefault(_authReducer);

var _authEvents = require('./auth-events');

var _utils = require('../../lib/utils');

var _loganberry = require('loganberry');

var _loganberry2 = _interopRequireDefault(_loganberry);

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

var logger = new _loganberry2.default({
  prefix: 'auth'
});

var symbols = new _symbolMap2.default(['platform', 'emitter', 'beforeLogoutHandlers', 'init']);

var CONSTANTS = new _keyValueMap2.default({
  loginStatus: _loginStatus2.default
});

/**
 * @class
 * @description Authentication module
 */
var Auth = (_class = function (_RcModule) {
  (0, _inherits3.default)(Auth, _RcModule);

  /**
   * @function
   */
  function Auth(options) {
    (0, _classCallCheck3.default)(this, Auth);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Auth.__proto__ || (0, _getPrototypeOf2.default)(Auth)).call(this, (0, _extends3.default)({}, options, {
      actions: _authActions2.default
    })));

    var platform = options.platform;

    _this.on('state-change', function (_ref) {
      var oldState = _ref.oldState;
      var newState = _ref.newState;

      // loginStatusChanged
      if (!oldState || oldState.status !== newState.status) {
        _utils.emit.call(_this, _authEvents.authEventTypes.loginStatusChanged, newState.status);
      }
    });
    _this[symbols.platform] = platform;
    return _this;
  }

  (0, _createClass3.default)(Auth, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      var platform = this[symbols.platform];
      this[symbols.beforeLogoutHandlers] = new _set2.default();

      // load info on login
      platform.on(platform.events.loginSuccess, function () {
        _this2.store.dispatch({
          type: _this2.actions.loginSuccess,
          token: platform.auth().data()
        });
      });
      // loginError
      platform.on(platform.events.loginError, function (error) {
        _this2.store.dispatch({
          type: _this2.actions.loginError,
          error: error
        });
      });
      // unload info on logout
      platform.on(platform.events.logoutSuccess, function () {
        _this2.store.dispatch({
          type: _this2.actions.logoutSuccess
        });
      });

      platform.on(platform.events.logoutError, function (error) {
        _this2.store.dispatch({
          type: _this2.actions.logoutError,
          error: error
        });
      });
      platform.on(platform.events.refreshSuccess, function () {
        _this2.store.dispatch({
          type: _this2.actions.refreshSuccess,
          token: platform.auth().data()
        });
      });
      platform.on(platform.events.refreshError, function (error) {
        _this2.store.dispatch({
          type: _this2.actions.refreshError,
          error: error
        });
      });

      // load info if already logged in
      (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var loggedIn;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return platform.loggedIn();

              case 2:
                loggedIn = _context.sent;

                _this2.store.dispatch({
                  type: _this2.actions.init,
                  status: loggedIn ? _loginStatus2.default.loggedIn : _loginStatus2.default.notLoggedIn,
                  token: loggedIn ? platform.auth().data() : null
                });

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }))();
    }
  }, {
    key: 'login',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref4) {
        var username = _ref4.username;
        var password = _ref4.password;
        var extension = _ref4.extension;
        var remember = _ref4.remember;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                logger.trace('login()');
                this.store.dispatch({
                  type: this.actions.login,
                  payload: {
                    username: username,
                    password: password,
                    extension: extension,
                    remember: remember
                  }
                });
                _context2.next = 4;
                return this[symbols.platform].login({
                  username: username,
                  password: password,
                  extension: extension,
                  remember: remember
                });

              case 4:
                return _context2.abrupt('return', _context2.sent);

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function login(_x) {
        return _ref3.apply(this, arguments);
      }

      return login;
    }()

    /**
     * @function
     * @description get OAuth page url
     */

  }, {
    key: 'loginUrl',
    value: function loginUrl(_ref5) {
      var redirectUri = _ref5.redirectUri;
      var state = _ref5.state;
      var brandId = _ref5.brandId;
      var display = _ref5.display;
      var prompt = _ref5.prompt;

      return this[symbols.platform].loginUrl({
        redirectUri: redirectUri,
        state: state,
        brandId: brandId,
        display: display,
        prompt: prompt
      });
    }

    /**
     * @function
     * @param {string} url
     * @return {Object}
     */

  }, {
    key: 'parseLoginUrl',
    value: function parseLoginUrl(url) {
      return this[symbols.platform].parseLoginRedirectUrl(url);
    }

    /**
     * @function
     * @async
     * @description Authorize using OAauth code
     */

  }, {
    key: 'authorize',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref7) {
        var code = _ref7.code;
        var redirectUri = _ref7.redirectUri;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.store.dispatch({
                  type: this.actions.login,
                  payload: {
                    code: code,
                    redirectUri: redirectUri
                  }
                });
                _context3.next = 3;
                return this[symbols.platform].login({
                  code: code,
                  redirectUri: redirectUri
                });

              case 3:
                return _context3.abrupt('return', _context3.sent);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function authorize(_x2) {
        return _ref6.apply(this, arguments);
      }

      return authorize;
    }()

    /**
     * @function
     * @async
     * @description Log the user out
     */

  }, {
    key: 'logout',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
        var _this3 = this;

        var handlers, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

        return _regenerator2.default.wrap(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                // deal with removing subscriptions
                this.store.dispatch({
                  type: this.actions.logout
                });
                handlers = [].concat((0, _toConsumableArray3.default)(this[symbols.beforeLogoutHandlers]));
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context6.prev = 5;
                _loop = _regenerator2.default.mark(function _loop() {
                  var handler;
                  return _regenerator2.default.wrap(function _loop$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          handler = _step.value;
                          _context5.prev = 1;
                          _context5.next = 4;
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
                            }, _callee4, _this3);
                          }))();

                        case 4:
                          _context5.next = 8;
                          break;

                        case 6:
                          _context5.prev = 6;
                          _context5.t0 = _context5['catch'](1);

                        case 8:
                        case 'end':
                          return _context5.stop();
                      }
                    }
                  }, _loop, _this3, [[1, 6]]);
                });
                _iterator = (0, _getIterator3.default)(handlers);

              case 8:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context6.next = 13;
                  break;
                }

                return _context6.delegateYield(_loop(), 't0', 10);

              case 10:
                _iteratorNormalCompletion = true;
                _context6.next = 8;
                break;

              case 13:
                _context6.next = 19;
                break;

              case 15:
                _context6.prev = 15;
                _context6.t1 = _context6['catch'](5);
                _didIteratorError = true;
                _iteratorError = _context6.t1;

              case 19:
                _context6.prev = 19;
                _context6.prev = 20;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 22:
                _context6.prev = 22;

                if (!_didIteratorError) {
                  _context6.next = 25;
                  break;
                }

                throw _iteratorError;

              case 25:
                return _context6.finish(22);

              case 26:
                return _context6.finish(19);

              case 27:
                _context6.next = 29;
                return this[symbols.platform].logout();

              case 29:
                return _context6.abrupt('return', _context6.sent);

              case 30:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee5, this, [[5, 15, 19, 27], [20,, 22, 26]]);
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
      var _this4 = this;

      this[symbols.beforeLogoutHandlers].add(handler);
      return function () {
        _this4[symbols.beforeLogoutHandlers].remove(handler);
      };
    }
    /**
     * @function
     * @param {Function} handler
     */

  }, {
    key: 'removeBeforeLogoutHandler',
    value: function removeBeforeLogoutHandler(handler) {
      this[symbols.beforeLogoutHandlers].remove(handler);
    }
  }, {
    key: 'isLoggedIn',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
        return _regenerator2.default.wrap(function _callee6$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this[symbols.platform].loggedIn();

              case 2:
                return _context7.abrupt('return', _context7.sent);

              case 3:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee6, this);
      }));

      function isLoggedIn() {
        return _ref10.apply(this, arguments);
      }

      return isLoggedIn;
    }()
  }, {
    key: 'reducer',
    get: function get() {
      return (0, _authReducer2.default)(this.prefix);
    }
    /**
     * @function
     * @async
     * @description Login function using username and password
     */

  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'events',
    get: function get() {
      return _authEvents.authEvents;
    }
  }, {
    key: 'eventTypes',
    get: function get() {
      return _authEvents.authEventTypes;
    }
  }, {
    key: 'constants',
    get: function get() {
      return CONSTANTS;
    }
  }, {
    key: 'ownerId',
    get: function get() {
      return this.state.token.owner_id;
    }
  }]);
  return Auth;
}(_rcModule2.default), (_applyDecoratedDescriptor(_class.prototype, 'init', [_rcModule.initFunction], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'init'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'login', [_proxy.proxify], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'login'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'authorize', [_proxy.proxify], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'authorize'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'logout', [_proxy.proxify], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'logout'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'addBeforeLogoutHandler', [_proxy.throwOnProxy], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'addBeforeLogoutHandler'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'removeBeforeLogoutHandler', [_proxy.throwOnProxy], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'removeBeforeLogoutHandler'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'isLoggedIn', [_proxy.proxify], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'isLoggedIn'), _class.prototype)), _class);
exports.default = Auth;
//# sourceMappingURL=index.js.map
