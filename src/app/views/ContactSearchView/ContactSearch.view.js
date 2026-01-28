"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactSearchView = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
var _phoneTypes = require("@ringcentral-integration/commons/enums/phoneTypes");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _debounceThrottle = require("@ringcentral-integration/commons/lib/debounce-throttle");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _services3 = require("@ringcentral-integration/micro-setting/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _ContactSearchPanel = require("@ringcentral-integration/widgets/components/ContactSearchPanel");
var _react = _interopRequireWildcard(require("react"));
var _services4 = require("../../services");
var _ContactSearchHelper = require("./ContactSearchHelper");
var _ContactSearchPanel2 = require("./ContactSearchPanel");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _class, _class2, _descriptor;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var EMPTY_ARRAY = [];
var ContactSearchView = exports.ContactSearchView = (_dec = (0, _nextCore.injectable)({
  name: 'ContactSearchView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 8);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('ContactSearchViewOptions')(target, undefined, 9);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _services2.Locale === "undefined" ? Object : _services2.Locale, typeof _services4.AccountContacts === "undefined" ? Object : _services4.AccountContacts, typeof _services4.AddressBook === "undefined" ? Object : _services4.AddressBook, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _services.AccountInfo === "undefined" ? Object : _services.AccountInfo, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services4.Contacts === "undefined" ? Object : _services4.Contacts, typeof _services3.IntegrationConfig === "undefined" ? Object : _services3.IntegrationConfig, typeof _services4.ContactSearch === "undefined" ? Object : _services4.ContactSearch, typeof ContactSearchViewOptions === "undefined" ? Object : ContactSearchViewOptions]), _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [String]), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", []), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", []), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", []), _dec12 = (0, _nextCore.computed)(function (that) {
  return [that.otherContacts];
}), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", []), _dec15 = (0, _nextCore.computed)(function (that) {
  return [that.filterString, that._addressBook.contacts];
}), _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", []), _dec18 = Reflect.metadata("design:type", Function), _dec19 = Reflect.metadata("design:paramtypes", []), _dec20 = Reflect.metadata("design:type", Function), _dec21 = Reflect.metadata("design:paramtypes", []), _dec22 = (0, _services.track)(function (that, tab) {
  return [that._router.currentPath === '/dialer' ? _trackEvents.trackEvents.changeDailerDirectoryTab : _trackEvents.trackEvents.changeSMSDirectoryTab, {
    tab: tab
  }];
}), _dec23 = Reflect.metadata("design:type", Function), _dec24 = Reflect.metadata("design:paramtypes", [String]), _dec25 = (0, _nextCore.delegate)('server'), _dec26 = Reflect.metadata("design:type", Function), _dec27 = Reflect.metadata("design:paramtypes", [typeof IContact === "undefined" ? Object : IContact, void 0]), _dec28 = (0, _nextCore.delegate)('server'), _dec29 = Reflect.metadata("design:type", Function), _dec30 = Reflect.metadata("design:paramtypes", [String]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function ContactSearchView(_locale, _accountContacts, _addressBook, _regionSettings, _accountInfo, _router, _contacts, _integrationConfig, _contactSearch, _contactSearchViewOptions) {
    var _this;
    _classCallCheck(this, ContactSearchView);
    _this = _callSuper(this, ContactSearchView);

    // when contacts change（for example: relogin）, clear the filtered cache to refresh cache
    _this._locale = _locale;
    _this._accountContacts = _accountContacts;
    _this._addressBook = _addressBook;
    _this._regionSettings = _regionSettings;
    _this._accountInfo = _accountInfo;
    _this._router = _router;
    _this._contacts = _contacts;
    _this._integrationConfig = _integrationConfig;
    _this._contactSearch = _contactSearch;
    _this._contactSearchViewOptions = _contactSearchViewOptions;
    _this._companyContactsCache = {};
    _this._otherContactsCache = {};
    _this._personalContactsCache = {};
    _initializerDefineProperty(_this, "filterString", _descriptor, _this);
    _this._debouncedSetFilterString = (0, _debounceThrottle.debounce)({
      fn: _this._setFilterString,
      threshold: 800
    });
    _this._debouncedGetCompanyExtraInfoByIds = (0, _debounceThrottle.debounce)({
      fn: _this.getCompanyExtraInfoByIds,
      threshold: 500
    });
    _this.formatPhone = function (phoneNumber) {
      return (0, _formatNumber.formatNumber)({
        phoneNumber: phoneNumber,
        areaCode: _this._regionSettings.areaCode,
        countryCode: _this._regionSettings.countryCode,
        maxExtensionLength: _this._accountInfo.maxExtensionNumberLength
      });
    };
    (0, _nextCore.watch)(_this, function () {
      return _this._addressBook.contacts;
    }, function () {
      _this._personalContactsCache = {};
    });
    (0, _nextCore.watch)(_this, function () {
      return _this._accountContacts.contacts;
    }, function () {
      _this._companyContactsCache = {};
      _this._otherContactsCache = {};
    });
    return _this;
  }
  _inherits(ContactSearchView, _RcViewModule);
  return _createClass(ContactSearchView, [{
    key: "_minimumSearchLength",
    get: function get() {
      var _this$_contactSearch;
      return (_this$_contactSearch = this._contactSearch) === null || _this$_contactSearch === void 0 ? void 0 : _this$_contactSearch.minimalSearchLength;
    }
  }, {
    key: "_setFilterString",
    value: function _setFilterString(filterString) {
      this.filterString = filterString;
    }
  }, {
    key: "getFilteredCompanyContacts",
    value: function getFilteredCompanyContacts() {
      var _this$_contactSearchV;
      var searchFilter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var lowCaseString = searchFilter.toLowerCase();
      var accountContacts = this._accountContacts.contacts;
      if (this._companyContactsCache[lowCaseString]) {
        return this._companyContactsCache[lowCaseString];
      }
      var filterCallQueueNumber = (_this$_contactSearchV = this._contactSearchViewOptions) === null || _this$_contactSearchV === void 0 ? void 0 : _this$_contactSearchV.filterCallQueueNumber;
      if (process.env.THEME_SYSTEM === 'spring-ui') {
        filterCallQueueNumber = true;
      }
      var contacts = filterCallQueueNumber ? accountContacts.filter(function (contact) {
        return !contact.isCallQueueNumber;
      }) : accountContacts;
      var result = (0, _ContactSearchHelper.getRcFilteredContacts)({
        lowCaseString: lowCaseString,
        contacts: contacts
      });
      this._companyContactsCache[lowCaseString] = result;
      return result;
    }
  }, {
    key: "getFilteredCallQueueContacts",
    value: function getFilteredCallQueueContacts() {
      var searchFilter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var lowCaseString = searchFilter.toLowerCase();
      var accountContacts = this._accountContacts.contacts;
      if (this._otherContactsCache[lowCaseString]) {
        return this._otherContactsCache[lowCaseString];
      }
      var result = (0, _ContactSearchHelper.getRcFilteredContacts)({
        lowCaseString: lowCaseString,
        contacts: accountContacts.filter(function (contact) {
          return contact.isCallQueueNumber;
        })
      });
      this._otherContactsCache[lowCaseString] = result;
      return result;
    }
  }, {
    key: "getFilteredPersonalContacts",
    value: function getFilteredPersonalContacts() {
      var searchFilter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var lowCaseString = searchFilter.toLowerCase();
      if (this._personalContactsCache[lowCaseString]) {
        return this._personalContactsCache[lowCaseString];
      }
      var result = (0, _ContactSearchHelper.getRcFilteredContacts)({
        lowCaseString: lowCaseString,
        contacts: this._addressBook.contacts
      });
      this._personalContactsCache[lowCaseString] = result;
      return result;
    }
  }, {
    key: "companyContacts",
    get: function get() {
      return this.getFilteredCompanyContacts(this.filterString);
    }
  }, {
    key: "excludeExtCompanyContacts",
    get: function get() {
      return (0, _ContactSearchHelper.excludePhoneTypesFromContacts)(this.companyContacts, [_phoneTypes.phoneTypes.extension]);
    }

    /**
     * other contacts include call queue numbers
     */
  }, {
    key: "otherContacts",
    get: function get() {
      return this.getFilteredCallQueueContacts(this.filterString);
    }
  }, {
    key: "filterCallQueueExtContacts",
    get: function get() {
      return (0, _ContactSearchHelper.excludePhoneTypesFromContacts)(this.otherContacts, [_phoneTypes.phoneTypes.extension]);
    }
  }, {
    key: "personalContacts",
    get: function get() {
      return this.getFilteredPersonalContacts(this.filterString);
    }
  }, {
    key: "getThirdPartyContacts",
    value: function getThirdPartyContacts(inputValue) {
      var _this$_contactSearch2, _this$_contactSearch3, _this$_contactSearch4;
      var searching = !((_this$_contactSearch2 = this._contactSearch) === null || _this$_contactSearch2 === void 0 ? void 0 : _this$_contactSearch2.isIdle);
      var thirdPartySearchSourceKey = this._integrationConfig.key;
      if (!thirdPartySearchSourceKey || !inputValue || searching) return EMPTY_ARRAY;
      var thirdPartySearchIdentifier = "".concat(thirdPartySearchSourceKey, "-").concat(inputValue);
      return ((_this$_contactSearch3 = this._contactSearch) === null || _this$_contactSearch3 === void 0 ? void 0 : (_this$_contactSearch4 = _this$_contactSearch3.contactSearch[thirdPartySearchIdentifier]) === null || _this$_contactSearch4 === void 0 ? void 0 : _this$_contactSearch4.entities) || EMPTY_ARRAY;
    }

    /**
     * non spring-ui old project usage, will be removed in the future
     *
     * @deprecated
     */
  }, {
    key: "searchContactList",
    get: function get() {
      var _this$_contactSearch5;
      return (_this$_contactSearch5 = this._contactSearch) === null || _this$_contactSearch5 === void 0 ? void 0 : _this$_contactSearch5.searchResult.slice(0, 500);
    }
    /**
     * non spring-ui old project usage, will be removed in the future
     *
     * @deprecated
     */
  }, {
    key: "sortedSearchContactList",
    get: function get() {
      var _this$_contactSearch6;
      return (_this$_contactSearch6 = this._contactSearch) === null || _this$_contactSearch6 === void 0 ? void 0 : _this$_contactSearch6.sortedResult.slice(0, 500);
    }
  }, {
    key: "changeTabTrack",
    value: function changeTabTrack(_tab) {
      //
    }
  }, {
    key: "getCompanyExtraInfoByIds",
    value: function getCompanyExtraInfoByIds(ids) {
      for (var i = 0; i < ids.length; i++) {
        var contact = this._accountContacts.rcCompanyMapping[ids[i]];
        if (contact) {
          this._contacts.getProfileImage(contact);
        }
      }
    }
  }, {
    key: "getPresence",
    value: function () {
      var _getPresence = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(contact) {
        var useCache,
          presence,
          _args = arguments;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              useCache = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
              _context.n = 1;
              return this._contacts.getPresence(contact, useCache);
            case 1:
              presence = _context.v;
              return _context.a(2, presence);
          }
        }, _callee, this);
      }));
      function getPresence(_x) {
        return _getPresence.apply(this, arguments);
      }
      return getPresence;
    }()
  }, {
    key: "setFilterString",
    value: function () {
      var _setFilterString2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(filterString) {
        var _this$_contactSearch7, _this$_contactSearch8, _this$_contactSearch9;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this._debouncedSetFilterString(filterString);

              // spring-ui version already clear the search related logic, check inside the contact search service, not need to do anything here
              if (!(process.env.THEME_SYSTEM === 'spring-ui')) {
                _context2.n = 2;
                break;
              }
              _context2.n = 1;
              return (_this$_contactSearch7 = this._contactSearch) === null || _this$_contactSearch7 === void 0 ? void 0 : _this$_contactSearch7.debouncedSearch({
                searchString: filterString
              });
            case 1:
              return _context2.a(2);
            case 2:
              if (!(this._minimumSearchLength !== undefined && filterString.length >= this._minimumSearchLength)) {
                _context2.n = 4;
                break;
              }
              _context2.n = 3;
              return (_this$_contactSearch8 = this._contactSearch) === null || _this$_contactSearch8 === void 0 ? void 0 : _this$_contactSearch8.triggerPrepareSearch();
            case 3:
              _context2.n = 4;
              return (_this$_contactSearch9 = this._contactSearch) === null || _this$_contactSearch9 === void 0 ? void 0 : _this$_contactSearch9.debouncedSearch({
                searchString: filterString
              });
            case 4:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function setFilterString(_x2) {
        return _setFilterString2.apply(this, arguments);
      }
      return setFilterString;
    }()
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _this$_contactSearch0, _this$_contactSearchV2, _this$_contactSearchV3, _this$_contactSearchV4, _this$_contactSearchV5, _this$_contactSearchV6, _this$_integrationCon, _this$_contactSearchV7;
      var userInput = _ref.userInput,
        inputRef = _ref.inputRef,
        directlyProceedText = _ref.directlyProceedText,
        filterCallQueueExtension = _ref.filterCallQueueExtension,
        excludeCompanyExtension = _ref.excludeCompanyExtension,
        inputValue = _ref.inputValue,
        helperText = _ref.helperText;
      var isThirdPartySearching = !((_this$_contactSearch0 = this._contactSearch) === null || _this$_contactSearch0 === void 0 ? void 0 : _this$_contactSearch0.isIdle);

      // TODO: remove after all project migrate to spring-ui version app
      var deprecatedThirdPartyContacts = isThirdPartySearching ? EMPTY_ARRAY : ((_this$_contactSearchV2 = this._contactSearchViewOptions) === null || _this$_contactSearchV2 === void 0 ? void 0 : _this$_contactSearchV2.useSortedResult) ? this.sortedSearchContactList : this.searchContactList;
      return {
        currentLocale: this._locale.currentLocale,
        companyContacts: excludeCompanyExtension ? this.excludeExtCompanyContacts : this.companyContacts,
        personalContacts: this.personalContacts,
        otherContacts: filterCallQueueExtension ? this.filterCallQueueExtContacts : this.otherContacts,
        userInput: userInput,
        inputRef: inputRef,
        showOtherContacts: (_this$_contactSearchV3 = (_this$_contactSearchV4 = this._contactSearchViewOptions) === null || _this$_contactSearchV4 === void 0 ? void 0 : _this$_contactSearchV4.filterCallQueueNumber) !== null && _this$_contactSearchV3 !== void 0 ? _this$_contactSearchV3 :
        // default on for spring-ui
        process.env.THEME_SYSTEM === 'spring-ui',
        centered: (_this$_contactSearchV5 = (_this$_contactSearchV6 = this._contactSearchViewOptions) === null || _this$_contactSearchV6 === void 0 ? void 0 : _this$_contactSearchV6.centered) !== null && _this$_contactSearchV5 !== void 0 ? _this$_contactSearchV5 : false,
        minimumSearchLength: this._minimumSearchLength,
        thirdPartyContacts: process.env.THEME_SYSTEM === 'spring-ui' ? this.getThirdPartyContacts(inputValue) : deprecatedThirdPartyContacts,
        isThirdPartySearching: isThirdPartySearching,
        directlyProceedText: directlyProceedText,
        thirdPartySourceName: (_this$_integrationCon = this._integrationConfig.name) !== null && _this$_integrationCon !== void 0 ? _this$_integrationCon : '',
        helperText: helperText !== null && helperText !== void 0 ? helperText : (_this$_contactSearchV7 = this._contactSearchViewOptions) === null || _this$_contactSearchV7 === void 0 ? void 0 : _this$_contactSearchV7.helperText
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this2 = this,
        _this$_contactSearchV8;
      var optionClickHandler = _ref2.optionClickHandler,
        triggerEventTracking = _ref2.triggerEventTracking;
      return {
        optionClickHandler: optionClickHandler,
        triggerEventTracking: triggerEventTracking,
        searchHandler: function () {
          var _searchHandler = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(searchString) {
            var _this2$_contactSearch;
            return _regenerator().w(function (_context3) {
              while (1) switch (_context3.n) {
                case 0:
                  _context3.n = 1;
                  return (_this2$_contactSearch = _this2._contactSearch) === null || _this2$_contactSearch === void 0 ? void 0 : _this2$_contactSearch.debouncedSearch({
                    searchString: searchString
                  });
                case 1:
                  return _context3.a(2);
              }
            }, _callee3);
          }));
          function searchHandler(_x3) {
            return _searchHandler.apply(this, arguments);
          }
          return searchHandler;
        }(),
        setFilterString: function () {
          var _setFilterString3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(filterString) {
            return _regenerator().w(function (_context4) {
              while (1) switch (_context4.n) {
                case 0:
                  _context4.n = 1;
                  return _this2.setFilterString(filterString);
                case 1:
                  return _context4.a(2);
              }
            }, _callee4);
          }));
          function setFilterString(_x4) {
            return _setFilterString3.apply(this, arguments);
          }
          return setFilterString;
        }(),
        formatPhone: this.formatPhone,
        changeTabTrack: function changeTabTrack(v) {
          _this2.changeTabTrack(v);
        },
        getCompanyExtraInfoByIds: function () {
          var _getCompanyExtraInfoByIds = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(ids) {
            return _regenerator().w(function (_context5) {
              while (1) switch (_context5.n) {
                case 0:
                  return _context5.a(2,
                  // TODO: spring-ui, after all projects are migrated to spring-ui, remove this
                  _this2._debouncedGetCompanyExtraInfoByIds(ids));
              }
            }, _callee5);
          }));
          function getCompanyExtraInfoByIds(_x5) {
            return _getCompanyExtraInfoByIds.apply(this, arguments);
          }
          return getCompanyExtraInfoByIds;
        }(),
        getPresence: function getPresence(contact, useCache) {
          return _this2.getPresence(contact, useCache);
        },
        ThirdPartyAvatar: (_this$_contactSearchV8 = this._contactSearchViewOptions) === null || _this$_contactSearchV8 === void 0 ? void 0 : _this$_contactSearchV8.ThirdPartyAvatar
      };
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this3 = this,
        _this$_contactSearchV0;
      var _useRef = (0, _react.useRef)(this.getUIFunctions(props)),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this3.getUIProps(props);
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      if (process.env.THEME_SYSTEM === 'spring-ui') {
        var _this$_contactSearchV9;
        var _Component = ((_this$_contactSearchV9 = this._contactSearchViewOptions) === null || _this$_contactSearchV9 === void 0 ? void 0 : _this$_contactSearchV9.component) || props.componentType === 'DialTextField' ? _ContactSearchPanel2.DialerContactSearchPanel : _ContactSearchPanel2.ContactSearchPanel;
        // @ts-ignore
        return /*#__PURE__*/_react["default"].createElement(_Component, _extends({}, _props, uiFunctions));
      }
      var Component = ((_this$_contactSearchV0 = this._contactSearchViewOptions) === null || _this$_contactSearchV0 === void 0 ? void 0 : _this$_contactSearchV0.component) || _ContactSearchPanel.ContactSearchPanel;
      // @ts-ignore
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "filterString", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setFilterString", [_nextCore.action, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "_setFilterString"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "companyContacts", [_nextCore.computed, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "companyContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "excludeExtCompanyContacts", [_nextCore.computed, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "excludeExtCompanyContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "otherContacts", [_nextCore.computed, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "otherContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "filterCallQueueExtContacts", [_dec12, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "filterCallQueueExtContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "personalContacts", [_dec15, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "personalContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "searchContactList", [_nextCore.computed, _dec18, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "searchContactList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sortedSearchContactList", [_nextCore.computed, _dec20, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "sortedSearchContactList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeTabTrack", [_dec22, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "changeTabTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getPresence", [_dec25, _dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "getPresence"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setFilterString", [_dec28, _dec29, _dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "setFilterString"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=ContactSearch.view.js.map
