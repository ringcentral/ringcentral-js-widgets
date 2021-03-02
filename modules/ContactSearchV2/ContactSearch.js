"use strict";

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactSearch = exports.DefaultSearchingState = exports.DefaultMinimalSearchLength = void 0;

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.from");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

var uuid = _interopRequireWildcard(require("uuid"));

var _ramda = require("ramda");

var _core = require("@ringcentral-integration/core");

var _di = require("../../lib/di");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _debounceThrottle = require("../../lib/debounce-throttle");

var _contactSearchStatus = require("./contactSearchStatus");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var DefaultMinimalSearchLength = 3;
exports.DefaultMinimalSearchLength = DefaultMinimalSearchLength;
var DefaultSearchingState = {
  searchOnSources: [],
  searchString: '',
  result: []
};
exports.DefaultSearchingState = DefaultSearchingState;
var ContactSearch = (_dec = (0, _di.Module)({
  deps: ['Auth', {
    dep: 'Storage',
    optional: true
  }, {
    dep: 'ContactSearchOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var searching = _ref.searching;
  return [searching];
}), _dec3 = (0, _core.computed)(function (_ref2) {
  var searching = _ref2.searching;
  return [searching];
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(ContactSearch, _RcModuleV);

  var _super = _createSuper(ContactSearch);

  function ContactSearch(deps) {
    var _deps$contactSearchOp, _deps$contactSearchOp2, _this$_deps$contactSe, _this$_deps$contactSe2, _this$_deps$contactSe3, _this$_deps$contactSe4;

    var _this;

    _classCallCheck(this, ContactSearch);

    _this = _super.call(this, {
      deps: deps,
      storageKey: 'ContactSearch',
      enableCache: (_deps$contactSearchOp = (_deps$contactSearchOp2 = deps.contactSearchOptions) === null || _deps$contactSearchOp2 === void 0 ? void 0 : _deps$contactSearchOp2.enableCache) !== null && _deps$contactSearchOp !== void 0 ? _deps$contactSearchOp : true
    });
    _this._searchSources = new Map();
    _this._searchSourcesFormat = new Map();
    _this._searchSourcesCheck = new Map();
    _this._searchIds = {};
    _this._ttl = (_this$_deps$contactSe = (_this$_deps$contactSe2 = _this._deps.contactSearchOptions) === null || _this$_deps$contactSe2 === void 0 ? void 0 : _this$_deps$contactSe2.ttl) !== null && _this$_deps$contactSe !== void 0 ? _this$_deps$contactSe : 5 * 60 * 1000;
    _this._minimalSearchLength = (_this$_deps$contactSe3 = (_this$_deps$contactSe4 = _this._deps.contactSearchOptions) === null || _this$_deps$contactSe4 === void 0 ? void 0 : _this$_deps$contactSe4.minimalSearchLength) !== null && _this$_deps$contactSe3 !== void 0 ? _this$_deps$contactSe3 : DefaultMinimalSearchLength;
    _this._debouncedSearchFn = (0, _debounceThrottle.debounce)({
      fn: _this.search,
      threshold: 800
    });
    _this._timeoutId = null;

    _initializerDefineProperty(_this, "contactSearch", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "searchStatus", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "searching", _descriptor3, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(ContactSearch, [{
    key: "setSearchStatus",
    value: function setSearchStatus(searchStatus) {
      this.searchStatus = searchStatus;
    }
  }, {
    key: "setPrepareSearch",
    value: function setPrepareSearch() {
      this.searchStatus = _contactSearchStatus.contactSearchStatus.idle;
      this.searching = DefaultSearchingState;
    }
  }, {
    key: "setSearchSuccess",
    value: function setSearchSuccess(_ref3) {
      var _this2 = this;

      var searchOnSources = _ref3.searchOnSources,
          searchString = _ref3.searchString,
          entities = _ref3.entities;

      if (this.searching.searchString === searchString && (0, _ramda.sortBy)(_ramda.identity)(this.searching.searchOnSources).join(',') === (0, _ramda.sortBy)(_ramda.identity)(searchOnSources).join(',')) {
        var resultMap = {};
        this.searching.result.forEach(function (item) {
          resultMap[item.id] = true;
        });
        entities.forEach(function (item) {
          if (!resultMap[item.id]) {
            _this2.searching.result.push(item);

            resultMap[item.id] = true;
          }
        });
        return;
      }

      this.searching = {
        searchOnSources: searchOnSources,
        searchString: searchString,
        result: entities
      };
    }
  }, {
    key: "setContactSearch",
    value: function setContactSearch(_ref4) {
      var _this3 = this;

      var sourceName = _ref4.sourceName,
          searchString = _ref4.searchString,
          entities = _ref4.entities,
          ttl = _ref4.ttl;
      var data = {};
      Object.keys(this.contactSearch).forEach(function (key) {
        if (Date.now() - _this3.contactSearch[key].timestamp < ttl) {
          data[key] = _this3.contactSearch[key];
        }
      });
      var key = "".concat(sourceName, "-").concat(searchString);
      data[key] = {
        entities: entities,
        timestamp: Date.now()
      };
      this.contactSearch = data;
    }
  }, {
    key: "cleanUp",
    value: function cleanUp() {
      this.contactSearch = {};
      this.searching = DefaultSearchingState;
    }
  }, {
    key: "resetContactSearch",
    value: function resetContactSearch() {
      this.contactSearch = {};
    }
  }, {
    key: "onInitSuccess",
    value: function onInitSuccess() {
      this.resetContactSearch();
    }
  }, {
    key: "onReset",
    value: function onReset() {
      this.cleanUp();

      if (this._debouncedSearchFn) {
        this._debouncedSearchFn.cancel();
      }
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(_get(_getPrototypeOf(ContactSearch.prototype), "_shouldInit", this).call(this) && this._deps.auth.loggedIn && this._readyCheck());
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(_get(_getPrototypeOf(ContactSearch.prototype), "_shouldReset", this).call(this) || this.ready && !this._deps.auth.loggedIn);
    }
  }, {
    key: "addSearchSource",
    value: function addSearchSource(_ref5) {
      var sourceName = _ref5.sourceName,
          searchFn = _ref5.searchFn,
          readyCheckFn = _ref5.readyCheckFn,
          formatFn = _ref5.formatFn;

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
    value: function () {
      var _debouncedSearch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref6) {
        var searchString;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                searchString = _ref6.searchString;

                this._debouncedSearchFn({
                  searchString: searchString
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function debouncedSearch(_x) {
        return _debouncedSearch.apply(this, arguments);
      }

      return debouncedSearch;
    }()
  }, {
    key: "search",
    value: function () {
      var _search = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref7) {
        var _this4 = this;

        var searchString, searchOnSources, _i, _searchOnSources, sourceName;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                searchString = _ref7.searchString;

                if (!(!this.ready || !searchString || searchString.length < this._minimalSearchLength)) {
                  _context3.next = 4;
                  break;
                }

                this.setPrepareSearch();
                return _context3.abrupt("return");

              case 4:
                this._clearTimeout();

                this._timeoutId = setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                  var searching;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          searching = _objectSpread({}, _this4.searching);
                          _context2.next = 3;
                          return _this4.search({
                            searchString: undefined
                          });

                        case 3:
                          _context2.next = 5;
                          return _this4.search(searching);

                        case 5:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                })), this._ttl);
                searchOnSources = Array.from(this._searchSources.keys());
                _i = 0, _searchOnSources = searchOnSources;

              case 8:
                if (!(_i < _searchOnSources.length)) {
                  _context3.next = 15;
                  break;
                }

                sourceName = _searchOnSources[_i];
                _context3.next = 12;
                return this._searchSource({
                  searchOnSources: searchOnSources,
                  sourceName: sourceName,
                  searchString: searchString
                });

              case 12:
                _i++;
                _context3.next = 8;
                break;

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function search(_x2) {
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
      var _searchSource2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref9) {
        var searchOnSources, sourceName, searchString, searchId, entities, searchFn, formatFn;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                searchOnSources = _ref9.searchOnSources, sourceName = _ref9.sourceName, searchString = _ref9.searchString;
                searchId = uuid.v4();
                this._searchIds[sourceName] = searchId;
                this.setSearchStatus(_contactSearchStatus.contactSearchStatus.searching);
                _context4.prev = 4;
                // search cache
                entities = null;
                entities = this._searchFromCache({
                  sourceName: sourceName,
                  searchString: searchString
                });

                if (!entities) {
                  _context4.next = 10;
                  break;
                }

                this._loadSearching({
                  searchOnSources: searchOnSources,
                  searchString: searchString,
                  entities: entities
                });

                return _context4.abrupt("return");

              case 10:
                // search source
                searchFn = this._searchSources.get(sourceName);
                _context4.next = 13;
                return searchFn({
                  searchString: searchString
                });

              case 13:
                entities = _context4.sent;
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

                _context4.next = 23;
                break;

              case 20:
                _context4.prev = 20;
                _context4.t0 = _context4["catch"](4);

                this._onSearchError();

              case 23:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[4, 20]]);
      }));

      function _searchSource(_x3) {
        return _searchSource2.apply(this, arguments);
      }

      return _searchSource;
    }()
  }, {
    key: "_searchFromCache",
    value: function _searchFromCache(_ref10) {
      var sourceName = _ref10.sourceName,
          searchString = _ref10.searchString;
      var key = "".concat(sourceName, "-").concat(searchString);
      var searching = this.contactSearch[key];
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
      this.setPrepareSearch();
    }
  }, {
    key: "_loadSearching",
    value: function _loadSearching(_ref11) {
      var searchOnSources = _ref11.searchOnSources,
          searchString = _ref11.searchString,
          entities = _ref11.entities;
      this.setSearchSuccess({
        searchOnSources: searchOnSources,
        searchString: searchString,
        entities: entities
      });
    }
  }, {
    key: "_saveSearching",
    value: function _saveSearching(_ref12) {
      var sourceName = _ref12.sourceName,
          searchString = _ref12.searchString,
          entities = _ref12.entities;
      this.setContactSearch({
        sourceName: sourceName,
        searchString: searchString,
        entities: entities,
        ttl: this._ttl
      });
    }
  }, {
    key: "searchResult",
    get: function get() {
      var _this$searching$resul;

      return (_this$searching$resul = this.searching.result) !== null && _this$searching$resul !== void 0 ? _this$searching$resul : [];
    }
  }, {
    key: "sortedResult",
    get: function get() {
      var _this$searching = this.searching,
          _this$searching$resul2 = _this$searching.result,
          result = _this$searching$resul2 === void 0 ? [] : _this$searching$resul2,
          _this$searching$searc = _this$searching.searchString,
          searchString = _this$searching$searc === void 0 ? '' : _this$searching$searc;

      var list = _toConsumableArray(result);

      if (searchString === '') {
        return list;
      }

      return list.sort(function (current, next) {
        var currentName = current.name || '';
        var currentPhoneNumber = current.phoneNumber || '';
        var nextName = next.name || '';
        var nextPhoneNumber = next.phoneNumber || '';
        return nextName.indexOf(searchString) - currentName.indexOf(searchString) + (nextPhoneNumber.indexOf(searchString) - currentPhoneNumber.indexOf(searchString));
      });
    }
  }]);

  return ContactSearch;
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "contactSearch", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "searchStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _contactSearchStatus.contactSearchStatus.idle;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "searching", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return DefaultSearchingState;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setSearchStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setSearchStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setPrepareSearch", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setPrepareSearch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSearchSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setSearchSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setContactSearch", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setContactSearch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cleanUp", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "cleanUp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetContactSearch", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetContactSearch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "debouncedSearch", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "debouncedSearch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "search", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "search"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_searchSource", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_searchSource"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "searchResult", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "searchResult"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sortedResult", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "sortedResult"), _class2.prototype)), _class2)) || _class);
exports.ContactSearch = ContactSearch;
//# sourceMappingURL=ContactSearch.js.map