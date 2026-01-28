"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
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
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Contacts = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _Auth = require("@ringcentral-integration/micro-auth/src/app/services/Auth");
var _nextCore = require("@ringcentral-integration/next-core");
var _react = require("react");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _class, _class2;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var Contacts = exports.Contacts = (_dec = (0, _nextCore.injectable)({
  name: 'Contacts'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('ContactSources')(target, undefined, 1);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('ContactsOptions')(target, undefined, 2);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _Auth.Auth === "undefined" ? Object : _Auth.Auth, Array, typeof ContactsOptions === "undefined" ? Object : ContactsOptions]), _dec6 = (0, _nextCore.computed)(function (that) {
  return [that.allContacts];
}), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", []), _dec9 = (0, _nextCore.computed)(function (that) {
  return [that._contactSources.size, that.checkSourceUpdated()];
}), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", []), _dec10 = (0, _nextCore.computed)(function (that) {
  return [that.checkSourceUpdated()];
}), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", []), _dec13 = (0, _nextCore.delegate)('server'), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", [typeof IContact === "undefined" ? Object : IContact, void 0]), _dec16 = (0, _nextCore.delegate)('server'), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", [typeof IContact === "undefined" ? Object : IContact, void 0]), _dec19 = (0, _nextCore.delegate)('server'), _dec20 = Reflect.metadata("design:type", Function), _dec21 = Reflect.metadata("design:paramtypes", [void 0]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function Contacts(_auth, _sources, _contactsOptions) {
    var _this$_sources;
    var _this;
    _classCallCheck(this, Contacts);
    _this = _callSuper(this, Contacts);
    _this._auth = _auth;
    _this._sources = _sources;
    _this._contactsOptions = _contactsOptions;
    _this._contactSources = new Map();
    _this._sourcesLastStatus = new Map();
    _this._sourcesUpdatedAt = Date.now();
    var _iterator = _createForOfIteratorHelper((_this$_sources = _this._sources) !== null && _this$_sources !== void 0 ? _this$_sources : []),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var source = _step.value;
        _this.addSource(source);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return _this;
  }
  _inherits(Contacts, _RcModule);
  return _createClass(Contacts, [{
    key: "allContactsMap",
    get: function get() {
      return new Map(this.allContacts.map(function (contact) {
        return [contact.id, contact];
      }));
    }
  }, {
    key: "sourceModuleReady",
    get: function get() {
      var ready = true;
      for (var _i = 0, _Array$from = Array.from(this._contactSources.keys()); _i < _Array$from.length; _i++) {
        var sourceName = _Array$from[_i];
        var source = this._contactSources.get(sourceName);
        if (!(source === null || source === void 0 ? void 0 : source.ready)) {
          ready = false;
          break;
        }
      }
      return ready;
    }
  }, {
    key: "sourceNames",
    get: function get() {
      var names = [];
      for (var _i2 = 0, _Array$from2 = Array.from(this._contactSources.keys()); _i2 < _Array$from2.length; _i2++) {
        var sourceName = _Array$from2[_i2];
        var source = this._contactSources.get(sourceName);
        if (source === null || source === void 0 ? void 0 : source.sourceReady) {
          names.push(sourceName);
        }
      }
      return names;
    }
  }, {
    key: "allContacts",
    get: function get() {
      var contacts = [];
      for (var _i3 = 0, _Array$from3 = Array.from(this._contactSources.keys()); _i3 < _Array$from3.length; _i3++) {
        var sourceName = _Array$from3[_i3];
        var source = this._contactSources.get(sourceName);
        if (source && source.sourceReady && source.contacts) {
          contacts = contacts.concat(source.contacts);
        }
      }
      return contacts;
    }
  }, {
    key: "contactSources",
    get: function get() {
      return this._contactSources;
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._auth.loggedIn && this.sourceModuleReady && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (!this._auth.loggedIn || !this.sourceModuleReady) && this.ready;
    }
  }, {
    key: "addSource",
    value: function addSource(source) {
      if (!source.sourceName) {
        throw new Error('[Contacts > ContactSource > sourceName] is required');
      }
      if (this._contactSources.has(source.sourceName)) {
        throw new Error("[Contacts > ContactSource(".concat(source.sourceName, ") > sourceName] already exists"));
      }
      if (source.getPresence && typeof source.getPresence !== 'function') {
        throw new Error("[Contacts > ContactSource(".concat(source.sourceName, ") > getPresence] must be a function"));
      }
      if (source.getProfileImage && typeof source.getProfileImage !== 'function') {
        throw new Error("[Contacts > ContactSource(".concat(source.sourceName, ") > getProfileImage] must be a function"));
      }
      if (source.findContact && typeof source.findContact !== 'function') {
        throw new Error("[Contacts > ContactSource(".concat(source.sourceName, ") > findContact] must be a function"));
      }
      if (source.filterContacts && typeof source.filterContacts !== 'function') {
        throw new Error("[Contacts > ContactSource(".concat(source.sourceName, ") > filterContacts] must be a function"));
      }
      if (source.searchForPhoneNumbers && typeof source.searchForPhoneNumbers !== 'function') {
        throw new Error("[Contacts > ContactSource(".concat(source.sourceName, ") > searchForPhoneNumbers] must be a function"));
      }
      if (source.matchContactsByPhoneNumber && typeof source.matchContactsByPhoneNumber !== 'function') {
        throw new Error("[Contacts > ContactSource(".concat(source.sourceName, ") > matchContactsByPhoneNumber] must be a function"));
      }
      this._contactSources.set(source.sourceName, source);
      this._sourcesLastStatus.set(source.sourceName, {});
      this._sourcesUpdatedAt = Date.now();
    }
  }, {
    key: "checkSourceUpdated",
    value: function checkSourceUpdated() {
      var updated = false;
      for (var _i4 = 0, _Array$from4 = Array.from(this._contactSources.keys()); _i4 < _Array$from4.length; _i4++) {
        var sourceName = _Array$from4[_i4];
        var source = this._contactSources.get(sourceName);
        var lastStatus = this._sourcesLastStatus.get(sourceName);
        if (source && lastStatus && (lastStatus.ready !== source.sourceReady || lastStatus.data !== source.contacts)) {
          updated = true;
          this._sourcesLastStatus.set(sourceName, {
            ready: source.sourceReady,
            data: source.contacts
          });
        }
      }
      if (updated) {
        this._sourcesUpdatedAt = Date.now();
      }
      return this._sourcesUpdatedAt;
    }
  }, {
    key: "findContact",
    value: function () {
      var _findContact = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref) {
        var sourceName, contactId, contact, source, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              sourceName = _ref.sourceName, contactId = _ref.contactId;
              contact = null;
              source = this._contactSources.get(sourceName);
              if (!(source && typeof source.findContact === 'function')) {
                _context.n = 4;
                break;
              }
              _context.p = 1;
              _context.n = 2;
              return source.findContact(contactId);
            case 2:
              contact = _context.v;
              _context.n = 4;
              break;
            case 3:
              _context.p = 3;
              _t = _context.v;
              console.error("[Contacts > ContactSource(".concat(source.sourceName, ") > findContact] ").concat(_t));
            case 4:
              return _context.a(2, contact);
          }
        }, _callee, this, [[1, 3]]);
      }));
      function findContact(_x) {
        return _findContact.apply(this, arguments);
      }
      return findContact;
    }()
  }, {
    key: "filterContacts",
    value: function () {
      var _filterContacts = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(searchFilter) {
        var sources, result;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              sources = Array.from(this._contactSources.values()).filter(function (source) {
                return typeof source.filterContacts === 'function';
              });
              result = [];
              _context2.n = 1;
              return Promise.all(sources.map(function (source) {
                var promise = Promise.resolve(source.filterContacts(searchFilter));
                return promise.then(function (items) {
                  if (items) {
                    result = result.concat(items);
                  }
                })["catch"](function (error) {
                  console.error("[Contacts > ContactSource(".concat(source.sourceName, ") > filterContacts] ").concat(error));
                });
              }));
            case 1:
              return _context2.a(2, result);
          }
        }, _callee2, this);
      }));
      function filterContacts(_x2) {
        return _filterContacts.apply(this, arguments);
      }
      return filterContacts;
    }()
  }, {
    key: "searchForPhoneNumbers",
    value: function () {
      var _searchForPhoneNumbers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(searchString) {
        var sources, result;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              sources = Array.from(this._contactSources.values()).filter(function (source) {
                return typeof source.searchForPhoneNumbers === 'function';
              });
              result = [];
              _context3.n = 1;
              return Promise.all(sources.map(function (source) {
                var promise = Promise.resolve(source.searchForPhoneNumbers(searchString));
                return promise.then(function (items) {
                  if (items) {
                    result = result.concat(items);
                  }
                })["catch"](function (error) {
                  console.error("[Contacts > ContactSource(".concat(source.sourceName, ") > searchForPhoneNumbers] ").concat(error));
                });
              }));
            case 1:
              return _context3.a(2, result);
          }
        }, _callee3, this);
      }));
      function searchForPhoneNumbers(_x3) {
        return _searchForPhoneNumbers.apply(this, arguments);
      }
      return searchForPhoneNumbers;
    }()
  }, {
    key: "matchContactsByPhoneNumber",
    value: function () {
      var _matchContactsByPhoneNumber = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(phoneNumber) {
        var sources, result;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              sources = Array.from(this._contactSources.values()).filter(function (source) {
                return typeof source.matchContactsByPhoneNumber === 'function';
              });
              result = [];
              _context4.n = 1;
              return Promise.all(sources.map(function (source) {
                var promise = Promise.resolve(source.matchContactsByPhoneNumber(phoneNumber));
                return promise.then(function (items) {
                  if (items) {
                    result = result.concat(items);
                  }
                })["catch"](function (error) {
                  console.error("[Contacts > ContactSource(".concat(source.sourceName, ") > matchContactsByPhoneNumber] ").concat(error));
                });
              }));
            case 1:
              return _context4.a(2, result);
          }
        }, _callee4, this);
      }));
      function matchContactsByPhoneNumber(_x4) {
        return _matchContactsByPhoneNumber.apply(this, arguments);
      }
      return matchContactsByPhoneNumber;
    }()
  }, {
    key: "matchContacts",
    value: function () {
      var _matchContacts = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(_ref2) {
        var _this2 = this;
        var phoneNumbers, result;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              phoneNumbers = _ref2.phoneNumbers;
              result = {};
              _context5.n = 1;
              return Promise.all(phoneNumbers.map(function (phoneNumber) {
                var promise = _this2.matchContactsByPhoneNumber(phoneNumber);
                return promise.then(function (items) {
                  result[phoneNumber] = items;
                });
              }));
            case 1:
              return _context5.a(2, result);
          }
        }, _callee5);
      }));
      function matchContacts(_x5) {
        return _matchContacts.apply(this, arguments);
      }
      return matchContacts;
    }()
  }, {
    key: "getProfileImageSync",
    value: function getProfileImageSync(contact, size) {
      var _source$getProfileIma;
      var source = this._contactSources.get(contact && contact.type);
      return source === null || source === void 0 ? void 0 : (_source$getProfileIma = source.getProfileImageSync) === null || _source$getProfileIma === void 0 ? void 0 : _source$getProfileIma.call(source, contact, size);
    }

    /**
     * @deprecated should use sync way instead, always get url in sync way to avoid the blank image a moment
     *
     * TODO: spring-ui will be removed after all projects switch to spring-ui
     */
  }, {
    key: "getProfileImage",
    value: (function () {
      var _getProfileImage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(contact) {
        var _source$getProfileIma2;
        var useCache,
          source,
          _args6 = arguments;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              useCache = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : true;
              if (!(process.env.THEME_SYSTEM === 'spring-ui')) {
                _context6.n = 1;
                break;
              }
              return _context6.a(2, undefined);
            case 1:
              source = this._contactSources.get(contact && contact.type);
              return _context6.a(2, source === null || source === void 0 ? void 0 : (_source$getProfileIma2 = source.getProfileImage) === null || _source$getProfileIma2 === void 0 ? void 0 : _source$getProfileIma2.call(source, contact, useCache));
          }
        }, _callee6, this);
      }));
      function getProfileImage(_x6) {
        return _getProfileImage.apply(this, arguments);
      }
      return getProfileImage;
    }())
  }, {
    key: "getPresenceSync",
    value: function getPresenceSync(contact) {
      var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var source = this._contactSources.get(contact && contact.type);
      if (source && source.getPresenceSync) {
        var result = source.getPresenceSync(contact, useCache);
        return result;
      }
      return null;
    }
  }, {
    key: "unlinkPresence",
    value: function unlinkPresence(contact) {
      var _source$unlinkPresenc;
      var source = this._contactSources.get(contact && contact.type);
      source === null || source === void 0 ? void 0 : (_source$unlinkPresenc = source.unlinkPresence) === null || _source$unlinkPresenc === void 0 ? void 0 : _source$unlinkPresenc.call(source, contact);
    }

    /**
     * @deprecated should use sync way instead, not need so much event send to server
     *
     * TODO: spring-ui will be removed after all projects switch to spring-ui
     */
  }, {
    key: "getPresence",
    value: (function () {
      var _getPresence2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(contact) {
        var useCache,
          source,
          result,
          _args7 = arguments;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              useCache = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : true;
              source = this._contactSources.get(contact && contact.type);
              if (!(source && source.getPresence)) {
                _context7.n = 2;
                break;
              }
              _context7.n = 1;
              return source.getPresence(contact, useCache);
            case 1:
              result = _context7.v;
              return _context7.a(2, result);
            case 2:
              return _context7.a(2, null);
          }
        }, _callee7, this);
      }));
      function getPresence(_x7) {
        return _getPresence2.apply(this, arguments);
      }
      return getPresence;
    }())
  }, {
    key: "sync",
    value: function () {
      var _sync = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var syncPromises,
          _i5,
          _Array$from5,
          sourceName,
          source,
          _args8 = arguments;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              syncPromises = [];
              for (_i5 = 0, _Array$from5 = Array.from(this._contactSources.keys()); _i5 < _Array$from5.length; _i5++) {
                sourceName = _Array$from5[_i5];
                source = this._contactSources.get(sourceName);
                if (typeof (source === null || source === void 0 ? void 0 : source.sync) === 'function') {
                  syncPromises.push(source.sync.apply(source, _args8));
                }
              }
              _context8.n = 1;
              return Promise.all(syncPromises);
            case 1:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function sync() {
        return _sync.apply(this, arguments);
      }
      return sync;
    }()
    /**
     * get current contact data,
     *
     * ### make sure hook that always use inside component render
     */
  }, {
    key: "useContact",
    value: function useContact(contactId) {
      var _this3 = this;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return (0, _nextCore.useConnector)(function () {
        if (!contactId) return null;
        return _this3.allContactsMap.get(contactId);
      });
    }
  }, {
    key: "_getPresence",
    value: function _getPresence(contact) {
      if ((contact === null || contact === void 0 ? void 0 : contact.type) !== 'company') return;
      var presence = this.getPresenceSync(contact);
      if (presence) return (0, _services.mapToSpringUIPresence)(presence);
    }

    /**
     * get current contact presence status,
     *
     * ### make sure hook that always use inside component render
     */
  }, {
    key: "usePresence",
    value: function usePresence(contact) {
      var _this4 = this;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      var state = (0, _nextCore.useConnector)(function () {
        return _this4._getPresence(contact);
      });

      // eslint-disable-next-line react-hooks/rules-of-hooks
      (0, _react.useEffect)(function () {
        return function () {
          // when unmount, clear link presence listener
          contact && _this4.unlinkPresence(contact);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      return state;
    }
  }]);
}(_nextCore.RcModule), _applyDecoratedDescriptor(_class2.prototype, "allContactsMap", [_dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "allContactsMap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sourceNames", [_dec9, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "sourceNames"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allContacts", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "allContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getProfileImage", [_dec13, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "getProfileImage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getPresence", [_dec16, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "getPresence"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sync", [_dec19, _dec20, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "sync"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Contacts.js.map
