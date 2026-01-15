"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FILTER_THRESHOLD = exports.ContactListUI = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.object.values.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _contactHelper = require("@ringcentral-integration/commons/lib/contactHelper");
var _debounceThrottle = require("@ringcentral-integration/commons/lib/debounce-throttle");
var _di = require("@ringcentral-integration/commons/lib/di");
var _proxify = require("@ringcentral-integration/commons/lib/proxy/proxify");
var _core = require("@ringcentral-integration/core");
var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
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
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var FILTER_THRESHOLD = exports.FILTER_THRESHOLD = 500;
var ContactListUI = exports.ContactListUI = (_dec = (0, _di.Module)({
  name: 'ContactListUI',
  deps: ['Auth', 'Locale', 'ExtensionInfo', 'Contacts', {
    dep: 'ContactDetailsUI',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.filteredContactsList].concat(_toConsumableArray(Object.values(that.contactSources).map(function (source) {
    return source.contacts;
  })));
}), _dec3 = (0, _core.computed)(function (that) {
  return [that.checkSourcesUpdated()];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that.filteredContacts];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  function ContactListUI(deps) {
    var _this;
    _classCallCheck(this, ContactListUI);
    _this = _callSuper(this, ContactListUI, [{
      deps: deps
    }]);
    _this._sourcesLastStatus = new Map();
    _this._sourcesUpdatedAt = 0;
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'StampedFilt... Remove this comment to see the full error message
    _this._currentFilterCriteria = null;
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'StampedFilt... Remove this comment to see the full error message
    _this._nextFilterCriteria = null;
    _initializerDefineProperty(_this, "sourceFilter", _descriptor, _this);
    _initializerDefineProperty(_this, "searchFilter", _descriptor2, _this);
    _initializerDefineProperty(_this, "filterStamp", _descriptor3, _this);
    _initializerDefineProperty(_this, "isFiltering", _descriptor4, _this);
    _initializerDefineProperty(_this, "filteredContactsList", _descriptor5, _this);
    _this._debouncedFilterContactSources = (0, _debounceThrottle.debounce)({
      fn: _this._filterContactSources,
      threshold: FILTER_THRESHOLD
    });
    return _this;
  }
  _inherits(ContactListUI, _RcUIModuleV);
  return _createClass(ContactListUI, [{
    key: "_shouldInit",
    value: function _shouldInit() {
      return _superPropGet(ContactListUI, "_shouldInit", this, 3)([]) && this._deps.auth.loggedIn && this.allSourcesReady();
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return _superPropGet(ContactListUI, "_shouldReset", this, 3)([]) || this.ready && (this._deps.auth.notLoggedIn || !this.allSourcesReady());
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      this.checkSourcesUpdated();
      (0, _core.watch)(this, function () {
        return _this2.checkSourcesUpdated();
      }, function () {
        if (_this2.ready) {
          _this2.applyFilters();
        }
      });
    }
  }, {
    key: "onInitSuccess",
    value: function onInitSuccess() {
      this.applyFilters();
    }
  }, {
    key: "onReset",
    value: function onReset() {
      this._resetFilters();
      this._clearFilteredContacts();
      if (this._debouncedFilterContactSources) {
        this._debouncedFilterContactSources.cancel();
      }
    }
  }, {
    key: "contactSources",
    get: function get() {
      return Array.from(this._deps.contacts.contactSources.values());
    }
  }, {
    key: "allSourcesReady",
    value: function allSourcesReady() {
      var ready = true;
      var _iterator = _createForOfIteratorHelper(this.contactSources),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var source = _step.value;
          if (!source.ready) {
            ready = false;
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return ready;
    }
  }, {
    key: "checkSourcesUpdated",
    value: function checkSourcesUpdated() {
      var updated = false;
      if (this._sourcesLastStatus.size !== this.contactSources.length) {
        updated = true;
        this._sourcesLastStatus.clear();
      }
      var _iterator2 = _createForOfIteratorHelper(this.contactSources),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var source = _step2.value;
          var lastStatus = this._sourcesLastStatus.get(source.sourceName);
          if (!lastStatus || lastStatus.sourceReady !== source.sourceReady || lastStatus.rawContacts !== source.rawContacts) {
            updated = true;
            this._sourcesLastStatus.set(source.sourceName, {
              sourceReady: source.sourceReady,
              contacts: source.contacts,
              rawContacts: source.rawContacts
            });
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      if (updated) {
        this._sourcesUpdatedAt = Date.now();
      }
      return this._sourcesUpdatedAt;
    }
  }, {
    key: "_updateFilters",
    value: function _updateFilters(_ref) {
      var sourceFilter = _ref.sourceFilter,
        searchFilter = _ref.searchFilter;
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      this.sourceFilter = sourceFilter;
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      this.searchFilter = searchFilter;
      this.filterStamp = Math.random();
    }
  }, {
    key: "_resetFilters",
    value: function _resetFilters() {
      this.sourceFilter = _contactHelper.AllContactSourceName;
      this.searchFilter = '';
      this.filterStamp = 0;
      this.isFiltering = false;
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'StampedFilt... Remove this comment to see the full error message
      this._currentFilterCriteria = null;
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'StampedFilt... Remove this comment to see the full error message
      this._nextFilterCriteria = null;
    }
  }, {
    key: "_setIsFiltering",
    value: function _setIsFiltering(isFiltering) {
      this.isFiltering = isFiltering;
    }
  }, {
    key: "_clearFilteredContacts",
    value: function _clearFilteredContacts() {
      this.filteredContactsList = [];
    }
  }, {
    key: "_appendFilteredContacts",
    value: function _appendFilteredContacts(contacts, sourceName) {
      var _this3 = this;
      if (contacts.length > 0) {
        contacts.forEach(function (contact) {
          _this3.filteredContactsList.push([sourceName, contact.id]);
        });
      }
    }
  }, {
    key: "filteredContacts",
    get: function get() {
      var contactsMap = {};
      this.contactSources.forEach(function (source) {
        contactsMap[source.sourceName] = {};
        source.contacts.forEach(function (contact) {
          contactsMap[source.sourceName][contact.id] = contact;
        });
      });
      var filteredContacts = [];
      this.filteredContactsList.forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
          sourceName = _ref3[0],
          id = _ref3[1];
        var contact = contactsMap[sourceName][id];
        if (contact) {
          filteredContacts.push(contact);
        }
      });
      return filteredContacts;
    }
  }, {
    key: "_filterContactSources",
    value: function () {
      var _filterContactSources2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(criteria) {
        var _this4 = this;
        var sources, next;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!this._currentFilterCriteria) {
                _context.n = 1;
                break;
              }
              this._nextFilterCriteria = criteria;
              return _context.a(2);
            case 1:
              this._setIsFiltering(true);
              this._clearFilteredContacts();
              this._currentFilterCriteria = criteria;
              sources = this.contactSources.filter(function (source) {
                return source.sourceReady && typeof source.filterContacts === 'function' && (source.sourceName === criteria.sourceFilter || _contactHelper.AllContactSourceName === criteria.sourceFilter);
              });
              _context.n = 2;
              return Promise.all(sources.map(function (source) {
                var promise = Promise.resolve(
                // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
                source.filterContacts(criteria.searchFilter));
                return promise.then(function (items) {
                  if (!criteria.filterStamp || criteria.filterStamp === _this4.filterStamp) {
                    _this4._appendFilteredContacts(items, source.sourceName);
                  }
                })["catch"](function (error) {
                  console.error("[ContactListUI > ContactSource(".concat(source.sourceName, ") > filterContacts] ").concat(error));
                });
              }));
            case 2:
              // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'StampedFilt... Remove this comment to see the full error message
              this._currentFilterCriteria = null;
              this._setIsFiltering(false);
              if (this._nextFilterCriteria) {
                next = this._nextFilterCriteria; // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'StampedFilt... Remove this comment to see the full error message
                this._nextFilterCriteria = null;
                this._filterContactSources(next);
              }
            case 3:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function _filterContactSources(_x) {
        return _filterContactSources2.apply(this, arguments);
      }
      return _filterContactSources;
    }()
  }, {
    key: "applyFilters",
    value: function () {
      var _applyFilters = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var _ref4,
          _ref4$sourceFilter,
          sourceFilter,
          _ref4$searchFilter,
          searchFilter,
          _args2 = arguments;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _ref4 = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {}, _ref4$sourceFilter = _ref4.sourceFilter, sourceFilter = _ref4$sourceFilter === void 0 ? this.sourceFilter : _ref4$sourceFilter, _ref4$searchFilter = _ref4.searchFilter, searchFilter = _ref4$searchFilter === void 0 ? this.searchFilter : _ref4$searchFilter;
              this._updateFilters({
                sourceFilter: sourceFilter,
                searchFilter: searchFilter
              });
              this._debouncedFilterContactSources({
                sourceFilter: sourceFilter,
                searchFilter: searchFilter,
                filterStamp: this.filterStamp
              });
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function applyFilters() {
        return _applyFilters.apply(this, arguments);
      }
      return applyFilters;
    }()
  }, {
    key: "getPresence",
    value: function () {
      var _getPresence = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(contact) {
        var useCache,
          presence,
          _args3 = arguments;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              useCache = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : true;
              _context3.n = 1;
              return this._deps.contacts.getPresence(contact, useCache);
            case 1:
              presence = _context3.v;
              return _context3.a(2, presence);
          }
        }, _callee3, this);
      }));
      function getPresence(_x2) {
        return _getPresence.apply(this, arguments);
      }
      return getPresence;
    }()
  }, {
    key: "sourceNames",
    get: function get() {
      var names = [_contactHelper.AllContactSourceName];
      var _iterator3 = _createForOfIteratorHelper(this.contactSources),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var source = _step3.value;
          if (source.sourceReady) {
            names.push(source.sourceName);
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return names;
    }
  }, {
    key: "contactGroups",
    get: function get() {
      var _groupByFirstLetterOf;
      return (_groupByFirstLetterOf = (0, _contactHelper.groupByFirstLetterOfName)((0, _contactHelper.sortContactItemsByName)((0, _contactHelper.uniqueContactItems)(this.filteredContacts)))) !== null && _groupByFirstLetterOf !== void 0 ? _groupByFirstLetterOf : [];
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref5) {
      var _this$_deps$extension, _this$_deps$extension2, _this$_deps$extension3, _this$_deps$extension4, _this$_deps$extension5;
      var bottomNotice = _ref5.bottomNotice,
        bottomNoticeHeight = _ref5.bottomNoticeHeight;
      return {
        currentLocale: this._deps.locale.currentLocale,
        contactSourceNames: this.sourceNames,
        contactGroups: this.contactGroups,
        searchSource: this.sourceFilter,
        searchString: this.searchFilter,
        isSearching: this.isFiltering,
        showSpinner: !(this._deps.locale.ready && this.ready),
        currentSiteCode: (_this$_deps$extension = (_this$_deps$extension2 = this._deps.extensionInfo) === null || _this$_deps$extension2 === void 0 ? void 0 : (_this$_deps$extension3 = _this$_deps$extension2.site) === null || _this$_deps$extension3 === void 0 ? void 0 : _this$_deps$extension3.code) !== null && _this$_deps$extension !== void 0 ? _this$_deps$extension : '',
        isMultipleSiteEnabled: (_this$_deps$extension4 = (_this$_deps$extension5 = this._deps.extensionInfo) === null || _this$_deps$extension5 === void 0 ? void 0 : _this$_deps$extension5.isMultipleSiteEnabled) !== null && _this$_deps$extension4 !== void 0 ? _this$_deps$extension4 : false,
        bottomNotice: bottomNotice,
        bottomNoticeHeight: bottomNoticeHeight
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref6) {
      var _this5 = this;
      var _onVisitPage = _ref6.onVisitPage,
        onRefresh = _ref6.onRefresh,
        onItemSelect = _ref6.onItemSelect;
      return {
        getAvatarUrl: function getAvatarUrl() {
          // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
          return null;
        },
        getPresence: function getPresence(contact) {
          return _this5.getPresence(contact);
        },
        onItemSelect: onItemSelect || (/*#__PURE__*/function () {
          var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(_ref7) {
            var type, id;
            return _regenerator().w(function (_context4) {
              while (1) switch (_context4.n) {
                case 0:
                  type = _ref7.type, id = _ref7.id;
                  if (_this5._deps.contactDetailsUI) {
                    _this5._deps.contactDetailsUI.showContactDetails({
                      type: type,
                      id: id
                    });
                  }
                case 1:
                  return _context4.a(2);
              }
            }, _callee4);
          }));
          return function (_x3) {
            return _ref8.apply(this, arguments);
          };
        }()),
        onSearchContact: function onSearchContact(_ref9) {
          var searchSource = _ref9.searchSource,
            searchString = _ref9.searchString;
          _this5.applyFilters({
            sourceFilter: searchSource,
            searchFilter: searchString
          });
        },
        onVisitPage: function onVisitPage() {
          if (typeof _onVisitPage === 'function') {
            _onVisitPage();
          }
          // fire filtering contacts if not yet
          if (!_this5.filterStamp) {
            _this5.applyFilters();
          }
        },
        onRefresh: onRefresh
      };
    }
  }]);
}(_core.RcUIModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "sourceFilter", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _contactHelper.AllContactSourceName;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "searchFilter", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "filterStamp", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "isFiltering", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "filteredContactsList", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_updateFilters", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateFilters"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_resetFilters", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_resetFilters"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setIsFiltering", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setIsFiltering"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_clearFilteredContacts", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_clearFilteredContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_appendFilteredContacts", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_appendFilteredContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "filteredContacts", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "filteredContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "applyFilters", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "applyFilters"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getPresence", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getPresence"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sourceNames", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "sourceNames"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "contactGroups", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "contactGroups"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=ContactListUI.js.map
