"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultConfiguration = exports.AppFeaturesBase = exports.AppFeatures = void 0;
var _core = require("@ringcentral-integration/core");
var _di = require("../../lib/di");
var _dec, _dec2, _class, _class2, _dec3, _class3;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
// Required<FeatureConfiguration> helps to make sure that the default config aligns with the interface
var defaultConfiguration = {
  CallLog: true,
  // Conferencing
  Conferencing: true,
  // Messages
  Fax: true,
  Voicemail: true,
  Pages: true,
  SMS: true,
  // Call
  RingCentralApp: true,
  RingOut: true,
  Softphone: true,
  WebPhone: true,
  CallControl: true,
  ConferenceCall: true,
  // Meetings
  Meetings: true,
  // Glip
  Glip: false,
  // Contacts Tab
  Contacts: true,
  HideContactsWhenNoCallOrMessage: true,
  // CompanyDirectoryControl
  CDC: false,
  // Enterprise dial plan
  EDP: false
};

/**
 * AppFeatures:
 * * This module manages and provide access to feature toggle settings. This module also provide ways to dynamically update these settings. However, to avoid putting this module high in the dependency tree, this module only provide methods to update the settings that are cached in storage, but does not have the ability to make queries to external api to update settings on its own.
 * * (TODO): Implement cached settings and update settings features.
 * * (TODO): Brand module should depend on this and set the toggle based on brand if applicable. This module should not have other dependencies so it can be ready to use early in the init process.
 */
