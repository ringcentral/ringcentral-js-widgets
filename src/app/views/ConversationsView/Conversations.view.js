"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
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
exports.ConversationsView = void 0;
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.search.js");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _views = require("@ringcentral-integration/micro-contacts/src/app/views");
var _services3 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _ConversationsPanel = require("@ringcentral-integration/widgets/components/ConversationsPanel");
var _react = _interopRequireWildcard(require("react"));
var _services4 = require("../../services");
var _excluded = ["redirect"];
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _class, _class2, _descriptor, _descriptor2;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
var ConversationsView = exports.ConversationsView = (_dec = (0, _nextCore.injectable)({
  name: 'ConversationsView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 15);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 16);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 17);
}, _dec5 = function _dec5(target, key) {
  return (0, _nextCore.optional)('ConversationsViewOptions')(target, undefined, 18);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _services3.Brand === "undefined" ? Object : _services3.Brand, typeof _services3.Locale === "undefined" ? Object : _services3.Locale, typeof _services4.Conversations === "undefined" ? Object : _services4.Conversations, typeof _services3.DateTimeFormat === "undefined" ? Object : _services3.DateTimeFormat, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _services.ConnectivityMonitor === "undefined" ? Object : _services.ConnectivityMonitor, typeof _services.RateLimiter === "undefined" ? Object : _services.RateLimiter, typeof _services4.MessageStore === "undefined" ? Object : _services4.MessageStore, typeof _services.ConnectivityManager === "undefined" ? Object : _services.ConnectivityManager, typeof _services.ExtensionInfo === "undefined" ? Object : _services.ExtensionInfo, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services4.ComposeText === "undefined" ? Object : _services4.ComposeText, typeof _services2.ContactSearch === "undefined" ? Object : _services2.ContactSearch, typeof _services.AccountInfo === "undefined" ? Object : _services.AccountInfo, typeof _views.ContactDetailsView === "undefined" ? Object : _views.ContactDetailsView, typeof _services2.ContactMatcher === "undefined" ? Object : _services2.ContactMatcher, typeof _services4.ConversationLogger === "undefined" ? Object : _services4.ConversationLogger, typeof ConversationsViewOptions === "undefined" ? Object : ConversationsViewOptions]), _dec8 = (0, _nextCore.dynamic)('Call'), _dec9 = Reflect.metadata("design:type", typeof Call === "undefined" ? Object : Call), _dec0 = (0, _nextCore.dynamic)('DialerView'), _dec1 = Reflect.metadata("design:type", typeof DialerView === "undefined" ? Object : DialerView), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function ConversationsView(_brand, _locale, _conversations, _dateTimeFormat, _regionSettings, _appFeatures, _connectivityMonitor, _rateLimiter, _messageStore, _connectivityManager, _extensionInfo, _router, _composeText, _contactSearch, _accountInfo, _contactDetailsView, _contactMatcher, _conversationLogger, _conversationsViewOptions) {
    var _this;
    _classCallCheck(this, ConversationsView);
    _this = _callSuper(this, ConversationsView);
    _this._brand = _brand;
    _this._locale = _locale;
    _this._conversations = _conversations;
    _this._dateTimeFormat = _dateTimeFormat;
    _this._regionSettings = _regionSettings;
    _this._appFeatures = _appFeatures;
    _this._connectivityMonitor = _connectivityMonitor;
    _this._rateLimiter = _rateLimiter;
    _this._messageStore = _messageStore;
    _this._connectivityManager = _connectivityManager;
    _this._extensionInfo = _extensionInfo;
    _this._router = _router;
    _this._composeText = _composeText;
    _this._contactSearch = _contactSearch;
    _this._accountInfo = _accountInfo;
    _this._contactDetailsView = _contactDetailsView;
    _this._contactMatcher = _contactMatcher;
    _this._conversationLogger = _conversationLogger;
    _this._conversationsViewOptions = _conversationsViewOptions;
    _initializerDefineProperty(_this, "_call", _descriptor, _this);
    _initializerDefineProperty(_this, "_dialerView", _descriptor2, _this);
    return _this;
  }
  _inherits(ConversationsView, _RcViewModule);
  return _createClass(ConversationsView, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _this$_extensionInfo$, _this$_extensionInfo, _this$_extensionInfo$2, _this$_extensionInfo$3, _this$_extensionInfo2;
      var _ref$showTitle = _ref.showTitle,
        showTitle = _ref$showTitle === void 0 ? false : _ref$showTitle,
        _ref$enableContactFal = _ref.enableContactFallback,
        enableContactFallback = _ref$enableContactFal === void 0 ? false : _ref$enableContactFal,
        _ref$showGroupNumberN = _ref.showGroupNumberName,
        showGroupNumberName = _ref$showGroupNumberN === void 0 ? false : _ref$showGroupNumberN;
      return {
        showTitle: showTitle,
        enableContactFallback: enableContactFallback,
        showGroupNumberName: showGroupNumberName,
        brand: this._brand.name,
        currentLocale: this._locale.currentLocale,
        currentSiteCode: (_this$_extensionInfo$ = (_this$_extensionInfo = this._extensionInfo) === null || _this$_extensionInfo === void 0 ? void 0 : (_this$_extensionInfo$2 = _this$_extensionInfo.site) === null || _this$_extensionInfo$2 === void 0 ? void 0 : _this$_extensionInfo$2.code) !== null && _this$_extensionInfo$ !== void 0 ? _this$_extensionInfo$ : '',
        isMultipleSiteEnabled: (_this$_extensionInfo$3 = (_this$_extensionInfo2 = this._extensionInfo) === null || _this$_extensionInfo2 === void 0 ? void 0 : _this$_extensionInfo2.isMultipleSiteEnabled) !== null && _this$_extensionInfo$3 !== void 0 ? _this$_extensionInfo$3 : false,
        conversations: this._conversations.pagingConversations,
        areaCode: this._regionSettings.areaCode,
        countryCode: this._regionSettings.countryCode,
        disableLinks: this._connectivityManager.isOfflineMode || this._connectivityManager.isVoipOnlyMode || this._rateLimiter.restricted,
        disableCallButton: this._connectivityManager.isOfflineMode || this._connectivityManager.isWebphoneUnavailableMode || this._connectivityManager.isWebphoneInitializing || this._rateLimiter.restricted,
        disableClickToDial: !(this._call && this._call.isIdle),
        outboundSmsPermission: this._appFeatures.hasOutboundSMSPermission,
        internalSmsPermission: this._appFeatures.hasInternalSMSPermission,
        composeTextPermission: this._appFeatures.hasComposeTextPermission,
        loggingMap: this._conversationLogger && this._conversationLogger.loggingMap,
        showSpinner: !(this._locale.ready && this._conversations.ready && (!this._contactMatcher || this._contactMatcher.ready) && this._dateTimeFormat.ready && this._regionSettings.ready && this._appFeatures.ready && this._connectivityMonitor.ready && this._rateLimiter.ready && (!this._call || this._call.ready) && (!this._conversationLogger || this._conversationLogger.ready)),
        searchInput: this._conversations.searchInput,
        autoLog: !!(this._conversationLogger && this._conversationLogger.autoLog),
        typeFilter: this._conversations.typeFilter,
        textUnreadCounts: this._messageStore.textUnreadCounts,
        voiceUnreadCounts: this._messageStore.voiceUnreadCounts,
        faxUnreadCounts: this._messageStore.faxUnreadCounts,
        readTextPermission: this._appFeatures.hasReadTextPermission,
        readVoicemailPermission: this._appFeatures.hasVoicemailPermission,
        readFaxPermission: this._appFeatures.hasReadFaxPermission,
        loadingNextPage: this._conversations.loadingOldConversations,
        enableCDC: this._appFeatures.isCDCEnabled,
        maxExtensionNumberLength: this._accountInfo.maxExtensionNumberLength
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this2 = this;
      var _ref2$showViewContact = _ref2.showViewContact,
        showViewContact = _ref2$showViewContact === void 0 ? true : _ref2$showViewContact,
        dateTimeFormatter = _ref2.dateTimeFormatter,
        _ref2$dialerRoute = _ref2.dialerRoute,
        dialerRoute = _ref2$dialerRoute === void 0 ? '/dialer' : _ref2$dialerRoute,
        onCreateContact = _ref2.onCreateContact,
        onLogConversation = _ref2.onLogConversation,
        onViewContact = _ref2.onViewContact,
        _ref2$conversationDet = _ref2.conversationDetailRoute,
        conversationDetailRoute = _ref2$conversationDet === void 0 ? '/conversations/{conversationId}' : _ref2$conversationDet,
        _ref2$composeTextRout = _ref2.composeTextRoute,
        composeTextRoute = _ref2$composeTextRout === void 0 ? '/composeText' : _ref2$composeTextRout,
        _previewFaxMessages = _ref2.previewFaxMessages,
        onFaxDownload = _ref2.onFaxDownload;
      return {
        formatPhone: function formatPhone(phoneNumber) {
          var _this2$_extensionInfo;
          return (0, _formatNumber.formatNumber)({
            phoneNumber: phoneNumber,
            areaCode: _this2._regionSettings.areaCode,
            countryCode: _this2._regionSettings.countryCode,
            maxExtensionLength: _this2._accountInfo.maxExtensionNumberLength,
            isMultipleSiteEnabled: _this2._extensionInfo.isMultipleSiteEnabled,
            siteCode: (_this2$_extensionInfo = _this2._extensionInfo.site) === null || _this2$_extensionInfo === void 0 ? void 0 : _this2$_extensionInfo.code
          });
        },
        dateTimeFormatter: dateTimeFormatter !== null && dateTimeFormatter !== void 0 ? dateTimeFormatter : function () {
          var _this2$_dateTimeForma;
          return (_this2$_dateTimeForma = _this2._dateTimeFormat).formatDateTime.apply(_this2$_dateTimeForma, arguments);
        },
        onViewContact: showViewContact ? onViewContact || function (_ref3) {
          var _ref3$contact = _ref3.contact,
            id = _ref3$contact.id,
            type = _ref3$contact.type;
          if (_this2._contactDetailsView) {
            _this2._contactDetailsView.showContactDetails({
              id: id,
              type: type,
              direct: true
            });
          }
        } : undefined,
        onCreateContact: onCreateContact ? (/*#__PURE__*/function () {
          var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref4) {
            var _this2$_contactMatche;
            var phoneNumber, name, entityType, hasMatchNumber, _this2$_contactMatche2;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  phoneNumber = _ref4.phoneNumber, name = _ref4.name, entityType = _ref4.entityType;
                  _context.n = 1;
                  return (_this2$_contactMatche = _this2._contactMatcher) === null || _this2$_contactMatche === void 0 ? void 0 : _this2$_contactMatche.hasMatchNumber({
                    phoneNumber: phoneNumber,
                    ignoreCache: true
                  });
                case 1:
                  hasMatchNumber = _context.v;
                  if (hasMatchNumber) {
                    _context.n = 3;
                    break;
                  }
                  _context.n = 2;
                  return onCreateContact({
                    phoneNumber: phoneNumber,
                    name: name,
                    entityType: entityType
                  });
                case 2:
                  _context.n = 3;
                  return (_this2$_contactMatche2 = _this2._contactMatcher) === null || _this2$_contactMatche2 === void 0 ? void 0 : _this2$_contactMatche2.forceMatchNumber({
                    phoneNumber: phoneNumber
                  });
                case 3:
                  return _context.a(2);
              }
            }, _callee);
          }));
          return function (_x) {
            return _ref5.apply(this, arguments);
          };
        }()) : undefined,
        onClickToDial: this._dialerView && this._appFeatures.isCallingEnabled ? function (recipient) {
          var _this2$_call;
          if ((_this2$_call = _this2._call) === null || _this2$_call === void 0 ? void 0 : _this2$_call.isIdle) {
            _this2._router.push(dialerRoute);
            // for track router
            _this2._messageStore.onClickToCall({
              fromType: recipient.fromType
            });
            _this2._dialerView.call({
              recipient: recipient
            });
          }
        } : undefined,
        onClickToSms: this._appFeatures.hasComposeTextPermission ? function (contact) {
          var isDummyContact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          if (_this2._router) {
            _this2._router.push(composeTextRoute);
          }
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
          // for track
          _this2._messageStore.onClickToSMS();
        } : undefined,
        onLogConversation: onLogConversation || this._conversationLogger && (/*#__PURE__*/function () {
          var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_ref6) {
            var _this2$_conversationL;
            var _ref6$redirect, redirect, options;
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.n) {
                case 0:
                  _ref6$redirect = _ref6.redirect, redirect = _ref6$redirect === void 0 ? true : _ref6$redirect, options = _objectWithoutProperties(_ref6, _excluded);
                  _context2.n = 1;
                  return (_this2$_conversationL = _this2._conversationLogger) === null || _this2$_conversationL === void 0 ? void 0 : _this2$_conversationL.logConversation(_objectSpread(_objectSpread({}, options), {}, {
                    redirect: redirect
                  }));
                case 1:
                  return _context2.a(2);
              }
            }, _callee2);
          }));
          return function (_x2) {
            return _ref7.apply(this, arguments);
          };
        }()),
        onSearchInputChange: function onSearchInputChange(e) {
          _this2._conversations.updateSearchInput(e.currentTarget.value);
        },
        showConversationDetail: function showConversationDetail(conversationId) {
          _this2._router.push(conversationDetailRoute.replace('{conversationId}', conversationId));
        },
        readMessage: function readMessage(conversationId) {
          _this2._messageStore.readMessages(conversationId);
        },
        markMessage: function markMessage(conversationId) {
          _this2._messageStore.unreadMessage(conversationId);
        },
        unmarkMessage: function unmarkMessage(conversationId) {
          _this2._messageStore.readMessages(conversationId);
          _this2._messageStore.onUnmarkMessages();
        },
        goToComposeText: function goToComposeText() {
          return _this2._router.push(composeTextRoute);
        },
        updateTypeFilter: function updateTypeFilter(type) {
          return _this2._conversations.updateTypeFilter(type);
        },
        deleteMessage: function deleteMessage(conversationId) {
          _this2._conversations.deleteConversation(conversationId);
        },
        previewFaxMessages: function previewFaxMessages(uri, conversationId) {
          if (!_previewFaxMessages) {
            window.open(uri);
          } else {
            _previewFaxMessages(uri);
          }
          _this2._messageStore.readMessages(conversationId);
        },
        loadNextPage: function () {
          var _loadNextPage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
            return _regenerator().w(function (_context3) {
              while (1) switch (_context3.n) {
                case 0:
                  _context3.n = 1;
                  return _this2._conversations.loadNextPage();
                case 1:
                  return _context3.a(2);
              }
            }, _callee3);
          }));
          function loadNextPage() {
            return _loadNextPage.apply(this, arguments);
          }
          return loadNextPage;
        }(),
        onUnmount: function onUnmount() {
          if (_this2._conversations.currentPage > 2) {
            _this2._conversations.resetCurrentPage();
          }
        },
        onFaxDownload: onFaxDownload
      };
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this3 = this,
        _this$_conversationsV;
      var _useRef = (0, _react.useRef)(this.getUIFunctions(props)),
        uiFunctions = _useRef.current;

      // TODO: fix type
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this3.getUIProps(props);
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      var Component = ((_this$_conversationsV = this._conversationsViewOptions) === null || _this$_conversationsV === void 0 ? void 0 : _this$_conversationsV.component) || _ConversationsPanel.ConversationsPanel;
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_call", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_dialerView", [_dec0, _dec1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Conversations.view.js.map
