'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

require('core-js/fn/array/every');

var _RcModule2 = require('../RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _Enum = require('../Enum');

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

var _actionTypesBase = require('./actionTypesBase');

var _actionTypesBase2 = _interopRequireDefault(_actionTypesBase);

var _getMatcherReducer = require('./getMatcherReducer');

var _getMatcherReducer2 = _interopRequireDefault(_getMatcherReducer);

var _getCacheReducer = require('./getCacheReducer');

var _getCacheReducer2 = _interopRequireDefault(_getCacheReducer);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkName(name) {
  if (!name) {
    throw new Error('DataMatcher: "name" is required.');
  }
  if (typeof name !== 'string') {
    throw new Error('DataMatcher: "name" must be a string.');
  }
}

var DEFAULT_TTL = 30 * 60 * 1000;
var DEFAULT_NO_MATCHER_TTL = 30 * 1000;

var DataMatcher = function (_RcModule) {
  (0, _inherits3.default)(DataMatcher, _RcModule);

  function DataMatcher(_ref) {
    var name = _ref.name,
        auth = _ref.auth,
        storage = _ref.storage,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? DEFAULT_TTL : _ref$ttl,
        _ref$noMatchTtl = _ref.noMatchTtl,
        noMatchTtl = _ref$noMatchTtl === undefined ? DEFAULT_NO_MATCHER_TTL : _ref$noMatchTtl,
        _ref$actionTypes = _ref.actionTypes,
        actionTypes = _ref$actionTypes === undefined ? (0, _Enum.prefixEnum)({ enumMap: _actionTypesBase2.default, prefix: name }) : _ref$actionTypes,
        _ref$storageKey = _ref.storageKey,
        storageKey = _ref$storageKey === undefined ? name + 'Data' : _ref$storageKey,
        _ref$getReducer = _ref.getReducer,
        getReducer = _ref$getReducer === undefined ? _getMatcherReducer2.default : _ref$getReducer,
        _ref$getDataReducer = _ref.getDataReducer,
        getDataReducer = _ref$getDataReducer === undefined ? _getCacheReducer2.default : _ref$getDataReducer,
        options = (0, _objectWithoutProperties3.default)(_ref, ['name', 'auth', 'storage', 'ttl', 'noMatchTtl', 'actionTypes', 'storageKey', 'getReducer', 'getDataReducer']);
    (0, _classCallCheck3.default)(this, DataMatcher);

    checkName(name);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DataMatcher.__proto__ || (0, _getPrototypeOf2.default)(DataMatcher)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: actionTypes
    })));

    _this._querySources = new _map2.default();
    _this._searchSource = {};

    _this._auth = auth;
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
        cache: getDataReducer(_this.actionTypes)
      });
    }
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
    key: '_onStateChange',
    value: function _onStateChange() {
      if (this._shouldInit()) {
        this._initModuleStatus();
        this.triggerMatch();
      } else if (this._shouldReset()) {
        this._resetModuleStatus();
      }
    }
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return !this.ready && this._auth.loggedIn && (!this._storage || this._storage.ready) && this._readyCheck();
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return this.ready && (!this._auth.loggedIn || !!this._storage && !this._storage.ready);
    }
  }, {
    key: '_initModuleStatus',
    value: function _initModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
        expiredKeys: this._getExpiredKeys()
      });
    }
  }, {
    key: '_resetModuleStatus',
    value: function _resetModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: '_readyCheck',
    value: function _readyCheck() {
      var _this3 = this;

      return (0, _keys2.default)(this._searchSource).every(function (sourceName) {
        return _this3._searchSource[sourceName].readyCheckFn();
      }) && [].concat((0, _toConsumableArray3.default)(this._querySources.values())).every(function (readyCheckFn) {
        return readyCheckFn();
      });
    }
  }, {
    key: '_getExpiredKeys',
    value: function _getExpiredKeys() {
      var _this4 = this;

      var expiredKeys = [];
      var now = Date.now();
      var matchRecord = this.cache.matchRecord;
      (0, _keys2.default)(matchRecord).forEach(function (key) {
        var ttl = matchRecord[key].result === _helpers.matchResult.notFound ? _this4._noMatchTtl : _this4._ttl;
        if (now - matchRecord[key].timestamp > ttl) {
          expiredKeys.push(key);
        }
      });
      return expiredKeys;
    }
  }, {
    key: 'addSearchSource',
    value: function addSearchSource(_ref2) {
      var sourceName = _ref2.sourceName,
          searchFn = _ref2.searchFn,
          readyCheckFn = _ref2.readyCheckFn;

      if (!sourceName) {
        throw new Error('DataMatcher: "sourceName" is required.');
      }
      if (this._searchSource[sourceName]) {
        throw new Error('DataMatcher: A source named "' + sourceName + '" already exists.');
      }
      if (typeof searchFn !== 'function') {
        throw new Error('DataMatcher: "searchFn" must be a function.');
      }
      if (typeof readyCheckFn !== 'function') {
        throw new Error('DataMatcher: "readyCheckFn" must be a function.');
      }
      this._searchSource[sourceName] = {
        searchFn: searchFn,
        readyCheckFn: readyCheckFn
      };
    }
  }, {
    key: 'addQuerySource',
    value: function addQuerySource(_ref3) {
      var getQueriesFn = _ref3.getQueriesFn,
          readyCheckFn = _ref3.readyCheckFn;

      if (typeof getQueriesFn !== 'function') {
        throw new Error('DataMatcher: "getQueriesFn" must be a function.');
      }
      if (typeof readyCheckFn !== 'function') {
        throw new Error('DataMatcher: "readyCheckFn" must be a function.');
      }
      if (this._querySources.has(getQueriesFn)) {
        throw new Error('DataMatcher: "getQueriesFn" is already added.');
      }
      this._querySources.set(getQueriesFn, readyCheckFn);
    }
  }, {
    key: 'triggerMatch',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var queries;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.ready) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return');

              case 2:
                queries = [];

                this._querySources.forEach(function (_, getQueriesFn) {
                  queries = queries.concat(getQueriesFn());
                });
                queries = [].concat((0, _toConsumableArray3.default)(new _set2.default(queries)));

                if (!queries.length) {
                  _context.next = 8;
                  break;
                }

                _context.next = 8;
                return this.match({ queries: queries });

              case 8:
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
    value: function match(_ref5) {
      var _this5 = this;

      var queries = _ref5.queries,
          _ref5$ignoreCache = _ref5.ignoreCache,
          ignoreCache = _ref5$ignoreCache === undefined ? false : _ref5$ignoreCache;

      return _promise2.default.all((0, _keys2.default)(this._searchSource).map(function (sourceName) {
        return _this5._matchSource({
          sourceName: sourceName,
          queries: [].concat((0, _toConsumableArray3.default)(new _set2.default(queries))), // new Set for making unique
          ignoreCache: ignoreCache
        });
      }));
    }
  }, {
    key: '_filterQueriesFromCache',
    value: function _filterQueriesFromCache(_ref6) {
      var _this6 = this;

      var sourceName = _ref6.sourceName,
          queries = _ref6.queries;

      var now = Date.now();
      return queries.filter(function (query) {
        var cacheKey = (0, _helpers.getCacheKey)(sourceName, query);
        var cache = _this6.cache;
        return !(cache.matchRecord[cacheKey] && now - cache.matchRecord[cacheKey].timestamp < (cache.matchRecord[cacheKey].result === _helpers.matchResult.notFound ? _this6._noMatchTtl : _this6._ttl) || _this6.state.matching.indexOf(cacheKey) !== -1);
      });
    }
  }, {
    key: '_matchSource',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref8) {
        var sourceName = _ref8.sourceName,
            queries = _ref8.queries,
            ignoreCache = _ref8.ignoreCache;
        var filteredQueries, data;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                filteredQueries = ignoreCache ? queries : this._filterQueriesFromCache({ sourceName: sourceName, queries: queries });

                if (!filteredQueries.length) {
                  _context2.next = 13;
                  break;
                }

                this._startMatch({
                  sourceName: sourceName,
                  queries: filteredQueries
                });
                _context2.prev = 3;
                _context2.next = 6;
                return this._searchSource[sourceName].searchFn({
                  queries: filteredQueries
                });

              case 6:
                data = _context2.sent;

                this._finishMatch({
                  sourceName: sourceName,
                  queries: filteredQueries,
                  data: data
                });
                _context2.next = 13;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](3);

                this._onMatchError({
                  sourceName: sourceName,
                  queries: filteredQueries,
                  error: _context2.t0
                });

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 10]]);
      }));

      function _matchSource(_x) {
        return _ref7.apply(this, arguments);
      }

      return _matchSource;
    }()
  }, {
    key: '_startMatch',
    value: function _startMatch(_ref9) {
      var sourceName = _ref9.sourceName,
          queries = _ref9.queries;

      this.store.dispatch({
        type: this.actionTypes.match,
        sourceName: sourceName,
        queries: queries
      });
    }
  }, {
    key: '_finishMatch',
    value: function _finishMatch(_ref10) {
      var sourceName = _ref10.sourceName,
          queries = _ref10.queries,
          data = _ref10.data;

      this.store.dispatch({
        type: this.actionTypes.matchSuccess,
        sourceName: sourceName,
        queries: queries,
        data: data
      });
    }
  }, {
    key: '_onMatchError',
    value: function _onMatchError(_ref11) {
      var sourceName = _ref11.sourceName,
          queries = _ref11.queries,
          error = _ref11.error;

      this.store.dispatch({
        type: this.actionTypes.matchError,
        sourceName: sourceName,
        queries: queries,
        error: error
      });
    }
  }, {
    key: 'matcherStatus',
    get: function get() {
      return this._matcherStatus;
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
    key: 'cache',
    get: function get() {
      return this._storage ? this._storage.getItem(this._storageKey) : this.state.cache;
    }
  }, {
    key: 'dataMapping',
    get: function get() {
      return this.cache && this.cache.dataMap || {};
    }
  }]);
  return DataMatcher;
}(_RcModule3.default);

exports.default = DataMatcher;
//# sourceMappingURL=index.js.map
