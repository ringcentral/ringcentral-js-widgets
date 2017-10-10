'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DefaultContactListPageSize = exports.DefaultMinimalSearchLength = exports.AllContactSourceName = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var _desc, _value, _class;

exports.uniqueContactItems = uniqueContactItems;
exports.sortContactItemsByName = sortContactItemsByName;
exports.groupByFirstLetterOfName = groupByFirstLetterOfName;

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _loginStatus = require('../../modules/Auth/loginStatus');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

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
var DefaultContactListPageSize = exports.DefaultContactListPageSize = 20;

function uniqueContactItems(result) {
  var items = result || [];
  // remove duplicated referencing
  items = items.filter(function (value, index, arr) {
    return arr.indexOf(value) === index;
  });
  // remove duplicated items by id
  var hash = {};
  var unique = [];
  items.forEach(function (item) {
    var itemId = '' + item.type + item.id;
    if (!hash[itemId]) {
      hash[itemId] = 1;
      unique.push(item);
    }
  });
  return unique;
}

function sortContactItemsByName(result) {
  var items = result || [];
  items.sort(function (a, b) {
    var name1 = (a.name || '').toLowerCase().replace(/^\s\s*/, ''); // trim start
    var name2 = (b.name || '').toLowerCase().replace(/^\s\s*/, ''); // trim start
    var isNumber1 = /^[0-9]/.test(name1);
    var isNumber2 = /^[0-9]/.test(name2);
    if (isNumber1 && isNumber2) {
      return name1.localeCompare(name2);
    } else if (isNumber1 || isNumber2) {
      // put number name at last
      return -name1.localeCompare(name2);
    }
    return name1.localeCompare(name2);
  });
  return items;
}

function groupByFirstLetterOfName(contactItems) {
  var groups = [];
  if (contactItems && contactItems.length) {
    var group = void 0;
    contactItems.forEach(function (contact) {
      var name = (contact.name || '').replace(/^\s\s*/, ''); // trim start
      var letter = (name[0] || '').toLocaleUpperCase();
      if (!group || group.caption !== letter) {
        group = {
          contacts: [],
          caption: letter,
          id: letter
        };
        groups.push(group);
      }
      group.contacts.push(contact);
    });
  }
  return groups;
}

/**
 * @class
 * @description Contact search module
 */
