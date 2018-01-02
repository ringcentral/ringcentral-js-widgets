'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DefaultMinimalSearchLength = exports.AllContactSourceName = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _dec, _class, _desc, _value, _class2;

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../../lib/di');

var _loginStatus = require('../../modules/Auth/loginStatus');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _debounce = require('../../lib/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getContactSearchReducer = require('./getContactSearchReducer');

var _getContactSearchReducer2 = _interopRequireDefault(_getContactSearchReducer);

var _getCacheReducer = require('./getCacheReducer');

var _getCacheReducer2 = _interopRequireDefault(_getCacheReducer);

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

var AllContactSourceName = exports.AllContactSourceName = 'all';
var DefaultMinimalSearchLength = exports.DefaultMinimalSearchLength = 3;

/**
 * @class
 * @description Contact search module
 */
var ContactSearch = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Storage', { dep: 'ContactSearchOptions', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(ContactSearch, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   * @param {Storage} params.storage - storage module instance
   * @param {String} params.storageKey - storage key for storage module default "contactSearchCache"
   * @param {Number} params.minimalSearchLength - minimal search text length, default 3 characters
   * @param {Number} params.ttl - timestamp of local cache, default 5 mins
   */
  function ContactSearch(_ref) {
    var auth = _ref.auth,
        storage = _ref.storage,
        _ref$storageKey = _ref.storageKey,
        storageKey = _ref$storageKey === undefined ? 'contactSearchCache' : _ref$storageKey,
        _ref$minimalSearchLen = _ref.minimalSearchLength,
        minimalSearchLength = _ref$minimalSearchLen === undefined ? DefaultMinimalSearchLength : _ref$minimalSearchLen,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? 5 * 60 * 1000 : _ref$ttl,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'storage', 'storageKey', 'minimalSearchLength', 'ttl']);
    (0, _classCallCheck3.default)(this, ContactSearch);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ContactSearch.__proto__ || (0, _getPrototypeOf2.default)(ContactSearch)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this.debouncedSearch = (0, _debounce2.default)(_this.search, 800, true);

    _this._auth = auth;
    _this._storage = storage;
    _this._storageKey = storageKey;
    _this._minimalSearchLength = minimalSearchLength;
    _this._ttl = ttl;
    _this._searchSources = new _map2.default();
    _this._searchSourcesFormat = new _map2.default();
    _this._searchSourcesCheck = new _map2.default();
    _this._searchIds = {};
    if (_this._storage) {
      _this._reducer = (0, _getContactSearchReducer2.default)(_this.actionTypes);
      _this._storage.registerReducer({
        key: _this._storageKey,
        reducer: (0, _getCacheReducer2.default)(_this.actionTypes)
      });
    } else {
      _this._reducer = (0, _getContactSearchReducer2.default)(_this.actionTypes, {
        cache: (0, _getCacheReducer2.default)(_this.actionTypes)
      });
    }
    return _this;
  }

  (0, _createClass3.default)(ContactSearch, [{
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
      } else if (this._shouldReset()) {
        this._resetModuleStatus();
        this._clearStateCache();
      }
    }
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return this._auth.loginStatus === _loginStatus2.default.loggedIn && (!this._storage || this._storage.ready) && this._readyCheck() && !this.ready;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return (this._auth.loginStatus !== _loginStatus2.default.loggedIn || this._storage && !this._storage.ready) && this.ready;
    }
  }, {
    key: '_initModuleStatus',
    value: function _initModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.initSuccess
      });
    }
  }, {
    key: '_clearStateCache',
    value: function _clearStateCache() {
      this.store.dispatch({
        type: this.actionTypes.cleanUp
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
    key: 'resetSearchStatus',
    value: function resetSearchStatus() {
      this.store.dispatch({
        type: this.actionTypes.reset
      });
    }
  }, {
    key: 'addSearchSource',
    value: function addSearchSource(_ref2) {
      var sourceName = _ref2.sourceName,
          searchFn = _ref2.searchFn,
          readyCheckFn = _ref2.readyCheckFn,
          formatFn = _ref2.formatFn;

      if (!sourceName) {
        throw new Error('ContactSearch: "sourceName" is required.');
      }
      if (this._searchSources.has(sourceName)) {
        throw new Error('ContactSearch: A search source named "' + sourceName + '" already exists');
      }
      if (this._searchSourcesCheck.has(sourceName)) {
        throw new Error('ContactSearch: A search source check named "' + sourceName + '" already exists');
      }
      if (this._searchSourcesFormat.has(sourceName)) {
        throw new Error('ContactSearch: A search source format named "' + sourceName + '" already exists');
      }
      if (typeof searchFn !== 'function') {
        throw new Error('ContactSearch: searchFn must be a function');
      }
      if (typeof readyCheckFn !== 'function') {
        throw new Error('ContactSearch: readyCheckFn must be a function');
      }
      if (typeof formatFn !== 'function') {
        throw new Error('ContactSearch: formatFn must be a function');
      }
      this._searchSources.set(sourceName, searchFn);
      this._searchSourcesFormat.set(sourceName, formatFn);
      this._searchSourcesCheck.set(sourceName, readyCheckFn);
    }
  }, {
    key: 'search',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref4) {
        var _this3 = this;

        var searchString = _ref4.searchString;

        var searchOnSources, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, sourceName;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!this.ready || !searchString || searchString.length < this._minimalSearchLength)) {
                  _context2.next = 3;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.prepareSearch
                });
                return _context2.abrupt('return');

              case 3:
                this._clearTimeout();
                this._timeoutId = setTimeout((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                  var searching;
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          searching = (0, _extends3.default)({}, _this3.state.searching);
                          _context.next = 3;
                          return _this3.search({ searchString: undefined });

                        case 3:
                          _context.next = 5;
                          return _this3.search(searching);

                        case 5:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, _this3);
                })), this._ttl);
                searchOnSources = (0, _from2.default)(this._searchSources.keys());
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 9;
                _iterator = (0, _getIterator3.default)(searchOnSources);

              case 11:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 18;
                  break;
                }

                sourceName = _step.value;
                _context2.next = 15;
                return this._searchSource({
                  searchOnSources: searchOnSources,
                  sourceName: sourceName,
                  searchString: searchString
                });

              case 15:
                _iteratorNormalCompletion = true;
                _context2.next = 11;
                break;

              case 18:
                _context2.next = 24;
                break;

              case 20:
                _context2.prev = 20;
                _context2.t0 = _context2['catch'](9);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 24:
                _context2.prev = 24;
                _context2.prev = 25;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 27:
                _context2.prev = 27;

                if (!_didIteratorError) {
                  _context2.next = 30;
                  break;
                }

                throw _iteratorError;

              case 30:
                return _context2.finish(27);

              case 31:
                return _context2.finish(24);

              case 32:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[9, 20, 24, 32], [25,, 27, 31]]);
      }));

      function search(_x) {
        return _ref3.apply(this, arguments);
      }

      return search;
    }()
  }, {
    key: '_clearTimeout',
    value: function _clearTimeout() {
      if (this._timeoutId) {
        clearTimeout(this._timeoutId);
      }
    }

    // TODO Need to refactor, remove cache, and update data in real time.

  }, {
    key: '_searchSource',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref7) {
        var searchOnSources = _ref7.searchOnSources,
            sourceName = _ref7.sourceName,
            searchString = _ref7.searchString;
        var searchId, entities;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                searchId = _uuid2.default.v4();

                this._searchIds[sourceName] = searchId;
                this.store.dispatch({
                  type: this.actionTypes.search
                });
                _context3.prev = 3;
                entities = null;

                entities = this._searchFromCache({ sourceName: sourceName, searchString: searchString });

                if (!entities) {
                  _context3.next = 9;
                  break;
                }

                this._loadSearching({ searchOnSources: searchOnSources, searchString: searchString, entities: entities });
                return _context3.abrupt('return');

              case 9:
                _context3.next = 11;
                return this._searchSources.get(sourceName)({
                  searchString: searchString
                });

              case 11:
                entities = _context3.sent;

                entities = this._searchSourcesFormat.get(sourceName)(entities);
                this._saveSearching({ sourceName: sourceName, searchString: searchString, entities: entities });
                if (this._searchIds[sourceName] === searchId) {
                  this._loadSearching({ searchOnSources: searchOnSources, searchString: searchString, entities: entities });
                }
                _context3.next = 20;
                break;

              case 17:
                _context3.prev = 17;
                _context3.t0 = _context3['catch'](3);

                this._onSearchError();

              case 20:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[3, 17]]);
      }));

      function _searchSource(_x2) {
        return _ref6.apply(this, arguments);
      }

      return _searchSource;
    }()
  }, {
    key: '_quickSort',
    value: function _quickSort(_ref8) {
      var _ref8$result = _ref8.result,
          result = _ref8$result === undefined ? [] : _ref8$result,
          _ref8$searchString = _ref8.searchString,
          searchString = _ref8$searchString === undefined ? '' : _ref8$searchString;

      var list = [].concat((0, _toConsumableArray3.default)(result));
      if (searchString === '') {
        return list;
      }
      return list.sort(function (current, next) {
        var currentName = current.name || '';
        var currentPhoneNumber = current.phoneNumber || '';
        var nextName = next.name || '';
        var nextPhoneNumber = next.phoneNumber || '';
        var isSort = currentName.indexOf(searchString) < nextName.indexOf(searchString) || currentPhoneNumber.indexOf(searchString) < nextPhoneNumber.indexOf(searchString);
        return isSort;
      });
    }
  }, {
    key: '_searchFromCache',
    value: function _searchFromCache(_ref9) {
      var sourceName = _ref9.sourceName,
          searchString = _ref9.searchString;

      var key = sourceName + '-' + searchString;
      var searching = this.cache && this.cache.contactSearch && this.cache.contactSearch[key];
      var now = Date.now();
      if (searching && now - searching.timestamp < this._ttl) {
        return searching.entities;
      }
      return null;
    }
  }, {
    key: '_readyCheck',
    value: function _readyCheck() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(this._searchSourcesCheck.keys()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var sourceName = _step2.value;

          if (!this._searchSourcesCheck.get(sourceName)()) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return true;
    }
  }, {
    key: '_onSearchError',
    value: function _onSearchError() {
      this.store.dispatch({
        type: this.actionTypes.searchError
      });
    }
  }, {
    key: '_loadSearching',
    value: function _loadSearching(_ref10) {
      var searchOnSources = _ref10.searchOnSources,
          searchString = _ref10.searchString,
          entities = _ref10.entities;

      this.store.dispatch({
        type: this.actionTypes.searchSuccess,
        searchOnSources: searchOnSources,
        searchString: searchString,
        entities: entities
      });
    }
  }, {
    key: '_saveSearching',
    value: function _saveSearching(_ref11) {
      var sourceName = _ref11.sourceName,
          searchString = _ref11.searchString,
          entities = _ref11.entities;

      this.store.dispatch({
        type: this.actionTypes.save,
        sourceName: sourceName,
        searchString: searchString,
        entities: entities,
        ttl: this._ttl
      });
    }
  }, {
    key: 'cache',
    get: function get() {
      return this._storage ? this._storage.getItem(this._storageKey) : this.state.cache;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'searchStatus',
    get: function get() {
      return this.state.searchStatus;
    }
  }, {
    key: 'searching',
    get: function get() {
      return this.state.searching;
    }
  }, {
    key: 'searchResult',
    get: function get() {
      return this.searching ? this.searching.result : [];
    }
  }, {
    key: 'sortedResult',
    get: function get() {
      return this._quickSort(this.searching);
    }
  }]);
  return ContactSearch;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'search', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'search'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_searchSource', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_searchSource'), _class2.prototype)), _class2)) || _class);
exports.default = ContactSearch;
//# sourceMappingURL=index.js.map