exports.defaultConfiguration = defaultConfiguration;
var AppFeaturesBase = (_dec = (0, _di.Module)({
  name: 'AppFeatures',
  deps: ['Auth', 'ExtensionFeatures', 'Brand', {
    dep: 'FeatureConfiguration',
    optional: true
  }, {
    dep: 'AppFeaturesOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.featureConfiguration];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(AppFeaturesBase, _RcModuleV);
  var _super = _createSuper(AppFeaturesBase);
  function AppFeaturesBase(deps) {
    _classCallCheck(this, AppFeaturesBase);
    return _super.call(this, {
      deps: deps
    });
  }
  _createClass(AppFeaturesBase, [{
    key: "config",
    get: function get() {
      return _objectSpread(_objectSpread({}, defaultConfiguration), this._deps.featureConfiguration);
    } // TODO: investigate on how or whether to include softphone and ringcentral app settings
  }, {
    key: "isCallingEnabled",
    get: function get() {
      return this.isRingOutEnabled || this.isWebPhoneEnabled;
    }
  }, {
    key: "isWebPhoneEnabled",
    get: function get() {
      var _this$_deps$extension, _this$_deps$extension2;
      return !!(((_this$_deps$extension = this._deps.extensionFeatures.features) === null || _this$_deps$extension === void 0 ? void 0 : (_this$_deps$extension2 = _this$_deps$extension.WebPhone) === null || _this$_deps$extension2 === void 0 ? void 0 : _this$_deps$extension2.available) && this.config.WebPhone);
    }
  }, {
    key: "isRingOutEnabled",
    get: function get() {
      var _this$_deps$extension3, _this$_deps$extension4;
      return !!(((_this$_deps$extension3 = this._deps.extensionFeatures.features) === null || _this$_deps$extension3 === void 0 ? void 0 : (_this$_deps$extension4 = _this$_deps$extension3.RingOut) === null || _this$_deps$extension4 === void 0 ? void 0 : _this$_deps$extension4.available) && this.config.RingOut);
    }
  }, {
    key: "isSoftphoneEnabled",
    get: function get() {
      var _this$_deps$brand$bra;
      return !!(this.config.Softphone && !((_this$_deps$brand$bra = this._deps.brand.brandConfig) === null || _this$_deps$brand$bra === void 0 ? void 0 : _this$_deps$brand$bra.isDisableSpartan));
    }
  }, {
    key: "isRingCentralAppEnabled",
    get: function get() {
      return !!this.config.RingCentralApp;
    }
  }, {
    key: "hasReadSMSPermission",
    get: function get() {
      var _this$_deps$extension5, _this$_deps$extension6;
      return !!(((_this$_deps$extension5 = this._deps.extensionFeatures.features) === null || _this$_deps$extension5 === void 0 ? void 0 : (_this$_deps$extension6 = _this$_deps$extension5.SMSReceiving) === null || _this$_deps$extension6 === void 0 ? void 0 : _this$_deps$extension6.available) && this.config.SMS);
    }
  }, {
    key: "hasReadPagesPermission",
    get: function get() {
      var _this$_deps$extension7, _this$_deps$extension8;
      return !!(((_this$_deps$extension7 = this._deps.extensionFeatures.features) === null || _this$_deps$extension7 === void 0 ? void 0 : (_this$_deps$extension8 = _this$_deps$extension7.PagesReceiving) === null || _this$_deps$extension8 === void 0 ? void 0 : _this$_deps$extension8.available) && this.config.Pages);
    }
  }, {
    key: "hasVoicemailPermission",
    get: function get() {
      var _this$_deps$extension9, _this$_deps$extension10;
      return !!(((_this$_deps$extension9 = this._deps.extensionFeatures.features) === null || _this$_deps$extension9 === void 0 ? void 0 : (_this$_deps$extension10 = _this$_deps$extension9.Voicemail) === null || _this$_deps$extension10 === void 0 ? void 0 : _this$_deps$extension10.available) && this.config.Voicemail);
    }
  }, {
    key: "hasReadFaxPermission",
    get: function get() {
      var _this$_deps$extension11, _this$_deps$extension12;
      return !!(((_this$_deps$extension11 = this._deps.extensionFeatures.features) === null || _this$_deps$extension11 === void 0 ? void 0 : (_this$_deps$extension12 = _this$_deps$extension11.FaxReceiving) === null || _this$_deps$extension12 === void 0 ? void 0 : _this$_deps$extension12.available) && this.config.Fax);
    }
  }, {
    key: "hasReadTextPermission",
    get: function get() {
      return this.hasReadSMSPermission || this.hasReadPagesPermission;
    }
  }, {
    key: "hasReadMessagesPermission",
    get: function get() {
      return this.hasReadSMSPermission || this.hasReadPagesPermission || this.hasVoicemailPermission || this.hasReadFaxPermission;
    }
  }, {
    key: "hasSendSMSPermission",
    get: function get() {
      var _this$_deps$extension13, _this$_deps$extension14;
      return !!(((_this$_deps$extension13 = this._deps.extensionFeatures.features) === null || _this$_deps$extension13 === void 0 ? void 0 : (_this$_deps$extension14 = _this$_deps$extension13.SMSSending) === null || _this$_deps$extension14 === void 0 ? void 0 : _this$_deps$extension14.available) && this.config.SMS);
    }
  }, {
    key: "hasOutboundSMSPermission",
    get: function get() {
      return this.hasSendSMSPermission;
    }
  }, {
    key: "hasSendPagesPermission",
    get: function get() {
      var _this$_deps$extension15, _this$_deps$extension16;
      return !!(((_this$_deps$extension15 = this._deps.extensionFeatures.features) === null || _this$_deps$extension15 === void 0 ? void 0 : (_this$_deps$extension16 = _this$_deps$extension15.PagesSending) === null || _this$_deps$extension16 === void 0 ? void 0 : _this$_deps$extension16.available) && this.config.Pages);
    }
  }, {
    key: "hasInternalSMSPermission",
    get: function get() {
      return this.hasSendPagesPermission;
    }
  }, {
    key: "hasComposeTextPermission",
    get: function get() {
      return this.hasSendSMSPermission || this.hasSendPagesPermission;
    }
  }, {
    key: "hasMeetingsPermission",
    get: function get() {
      var _this$_deps$extension17, _this$_deps$extension18;
      return !!(((_this$_deps$extension17 = this._deps.extensionFeatures.features) === null || _this$_deps$extension17 === void 0 ? void 0 : (_this$_deps$extension18 = _this$_deps$extension17.Meetings) === null || _this$_deps$extension18 === void 0 ? void 0 : _this$_deps$extension18.available) && this.config.Meetings);
    }
  }, {
    key: "hasRoomConnectorBeta",
    get: function get() {
      var _this$_deps$extension19, _this$_deps$extension20;
      return !!((_this$_deps$extension19 = this._deps.extensionFeatures.features) === null || _this$_deps$extension19 === void 0 ? void 0 : (_this$_deps$extension20 = _this$_deps$extension19.RoomConnectorBeta) === null || _this$_deps$extension20 === void 0 ? void 0 : _this$_deps$extension20.available);
    }
  }, {
    key: "hasVideoE2EE",
    get: function get() {
      var _this$_deps$extension21, _this$_deps$extension22;
      return !!((_this$_deps$extension21 = this._deps.extensionFeatures.features) === null || _this$_deps$extension21 === void 0 ? void 0 : (_this$_deps$extension22 = _this$_deps$extension21.MeetingsEncryption) === null || _this$_deps$extension22 === void 0 ? void 0 : _this$_deps$extension22.available);
    }
  }, {
    key: "readExtensionCallLogAvailable",
    get: function get() {
      var _this$_deps$extension23, _this$_deps$extension24;
      return (_this$_deps$extension23 = this._deps.extensionFeatures.features) === null || _this$_deps$extension23 === void 0 ? void 0 : (_this$_deps$extension24 = _this$_deps$extension23.ReadExtensionCallLog) === null || _this$_deps$extension24 === void 0 ? void 0 : _this$_deps$extension24.available;
    }
  }, {
    key: "hasReadExtensionCallLog",
    get: function get() {
      return !!(this.readExtensionCallLogAvailable && this.config.CallLog);
    }
  }, {
    key: "hasConferenceCall",
    get: function get() {
      return this.isRingOutEnabled && this.isWebPhoneEnabled && this.config.ConferenceCall;
    }
  }, {
    key: "hasGlipPermission",
    get: function get() {
      var _this$_deps$extension25, _this$_deps$extension26;
      return !!(((_this$_deps$extension25 = this._deps.extensionFeatures.features) === null || _this$_deps$extension25 === void 0 ? void 0 : (_this$_deps$extension26 = _this$_deps$extension25.Glip) === null || _this$_deps$extension26 === void 0 ? void 0 : _this$_deps$extension26.available) && this.config.Glip);
    }
  }, {
    key: "hasCallControl",
    get: function get() {
      var _this$_deps$auth$toke, _this$_deps$auth$toke2, _this$_deps$auth$toke3, _this$_deps$auth$toke4;
      return !!((((_this$_deps$auth$toke = this._deps.auth.token) === null || _this$_deps$auth$toke === void 0 ? void 0 : (_this$_deps$auth$toke2 = _this$_deps$auth$toke.scope) === null || _this$_deps$auth$toke2 === void 0 ? void 0 : _this$_deps$auth$toke2.indexOf('CallControl')) > -1 || ((_this$_deps$auth$toke3 = this._deps.auth.token) === null || _this$_deps$auth$toke3 === void 0 ? void 0 : (_this$_deps$auth$toke4 = _this$_deps$auth$toke3.scope) === null || _this$_deps$auth$toke4 === void 0 ? void 0 : _this$_deps$auth$toke4.indexOf('TelephonySession')) > -1) && this.config.CallControl);
    }
  }, {
    key: "isContactsEnabled",
    get: function get() {
      return this.config.Contacts && (!this.config.HideContactsWhenNoCallOrMessage || this.config.HideContactsWhenNoCallOrMessage && (this.isCallingEnabled || this.hasReadMessagesPermission));
    }
  }, {
    key: "isCDCEnabled",
    get: function get() {
      return !!this.config.CDC;
    }
  }, {
    key: "isOCPEnabled",
    get: function get() {
      var _this$_deps$extension27, _this$_deps$extension28;
      return (_this$_deps$extension27 = this._deps.extensionFeatures.features) === null || _this$_deps$extension27 === void 0 ? void 0 : (_this$_deps$extension28 = _this$_deps$extension27.OutboundCallPrefix) === null || _this$_deps$extension28 === void 0 ? void 0 : _this$_deps$extension28.available;
    }
  }, {
    key: "OCPValue",
    get: function get() {
      if (this.isOCPEnabled) {
        var _this$_deps$extension29, _this$_deps$extension30, _this$_deps$extension31, _this$_deps$extension32;
        return (_this$_deps$extension29 = this._deps.extensionFeatures.features) === null || _this$_deps$extension29 === void 0 ? void 0 : (_this$_deps$extension30 = _this$_deps$extension29.OutboundCallPrefix) === null || _this$_deps$extension30 === void 0 ? void 0 : (_this$_deps$extension31 = _this$_deps$extension30.params) === null || _this$_deps$extension31 === void 0 ? void 0 : (_this$_deps$extension32 = _this$_deps$extension31[0]) === null || _this$_deps$extension32 === void 0 ? void 0 : _this$_deps$extension32.value;
      }
      return null;
    }
  }, {
    key: "enableSmartDialPlan",
    get: function get() {
      var _this$_deps$extension33, _this$_deps$extension34;
      return ((_this$_deps$extension33 = this._deps.extensionFeatures.features) === null || _this$_deps$extension33 === void 0 ? void 0 : (_this$_deps$extension34 = _this$_deps$extension33.SmartDialPlanRouting) === null || _this$_deps$extension34 === void 0 ? void 0 : _this$_deps$extension34.available) && this.isEDPEnabled;
    }
  }, {
    key: "isEDPEnabled",
    get: function get() {
      return !!this.config.EDP && this._deps.brand.brandConfig.enableEDP;
    }
  }]);
  return AppFeaturesBase;
}(_core.RcModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "config", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "config"), _class2.prototype)), _class2)) || _class);
exports.AppFeaturesBase = AppFeaturesBase;
var AppFeatures = (_dec3 = (0, _di.Module)({
  name: 'AppFeatures'
}), _dec3(_class3 = /*#__PURE__*/function (_AppFeaturesBase) {
  _inherits(AppFeatures, _AppFeaturesBase);
  var _super2 = _createSuper(AppFeatures);
  function AppFeatures() {
    _classCallCheck(this, AppFeatures);
    return _super2.apply(this, arguments);
  }
  return AppFeatures;
}(AppFeaturesBase)) || _class3);
exports.AppFeatures = AppFeatures;
//# sourceMappingURL=AppFeatures.js.map
