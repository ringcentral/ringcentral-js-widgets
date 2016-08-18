'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _keyValueMap = require('data-types/key-value-map');

var _keyValueMap2 = _interopRequireDefault(_keyValueMap);

var _utils = require('../../lib/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbols = new _symbolMap2.default(['auth', 'sdk', 'platform', 'subscription', 'filterCache']);

var filterRegex = {
  message: /message-store$/,
  presence: /presence(\?detailedTelephonyState=true)?$/,
  telephony: /presence\?detailedTelephonyState=true$/,
  line: /presence\/line$/,
  linePresence: /presence\/line\/presence(\?detailedTelephonyState=true)?$/,
  lineTelephony: /presence\/line\/presence\?detailedTelephonyState=true$/
};

/**
 * @function
 * @param {Object} message
 * @description Handles messages delivered by the subscripton
 */
function messageHandler(message) {
  var _this = this;

  // determine which events the message falls under
  var events = [];
  if (filterRegex.message.test(message.event)) {
    events.push('message');
  } else if (filterRegex.line.test(message.event)) {
    events.push('line');
  } else if (filterRegex.linePresence.test(message.event)) {
    events.push('linePresence');
    if (filterRegex.lineTelephony.test(message.event)) events.push('lineTelephony');
  } else if (filterRegex.presence.test(message.event)) {
    events.push('presence');
    if (filterRegex.telephony.test(message.event)) events.push('telephony');
  }
  // dispatch the message in redux manner
  this.store.dispatch({
    type: this.actions.notification,
    eventTypes: events,
    payload: message
  });
  // emit the messages as events
  events.forEach(function (event) {
    _utils.emit.call(_this, _subscriptionEvents.subscriptionEventTypes.notification, _subscriptionEvents.subscriptionEvents[event], message);
  });
}
function init() {
  var _this2 = this;

  var platform = this[symbols.platform];
  this[symbols.subscription] = this[symbols.sdk].createSubscription();
  var ownerId = platform.auth().data().owner_id;
  var cacheKey = null;
  if (typeof localStorage !== 'undefined') {
    cacheKey = this.prefix + '-sub-' + ownerId;
    var cachedSubscription = localStorage.getItem(cacheKey);
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
    messageHandler.call(_this2, message);
  });
  this.base.on(this.base.events.removeSuccess, function () {
    _this2.store.dispatch({
      type: _this2.actions.updateStatus,
      status: _subscriptionStatus2.default.notSubscribed,
      subscription: null
    });
    _utils.emit.call(_this2, _subscriptionEvents.subscriptionEventTypes.statusChanged, _this2.status);
  });
  this.base.on(this.base.events.removeError, function () {
    // TODO
  });
  this.base.on(this.base.events.renewSuccess, function () {
    if (cacheKey) {
      localStorage.setItem(cacheKey, (0, _stringify2.default)(_this2.base.subscription()));
    }
    var oldStatus = _this2.status;
    _this2.store.dispatch({
      type: _this2.actions.updateStatus,
      status: _subscriptionStatus2.default.subscribed,
      subscription: _this2.base.subscription()
    });
    if (oldStatus !== _this2.status) {
      _utils.emit.call(_this2, _subscriptionEvents.subscriptionEventTypes.statusChanged, _this2.status);
    }
  });
  this.base.on(this.base.events.renewError, function (error) {
    // TODO handle 429
    _this2.store.dispatch({
      type: _this2.actions.updateStatus,
      status: _subscriptionStatus2.default.notSubscribed,
      subscription: null
    });
    _utils.emit.call(_this2, _subscriptionEvents.subscriptionEventTypes.statusChanged, _this2.status);
    _this2.base.reset().setEventFilters(_this2.filters).register().catch(function (e) {});
  });
  this.base.on(this.base.events.subscribeSuccess, function () {
    if (cacheKey) {
      localStorage.setItem(cacheKey, (0, _stringify2.default)(_this2.base.subscription()));
    }
    _this2.store.dispatch({
      type: _this2.actions.updateStatus,
      status: _subscriptionStatus2.default.subscribed,
      subscription: _this2.base.subscription()
    });
    _utils.emit.call(_this2, _subscriptionEvents.subscriptionEventTypes.statusChanged, _this2.status);
  });
  this.base.on(this.base.events.subscribeError, function (error) {
    // TODO
    // handle 429
    // handle subscription limit
  });

  if (this.filters.length) {
    this.base.register().catch(function () {/* do nothing */});
  }
}

