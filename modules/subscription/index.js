'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

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

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _desc, _value, _class;

var _init = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var _this = this;

    var platform, ownerId, cacheKey, cachedSubscription;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!this.base) {
              _context.next = 3;
              break;
            }

            _context.next = 3;
            return this.reset();

          case 3:
            platform = this[symbols.platform];

            this[symbols.subscription] = this[symbols.sdk].createSubscription();
            ownerId = platform.auth().data().owner_id;
            cacheKey = null;

            if (typeof localStorage !== 'undefined') {
              cacheKey = this.prefix + '-sub-' + ownerId;
              cachedSubscription = localStorage.getItem(cacheKey);

              if (cachedSubscription) {
                try {
                  this.base.setSubscription(JSON.parse(cachedSubscription));
                } catch (e) {
                  /* do nothing */
                }
              }
            }
            this.base.setEventFilters(this.filters);
            this.base.on(this.base.events.notification, function (message) {
              messageHandler.call(_this, message);
            });
            this.base.on(this.base.events.removeSuccess, function () {
              _this.store.dispatch({
                type: _this.actions.updateStatus,
                status: _subscriptionStatus2.default.notSubscribed,
                subscription: null
              });
              // this::emit(subscriptionEventTypes.statusChanged, this.status);
            });
            this.base.on(this.base.events.removeError, function () {
              // TODO
            });
            this.base.on(this.base.events.renewSuccess, function () {
              if (cacheKey) {
                localStorage.setItem(cacheKey, (0, _stringify2.default)(_this.base.subscription()));
              }
              // const oldStatus = this.status;
              _this.store.dispatch({
                type: _this.actions.updateStatus,
                status: _subscriptionStatus2.default.subscribed,
                subscription: _this.base.subscription()
              });
            });
            this.base.on(this.base.events.renewError, function (error) {
              // TODO handle 429
              _this.store.dispatch({
                type: _this.actions.updateStatus,
                status: _subscriptionStatus2.default.notSubscribed,
                subscription: null
              });
              _this.base.reset().setEventFilters(_this.filters).register().catch(function (e) {});
            });
            this.base.on(this.base.events.subscribeSuccess, function () {
              if (cacheKey) {
                localStorage.setItem(cacheKey, (0, _stringify2.default)(_this.base.subscription()));
              }
              _this.store.dispatch({
                type: _this.actions.updateStatus,
                status: _subscriptionStatus2.default.subscribed,
                subscription: _this.base.subscription()
              });
            });
            this.base.on(this.base.events.subscribeError, function (error) {
              // TODO
              // handle 429
              // handle subscription limit
            });

            if (!this.filters.length) {
              _context.next = 21;
              break;
            }

            _context.next = 19;
            return this.base.register().catch(function () {/* do nothing */});

          case 19:
            _context.next = 22;
            break;

          case 21:
            this.store.dispatch({
              type: this.actions.updateStatus,
              status: _subscriptionStatus2.default.notSubscribed
            });

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function _init() {
    return _ref.apply(this, arguments);
  };
}();

var _rcModule = require('../../lib/rc-module');

var _rcModule2 = _interopRequireDefault(_rcModule);

var _symbolMap = require('data-types/symbol-map');

var _symbolMap2 = _interopRequireDefault(_symbolMap);

var _subscriptionActions = require('./subscription-actions');

var _subscriptionActions2 = _interopRequireDefault(_subscriptionActions);

var _subscriptionReducer = require('./subscription-reducer');

var _subscriptionReducer2 = _interopRequireDefault(_subscriptionReducer);

var _subscriptionEvents = require('./subscription-events');

var _subscriptionStatus = require('./subscription-status');

var _subscriptionStatus2 = _interopRequireDefault(_subscriptionStatus);

var _utils = require('../../lib/utils');

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

var symbols = new _symbolMap2.default(['auth', 'sdk', 'platform', 'subscription']);

/**
 * @function
 * @param {Object} message
 * @description Handles messages delivered by the subscripton
 */
