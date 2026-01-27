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
exports.ConversationView = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.starts-with.js");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _services3 = require("@ringcentral-integration/micro-core/src/app/services");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _nextCore = require("@ringcentral-integration/next-core");
var _ConversationPanel = _interopRequireDefault(require("@ringcentral-integration/widgets/components/ConversationPanel"));
var _react = _interopRequireWildcard(require("react"));
var _services4 = require("../../services");
var _excluded = ["redirect"];
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _class, _class2, _descriptor;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
var ConversationView = exports.ConversationView = (_dec = (0, _nextCore.injectable)({
  name: 'ConversationView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 12);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 13);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)('ConversationViewOptions')(target, undefined, 14);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _services3.Brand === "undefined" ? Object : _services3.Brand, typeof _services3.Locale === "undefined" ? Object : _services3.Locale, typeof _services3.DateTimeFormat === "undefined" ? Object : _services3.DateTimeFormat, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _services4.Conversations === "undefined" ? Object : _services4.Conversations, typeof _services.RateLimiter === "undefined" ? Object : _services.RateLimiter, typeof _services.ConnectivityMonitor === "undefined" ? Object : _services.ConnectivityMonitor, typeof _services4.MessageStore === "undefined" ? Object : _services4.MessageStore, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services.AccountInfo === "undefined" ? Object : _services.AccountInfo, typeof _services.ExtensionInfo === "undefined" ? Object : _services.ExtensionInfo, typeof _services4.ConversationLogger === "undefined" ? Object : _services4.ConversationLogger, typeof _services2.ContactMatcher === "undefined" ? Object : _services2.ContactMatcher, typeof ConversationViewOptions === "undefined" ? Object : ConversationViewOptions]), _dec7 = (0, _nextCore.dynamic)('Theme'), _dec8 = Reflect.metadata("design:type", typeof Theme === "undefined" ? Object : Theme), _dec9 = (0, _services.track)(function (_, href) {
  var linkType = 'website';
  if (href.startsWith('mailto:')) {
    linkType = 'email';
  }
  return [_trackEvents.trackEvents.clickConversationHyperlink, {
    'Hyperlink type': linkType
  }];
}), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", [String]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function ConversationView(_appFeatures, _brand, _locale, _dateTimeFormat, _regionSettings, _conversations, _rateLimiter, _connectivityMonitor, _messageStore, _router, _accountInfo, _extensionInfo, _conversationLogger, _contactMatcher, _conversationViewOptions) {
    var _this;
    _classCallCheck(this, ConversationView);
    _this = _callSuper(this, ConversationView);
    _this._appFeatures = _appFeatures;
    _this._brand = _brand;
    _this._locale = _locale;
    _this._dateTimeFormat = _dateTimeFormat;
    _this._regionSettings = _regionSettings;
    _this._conversations = _conversations;
    _this._rateLimiter = _rateLimiter;
    _this._connectivityMonitor = _connectivityMonitor;
    _this._messageStore = _messageStore;
    _this._router = _router;
    _this._accountInfo = _accountInfo;
    _this._extensionInfo = _extensionInfo;
    _this._conversationLogger = _conversationLogger;
    _this._contactMatcher = _contactMatcher;
    _this._conversationViewOptions = _conversationViewOptions;
    _initializerDefineProperty(_this, "_theme", _descriptor, _this);
    _this.params = {};
    _this._defaultOnLogConversation = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref) {
        var _this$_conversationLo;
        var _ref$redirect, redirect, options;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _ref$redirect = _ref.redirect, redirect = _ref$redirect === void 0 ? true : _ref$redirect, options = _objectWithoutProperties(_ref, _excluded);
              _context.n = 1;
              return (_this$_conversationLo = _this._conversationLogger) === null || _this$_conversationLo === void 0 ? void 0 : _this$_conversationLo.logConversation(_objectSpread(_objectSpread({}, options), {}, {
                redirect: redirect
              }));
            case 1:
              return _context.a(2);
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();
    _this._defaultDateTimeFormatter = function (options) {
      return _this._dateTimeFormat.formatDateTime(options);
    };
    // let getMatcherContactName: ConversationPanelProps['getMatcherContactName'];
    // let getMatcherContactList: ;
    // let getMatcherContactNameList: ConversationPanelProps['getMatcherContactNameList'];
    _this.getMatcherContactList = function (phoneNumber) {
      var _this$_contactMatcher;
      if ((_this$_contactMatcher = _this._contactMatcher) === null || _this$_contactMatcher === void 0 ? void 0 : _this$_contactMatcher.ready) {
        var matcherNames = _this._contactMatcher.dataMapping[phoneNumber];
        if ((matcherNames === null || matcherNames === void 0 ? void 0 : matcherNames.length) > 0) {
          return matcherNames.map(function (matcher) {
            var _matcher$phoneNumbers;
            return "".concat(matcher.name, " | ").concat((_matcher$phoneNumbers = matcher.phoneNumbers) === null || _matcher$phoneNumbers === void 0 ? void 0 : _matcher$phoneNumbers[0].phoneType);
          });
        }
      }
      return [];
    };
    _this.getMatcherContactNameList = function (phoneNumber) {
      var _this$_contactMatcher2;
      if ((_this$_contactMatcher2 = _this._contactMatcher) === null || _this$_contactMatcher2 === void 0 ? void 0 : _this$_contactMatcher2.ready) {
        var matcherNames = _this._contactMatcher.dataMapping[phoneNumber];
        if ((matcherNames === null || matcherNames === void 0 ? void 0 : matcherNames.length) > 0) {
          return matcherNames.map(function (matcher) {
            return matcher.name;
          });
        }
      }
      return [];
    };
    _this.getMatcherContactName = function (phoneNumber) {
      var matcherNames = _this.getMatcherContactNameList(phoneNumber);
      return (matcherNames === null || matcherNames === void 0 ? void 0 : matcherNames.length) > 0 ? matcherNames.join('&') : null;
    };
    return _this;
  }
  _inherits(ConversationView, _RcViewModule);
  return _createClass(ConversationView, [{
    key: "conversationId",
    get: function get() {
      return this.params.conversationId;
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref3) {
      var _this$_conversationLo2, _this$_conversationLo3, _this$_conversationLo4, _this$_conversationLo5, _this$_extensionInfo, _this$_extensionInfo2, _this$_extensionInfo3;
      var _ref3$enableContactFa = _ref3.enableContactFallback,
        enableContactFallback = _ref3$enableContactFa === void 0 ? false : _ref3$enableContactFa,
        _ref3$showGroupNumber = _ref3.showGroupNumberName,
        showGroupNumberName = _ref3$showGroupNumber === void 0 ? process.env.THEME_SYSTEM === 'spring-ui' : _ref3$showGroupNumber,
        _ref3$supportAttachme = _ref3.supportAttachment,
        supportAttachment = _ref3$supportAttachme === void 0 ? process.env.THEME_SYSTEM === 'spring-ui' : _ref3$supportAttachme,
        _ref3$supportEmoji = _ref3.supportEmoji,
        supportEmoji = _ref3$supportEmoji === void 0 ? process.env.THEME_SYSTEM === 'spring-ui' : _ref3$supportEmoji,
        _ref3$showContactDisp = _ref3.showContactDisplayPlaceholder,
        showContactDisplayPlaceholder = _ref3$showContactDisp === void 0 ? process.env.THEME_SYSTEM === 'spring-ui' : _ref3$showContactDisp,
        _ref3$inputExpandable = _ref3.inputExpandable,
        inputExpandable = _ref3$inputExpandable === void 0 ? process.env.THEME_SYSTEM === 'spring-ui' : _ref3$inputExpandable,
        _ref3$perPage = _ref3.perPage,
        perPage = _ref3$perPage === void 0 ? 20 : _ref3$perPage;
      var disableLinks = this._rateLimiter.restricted || !this._connectivityMonitor.connectivity;
      var showSpinner = !(this._dateTimeFormat.ready && (!this._contactMatcher || this._contactMatcher.ready) && this._regionSettings.ready && this._conversations.ready && this._rateLimiter.ready && this._connectivityMonitor.ready && (!this._conversationLogger || this._conversationLogger.ready));
      var currentConversation = this._conversations.currentConversation;
      var hasInputContent = this._conversations.messageText && this._conversations.messageText.length > 0 || this._conversations.attachments && this._conversations.attachments.length > 0;
      var conversationId = this.conversationId;
      var isLogged = !!(conversationId && ((_this$_conversationLo2 = this._conversationLogger) === null || _this$_conversationLo2 === void 0 ? void 0 : (_this$_conversationLo3 = _this$_conversationLo2.getIsInLoggedStatus) === null || _this$_conversationLo3 === void 0 ? void 0 : _this$_conversationLo3.call(_this$_conversationLo2, conversationId)));
      return {
        brand: this._brand.name,
        enableContactFallback: enableContactFallback,
        showContactDisplayPlaceholder: showContactDisplayPlaceholder,
        showGroupNumberName: showGroupNumberName,
        supportAttachment: this._appFeatures.hasSendMMSPermission && supportAttachment,
        supportEmoji: supportEmoji,
        currentLocale: this._locale.currentLocale,
        conversationId: conversationId,
        sendButtonDisabled: this._conversations.pushing || disableLinks || !hasInputContent || showSpinner,
        areaCode: this._regionSettings.areaCode,
        countryCode: this._regionSettings.countryCode,
        showSpinner: showSpinner,
        recipients: currentConversation.recipients,
        messages: currentConversation.messages,
        messageText: this._conversations.messageText,
        attachments: this._conversations.attachments,
        // TODO: remove the currentConversation, should just messages, not need bring with other data, that already be inside `formattedConversations`
        conversation: currentConversation,
        disableLinks: disableLinks,
        autoLog: !!((_this$_conversationLo4 = this._conversationLogger) === null || _this$_conversationLo4 === void 0 ? void 0 : _this$_conversationLo4.autoLog) || !!((_this$_conversationLo5 = this._conversationLogger) === null || _this$_conversationLo5 === void 0 ? void 0 : _this$_conversationLo5.serverAutoLog),
        perPage: perPage,
        loadingNextPage: this._conversations.loadingOldMessages,
        inputExpandable: !!inputExpandable,
        enableCDC: this._appFeatures.isCDCEnabled,
        isMultipleSiteEnabled: (_this$_extensionInfo = this._extensionInfo) === null || _this$_extensionInfo === void 0 ? void 0 : _this$_extensionInfo.isMultipleSiteEnabled,
        currentSiteCode: (_this$_extensionInfo2 = this._extensionInfo) === null || _this$_extensionInfo2 === void 0 ? void 0 : (_this$_extensionInfo3 = _this$_extensionInfo2.site) === null || _this$_extensionInfo3 === void 0 ? void 0 : _this$_extensionInfo3.code,
        maxExtensionNumberLength: this._accountInfo.maxExtensionNumberLength,
        disableAutoSelect: true,
        acceptFileTypes: this._conversations.acceptFileTypes
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref4) {
      var _this2 = this;
      var _ref4$dateTimeFormatt = _ref4.dateTimeFormatter,
        dateTimeFormatter = _ref4$dateTimeFormatt === void 0 ? this._defaultDateTimeFormatter : _ref4$dateTimeFormatt,
        _ref4$onLogConversati = _ref4.onLogConversation,
        onLogConversation = _ref4$onLogConversati === void 0 ? this._defaultOnLogConversation : _ref4$onLogConversati,
        _ref4$conversationsPa = _ref4.conversationsPath,
        conversationsPath = _ref4$conversationsPa === void 0 ? '/messages' : _ref4$conversationsPa,
        renderExtraButton = _ref4.renderExtraButton;
      return {
        replyToReceivers: function replyToReceivers(text, attachments) {
          return _this2._conversations.replyToReceivers(text, attachments);
        },
        unloadConversation: function unloadConversation() {
          return _this2._conversations.unloadConversation();
        },
        loadConversation: function loadConversation(id) {
          return _this2._conversations.loadConversation(id);
        },
        updateMessageText: function () {
          var _updateMessageText = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(text) {
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.n) {
                case 0:
                  _context2.n = 1;
                  return _this2._conversations.updateMessageText(text);
                case 1:
                  return _context2.a(2, !!_context2.v);
              }
            }, _callee2);
          }));
          function updateMessageText(_x2) {
            return _updateMessageText.apply(this, arguments);
          }
          return updateMessageText;
        }(),
        addAttachments: function addAttachments(attachments) {
          return _this2._conversations.addAttachments(attachments);
        },
        removeAttachment: function removeAttachment(attachment) {
          return _this2._conversations.removeAttachment(attachment);
        },
        dateTimeFormatter: dateTimeFormatter,
        formatPhone: function formatPhone(phoneNumber) {
          return (0, _formatNumber.formatNumber)({
            phoneNumber: phoneNumber,
            areaCode: _this2._regionSettings.areaCode,
            countryCode: _this2._regionSettings.countryCode
          });
        },
        getMatcherContactName: this.getMatcherContactName,
        getMatcherContactList: this.getMatcherContactList,
        getMatcherContactNameList: this.getMatcherContactNameList,
        onLogConversation: onLogConversation,
        goBack: function () {
          var _goBack = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
            var _this2$_theme;
            return _regenerator().w(function (_context3) {
              while (1) switch (_context3.n) {
                case 0:
                  _context3.n = 1;
                  return (0, _views.slideOutViewTransition)(function () {
                    return _this2._router.push(conversationsPath);
                  }, (_this2$_theme = _this2._theme) === null || _this2$_theme === void 0 ? void 0 : _this2$_theme.reducedMotion);
                case 1:
                  return _context3.a(2);
              }
            }, _callee3);
          }));
          function goBack() {
            return _goBack.apply(this, arguments);
          }
          return goBack;
        }(),
        readMessages: function readMessages(id) {
          _this2._messageStore.readMessages(id);
        },
        loadPreviousMessages: function loadPreviousMessages() {
          _this2._conversations.fetchOldMessages();
        },
        renderExtraButton: renderExtraButton,
        onLinkClick: function onLinkClick(href) {
          return _this2._trackClickConversationHyperlink(href);
        }
      };
    }
  }, {
    key: "_trackClickConversationHyperlink",
    value: function _trackClickConversationHyperlink(href) {
      //
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this3 = this,
        _this$_conversationVi;
      this.params = (0, _nextCore.useParams)();
      var _useRef = (0, _react.useRef)(this.getUIFunctions(props)),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this3.getUIProps(props);
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      var Component = ((_this$_conversationVi = this._conversationViewOptions) === null || _this$_conversationVi === void 0 ? void 0 : _this$_conversationVi.component) || _ConversationPanel["default"];
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_theme", [_dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "_trackClickConversationHyperlink", [_dec9, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "_trackClickConversationHyperlink"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Conversation.view.js.map
