"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.join");
require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsUI = void 0;
require("regenerator-runtime/runtime");
var _di = require("@ringcentral-integration/commons/lib/di");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _Auth = require("@ringcentral-integration/commons/modules/Auth");
var _core = require("@ringcentral-integration/core");
var _dec, _class;
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var DEFAULT_REGION_SETTINGS_URL = '/settings/region';
var DEFAULT_CALLING_SETTINGS_URL = '/settings/calling';
var DEFAULT_AUDIO_SETTINGS_URL = '/settings/audio';
var DEFAULT_FEEDBACK_SETTINGS_URL = '/settings/feedback';
var SettingsUI = (_dec = (0, _di.Module)({
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
  _inherits(SettingsUI, _RcUIModuleV);
  var _super = _createSuper(SettingsUI);
  function SettingsUI(_ref) {
    var storageKey = _ref.storageKey,
      enableCache = _ref.enableCache,
      deps = _ref.deps,
      options = _objectWithoutProperties(_ref, ["storageKey", "enableCache", "deps"]);
    _classCallCheck(this, SettingsUI);
    return _super.call(this, {
      deps: deps || options,
      storageKey: storageKey,
      enableCache: enableCache
    });
  }
  _createClass(SettingsUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref2) {
      var _this$_deps$presence, _this$_deps$presence2, _this$_deps$extension, _this$_deps$extension2, _this$_deps$localeSet, _this$_deps$localeSet2, _this$_deps$userGuide, _this$_deps$cPRClient, _this$_deps$settingsU;
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
        showRemoveMeetingWarning: !!((_this$_deps$settingsU = this._deps.settingsUIOptions) === null || _this$_deps$settingsU === void 0 ? void 0 : _this$_deps$settingsU.showRemoveMeetingWarning)
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
          var _onLogoutButtonClick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return _this._deps.auth.logout();
                  case 2:
                  case "end":
                    return _context.stop();
                }
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
        }
      };
    }
  }]);
  return SettingsUI;
}(_core.RcUIModuleV2)) || _class);
exports.SettingsUI = SettingsUI;
//# sourceMappingURL=SettingsUI.js.map
