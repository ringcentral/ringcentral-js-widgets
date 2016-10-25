'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _getAuthReducer = require('./getAuthReducer');

var _getAuthReducer2 = _interopRequireDefault(_getAuthReducer);

var _authActionTypes = require('./authActionTypes');

var _authActionTypes2 = _interopRequireDefault(_authActionTypes);

var _authStatus = require('./authStatus');

var _authStatus2 = _interopRequireDefault(_authStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        options = (0, _objectWithoutProperties3.default)(_ref, ['client']);

    (0, _classCallCheck3.default)(this, Auth);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Auth.__proto__ || (0, _getPrototypeOf2.default)(Auth)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _authActionTypes2.default
    })));

    _this._client = client;
    _this._reducer = (0, _getAuthReducer2.default)(_this.prefix);
    _this._beforeLogoutHandlers = new _set2.default();
    return _this;
  }

  (0, _createClass3.default)(Auth, [{
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
     * @description Login function using username and password
     */
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref3) {
        var username = _ref3.username,
            password = _ref3.password,
            extension = _ref3.extension,
            remember = _ref3.remember,
            code = _ref3.code,
            redirectUri = _ref3.redirectUri;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.login
                });
                _context.next = 3;
                return this._client.login({
                  username: username,
                  password: password,
                  extension: extension,
                  remember: remember,
                  code: code,
                  redirectUri: redirectUri
                });

              case 3:
                return _context.abrupt('return', _context.sent);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function login(_x2) {
        return _ref2.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: 'initialize',
    value: function initialize() {
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
      });
      platform.on(platform.events.refreshSuccess, function () {
        _this2.store.dispatch({
          type: _this2.actionTypes.refreshSuccess,
          token: platform.auth().data()
        });
      });
      platform.on(platform.events.refreshError, function (error) {
        _this2.store.dispatch({
          type: _this2.actionTypes.refreshError,
          error: error
        });
      });
      (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var loggedIn;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return platform.loggedIn();

              case 2:
                loggedIn = _context2.sent;

                _this2.store.dispatch({
                  type: _this2.actionTypes.init,
                  loggedIn: loggedIn,
                  token: loggedIn ? platform.auth().data() : null
                });

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    }

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
      return this._client.getAuthCode(callbackUri);
    }
  }, {
    key: 'logout',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        var _this3 = this;

        var handlers, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

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
                  var handler;
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
                            }, _callee3, _this3);
                          }))();

                        case 3:
                        case 'end':
                          return _context4.stop();
                      }
                    }
                  }, _loop, _this3);
                });
                _iterator = (0, _getIterator3.default)(handlers);

              case 9:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context5.next = 14;
                  break;
                }

                return _context5.delegateYield(_loop(), 't0', 11);

              case 11:
                _iteratorNormalCompletion = true;
                _context5.next = 9;
                break;

              case 14:
                _context5.next = 20;
                break;

              case 16:
                _context5.prev = 16;
                _context5.t1 = _context5['catch'](6);
                _didIteratorError = true;
                _iteratorError = _context5.t1;

              case 20:
                _context5.prev = 20;
                _context5.prev = 21;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 23:
                _context5.prev = 23;

                if (!_didIteratorError) {
                  _context5.next = 26;
                  break;
                }

                throw _iteratorError;

              case 26:
                return _context5.finish(23);

              case 27:
                return _context5.finish(20);

              case 28:
                _context5.next = 33;
                break;

              case 30:
                _context5.prev = 30;
                _context5.t2 = _context5['catch'](2);

                this.store.dispatch({
                  type: this.actionTypes.cancelLogout,
                  error: _context5.t2
                });

              case 33:
                this.store.dispatch({
                  type: this.actionTypes.logout
                });
                _context5.next = 36;
                return this._client.logout();

              case 36:
                return _context5.abrupt('return', _context5.sent);

              case 37:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee4, this, [[2, 30], [6, 16, 20, 28], [21,, 23, 27]]);
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
      var _this4 = this;

      this._beforeLogoutHandlers.add(handler);
      return function () {
        _this4.removeBeforeLogoutHandler(handler);
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
    key: 'isLoggedIn',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
        return _regenerator2.default.wrap(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._client.service.platform().loggedIn();

              case 2:
                return _context6.abrupt('return', _context6.sent);

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee5, this);
      }));

      function isLoggedIn() {
        return _ref8.apply(this, arguments);
      }

      return isLoggedIn;
    }()
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
    key: 'error',
    get: function get() {
      return this.state.error;
    }
  }, {
    key: 'isFreshLogin',
    get: function get() {
      return this.state.freshLogin;
    }
  }, {
    key: 'authStatus',
    get: function get() {
      return _authStatus2.default;
    }
  }]);
  return Auth;
}(_RcModule3.default);

exports.default = Auth;
//# sourceMappingURL=index.js.map
