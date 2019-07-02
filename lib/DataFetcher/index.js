"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.date.now");

require("regenerator-runtime/runtime");

var _redux = require("redux");

var _Pollable2 = _interopRequireDefault(require("../Pollable"));

var _di = require("../di");

var _getDataFetcherReducer = require("./getDataFetcherReducer");

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _proxify = _interopRequireDefault(require("../proxy/proxify"));

var _ensureExist = _interopRequireDefault(require("../ensureExist"));

var _Enum = _interopRequireDefault(require("../Enum"));

var _moduleActionTypes = require("../../enums/moduleActionTypes");

var _actionTypeGenerator = require("../actionTypeGenerator");

var _dec, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var DEFAULT_TTL = 30 * 60 * 1000;
var DEFAULT_RETRY = 62 * 1000;
var RETRY_INTERVALS = [2 * 1000, 5 * 1000, 10 * 1000, 30 * 1000];
var DataFetcher = (_dec = (0, _di.Library)({
  deps: ['Auth', 'Client', 'Subscription', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'Storage',
    optional: true
  }, {
    dep: 'DataFetcherOptions',
    optional: true
  }]
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Pollable) {
  _inherits(DataFetcher, _Pollable);

  function DataFetcher(_ref) {
    var _context;

    var _this;

    var auth = _ref.auth,
        client = _ref.client,
        storage = _ref.storage,
        subscription = _ref.subscription,
        tabManager = _ref.tabManager,
        _ref$timeToRetry = _ref.timeToRetry,
        timeToRetry = _ref$timeToRetry === void 0 ? DEFAULT_RETRY : _ref$timeToRetry,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === void 0 ? DEFAULT_TTL : _ref$ttl,
        _ref$pollingInterval = _ref.pollingInterval,
        pollingInterval = _ref$pollingInterval === void 0 ? ttl : _ref$pollingInterval,
        _ref$polling = _ref.polling,
        polling = _ref$polling === void 0 ? false : _ref$polling,
        _ref$disableCache = _ref.disableCache,
        disableCache = _ref$disableCache === void 0 ? false : _ref$disableCache,
        _ref$cleanOnReset = _ref.cleanOnReset,
        cleanOnReset = _ref$cleanOnReset === void 0 ? false : _ref$cleanOnReset,
        _ref$getReducer = _ref.getReducer,
        getReducer = _ref$getReducer === void 0 ? _getDataFetcherReducer.getDataFetcherReducer : _ref$getReducer,
        _ref$getDataReducer = _ref.getDataReducer,
        getDataReducer = _ref$getDataReducer === void 0 ? (0, _getDataFetcherReducer.createGetDataReducer)(cleanOnReset) : _ref$getDataReducer,
        _ref$getTimestampRedu = _ref.getTimestampReducer,
        getTimestampReducer = _ref$getTimestampRedu === void 0 ? (0, _getDataFetcherReducer.createGetTimestampReducer)(cleanOnReset) : _ref$getTimestampRedu,
        fetchFunction = _ref.fetchFunction,
        forbiddenHandler = _ref.forbiddenHandler,
        subscriptionFilters = _ref.subscriptionFilters,
        subscriptionHandler = _ref.subscriptionHandler,
        readyCheckFn = _ref.readyCheckFn,
        options = _objectWithoutProperties(_ref, ["auth", "client", "storage", "subscription", "tabManager", "timeToRetry", "ttl", "pollingInterval", "polling", "disableCache", "cleanOnReset", "getReducer", "getDataReducer", "getTimestampReducer", "fetchFunction", "forbiddenHandler", "subscriptionFilters", "subscriptionHandler", "readyCheckFn"]);

    _classCallCheck(this, DataFetcher);

    if (typeof fetchFunction !== 'function') {
      throw new Error('fetchFunction must be a asynchronous function');
    }

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DataFetcher).call(this, _objectSpread({}, options)));
    _this._auth = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, auth, 'auth');
    _this._client = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, client, 'client');
    _this._disableCache = disableCache;
    _this._storage = storage;
    _this._subscription = subscription;
    _this._tabManager = tabManager;
    _this._ttl = ttl;
    _this._timeToRetry = timeToRetry;
    _this._polling = polling;
    _this._pollingInterval = pollingInterval;
    _this._fetchFunction = fetchFunction;
    _this._forbiddenHandler = forbiddenHandler;
    _this._subscriptionFilters = subscriptionFilters;
    _this._subscriptionHandler = subscriptionHandler;
    _this._readyCheckFn = readyCheckFn;
    _this._storageKey = "".concat(_this._name, "-data"); // differentiate from old key

    if (!_this._disableCache && _this._storage) {
      _this._reducer = getReducer(_this.actionTypes);

      _this._storage.registerReducer({
        key: _this._storageKey,
        reducer: (0, _redux.combineReducers)({
          data: getDataReducer(_this.actionTypes),
          timestamp: getTimestampReducer(_this.actionTypes)
        })
      });
    } else {
      _this._reducer = getReducer(_this.actionTypes, {
        data: getDataReducer(_this.actionTypes),
        timestamp: getTimestampReducer(_this.actionTypes)
      });
    }

    _this._promise = null;
    _this._lastMessage = null;
    return _this;
  }

  _createClass(DataFetcher, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "_onStateChange",
    value: function () {
      var _onStateChange2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._shouldInit()) {
                  _context2.next = 10;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.init
                });

                if (!this._hasPermission) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 5;
                return this._init();

              case 5:
                _context2.next = 8;
                break;

              case 7:
                this.store.dispatch({
                  type: this.actionTypes.initSuccess,
                  hasPermission: false
                });

              case 8:
                _context2.next = 11;
                break;

              case 10:
                if (this._isDataReady()) {
                  this.store.dispatch({
                    type: this.actionTypes.initSuccess,
                    hasPermission: this._hasPermission
                  });
                } else if (this._shouldReset()) {
                  this._clearTimeout();

                  this._promise = null;
                  this.store.dispatch({
                    type: this.actionTypes.resetSuccess
                  });
                } else if (this._shouldHandleSubscriptionMessage()) {
                  this._processSubscription();
                }

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _onStateChange2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(this._auth.loggedIn && (!this._storage || this._storage.ready) && (!this._readyCheckFn || this._readyCheckFn()) && (!this._subscription || this._subscription.ready) && (!this._tabManager || this._tabManager.ready) && this.pending);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!((!this._auth.loggedIn || this._storage && !this._storage.ready || this._readyCheckFn && !this._readyCheckFn() || this._subscription && !this._subscription.ready || this._tabManager && !this._tabManager.ready) && !this.pending);
    }
  }, {
    key: "_shouldHandleSubscriptionMessage",
    value: function _shouldHandleSubscriptionMessage() {
      return !!(this.ready && this._subscription && this._subscription.ready && this._subscriptionHandler && this._subscription.message && this._subscription.message !== this._lastMessage);
    }
  }, {
    key: "_shouldFetch",
    value: function _shouldFetch() {
      return (!this._tabManager || this._tabManager.active) && (this._auth.isFreshLogin || !this.timestamp || Date.now() - this.timestamp > this.ttl);
    }
  }, {
    key: "_isDataReady",
    value: function _isDataReady() {
      // only turns ready when data has been fetched
      // (could be from other tabs)
      return this.status === _moduleStatuses["default"].initializing && this.data !== null && this.timestamp !== null;
    }
  }, {
    key: "_init",
    value: function () {
      var _init2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this._subscription && this._subscriptionFilters) {
                  this._subscription.subscribe(this._subscriptionFilters);
                }

                if (!this._shouldFetch()) {
                  _context3.next = 13;
                  break;
                }

                _context3.prev = 2;
                _context3.next = 5;
                return this.fetchData();

              case 5:
                _context3.next = 11;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](2);
                console.error('fetchData error:', _context3.t0);

                this._retry();

              case 11:
                _context3.next = 14;
                break;

              case 13:
                if (this._polling) {
                  this._startPolling();
                } else {
                  this._retry();
                }

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee2, this, [[2, 7]]);
      }));

      function _init() {
        return _init2.apply(this, arguments);
      }

      return _init;
    }()
  }, {
    key: "_processSubscription",
    value: function _processSubscription() {
      this._lastMessage = this._subscription.message;

      this._subscriptionHandler(this._lastMessage);
    }
  }, {
    key: "_fetchWithForbiddenCheck",
    // handle 403 Forbidden error
    value: function () {
      var _fetchWithForbiddenCheck2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var data, result;
        return regeneratorRuntime.wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this._fetchFunction();

              case 3:
                data = _context4.sent;
                return _context4.abrupt("return", data);

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);

                if (!(_context4.t0 && _context4.t0.apiResponse && _context4.t0.apiResponse._response && _context4.t0.apiResponse._response.status === 403 && typeof this._forbiddenHandler === 'function')) {
                  _context4.next = 14;
                  break;
                }

                _context4.next = 12;
                return this._forbiddenHandler(_context4.t0);

              case 12:
                result = _context4.sent;
                return _context4.abrupt("return", result);

              case 14:
                throw _context4.t0;

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));

      function _fetchWithForbiddenCheck() {
        return _fetchWithForbiddenCheck2.apply(this, arguments);
      }

      return _fetchWithForbiddenCheck;
    }()
  }, {
    key: "_fetchData",
    value: function () {
      var _fetchData2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var ownerId, data;
        return regeneratorRuntime.wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.fetch
                });
                ownerId = this._auth.ownerId;
                _context5.prev = 2;
                _context5.next = 5;
                return this._fetchWithForbiddenCheck();

              case 5:
                data = _context5.sent;

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

                _context5.next = 16;
                break;

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5["catch"](2);

                if (!(this._auth.ownerId === ownerId)) {
                  _context5.next = 16;
                  break;
                }

                this._promise = null;
                this.store.dispatch({
                  type: this.actionTypes.fetchError,
                  error: _context5.t0
                });

                if (this._polling) {
                  this._startPolling(this.timeToRetry);
                } else {
                  this._retry();
                }

                throw _context5.t0;

              case 16:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee4, this, [[2, 9]]);
      }));

      function _fetchData() {
        return _fetchData2.apply(this, arguments);
      }

      return _fetchData;
    }()
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this._promise) {
                  this._promise = this._fetchData();
                }

                return _context6.abrupt("return", this._promise);

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee5, this);
      }));

      function fetchData() {
        return _fetchData3.apply(this, arguments);
      }

      return fetchData;
    }()
  }, {
    key: "_retry",
    value: function _retry() {
      var _this3 = this;

      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timeToRetry;

      this._clearTimeout();

      this._timeoutId = setTimeout(function () {
        if (_this3.status === _moduleStatuses["default"].initializing) {
          _this3.store.dispatch({
            type: _this3.actionTypes.retry
          });
        }

        _this3._timeoutId = null;

        if (!_this3.timestamp || Date.now() - _this3.timestamp > _this3.ttl) {
          if (!_this3._tabManager || _this3._tabManager.active) {
            _this3.fetchData();
          } else {
            // continue retry checks in case tab becomes main tab
            _this3._retry();
          }
        }
      }, t);
    }
  }, {
    key: "_name",
    get: function get() {
      throw new Error("".concat(this.constructor.name, "::_name must be defined"));
    }
  }, {
    key: "_actionTypes",
    get: function get() {
      return new _Enum["default"]([].concat(_toConsumableArray(Object.keys(_moduleActionTypes.moduleActionTypes)), _toConsumableArray((0, _actionTypeGenerator.actionTypeGenerator)('fetch')), ['retry']), this._name);
    }
  }, {
    key: "data",
    get: function get() {
      if (!this._disableCache && this._storage) {
        return this._storage.getItem(this._storageKey) && this._storage.getItem(this._storageKey).data || null;
      }

      return this.state.data;
    }
  }, {
    key: "timestamp",
    get: function get() {
      if (!this._disableCache && this._storage) {
        return this._storage.getItem(this._storageKey) && this._storage.getItem(this._storageKey).timestamp || null;
      }

      return this.state.timestamp;
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.state.status === _moduleStatuses["default"].ready;
    }
  }, {
    key: "pending",
    get: function get() {
      return this.state.status === _moduleStatuses["default"].pending;
    }
  }, {
    key: "ttl",
    get: function get() {
      return this._ttl;
    }
  }, {
    key: "pollingInterval",
    get: function get() {
      return this._pollingInterval;
    }
  }, {
    key: "retryCount",
    get: function get() {
      return this.state.retryCount;
    }
  }, {
    key: "timeToRetry",
    get: function get() {
      if (this.status === _moduleStatuses["default"].initializing) {
        return RETRY_INTERVALS[this.retryCount] || this._timeToRetry;
      }

      return this._timeToRetry;
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      return true;
    }
  }]);

  return DataFetcher;
}(_Pollable2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "_fetchData", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_fetchData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchData", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchData"), _class2.prototype)), _class2)) || _class);
exports["default"] = DataFetcher;
//# sourceMappingURL=index.js.map
