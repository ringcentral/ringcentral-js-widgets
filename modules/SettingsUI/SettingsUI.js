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
exports.SettingsUI = void 0;

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.name");

var _core = require("@ringcentral-integration/core");

var _di = require("@ringcentral-integration/commons/lib/di");

var _formatNumber = _interopRequireDefault(require("@ringcentral-integration/commons/lib/formatNumber"));

var _loginStatus = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Auth/loginStatus"));

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

  function SettingsUI(deps) {
    _classCallCheck(this, SettingsUI);

    return _super.call(this, {
      deps: deps
    });
  }

  _createClass(SettingsUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _extensionFeatures$fe, _extensionFeatures$fe2;

      var _ref$showRegion = _ref.showRegion,
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
        showRegion: loggedIn && brand.brandConfig.allowRegionSetting && regionSettings.showRegionSetting && appFeatures.isCallingEnabled && showRegion,
        currentLocale: locale.currentLocale,
        brandId: brand.id,
        ringoutEnabled: appFeatures.isRingOutEnabled,
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
    value: function getUIFunctions(_ref2) {
      var _ref2$regionSettingsU = _ref2.regionSettingsUrl,
          regionSettingsUrl = _ref2$regionSettingsU === void 0 ? DEFAULT_REGION_SETTINGS_URL : _ref2$regionSettingsU,
          _ref2$callingSettings = _ref2.callingSettingsUrl,
          callingSettingsUrl = _ref2$callingSettings === void 0 ? DEFAULT_CALLING_SETTINGS_URL : _ref2$callingSettings,
          _ref2$audioSettingsUr = _ref2.audioSettingsUrl,
          audioSettingsUrl = _ref2$audioSettingsUr === void 0 ? DEFAULT_AUDIO_SETTINGS_URL : _ref2$audioSettingsUr,
          _ref2$feedbackSetting = _ref2.feedbackSettingsUrl,
          feedbackSettingsUrl = _ref2$feedbackSetting === void 0 ? DEFAULT_FEEDBACK_SETTINGS_URL : _ref2$feedbackSetting;
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
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return presence === null || presence === void 0 ? void 0 : presence.setAvailable.apply(presence, args);
        },
        setBusy: function setBusy() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return presence === null || presence === void 0 ? void 0 : presence.setBusy.apply(presence, args);
        },
        setDoNotDisturb: function setDoNotDisturb() {
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          return presence === null || presence === void 0 ? void 0 : presence.setDoNotDisturb.apply(presence, args);
        },
        setInvisible: function setInvisible() {
          for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          return presence === null || presence === void 0 ? void 0 : presence.setInvisible.apply(presence, args);
        },
        toggleAcceptCallQueueCalls: function toggleAcceptCallQueueCalls() {
          for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
          }

          return presence === null || presence === void 0 ? void 0 : presence.toggleAcceptCallQueueCalls.apply(presence, args);
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
