"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.from");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.map");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.map");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Contacts = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _dec, _dec2, _dec3, _class, _class2;
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var Contacts = (_dec = (0, _di.Module)({
  name: 'Contacts',
  deps: ['Auth', {
    dep: 'ContactSources',
    optional: true
  }, {
    dep: 'ContactsOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._contactSources.size, that.checkSourceUpdated()];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that.checkSourceUpdated()];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Contacts, _RcModuleV);
  var _super = _createSuper(Contacts);
  function Contacts(deps) {
    var _this$_deps$contactSo;
    var _this;
    _classCallCheck(this, Contacts);
    _this = _super.call(this, {
      deps: deps
    });
    _this._contactSources = new Map();
    _this._sourcesLastStatus = new Map();
    _this._sourcesUpdatedAt = Date.now();
    var _iterator = _createForOfIteratorHelper((_this$_deps$contactSo = _this._deps.contactSources) !== null && _this$_deps$contactSo !== void 0 ? _this$_deps$contactSo : []),
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
  _createClass(Contacts, [{
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._deps.auth.loggedIn && this.sourceModuleReady && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (!this._deps.auth.loggedIn || !this.sourceModuleReady) && this.ready;
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
      for (var _i = 0, _Array$from = Array.from(this._contactSources.keys()); _i < _Array$from.length; _i++) {
        var sourceName = _Array$from[_i];
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
      var _findContact = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var sourceName, contactId, contact, source;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sourceName = _ref.sourceName, contactId = _ref.contactId;
                contact = null;
                source = this._contactSources.get(sourceName);
                if (!(source && typeof source.findContact === 'function')) {
                  _context.next = 13;
                  break;
                }
                _context.prev = 4;
                _context.next = 7;
                return source.findContact(contactId);
              case 7:
                contact = _context.sent;
                _context.next = 13;
                break;
              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](4);
                console.error("[Contacts > ContactSource(".concat(source.sourceName, ") > findContact] ").concat(_context.t0));
              case 13:
                return _context.abrupt("return", contact);
              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 10]]);
      }));
      function findContact(_x) {
        return _findContact.apply(this, arguments);
      }
      return findContact;
    }()
  }, {
    key: "filterContacts",
    value: function () {
      var _filterContacts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(searchFilter) {
        var sources, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                sources = Array.from(this._contactSources.values()).filter(function (source) {
                  return typeof source.filterContacts === 'function';
                });
                result = [];
                _context2.next = 4;
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
              case 4:
                return _context2.abrupt("return", result);
              case 5:
              case "end":
                return _context2.stop();
            }
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
      var _searchForPhoneNumbers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(searchString) {
        var sources, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                sources = Array.from(this._contactSources.values()).filter(function (source) {
                  return typeof source.searchForPhoneNumbers === 'function';
                });
                result = [];
                _context3.next = 4;
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
              case 4:
                return _context3.abrupt("return", result);
              case 5:
              case "end":
                return _context3.stop();
            }
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
      var _matchContactsByPhoneNumber = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(phoneNumber) {
        var sources, result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                sources = Array.from(this._contactSources.values()).filter(function (source) {
                  return typeof source.matchContactsByPhoneNumber === 'function';
                });
                result = [];
                _context4.next = 4;
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
              case 4:
                return _context4.abrupt("return", result);
              case 5:
              case "end":
                return _context4.stop();
            }
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
      var _matchContacts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref2) {
        var _this2 = this;
        var phoneNumbers, result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                phoneNumbers = _ref2.phoneNumbers;
                result = {};
                _context5.next = 4;
                return Promise.all(phoneNumbers.map(function (phoneNumber) {
                  var promise = _this2.matchContactsByPhoneNumber(phoneNumber);
                  return promise.then(function (items) {
                    result[phoneNumber] = items;
                  });
                }));
              case 4:
                return _context5.abrupt("return", result);
              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));
      function matchContacts(_x5) {
        return _matchContacts.apply(this, arguments);
      }
      return matchContacts;
    }()
  }, {
    key: "getProfileImage",
    value: function () {
      var _getProfileImage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(contact) {
        var useCache,
          source,
          result,
          _args6 = arguments;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                useCache = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : true;
                source = this._contactSources.get(contact && contact.type);
                if (!(source && source.getProfileImage)) {
                  _context6.next = 7;
                  break;
                }
                _context6.next = 5;
                return source.getProfileImage(contact, useCache);
              case 5:
                result = _context6.sent;
                return _context6.abrupt("return", result);
              case 7:
                return _context6.abrupt("return", null);
              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function getProfileImage(_x6) {
        return _getProfileImage.apply(this, arguments);
      }
      return getProfileImage;
    }()
  }, {
    key: "getPresence",
    value: function () {
      var _getPresence = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(contact) {
        var useCache,
          source,
          result,
          _args7 = arguments;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                useCache = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : true;
                source = this._contactSources.get(contact && contact.type);
                if (!(source && source.sourceReady && source.getPresence)) {
                  _context7.next = 7;
                  break;
                }
                _context7.next = 5;
                return source.getPresence(contact, useCache);
              case 5:
                result = _context7.sent;
                return _context7.abrupt("return", result);
              case 7:
                return _context7.abrupt("return", null);
              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function getPresence(_x7) {
        return _getPresence.apply(this, arguments);
      }
      return getPresence;
    }()
  }, {
    key: "sync",
    value: function () {
      var _sync = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var syncPromises,
          _i2,
          _Array$from2,
          sourceName,
          source,
          _args8 = arguments;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                syncPromises = [];
                for (_i2 = 0, _Array$from2 = Array.from(this._contactSources.keys()); _i2 < _Array$from2.length; _i2++) {
                  sourceName = _Array$from2[_i2];
                  source = this._contactSources.get(sourceName);
                  if (typeof (source === null || source === void 0 ? void 0 : source.sync) === 'function') {
                    syncPromises.push(source.sync.apply(source, _args8));
                  }
                }
                _context8.next = 4;
                return Promise.all(syncPromises);
              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function sync() {
        return _sync.apply(this, arguments);
      }
      return sync;
    }()
  }, {
    key: "sourceModuleReady",
    get: function get() {
      var ready = true;
      for (var _i3 = 0, _Array$from3 = Array.from(this._contactSources.keys()); _i3 < _Array$from3.length; _i3++) {
        var sourceName = _Array$from3[_i3];
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
      for (var _i4 = 0, _Array$from4 = Array.from(this._contactSources.keys()); _i4 < _Array$from4.length; _i4++) {
        var sourceName = _Array$from4[_i4];
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
      for (var _i5 = 0, _Array$from5 = Array.from(this._contactSources.keys()); _i5 < _Array$from5.length; _i5++) {
        var sourceName = _Array$from5[_i5];
        var source = this._contactSources.get(sourceName);
        if ((source === null || source === void 0 ? void 0 : source.sourceReady) && source.contacts) {
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
  }]);
  return Contacts;
}(_core.RcModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "getProfileImage", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getProfileImage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getPresence", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getPresence"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sync", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "sync"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sourceNames", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "sourceNames"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allContacts", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "allContacts"), _class2.prototype)), _class2)) || _class);
exports.Contacts = Contacts;
//# sourceMappingURL=Contacts.js.map
