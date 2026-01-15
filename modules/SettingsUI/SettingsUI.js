"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsUI = void 0;
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.function.name.js");
var _di = require("@ringcentral-integration/commons/lib/di");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _Auth = require("@ringcentral-integration/commons/modules/Auth");
var _core = require("@ringcentral-integration/core");
var _excluded = ["storageKey", "enableCache", "deps"];
var _dec, _class;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
var DEFAULT_REGION_SETTINGS_URL = '/settings/region';
var DEFAULT_CALLING_SETTINGS_URL = '/settings/calling';
var DEFAULT_AUDIO_SETTINGS_URL = '/settings/audio';
var DEFAULT_FEEDBACK_SETTINGS_URL = '/settings/feedback';
var DEFAULT_ISSUE_TACKING_SETTINGS_URL = '/settings/issuesTracking';
var SettingsUI = exports.SettingsUI = (_dec = (0, _di.Module)({
  name: 'SettingsUI',
  deps: ['Auth', 'Brand', 'Locale', 'AccountInfo', 'ExtensionInfo', 'RegionSettings', 'ExtensionFeatures', 'AppFeatures', 'RouterInteraction', {
    dep: 'CPRClient',
    optional: true
  }, {
    dep: 'CPRClientUI',
    optional: true
  }, {
    dep: 'Version',
    optional: true
  }, {
    dep: 'Presence',
    optional: true
  }, {
    dep: 'CallingSettings',
    optional: true
  }, {
    dep: 'LocaleSettings',
    optional: true
  }, {
    dep: 'QuickAccess',
    optional: true
  }, {
    dep: 'UserGuide',
    optional: true
  }, {
    dep: 'SettingsUIOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  function SettingsUI(_ref) {
    var storageKey = _ref.storageKey,
      enableCache = _ref.enableCache,
      deps = _ref.deps,
      options = _objectWithoutProperties(_ref, _excluded);
    _classCallCheck(this, SettingsUI);
    return _callSuper(this, SettingsUI, [{
      deps: deps || options,
      storageKey: storageKey,
      enableCache: enableCache
    }]);
  }
  _inherits(SettingsUI, _RcUIModuleV);
  return _createClass(SettingsUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref2) {
      var _this$_deps$presence, _this$_deps$presence2, _this$_deps$extension, _this$_deps$extension2, _this$_deps$localeSet, _this$_deps$localeSet2, _this$_deps$userGuide, _this$_deps$cPRClient, _this$_deps$settingsU, _this$_deps$settingsU2;
      var _ref2$showCalling = _ref2.showCalling,
        showCalling = _ref2$showCalling === void 0 ? true : _ref2$showCalling,
        _ref2$showAudio = _ref2.showAudio,
        showAudio = _ref2$showAudio === void 0 ? true : _ref2$showAudio,
        _ref2$showFeedback = _ref2.showFeedback,
        showFeedback = _ref2$showFeedback === void 0 ? true : _ref2$showFeedback,
        _ref2$showUserGuide = _ref2.showUserGuide,
        showUserGuide = _ref2$showUserGuide === void 0 ? true : _ref2$showUserGuide,
        _ref2$showPresenceSet = _ref2.showPresenceSettings,
        showPresenceSettings = _ref2$showPresenceSet === void 0 ? true : _ref2$showPresenceSet,
        _ref2$showQuickAccess = _ref2.showQuickAccess,
        showQuickAccess = _ref2$showQuickAccess === void 0 ? false : _ref2$showQuickAccess,
        params = _ref2.params;
      var loginNumber = this._deps.brand.name;
      var loggedIn = this._deps.auth.loginStatus === _Auth.loginStatus.loggedIn;
      if (loggedIn && this._deps.accountInfo.ready && this._deps.extensionInfo.ready && this._deps.accountInfo.mainCompanyNumber) {
        // If no extensionNumber, extensionNumber field needs to be omitted
        var extensionNumber = this._deps.extensionInfo.extensionNumber && this._deps.extensionInfo.extensionNumber !== '0' ? this._deps.extensionInfo.extensionNumber : null;
        var phoneNumber = [this._deps.accountInfo.mainCompanyNumber, extensionNumber].join('*');
        // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
        loginNumber = (0, _formatNumber.formatNumber)({
          phoneNumber: phoneNumber,
          countryCode: this._deps.regionSettings.countryCode,
          areaCode: this._deps.regionSettings.areaCode
        });
      }
      return {
        // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
        version: this._deps.version,
        loginNumber: loginNumber,
        showFeedback: showFeedback,
        showQuickAccess: showQuickAccess,
        showSpinner: !(this._deps.accountInfo.ready && this._deps.auth.ready && loggedIn && this._deps.extensionInfo.ready && this._deps.locale.ready && this._deps.regionSettings.ready && (!this._deps.callingSettings || this._deps.callingSettings.ready) && this._deps.appFeatures.ready && (!this._deps.presence || this._deps.presence.ready) && (!this._deps.localeSettings || this._deps.localeSettings.ready)),
        showCalling: showCalling && this._deps.callingSettings && this._deps.appFeatures.isCallingEnabled,
        showAudio: showAudio && this._deps.appFeatures.isCallingEnabled,
        showRegion: loggedIn && this._deps.regionSettings.showRegionSettings && this._deps.appFeatures.isCallingEnabled,
        currentLocale: this._deps.locale.currentLocale,
        // @ts-expect-error TS(2322): Type 'string | { translations: { [x: string]: stri... Remove this comment to see the full error message
        eulaLabel: this._deps.brand.brandConfig.eulaLabel,
        // @ts-expect-error TS(2322): Type 'URL | { translations: { [x: string]: string;... Remove this comment to see the full error message
        eulaLink: this._deps.brand.brandConfig.eulaLink,
        outboundSMS: !!this._deps.appFeatures.hasOutboundSMSPermission || !!this._deps.appFeatures.hasInternalSMSPermission,
        isCallQueueMember: this._deps.extensionInfo.isCallQueueMember,
        // @ts-expect-error TS(2322): Type '"TakeAllCalls" | "DoNotAcceptAnyCalls" | "Do... Remove this comment to see the full error message
        dndStatus: (_this$_deps$presence = this._deps.presence) === null || _this$_deps$presence === void 0 ? void 0 : _this$_deps$presence.dndStatus,
        // @ts-expect-error TS(2322): Type '"Offline" | "Busy" | "Available" | null | un... Remove this comment to see the full error message
        userStatus: (_this$_deps$presence2 = this._deps.presence) === null || _this$_deps$presence2 === void 0 ? void 0 : _this$_deps$presence2.userStatus,
        openPresenceSettings: !!(this._deps.presence && params && params.showPresenceSettings),
        showPresenceSettings: showPresenceSettings && !!((_this$_deps$extension = this._deps.extensionFeatures.features) === null || _this$_deps$extension === void 0 ? void 0 : (_this$_deps$extension2 = _this$_deps$extension.EditPresenceStatus) === null || _this$_deps$extension2 === void 0 ? void 0 : _this$_deps$extension2.available),
        supportedLocales: (_this$_deps$localeSet = this._deps.localeSettings) === null || _this$_deps$localeSet === void 0 ? void 0 : _this$_deps$localeSet.supportedLocales,
        savedLocale: (_this$_deps$localeSet2 = this._deps.localeSettings) === null || _this$_deps$localeSet2 === void 0 ? void 0 : _this$_deps$localeSet2.savedLocale,
        showUserGuide: showUserGuide && !!((_this$_deps$userGuide = this._deps.userGuide) === null || _this$_deps$userGuide === void 0 ? void 0 : _this$_deps$userGuide.hasPermission),
        showReportIssue: (_this$_deps$cPRClient = this._deps.cPRClient) === null || _this$_deps$cPRClient === void 0 ? void 0 : _this$_deps$cPRClient.hasPermission,
        brandConfig: this._deps.brand.brandConfig,
        showRemoveMeetingWarning: !!((_this$_deps$settingsU = this._deps.settingsUIOptions) === null || _this$_deps$settingsU === void 0 ? void 0 : _this$_deps$settingsU.showRemoveMeetingWarning),
        showTrackingIssue: !!((_this$_deps$settingsU2 = this._deps.settingsUIOptions) === null || _this$_deps$settingsU2 === void 0 ? void 0 : _this$_deps$settingsU2.showTrackingIssue)
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref3) {
      var _this = this;
      var _ref3$regionSettingsU = _ref3.regionSettingsUrl,
        regionSettingsUrl = _ref3$regionSettingsU === void 0 ? DEFAULT_REGION_SETTINGS_URL : _ref3$regionSettingsU,
        _ref3$callingSettings = _ref3.callingSettingsUrl,
        callingSettingsUrl = _ref3$callingSettings === void 0 ? DEFAULT_CALLING_SETTINGS_URL : _ref3$callingSettings,
        _ref3$audioSettingsUr = _ref3.audioSettingsUrl,
        audioSettingsUrl = _ref3$audioSettingsUr === void 0 ? DEFAULT_AUDIO_SETTINGS_URL : _ref3$audioSettingsUr,
        _ref3$feedbackSetting = _ref3.feedbackSettingsUrl,
        feedbackSettingsUrl = _ref3$feedbackSetting === void 0 ? DEFAULT_FEEDBACK_SETTINGS_URL : _ref3$feedbackSetting;
      return {
        onLogoutButtonClick: function () {
          var _onLogoutButtonClick = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  _context.n = 1;
                  return _this._deps.auth.logout();
                case 1:
                  return _context.a(2);
              }
            }, _callee);
          }));
          function onLogoutButtonClick() {
            return _onLogoutButtonClick.apply(this, arguments);
          }
          return onLogoutButtonClick;
        }(),
        onRegionSettingsLinkClick: function onRegionSettingsLinkClick() {
          _this._deps.routerInteraction.push(regionSettingsUrl);
        },
        onCallingSettingsLinkClick: function onCallingSettingsLinkClick() {
          _this._deps.routerInteraction.push(callingSettingsUrl);
        },
        onAudioSettingsLinkClick: function onAudioSettingsLinkClick() {
          _this._deps.routerInteraction.push(audioSettingsUrl);
        },
        onFeedbackSettingsLinkClick: function onFeedbackSettingsLinkClick() {
          _this._deps.routerInteraction.push(feedbackSettingsUrl);
        },
        onUserGuideClick: function onUserGuideClick() {
          var _this$_deps$userGuide2;
          (_this$_deps$userGuide2 = _this._deps.userGuide) === null || _this$_deps$userGuide2 === void 0 ? void 0 : _this$_deps$userGuide2.start();
        },
        onReportIssueClick: function onReportIssueClick() {
          var _this$_deps$cPRClient2;
          (_this$_deps$cPRClient2 = _this._deps.cPRClientUI) === null || _this$_deps$cPRClient2 === void 0 ? void 0 : _this$_deps$cPRClient2.openCPRDialog();
        },
        onQuickAccessLinkClick: function onQuickAccessLinkClick() {
          var _this$_deps$quickAcce;
          (_this$_deps$quickAcce = _this._deps.quickAccess) === null || _this$_deps$quickAcce === void 0 ? void 0 : _this$_deps$quickAcce.enter();
        },
        setAvailable: function setAvailable() {
          var _this$_deps$presence3;
          return (_this$_deps$presence3 = _this._deps.presence) === null || _this$_deps$presence3 === void 0 ? void 0 : _this$_deps$presence3.setAvailable();
        },
        setBusy: function setBusy() {
          var _this$_deps$presence4;
          return (_this$_deps$presence4 = _this._deps.presence) === null || _this$_deps$presence4 === void 0 ? void 0 : _this$_deps$presence4.setBusy();
        },
        setDoNotDisturb: function setDoNotDisturb() {
          var _this$_deps$presence5;
          return (_this$_deps$presence5 = _this._deps.presence) === null || _this$_deps$presence5 === void 0 ? void 0 : _this$_deps$presence5.setDoNotDisturb();
        },
        setInvisible: function setInvisible() {
          var _this$_deps$presence6;
          return (_this$_deps$presence6 = _this._deps.presence) === null || _this$_deps$presence6 === void 0 ? void 0 : _this$_deps$presence6.setInvisible();
        },
        toggleAcceptCallQueueCalls: function toggleAcceptCallQueueCalls() {
          var _this$_deps$presence7;
          return (_this$_deps$presence7 = _this._deps.presence) === null || _this$_deps$presence7 === void 0 ? void 0 : _this$_deps$presence7.toggleAcceptCallQueueCalls();
        },
        // @ts-expect-error TS(2322): Type '((locale: string) => Promise<void>) | undefi... Remove this comment to see the full error message
        saveLocale: this._deps.localeSettings && function (locale) {
          var _this$_deps$localeSet3;
          return (_this$_deps$localeSet3 = _this._deps.localeSettings) === null || _this$_deps$localeSet3 === void 0 ? void 0 : _this$_deps$localeSet3.saveLocale(locale);
        },
        onTrackingClick: function onTrackingClick() {
          _this._deps.routerInteraction.push(DEFAULT_ISSUE_TACKING_SETTINGS_URL);
        }
      };
    }
  }]);
}(_core.RcUIModuleV2)) || _class);
//# sourceMappingURL=SettingsUI.js.map
