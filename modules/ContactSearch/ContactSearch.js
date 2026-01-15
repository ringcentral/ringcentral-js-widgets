"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultSearchingState = exports.DefaultMinimalSearchLength = exports.ContactSearch = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.search.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.timers.js");
var _core = require("@ringcentral-integration/core");
var _ramda = require("ramda");
var _uuid = require("uuid");
var _debounceThrottle = require("../../lib/debounce-throttle");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _contactSearchStatus = require("./contactSearchStatus");
var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var DefaultMinimalSearchLength = exports.DefaultMinimalSearchLength = 3;
var DefaultSearchingState = exports.DefaultSearchingState = {
  searchOnSources: [],
  searchString: '',
  result: []
};
var ContactSearch = exports.ContactSearch = (_dec = (0, _di.Module)({
  name: 'ContactSearch',
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
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function ContactSearch(deps) {
    var _deps$contactSearchOp, _deps$contactSearchOp2, _this$_deps$contactSe, _this$_deps$contactSe2, _this$_deps$contactSe3, _this$_deps$contactSe4;
    var _this;
    _classCallCheck(this, ContactSearch);
    _this = _callSuper(this, ContactSearch, [{
      deps: deps,
      storageKey: 'ContactSearch',
      enableCache: (_deps$contactSearchOp = (_deps$contactSearchOp2 = deps.contactSearchOptions) === null || _deps$contactSearchOp2 === void 0 ? void 0 : _deps$contactSearchOp2.enableCache) !== null && _deps$contactSearchOp !== void 0 ? _deps$contactSearchOp : true
    }]);
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
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
    _this._timeoutId = null;
    _initializerDefineProperty(_this, "contactSearch", _descriptor, _this);
    _initializerDefineProperty(_this, "searchStatus", _descriptor2, _this);
    _initializerDefineProperty(_this, "searching", _descriptor3, _this);
    return _this;
  }
  _inherits(ContactSearch, _RcModuleV);
  return _createClass(ContactSearch, [{
    key: "setSearchStatus",
    value: function setSearchStatus(searchStatus) {
      this.searchStatus = searchStatus;
    }
  }, {
    key: "clearAndReset",
    value: function clearAndReset() {
      this.cleanUp();
      this.searchStatus = _contactSearchStatus.contactSearchStatus.idle;
      if (this._debouncedSearchFn) {
        this._debouncedSearchFn.cancel();
      }
    }
  }, {
    key: "setPrepareSearch",
    value: function setPrepareSearch() {
      this.searchStatus = _contactSearchStatus.contactSearchStatus.prepareSearching;
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
      return !!(_superPropGet(ContactSearch, "_shouldInit", this, 3)([]) && this._deps.auth.loggedIn && this._readyCheck());
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(_superPropGet(ContactSearch, "_shouldReset", this, 3)([]) || this.ready && !this._deps.auth.loggedIn);
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
      var _debouncedSearch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref6) {
        var searchString;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              searchString = _ref6.searchString;
              this._debouncedSearchFn({
                searchString: searchString
              });
            case 1:
              return _context.a(2);
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
      var _search = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(_ref7) {
        var _this4 = this;
        var searchString, searchOnSources, _i, _searchOnSources, sourceName;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              searchString = _ref7.searchString;
              if (!(!this.ready || !searchString || searchString.length < this._minimalSearchLength)) {
                _context3.n = 1;
                break;
              }
              this.setPrepareSearch();
              return _context3.a(2);
            case 1:
              this._clearTimeout();
              this._timeoutId = setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
                var searching;
                return _regenerator().w(function (_context2) {
                  while (1) switch (_context2.n) {
                    case 0:
                      searching = _objectSpread({}, _this4.searching); // @ts-expect-error TS(2322): Type 'undefined' is not assignable to type 'string... Remove this comment to see the full error message
                      _context2.n = 1;
                      return _this4.search({
                        searchString: undefined
                      });
                    case 1:
                      _context2.n = 2;
                      return _this4.search(searching);
                    case 2:
                      return _context2.a(2);
                  }
                }, _callee2);
              })), this._ttl);
              searchOnSources = Array.from(this._searchSources.keys());
              _i = 0, _searchOnSources = searchOnSources;
            case 2:
              if (!(_i < _searchOnSources.length)) {
                _context3.n = 4;
                break;
              }
              sourceName = _searchOnSources[_i];
              _context3.n = 3;
              return this._searchSource({
                searchOnSources: searchOnSources,
                sourceName: sourceName,
                searchString: searchString
              });
            case 3:
              _i++;
              _context3.n = 2;
              break;
            case 4:
              this.setSearchStatus(_contactSearchStatus.contactSearchStatus.idle);
            case 5:
              return _context3.a(2);
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
    }

    // TODO: Need to refactor, remove cache, and update data in real time.
  }, {
    key: "_searchSource",
    value: function () {
      var _searchSource2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(_ref9) {
        var searchOnSources, sourceName, searchString, searchId, entities, searchFn, formatFn, _t;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              searchOnSources = _ref9.searchOnSources, sourceName = _ref9.sourceName, searchString = _ref9.searchString;
              searchId = (0, _uuid.v4)();
              this._searchIds[sourceName] = searchId;
              this.setSearchStatus(_contactSearchStatus.contactSearchStatus.searching);
              _context4.p = 1;
              // search cache
              // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Entities'.
              entities = null; // @ts-expect-error TS(2322): Type 'Entities | null' is not assignable to type '... Remove this comment to see the full error message
              entities = this._searchFromCache({
                sourceName: sourceName,
                searchString: searchString
              });
              if (!entities) {
                _context4.n = 2;
                break;
              }
              this._loadSearching({
                searchOnSources: searchOnSources,
                searchString: searchString,
                entities: entities
              });
              return _context4.a(2);
            case 2:
              // search source
              searchFn = this._searchSources.get(sourceName); // @ts-expect-error TS(2322): Type 'Entities | null' is not assignable to type '... Remove this comment to see the full error message
              _context4.n = 3;
              return searchFn({
                searchString: searchString
              });
            case 3:
              entities = _context4.v;
              // format result
              formatFn = this._searchSourcesFormat.get(sourceName); // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
              entities = formatFn(entities);
              // save result
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
              _context4.n = 5;
              break;
            case 4:
              _context4.p = 4;
              _t = _context4.v;
              this._onSearchError();
            case 5:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 4]]);
      }));
      function _searchSource(_x3) {
        return _searchSource2.apply(this, arguments);
      }
      return _searchSource;
    }()
  }, {
    key: "_searchFromCache",
    value: function _searchFromCache(_ref0) {
      var sourceName = _ref0.sourceName,
        searchString = _ref0.searchString;
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
          // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
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
    value: function _loadSearching(_ref1) {
      var searchOnSources = _ref1.searchOnSources,
        searchString = _ref1.searchString,
        entities = _ref1.entities;
      this.setSearchSuccess({
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
  }, {
    key: "minimalSearchLength",
    get: function get() {
      return this._minimalSearchLength;
    }
  }, {
    key: "isIdle",
    get: function get() {
      return this.searchStatus === _contactSearchStatus.contactSearchStatus.idle;
    }
  }, {
    key: "isSearching",
    get: function get() {
      return this.searchStatus === _contactSearchStatus.contactSearchStatus.searching;
    }
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "contactSearch", [_core.storage, _core.state], {
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
}), _applyDecoratedDescriptor(_class2.prototype, "setSearchStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setSearchStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearAndReset", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "clearAndReset"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setPrepareSearch", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setPrepareSearch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSearchSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setSearchSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setContactSearch", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setContactSearch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cleanUp", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "cleanUp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetContactSearch", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetContactSearch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "debouncedSearch", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "debouncedSearch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "search", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "search"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_searchSource", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_searchSource"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "searchResult", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "searchResult"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sortedResult", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "sortedResult"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=ContactSearch.js.map
