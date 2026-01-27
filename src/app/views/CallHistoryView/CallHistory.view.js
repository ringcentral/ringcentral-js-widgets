"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallHistoryView = void 0;
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _views = require("@ringcentral-integration/micro-contacts/src/app/views");
var _services3 = require("@ringcentral-integration/micro-core/src/app/services");
var _views2 = require("@ringcentral-integration/micro-core/src/app/views");
var _services4 = require("@ringcentral-integration/micro-message/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _CallHistoryPanel = require("@ringcentral-integration/widgets/components/CallHistoryPanel");
var _react = _interopRequireWildcard(require("react"));
var _services5 = require("../../services");
var _DialerView = require("../DialerView");
var _i18n = require("./i18n");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _class;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var CallHistoryView = exports.CallHistoryView = (_dec = (0, _nextCore.injectable)({
  name: 'CallHistoryView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 13);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 14);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 15);
}, _dec5 = function _dec5(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 16);
}, _dec6 = function _dec6(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 17);
}, _dec7 = function _dec7(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 18);
}, _dec8 = function _dec8(target, key) {
  return (0, _nextCore.optional)('CallHistoryViewOptions')(target, undefined, 19);
}, _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", [typeof _services3.Locale === "undefined" ? Object : _services3.Locale, typeof _services3.Brand === "undefined" ? Object : _services3.Brand, typeof _services5.CallHistory === "undefined" ? Object : _services5.CallHistory, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _services.ConnectivityMonitor === "undefined" ? Object : _services.ConnectivityMonitor, typeof _services.RateLimiter === "undefined" ? Object : _services.RateLimiter, typeof _services3.DateTimeFormat === "undefined" ? Object : _services3.DateTimeFormat, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _services.AccountInfo === "undefined" ? Object : _services.AccountInfo, typeof _services2.ContactMatcher === "undefined" ? Object : _services2.ContactMatcher, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services2.ContactSearch === "undefined" ? Object : _services2.ContactSearch, typeof _services.ConnectivityManager === "undefined" ? Object : _services.ConnectivityManager, typeof _services5.CallLogger === "undefined" ? Object : _services5.CallLogger, typeof _services5.Call === "undefined" ? Object : _services5.Call, typeof _DialerView.DialerView === "undefined" ? Object : _DialerView.DialerView, typeof _services4.ComposeText === "undefined" ? Object : _services4.ComposeText, typeof _views.ContactDetailsView === "undefined" ? Object : _views.ContactDetailsView, typeof _services.ExtensionInfo === "undefined" ? Object : _services.ExtensionInfo, typeof CallHistoryViewOptions === "undefined" ? Object : CallHistoryViewOptions]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = _dec9(_class = _dec0(_class = /*#__PURE__*/function (_RcViewModule) {
  function CallHistoryView(_locale, _brand, _callHistory, _regionSettings, _connectivityMonitor, _rateLimiter, _dateTimeFormat, _appFeatures, _accountInfo, _contactMatcher, _router, _contactSearch, _connectivityManager, _callLogger, _call, _dialerView, _composeText, _contactDetailsView, _extensionInfo, _callHistoryViewOptions) {
    var _this;
    _classCallCheck(this, CallHistoryView);
    _this = _callSuper(this, CallHistoryView);
    _this._locale = _locale;
    _this._brand = _brand;
    _this._callHistory = _callHistory;
    _this._regionSettings = _regionSettings;
    _this._connectivityMonitor = _connectivityMonitor;
    _this._rateLimiter = _rateLimiter;
    _this._dateTimeFormat = _dateTimeFormat;
    _this._appFeatures = _appFeatures;
    _this._accountInfo = _accountInfo;
    _this._contactMatcher = _contactMatcher;
    _this._router = _router;
    _this._contactSearch = _contactSearch;
    _this._connectivityManager = _connectivityManager;
    _this._callLogger = _callLogger;
    _this._call = _call;
    _this._dialerView = _dialerView;
    _this._composeText = _composeText;
    _this._contactDetailsView = _contactDetailsView;
    _this._extensionInfo = _extensionInfo;
    _this._callHistoryViewOptions = _callHistoryViewOptions;
    _this._defaultDateTimeFormatter = function () {
      var _this$_dateTimeFormat;
      return (_this$_dateTimeFormat = _this._dateTimeFormat).formatDateTime.apply(_this$_dateTimeFormat, arguments);
    };
    _this._defaultOnLogCall = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref) {
        var _this$_callLogger;
        var call, contact, _ref$redirect, redirect;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              call = _ref.call, contact = _ref.contact, _ref$redirect = _ref.redirect, redirect = _ref$redirect === void 0 ? true : _ref$redirect;
              _context.n = 1;
              return (_this$_callLogger = _this._callLogger) === null || _this$_callLogger === void 0 ? void 0 : _this$_callLogger.logCall({
                call: call,
                contact: contact,
                redirect: redirect
              });
            case 1:
              return _context.a(2);
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();
    return _this;
  }
  _inherits(CallHistoryView, _RcViewModule);
  return _createClass(CallHistoryView, [{
    key: "getUIProps",
    value: function getUIProps(_ref3) {
      var _this$_extensionInfo$, _this$_extensionInfo, _this$_extensionInfo$2, _this$_extensionInfo$3, _this$_extensionInfo2;
      var _ref3$enableContactFa = _ref3.enableContactFallback,
        enableContactFallback = _ref3$enableContactFa === void 0 ? false : _ref3$enableContactFa,
        _ref3$useNewList = _ref3.useNewList,
        useNewList = _ref3$useNewList === void 0 ? false : _ref3$useNewList;
      return {
        enableContactFallback: enableContactFallback,
        brand: this._brand.name,
        title: (0, _i18n.t)('title'),
        currentLocale: this._locale.currentLocale,
        calls: this._callHistory.latestCalls,
        areaCode: this._regionSettings.areaCode,
        countryCode: this._regionSettings.countryCode,
        currentSiteCode: (_this$_extensionInfo$ = (_this$_extensionInfo = this._extensionInfo) === null || _this$_extensionInfo === void 0 ? void 0 : (_this$_extensionInfo$2 = _this$_extensionInfo.site) === null || _this$_extensionInfo$2 === void 0 ? void 0 : _this$_extensionInfo$2.code) !== null && _this$_extensionInfo$ !== void 0 ? _this$_extensionInfo$ : '',
        isMultipleSiteEnabled: (_this$_extensionInfo$3 = (_this$_extensionInfo2 = this._extensionInfo) === null || _this$_extensionInfo2 === void 0 ? void 0 : _this$_extensionInfo2.isMultipleSiteEnabled) !== null && _this$_extensionInfo$3 !== void 0 ? _this$_extensionInfo$3 : false,
        disableLinks: this._connectivityManager.isOfflineMode || this._connectivityManager.isVoipOnlyMode || this._rateLimiter.restricted,
        disableCallButton: this._connectivityManager.isOfflineMode || this._connectivityManager.isWebphoneUnavailableMode || this._connectivityManager.isWebphoneInitializing || this._rateLimiter.restricted,
        disableClickToDial: !(this._call && this._call.isIdle),
        outboundSmsPermission: this._appFeatures.hasOutboundSMSPermission,
        internalSmsPermission: this._appFeatures.hasInternalSMSPermission,
        loggingMap: this._callLogger && this._callLogger.loggingMap,
        showSpinner: !(this._callHistory.ready && this._locale.ready && this._regionSettings.ready && this._dateTimeFormat.ready && this._connectivityMonitor.ready && this._appFeatures.ready && (!this._call || this._call.ready) && (!this._composeText || this._composeText.ready) && (!this._callLogger || this._callLogger.ready)),
        autoLog: !!(this._callLogger && this._callLogger.autoLog),
        useNewList: useNewList,
        enableCDC: this._appFeatures.isCDCEnabled,
        maxExtensionNumberLength: this._accountInfo.maxExtensionNumberLength
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref4) {
      var _this2 = this;
      var onCreateContact = _ref4.onCreateContact,
        _ref4$dateTimeFormatt = _ref4.dateTimeFormatter,
        dateTimeFormatter = _ref4$dateTimeFormatt === void 0 ? this._defaultDateTimeFormatter : _ref4$dateTimeFormatt,
        _ref4$onLogCall = _ref4.onLogCall,
        onLogCall = _ref4$onLogCall === void 0 ? this._defaultOnLogCall : _ref4$onLogCall,
        isLoggedContact = _ref4.isLoggedContact,
        _ref4$dialerRoute = _ref4.dialerRoute,
        dialerRoute = _ref4$dialerRoute === void 0 ? '/dialer' : _ref4$dialerRoute,
        _ref4$composeTextRout = _ref4.composeTextRoute,
        composeTextRoute = _ref4$composeTextRout === void 0 ? '/composeText' : _ref4$composeTextRout,
        onViewContact = _ref4.onViewContact;
      return {
        formatPhone: function formatPhone(phoneNumber) {
          var _this2$_extensionInfo, _this2$_extensionInfo2, _this2$_extensionInfo3;
          return (0, _formatNumber.formatNumber)({
            phoneNumber: phoneNumber,
            areaCode: _this2._regionSettings.areaCode,
            countryCode: _this2._regionSettings.countryCode,
            maxExtensionLength: _this2._accountInfo.maxExtensionNumberLength,
            isMultipleSiteEnabled: (_this2$_extensionInfo = _this2._extensionInfo) === null || _this2$_extensionInfo === void 0 ? void 0 : _this2$_extensionInfo.isMultipleSiteEnabled,
            siteCode: (_this2$_extensionInfo2 = _this2._extensionInfo) === null || _this2$_extensionInfo2 === void 0 ? void 0 : (_this2$_extensionInfo3 = _this2$_extensionInfo2.site) === null || _this2$_extensionInfo3 === void 0 ? void 0 : _this2$_extensionInfo3.code
          });
        },
        dateTimeFormatter: dateTimeFormatter,
        onViewContact: onViewContact || function (_ref5) {
          var _ref5$contact = _ref5.contact,
            type = _ref5$contact.type,
            id = _ref5$contact.id;
          if (_this2._contactDetailsView) {
            _this2._contactDetailsView.showContactDetails({
              type: type,
              id: id,
              direct: true
            });
          }
        },
        onCreateContact: onCreateContact ? (/*#__PURE__*/function () {
          var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_ref6) {
            var phoneNumber, name, entityType, hasMatchNumber;
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.n) {
                case 0:
                  phoneNumber = _ref6.phoneNumber, name = _ref6.name, entityType = _ref6.entityType;
                  _context2.n = 1;
                  return _this2._contactMatcher.hasMatchNumber({
                    phoneNumber: phoneNumber,
                    ignoreCache: true
                  });
                case 1:
                  hasMatchNumber = _context2.v;
                  if (hasMatchNumber) {
                    _context2.n = 3;
                    break;
                  }
                  _context2.n = 2;
                  return onCreateContact({
                    phoneNumber: phoneNumber,
                    name: name,
                    entityType: entityType
                  });
                case 2:
                  _context2.n = 3;
                  return _this2._contactMatcher.forceMatchNumber({
                    phoneNumber: phoneNumber
                  });
                case 3:
                  return _context2.a(2);
              }
            }, _callee2);
          }));
          return function (_x2) {
            return _ref7.apply(this, arguments);
          };
        }()) : undefined,
        onClickToDial: this._dialerView && this._appFeatures.isCallingEnabled ? function (recipient) {
          var _this2$_call;
          if ((_this2$_call = _this2._call) === null || _this2$_call === void 0 ? void 0 : _this2$_call.isIdle) {
            var _this2$_dialerView;
            _this2._router.push(dialerRoute, _defineProperty({}, _views2.SyncTabId.DIALPAD, 'keypad'));
            (_this2$_dialerView = _this2._dialerView) === null || _this2$_dialerView === void 0 ? void 0 : _this2$_dialerView.call({
              recipient: recipient
            });
            _this2._callHistory.onClickToCall();
          }
        } : undefined,
        onClickToSms: this._composeText ? (
        /*#__PURE__*/
        // TODO: find a better way to define contact type
        function () {
          var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(contact) {
            var isDummyContact,
              _args3 = arguments;
            return _regenerator().w(function (_context3) {
              while (1) switch (_context3.n) {
                case 0:
                  isDummyContact = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : false;
                  if (_this2._router) {
                    _this2._router.push(composeTextRoute);
                  }
                  if (_this2._composeText) {
                    // if contact autocomplete, if no match fill the number only
                    if (contact.name && contact.phoneNumber && isDummyContact) {
                      _this2._composeText.updateTypingToNumber(contact.name);
                      _this2._contactSearch.search({
                        searchString: contact.name
                      });
                    } else {
                      _this2._composeText.addToNumber(contact);
                      if (_this2._composeText.typingToNumber === contact.phoneNumber) {
                        _this2._composeText.cleanTypingToNumber();
                      }
                    }
                  }
                  _this2._callHistory.onClickToSMS();
                case 1:
                  return _context3.a(2);
              }
            }, _callee3);
          }));
          return function (_x3) {
            return _ref8.apply(this, arguments);
          };
        }()) : undefined,
        isLoggedContact: isLoggedContact,
        onLogCall: onLogCall
      };
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this3 = this,
        _this$_callHistoryVie;
      var _useRef = (0, _react.useRef)(this.getUIFunctions(props)),
        uiFunctions = _useRef.current;

      // TODO: fix type
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this3.getUIProps(props);
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      var Component = ((_this$_callHistoryVie = this._callHistoryViewOptions) === null || _this$_callHistoryVie === void 0 ? void 0 : _this$_callHistoryVie.component) || _CallHistoryPanel.CallHistoryPanel;
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule)) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=CallHistory.view.js.map
