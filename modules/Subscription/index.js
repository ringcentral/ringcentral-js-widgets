'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

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

var _dec, _class, _desc, _value, _class2;

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../../lib/di');

var _sleep = require('../../lib/sleep');

var _sleep2 = _interopRequireDefault(_sleep);

var _loginStatus = require('../Auth/loginStatus');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _getSubscriptionReducer = require('./getSubscriptionReducer');

var _getSubscriptionReducer2 = _interopRequireDefault(_getSubscriptionReducer);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

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

var DEFAULT_TIME_TO_RETRY = 60 * 1000;

/**
 * @class
 * @description Subscription module to subscibe notification
 */
var Subscription = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Client', 'Storage', { dep: 'SubscriptionOptions', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(Subscription, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   * @param {Client} params.client - client module instance
   * @param {Storage} params.storage - storage module instance
   * @param {Number} params.timeToRetry - time to retry, default 60 seconds
   */
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
    _this._registerTimeoutId = null;
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
    key: '_detectSleep',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var t;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this._subscription) {
                  _context3.next = 12;
                  break;
                }

                t = Date.now();
                _context3.next = 4;
                return (0, _sleep2.default)(10000);

              case 4:
                if (!(this.ready && this._subscribe && Date.now() - t > 20 * 1000)) {
                  _context3.next = 10;
                  break;
                }

                _context3.next = 7;
                return this.remove();

              case 7:
                _context3.next = 9;
                return this._subscribe();

              case 9:
                return _context3.abrupt('break', 12);

              case 10:
                _context3.next = 0;
                break;

              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _detectSleep() {
        return _ref4.apply(this, arguments);
      }

      return _detectSleep;
    }()
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
          // immediately start the retry process after the first renewError
          _this3._retry(0);
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
      this._detectSleep();
    }
  }, {
    key: '_register',
    value: function _register() {
      var _this4 = this;

      if (this._registerTimeoutId) {
        clearTimeout(this._registerTimeoutId);
      }
      this._registerTimeoutId = setTimeout(function () {
        _this4._registerTimeoutId = null;
        _this4.store.dispatch({
          type: _this4.actionTypes.subscribe
        });
        if (_this4._subscription) {
          _this4._subscription.setEventFilters(_this4.filters);
          _this4._subscription.register();
        }
      }, 2000);
    }
  }, {
    key: '_subscribe',
    value: function _subscribe() {
      if (!this._subscription) {
        this._createSubscription();
      }
      this._subscription.setEventFilters(this.filters);
      this._register();
    }
  }, {
    key: 'subscribe',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var oldFilters;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this.ready) {
                  _context4.next = 6;
                  break;
                }

                oldFilters = this.filters;

                this.store.dispatch({
                  type: this.actionTypes.addFilters,
                  filters: [].concat(events)
                });

                if (!(oldFilters.length !== this.filters.length)) {
                  _context4.next = 6;
                  break;
                }

                _context4.next = 6;
                return this._subscribe();

              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function subscribe() {
        return _ref5.apply(this, arguments);
      }

      return subscribe;
    }()
  }, {
    key: 'unsubscribe',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
        var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var oldFilters;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this.ready) {
                  oldFilters = this.filters;

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

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function unsubscribe() {
        return _ref6.apply(this, arguments);
      }

      return unsubscribe;
    }()
  }, {
    key: '_stopRetry',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (this._retryTimeoutId) {
                  clearTimeout(this._retryTimeoutId);
                  this._retryTimeoutId = null;
                }

              case 1:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _stopRetry() {
        return _ref7.apply(this, arguments);
      }

      return _stopRetry;
    }()
  }, {
    key: '_retry',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
        var _this5 = this;

        var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._timeToRetry;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this._stopRetry();
                this._retryTimeoutId = setTimeout(function () {
                  if (_this5.ready) {
                    _this5._subscribe();
                  }
                }, t);

              case 2:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _retry() {
        return _ref8.apply(this, arguments);
      }

      return _retry;
    }()
  }, {
    key: '_remove',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!this._subscription) {
                  _context8.next = 11;
                  break;
                }

                _context8.prev = 1;

                this.store.dispatch({
                  type: this.actionTypes.remove
                });
                _context8.next = 5;
                return this._subscription.remove();

              case 5:
                _context8.next = 9;
                break;

              case 7:
                _context8.prev = 7;
                _context8.t0 = _context8['catch'](1);

              case 9:
                if (this._subscription) {
                  // check again in case subscription object was removed while waiting
                  this._subscription.reset();
                  this._subscription = null;
                }
                this._removePromise = null;

              case 11:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this, [[1, 7]]);
      }));

      function _remove() {
        return _ref9.apply(this, arguments);
      }

      return _remove;
    }()
  }, {
    key: 'remove',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!this._removePromise) {
                  this._removePromise = this._remove();
                }
                return _context9.abrupt('return', this._removePromise);

              case 2:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function remove() {
        return _ref10.apply(this, arguments);
      }

      return remove;
    }()
  }, {
    key: '_reset',
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10() {
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.reset
                });
                this._stopRetry();

                if (!this._subscription) {
                  _context10.next = 15;
                  break;
                }

                if (!this._auth.loggedIn) {
                  _context10.next = 13;
                  break;
                }

                _context10.prev = 4;
                _context10.next = 7;
                return this.remove();

              case 7:
                _context10.next = 11;
                break;

              case 9:
                _context10.prev = 9;
                _context10.t0 = _context10['catch'](4);

              case 11:
                _context10.next = 15;
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
                return _context10.stop();
            }
          }
        }, _callee10, this, [[4, 9]]);
      }));

      function _reset() {
        return _ref11.apply(this, arguments);
      }

      return _reset;
    }()
  }, {
    key: 'reset',
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11() {
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!this._resetPromise) {
                  this._resetPromise = this._reset();
                }
                return _context11.abrupt('return', this._resetPromise);

              case 2:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function reset() {
        return _ref12.apply(this, arguments);
      }

      return reset;
    }()
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
  }, {
    key: 'pubnub',
    get: function get() {
      return this._subscription && this._subscription._pubnub;
    }
  }]);
  return Subscription;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'subscribe', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'subscribe'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'unsubscribe', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'unsubscribe'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'remove', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'remove'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'reset', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'reset'), _class2.prototype)), _class2)) || _class);
exports.default = Subscription;
//# sourceMappingURL=index.js.map
