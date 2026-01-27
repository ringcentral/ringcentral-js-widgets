"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataMatcher = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _ramda = require("ramda");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _class, _descriptor, _descriptor2;
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
var DEFAULT_TTL = 30 * 60 * 1000;
var DEFAULT_NO_MATCH_TTL = 30 * 1000;
var DataMatcher = exports.DataMatcher = (_dec = Reflect.metadata("design:type", typeof MatchData === "undefined" ? Object : MatchData), _dec2 = Reflect.metadata("design:type", Array), _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [Array]), _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [String]), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [typeof InsertMatchEntriesOptions === "undefined" ? Object : InsertMatchEntriesOptions]), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", []), _dec1 = (0, _nextCore.delegate)('server'), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", [void 0]), _dec12 = (0, _nextCore.delegate)('server'), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [typeof MatchOptions === "undefined" ? Object : MatchOptions]), _dec15 = (0, _nextCore.delegate)('server'), _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", [typeof MatchSourceOptions === "undefined" ? Object : MatchSourceOptions]), _dec18 = (0, _nextCore.delegate)('server'), _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", [typeof InsertMatchEntriesOptions === "undefined" ? Object : InsertMatchEntriesOptions]), _dec21 = (0, _nextCore.computed)(function (_ref) {
  var data = _ref.data,
    ready = _ref.ready,
    searchProviderNames = _ref.searchProviderNames;
  return [data, ready, searchProviderNames];
}), _dec22 = Reflect.metadata("design:type", Function), _dec23 = Reflect.metadata("design:paramtypes", []), _class = /*#__PURE__*/function (_RcModule) {
  function DataMatcher(_storage) {
    var _this$_storage;
    var _this;
    _classCallCheck(this, DataMatcher);
    _this = _callSuper(this, DataMatcher);
    _this._storage = _storage;
    _this._querySources = new Map();
    _this._searchProviders = new Map();
    _this._matchPromises = new Map();
    _this._matchQueues = new Map();
    _this._lastCleanUp = 0;
    _initializerDefineProperty(_this, "data", _descriptor, _this);
    _initializerDefineProperty(_this, "searchProviderNames", _descriptor2, _this);
    (_this$_storage = _this._storage) === null || _this$_storage === void 0 ? void 0 : _this$_storage.enable(_this);
    return _this;
  }
  _inherits(DataMatcher, _RcModule);
  return _createClass(DataMatcher, [{
    key: "_updateSearchProviderNames",
    value: function _updateSearchProviderNames(names) {
      this.searchProviderNames = names;
    }
  }, {
    key: "_addSearchProviderName",
    value: function _addSearchProviderName(name) {
      this.searchProviderNames.push(name);
    }
  }, {
    key: "_ttl",
    get: function get() {
      var _this$dataMatcherOpti, _this$dataMatcherOpti2;
      return (_this$dataMatcherOpti = (_this$dataMatcherOpti2 = this.dataMatcherOptions) === null || _this$dataMatcherOpti2 === void 0 ? void 0 : _this$dataMatcherOpti2.ttl) !== null && _this$dataMatcherOpti !== void 0 ? _this$dataMatcherOpti : DEFAULT_TTL;
    }
  }, {
    key: "_noMatchTtl",
    get: function get() {
      var _this$dataMatcherOpti3, _this$dataMatcherOpti4;
      return (_this$dataMatcherOpti3 = (_this$dataMatcherOpti4 = this.dataMatcherOptions) === null || _this$dataMatcherOpti4 === void 0 ? void 0 : _this$dataMatcherOpti4.noMatchTtl) !== null && _this$dataMatcherOpti3 !== void 0 ? _this$dataMatcherOpti3 : DEFAULT_NO_MATCH_TTL;
    }
  }, {
    key: "onReset",
    value: function onReset() {
      this._lastCleanUp = 0;
    }
  }, {
    key: "onInit",
    value: function onInit() {
      this._updateSearchProviderNames(_toConsumableArray(this._searchProviders.keys()));
    }
  }, {
    key: "_getQueries",
    value: function _getQueries() {
      var output = new Set();
      this._querySources.forEach(function (readyCheckFn, getQueriesFn) {
        if (readyCheckFn()) {
          getQueriesFn().forEach(function (query) {
            output.add(query);
          });
        }
      });
      return _toConsumableArray(output);
    }
  }, {
    key: "insertMatchEntries",
    value: function insertMatchEntries(_ref2) {
      var _this2 = this;
      var name = _ref2.name,
        queries = _ref2.queries,
        data = _ref2.data;
      var timestamp = Date.now();
      queries.forEach(function (query) {
        var _this2$data$query, _data$query;
        _this2.data[query] = (_this2$data$query = _this2.data[query]) !== null && _this2$data$query !== void 0 ? _this2$data$query : {};
        _this2.data[query][name] = {
          _t: timestamp,
          // for noMatchTtl check
          data: (_data$query = data[query]) !== null && _data$query !== void 0 ? _data$query : []
        };
      });
    }
  }, {
    key: "_cleanUp",
    value: function _cleanUp() {
      var _this3 = this;
      // throttle clean up to only run once every 100ms
      var now = Date.now();
      if (now - this._lastCleanUp > 100) {
        this._lastCleanUp = now;
        Object.keys(this.data).forEach(function (query) {
          Object.keys(_this3.data[query]).forEach(function (name) {
            if (!_this3.data[query][name]._t) {
              // mark for deletion
              _this3.data[query][name]._t = now;
            } else if (now - _this3.data[query][name]._t > _this3._ttl) {
              // expired yet
              // entry is removed
              delete _this3.data[query][name];
            }
          });
        });
      }
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(_superPropGet(DataMatcher, "_shouldInit", this, 3)([]) && this.searchProvidersReady);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(_superPropGet(DataMatcher, "_shouldReset", this, 3)([]) || this.ready && !this.searchProvidersReady);
    }
  }, {
    key: "searchProvidersReady",
    get: function get() {
      return (0, _ramda.all)(function (_ref3) {
        var readyCheckFn = _ref3.readyCheckFn;
        return readyCheckFn();
      }, _toConsumableArray(this._searchProviders.values()));
    }
  }, {
    key: "addSearchProvider",
    value: function addSearchProvider(_ref4) {
      var name = _ref4.name,
        searchFn = _ref4.searchFn,
        readyCheckFn = _ref4.readyCheckFn;
      if (!name) {
        throw new Error("".concat(this.constructor.name, ": \"name\" is required."));
      }
      if (this._searchProviders.has(name)) {
        throw new Error("".concat(this.constructor.name, ": A provider named \"").concat(name, "\" already exists."));
      }
      if (typeof searchFn !== 'function') {
        throw new Error("".concat(this.constructor.name, ": \"searchFn\" must be a function."));
      }
      if (typeof readyCheckFn !== 'function') {
        throw new Error("".concat(this.constructor.name, ": \"readyCheckFn\" must be a function."));
      }
      this._searchProviders.set(name, {
        searchFn: searchFn,
        readyCheckFn: readyCheckFn
      });
      if (this.ready) {
        this._addSearchProviderName(name);
      }
    }
  }, {
    key: "addQuerySource",
    value: function addQuerySource(_ref5) {
      var getQueriesFn = _ref5.getQueriesFn,
        readyCheckFn = _ref5.readyCheckFn;
      if (typeof getQueriesFn !== 'function') {
        throw new Error("".concat(this.constructor.name, ": \"getQueriesFn\" must be a function."));
      }
      if (typeof readyCheckFn !== 'function') {
        throw new Error("".concat(this.constructor.name, ": \"readyCheckFn\" must be a function."));
      }
      if (this._querySources.has(getQueriesFn)) {
        throw new Error("".concat(this.constructor.name, ": this getQueryFn has already been added."));
      }
      this._querySources.set(getQueriesFn, readyCheckFn);
    }
  }, {
    key: "triggerMatch",
    value: function () {
      var _triggerMatch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _ref6,
          _ref6$ignoreCache,
          ignoreCache,
          _ref6$ignoreQueue,
          ignoreQueue,
          _args = arguments;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _ref6 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, _ref6$ignoreCache = _ref6.ignoreCache, ignoreCache = _ref6$ignoreCache === void 0 ? false : _ref6$ignoreCache, _ref6$ignoreQueue = _ref6.ignoreQueue, ignoreQueue = _ref6$ignoreQueue === void 0 ? false : _ref6$ignoreQueue;
              if (!this.ready) {
                _context.n = 1;
                break;
              }
              this._cleanUp();
              _context.n = 1;
              return this.match({
                queries: this._getQueries(),
                ignoreCache: ignoreCache,
                ignoreQueue: ignoreQueue
              });
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function triggerMatch() {
        return _triggerMatch.apply(this, arguments);
      }
      return triggerMatch;
    }()
  }, {
    key: "match",
    value: function () {
      var _match = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_ref7) {
        var _this4 = this;
        var queries, _ref7$ignoreCache, ignoreCache, _ref7$ignoreQueue, ignoreQueue;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              queries = _ref7.queries, _ref7$ignoreCache = _ref7.ignoreCache, ignoreCache = _ref7$ignoreCache === void 0 ? false : _ref7$ignoreCache, _ref7$ignoreQueue = _ref7.ignoreQueue, ignoreQueue = _ref7$ignoreQueue === void 0 ? false : _ref7$ignoreQueue;
              _context2.n = 1;
              return Promise.all(_toConsumableArray(this._searchProviders.keys()).map(function (name) {
                return _this4._matchSource({
                  name: name,
                  queries: queries,
                  ignoreCache: ignoreCache,
                  ignoreQueue: ignoreQueue
                });
              }));
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function match(_x) {
        return _match.apply(this, arguments);
      }
      return match;
    }()
  }, {
    key: "_fetchMatchResult",
    value: function () {
      var _fetchMatchResult2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(_ref8) {
        var name, queries, provider, promise, data, _t;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              name = _ref8.name, queries = _ref8.queries;
              _context3.p = 1;
              provider = this._searchProviders.get(name);
              if (provider) {
                _context3.n = 2;
                break;
              }
              throw new Error("".concat(this.constructor.name, ": provider named \"").concat(name, " does not exist"));
            case 2:
              promise = Promise.resolve(provider.searchFn({
                queries: queries
              }));
              this._matchPromises.set(name, {
                promise: promise,
                queries: queries
              });
              _context3.n = 3;
              return promise;
            case 3:
              data = _context3.v;
              this._matchPromises["delete"](name);
              this.insertMatchEntries({
                name: name,
                queries: queries,
                data: data
              });
              _context3.n = 5;
              break;
            case 4:
              _context3.p = 4;
              _t = _context3.v;
              this._matchPromises["delete"](name);
              throw _t;
            case 5:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 4]]);
      }));
      function _fetchMatchResult(_x2) {
        return _fetchMatchResult2.apply(this, arguments);
      }
      return _fetchMatchResult;
    }()
  }, {
    key: "_matchSource",
    value: function () {
      var _matchSource2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(_ref9) {
        var _this5 = this;
        var name, queries, ignoreCache, ignoreQueue, now, data, queuedItems, promises, matching, queue, newQueries, promise;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              name = _ref9.name, queries = _ref9.queries, ignoreCache = _ref9.ignoreCache, ignoreQueue = _ref9.ignoreQueue;
              now = Date.now();
              data = this.data;
              queuedItems = {};
              promises = [];
              if (!ignoreQueue && this._matchPromises.has(name)) {
                matching = this._matchPromises.get(name);
                promises.push(matching.promise);
                matching.queries.forEach(function (item) {
                  queuedItems[item] = true;
                });
              }
              if (!ignoreQueue && this._matchQueues.has(name)) {
                queue = this._matchQueues.get(name);
                promises.push(queue.promise);
                queue.queries.forEach(function (item) {
                  queuedItems[item] = true;
                });
              }
              newQueries = ignoreCache ? queries : (0, _ramda.filter)(function (query) {
                return !queuedItems[query] && (!data[query] || !data[query][name] || now - data[query][name]._t > _this5._noMatchTtl);
              }, queries);
              if (newQueries.length) {
                if (ignoreQueue) {
                  promises.push(this._fetchMatchResult({
                    name: name,
                    queries: newQueries
                  }));
                } else if (!matching) {
                  matching = {
                    promise: this._fetchMatchResult({
                      name: name,
                      queries: newQueries
                    }),
                    queries: newQueries
                  };
                  promises.push(matching.promise);
                } else if (!queue) {
                  promise = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
                    var promise;
                    return _regenerator().w(function (_context4) {
                      while (1) switch (_context4.n) {
                        case 0:
                          _context4.n = 1;
                          return matching.promise;
                        case 1:
                          promise = _this5._fetchMatchResult({
                            name: name,
                            queries: queue.queries
                          });
                          _this5._matchQueues["delete"](name);
                          _context4.n = 2;
                          return promise;
                        case 2:
                          return _context4.a(2);
                      }
                    }, _callee4);
                  }))();
                  queue = {
                    queries: newQueries,
                    promise: promise
                  };
                  this._matchQueues.set(name, queue);
                  promises.push(queue.promise);
                } else {
                  queue.queries = queue.queries.concat(newQueries);
                }
              }
              _context5.n = 1;
              return Promise.all(promises);
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function _matchSource(_x3) {
        return _matchSource2.apply(this, arguments);
      }
      return _matchSource;
    }()
    /**
     * insert matching result directly
     */
  }, {
    key: "insertMatching",
    value: (function () {
      var _insertMatching = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(_ref1) {
        var name, data, queries;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              name = _ref1.name, data = _ref1.data, queries = _ref1.queries;
              this.insertMatchEntries({
                data: data,
                queries: queries,
                name: name
              });
            case 1:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function insertMatching(_x4) {
        return _insertMatching.apply(this, arguments);
      }
      return insertMatching;
    }())
  }, {
    key: "dataMapping",
    get: function get() {
      if (!this.ready || !this.searchProviderNames.length) return {};
      var dataMap = {};
      for (var query in this.data) {
        var queryResult = this.data[query];
        if (!queryResult) {
          continue;
        }
        var matchesList = [];
        var _iterator = _createForOfIteratorHelper(this.searchProviderNames),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var providerName = _step.value;
            if (queryResult[providerName] && queryResult[providerName].data.length > 0) {
              matchesList = matchesList.concat(queryResult[providerName].data);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        if (matchesList.length > 0) {
          dataMap[query] = matchesList;
        }
      }
      return dataMap;
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class.prototype, "data", [_nextCore.userStorage, _nextCore.state, _dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "searchProviderNames", [_nextCore.state, _dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class.prototype, "_updateSearchProviderNames", [_nextCore.action, _dec3, _dec4], Object.getOwnPropertyDescriptor(_class.prototype, "_updateSearchProviderNames"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_addSearchProviderName", [_nextCore.action, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class.prototype, "_addSearchProviderName"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "insertMatchEntries", [_nextCore.action, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class.prototype, "insertMatchEntries"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_cleanUp", [_nextCore.action, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class.prototype, "_cleanUp"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "triggerMatch", [_dec1, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class.prototype, "triggerMatch"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "match", [_dec12, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class.prototype, "match"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_matchSource", [_dec15, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class.prototype, "_matchSource"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "insertMatching", [_dec18, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class.prototype, "insertMatching"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "dataMapping", [_dec21, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class.prototype, "dataMapping"), _class.prototype), _class);
//# sourceMappingURL=DataMatcher.js.map
