'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _loginStatus = require('../Auth/loginStatus');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _getSubscriptionReducer = require('./getSubscriptionReducer');

var _getSubscriptionReducer2 = _interopRequireDefault(_getSubscriptionReducer);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_TIME_TO_RETRY = 60 * 1000;

var Subscription = function (_RcModule) {
  (0, _inherits3.default)(Subscription, _RcModule);

  function Subscription(_ref) {
    var auth = _ref.auth,
        client = _ref.client,
        storage = _ref.storage,
        _ref$timeToRetry = _ref.timeToRetry,
        timeToRetry = _ref$timeToRetry === undefined ? DEFAULT_TIME_TO_RETRY : _ref$timeToRetry,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'client', 'storage', 'timeToRetry']);
    (0, _classCallCheck3.default)(this, Subscription);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Subscription.__proto__ || (0, _getPrototypeOf2.default)(Subscription)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._auth = auth;
    _this._client = client;
    _this._storage = storage;
    _this._timeToRetry = timeToRetry;
    _this._cacheStorageKey = 'cachedSubscription';
    _this._reducer = (0, _getSubscriptionReducer2.default)(_this.actionTypes);
    _this._storage.registerReducer({
      key: _this._cacheStorageKey,
      reducer: (0, _getSubscriptionReducer.getCachedSubscriptionReducer)(_this.actionTypes)
    });

    _this._resetPromise = null;
    _this._removePromise = null;
    _this._retryTimeoutId = null;
    return _this;
  }

  (0, _createClass3.default)(Subscription, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (_this2._auth.loginStatus === _loginStatus2.default.loggedIn && _this2._storage.ready && _this2.status === _moduleStatuses2.default.pending) {
                  _this2.store.dispatch({
                    type: _this2.actionTypes.initSuccess
                  });
                } else if ((_this2._auth.loginStatus === _loginStatus2.default.notLoggedIn || !_this2._storage.ready) && _this2.ready) {
                  _this2.reset();
                }

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      })));
      this._auth.addBeforeLogoutHandler((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!_this2.ready) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return _this2.reset();

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      })));
    }
  }, {
    key: '_createSubscription',
    value: function _createSubscription() {
      var _this3 = this;

      this._subscription = this._client.service.createSubscription();
      if (this.cachedSubscription) {
        try {
          this._subscription.setSubscription(this.cachedSubscription);
        } catch (error) {
          /* falls through */
        }
      }
      this._subscription.on(this._subscription.events.notification, function (message) {
        _this3.store.dispatch({
          type: _this3.actionTypes.notification,
          message: message
        });
      });
      this._subscription.on(this._subscription.events.removeSuccess, function () {
        _this3.store.dispatch({
          type: _this3.actionTypes.removeSuccess
        });
      });
      this._subscription.on(this._subscription.events.removeError, function (error) {
        _this3.store.dispatch({
          type: _this3.actionTypes.removeError,
          error: error
        });
      });
      this._subscription.on(this._subscription.events.renewSuccess, function () {
        _this3.store.dispatch({
          type: _this3.actionTypes.renewSuccess,
          subscription: _this3._subscription.subscription()
        });
      });
      this._subscription.on(this._subscription.events.renewError, function (error) {
        if (_this3._subscription) {
          _this3._subscription.reset();
          _this3._subscription = null;
        }
        _this3.store.dispatch({
          type: _this3.actionTypes.renewError,
          error: error
        });
        if (_this3._auth.loginStatus === _loginStatus2.default.loggedIn && _this3._storage.ready) {
          _this3._retry();
        }
      });
      this._subscription.on(this._subscription.events.subscribeSuccess, function () {
        _this3.store.dispatch({
          type: _this3.actionTypes.subscribeSuccess,
          subscription: _this3._subscription.subscription()
        });
      });
      this._subscription.on(this._subscription.events.subscribeError, function (error) {
        _this3.store.dispatch({
          type: _this3.actionTypes.subscribeError,
          error: error
        });
        if (_this3._auth.loginStatus === _loginStatus2.default.loggedIn && _this3._storage.ready) {
          _this3._retry();
        }
      });
    }
  }, {
    key: '_subscribe',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this._subscription) {
                  this._createSubscription();
                }
                this._subscription.setEventFilters(this.filters);
                _context3.prev = 2;

                this.store.dispatch({
                  type: this.actionTypes.subscribe
                });
                _context3.next = 6;
                return this._subscription.register();

              case 6:
                _context3.next = 10;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3['catch'](2);

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 8]]);
      }));

      function _subscribe() {
        return _ref4.apply(this, arguments);
      }

      return _subscribe;
    }()
  }, {
    key: 'subscribe',
    value: function subscribe(events) {
      if (this.ready) {
        var oldFilters = this.filters;
        this.store.dispatch({
          type: this.actionTypes.addFilters,
          filters: [].concat(events)
        });
        if (oldFilters.length !== this.filters.length) {
          this._subscribe();
        }
      }
    }
  }, {
    key: 'unsubscribe',
    value: function unsubscribe(events) {
      if (this.ready) {
        var oldFilters = this.filters;
        this.store.dispatch({
          type: this.actionTypes.removeFilters,
          fiters: [].concat(events)
        });
        if (this.filters.length === 0) {
          this.remove();
        } else if (oldFilters.length !== this.filters.length) {
          this._subscribe();
        }
      }
    }
  }, {
    key: '_stopRetry',
    value: function _stopRetry() {
      if (this._retryTimeoutId) {
        clearTimeout(this._retryTimeoutId);
        this._retryTimeoutId = null;
      }
    }
  }, {
    key: '_retry',
    value: function _retry() {
      var _this4 = this;

      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._timeToRetry;

      this._stopRetry();
      this._retryTimeoutId = setTimeout(function () {
        if (_this4.ready) {
          _this4._subscribe();
        }
      }, t);
    }
  }, {
    key: '_remove',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this._subscription) {
                  _context4.next = 11;
                  break;
                }

                _context4.prev = 1;

                this.store.dispatch({
                  type: this.actionTypes.remove
                });
                _context4.next = 5;
                return this._subscription.remove();

              case 5:
                _context4.next = 9;
                break;

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4['catch'](1);

              case 9:
                if (this._subscription) {
                  // check again in case subscription object was removed while waiting
                  this._subscription.reset();
                  this._subscription = null;
                }
                this._removePromise = null;

              case 11:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 7]]);
      }));

      function _remove() {
        return _ref5.apply(this, arguments);
      }

      return _remove;
    }()
  }, {
    key: 'remove',
    value: function remove() {
      if (!this._removePromise) {
        this._removePromise = this._remove();
      }
      return this._removePromise;
    }
  }, {
    key: '_reset',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.reset
                });
                this._stopRetry();

                if (!this._subscription) {
                  _context5.next = 15;
                  break;
                }

                if (!this._auth.loggedIn) {
                  _context5.next = 13;
                  break;
                }

                _context5.prev = 4;
                _context5.next = 7;
                return this.remove();

              case 7:
                _context5.next = 11;
                break;

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5['catch'](4);

              case 11:
                _context5.next = 15;
                break;

              case 13:
                this._subscription.reset();
                this._subscription = null;

              case 15:
                this._resetPromise = null;
                this.store.dispatch({
                  type: this.actionTypes.resetSuccess
                });

              case 17:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[4, 9]]);
      }));

      function _reset() {
        return _ref6.apply(this, arguments);
      }

      return _reset;
    }()
  }, {
    key: 'reset',
    value: function reset() {
      if (!this._resetPromise) {
        this._resetPromise = this._reset();
      }
      return this._resetPromise;
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
    key: 'filters',
    get: function get() {
      return this.state.filters;
    }
  }, {
    key: 'message',
    get: function get() {
      return this.state.message;
    }
  }, {
    key: 'subscriptionStatus',
    get: function get() {
      return this.state.subscriptionStatus;
    }
  }, {
    key: 'cachedSubscription',
    get: function get() {
      return this._storage.getItem(this._cacheStorageKey);
    }
  }]);
  return Subscription;
}(_RcModule3.default);

exports.default = Subscription;
//# sourceMappingURL=index.js.map