var Subscription = function (_RcModule) {
  (0, _inherits3.default)(Subscription, _RcModule);

  function Subscription(options) {
    var _this4 = this;

    (0, _classCallCheck3.default)(this, Subscription);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Subscription).call(this, (0, _extends3.default)({}, options, {
      actions: _subscriptionActions2.default
    })));

    var auth = options.auth;
    var platform = options.platform;
    var sdk = options.sdk;
    var promiseForStore = options.promiseForStore;

    _this3[symbols.auth] = auth;
    _this3[symbols.platform] = platform;
    _this3[symbols.sdk] = sdk;
    _this3[symbols.subscription] = null;

    // caches filters before redux store is created
    _this3[symbols.filterCache] = [];

    promiseForStore.then(function () {
      // update store with cachedFitlers
      _this3.store.dispatch({
        type: _this3.actions.updateFilters,
        filters: _this3.filters
      });
      _this3[symbols.filterCache] = null;
    });

    auth.on(auth.events.loggedIn, function () {
      init.call(_this3);
    });

    auth.on(auth.events.loggedOut, function () {
      if (_this3.base) {
        _this3.reset();
      }
    });

    auth.addBeforeLogoutHandler((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this3.reset();

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this4);
    })));
    return _this3;
  }

  (0, _createClass3.default)(Subscription, [{
    key: 'subscribe',
    value: function subscribe(event) {
      // TODO normalized error
      if (!_keyValueMap.hasValue.call(_subscriptionEvents.subscriptionEvents, event)) {
        throw new Error('event is not recognized');
      }

      if (this.filters.indexOf(event) === -1) {
        var newFilters = this.filters.slice();
        newFilters.push(event);
        if (this.base) {
          this.base.setEventFilters(newFilters);
          this.store.dispatch({
            type: this.actions.updateFilters,
            filters: newFilters
          });
          this.base.register().catch(function () {/* do nothing */});
        } else {
          this[symbols.filterCache] = newFilters;
        }
      }
    }
  }, {
    key: 'unsubscribe',
    value: function unsubscribe(event) {
      // TODO normalized error
      if (!_keyValueMap2.default.hasValue.call(_subscriptionEvents.subscriptionEvents, event)) {
        throw new Error('event is not recognized');
      }
      var idx = this.filters.indexOf(event);
      if (this.filters.indexOf(event) > -1) {
        var newFilters = this.filters.slice();
        newFilters.splice(idx, 1);
        if (this.base) {
          this.base.setEventFilters(newFilters);
          this.store.dispatch({
            type: this.actions.updateFilters,
            filters: newFilters
          });
          if (newFilters.length) {
            this.base.register().catch(function () {/* do nothing */});
          } else {
            this.base.remove();
          }
        } else {
          this[symbols.filterCache] = newFilters;
        }
      }
    }
  }, {
    key: 'reset',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var oldStatus;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                if (!this.base) {
                  _context2.next = 9;
                  break;
                }

                if (!(this.status === _subscriptionStatus2.default.subscribed)) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 5;
                return this.base.remove();

              case 5:
                _context2.next = 9;
                break;

              case 7:
                _context2.next = 9;
                return this.base.reset();

              case 9:
                _context2.next = 13;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2['catch'](0);

              case 13:
                this[symbols.subscription] = null;
                oldStatus = this.status;

                this.store.dispatch({
                  type: this.actions.updateStatus,
                  status: _subscriptionStatus2.default.notSubscribed,
                  subscription: null
                });
                if (oldStatus !== this.status) {
                  _utils.emit.call(this, _subscriptionEvents.subscriptionEventTypes.statusChanged, this.status);
                }

              case 17:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 11]]);
      }));

      function reset() {
        return _ref2.apply(this, arguments);
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
      return this[symbols.filterCache] || this.state.filters;
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
}(_rcModule2.default);

exports.default = Subscription;
//# sourceMappingURL=index.js.map
