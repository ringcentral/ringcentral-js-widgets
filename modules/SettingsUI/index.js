"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.name");

var _di = require("@ringcentral-integration/commons/lib/di");

var _formatNumber = _interopRequireDefault(require("@ringcentral-integration/commons/lib/formatNumber"));

var _loginStatus = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Auth/loginStatus"));

var _RcUIModule2 = _interopRequireDefault(require("../../lib/RcUIModule"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DEFAULT_REGION_SETTINGS_URL = '/settings/region';
var DEFAULT_CALLING_SETTINGS_URL = '/settings/calling';
var DEFAULT_AUDIO_SETTINGS_URL = '/settings/audio';
var DEFAULT_FEEDBACK_SETTINGS_URL = '/settings/feedback';
var SettingsUI = (_dec = (0, _di.Module)({
  name: 'SettingsUI',
  deps: ['Auth', 'Brand', 'Locale', {
    dep: 'Version',
    optional: true
  }, {
    dep: 'Presence',
    optional: true
  }, 'AccountInfo', 'ExtensionInfo', 'RegionSettings', 'ExtensionFeatures', 'RouterInteraction', {
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
}), _dec(_class = /*#__PURE__*/function (_RcUIModule) {
  _inherits(SettingsUI, _RcUIModule);

  var _super = _createSuper(SettingsUI);

  function SettingsUI() {
    _classCallCheck(this, SettingsUI);

    return _super.apply(this, arguments);
  }

  _createClass(SettingsUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _extensionFeatures$fe, _extensionFeatures$fe2;

      var _ref$phone = _ref.phone,
          accountInfo = _ref$phone.accountInfo,
          auth = _ref$phone.auth,
          brand = _ref$phone.brand,
          extensionInfo = _ref$phone.extensionInfo,
          locale = _ref$phone.locale,
          localeSettings = _ref$phone.localeSettings,
          regionSettings = _ref$phone.regionSettings,
          callingSettings = _ref$phone.callingSettings,
          version = _ref$phone.version,
          extensionFeatures = _ref$phone.extensionFeatures,
          presence = _ref$phone.presence,
          userGuide = _ref$phone.userGuide,
          _ref$showRegion = _ref.showRegion,
          showRegion = _ref$showRegion === void 0 ? true : _ref$showRegion,
          _ref$showCalling = _ref.showCalling,
          showCalling = _ref$showCalling === void 0 ? true : _ref$showCalling,
          _ref$showAudio = _ref.showAudio,
          showAudio = _ref$showAudio === void 0 ? true : _ref$showAudio,
          _ref$showFeedback = _ref.showFeedback,
          showFeedback = _ref$showFeedback === void 0 ? true : _ref$showFeedback,
          _ref$showUserGuide = _ref.showUserGuide,
          showUserGuide = _ref$showUserGuide === void 0 ? true : _ref$showUserGuide,
          _ref$showPresenceSett = _ref.showPresenceSettings,
          showPresenceSettings = _ref$showPresenceSett === void 0 ? true : _ref$showPresenceSett,
          _ref$showQuickAccess = _ref.showQuickAccess,
          showQuickAccess = _ref$showQuickAccess === void 0 ? false : _ref$showQuickAccess,
          params = _ref.params;
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
        showSpinner: !(accountInfo.ready && auth.ready && loggedIn && extensionInfo.ready && locale.ready && regionSettings.ready && (!callingSettings || callingSettings.ready) && extensionFeatures.ready && (!presence || presence.ready) && (!localeSettings || localeSettings.ready)),
        showCalling: showCalling && callingSettings && extensionFeatures.isCallingEnabled,
        showAudio: showAudio && extensionFeatures.isCallingEnabled,
        showRegion: loggedIn && brand.code === 'rc' && regionSettings.showReginSetting && extensionFeatures.isCallingEnabled && showRegion,
        currentLocale: locale.currentLocale,
        brandId: brand.id,
        ringoutEnabled: extensionFeatures.isRingOutEnabled,
        outboundSMS: !!extensionFeatures.hasOutboundSMSPermission || !!extensionFeatures.hasInternalSMSPermission,
        isCallQueueMember: extensionInfo.isCallQueueMember,
        dndStatus: presence && presence.dndStatus,
        userStatus: presence && presence.userStatus,
        openPresenceSettings: !!(presence && params && params.showPresenceSettings),
        showPresenceSettings: showPresenceSettings && !!((_extensionFeatures$fe = extensionFeatures.features) === null || _extensionFeatures$fe === void 0 ? void 0 : (_extensionFeatures$fe2 = _extensionFeatures$fe.EditPresenceStatus) === null || _extensionFeatures$fe2 === void 0 ? void 0 : _extensionFeatures$fe2.available),
        supportedLocales: localeSettings && localeSettings.supportedLocales,
        savedLocale: localeSettings && localeSettings.savedLocale,
        showUserGuide: showUserGuide && !!(userGuide === null || userGuide === void 0 ? void 0 : userGuide.hasPermission)
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _ref2$regionSettingsU = _ref2.regionSettingsUrl,
          regionSettingsUrl = _ref2$regionSettingsU === void 0 ? DEFAULT_REGION_SETTINGS_URL : _ref2$regionSettingsU,
          _ref2$callingSettings = _ref2.callingSettingsUrl,
          callingSettingsUrl = _ref2$callingSettings === void 0 ? DEFAULT_CALLING_SETTINGS_URL : _ref2$callingSettings,
          _ref2$audioSettingsUr = _ref2.audioSettingsUrl,
          audioSettingsUrl = _ref2$audioSettingsUr === void 0 ? DEFAULT_AUDIO_SETTINGS_URL : _ref2$audioSettingsUr,
          _ref2$feedbackSetting = _ref2.feedbackSettingsUrl,
          feedbackSettingsUrl = _ref2$feedbackSetting === void 0 ? DEFAULT_FEEDBACK_SETTINGS_URL : _ref2$feedbackSetting,
          _ref2$phone = _ref2.phone,
          auth = _ref2$phone.auth,
          presence = _ref2$phone.presence,
          routerInteraction = _ref2$phone.routerInteraction,
          localeSettings = _ref2$phone.localeSettings,
          userGuide = _ref2$phone.userGuide,
          quickAccess = _ref2$phone.quickAccess;
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
          return presence && presence.setAvailable.apply(presence, arguments);
        },
        setBusy: function setBusy() {
          return presence && presence.setBusy.apply(presence, arguments);
        },
        setDoNotDisturb: function setDoNotDisturb() {
          return presence && presence.setDoNotDisturb.apply(presence, arguments);
        },
        setInvisible: function setInvisible() {
          return presence && presence.setInvisible.apply(presence, arguments);
        },
        toggleAcceptCallQueueCalls: function toggleAcceptCallQueueCalls() {
          return presence && presence.toggleAcceptCallQueueCalls.apply(presence, arguments);
        },
        saveLocale: localeSettings && function (locale) {
          return localeSettings.saveLocale(locale);
        }
      };
    }
  }]);

  return SettingsUI;
}(_RcUIModule2["default"])) || _class);
exports["default"] = SettingsUI;
//# sourceMappingURL=index.js.map
