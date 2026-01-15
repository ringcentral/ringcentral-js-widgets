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
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactSearchUI = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
var _phoneTypes = require("@ringcentral-integration/commons/enums/phoneTypes");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _debounceThrottle = require("@ringcentral-integration/commons/lib/debounce-throttle");
var _di = require("@ringcentral-integration/commons/lib/di");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _proxify = require("@ringcentral-integration/commons/lib/proxy/proxify");
var _core = require("@ringcentral-integration/core");
var _ContactSearchHelper = require("./ContactSearchHelper");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var ContactSearchUI = exports.ContactSearchUI = (_dec = (0, _di.Module)({
  name: 'ContactSearchUI',
  deps: ['Locale', 'AccountContacts', 'AddressBook', 'RegionSettings', 'AccountInfo', 'RouterInteraction', 'Contacts', {
    dep: 'ContactSearch',
    optional: true
  }, {
    dep: 'ContactSearchUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.filterString, that._deps.accountContacts.contacts];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that.filterString, that._deps.accountContacts.contacts];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that.otherContacts];
}), _dec5 = (0, _core.computed)(function (that) {
  return [that.filterString, that._deps.addressBook.contacts];
}), _dec6 = (0, _core.computed)(function (that) {
  var _that$_deps$contactSe;
  return [(_that$_deps$contactSe = that._deps.contactSearch) === null || _that$_deps$contactSe === void 0 ? void 0 : _that$_deps$contactSe.searchResult];
}), _dec7 = (0, _core.track)(function (that, tab) {
  return [that._deps.routerInteraction.currentPath === '/dialer' ? _trackEvents.trackEvents.changeDailerDirectoryTab : _trackEvents.trackEvents.changeSMSDirectoryTab, {
    tab: tab
  }];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  function ContactSearchUI(deps) {
    var _this$_deps, _this$_deps$contactSe;
    var _this;
    _classCallCheck(this, ContactSearchUI);
    _this = _callSuper(this, ContactSearchUI, [{
      deps: deps
    }]);
    _this._companyContactsCache = {};
    _this._otherContactsCache = {};
    _this._personalContactsCache = {};
    _this._minimumSearchLength = void 0;
    _this._companyContacts = void 0;
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
        areaCode: _this._deps.regionSettings.areaCode,
        countryCode: _this._deps.regionSettings.countryCode,
        maxExtensionLength: _this._deps.accountInfo.maxExtensionNumberLength
      });
    };
    _this._minimumSearchLength = (_this$_deps = _this._deps) === null || _this$_deps === void 0 ? void 0 : (_this$_deps$contactSe = _this$_deps.contactSearch) === null || _this$_deps$contactSe === void 0 ? void 0 : _this$_deps$contactSe.minimalSearchLength;
    _this._companyContacts = _this._deps.accountContacts.contacts;
    return _this;
  }
  _inherits(ContactSearchUI, _RcUIModuleV);
  return _createClass(ContactSearchUI, [{
    key: "_setFilterString",
    value: function _setFilterString(filterString) {
      this.filterString = filterString;
    }
  }, {
    key: "getFilteredCompanyContacts",
    value: function getFilteredCompanyContacts() {
      var _this$_deps$contactSe2;
      var searchFilter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var lowCaseString = searchFilter.toLowerCase();
      var accountContacts = this._deps.accountContacts.contacts;
      if (this._companyContacts !== accountContacts) {
        this._companyContacts = accountContacts;
      } else if (this._companyContactsCache[lowCaseString]) {
        return this._companyContactsCache[lowCaseString];
      }
      var contacts = ((_this$_deps$contactSe2 = this._deps.contactSearchUIOptions) === null || _this$_deps$contactSe2 === void 0 ? void 0 : _this$_deps$contactSe2.filterCallQueueNumber) ? accountContacts.filter(function (contact) {
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
      if (this._companyContacts !== this._deps.accountContacts.contacts) {
        this._companyContacts = this._deps.accountContacts.contacts;
      } else if (this._otherContactsCache[lowCaseString]) {
        return this._otherContactsCache[lowCaseString];
      }
      var result = (0, _ContactSearchHelper.getRcFilteredContacts)({
        lowCaseString: lowCaseString,
        contacts: this._deps.accountContacts.contacts.filter(function (contact) {
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
        contacts: this._deps.addressBook.contacts
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
    key: "otherContacts",
    get: function get() {
      var _this$_deps$contactSe3;
      if ((_this$_deps$contactSe3 = this._deps.contactSearchUIOptions) === null || _this$_deps$contactSe3 === void 0 ? void 0 : _this$_deps$contactSe3.filterCallQueueNumber) return this.getFilteredCallQueueContacts(this.filterString);
      return [];
    }
  }, {
    key: "filterCallQueueExtContacts",
    get: function get() {
      return this.otherContacts.filter(function (contact) {
        return contact.phoneType !== _phoneTypes.phoneTypes.extension;
      })
      // need to set isPrimary to true to show the phone number in the contact search panel
      .map(function (contact) {
        return _objectSpread(_objectSpread({}, contact), {}, {
          isPrimary: true
        });
      });
    }
  }, {
    key: "personalContacts",
    get: function get() {
      return this.getFilteredPersonalContacts(this.filterString);
    }
  }, {
    key: "searchContactList",
    get: function get() {
      var _this$_deps$contactSe4;
      return (_this$_deps$contactSe4 = this._deps.contactSearch) === null || _this$_deps$contactSe4 === void 0 ? void 0 : _this$_deps$contactSe4.searchResult.slice(0, 500);
    }
  }, {
    key: "changeTabTrack",
    value: function changeTabTrack(tab) {
      //
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      (0, _core.watch)(this, function () {
        return _this2._deps.addressBook.contacts;
      }, function () {
        _this2._personalContactsCache = {};
      });
      (0, _core.watch)(this, function () {
        return _this2._deps.accountContacts.contacts;
      }, function () {
        _this2._companyContactsCache = {};
        _this2._otherContactsCache = {};
      });
    }
  }, {
    key: "getCompanyExtraInfoByIds",
    value: function getCompanyExtraInfoByIds(ids) {
      for (var i = 0; i < ids.length; i++) {
        var contact = this._deps.accountContacts.rcCompanyMapping[ids[i]];
        if (contact) {
          this._deps.accountContacts.getProfileImage(contact);
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
              return this._deps.contacts.getPresence(contact, useCache);
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
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _this$_deps$contactSe5, _this$_deps$contactSe6, _this$_deps$contactSe7, _this$_deps$contactSe8, _this$_deps$contactSe9;
      var userInput = _ref.userInput,
        inputRef = _ref.inputRef,
        directlyProceedText = _ref.directlyProceedText,
        filterCallQueueExtension = _ref.filterCallQueueExtension;
      // @ts-expect-error TS(2741): Property 'thirdPartySourceName' is missing in type... Remove this comment to see the full error message
      return {
        currentLocale: this._deps.locale.currentLocale,
        companyContacts: this.companyContacts,
        otherContacts: filterCallQueueExtension ? this.filterCallQueueExtContacts : this.otherContacts,
        personalContacts: this.personalContacts,
        userInput: userInput,
        inputRef: inputRef,
        centered: (_this$_deps$contactSe5 = (_this$_deps$contactSe6 = this._deps.contactSearchUIOptions) === null || _this$_deps$contactSe6 === void 0 ? void 0 : _this$_deps$contactSe6.centered) !== null && _this$_deps$contactSe5 !== void 0 ? _this$_deps$contactSe5 : false,
        showOtherContacts: (_this$_deps$contactSe7 = (_this$_deps$contactSe8 = this._deps.contactSearchUIOptions) === null || _this$_deps$contactSe8 === void 0 ? void 0 : _this$_deps$contactSe8.filterCallQueueNumber) !== null && _this$_deps$contactSe7 !== void 0 ? _this$_deps$contactSe7 : false,
        minimumSearchLength: this._minimumSearchLength,
        thirdPartyContacts: this.searchContactList,
        isThirdPartySearching: !((_this$_deps$contactSe9 = this._deps.contactSearch) === null || _this$_deps$contactSe9 === void 0 ? void 0 : _this$_deps$contactSe9.isIdle),
        directlyProceedText: directlyProceedText
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this3 = this;
      var optionClickHandler = _ref2.optionClickHandler,
        triggerEventTracking = _ref2.triggerEventTracking;
      return {
        optionClickHandler: optionClickHandler,
        triggerEventTracking: triggerEventTracking,
        searchHandler: function () {
          var _searchHandler = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(searchString) {
            var _this3$_deps$contactS;
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.n) {
                case 0:
                  _context2.n = 1;
                  return (_this3$_deps$contactS = _this3._deps.contactSearch) === null || _this3$_deps$contactS === void 0 ? void 0 : _this3$_deps$contactS.debouncedSearch({
                    searchString: searchString
                  });
                case 1:
                  return _context2.a(2);
              }
            }, _callee2);
          }));
          function searchHandler(_x2) {
            return _searchHandler.apply(this, arguments);
          }
          return searchHandler;
        }(),
        setFilterString: function setFilterString(filterString) {
          _this3._debouncedSetFilterString(filterString);
          if (_this3._minimumSearchLength !== undefined && filterString.length >= _this3._minimumSearchLength) {
            var _this3$_deps$contactS2, _this3$_deps$contactS3;
            (_this3$_deps$contactS2 = _this3._deps.contactSearch) === null || _this3$_deps$contactS2 === void 0 ? void 0 : _this3$_deps$contactS2.setPrepareSearch();
            (_this3$_deps$contactS3 = _this3._deps.contactSearch) === null || _this3$_deps$contactS3 === void 0 ? void 0 : _this3$_deps$contactS3.debouncedSearch({
              searchString: filterString
            });
          }
        },
        formatPhone: this.formatPhone,
        changeTabTrack: function changeTabTrack(v) {
          _this3.changeTabTrack(v);
        },
        getCompanyExtraInfoByIds: function getCompanyExtraInfoByIds(ids) {
          return _this3._debouncedGetCompanyExtraInfoByIds(ids);
        },
        getPresence: function getPresence(contact, useCache) {
          return _this3.getPresence(contact, useCache);
        }
      };
    }
  }]);
}(_core.RcUIModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "filterString", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setFilterString", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setFilterString"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "companyContacts", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "companyContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "otherContacts", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "otherContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "filterCallQueueExtContacts", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "filterCallQueueExtContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "personalContacts", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "personalContacts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "searchContactList", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "searchContactList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeTabTrack", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "changeTabTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getPresence", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getPresence"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=ContactSearchUI.js.map
