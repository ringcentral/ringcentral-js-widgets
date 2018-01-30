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

var _Pollable2 = require('../Pollable');

var _Pollable3 = _interopRequireDefault(_Pollable2);

var _di = require('../di');

var _Enum = require('../Enum');

var _getDataFetcherReducer = require('./getDataFetcherReducer');

var _getDataFetcherReducer2 = _interopRequireDefault(_getDataFetcherReducer);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _baseActionTypes = require('./baseActionTypes');

var _baseActionTypes2 = _interopRequireDefault(_baseActionTypes);

var _proxify = require('../proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _ensureExist = require('../ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

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

var DEFAULT_TTL = 30 * 60 * 1000;
var DEFAULT_RETRY = 62 * 1000;

var DataFetcher = (_dec = (0, _di.Library)({
  deps: ['Auth', 'Client', 'Subscription', { dep: 'TabManager', optional: true }, { dep: 'Storage', optional: true }, { dep: 'DataFetcherOptions', optional: true }]
}), _dec(_class = (_class2 = function (_Pollable) {
  (0, _inherits3.default)(DataFetcher, _Pollable);

  function DataFetcher(_ref) {
    var auth = _ref.auth,
        client = _ref.client,
        storage = _ref.storage,
        subscription = _ref.subscription,
        tabManager = _ref.tabManager,
        _ref$timeToRetry = _ref.timeToRetry,
        timeToRetry = _ref$timeToRetry === undefined ? DEFAULT_RETRY : _ref$timeToRetry,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? DEFAULT_TTL : _ref$ttl,
        _ref$polling = _ref.polling,
        polling = _ref$polling === undefined ? false : _ref$polling,
        _ref$disableCache = _ref.disableCache,
        disableCache = _ref$disableCache === undefined ? false : _ref$disableCache,
        name = _ref.name,
        _ref$actionTypes = _ref.actionTypes,
        actionTypes = _ref$actionTypes === undefined ? (0, _Enum.prefixEnum)({ enumMap: _baseActionTypes2.default, prefix: name }) : _ref$actionTypes,
        _ref$getReducer = _ref.getReducer,
        getReducer = _ref$getReducer === undefined ? _getDataFetcherReducer2.default : _ref$getReducer,
        _ref$getDataReducer = _ref.getDataReducer,
        getDataReducer = _ref$getDataReducer === undefined ? _getDataFetcherReducer.getDefaultDataReducer : _ref$getDataReducer,
        _ref$getTimestampRedu = _ref.getTimestampReducer,
        getTimestampReducer = _ref$getTimestampRedu === undefined ? _getDataFetcherReducer.getDefaultTimestampReducer : _ref$getTimestampRedu,
        _ref$dataStorageKey = _ref.dataStorageKey,
        dataStorageKey = _ref$dataStorageKey === undefined ? name + 'Data' : _ref$dataStorageKey,
        _ref$timestampStorage = _ref.timestampStorageKey,
        timestampStorageKey = _ref$timestampStorage === undefined ? name + 'Timestamp' : _ref$timestampStorage,
        fetchFunction = _ref.fetchFunction,
        subscriptionFilters = _ref.subscriptionFilters,
        subscriptionHandler = _ref.subscriptionHandler,
        readyCheckFn = _ref.readyCheckFn,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'client', 'storage', 'subscription', 'tabManager', 'timeToRetry', 'ttl', 'polling', 'disableCache', 'name', 'actionTypes', 'getReducer', 'getDataReducer', 'getTimestampReducer', 'dataStorageKey', 'timestampStorageKey', 'fetchFunction', 'subscriptionFilters', 'subscriptionHandler', 'readyCheckFn']);
    (0, _classCallCheck3.default)(this, DataFetcher);

    if (!name) {
      throw new Error('name must be defined');
    }
    if (typeof fetchFunction !== 'function') {
      throw new Error('fetchFunction must be a asynchronous function');
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (DataFetcher.__proto__ || (0, _getPrototypeOf2.default)(DataFetcher)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: actionTypes
    })));

    _this._auth = _ensureExist2.default.call(_this, auth, 'auth');
    _this._client = _ensureExist2.default.call(_this, client, 'client');
    if (!disableCache) {
      _this._storage = storage;
    }
    _this._subscription = subscription;
    _this._tabManager = tabManager;
    _this._ttl = ttl;
    _this._timeToRetry = timeToRetry;
    _this._polling = polling;
    _this._fetchFunction = fetchFunction;
    _this._subscriptionFilters = subscriptionFilters;
    _this._subscriptionHandler = subscriptionHandler;
    _this._readyCheckFn = readyCheckFn;

    _this._dataStorageKey = dataStorageKey;
    _this._timestampStorageKey = timestampStorageKey;

    if (_this._storage) {
      _this._reducer = getReducer(_this.actionTypes);

      _this._storage.registerReducer({
        key: _this._dataStorageKey,
        reducer: getDataReducer(_this.actionTypes)
      });
      _this._storage.registerReducer({
        key: _this._timestampStorageKey,
        reducer: getTimestampReducer(_this.actionTypes)
      });
    } else {
      _this._reducer = getReducer(_this.actionTypes, {
        timestamp: getTimestampReducer(_this.actionTypes),
        data: getDataReducer(_this.actionTypes)
      });
    }

    _this._promise = null;
    _this._lastMessage = null;
    return _this;
  }

  (0, _createClass3.default)(DataFetcher, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: '_onStateChange',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._shouldInit()) {
                  _context.next = 10;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.init
                });

                if (!this._hasPermission) {
                  _context.next = 7;
                  break;
                }

                _context.next = 5;
                return this._init();

              case 5:
                _context.next = 8;
                break;

              case 7:
                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });

              case 8:
                _context.next = 11;
                break;

              case 10:
                if (this._isDataReady()) {
                  this.store.dispatch({
                    type: this.actionTypes.initSuccess
                  });
                } else if (this._shouldReset()) {
                  this._clearTimeout();
                  this._promise = null;
                  this.store.dispatch({
                    type: this.actionTypes.resetSuccess
                  });
                } else if (this._shouldSubscribe()) {
                  this._processSubscription();
                }

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _ref2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return !!(this._auth.loggedIn && (!this._storage || this._storage.ready) && (!this._readyCheckFn || this._readyCheckFn()) && (!this._subscription || this._subscription.ready) && (!this._tabManager || this._tabManager.ready) && this.pending);
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return !!((!this._auth.loggedIn || this._storage && !this._storage.ready || this._readyCheckFn && !this._readyCheckFn() || this._subscription && !this._subscription.ready || this._tabManager && !this._tabManager.ready) && this.ready);
    }
  }, {
    key: '_shouldSubscribe',
    value: function _shouldSubscribe() {
      return !!(this.ready && this._subscription && this._subscription.ready && this._subscriptionHandler && this._subscription.message && this._subscription.message !== this._lastMessage);
    }
  }, {
    key: '_shouldFetch',
    value: function _shouldFetch() {
      return (!this._tabManager || this._tabManager.active) && (this._auth.isFreshLogin || !this.timestamp || Date.now() - this.timestamp > this.ttl);
    }
  }, {
    key: '_isDataReady',
    value: function _isDataReady() {
      // only turns ready when data has been fetched
      // (could be from other tabs)
      return this.status === _moduleStatuses2.default.initializing && this.data !== null;
    }
  }, {
    key: '_init',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._shouldFetch()) {
                  _context2.next = 12;
                  break;
                }

                _context2.prev = 1;
                _context2.next = 4;
                return this.fetchData();

              case 4:
                _context2.next = 10;
                break;

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2['catch'](1);

                console.error('fetchData error:', _context2.t0);
                this._retry();

              case 10:
                _context2.next = 13;
                break;

              case 12:
                if (this._polling) {
                  this._startPolling();
                } else {
                  this._retry();
                }

              case 13:
                if (this._subscription && this._subscriptionFilters) {
                  this._subscription.subscribe(this._subscriptionFilters);
                }

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 6]]);
      }));

      function _init() {
        return _ref3.apply(this, arguments);
      }

      return _init;
    }()
  }, {
    key: '_processSubscription',
    value: function _processSubscription() {
      this._lastMessage = this._subscription.message;
      this._subscriptionHandler(this._lastMessage);
    }
  }, {
    key: '_fetchData',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var ownerId, data;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.fetch
                });
                ownerId = this._auth.ownerId;
                _context3.prev = 2;
                _context3.next = 5;
                return this._fetchFunction();

              case 5:
                data = _context3.sent;

                if (this._auth.ownerId === ownerId) {
                  this.store.dispatch({
                    type: this.actionTypes.fetchSuccess,
                    data: data,
                    timestamp: Date.now()
                  });
                  if (this._polling) {
                    this._startPolling();
                  }
                  this._promise = null;
                }
                _context3.next = 16;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3['catch'](2);

                if (!(this._auth.ownerId === ownerId)) {
                  _context3.next = 16;
                  break;
                }

                this._promise = null;
                this.store.dispatch({
                  type: this.actionTypes.fetchError,
                  error: _context3.t0
                });
                if (this._polling) {
                  this._startPolling(this.timeToRetry);
                } else {
                  this._retry();
                }
                throw _context3.t0;

              case 16:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 9]]);
      }));

      function _fetchData() {
        return _ref4.apply(this, arguments);
      }

      return _fetchData;
    }()
  }, {
    key: 'fetchData',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this._promise) {
                  this._promise = this._fetchData();
                }
                return _context4.abrupt('return', this._promise);

              case 2:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function fetchData() {
        return _ref5.apply(this, arguments);
      }

      return fetchData;
    }()
  }, {
    key: 'data',
    get: function get() {
      return this._storage ? this._storage.getItem(this._dataStorageKey) : this.state.data;
    }
  }, {
    key: 'timestamp',
    get: function get() {
      return this._storage ? this._storage.getItem(this._timestampStorageKey) : this.state.timestamp;
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
    key: 'pending',
    get: function get() {
      return this.state.status === _moduleStatuses2.default.pending;
    }
  }, {
    key: 'ttl',
    get: function get() {
      return this._ttl;
    }
  }, {
    key: 'timeToRetry',
    get: function get() {
      return this._timeToRetry;
    }
  }, {
    key: '_hasPermission',
    get: function get() {
      return true;
    }
  }]);
  return DataFetcher;
}(_Pollable3.default), (_applyDecoratedDescriptor(_class2.prototype, '_fetchData', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_fetchData'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'fetchData', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'fetchData'), _class2.prototype)), _class2)) || _class);
exports.default = DataFetcher;
//# sourceMappingURL=index.js.map
