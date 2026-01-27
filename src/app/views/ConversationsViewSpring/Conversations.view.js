"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
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
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConversationsViewSpring = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _messageTypes = require("@ringcentral-integration/commons/enums/messageTypes");
var _messageHelper = require("@ringcentral-integration/commons/lib/messageHelper");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _services3 = require("@ringcentral-integration/micro-core/src/app/services");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _hooks = require("@ringcentral-integration/micro-phone/src/app/hooks");
var _services4 = require("@ringcentral-integration/micro-setting/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _react = _interopRequireWildcard(require("react"));
var _rxjs = require("rxjs");
var _services5 = require("../../services");
var _MessageThreadsView = require("../MessageThreadsView");
var _ConversationsPage = require("./ConversationsPage");
var _i18n = require("./i18n");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var dangerButtonProps = {
  color: 'danger'
};
var ConversationsViewSpring = exports.ConversationsViewSpring = (_dec = (0, _nextCore.injectable)({
  name: 'ConversationsViewSpring'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 16);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 17);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 18);
}, _dec5 = function _dec5(target, key) {
  return (0, _nextCore.optional)('ConversationsViewOptions')(target, undefined, 19);
}, _dec6 = function _dec6(target, key) {
  return (0, _nextCore.optional)('SmsConversationsOptions')(target, undefined, 20);
}, _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [typeof _views.ModalView === "undefined" ? Object : _views.ModalView, typeof _services3.Locale === "undefined" ? Object : _services3.Locale, typeof _services5.Conversations === "undefined" ? Object : _services5.Conversations, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _services.ConnectivityMonitor === "undefined" ? Object : _services.ConnectivityMonitor, typeof _services.RateLimiter === "undefined" ? Object : _services.RateLimiter, typeof _services5.MessageStore === "undefined" ? Object : _services5.MessageStore, typeof _services.ConnectivityManager === "undefined" ? Object : _services.ConnectivityManager, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services3.Toast === "undefined" ? Object : _services3.Toast, typeof _services5.ComposeText === "undefined" ? Object : _services5.ComposeText, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof _services5.VoicemailAudio === "undefined" ? Object : _services5.VoicemailAudio, typeof _services4.IntegrationConfig === "undefined" ? Object : _services4.IntegrationConfig, typeof _services5.SmsConversations === "undefined" ? Object : _services5.SmsConversations, typeof _services2.ContactMatcher === "undefined" ? Object : _services2.ContactMatcher, typeof _services5.ConversationLogger === "undefined" ? Object : _services5.ConversationLogger, typeof _services5.SmsOptOut === "undefined" ? Object : _services5.SmsOptOut, typeof ConversationsViewSpringOptions === "undefined" ? Object : ConversationsViewSpringOptions, typeof SmsConversationsOptions === "undefined" ? Object : SmsConversationsOptions]), _dec9 = (0, _nextCore.dynamic)('ConversationsViewableManager'), _dec0 = Reflect.metadata("design:type", typeof ConversationsViewableManager === "undefined" ? Object : ConversationsViewableManager), _dec1 = (0, _nextCore.dynamic)('MessageThreadsView'), _dec10 = Reflect.metadata("design:type", typeof _MessageThreadsView.MessageThreadsView === "undefined" ? Object : _MessageThreadsView.MessageThreadsView), _dec11 = (0, _nextCore.dynamic)('Theme'), _dec12 = Reflect.metadata("design:type", typeof Theme === "undefined" ? Object : Theme), _dec13 = (0, _nextCore.dynamic)('Call'), _dec14 = Reflect.metadata("design:type", typeof Call === "undefined" ? Object : Call), _dec15 = (0, _nextCore.dynamic)('DialerView'), _dec16 = Reflect.metadata("design:type", typeof DialerView === "undefined" ? Object : DialerView), _dec17 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec18 = Reflect.metadata("design:type", Function), _dec19 = Reflect.metadata("design:paramtypes", [String, typeof StateSnapshot === "undefined" ? Object : StateSnapshot]), _dec20 = (0, _nextCore.delegate)('server'), _dec21 = Reflect.metadata("design:type", Function), _dec22 = Reflect.metadata("design:paramtypes", [String, typeof StateSnapshot === "undefined" ? Object : StateSnapshot]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function ConversationsViewSpring(_modalView, _locale, _conversations, _regionSettings, _appFeatures, _connectivityMonitor, _rateLimiter, _messageStore, _connectivityManager, _router, _toast, _composeText, _portManager, _voicemailAudio, _integrationConfig, _smsConversations, _contactMatcher, _conversationLogger, _smsOptOut, _conversationsViewOptions, _smsConversationsOptions) {
    var _this;
    _classCallCheck(this, ConversationsViewSpring);
    _this = _callSuper(this, ConversationsViewSpring);
    _this._modalView = _modalView;
    _this._locale = _locale;
    _this._conversations = _conversations;
    _this._regionSettings = _regionSettings;
    _this._appFeatures = _appFeatures;
    _this._connectivityMonitor = _connectivityMonitor;
    _this._rateLimiter = _rateLimiter;
    _this._messageStore = _messageStore;
    _this._connectivityManager = _connectivityManager;
    _this._router = _router;
    _this._toast = _toast;
    _this._composeText = _composeText;
    _this._portManager = _portManager;
    _this._voicemailAudio = _voicemailAudio;
    _this._integrationConfig = _integrationConfig;
    _this._smsConversations = _smsConversations;
    _this._contactMatcher = _contactMatcher;
    _this._conversationLogger = _conversationLogger;
    _this._smsOptOut = _smsOptOut;
    _this._conversationsViewOptions = _conversationsViewOptions;
    _this._smsConversationsOptions = _smsConversationsOptions;
    _initializerDefineProperty(_this, "_conversationsViewableManager", _descriptor, _this);
    _initializerDefineProperty(_this, "_messageThreadsView", _descriptor2, _this);
    _initializerDefineProperty(_this, "confirmDeleteModal", _descriptor3, _this);
    _initializerDefineProperty(_this, "_theme", _descriptor4, _this);
    _initializerDefineProperty(_this, "_call", _descriptor5, _this);
    _initializerDefineProperty(_this, "_dialerView", _descriptor6, _this);
    _initializerDefineProperty(_this, "lastPosition", _descriptor7, _this);
    _this.useConversationItemInfo = function (conversation) {
      var _this$_messageThreads, _this$_messageThreads2, _this$_smsOptOut$getI, _this$_smsOptOut;
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$pageType = _ref.pageType,
        pageType = _ref$pageType === void 0 ? 'list' : _ref$pageType;
      var beTextMessage = (0, _messageHelper.messageIsTextMessage)(conversation);
      var conversationId = conversation.conversationId;
      var _useConnector = (0, _nextCore.useConnector)(function () {
          var _this$_conversationLo, _this$_conversationLo2, _this$_conversationLo3;
          return {
            disableLinks: _this.disableLinks,
            isOfflineMode: _this._connectivityManager.isOfflineMode,
            isWebphoneUnavailableMode: _this._connectivityManager.isWebphoneUnavailableMode,
            isWebphoneInitializing: _this._connectivityManager.isWebphoneInitializing,
            restricted: _this._rateLimiter.restricted,
            isIdle: Boolean(_this._call && _this._call.isIdle),
            hasInternalSMSPermission: _this._appFeatures.hasInternalSMSPermission,
            hasOutboundSMSPermission: _this._appFeatures.hasOutboundSMSPermission,
            isCallingEnabled: _this._appFeatures.isCallingEnabled,
            hasComposeTextPermission: _this._appFeatures.hasComposeTextPermission,
            displayCRMLog: _this._smsConversations.checkIsSupportLog(conversation),
            isLogged:
            // only text message able to log to avoid accidental match the dataMapping
            beTextMessage && !!conversationId && ((_this$_conversationLo = _this._conversationLogger) === null || _this$_conversationLo === void 0 ? void 0 : _this$_conversationLo.getIsInLoggedStatus(conversationId)),
            autoLog: !!((_this$_conversationLo2 = _this._conversationLogger) === null || _this$_conversationLo2 === void 0 ? void 0 : _this$_conversationLo2.autoLog) || !!((_this$_conversationLo3 = _this._conversationLogger) === null || _this$_conversationLo3 === void 0 ? void 0 : _this$_conversationLo3.serverAutoLog)
          };
        }),
        disableLinks = _useConnector.disableLinks,
        isOfflineMode = _useConnector.isOfflineMode,
        isWebphoneUnavailableMode = _useConnector.isWebphoneUnavailableMode,
        isWebphoneInitializing = _useConnector.isWebphoneInitializing,
        restricted = _useConnector.restricted,
        isIdle = _useConnector.isIdle,
        hasInternalSMSPermission = _useConnector.hasInternalSMSPermission,
        hasOutboundSMSPermission = _useConnector.hasOutboundSMSPermission,
        isCallingEnabled = _useConnector.isCallingEnabled,
        hasComposeTextPermission = _useConnector.hasComposeTextPermission,
        displayCRMLog = _useConnector.displayCRMLog,
        isLogged = _useConnector.isLogged,
        autoLog = _useConnector.autoLog;
      var _ref2 = (_this$_messageThreads = (_this$_messageThreads2 = _this._messageThreadsView) === null || _this$_messageThreads2 === void 0 ? void 0 : _this$_messageThreads2.useThreadConversationItemInfo(conversation)) !== null && _this$_messageThreads !== void 0 ? _this$_messageThreads : {},
        threadInfo = _ref2.threadInfo,
        extensionId = _ref2.extensionId,
        _ref2$actions = _ref2.actions,
        threadActions = _ref2$actions === void 0 ? [] : _ref2$actions;
      var isOptOut = (_this$_smsOptOut$getI = (_this$_smsOptOut = _this._smsOptOut) === null || _this$_smsOptOut === void 0 ? void 0 : _this$_smsOptOut.getIsOptOutConversation(conversation)) !== null && _this$_smsOptOut$getI !== void 0 ? _this$_smsOptOut$getI : false;
      var info = (0, _hooks.useContactRenderInfoFromConversation)(conversation, {
        timePresentationMode: 'withoutTime',
        displayLogStatus: displayCRMLog,
        hasCrmLogged: isLogged,
        phoneNumberDisplayMode: pageType !== 'list' ? 'unknown' : 'phoneNumber',
        isOptOut: isOptOut
      });
      var isTextMessage = info.isTextMessage,
        isFax = info.isFax,
        isVoicemail = info.isVoicemail,
        voicemailAttachmentExist = info.voicemailAttachmentExist,
        voicemailAttachmentUri = info.voicemailAttachmentUri,
        markAble = info.markAble,
        unreadCounts = info.unreadCounts,
        faxAttachmentExist = info.faxAttachmentExist,
        signalTo = info.signalTo,
        faxAttachmentDownloadUri = info.faxAttachmentDownloadUri,
        signalSourceInfo = info.signalSourceInfo,
        formattedPhoneNumber = info.formattedPhoneNumber,
        matchedContact = info.matchedContact;
      var actions = (0, _react.useMemo)(function () {
        var _this$_smsConversatio;
        var enableModifyLog = (_this$_smsConversatio = _this._smsConversationsOptions) === null || _this$_smsConversatio === void 0 ? void 0 : _this$_smsConversatio.enableModifyLog;
        var actions = [];

        // CRM Log actions - available on all page types
        if ((pageType === 'list' || pageType === 'text') && displayCRMLog && signalTo) {
          if (autoLog && !enableModifyLog) {
            actions.push({
              type: 'selectRecordsForAutoLog',
              disabled: disableLinks
            });
          } else {
            if (!isLogged || enableModifyLog) {
              actions.push({
                type: 'createLog',
                disabled: disableLinks
              });
            }
          }
          if (isLogged && !enableModifyLog) {
            actions.push({
              type: 'viewLog',
              disabled: disableLinks,
              label: _this._integrationConfig.name && (0, _i18n.t)('viewInCrm', {
                crmName: _this._integrationConfig.name
              })
            });
          }
        }
        // Fax actions - available on all page types
        if (pageType === 'list' && faxAttachmentExist) {
          actions.push({
            type: 'viewFax',
            disabled: disableLinks,
            href: faxAttachmentDownloadUri
          }, {
            type: 'downloadFax',
            disabled: disableLinks,
            href: faxAttachmentDownloadUri
          });
        }

        // Phone number actions - available on all page types
        if (signalTo) {
          if ((pageType === 'list' || pageType === 'voicemail') && !isFax && formattedPhoneNumber && isCallingEnabled) {
            actions.push({
              type: 'call',
              disabled: isOfflineMode || isWebphoneUnavailableMode || isWebphoneInitializing || restricted || !isIdle || disableLinks
            });
          }
          if ((pageType === 'list' || pageType === 'voicemail') && !isFax && !isTextMessage && formattedPhoneNumber && hasComposeTextPermission) {
            actions.push({
              type: 'text',
              disabled: disableLinks || ((signalSourceInfo === null || signalSourceInfo === void 0 ? void 0 : signalSourceInfo.extensionNumber) ? !hasInternalSMSPermission : !hasOutboundSMSPermission)
            });
          }

          // Use the normalized phone number (not formatted) for dataMapping lookup
          // dialToPhoneNumber should be the normalized number, not the formatted display version
          var dialToPhoneNumber = (signalSourceInfo === null || signalSourceInfo === void 0 ? void 0 : signalSourceInfo.phoneNumber) || (signalSourceInfo === null || signalSourceInfo === void 0 ? void 0 : signalSourceInfo.extensionNumber);
          var integrateActions = _this._integrationConfig.getActionButtons({
            dialToPhoneNumber: dialToPhoneNumber,
            matchedContact: matchedContact,
            disabled: disableLinks,
            isLogged: isLogged
          });
          actions.push.apply(actions, _toConsumableArray(integrateActions));
        }

        // Mark actions - only available on list page
        if (pageType === 'list' && markAble) {
          actions.push({
            type: unreadCounts === 0 ? 'mark' : 'unmark',
            disabled: disableLinks
          });
        }

        // Voicemail actions - available on all page types
        if (pageType === 'list' && isVoicemail && voicemailAttachmentExist) {
          actions.push({
            type: 'downloadVoicemail',
            href: voicemailAttachmentUri,
            disabled: disableLinks
          });
        }

        // Copy number action - available on all page types
        if (pageType === 'list' && formattedPhoneNumber) {
          actions.push({
            type: 'copyNumber'
          });
        }
        // Delete action - only available on detail pages
        if (pageType === 'list' && (isVoicemail || isFax)) {
          actions.push({
            type: 'delete',
            disabled: disableLinks
          });
        }

        // add the thread actions into conversation actions
        actions.push.apply(actions, _toConsumableArray(threadActions));
        return actions;
      }, [pageType, displayCRMLog, signalTo, faxAttachmentExist, markAble, isVoicemail, voicemailAttachmentExist, formattedPhoneNumber, isFax, threadActions, autoLog, isLogged, disableLinks, faxAttachmentDownloadUri, isTextMessage, matchedContact, isOfflineMode, isWebphoneUnavailableMode, isWebphoneInitializing, restricted, isIdle, signalSourceInfo === null || signalSourceInfo === void 0 ? void 0 : signalSourceInfo.extensionNumber, signalSourceInfo === null || signalSourceInfo === void 0 ? void 0 : signalSourceInfo.phoneNumber, hasInternalSMSPermission, hasOutboundSMSPermission, isCallingEnabled, hasComposeTextPermission, unreadCounts, voicemailAttachmentUri]);
      return {
        info: info,
        actions: actions,
        extensionId: extensionId,
        threadInfo: threadInfo
      };
    };
    _this.useActionsHandler = function (conversation, info, location) {
      // TODO: select contact auto log when autoLog be enable

      var conversationId = conversation.conversationId;
      return /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(actionType, data) {
          var _this$_integrationCon, _this$_integrationCon2, _this$_integrationCon3, _this$_integrationCon4, _this$_integrationCon5, _this$_integrationCon6;
          var signalSourceInfo, matchedContact, isTextMessage, isVoicemail, _this$_theme, _this$_integrationCon7, _this$_integrationCon8, actionInfo, _actionInfo, _this$_composeText, result, _this$_messageThreads3, _result, _t;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                _this.logger.log("exec actionType", actionType, conversation);
                signalSourceInfo = info.signalSourceInfo, matchedContact = info.matchedContact, isTextMessage = info.isTextMessage, isVoicemail = info.isVoicemail;
                _t = actionType;
                _context2.n = _t === 'viewDetail' ? 1 : _t === 'addEntity' ? 3 : _t === 'viewLog' ? 4 : _t === 'viewEntity' ? 5 : _t === 'createLog' ? 6 : _t === 'selectRecordsForAutoLog' ? 6 : _t === 'call' ? 7 : _t === 'text' ? 8 : _t === 'mark' ? 9 : _t === 'read' ? 11 : _t === 'unmark' ? 12 : _t === 'delete' ? 13 : _t === 'viewFax' ? 15 : _t === 'downloadFax' ? 17 : _t === 'downloadVoicemail' ? 18 : _t === 'copyNumber' ? 19 : 20;
                break;
              case 1:
                if (!(isTextMessage || isVoicemail)) {
                  _context2.n = 2;
                  break;
                }
                _context2.n = 2;
                return (0, _views.slideInViewTransition)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
                  var _this$_smsConversatio2, _this$_smsConversatio3;
                  return _regenerator().w(function (_context) {
                    while (1) switch (_context.n) {
                      case 0:
                        if (!isTextMessage) {
                          _context.n = 3;
                          break;
                        }
                        _context.n = 1;
                        return (_this$_smsConversatio2 = _this._smsConversationsOptions) === null || _this$_smsConversatio2 === void 0 ? void 0 : (_this$_smsConversatio3 = _this$_smsConversatio2.checkDncStatusOfConversation) === null || _this$_smsConversatio3 === void 0 ? void 0 : _this$_smsConversatio3.call(_this$_smsConversatio2, conversationId);
                      case 1:
                        _context.n = 2;
                        return _this._router.push("/conversations/".concat(conversationId));
                      case 2:
                        return _context.a(2);
                      case 3:
                        if (!isVoicemail) {
                          _context.n = 5;
                          break;
                        }
                        _context.n = 4;
                        return _this._router.push("/voicemails/".concat(conversationId));
                      case 4:
                        return _context.a(2);
                      case 5:
                        return _context.a(2);
                    }
                  }, _callee);
                })), (_this$_theme = _this._theme) === null || _this$_theme === void 0 ? void 0 : _this$_theme.reducedMotion);
              case 2:
                return _context2.a(3, 22);
              case 3:
                (_this$_integrationCon = (_this$_integrationCon2 = _this._integrationConfig).onCreateEntity) === null || _this$_integrationCon === void 0 ? void 0 : _this$_integrationCon.call(_this$_integrationCon2, signalSourceInfo);
                return _context2.a(3, 22);
              case 4:
                (_this$_integrationCon3 = (_this$_integrationCon4 = _this._integrationConfig).onViewLog) === null || _this$_integrationCon3 === void 0 ? void 0 : _this$_integrationCon3.call(_this$_integrationCon4, data || matchedContact);
                return _context2.a(3, 22);
              case 5:
                (_this$_integrationCon5 = (_this$_integrationCon6 = _this._integrationConfig).onViewEntity) === null || _this$_integrationCon5 === void 0 ? void 0 : _this$_integrationCon5.call(_this$_integrationCon6, matchedContact, {
                  conversation: conversation
                });
                return _context2.a(3, 22);
              case 6:
                if (conversationId) {
                  (_this$_integrationCon7 = _this._integrationConfig) === null || _this$_integrationCon7 === void 0 ? void 0 : (_this$_integrationCon8 = _this$_integrationCon7.onCreateLog) === null || _this$_integrationCon8 === void 0 ? void 0 : _this$_integrationCon8.call(_this$_integrationCon7, conversationId, actionType);
                }
                return _context2.a(3, 22);
              case 7:
                actionInfo = info.getActionInfo();
                if (actionInfo && _this._dialerView) {
                  _this._dialerView.trackCallingEvent(location);
                  _this._dialerView.call({
                    recipient: actionInfo
                  });
                  _this._messageStore.onClickToCall({
                    // for track conversation.type
                    fromType: conversation.type
                  });
                  _this._router.push('/dialer', _defineProperty({}, _views.SyncTabId.DIALPAD, 'keypad'));
                } else if (process.env.NODE_ENV !== 'production') {
                  _this.logger.error('can\'t handle "call" action', {
                    signalSourceInfo: signalSourceInfo,
                    matchedContact: matchedContact,
                    conversation: conversation
                  });
                }
                return _context2.a(3, 22);
              case 8:
                _actionInfo = info.getActionInfo();
                if (_actionInfo) {
                  (_this$_composeText = _this._composeText) === null || _this$_composeText === void 0 ? void 0 : _this$_composeText.addToNumber(_actionInfo);
                  _this._router.push('/composeText');
                  // for track
                  _this._messageStore.onClickToSMS();
                } else if (process.env.NODE_ENV !== 'production') {
                  // eslint-disable-next-line no-console
                  console.error('[ConversationsView], can\'t handle "call" action', {
                    signalSourceInfo: signalSourceInfo,
                    matchedContact: matchedContact,
                    conversation: conversation
                  });
                }
                return _context2.a(3, 22);
              case 9:
                if (conversationId) {
                  _context2.n = 10;
                  break;
                }
                return _context2.a(2);
              case 10:
                _this._messageStore.unreadMessage(conversationId);
                return _context2.a(3, 22);
              case 11:
                _this._messageStore.readMessages(conversationId);
                return _context2.a(3, 22);
              case 12:
                _this._messageStore.readMessages(conversationId);
                _this._messageStore.onUnmarkMessages();
                return _context2.a(3, 22);
              case 13:
                if (conversationId) {
                  _context2.n = 14;
                  break;
                }
                return _context2.a(2);
              case 14:
                _this._modalView.open(_this.confirmDeleteModal, {
                  conversation: conversation
                });
                return _context2.a(3, 22);
              case 15:
                if (info.faxAttachmentUri) {
                  _context2.n = 16;
                  break;
                }
                return _context2.a(2);
              case 16:
                window.open(info.faxAttachmentUri);
                _this._messageStore.readMessages(conversationId);
                return _context2.a(3, 22);
              case 17:
                // for download also mark as read done
                _this._messageStore.readMessages(conversationId);
                return _context2.a(3, 22);
              case 18:
                _this._voicemailAudio.download(conversationId, info.voicemailAttachmentUri);
                return _context2.a(3, 22);
              case 19:
                result = info.copyNumber();
                if (result) {
                  _this._alertSuccess(result);
                }
                return _context2.a(3, 22);
              case 20:
                _context2.n = 21;
                return (_this$_messageThreads3 = _this._messageThreadsView) === null || _this$_messageThreads3 === void 0 ? void 0 : _this$_messageThreads3.processThreadAction(conversationId, actionType);
              case 21:
                _result = _context2.v;
                // if still not catch the action, log the error
                if (!_result) {
                  _this.logger.warn("can't handle \"".concat(actionType, "\" action"));
                }
              case 22:
                return _context2.a(2);
            }
          }, _callee2);
        }));
        return function (_x, _x2) {
          return _ref3.apply(this, arguments);
        };
      }();
    };
    if (_this._portManager.shared) {
      _this._portManager.onServer(function () {
        _this.bindClearSearchInputListener();
      });
    } else {
      _this.bindClearSearchInputListener();
    }
    return _this;
  }
  _inherits(ConversationsViewSpring, _RcViewModule);
  return _createClass(ConversationsViewSpring, [{
    key: "disableLinks",
    get: function get() {
      return this._connectivityManager.isOfflineMode || this._connectivityManager.isVoipOnlyMode || this._rateLimiter.restricted;
    }
  }, {
    key: "bindClearSearchInputListener",
    value: function bindClearSearchInputListener() {
      var _this2 = this;
      (0, _nextCore.fromWatchValue)(this, function () {
        return _this2._router.currentPath;
      }).pipe((0, _rxjs.filter)(function (currentPath) {
        return ['/fax', '/messages', '/dialer'].includes(currentPath);
      }), (0, _rxjs.distinctUntilChanged)(), (0, _rxjs.tap)(function () {
        _this2._conversations.updateSearchInput('');
      }), _nextCore.takeUntilAppDestroy).subscribe();
    }
  }, {
    key: "_setLastPosition",
    value: function _setLastPosition(page, val) {
      this.lastPosition[page] = val;
    }
  }, {
    key: "setLastPosition",
    value: function () {
      var _setLastPosition2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(page, val) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              this._setLastPosition(page, val);
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function setLastPosition(_x3, _x4) {
        return _setLastPosition2.apply(this, arguments);
      }
      return setLastPosition;
    }()
  }, {
    key: "_alertSuccess",
    value: function _alertSuccess(message, ttl) {
      this._toast.success({
        message: message,
        allowDuplicates: false,
        ttl: ttl
      });
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref5) {
      var _this$_conversationsV;
      var typeFilter = _ref5.typeFilter;
      var readStatusFilter = this._conversations.readStatusFilterMap[typeFilter];
      return {
        lastPosition: this.lastPosition["".concat(typeFilter, "-").concat(readStatusFilter)],
        preparing: !(this._locale.ready && this._conversations.ready && (!this._contactMatcher || this._contactMatcher.ready) && this._regionSettings.ready && this._appFeatures.ready && this._connectivityMonitor.ready && this._rateLimiter.ready && (!this._call || this._call.ready) && (!this._conversationLogger || this._conversationLogger.ready)),
        searchInput: this._conversations.searchInput,
        typeFilter: typeFilter,
        readStatusFilter: readStatusFilter,
        showNewButton:
        // do not block new text entry for current stage
        typeFilter === 'Text' ? true : typeFilter === 'Fax' ? this._appFeatures.hasSendFaxPermission : false,
        conversations: this._conversations.typeFilteredConversationsMap[typeFilter],
        loadingNextPage: this._conversations.loadingOldConversations,
        crmName: this._integrationConfig.name,
        showLogPopover: (_this$_conversationsV = this._conversationsViewOptions) === null || _this$_conversationsV === void 0 ? void 0 : _this$_conversationsV.showLogPopover,
        disableLinks: this.disableLinks,
        createNewEntityTooltip: this._integrationConfig.createNewEntityTooltip
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_) {
      var _this3 = this,
        _this$_conversationsV2;
      return {
        setLastPosition: function setLastPosition(page, position) {
          _this3.setLastPosition(page, position);
        },
        useConversationItemInfo: function useConversationItemInfo(conversation) {
          return _this3.useConversationItemInfo(conversation, {
            pageType: 'list'
          });
        },
        useActionsHandler: this.useActionsHandler,
        useItemRender: (_this$_conversationsV2 = this._conversationsViewableManager) === null || _this$_conversationsV2 === void 0 ? void 0 : _this$_conversationsV2.useItemRender,
        onNewClick: function onNewClick(type) {
          switch (type) {
            case 'Text':
              _this3._router.push('/composeText');
              break;
            case 'Fax':
              _this3._router.push('/composeFax');
              break;
            default:
              break;
          }
        },
        updateReadStatusFilterMap: function updateReadStatusFilterMap(status, type) {
          _this3._conversations.updateReadStatusFilterMap(status, type);
        },
        onSearchInputChange: function onSearchInputChange(e) {
          _this3._conversations.updateSearchInput(e.currentTarget.value);
        }
      };
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this4 = this,
        _this$_conversationsV3;
      var _useRef = (0, _react.useRef)(this.getUIFunctions(props)),
        uiFunctions = _useRef.current;
      var isText = props.typeFilter === _messageTypes.messageTypes.text;
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this4.getUIProps(props);
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      var PersonalComponent = ((_this$_conversationsV3 = this._conversationsViewOptions) === null || _this$_conversationsV3 === void 0 ? void 0 : _this$_conversationsV3.component) || _ConversationsPage.ConversationsPage;
      var header = /*#__PURE__*/_react["default"].createElement(_ConversationsPage.ConversationsHeader, _extends({}, _props, uiFunctions));
      var children = /*#__PURE__*/_react["default"].createElement(PersonalComponent, _extends({}, _props, uiFunctions));
      if (!this._messageThreadsView || !isText) {
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, header, children);
      }
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, header, /*#__PURE__*/_react["default"].createElement(this._messageThreadsView.component, uiFunctions, children));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_conversationsViewableManager", [_dec9, _dec0], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_messageThreadsView", [_dec1, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "confirmDeleteModal", [_nextCore.portal], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;
    return this._modalView.create({
      props: function props(_ref6) {
        var conversation = _ref6.conversation;
        var isFax = (0, _messageHelper.messageIsFax)(conversation);
        return _defineProperty({
          variant: 'confirm',
          loadingMode: 'button',
          header: (0, _i18n.t)(isFax ? 'deleteFax' : 'deleteVoiceMail'),
          content: (0, _i18n.t)(isFax ? 'sureToDeleteFax' : 'sureToDeleteVoiceMail'),
          confirmButtonText: (0, _i18n.t)('delete'),
          // avoid the action menu be focus back, because that already be hidden
          disableBackdropClick: false,
          disableRestoreFocus: true,
          confirmButtonProps: dangerButtonProps,
          onConfirm: function onConfirm() {
            var conversationId = conversation.conversationId;
            if (!conversationId) return;
            _this5._conversations.deleteConversation(conversationId);
          }
        }, 'data-sign', 'deleteModal');
      }
    });
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_theme", [_dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_call", [_dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_dialerView", [_dec15, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "lastPosition", [_nextCore.state, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setLastPosition", [_nextCore.action, _dec18, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "_setLastPosition"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLastPosition", [_dec20, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "setLastPosition"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Conversations.view.js.map
