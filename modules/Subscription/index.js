'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _subscriptionActionTypes = require('./subscriptionActionTypes');

var _subscriptionActionTypes2 = _interopRequireDefault(_subscriptionActionTypes);

var _subscriptionStatus = require('./subscriptionStatus');

var _subscriptionStatus2 = _interopRequireDefault(_subscriptionStatus);

var _getSubscriptionReducer = require('./getSubscriptionReducer');

var _getSubscriptionReducer2 = _interopRequireDefault(_getSubscriptionReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Subscription = function (_RcModule) {
  (0, _inherits3.default)(Subscription, _RcModule);

  function Subscription(_ref) {
    var auth = _ref.auth,
        client = _ref.client,
        storage = _ref.storage,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'client', 'storage']);
    (0, _classCallCheck3.default)(this, Subscription);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Subscription.__proto__ || (0, _getPrototypeOf2.default)(Subscription)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _subscriptionActionTypes2.default
    })));

    _this._auth = auth;
    _this._client = client;
    _this._storage = storage;
    _this._subscription = null;
    _this._storageKey = 'subscription-cache';
    _this._reducer = (0, _getSubscriptionReducer2.default)(_this.prefix);
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
                if (!(_this2._auth.status === _this2._auth.authStatus.loggedIn && _this2._storage.status === _this2._storage.storageStatus.ready && _this2.status === _subscriptionStatus2.default.pending)) {
                  _context.next = 16;
                  break;
                }

                if (!_this2._subscription) {
                  _context.next = 4;
                  break;
                }

                _context.next = 4;
                return _this2.reset();

              case 4:
                _this2._subscription = _this2._client.createSubscription();

                // reuse cached subscription id
                // we're not reusing the filters however
                if (_this2._storage.hasItem(_this2._storageKey)) {
                  try {
                    _this2._subscription.setSubscription(_this2._storage.getItem(_this2._storageKey));
                  } catch (error) {
                    // cached subscription already expired
                  }
                }

                _this2._subscription.on(_this2._subscription.events.notification, function (message) {
                  _this2.store.dispatch({
                    type: _this2.actionTypes.notification,
                    message: message
                  });
                });
                _this2._subscription.on(_this2._subscription.events.removeSuccess, function () {
                  _this2._subscription.reset();
                  _this2._storage.removeItem(_this2._storageKey);
                  _this2.store.dispatch({
                    type: _this2.actionTypes.removeSuccess
                  });
                });
                _this2._subscription.on(_this2._subscription.events.removeError, function (error) {
                  _this2.store.dispatch({
                    type: _this2.actionTypes.removeError,
                    error: error
                  });
                });
                _this2._subscription.on(_this2._subscription.events.renewSuccess, function () {
                  _this2._storage.setItem(_this2._storageKey, _this2._subscription.subscription());
                  _this2.store.dispatch({
                    type: _this2.actionTypes.renewSuccess
                  });
                });
                _this2._subscription.on(_this2._subscription.events.renewError, function (error) {
                  _this2._storage.removeItem(_this2._storageKey);
                  _this2.store.dispatch({
                    type: _this2.actionTypes.renewError,
                    error: error
                  });
                  // TODO handle 429 error
                  // try to re-subscribe
                  _this2._subscription.reset().setEventFilters(_this2.filters).register().catch(function (e) {});
                });
                _this2._subscription.on(_this2._subscription.events.subscribeSuccess, function () {
                  _this2._storage.setItem(_this2._storageKey, _this2._subscription.subscription());
                  _this2.store.dispatch({
                    type: _this2.actionTypes.subscribeSuccess
                  });
                });
                _this2._subscription.on(_this2._subscription.events.subscribeError, function (error) {
                  _this2._storage.removeItem(_this2._storageKey);
                  _this2.store.dispatch({
                    type: _this2.actionTypes.subscribeError,
                    error: error
                  });
                });
                _this2.store.dispatch({
                  type: _this2.actionTypes.init
                });
                _context.next = 17;
                break;

              case 16:
                if (_this2._storage.status === _this2._storage.storageStatus.pending && _this2.status !== _subscriptionStatus2.default.pending && _this2.status !== _subscriptionStatus2.default.resetting) {
                  // reset
                  _this2.reset();
                }

              case 17:
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
                if (!_this2._resetPromise) {
                  _context2.next = 5;
                  break;
                }

                _context2.next = 3;
                return _this2._resetPromise;

              case 3:
                _context2.next = 8;
                break;

              case 5:
                if (!(_this2.status !== _subscriptionStatus2.default.pending && _this2.status !== _subscriptionStatus2.default.resetting)) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 8;
                return _this2.reset();

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      })));
    }
  }, {
    key: 'subscribe',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(events) {
        var oldFilters;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.status === _subscriptionStatus2.default.pending)) {
                  _context3.next = 2;
                  break;
                }

                throw new Error('Subscription module is not ready');

              case 2:
                oldFilters = this.filters;

                this.store.dispatch({
                  type: this.actionTypes.addFilters,
                  filters: events
                });

                if (!(this.filters.length !== oldFilters.length)) {
                  _context3.next = 13;
                  break;
                }

                this._subscription.setEventFilters([].concat((0, _toConsumableArray3.default)(this.filters)));
                _context3.prev = 6;
                _context3.next = 9;
                return this._subscription.register();

              case 9:
                _context3.next = 13;
                break;

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3['catch'](6);

              case 13:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[6, 11]]);
      }));

      function subscribe(_x) {
        return _ref4.apply(this, arguments);
      }

      return subscribe;
    }()
  }, {
    key: 'unsubscribe',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(events) {
        var oldFilters;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(this.status === _subscriptionStatus2.default.pending)) {
                  _context4.next = 2;
                  break;
                }

                throw new Error('Subscription module is not ready');

              case 2:
                oldFilters = this.filters;

                this.store.dispatch({
                  type: this.actionTypes.removeFilters,
                  filters: events
                });

                if (!(this.filters.length !== oldFilters)) {
                  _context4.next = 13;
                  break;
                }

                this._subscription.setEventFilters([].concat((0, _toConsumableArray3.default)(this.filters)));

                if (!(this.filters.length > 0)) {
                  _context4.next = 11;
                  break;
                }

                _context4.next = 9;
                return this._subscription.register();

              case 9:
                _context4.next = 13;
                break;

              case 11:
                _context4.next = 13;
                return this._subscription.remove();

              case 13:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function unsubscribe(_x2) {
        return _ref5.apply(this, arguments);
      }

      return unsubscribe;
    }()
  }, {
    key: 'reset',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
        var _this3 = this;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this._resetPromise) {
                  this._resetPromise = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
                    return _regenerator2.default.wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            _this3.store.dispatch({
                              type: _this3.actionTypes.reset
                            });

                            if (!_this3._subscription) {
                              _context5.next = 14;
                              break;
                            }

                            _context5.prev = 2;

                            if (!(_this3.status === _subscriptionStatus2.default.subscribed)) {
                              _context5.next = 8;
                              break;
                            }

                            _context5.next = 6;
                            return _this3._subscription.remove();

                          case 6:
                            _context5.next = 9;
                            break;

                          case 8:
                            _this3._subscription.reset();

                          case 9:
                            _context5.next = 13;
                            break;

                          case 11:
                            _context5.prev = 11;
                            _context5.t0 = _context5['catch'](2);

                          case 13:
                            _this3._subscription = null;

                          case 14:
                            _this3.store.dispatch({
                              type: _this3.actionTypes.resetSuccess
                            });
                            _this3._resetPromise = null;

                          case 16:
                          case 'end':
                            return _context5.stop();
                        }
                      }
                    }, _callee5, _this3, [[2, 11]]);
                  }))();
                }
                _context6.next = 3;
                return this._resetPromise;

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function reset() {
        return _ref6.apply(this, arguments);
      }

      return reset;
    }()
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
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
    key: 'error',
    get: function get() {
      return this.state.error;
    }
  }, {
    key: 'subscriptionStatus',
    get: function get() {
      return _subscriptionStatus2.default;
    }
  }]);
  return Subscription;
}(_RcModule3.default);

exports.default = Subscription;
//# sourceMappingURL=index.js.map
