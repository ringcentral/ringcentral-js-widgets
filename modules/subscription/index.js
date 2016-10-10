'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

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

var _desc, _value, _class;

var _rcModule = require('../../lib/rc-module');

var _rcModule2 = _interopRequireDefault(_rcModule);

var _symbolMap = require('data-types/symbol-map');

var _symbolMap2 = _interopRequireDefault(_symbolMap);

var _keyValueMap = require('data-types/key-value-map');

var _keyValueMap2 = _interopRequireDefault(_keyValueMap);

var _subscriptionActions = require('./subscription-actions');

var _subscriptionActions2 = _interopRequireDefault(_subscriptionActions);

var _getSubscriptionReducer = require('./get-subscription-reducer');

var _getSubscriptionReducer2 = _interopRequireDefault(_getSubscriptionReducer);

var _subscriptionEvents = require('./subscription-events');

var _subscriptionEvents2 = _interopRequireDefault(_subscriptionEvents);

var _subscriptionStatus = require('./subscription-status');

var _subscriptionStatus2 = _interopRequireDefault(_subscriptionStatus);

var _proxy = require('../proxy');

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

var symbols = new _symbolMap2.default(['auth', 'api', 'storage', 'subscription']);

var keys = new _keyValueMap2.default({
  storage: 'subscription-cache'
});

