'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _loginStatus = require('../../modules/Auth/loginStatus');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getContactSearchReducer = require('./getContactSearchReducer');

var _getContactSearchReducer2 = _interopRequireDefault(_getContactSearchReducer);

var _getCacheReducer = require('./getCacheReducer');

var _getCacheReducer2 = _interopRequireDefault(_getCacheReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContactSearch = function (_RcModule) {
  (0, _inherits3.default)(ContactSearch, _RcModule);

  function ContactSearch(_ref) {
    var auth = _ref.auth,
        storage = _ref.storage,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? 30 * 60 * 1000 : _ref$ttl,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'storage', 'ttl']);
    (0, _classCallCheck3.default)(this, ContactSearch);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ContactSearch.__proto__ || (0, _getPrototypeOf2.default)(ContactSearch)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._auth = auth;
    _this._storageKey = 'contactSearchCache';
    _this._storage = storage;
    _this._ttl = ttl;
    _this._searchSources = new _map2.default();
    _this._searchSourcesFormat = new _map2.default();
    _this._searchSourcesCheck = new _map2.default();
    if (_this._storage) {
      _this._reducer = (0, _getContactSearchReducer2.default)(_this.actionTypes);
      storage.registerReducer({
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
    key: '_resetModuleStatus',
    value: function _resetModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
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
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref4) {
        var searchString = _ref4.searchString;

        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, sourceName;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!this.ready || searchString.length < 3)) {
                  _context.next = 3;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.prepareSearch
                });
                return _context.abrupt('return', null);

              case 3:
                if (!(this.searching.searchString === searchString)) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return', null);

              case 5:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 8;
                _iterator = (0, _getIterator3.default)(this._searchSources.keys());

              case 10:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 17;
                  break;
                }

                sourceName = _step.value;
                _context.next = 14;
                return this._searchSource({
                  sourceName: sourceName,
                  searchString: searchString
                });

              case 14:
                _iteratorNormalCompletion = true;
                _context.next = 10;
                break;

              case 17:
                _context.next = 23;
                break;

              case 19:
                _context.prev = 19;
                _context.t0 = _context['catch'](8);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 23:
                _context.prev = 23;
                _context.prev = 24;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 26:
                _context.prev = 26;

                if (!_didIteratorError) {
                  _context.next = 29;
                  break;
                }

                throw _iteratorError;

              case 29:
                return _context.finish(26);

              case 30:
                return _context.finish(23);

              case 31:
                return _context.abrupt('return', null);

              case 32:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[8, 19, 23, 31], [24,, 26, 30]]);
      }));

      function search(_x) {
        return _ref3.apply(this, arguments);
      }

      return search;
    }()
  }, {
    key: '_searchSource',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref6) {
        var sourceName = _ref6.sourceName,
            searchString = _ref6.searchString;
        var entities;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.search
                });
                _context2.prev = 1;
                entities = null;

                entities = this._searchFromCache({ sourceName: sourceName, searchString: searchString });

                if (!entities) {
                  _context2.next = 7;
                  break;
                }

                this._loadSearching({ searchString: searchString, entities: entities });
                return _context2.abrupt('return', null);

              case 7:
                _context2.next = 9;
                return this._searchSources.get(sourceName)({
                  searchString: searchString
                });

              case 9:
                entities = _context2.sent;

                entities = this._searchSourcesFormat.get(sourceName)(entities);
                this._loadSearching({ searchString: searchString, entities: entities });
                this._saveSearching({ sourceName: sourceName, searchString: searchString, entities: entities });
                _context2.next = 18;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2['catch'](1);

                this._onSearchError();

              case 18:
                return _context2.abrupt('return', null);

              case 19:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 15]]);
      }));

      function _searchSource(_x2) {
        return _ref5.apply(this, arguments);
      }

      return _searchSource;
    }()
  }, {
    key: '_searchFromCache',
    value: function _searchFromCache(_ref7) {
      var sourceName = _ref7.sourceName,
          searchString = _ref7.searchString;

      var key = (0, _stringify2.default)([sourceName, searchString]);
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
    value: function _loadSearching(_ref8) {
      var searchString = _ref8.searchString,
          entities = _ref8.entities;

      this.store.dispatch({
        type: this.actionTypes.searchSuccess,
        entities: entities,
        searchString: searchString
      });
    }
  }, {
    key: '_saveSearching',
    value: function _saveSearching(_ref9) {
      var sourceName = _ref9.sourceName,
          searchString = _ref9.searchString,
          entities = _ref9.entities;

      this.store.dispatch({
        type: this.actionTypes.save,
        sourceName: sourceName,
        searchString: searchString,
        entities: entities
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
    key: 'ready',
    get: function get() {
      return this.status === _moduleStatuses2.default.ready;
    }
  }]);
  return ContactSearch;
}(_RcModule3.default);

exports.default = ContactSearch;
//# sourceMappingURL=index.js.map
