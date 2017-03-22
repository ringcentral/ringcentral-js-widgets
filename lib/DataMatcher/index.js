'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

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

exports.checkName = checkName;
exports.getQueryKey = getQueryKey;

require('core-js/fn/array/every');

var _RcModule2 = require('../RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _Enum = require('../Enum');

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _baseActionTypes = require('./baseActionTypes');

var _baseActionTypes2 = _interopRequireDefault(_baseActionTypes);

var _getDefaultReducer = require('./getDefaultReducer');

var _getDefaultReducer2 = _interopRequireDefault(_getDefaultReducer);

var _getDefaultDataReducer = require('./getDefaultDataReducer');

var _getDefaultDataReducer2 = _interopRequireDefault(_getDefaultDataReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkName(name) {
  if (!name) {
    throw new Error('DataMatcher: "name" is required.');
  }
  if (typeof name !== 'string') {
    throw new Error('DataMatcher: "name" must be a string.');
  }
}

function getQueryKey(name, query) {
  return name + '-' + query;
}

var DEFAULT_TTL = 30 * 1000;
var DEFAULT_NO_MATCH_TTL = 30 * 1000;

var DataMatcher = function (_RcModule) {
  (0, _inherits3.default)(DataMatcher, _RcModule);

  function DataMatcher() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var name = _ref.name,
        storage = _ref.storage,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? DEFAULT_TTL : _ref$ttl,
        _ref$noMatchTtl = _ref.noMatchTtl,
        noMatchTtl = _ref$noMatchTtl === undefined ? DEFAULT_NO_MATCH_TTL : _ref$noMatchTtl,
        _ref$actionTypes = _ref.actionTypes,
        actionTypes = _ref$actionTypes === undefined ? (0, _Enum.prefixEnum)({ base: _baseActionTypes2.default, prefix: name }) : _ref$actionTypes,
        _ref$storageKey = _ref.storageKey,
        storageKey = _ref$storageKey === undefined ? name + 'Data' : _ref$storageKey,
        _ref$getReducer = _ref.getReducer,
        getReducer = _ref$getReducer === undefined ? _getDefaultReducer2.default : _ref$getReducer,
        _ref$getDataReducer = _ref.getDataReducer,
        getDataReducer = _ref$getDataReducer === undefined ? _getDefaultDataReducer2.default : _ref$getDataReducer,
        options = (0, _objectWithoutProperties3.default)(_ref, ['name', 'storage', 'ttl', 'noMatchTtl', 'actionTypes', 'storageKey', 'getReducer', 'getDataReducer']);
    (0, _classCallCheck3.default)(this, DataMatcher);

    checkName(name);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DataMatcher.__proto__ || (0, _getPrototypeOf2.default)(DataMatcher)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: actionTypes
    })));

    _this._querySources = new _map2.default();
    _this._searchProviders = new _map2.default();
    _this._matchPromises = new _map2.default();
    _this._storage = storage;
    _this._ttl = ttl;
    _this._noMatchTtl = noMatchTtl;

    _this._storageKey = storageKey;

    if (_this._storage) {
      _this._reducer = getReducer(_this.actionTypes);
      _this._storage.registerReducer({
        key: _this._storageKey,
        reducer: getDataReducer(_this.actionTypes)
      });
    } else {
      _this._reducer = getReducer(_this.actionTypes, {
        data: getDataReducer(_this.actionTypes)
      });
    }

    _this.addSelector('data', function () {
      return _this._storage ? _this._storage.getItem(_this._storageKey) : _this.state.data;
    }, function (data) {
      return data || {};
    });

    _this.addSelector('dataMapping', _this._selectors.data, function (data) {
      var dataMap = {};
      (0, _keys2.default)(data).forEach(function (query) {
        var queryResult = data[query];
        if (!queryResult) {
          return;
        }
        var matchesList = [];
        _this._searchProviders.forEach(function (_providerValue, providerName) {
          if (queryResult[providerName] && queryResult[providerName].data.length > 0) {
            matchesList = matchesList.concat(queryResult[providerName].data);
          }
        });
        if (matchesList.length > 0) {
          dataMap[query] = matchesList;
        }
      });
      return dataMap;
    });
    _this._requestCounter = 0;
    return _this;
  }

  (0, _createClass3.default)(DataMatcher, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: '_getQueries',
    value: function _getQueries() {
      var output = new _set2.default();
      this._querySources.forEach(function (readyCheckFn, getQueriesFn) {
        if (readyCheckFn()) {
          getQueriesFn().forEach(function (query) {
            output.add(query);
          });
        }
      });
      return [].concat((0, _toConsumableArray3.default)(output));
    }
  }, {
    key: '_cleanUp',
    value: function _cleanUp() {
      this.store.dispatch({
        type: this.actionTypes.cleanUp,
        queries: this._getQueries(),
        timestamp: Date.now(),
        ttl: this._ttl
      });
    }
  }, {
    key: '_onStateChange',
    value: function _onStateChange() {
      if (this._shouldInit()) {
        this.store.dispatch({
          type: this.actionTypes.init
        });
        this._cleanUp();
        this.store.dispatch({
          type: this.actionTypes.initSuccess
        });
      } else if (this._shouldReset()) {
        this.store.dispatch({
          type: this.actionTypes.reset
        });
        this.store.dispatch({
          type: this.actionTypes.resetSuccess
        });
      }
    }
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return !!(this.pending && (!this._storage || this._storage.ready) && this.searchProvidersReady);
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return !!(this.ready && (!!this._storage && !this._storage.ready || !this.searchProvidersReady));
    }
  }, {
    key: 'addSearchProvider',
    value: function addSearchProvider(_ref2) {
      var name = _ref2.name,
          searchFn = _ref2.searchFn,
          readyCheckFn = _ref2.readyCheckFn;

      if (!name) {
        throw new Error(this.constructor.name + ': "name" is required.');
      }
      if (this._searchProviders.has(name)) {
        throw new Error(this.constructor.name + ': A provider named "' + name + '" already exists.');
      }
      if (typeof searchFn !== 'function') {
        throw new Error(this.constructor.name + ': "searchFn" must be a function.');
      }
      if (typeof readyCheckFn !== 'function') {
        throw new Error(this.constructor.name + ': "readyCheckFn" must be a function.');
      }
      this._searchProviders.set(name, {
        searchFn: searchFn,
        readyCheckFn: readyCheckFn
      });
    }
  }, {
    key: 'addQuerySource',
    value: function addQuerySource(_ref3) {
      var getQueriesFn = _ref3.getQueriesFn,
          readyCheckFn = _ref3.readyCheckFn;

      if (typeof getQueriesFn !== 'function') {
        throw new Error(this.constructor.name + ': "getQueriesFn" must be a function.');
      }
      if (typeof readyCheckFn !== 'function') {
        throw new Error(this.constructor.name + ': "readyCheckFn" must be a function.');
      }
      if (this._querySources.has(getQueriesFn)) {
        throw new Error(this.constructor.name + ': this getQueryFn has already been added.');
      }
      this._querySources.set(getQueriesFn, readyCheckFn);
    }
  }, {
    key: 'triggerMatch',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.ready) {
                  _context.next = 4;
                  break;
                }

                this._cleanUp();
                _context.next = 4;
                return this.match({
                  queries: this._getQueries()
                });

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function triggerMatch() {
        return _ref4.apply(this, arguments);
      }

      return triggerMatch;
    }()
  }, {
    key: 'match',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref6) {
        var _this3 = this;

        var queries = _ref6.queries,
            _ref6$ignoreCache = _ref6.ignoreCache,
            ignoreCache = _ref6$ignoreCache === undefined ? false : _ref6$ignoreCache;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _promise2.default.all([].concat((0, _toConsumableArray3.default)(this._searchProviders.keys())).map(function (name) {
                  return _this3._matchSource({
                    name: name,
                    queries: queries,
                    ignoreCache: ignoreCache
                  });
                }));

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function match(_x2) {
        return _ref5.apply(this, arguments);
      }

      return match;
    }()
  }, {
    key: '_fetchMatchResult',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref8) {
        var _this4 = this;

        var name = _ref8.name,
            queries = _ref8.queries;
        var requestId, provider, promise, data;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                requestId = this._requestCounter;

                this._requestCounter += 1;
                _context3.prev = 2;

                this.store.dispatch({
                  type: this.actionTypes.match,
                  queries: queries,
                  name: name
                });
                provider = this._searchProviders.get(name);

                if (provider) {
                  _context3.next = 7;
                  break;
                }

                throw new Error(this.constructor.name + ': provider named "' + name + ' does not exist');

              case 7:
                promise = provider.searchFn({
                  queries: queries
                });

                queries.forEach(function (query) {
                  // cache the promise
                  var queryKey = getQueryKey(name, query);
                  _this4._matchPromises.set(queryKey, {
                    promise: promise,
                    requestId: requestId
                  });
                });
                _context3.next = 11;
                return promise;

              case 11:
                data = _context3.sent;

                queries.forEach(function (query) {
                  // clear the cached promise
                  var queryKey = getQueryKey(name, query);
                  if (_this4._matchPromises.get(queryKey) && _this4._matchPromises.get(queryKey).requestId === requestId) {
                    _this4._matchPromises.delete(queryKey);
                  }
                });
                this.store.dispatch({
                  type: this.actionTypes.matchSuccess,
                  name: name,
                  queries: queries,
                  data: data,
                  timestamp: Date.now()
                });
                _context3.next = 21;
                break;

              case 16:
                _context3.prev = 16;
                _context3.t0 = _context3['catch'](2);

                queries.forEach(function (query) {
                  // clear the cached promise
                  var queryKey = getQueryKey(name, query);
                  if (_this4._matchPromises.get(queryKey) && _this4._matchPromises.get(queryKey).requestId === requestId) {
                    _this4._matchPromises.delete(queryKey);
                  }
                });
                this.store.dispatch({
                  type: this.actionTypes.matchError,
                  name: name,
                  queries: queries,
                  error: _context3.t0,
                  timestamp: Date.now()
                });
                throw _context3.t0;

              case 21:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 16]]);
      }));

      function _fetchMatchResult(_x3) {
        return _ref7.apply(this, arguments);
      }

      return _fetchMatchResult;
    }()
  }, {
    key: '_matchSource',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref10) {
        var _this5 = this;

        var name = _ref10.name,
            queries = _ref10.queries,
            ignoreCache = _ref10.ignoreCache;
        var now, promises, filteredQueries, data;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                now = Date.now();
                promises = [];
                filteredQueries = [];
                data = this.data;

                queries.forEach(function (query) {
                  var queryKey = getQueryKey(name, query);
                  if (_this5._matchPromises.has(queryKey)) {
                    promises.push(_this5._matchPromises.get(queryKey));
                  } else if (ignoreCache || !data[query] || !data[query][name] || now - data[query][name]._t > _this5._noMatchTtl) {
                    filteredQueries.push(query);
                  }
                });
                if (filteredQueries.length) {
                  promises.push(this._fetchMatchResult({
                    name: name,
                    queries: queries
                  }));
                }

                if (!promises.length) {
                  _context4.next = 9;
                  break;
                }

                _context4.next = 9;
                return _promise2.default.all(promises);

              case 9:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _matchSource(_x4) {
        return _ref9.apply(this, arguments);
      }

      return _matchSource;
    }()
  }, {
    key: 'searchProvidersReady',
    get: function get() {
      return [].concat((0, _toConsumableArray3.default)(this._searchProviders.values())).every(function (_ref11) {
        var readyCheckFn = _ref11.readyCheckFn;
        return readyCheckFn();
      });
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
    key: 'data',
    get: function get() {
      return this._selectors.data();
    }
  }, {
    key: 'dataMapping',
    get: function get() {
      return this._selectors.dataMapping();
    }
  }]);
  return DataMatcher;
}(_RcModule3.default);

exports.default = DataMatcher;
//# sourceMappingURL=index.js.map