var ContactSearch = (_class = function (_RcModule) {
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
        _ref$contactListPageS = _ref.contactListPageSize,
        contactListPageSize = _ref$contactListPageS === undefined ? DefaultContactListPageSize : _ref$contactListPageS,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? 5 * 60 * 1000 : _ref$ttl,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'storage', 'storageKey', 'minimalSearchLength', 'contactListPageSize', 'ttl']);
    (0, _classCallCheck3.default)(this, ContactSearch);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ContactSearch.__proto__ || (0, _getPrototypeOf2.default)(ContactSearch)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._auth = auth;
    _this._storage = storage;
    _this._storageKey = storageKey;
    _this._minimalSearchLength = minimalSearchLength;
    _this._contactListPageSize = contactListPageSize;
    _this._ttl = ttl;
    _this._searchSources = new _map2.default();
    _this._searchSourcesFormat = new _map2.default();
    _this._searchSourcesCheck = new _map2.default();
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

    _this.addSelector('contactSourceNames', function () {
      return _this._searchSources.size;
    }, function () {
      var names = [AllContactSourceName];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(_this._searchSources.keys()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var sourceName = _step.value;

          names.push(sourceName);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return names;
    });

    _this.addSelector('contactGroups', function () {
      return _this.searching && _this.searching.result;
    }, function (result) {
      var pageSize = _this._contactListPageSize;
      var pageNumber = _this.searchCriteria.pageNumber || 1;
      var count = pageNumber * pageSize;
      var items = uniqueContactItems(result);
      items = sortContactItemsByName(items);
      items = items.slice(0, count);
      var groups = groupByFirstLetterOfName(items);
      return groups;
    });
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
        this._restSearchCriteria();
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
    key: '_restSearchCriteria',
    value: function _restSearchCriteria() {
      this.store.dispatch({
        type: this.actionTypes.restSearchCriteria
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

        var searchOnSources, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, sourceName;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!this.ready || searchString.length < this._minimalSearchLength)) {
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
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context2.prev = 9;
                _iterator2 = (0, _getIterator3.default)(searchOnSources);

              case 11:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context2.next = 18;
                  break;
                }

                sourceName = _step2.value;
                _context2.next = 15;
                return this._searchSource({
                  searchOnSources: searchOnSources,
                  sourceName: sourceName,
                  searchString: searchString
                });

              case 15:
                _iteratorNormalCompletion2 = true;
                _context2.next = 11;
                break;

              case 18:
                _context2.next = 24;
                break;

              case 20:
                _context2.prev = 20;
                _context2.t0 = _context2['catch'](9);
                _didIteratorError2 = true;
                _iteratorError2 = _context2.t0;

              case 24:
                _context2.prev = 24;
                _context2.prev = 25;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 27:
                _context2.prev = 27;

                if (!_didIteratorError2) {
                  _context2.next = 30;
                  break;
                }

                throw _iteratorError2;

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
  }, {
    key: 'searchPlus',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref7) {
        var _this4 = this;

        var sourceName = _ref7.sourceName,
            searchString = _ref7.searchString,
            pageNumber = _ref7.pageNumber;

        var searchOnSources, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, source;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this.ready) {
                  _context4.next = 3;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.prepareSearch
                });
                return _context4.abrupt('return');

              case 3:
                this._clearTimeout();
                this._timeoutId = setTimeout((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
                  var searchCriteria;
                  return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          searchCriteria = (0, _extends3.default)({}, _this4.state.searchCriteria);
                          _context3.next = 3;
                          return _this4.searchPlus((0, _extends3.default)({}, _this4.state.searchCriteria, { searchString: undefined }));

                        case 3:
                          _context3.next = 5;
                          return _this4.searchPlus(searchCriteria);

                        case 5:
                        case 'end':
                          return _context3.stop();
                      }
                    }
                  }, _callee3, _this4);
                })), this._ttl);
                this.store.dispatch({
                  type: this.actionTypes.updateSearchCriteria,
                  sourceName: sourceName,
                  searchString: searchString,
                  pageNumber: pageNumber
                });

                searchOnSources = !sourceName || sourceName === AllContactSourceName ? (0, _from2.default)(this._searchSources.keys()) : [sourceName];
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context4.prev = 10;
                _iterator3 = (0, _getIterator3.default)(searchOnSources);

              case 12:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context4.next = 19;
                  break;
                }

                source = _step3.value;
                _context4.next = 16;
                return this._searchSource({
                  searchOnSources: searchOnSources,
                  sourceName: source,
                  searchString: searchString
                });

              case 16:
                _iteratorNormalCompletion3 = true;
                _context4.next = 12;
                break;

              case 19:
                _context4.next = 25;
                break;

              case 21:
                _context4.prev = 21;
                _context4.t0 = _context4['catch'](10);
                _didIteratorError3 = true;
                _iteratorError3 = _context4.t0;

              case 25:
                _context4.prev = 25;
                _context4.prev = 26;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 28:
                _context4.prev = 28;

                if (!_didIteratorError3) {
                  _context4.next = 31;
                  break;
                }

                throw _iteratorError3;

              case 31:
                return _context4.finish(28);

              case 32:
                return _context4.finish(25);

              case 33:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[10, 21, 25, 33], [26,, 28, 32]]);
      }));

      function searchPlus(_x2) {
        return _ref6.apply(this, arguments);
      }

      return searchPlus;
    }()
    // TODO Need to refactor, remove cache, and update data in real time.

  }, {
    key: '_searchSource',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(_ref10) {
        var searchOnSources = _ref10.searchOnSources,
            sourceName = _ref10.sourceName,
            searchString = _ref10.searchString;
        var entities;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.search
                });
                _context5.prev = 1;
                entities = null;

                entities = this._searchFromCache({ sourceName: sourceName, searchString: searchString });

                if (!entities) {
                  _context5.next = 7;
                  break;
                }

                this._loadSearching({ searchOnSources: searchOnSources, searchString: searchString, entities: entities });
                return _context5.abrupt('return');

              case 7:
                _context5.next = 9;
                return this._searchSources.get(sourceName)({
                  searchString: searchString
                });

              case 9:
                entities = _context5.sent;

                entities = this._searchSourcesFormat.get(sourceName)(entities);
                this._loadSearching({ searchOnSources: searchOnSources, searchString: searchString, entities: entities });
                this._saveSearching({ sourceName: sourceName, searchString: searchString, entities: entities });
                _context5.next = 18;
                break;

              case 15:
                _context5.prev = 15;
                _context5.t0 = _context5['catch'](1);

                this._onSearchError();

              case 18:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 15]]);
      }));

      function _searchSource(_x3) {
        return _ref9.apply(this, arguments);
      }

      return _searchSource;
    }()
  }, {
    key: '_quickSort',
    value: function _quickSort(_ref11) {
      var _ref11$result = _ref11.result,
          result = _ref11$result === undefined ? [] : _ref11$result,
          _ref11$searchString = _ref11.searchString,
          searchString = _ref11$searchString === undefined ? '' : _ref11$searchString;

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
    value: function _searchFromCache(_ref12) {
      var sourceName = _ref12.sourceName,
          searchString = _ref12.searchString;

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
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = (0, _getIterator3.default)(this._searchSourcesCheck.keys()), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var sourceName = _step4.value;

          if (!this._searchSourcesCheck.get(sourceName)()) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
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
    value: function _loadSearching(_ref13) {
      var searchOnSources = _ref13.searchOnSources,
          searchString = _ref13.searchString,
          entities = _ref13.entities;

      this.store.dispatch({
        type: this.actionTypes.searchSuccess,
        searchOnSources: searchOnSources,
        searchString: searchString,
        entities: entities
      });
    }
  }, {
    key: '_saveSearching',
    value: function _saveSearching(_ref14) {
      var sourceName = _ref14.sourceName,
          searchString = _ref14.searchString,
          entities = _ref14.entities;

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
    key: 'searchCriteria',
    get: function get() {
      return this.state.searchCriteria;
    }
  }, {
    key: 'contactSourceNames',
    get: function get() {
      return this._selectors.contactSourceNames();
    }
  }, {
    key: 'contactGroups',
    get: function get() {
      return this._selectors.contactGroups();
    }
  }, {
    key: 'sortedResult',
    get: function get() {
      return this._quickSort(this.searching);
    }
  }]);
  return ContactSearch;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class.prototype, 'search', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'search'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'searchPlus', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'searchPlus'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_searchSource', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, '_searchSource'), _class.prototype)), _class);
exports.default = ContactSearch;
//# sourceMappingURL=index.js.map