var Subscription = (_class = function (_RcModule) {
  (0, _inherits3.default)(Subscription, _RcModule);

  function Subscription(_ref) {
    var auth = _ref.auth;
    var api = _ref.api;
    var storage = _ref.storage;
    var options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'api', 'storage']);
    (0, _classCallCheck3.default)(this, Subscription);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Subscription.__proto__ || (0, _getPrototypeOf2.default)(Subscription)).call(this, (0, _extends3.default)({}, options, {
      actions: _subscriptionActions2.default
    })));

    _this[symbols.auth] = auth;
    _this[symbols.api] = api;
    _this[symbols.storage] = storage;
    _this[symbols.subscription] = null;

    // send events based on state change
    _this.on('state-change', function (_ref2) {
      var oldState = _ref2.oldState;
      var newState = _ref2.newState;

      if (oldState) {
        if (oldState.status !== newState.status) {
          _this.emit(_subscriptionEvents2.default.statusChange, {
            oldStatus: oldState.status,
            newStatus: newState.status
          });
          _this.emit(newState.status);
        }
        if (newState.lastMessage && oldState.lastMessage !== newState.lastMessage) {
          _this.emit(_subscriptionEvents2.default.notification, newState.lastMessage);
        }
        if (oldState.status === _subscriptionStatus2.default.pending && oldState.status !== newState.status) {
          _this.emit(_subscriptionEvents2.default.ready);
        }
      }
    });
    return _this;
  }

  (0, _createClass3.default)(Subscription, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      var storage = this[symbols.storage];
      storage.on(storage.storageEvents.ready, (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
        var cachedSubscription;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!_this2.base) {
                  _context6.next = 3;
                  break;
                }

                _context6.next = 3;
                return _this2.reset();

              case 3:
                _this2[symbols.subscription] = _this2[symbols.api].createSubscription();
                // cached subscription
                cachedSubscription = storage.getItem(keys.storage);

                if (cachedSubscription) {
                  _this2.base.setSubscription(cachedSubscription);
                }
                _this2.base.on(_this2.base.events.notification, function (message) {
                  _this2.store.dispatch({
                    type: _this2.actions.notification,
                    message: message
                  });
                });
                _this2.base.on(_this2.base.events.removeSuccess, (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _this2.base.reset();
                          _context.next = 3;
                          return storage.removeItem(keys.storage);

                        case 3:
                          _this2.store.dispatch({
                            type: _this2.actions.removeSuccess
                          });

                        case 4:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, _this2);
                })));
                _this2.base.on(_this2.base.events.removeError, function (error) {
                  _this2.store.disptach({
                    type: _this2.actions.removeError,
                    error: error
                  });
                });
                _this2.base.on(_this2.base.events.renewSuccess, (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
                  return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return storage.setItem(keys.storage, _this2.base.subscription());

                        case 2:
                          _this2.store.dispatch({
                            type: _this2.actions.renewSuccess
                          });

                        case 3:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, _this2);
                })));
                _this2.base.on(_this2.base.events.renewError, function () {
                  var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(error) {
                    return _regenerator2.default.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            storage.removeItem(keys.storage);
                            _this2.store.dispatch({
                              type: _this2.actions.renewError,
                              error: error
                            });
                            _this2.base.reset().setEventFilters(_this2.filters).register().catch(function (e) {});

                          case 3:
                          case 'end':
                            return _context3.stop();
                        }
                      }
                    }, _callee3, _this2);
                  }));

                  return function (_x) {
                    return _ref6.apply(this, arguments);
                  };
                }());
                _this2.base.on(_this2.base.events.subscribeSuccess, (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
                  return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.next = 2;
                          return storage.setItem(keys.storage, _this2.base.subscription());

                        case 2:
                          _this2.store.dispatch({
                            type: _this2.actions.subscribeSuccess
                          });

                        case 3:
                        case 'end':
                          return _context4.stop();
                      }
                    }
                  }, _callee4, _this2);
                })));
                _this2.base.on(_this2.base.events.subscribeError, function () {
                  var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(error) {
                    return _regenerator2.default.wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            _context5.next = 2;
                            return storage.removeItem(keys.storage);

                          case 2:
                            _this2.store.dispatch({
                              type: _this2.actions.subscribeError,
                              error: error
                            });

                          case 3:
                          case 'end':
                            return _context5.stop();
                        }
                      }
                    }, _callee5, _this2);
                  }));

                  return function (_x2) {
                    return _ref8.apply(this, arguments);
                  };
                }());
                _this2.store.dispatch({
                  type: _this2.actions.ready
                });

              case 14:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, _this2);
      })));

      this[symbols.auth].on(this[symbols.auth].authEvents.loggedOut, (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _this2.reset();

              case 2:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, _this2);
      })));

      this[symbols.auth].addBeforeLogoutHandler((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _this2.reset();

              case 2:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, _this2);
      })));
    }
  }, {
    key: 'subscribe',
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(events) {
        var newFilters;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!(this.status === _subscriptionStatus2.default.pending)) {
                  _context9.next = 2;
                  break;
                }

                throw new Error('Called before module is ready');

              case 2:
                newFilters = [].concat((0, _toConsumableArray3.default)(new _set2.default([].concat((0, _toConsumableArray3.default)(this.filters)).concat(events))));

                if (!(newFilters.length !== this.filters.length)) {
                  _context9.next = 8;
                  break;
                }

                this.store.dispatch({
                  type: this.actions.setFilters,
                  filters: newFilters
                });
                this.base.setEventFilters(newFilters);
                _context9.next = 8;
                return this.base.register();

              case 8:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function subscribe(_x3) {
        return _ref11.apply(this, arguments);
      }

      return subscribe;
    }()
  }, {
    key: 'unsubscribe',
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(events) {
        var newFilters;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!(this.status === _subscriptionStatus2.default.pending)) {
                  _context10.next = 2;
                  break;
                }

                throw new Error('Called before module is ready');

              case 2:
                newFilters = [].concat((0, _toConsumableArray3.default)(new _set2.default([].concat((0, _toConsumableArray3.default)(this.filters))).remove([].concat(events))));

                if (!(newFilters.length !== this.filters.length)) {
                  _context10.next = 13;
                  break;
                }

                this.store.dispatch({
                  type: this.actions.setFilters,
                  filters: newFilters
                });
                this.base.setEventFilters(newFilters);

                if (!(newFilters.length > 0)) {
                  _context10.next = 11;
                  break;
                }

                _context10.next = 9;
                return this.base.register();

              case 9:
                _context10.next = 13;
                break;

              case 11:
                _context10.next = 13;
                return this.base.remove();

              case 13:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function unsubscribe(_x4) {
        return _ref12.apply(this, arguments);
      }

      return unsubscribe;
    }()
  }, {
    key: 'reset',
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11() {
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!this.base) {
                  _context11.next = 15;
                  break;
                }

                _context11.prev = 1;

                if (!(this.status === _subscriptionStatus2.default.subscribed)) {
                  _context11.next = 7;
                  break;
                }

                _context11.next = 5;
                return this.base.remove();

              case 5:
                _context11.next = 9;
                break;

              case 7:
                _context11.next = 9;
                return this.base.reset();

              case 9:
                _context11.next = 13;
                break;

              case 11:
                _context11.prev = 11;
                _context11.t0 = _context11['catch'](1);

              case 13:
                this[symbols.subscription] = null;
                this.store.dispatch({
                  type: this.actions.reset
                });

              case 15:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this, [[1, 11]]);
      }));

      function reset() {
        return _ref13.apply(this, arguments);
      }

      return reset;
    }()
  }, {
    key: 'reducer',
    get: function get() {
      return (0, _getSubscriptionReducer2.default)(this.prefix);
    }
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
    key: 'base',
    get: function get() {
      return this[symbols.subscription];
    }
  }, {
    key: 'subscriptionEvents',
    get: function get() {
      return _subscriptionEvents2.default;
    }
  }, {
    key: 'subscriptionStatus',
    get: function get() {
      return _subscriptionStatus2.default;
    }
  }], [{
    key: 'subscriptionEvents',
    get: function get() {
      return _subscriptionEvents2.default;
    }
  }, {
    key: 'subscriptionStatus',
    get: function get() {
      return _subscriptionStatus2.default;
    }
  }]);
  return Subscription;
}(_rcModule2.default), (_applyDecoratedDescriptor(_class.prototype, 'init', [_rcModule.initFunction], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'init'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'subscribe', [_proxy.proxify], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'subscribe'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'unsubscribe', [_proxy.proxify], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'unsubscribe'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'reset', [_proxy.proxify], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'reset'), _class.prototype)), _class);
exports.default = Subscription;
//# sourceMappingURL=index.js.map
