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

var _Pollable2 = require('../Pollable');

var _Pollable3 = _interopRequireDefault(_Pollable2);

var _Enum = require('../Enum');

var _getDataFetcherReducer = require('./getDataFetcherReducer');

var _getDataFetcherReducer2 = _interopRequireDefault(_getDataFetcherReducer);

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

var _actionTypesBase = require('./actionTypesBase');

var _actionTypesBase2 = _interopRequireDefault(_actionTypesBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_TTL = 30 * 60 * 1000;
var DEFAULT_RETRY = 62 * 1000;

var DataFetcher = function (_Pollable) {
  (0, _inherits3.default)(DataFetcher, _Pollable);

  function DataFetcher(_ref) {
    var _this2 = this;

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
        name = _ref.name,
        _ref$actionTypes = _ref.actionTypes,
        actionTypes = _ref$actionTypes === undefined ? (0, _Enum.prefixEnum)({ enumMap: _actionTypesBase2.default, prefix: name }) : _ref$actionTypes,
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
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'client', 'storage', 'subscription', 'tabManager', 'timeToRetry', 'ttl', 'polling', 'name', 'actionTypes', 'getReducer', 'getDataReducer', 'getTimestampReducer', 'dataStorageKey', 'timestampStorageKey', 'fetchFunction', 'subscriptionFilters', 'subscriptionHandler', 'readyCheckFn']);
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

    _this._onStateChange = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(_this._auth.loggedIn && (!_this._storage || _this._storage.ready) && (!_this._readyCheckFn || _this._readyCheckFn()) && (!_this._subscription || _this._subscription.ready) && _this.status === _moduleStatus2.default.pending)) {
                _context.next = 18;
                break;
              }

              _this.store.dispatch({
                type: _this.actionTypes.init
              });

              if (!((!_this._tabManager || _this._tabManager.active) && (_this._auth.isFreshLogin || !_this.timestamp || Date.now() - _this.timestamp > _this.ttl))) {
                _context.next = 13;
                break;
              }

              _context.prev = 3;
              _context.next = 6;
              return _this.fetchData();

            case 6:
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](3);

              console.error('fetchData error:', _context.t0);

            case 11:
              _context.next = 14;
              break;

            case 13:
              if (_this._polling) {
                _this._startPolling();
              } else {
                _this._retry();
              }

            case 14:
              if (_this._subscription && _this._subscriptionFilters) {
                _this._subscription.subscribe(_this._subscriptionFilters);
              }
              _this.store.dispatch({
                type: _this.actionTypes.initSuccess
              });
              _context.next = 19;
              break;

            case 18:
              if ((!_this._auth.loggedIn || _this._storage && !_this._storage.ready || _this._readyCheckFn && !_this._readyCheckFn() || _this._subscription && !_this._subscription.ready) && _this.ready) {
                _this._clearTimeout();
                _this._promise = null;
                _this.store.dispatch({
                  type: _this.actionTypes.resetSuccess
                });
              } else if (_this.ready && _this._subscription && _this._subscription.ready && _this._subscriptionHandler && _this._subscription.message && _this._subscription.message !== _this._lastMessage) {
                _this._lastMessage = _this._subscription.message;
                _this._subscriptionHandler(_this._lastMessage);
              }

            case 19:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[3, 8]]);
    }));

    _this._auth = auth;
    _this._storage = storage;
    _this._client = client;
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
      this.store.subscribe(this._onStateChange);
    }
  }, {
    key: '_fetchData',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var ownerId, data;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.fetch
                });
                ownerId = this._auth.ownerId;
                _context2.prev = 2;
                _context2.next = 5;
                return this._fetchFunction();

              case 5:
                data = _context2.sent;

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
                _context2.next = 16;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2['catch'](2);

                if (!(this._auth.ownerId === ownerId)) {
                  _context2.next = 16;
                  break;
                }

                this._promise = null;
                this.store.dispatch({
                  type: this.actionTypes.fetchError,
                  error: _context2.t0
                });
                if (this._polling) {
                  this._startPolling(this.timeToRetry);
                } else {
                  this._retry();
                }
                throw _context2.t0;

              case 16:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 9]]);
      }));

      function _fetchData() {
        return _ref3.apply(this, arguments);
      }

      return _fetchData;
    }()
  }, {
    key: 'fetchData',
    value: function fetchData() {
      if (!this._promise) {
        this._promise = this._fetchData();
      }
      return this._promise;
    }
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
      return this.state.status === _moduleStatus2.default.ready;
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
  }]);
  return DataFetcher;
}(_Pollable3.default);

exports.default = DataFetcher;
//# sourceMappingURL=index.js.map
