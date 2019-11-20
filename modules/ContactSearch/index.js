"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DefaultMinimalSearchLength = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.from");

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

require("core-js/modules/es6.regexp.search");

var _uuid = _interopRequireDefault(require("uuid"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _selector = require("../../lib/selector");

var _loginStatus = _interopRequireDefault(require("../Auth/loginStatus"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _debounce = _interopRequireDefault(require("../../lib/debounce"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getContactSearchReducer = _interopRequireDefault(require("./getContactSearchReducer"));

var _getCacheReducer = _interopRequireDefault(require("./getCacheReducer"));

var _dec, _class, _class2, _descriptor, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var DefaultMinimalSearchLength = 3;
/**
 * @class
 * @description Contact search module
 */

exports.DefaultMinimalSearchLength = DefaultMinimalSearchLength;
var ContactSearch = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Storage', {
    dep: 'ContactSearchOptions',
    optional: true
  }, {
    dep: 'TabManager',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_RcModule) {
  _inherits(ContactSearch, _RcModule);

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
    var _this;

    var auth = _ref.auth,
        storage = _ref.storage,
        _ref$storageKey = _ref.storageKey,
        storageKey = _ref$storageKey === void 0 ? 'contactSearchCache' : _ref$storageKey,
        _ref$minimalSearchLen = _ref.minimalSearchLength,
        minimalSearchLength = _ref$minimalSearchLen === void 0 ? DefaultMinimalSearchLength : _ref$minimalSearchLen,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === void 0 ? 5 * 60 * 1000 : _ref$ttl,
        options = _objectWithoutProperties(_ref, ["auth", "storage", "storageKey", "minimalSearchLength", "ttl"]);

    _classCallCheck(this, ContactSearch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ContactSearch).call(this, _objectSpread({}, options, {
      actionTypes: _actionTypes["default"]
    })));
    _this.debouncedSearch = (0, _debounce["default"])(_this.search, 800, false);

    _initializerDefineProperty(_this, "sortedResult", _descriptor, _assertThisInitialized(_this));

    _this._auth = auth;
    _this._storage = storage;
    _this._storageKey = storageKey;
    _this._minimalSearchLength = minimalSearchLength;
    _this._ttl = ttl;
    _this._searchSources = new Map();
    _this._searchSourcesFormat = new Map();
    _this._searchSourcesCheck = new Map();
    _this._searchIds = {};

    if (_this._storage) {
      _this._reducer = (0, _getContactSearchReducer["default"])(_this.actionTypes);

      _this._storage.registerReducer({
        key: _this._storageKey,
        reducer: (0, _getCacheReducer["default"])(_this.actionTypes)
      });
    } else {
      _this._reducer = (0, _getContactSearchReducer["default"])(_this.actionTypes, {
        cache: (0, _getCacheReducer["default"])(_this.actionTypes)
      });
    }

    return _this;
  }

  _createClass(ContactSearch, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "_onStateChange",
    value: function _onStateChange() {
      if (this._shouldInit()) {
        this._initModuleStatus();
      } else if (this._shouldReset()) {
        this._resetModuleStatus();

        this._clearStateCache();
      }
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._auth.loginStatus === _loginStatus["default"].loggedIn && (!this._storage || this._storage.ready) && this._readyCheck() && !this.ready;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (this._auth.loginStatus !== _loginStatus["default"].loggedIn || this._storage && !this._storage.ready) && this.ready;
    }
  }, {
    key: "_initModuleStatus",
    value: function _initModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.initSuccess
      });
    }
  }, {
    key: "_clearStateCache",
    value: function _clearStateCache() {
      this.store.dispatch({
        type: this.actionTypes.cleanUp
      });
    }
  }, {
    key: "_resetModuleStatus",
    value: function _resetModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: "resetSearchStatus",
    value: function resetSearchStatus() {
      this.store.dispatch({
        type: this.actionTypes.reset
      });
    }
  }, {
    key: "addSearchSource",
    value: function addSearchSource(_ref2) {
      var sourceName = _ref2.sourceName,
          searchFn = _ref2.searchFn,
          readyCheckFn = _ref2.readyCheckFn,
          formatFn = _ref2.formatFn;

      if (!sourceName) {
        throw new Error('ContactSearch: "sourceName" is required.');
      }

      if (this._searchSources.has(sourceName)) {
        throw new Error("ContactSearch: A search source named \"".concat(sourceName, "\" already exists"));
      }

      if (this._searchSourcesCheck.has(sourceName)) {
        throw new Error("ContactSearch: A search source check named \"".concat(sourceName, "\" already exists"));
      }

      if (this._searchSourcesFormat.has(sourceName)) {
        throw new Error("ContactSearch: A search source format named \"".concat(sourceName, "\" already exists"));
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
    key: "search",
    value: function search(_ref3) {
      var _this3 = this;

      var searchString, searchOnSources, _i, _searchOnSources, sourceName;

      return regeneratorRuntime.async(function search$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              searchString = _ref3.searchString;

              if (!(!this.ready || !searchString || searchString.length < this._minimalSearchLength)) {
                _context2.next = 4;
                break;
              }

              this.store.dispatch({
                type: this.actionTypes.prepareSearch
              });
              return _context2.abrupt("return");

            case 4:
              this._clearTimeout();

              this._timeoutId = setTimeout(function _callee() {
                var searching;
                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        searching = _objectSpread({}, _this3.state.searching);
                        _context.next = 3;
                        return regeneratorRuntime.awrap(_this3.search({
                          searchString: undefined
                        }));

                      case 3:
                        _context.next = 5;
                        return regeneratorRuntime.awrap(_this3.search(searching));

                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                });
              }, this._ttl);
              searchOnSources = Array.from(this._searchSources.keys());
              _i = 0, _searchOnSources = searchOnSources;

            case 8:
              if (!(_i < _searchOnSources.length)) {
                _context2.next = 15;
                break;
              }

              sourceName = _searchOnSources[_i];
              _context2.next = 12;
              return regeneratorRuntime.awrap(this._searchSource({
                searchOnSources: searchOnSources,
                sourceName: sourceName,
                searchString: searchString
              }));

            case 12:
              _i++;
              _context2.next = 8;
              break;

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_clearTimeout",
    value: function _clearTimeout() {
      if (this._timeoutId) {
        clearTimeout(this._timeoutId);
      }
    } // TODO Need to refactor, remove cache, and update data in real time.

  }, {
    key: "_searchSource",
    value: function _searchSource(_ref4) {
      var searchOnSources, sourceName, searchString, searchId, entities;
      return regeneratorRuntime.async(function _searchSource$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              searchOnSources = _ref4.searchOnSources, sourceName = _ref4.sourceName, searchString = _ref4.searchString;
              searchId = _uuid["default"].v4();
              this._searchIds[sourceName] = searchId;
              this.store.dispatch({
                type: this.actionTypes.search
              });
              _context3.prev = 4;
              entities = null;
              entities = this._searchFromCache({
                sourceName: sourceName,
                searchString: searchString
              });

              if (!entities) {
                _context3.next = 10;
                break;
              }

              this._loadSearching({
                searchOnSources: searchOnSources,
                searchString: searchString,
                entities: entities
              });

              return _context3.abrupt("return");

            case 10:
              _context3.next = 12;
              return regeneratorRuntime.awrap(this._searchSources.get(sourceName)({
                searchString: searchString
              }));

            case 12:
              entities = _context3.sent;
              entities = this._searchSourcesFormat.get(sourceName)(entities);

              this._saveSearching({
                sourceName: sourceName,
                searchString: searchString,
                entities: entities
              });

              if (this._searchIds[sourceName] === searchId) {
                this._loadSearching({
                  searchOnSources: searchOnSources,
                  searchString: searchString,
                  entities: entities
                });
              }

              _context3.next = 21;
              break;

            case 18:
              _context3.prev = 18;
              _context3.t0 = _context3["catch"](4);

              this._onSearchError();

            case 21:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[4, 18]]);
    }
  }, {
    key: "_quickSort",
    value: function _quickSort(_ref5) {
      var _ref5$result = _ref5.result,
          result = _ref5$result === void 0 ? [] : _ref5$result,
          _ref5$searchString = _ref5.searchString,
          searchString = _ref5$searchString === void 0 ? '' : _ref5$searchString;

      var list = _toConsumableArray(result);

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
    key: "_searchFromCache",
    value: function _searchFromCache(_ref6) {
      var sourceName = _ref6.sourceName,
          searchString = _ref6.searchString;
      var key = "".concat(sourceName, "-").concat(searchString);
      var searching = this.cache && this.cache.contactSearch && this.cache.contactSearch[key];
      var now = Date.now();

      if (searching && now - searching.timestamp < this._ttl) {
        return searching.entities;
      }

      return null;
    }
  }, {
    key: "_readyCheck",
    value: function _readyCheck() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._searchSourcesCheck.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var sourceName = _step.value;

          if (!this._searchSourcesCheck.get(sourceName)()) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return true;
    }
  }, {
    key: "_onSearchError",
    value: function _onSearchError() {
      this.store.dispatch({
        type: this.actionTypes.searchError
      });
    }
  }, {
    key: "_loadSearching",
    value: function _loadSearching(_ref7) {
      var searchOnSources = _ref7.searchOnSources,
          searchString = _ref7.searchString,
          entities = _ref7.entities;
      this.store.dispatch({
        type: this.actionTypes.searchSuccess,
        searchOnSources: searchOnSources,
        searchString: searchString,
        entities: entities
      });
    }
  }, {
    key: "_saveSearching",
    value: function _saveSearching(_ref8) {
      var sourceName = _ref8.sourceName,
          searchString = _ref8.searchString,
          entities = _ref8.entities;
      this.store.dispatch({
        type: this.actionTypes.save,
        sourceName: sourceName,
        searchString: searchString,
        entities: entities,
        ttl: this._ttl
      });
    }
  }, {
    key: "cache",
    get: function get() {
      return this._storage ? this._storage.getItem(this._storageKey) : this.state.cache;
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "searchStatus",
    get: function get() {
      return this.state.searchStatus;
    }
  }, {
    key: "searching",
    get: function get() {
      return this.state.searching;
    }
  }, {
    key: "searchResult",
    get: function get() {
      return this.searching ? this.searching.result : [];
    }
  }]);

  return ContactSearch;
}(_RcModule2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "search", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "search"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_searchSource", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_searchSource"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "sortedResult", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this4 = this;

    return [function () {
      return _this4.searching;
    }, function (searching) {
      return _this4._quickSort(searching);
    }];
  }
})), _class2)) || _class);
exports["default"] = ContactSearch;
//# sourceMappingURL=index.js.map
