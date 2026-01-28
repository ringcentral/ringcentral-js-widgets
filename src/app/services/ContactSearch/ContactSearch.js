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
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactSearch = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.search.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.timers.js");
var _debounceThrottle = require("@ringcentral-integration/commons/lib/debounce-throttle");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _ramda = require("ramda");
var _rxjs = require("rxjs");
var _uuid = require("uuid");
var _contactSearchStatus = require("./contactSearchStatus");
var _helper = require("./helper");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
var DefaultMinimalSearchLength = 3;
var DEFAULT_CONTACT_SEARCH_CACHE_TTL = 5 * 60 * 1000;
var SEARCH_DEBOUNCE_TIME = 800;
var DefaultSearchingState = {
  searchOnSources: [],
  searchString: '',
  result: []
};
var ContactSearch = exports.ContactSearch = (_dec = (0, _nextCore.injectable)({
  name: 'ContactSearch'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('ContactSearchOptions')(target, undefined, 2);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _services.Auth === "undefined" ? Object : _services.Auth, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof ContactSearchOptions === "undefined" ? Object : ContactSearchOptions]), _dec5 = Reflect.metadata("design:type", Object), _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [Object]), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", [String]), _dec0 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", [typeof SetContactSearchOptions === "undefined" ? Object : SetContactSearchOptions]), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", []), _dec13 = (0, _nextCore.delegate)('server'), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", [typeof SearchStringOptions === "undefined" ? Object : SearchStringOptions]), _dec16 = (0, _nextCore.delegate)('server'), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", [typeof SearchStringOptions === "undefined" ? Object : SearchStringOptions]), _dec19 = Reflect.metadata("design:type", typeof Searching === "undefined" ? Object : Searching), _dec20 = Reflect.metadata("design:type", Function), _dec21 = Reflect.metadata("design:paramtypes", []), _dec22 = Reflect.metadata("design:type", Function), _dec23 = Reflect.metadata("design:paramtypes", []), _dec24 = (0, _nextCore.delegate)('server'), _dec25 = Reflect.metadata("design:type", Function), _dec26 = Reflect.metadata("design:paramtypes", []), _dec27 = Reflect.metadata("design:type", Function), _dec28 = Reflect.metadata("design:paramtypes", [typeof SetSearchSuccessOptions === "undefined" ? Object : SetSearchSuccessOptions]), _dec29 = Reflect.metadata("design:type", Function), _dec30 = Reflect.metadata("design:paramtypes", [typeof SetContactSearchOptions === "undefined" ? Object : SetContactSearchOptions]), _dec31 = (0, _nextCore.delegate)('server'), _dec32 = Reflect.metadata("design:type", Function), _dec33 = Reflect.metadata("design:paramtypes", [typeof SearchStringOptions === "undefined" ? Object : SearchStringOptions]), _dec34 = (0, _nextCore.delegate)('server'), _dec35 = Reflect.metadata("design:type", Function), _dec36 = Reflect.metadata("design:paramtypes", [typeof SearchSourceOptions === "undefined" ? Object : SearchSourceOptions]), _dec37 = (0, _nextCore.computed)(function (_ref) {
  var searching = _ref.searching;
  return [searching.result];
}), _dec38 = Reflect.metadata("design:type", Function), _dec39 = Reflect.metadata("design:paramtypes", []), _dec40 = (0, _nextCore.computed)(function (_ref2) {
  var searching = _ref2.searching;
  return [searching];
}), _dec41 = Reflect.metadata("design:type", Function), _dec42 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function ContactSearch(_auth, _portManager, _contactSearchOptions) {
    var _this$_contactSearchO, _this$_contactSearchO2, _this$_contactSearchO3, _this$_contactSearchO4;
    var _this;
    _classCallCheck(this, ContactSearch);
    _this = _callSuper(this, ContactSearch);
    _this._auth = _auth;
    _this._portManager = _portManager;
    _this._contactSearchOptions = _contactSearchOptions;
    // #region spring-ui projects
    _this._searchSources = new Map();
    _this._searchSourcesFormat = new Map();
    _this._searchSourcesCheck = new Map();
    _this._ttl = (_this$_contactSearchO = (_this$_contactSearchO2 = _this._contactSearchOptions) === null || _this$_contactSearchO2 === void 0 ? void 0 : _this$_contactSearchO2.ttl) !== null && _this$_contactSearchO !== void 0 ? _this$_contactSearchO : DEFAULT_CONTACT_SEARCH_CACHE_TTL;
    _this._minimalSearchLength = (_this$_contactSearchO3 = (_this$_contactSearchO4 = _this._contactSearchOptions) === null || _this$_contactSearchO4 === void 0 ? void 0 : _this$_contactSearchO4.minimalSearchLength) !== null && _this$_contactSearchO3 !== void 0 ? _this$_contactSearchO3 : DefaultMinimalSearchLength;
    _initializerDefineProperty(_this, "searchParams", _descriptor, _this);
    _initializerDefineProperty(_this, "searchStatus", _descriptor2, _this);
    _initializerDefineProperty(_this, "contactSearch", _descriptor3, _this);
    // #endregion
    /**
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *  TODO: below all code is old projects, need to remove when all projects migrate to spring-ui
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     */
    // #region non spring-ui projects
    _this._searchIds = {};
    _this._debouncedSearchFn = (0, _debounceThrottle.debounce)({
      fn: _this.search,
      threshold: 800
    });
    _this._timeoutId = null;
    _initializerDefineProperty(_this, "searching", _descriptor4, _this);
    if (process.env.THEME_SYSTEM === 'spring-ui') {
      if (_this._portManager.shared) {
        _this._portManager.onServer(function () {
          _this.listenSearch();
        });
      } else {
        _this.listenSearch();
      }
    }
    return _this;
  }
  _inherits(ContactSearch, _RcModule);
  return _createClass(ContactSearch, [{
    key: "setSearchParams",
    value: function setSearchParams(val) {
      Object.assign(this.searchParams, val);
    }
  }, {
    key: "setSearchStatus",
    value: function setSearchStatus(searchStatus) {
      this.searchStatus = searchStatus;
    }
  }, {
    key: "_setContactSearch",
    value: function _setContactSearch(_ref3) {
      var sourceName = _ref3.sourceName,
        searchString = _ref3.searchString,
        entities = _ref3.entities;
      var key = "".concat(sourceName, "-").concat(searchString);
      this.contactSearch[key] = {
        entities: entities,
        timestamp: Date.now()
      };
    }
  }, {
    key: "cleanUp",
    value: function cleanUp() {
      this.contactSearch = {};
      if (process.env.THEME_SYSTEM !== 'spring-ui') {
        this.searching = DefaultSearchingState;
      }
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
  }, {
    key: "listenSearch",
    value: function listenSearch() {
      var _this2 = this;
      (0, _rxjs.merge)((0, _nextCore.fromWatch)(this, function () {
        return _this2.searchParams;
      }).pipe((0, _rxjs.switchMap)(function (params) {
        var content = params.content,
          debounceTime = params.debounceTime;
        if (!content || content.length < _this2._minimalSearchLength) {
          return (0, _rxjs.of)(false);
        }
        _this2.logger.log('ContactSearch: searching');
        _this2.setSearchStatus(_contactSearchStatus.contactSearchStatus.searching);
        return debounceTime ? (0, _rxjs.timer)(debounceTime).pipe((0, _rxjs.map)(function () {
          return params;
        })) : (0, _rxjs.of)(params);
      }), (0, _rxjs.switchMap)(function (params) {
        if (typeof params !== 'boolean') {
          var content = params.content;
          return (0, _rxjs.defer)(function () {
            return Promise.all(Array.from(_this2._searchSources.keys()).map(function (sourceName) {
              return _this2._execSearchSource({
                sourceName: sourceName,
                searchString: content
              });
            }));
          });
        }
        return (0, _rxjs.of)(null);
      }),
      // use observable to handle async operations to cancel the search result write back
      (0, _rxjs.tap)(function (result) {
        if (result !== null) _this2.logger.log('ContactSearch: search completed');
        if (_this2.searchStatus !== _contactSearchStatus.contactSearchStatus.idle) {
          _this2.logger.log('ContactSearch: idle');
          _this2.setSearchStatus(_contactSearchStatus.contactSearchStatus.idle);
        }
      }), _nextCore.takeUntilAppDestroy)
      // this._auth.beforeLogout$.pipe(tap(() => this.cleanUp())),
      ).subscribe();
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(_superPropGet(ContactSearch, "_shouldInit", this, 3)([]) && this._auth.loggedIn && this._readyCheck());
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(_superPropGet(ContactSearch, "_shouldReset", this, 3)([]) || this.ready && !this._auth.loggedIn);
    }
  }, {
    key: "addSearchSource",
    value: function addSearchSource(_ref4) {
      var sourceName = _ref4.sourceName,
        searchFn = _ref4.searchFn,
        readyCheckFn = _ref4.readyCheckFn,
        formatFn = _ref4.formatFn;
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
      var _debouncedSearch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref5) {
        var searchString;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              searchString = _ref5.searchString;
              if (process.env.THEME_SYSTEM === 'spring-ui') {
                this.setSearchParams({
                  content: searchString || '',
                  debounceTime: SEARCH_DEBOUNCE_TIME
                });
              } else {
                this._debouncedSearchFn({
                  searchString: searchString
                });
              }
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
      var _search2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_ref6) {
        var searchString;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              searchString = _ref6.searchString;
              if (process.env.THEME_SYSTEM === 'spring-ui') {
                this.setSearchParams({
                  content: searchString || '',
                  debounceTime: 0
                });
              } else {
                this._search({
                  searchString: searchString
                });
              }
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function search(_x2) {
        return _search2.apply(this, arguments);
      }
      return search;
    }()
  }, {
    key: "_execSearchSource",
    value: function () {
      var _execSearchSource2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(_ref7) {
        var sourceName, searchString, expired, entities, searchFn, formatFn, _t;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              sourceName = _ref7.sourceName, searchString = _ref7.searchString;
              _context3.p = 1;
              expired = this.isContactSearchExpired({
                sourceName: sourceName,
                searchString: searchString
              });
              if (expired) {
                _context3.n = 2;
                break;
              }
              return _context3.a(2);
            case 2:
              entities = null; // search source
              searchFn = this._searchSources.get(sourceName);
              _context3.n = 3;
              return searchFn({
                searchString: searchString
              });
            case 3:
              entities = _context3.v;
              // format result
              formatFn = this._searchSourcesFormat.get(sourceName);
              entities = formatFn(entities);
              // save result
              this._setContactSearch({
                sourceName: sourceName,
                searchString: searchString,
                entities: entities,
                ttl: this._ttl
              });
              _context3.n = 5;
              break;
            case 4:
              _context3.p = 4;
              _t = _context3.v;
              this.logger.error("ContactSearch: search source ".concat(sourceName, " failed"), _t);
            case 5:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 4]]);
      }));
      function _execSearchSource(_x3) {
        return _execSearchSource2.apply(this, arguments);
      }
      return _execSearchSource;
    }()
  }, {
    key: "isContactSearchExpired",
    value: function isContactSearchExpired(_ref8) {
      var sourceName = _ref8.sourceName,
        searchString = _ref8.searchString;
      var key = "".concat(sourceName, "-").concat(searchString);
      var searching = this.contactSearch[key];
      if (searching && Date.now() - searching.timestamp < this._ttl) {
        return false;
      }
      return true;
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
    key: "triggerPrepareSearch",
    value: function () {
      var _triggerPrepareSearch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              this.setPrepareSearch();
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function triggerPrepareSearch() {
        return _triggerPrepareSearch.apply(this, arguments);
      }
      return triggerPrepareSearch;
    }()
  }, {
    key: "setSearchSuccess",
    value: function setSearchSuccess(_ref9) {
      var _this3 = this;
      var searchOnSources = _ref9.searchOnSources,
        searchString = _ref9.searchString,
        entities = _ref9.entities;
      if (this.searching.searchString === searchString && (0, _ramda.sortBy)(_ramda.identity)(this.searching.searchOnSources).join(',') === (0, _ramda.sortBy)(_ramda.identity)(searchOnSources).join(',')) {
        var resultMap = {};
        this.searching.result.forEach(function (item) {
          resultMap[item.id] = true;
        });
        entities.forEach(function (item) {
          if (!resultMap[item.id]) {
            _this3.searching.result.push(item);
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
    value: function setContactSearch(_ref0) {
      var _this4 = this;
      var sourceName = _ref0.sourceName,
        searchString = _ref0.searchString,
        entities = _ref0.entities,
        ttl = _ref0.ttl;
      var data = {};
      Object.keys(this.contactSearch).forEach(function (key) {
        if (Date.now() - _this4.contactSearch[key].timestamp < ttl) {
          data[key] = _this4.contactSearch[key];
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
    key: "onReset",
    value: function onReset() {
      if (process.env.THEME_SYSTEM === 'spring-ui') return;
      this.cleanUp();
      if (this._debouncedSearchFn) {
        this._debouncedSearchFn.cancel();
      }
    }
  }, {
    key: "_search",
    value: function () {
      var _search3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(_ref1) {
        var _this5 = this;
        var searchString, searchOnSources, _i, _searchOnSources, sourceName;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              searchString = _ref1.searchString;
              if (!(!searchString || searchString.length < this._minimalSearchLength)) {
                _context6.n = 1;
                break;
              }
              this.setPrepareSearch();
              return _context6.a(2, []);
            case 1:
              this._clearTimeout();
              this._timeoutId = setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
                var searching;
                return _regenerator().w(function (_context5) {
                  while (1) switch (_context5.n) {
                    case 0:
                      searching = _objectSpread({}, _this5.searching);
                      _context5.n = 1;
                      return _this5.search({
                        searchString: undefined
                      });
                    case 1:
                      _context5.n = 2;
                      return _this5.search(searching);
                    case 2:
                      return _context5.a(2);
                  }
                }, _callee5);
              })), this._ttl);
              searchOnSources = Array.from(this._searchSources.keys());
              _i = 0, _searchOnSources = searchOnSources;
            case 2:
              if (!(_i < _searchOnSources.length)) {
                _context6.n = 4;
                break;
              }
              sourceName = _searchOnSources[_i];
              _context6.n = 3;
              return this._searchSource({
                searchOnSources: searchOnSources,
                sourceName: sourceName,
                searchString: searchString
              });
            case 3:
              _i++;
              _context6.n = 2;
              break;
            case 4:
              this.setSearchStatus(_contactSearchStatus.contactSearchStatus.idle);
              return _context6.a(2, this.sortedResult);
          }
        }, _callee6, this);
      }));
      function _search(_x4) {
        return _search3.apply(this, arguments);
      }
      return _search;
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
      var _searchSource2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(_ref11) {
        var searchOnSources, sourceName, searchString, searchId, entities, searchFn, formatFn, _t2;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              searchOnSources = _ref11.searchOnSources, sourceName = _ref11.sourceName, searchString = _ref11.searchString;
              searchId = (0, _uuid.v4)();
              this._searchIds[sourceName] = searchId;
              this.setSearchStatus(_contactSearchStatus.contactSearchStatus.searching);
              _context7.p = 1;
              // search cache
              entities = null;
              entities = this._searchFromCache({
                sourceName: sourceName,
                searchString: searchString
              });
              if (!entities) {
                _context7.n = 2;
                break;
              }
              this._loadSearching({
                searchOnSources: searchOnSources,
                searchString: searchString,
                entities: entities
              });
              return _context7.a(2);
            case 2:
              // search source
              searchFn = this._searchSources.get(sourceName);
              _context7.n = 3;
              return searchFn({
                searchString: searchString
              });
            case 3:
              entities = _context7.v;
              // format result
              formatFn = this._searchSourcesFormat.get(sourceName);
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
              _context7.n = 5;
              break;
            case 4:
              _context7.p = 4;
              _t2 = _context7.v;
              this._onSearchError();
            case 5:
              return _context7.a(2);
          }
        }, _callee7, this, [[1, 4]]);
      }));
      function _searchSource(_x5) {
        return _searchSource2.apply(this, arguments);
      }
      return _searchSource;
    }()
  }, {
    key: "_searchFromCache",
    value: function _searchFromCache(_ref12) {
      var sourceName = _ref12.sourceName,
        searchString = _ref12.searchString;
      var key = "".concat(sourceName, "-").concat(searchString);
      var searching = this.contactSearch[key];
      var now = Date.now();
      if (searching && now - searching.timestamp < this._ttl) {
        return searching.entities;
      }
      return null;
    }
  }, {
    key: "_onSearchError",
    value: function _onSearchError() {
      this.setPrepareSearch();
    }
  }, {
    key: "_loadSearching",
    value: function _loadSearching(_ref13) {
      var searchOnSources = _ref13.searchOnSources,
        searchString = _ref13.searchString,
        entities = _ref13.entities;
      this.setSearchSuccess({
        searchOnSources: searchOnSources,
        searchString: searchString,
        entities: entities
      });
    }
  }, {
    key: "_saveSearching",
    value: function _saveSearching(_ref14) {
      var sourceName = _ref14.sourceName,
        searchString = _ref14.searchString,
        entities = _ref14.entities;
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
        var currentSumIndex = (0, _helper.findFirstFIndex)(currentName, searchString) + (0, _helper.findFirstFIndex)(currentPhoneNumber, searchString);
        var nextSumIndex = (0, _helper.findFirstFIndex)(nextName, searchString) + (0, _helper.findFirstFIndex)(nextPhoneNumber, searchString);
        return currentSumIndex - nextSumIndex;
      });
    }
    // #endregion
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "searchParams", [_nextCore.state, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setSearchParams", [_nextCore.action, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "setSearchParams"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "searchStatus", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _contactSearchStatus.contactSearchStatus.idle;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setSearchStatus", [_nextCore.action, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "setSearchStatus"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "contactSearch", [_nextCore.state, _dec0], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setContactSearch", [_nextCore.action, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "_setContactSearch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cleanUp", [_nextCore.action, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "cleanUp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "debouncedSearch", [_dec13, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "debouncedSearch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "search", [_dec16, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "search"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "searching", [_nextCore.state, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return DefaultSearchingState;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "clearAndReset", [_nextCore.action, _dec20, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "clearAndReset"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setPrepareSearch", [_nextCore.action, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "setPrepareSearch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "triggerPrepareSearch", [_dec24, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "triggerPrepareSearch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSearchSuccess", [_nextCore.action, _dec27, _dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "setSearchSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setContactSearch", [_nextCore.action, _dec29, _dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "setContactSearch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_search", [_dec31, _dec32, _dec33], Object.getOwnPropertyDescriptor(_class2.prototype, "_search"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_searchSource", [_dec34, _dec35, _dec36], Object.getOwnPropertyDescriptor(_class2.prototype, "_searchSource"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "searchResult", [_dec37, _dec38, _dec39], Object.getOwnPropertyDescriptor(_class2.prototype, "searchResult"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sortedResult", [_dec40, _dec41, _dec42], Object.getOwnPropertyDescriptor(_class2.prototype, "sortedResult"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=ContactSearch.js.map