function messageHandler(message) {
  // dispatch the message in redux manner
  this.store.dispatch({
    type: this.actions.notification,
    message: message
  });
}
var Subscription = (_class = function (_RcModule) {
  (0, _inherits3.default)(Subscription, _RcModule);

  function Subscription(options) {
    (0, _classCallCheck3.default)(this, Subscription);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (Subscription.__proto__ || (0, _getPrototypeOf2.default)(Subscription)).call(this, (0, _extends3.default)({}, options, {
      actions: _subscriptionActions2.default
    })));

    var auth = options.auth;
    var platform = options.platform;
    var sdk = options.sdk;

    _this2[symbols.auth] = auth;
    _this2[symbols.platform] = platform;
    _this2[symbols.sdk] = sdk;
    _this2[symbols.subscription] = null;

    // send events based on state change
    _this2.on('state-change', function (_ref2) {
      var oldState = _ref2.oldState;
      var newState = _ref2.newState;

      if (!oldState || oldState.status !== newState.status) {
        _utils.emit.call(_this2, _this2.eventTypes.statusChanged, newState.status);
      }
      if (newState.lastMessage && (!oldState || newState.lastMessage !== oldState.lastMessage)) {
        _this2.emit(_this2.eventTypes.notification, newState.lastMessage);
      }
    });
    return _this2;
  }

  (0, _createClass3.default)(Subscription, [{
    key: 'init',
    value: function init() {
      var _this3 = this;

      var auth = this[symbols.auth];
      auth.on(auth.events.loggedIn, function () {
        _init.call(_this3);
      });

      auth.on(auth.events.loggedOut, function () {
        if (_this3.base) {
          _this3.reset();
        }
      });

      auth.addBeforeLogoutHandler((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this3.reset();

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this3);
      })));
    }
  }, {
    key: 'subscribe',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(event) {
        var newFilters;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.filters.indexOf(event) === -1)) {
                  _context3.next = 8;
                  break;
                }

                newFilters = this.filters.slice();

                newFilters.push(event);
                this.store.dispatch({
                  type: this.actions.updateFilters,
                  filters: newFilters
                });

                if (!this.base) {
                  _context3.next = 8;
                  break;
                }

                this.base.setEventFilters(newFilters);
                _context3.next = 8;
                return this.base.register().catch(function () {/* do nothing */});

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function subscribe(_x) {
        return _ref4.apply(this, arguments);
      }

      return subscribe;
    }()
  }, {
    key: 'unsubscribe',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(event) {
        var idx, newFilters;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                idx = this.filters.indexOf(event);

                if (this.filters.indexOf(event) > -1) {
                  newFilters = this.filters.slice();

                  newFilters.splice(idx, 1);
                  this.store.dispatch({
                    type: this.actions.updateFilters,
                    filters: newFilters
                  });
                  if (this.base) {
                    this.base.setEventFilters(newFilters);
                    if (newFilters.length) {
                      this.base.register().catch(function () {/* do nothing */});
                    } else {
                      this.base.remove();
                    }
                  }
                }

              case 2:
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
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;

                if (!this.base) {
                  _context5.next = 9;
                  break;
                }

                if (!(this.status === _subscriptionStatus2.default.subscribed)) {
                  _context5.next = 7;
                  break;
                }

                _context5.next = 5;
                return this.base.remove();

              case 5:
                _context5.next = 9;
                break;

              case 7:
                _context5.next = 9;
                return this.base.reset();

              case 9:
                _context5.next = 13;
                break;

              case 11:
                _context5.prev = 11;
                _context5.t0 = _context5['catch'](0);

              case 13:
                this[symbols.subscription] = null;
                this.store.dispatch({
                  type: this.actions.reset
                });

              case 15:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 11]]);
      }));

      function reset() {
        return _ref6.apply(this, arguments);
      }

      return reset;
    }()
  }, {
    key: 'reducer',
    get: function get() {
      return (0, _subscriptionReducer2.default)(this.prefix);
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
    key: 'events',
    get: function get() {
      return _subscriptionEvents.subscriptionEvents;
    }
  }, {
    key: 'eventTypes',
    get: function get() {
      return _subscriptionEvents.subscriptionEventTypes;
    }
  }]);
  return Subscription;
}(_rcModule2.default), (_applyDecoratedDescriptor(_class.prototype, 'init', [_rcModule.initFunction], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'init'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'subscribe', [_proxy.proxify], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'subscribe'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'unsubscribe', [_proxy.proxify], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'unsubscribe'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'reset', [_proxy.proxify], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'reset'), _class.prototype)), _class);
exports.default = Subscription;
//# sourceMappingURL=index.js.map
