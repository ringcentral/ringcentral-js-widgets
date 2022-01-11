"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DefaultMinimalSearchLength = void 0;

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

var uuid = _interopRequireWildcard(require("uuid"));

var _debounceThrottle = require("../../lib/debounce-throttle");

var _di = require("../../lib/di");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _selector = require("../../lib/selector");

var _loginStatus = _interopRequireDefault(require("../Auth/loginStatus"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getCacheReducer = _interopRequireDefault(require("./getCacheReducer"));

var _getContactSearchReducer = _interopRequireDefault(require("./getContactSearchReducer"));

var _dec, _class, _class2, _descriptor;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var DefaultMinimalSearchLength = 3;
/**
 * @class
 * @description Contact search module
 */

exports.DefaultMinimalSearchLength = DefaultMinimalSearchLength;
var ContactSearch = (_dec = (0, _di.Module)({
  deps: ['Auth', {
    dep: 'Storage',
    optional: true
  }, {
    dep: 'ContactSearchOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  _inherits(ContactSearch, _RcModule);

  var _super = _createSuper(ContactSearch);

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

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: _actionTypes["default"]
    }));
    _this._debouncedSearchFn = (0, _debounceThrottle.debounce)({
      fn: _this.search,
      threshold: 800
    });

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

        if (this._debouncedSearchFn) {
          this._debouncedSearchFn.cancel();
        }
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
        throw new Error('[ContactSearch > SearchSource > sourceName] is required');
      }

      if (this._searchSources.has(sourceName)) {
        throw new Error("[ContactSearch > SearchSource(".concat(sourceName, ") > searchFn] already exists"));
      }

      if (this._searchSourcesCheck.has(sourceName)) {
        throw new Error("[ContactSearch > SearchSource(".concat(sourceName, ") > readyCheckFn] already exists"));
      }

      if (this._searchSourcesFormat.has(sourceName)) {
        throw new Error("[ContactSearch > SearchSource(".concat(sourceName, ") > formatFn] already exists"));
      }

      if (typeof searchFn !== 'function') {
        throw new Error("[ContactSearch > SearchSource(".concat(sourceName, ") > searchFn] must be a function"));
      }

      if (typeof readyCheckFn !== 'function') {
        throw new Error("[ContactSearch > SearchSource(".concat(sourceName, ") > readyCheckFn] must be a function"));
      }

      if (typeof formatFn !== 'function') {
        throw new Error("[ContactSearch > SearchSource(".concat(sourceName, ") > formatFn] must be a function"));
      }

      this._searchSources.set(sourceName, searchFn);

      this._searchSourcesFormat.set(sourceName, formatFn);

      this._searchSourcesCheck.set(sourceName, readyCheckFn);
    }
  }, {
    key: "debouncedSearch",
    value: function debouncedSearch(_ref3) {
      var searchString = _ref3.searchString;

      this._debouncedSearchFn({
        searchString: searchString
      });
    }
  }, {
    key: "search",
    value: function () {
      var _search = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref4) {
        var _this3 = this;

        var searchString, searchOnSources, _i, _searchOnSources, sourceName;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                searchString = _ref4.searchString;

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

                this._timeoutId = setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                  var searching;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          searching = _objectSpread({}, _this3.state.searching);
                          _context.next = 3;
                          return _this3.search({
                            searchString: undefined
                          });

                        case 3:
                          _context.next = 5;
                          return _this3.search(searching);

                        case 5:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                })), this._ttl);
                searchOnSources = Array.from(this._searchSources.keys());
                _i = 0, _searchOnSources = searchOnSources;

              case 8:
                if (!(_i < _searchOnSources.length)) {
                  _context2.next = 15;
                  break;
                }

                sourceName = _searchOnSources[_i];
                _context2.next = 12;
                return this._searchSource({
                  searchOnSources: searchOnSources,
                  sourceName: sourceName,
                  searchString: searchString
                });

              case 12:
                _i++;
                _context2.next = 8;
                break;

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function search(_x) {
        return _search.apply(this, arguments);
      }

      return search;
    }()
  }, {
    key: "_clearTimeout",
    value: function _clearTimeout() {
      if (this._timeoutId) {
        clearTimeout(this._timeoutId);
      }
    } // TODO Need to refactor, remove cache, and update data in real time.

  }, {
    key: "_searchSource",
    value: function () {
      var _searchSource2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref6) {
        var searchOnSources, sourceName, searchString, searchId, entities, searchFn, formatFn;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                searchOnSources = _ref6.searchOnSources, sourceName = _ref6.sourceName, searchString = _ref6.searchString;
                searchId = uuid.v4();
                this._searchIds[sourceName] = searchId;
                this.store.dispatch({
                  type: this.actionTypes.search
                });
                _context3.prev = 4;
                // search cache
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
                // search source
                searchFn = this._searchSources.get(sourceName);
                _context3.next = 13;
                return searchFn({
                  searchString: searchString
                });

              case 13:
                entities = _context3.sent;
                // format result
                formatFn = this._searchSourcesFormat.get(sourceName);
                entities = formatFn(entities); // save result

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

                _context3.next = 23;
                break;

              case 20:
                _context3.prev = 20;
                _context3.t0 = _context3["catch"](4);

                this._onSearchError();

              case 23:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 20]]);
      }));

      function _searchSource(_x2) {
        return _searchSource2.apply(this, arguments);
      }

      return _searchSource;
    }()
  }, {
    key: "_quickSort",
    value: function _quickSort(_ref7) {
      var _ref7$result = _ref7.result,
          result = _ref7$result === void 0 ? [] : _ref7$result,
          _ref7$searchString = _ref7.searchString,
          searchString = _ref7$searchString === void 0 ? '' : _ref7$searchString;

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
    value: function _searchFromCache(_ref8) {
      var sourceName = _ref8.sourceName,
          searchString = _ref8.searchString;
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
      var _iterator = _createForOfIteratorHelper(this._searchSourcesCheck.keys()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var sourceName = _step.value;

          if (!this._searchSourcesCheck.get(sourceName)()) {
            return false;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
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
    value: function _loadSearching(_ref9) {
      var searchOnSources = _ref9.searchOnSources,
          searchString = _ref9.searchString,
          entities = _ref9.entities;
      this.store.dispatch({
        type: this.actionTypes.searchSuccess,
        searchOnSources: searchOnSources,
        searchString: searchString,
        entities: entities
      });
    }
  }, {
    key: "_saveSearching",
    value: function _saveSearching(_ref10) {
      var sourceName = _ref10.sourceName,
          searchString = _ref10.searchString,
          entities = _ref10.entities;
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
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "debouncedSearch", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "debouncedSearch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "search", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "search"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_searchSource", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_searchSource"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "sortedResult", [_selector.selector], {
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
