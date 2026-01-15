"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultConfiguration = exports.AppFeaturesBase = exports.AppFeatures = void 0;
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _core = require("@ringcentral-integration/core");
var _di = require("../../lib/di");
var _dec, _dec2, _class, _class2, _dec3, _class3;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
// Required<FeatureConfiguration> helps to make sure that the default config aligns with the interface
var defaultConfiguration = exports.defaultConfiguration = {
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
var AppFeaturesBase = exports.AppFeaturesBase = (_dec = (0, _di.Module)({
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
  function AppFeaturesBase(deps) {
    _classCallCheck(this, AppFeaturesBase);
    return _callSuper(this, AppFeaturesBase, [{
      deps: deps
    }]);
  }
  _inherits(AppFeaturesBase, _RcModuleV);
  return _createClass(AppFeaturesBase, [{
    key: "config",
    get: function get() {
      return _objectSpread(_objectSpread({}, defaultConfiguration), this._deps.featureConfiguration);
    }

    // TODO: investigate on how or whether to include softphone and ringcentral app settings
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
      var _this$_deps$extension9, _this$_deps$extension0;
      return !!(((_this$_deps$extension9 = this._deps.extensionFeatures.features) === null || _this$_deps$extension9 === void 0 ? void 0 : (_this$_deps$extension0 = _this$_deps$extension9.Voicemail) === null || _this$_deps$extension0 === void 0 ? void 0 : _this$_deps$extension0.available) && this.config.Voicemail);
    }
  }, {
    key: "hasReadFaxPermission",
    get: function get() {
      var _this$_deps$extension1, _this$_deps$extension10;
      return !!(((_this$_deps$extension1 = this._deps.extensionFeatures.features) === null || _this$_deps$extension1 === void 0 ? void 0 : (_this$_deps$extension10 = _this$_deps$extension1.FaxReceiving) === null || _this$_deps$extension10 === void 0 ? void 0 : _this$_deps$extension10.available) && this.config.Fax);
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
      var _this$_deps$extension11, _this$_deps$extension12;
      return !!(((_this$_deps$extension11 = this._deps.extensionFeatures.features) === null || _this$_deps$extension11 === void 0 ? void 0 : (_this$_deps$extension12 = _this$_deps$extension11.SMSSending) === null || _this$_deps$extension12 === void 0 ? void 0 : _this$_deps$extension12.available) && this.config.SMS);
    }
  }, {
    key: "hasSendMMSPermission",
    get: function get() {
      var _this$_deps$extension13, _this$_deps$extension14;
      return !!(((_this$_deps$extension13 = this._deps.extensionFeatures.features) === null || _this$_deps$extension13 === void 0 ? void 0 : (_this$_deps$extension14 = _this$_deps$extension13.MMSSending) === null || _this$_deps$extension14 === void 0 ? void 0 : _this$_deps$extension14.available) && this.config.SMS);
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
}(_core.RcModuleV2), _applyDecoratedDescriptor(_class2.prototype, "config", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "config"), _class2.prototype), _class2)) || _class);
var AppFeatures = exports.AppFeatures = (_dec3 = (0, _di.Module)({
  name: 'AppFeatures'
}), _dec3(_class3 = /*#__PURE__*/function (_AppFeaturesBase) {
  function AppFeatures() {
    _classCallCheck(this, AppFeatures);
    return _callSuper(this, AppFeatures, arguments);
  }
  _inherits(AppFeatures, _AppFeaturesBase);
  return _createClass(AppFeatures);
}(AppFeaturesBase)) || _class3);
//# sourceMappingURL=AppFeatures.js.map
