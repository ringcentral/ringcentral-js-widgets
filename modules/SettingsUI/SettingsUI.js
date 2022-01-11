"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsUI = void 0;

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.name");

var _di = require("@ringcentral-integration/commons/lib/di");

var _formatNumber = _interopRequireDefault(require("@ringcentral-integration/commons/lib/formatNumber"));

var _loginStatus = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Auth/loginStatus"));

var _core = require("@ringcentral-integration/core");

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DEFAULT_REGION_SETTINGS_URL = '/settings/region';
var DEFAULT_CALLING_SETTINGS_URL = '/settings/calling';
var DEFAULT_AUDIO_SETTINGS_URL = '/settings/audio';
var DEFAULT_FEEDBACK_SETTINGS_URL = '/settings/feedback';
var SettingsUI = (_dec = (0, _di.Module)({
  name: 'SettingsUI',
  deps: ['Auth', 'Brand', 'Locale', 'AccountInfo', 'ExtensionInfo', 'RegionSettings', 'ExtensionFeatures', 'AppFeatures', 'RouterInteraction', {
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
      var _extensionFeatures$fe, _extensionFeatures$fe2;

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
      var _this$_deps = this._deps,
          accountInfo = _this$_deps.accountInfo,
          auth = _this$_deps.auth,
          brand = _this$_deps.brand,
          extensionInfo = _this$_deps.extensionInfo,
          extensionFeatures = _this$_deps.extensionFeatures,
          locale = _this$_deps.locale,
          localeSettings = _this$_deps.localeSettings,
          regionSettings = _this$_deps.regionSettings,
          callingSettings = _this$_deps.callingSettings,
          version = _this$_deps.version,
          appFeatures = _this$_deps.appFeatures,
          presence = _this$_deps.presence,
          userGuide = _this$_deps.userGuide;
      var loginNumber = brand.name;
      var loggedIn = auth.loginStatus === _loginStatus["default"].loggedIn;

      if (loggedIn && accountInfo.ready && extensionInfo.ready && accountInfo.mainCompanyNumber) {
        // If no extensionNumber, extensionNumber field needs to be omitted
        var extensionNumber = extensionInfo.extensionNumber && extensionInfo.extensionNumber !== '0' ? extensionInfo.extensionNumber : null;
        var phoneNumber = [accountInfo.mainCompanyNumber, extensionNumber].join('*');
        loginNumber = (0, _formatNumber["default"])({
          phoneNumber: phoneNumber,
          countryCode: regionSettings.countryCode,
          areaCode: regionSettings.areaCode
        });
      }

      return {
        version: version,
        loginNumber: loginNumber,
        showFeedback: showFeedback,
        showQuickAccess: showQuickAccess,
        showSpinner: !(accountInfo.ready && auth.ready && loggedIn && extensionInfo.ready && locale.ready && regionSettings.ready && (!callingSettings || callingSettings.ready) && appFeatures.ready && (!presence || presence.ready) && (!localeSettings || localeSettings.ready)),
        showCalling: showCalling && callingSettings && appFeatures.isCallingEnabled,
        showAudio: showAudio && appFeatures.isCallingEnabled,
        showRegion: loggedIn && regionSettings.showRegionSettings && appFeatures.isCallingEnabled,
        currentLocale: locale.currentLocale,
        eulaLabel: brand.brandConfig.eulaLabel,
        eulaLink: brand.brandConfig.eulaLink,
        outboundSMS: !!appFeatures.hasOutboundSMSPermission || !!appFeatures.hasInternalSMSPermission,
        isCallQueueMember: extensionInfo.isCallQueueMember,
        dndStatus: presence === null || presence === void 0 ? void 0 : presence.dndStatus,
        userStatus: presence === null || presence === void 0 ? void 0 : presence.userStatus,
        openPresenceSettings: !!(presence && params && params.showPresenceSettings),
        showPresenceSettings: showPresenceSettings && !!((_extensionFeatures$fe = extensionFeatures.features) === null || _extensionFeatures$fe === void 0 ? void 0 : (_extensionFeatures$fe2 = _extensionFeatures$fe.EditPresenceStatus) === null || _extensionFeatures$fe2 === void 0 ? void 0 : _extensionFeatures$fe2.available),
        supportedLocales: localeSettings === null || localeSettings === void 0 ? void 0 : localeSettings.supportedLocales,
        savedLocale: localeSettings === null || localeSettings === void 0 ? void 0 : localeSettings.savedLocale,
        showUserGuide: showUserGuide && !!(userGuide === null || userGuide === void 0 ? void 0 : userGuide.hasPermission)
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref3) {
      var _ref3$regionSettingsU = _ref3.regionSettingsUrl,
          regionSettingsUrl = _ref3$regionSettingsU === void 0 ? DEFAULT_REGION_SETTINGS_URL : _ref3$regionSettingsU,
          _ref3$callingSettings = _ref3.callingSettingsUrl,
          callingSettingsUrl = _ref3$callingSettings === void 0 ? DEFAULT_CALLING_SETTINGS_URL : _ref3$callingSettings,
          _ref3$audioSettingsUr = _ref3.audioSettingsUrl,
          audioSettingsUrl = _ref3$audioSettingsUr === void 0 ? DEFAULT_AUDIO_SETTINGS_URL : _ref3$audioSettingsUr,
          _ref3$feedbackSetting = _ref3.feedbackSettingsUrl,
          feedbackSettingsUrl = _ref3$feedbackSetting === void 0 ? DEFAULT_FEEDBACK_SETTINGS_URL : _ref3$feedbackSetting;
      var _this$_deps2 = this._deps,
          auth = _this$_deps2.auth,
          presence = _this$_deps2.presence,
          routerInteraction = _this$_deps2.routerInteraction,
          localeSettings = _this$_deps2.localeSettings,
          userGuide = _this$_deps2.userGuide,
          quickAccess = _this$_deps2.quickAccess;
      return {
        onLogoutButtonClick: function onLogoutButtonClick() {
          return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return auth.logout();

                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }))();
        },
        onRegionSettingsLinkClick: function onRegionSettingsLinkClick() {
          routerInteraction.push(regionSettingsUrl);
        },
        onCallingSettingsLinkClick: function onCallingSettingsLinkClick() {
          routerInteraction.push(callingSettingsUrl);
        },
        onAudioSettingsLinkClick: function onAudioSettingsLinkClick() {
          routerInteraction.push(audioSettingsUrl);
        },
        onFeedbackSettingsLinkClick: function onFeedbackSettingsLinkClick() {
          routerInteraction.push(feedbackSettingsUrl);
        },
        onUserGuideClick: function onUserGuideClick() {
          userGuide.start();
        },
        onQuickAccessLinkClick: function onQuickAccessLinkClick() {
          quickAccess.enter();
        },
        setAvailable: function setAvailable() {
          return presence === null || presence === void 0 ? void 0 : presence.setAvailable();
        },
        setBusy: function setBusy() {
          return presence === null || presence === void 0 ? void 0 : presence.setBusy();
        },
        setDoNotDisturb: function setDoNotDisturb() {
          return presence === null || presence === void 0 ? void 0 : presence.setDoNotDisturb();
        },
        setInvisible: function setInvisible() {
          return presence === null || presence === void 0 ? void 0 : presence.setInvisible();
        },
        toggleAcceptCallQueueCalls: function toggleAcceptCallQueueCalls() {
          return presence === null || presence === void 0 ? void 0 : presence.toggleAcceptCallQueueCalls();
        },
        saveLocale: localeSettings && function (locale) {
          return localeSettings.saveLocale(locale);
        }
      };
    }
  }]);

  return SettingsUI;
}(_core.RcUIModuleV2)) || _class);
exports.SettingsUI = SettingsUI;
//# sourceMappingURL=SettingsUI.js.map
