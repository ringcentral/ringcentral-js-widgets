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
require("core-js/modules/es.function.name.js");
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
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultConfiguration = exports.AppFeatures = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.string.includes.js");
var _services = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _Auth = require("../Auth");
var _ExtensionFeatures = require("../ExtensionFeatures");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
  CDC: process.env.THEME_SYSTEM === 'spring-ui',
  // Enterprise dial plan
  EDP: process.env.THEME_SYSTEM === 'spring-ui',
  // does enable smart note
  SmartNote: false
};
var AppFeatures = exports.AppFeatures = (_dec = (0, _nextCore.injectable)({
  name: 'AppFeatures'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('FeatureConfiguration')(target, undefined, 3);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('AppFeaturesOptions')(target, undefined, 4);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _Auth.Auth === "undefined" ? Object : _Auth.Auth, typeof _ExtensionFeatures.ExtensionFeatures === "undefined" ? Object : _ExtensionFeatures.ExtensionFeatures, typeof _services.Brand === "undefined" ? Object : _services.Brand, typeof FeatureConfiguration === "undefined" ? Object : FeatureConfiguration, typeof AppFeaturesOptions === "undefined" ? Object : AppFeaturesOptions]), _dec6 = (0, _nextCore.computed)(function (that) {
  return [that._featureConfiguration];
}), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function AppFeatures(_auth, _extensionFeatures, _brand, _featureConfiguration, _appFeaturesOptions) {
    var _this;
    _classCallCheck(this, AppFeatures);
    _this = _callSuper(this, AppFeatures);
    _this._auth = _auth;
    _this._extensionFeatures = _extensionFeatures;
    _this._brand = _brand;
    _this._featureConfiguration = _featureConfiguration;
    _this._appFeaturesOptions = _appFeaturesOptions;
    return _this;
  }
  _inherits(AppFeatures, _RcModule);
  return _createClass(AppFeatures, [{
    key: "config",
    get: function get() {
      return _objectSpread(_objectSpread({}, defaultConfiguration), this._featureConfiguration);
    }
  }, {
    key: "isSmartNoteEnabled",
    get: function get() {
      return !!this.config.SmartNote;
    }

    // TODO: investigate on how or whether to include softphone and ringcentral app settings
  }, {
    key: "isCallingEnabled",
    get: function get() {
      return this.isRingOutEnabled || this.isWebPhoneEnabled;
    }
  }, {
    key: "isCallForwardingEnabled",
    get: function get() {
      var _this$_extensionFeatu, _this$_extensionFeatu2;
      return !!((_this$_extensionFeatu = this._extensionFeatures.features) === null || _this$_extensionFeatu === void 0 ? void 0 : (_this$_extensionFeatu2 = _this$_extensionFeatu.CallForwarding) === null || _this$_extensionFeatu2 === void 0 ? void 0 : _this$_extensionFeatu2.available);
    }
  }, {
    key: "isWebPhoneEnabled",
    get: function get() {
      var _this$_extensionFeatu3, _this$_extensionFeatu4;
      return !!(((_this$_extensionFeatu3 = this._extensionFeatures.features) === null || _this$_extensionFeatu3 === void 0 ? void 0 : (_this$_extensionFeatu4 = _this$_extensionFeatu3.WebPhone) === null || _this$_extensionFeatu4 === void 0 ? void 0 : _this$_extensionFeatu4.available) && this.config.WebPhone);
    }
  }, {
    key: "isCallQueueEnabled",
    get: function get() {
      var _this$_extensionFeatu5, _this$_extensionFeatu6, _this$_extensionFeatu7, _this$_extensionFeatu8, _this$_extensionFeatu9, _this$_extensionFeatu0;
      return !!(((_this$_extensionFeatu5 = this._extensionFeatures.features) === null || _this$_extensionFeatu5 === void 0 ? void 0 : (_this$_extensionFeatu6 = _this$_extensionFeatu5.CallQueuePresence) === null || _this$_extensionFeatu6 === void 0 ? void 0 : _this$_extensionFeatu6.available) && ((_this$_extensionFeatu7 = this._extensionFeatures.features) === null || _this$_extensionFeatu7 === void 0 ? void 0 : (_this$_extensionFeatu8 = _this$_extensionFeatu7.EditCallQueuePresence) === null || _this$_extensionFeatu8 === void 0 ? void 0 : _this$_extensionFeatu8.available) && ((_this$_extensionFeatu9 = this._extensionFeatures.features) === null || _this$_extensionFeatu9 === void 0 ? void 0 : (_this$_extensionFeatu0 = _this$_extensionFeatu9.ReadPresenceStatus) === null || _this$_extensionFeatu0 === void 0 ? void 0 : _this$_extensionFeatu0.available));
    }
  }, {
    key: "enableAcceptQueueCallsControl",
    get: function get() {
      var _this$_extensionFeatu1, _this$_extensionFeatu10;
      return !!((_this$_extensionFeatu1 = this._extensionFeatures.features) === null || _this$_extensionFeatu1 === void 0 ? void 0 : (_this$_extensionFeatu10 = _this$_extensionFeatu1.AcceptQueueCalls) === null || _this$_extensionFeatu10 === void 0 ? void 0 : _this$_extensionFeatu10.available);
    }
  }, {
    key: "isRingOutEnabled",
    get: function get() {
      var _this$_extensionFeatu11, _this$_extensionFeatu12;
      return !!(((_this$_extensionFeatu11 = this._extensionFeatures.features) === null || _this$_extensionFeatu11 === void 0 ? void 0 : (_this$_extensionFeatu12 = _this$_extensionFeatu11.RingOut) === null || _this$_extensionFeatu12 === void 0 ? void 0 : _this$_extensionFeatu12.available) && this.config.RingOut);
    }
  }, {
    key: "isSoftphoneEnabled",
    get: function get() {
      var _this$_brand$brandCon;
      return !!(this.config.Softphone && !((_this$_brand$brandCon = this._brand.brandConfig) === null || _this$_brand$brandCon === void 0 ? void 0 : _this$_brand$brandCon.isDisableSpartan));
    }
  }, {
    key: "isRingCentralAppEnabled",
    get: function get() {
      return !!this.config.RingCentralApp;
    }
  }, {
    key: "hasReadSMSPermission",
    get: function get() {
      var _this$_extensionFeatu13, _this$_extensionFeatu14;
      return !!(((_this$_extensionFeatu13 = this._extensionFeatures.features) === null || _this$_extensionFeatu13 === void 0 ? void 0 : (_this$_extensionFeatu14 = _this$_extensionFeatu13.SMSReceiving) === null || _this$_extensionFeatu14 === void 0 ? void 0 : _this$_extensionFeatu14.available) && this.config.SMS);
    }
  }, {
    key: "hasCallRecordingPermission",
    get: function get() {
      var _this$_extensionFeatu15, _this$_extensionFeatu16;
      return !!((_this$_extensionFeatu15 = this._extensionFeatures.features) === null || _this$_extensionFeatu15 === void 0 ? void 0 : (_this$_extensionFeatu16 = _this$_extensionFeatu15.OnDemandCallRecording) === null || _this$_extensionFeatu16 === void 0 ? void 0 : _this$_extensionFeatu16.available);
    }
  }, {
    key: "hasReadPagesPermission",
    get: function get() {
      var _this$_extensionFeatu17, _this$_extensionFeatu18;
      return !!(((_this$_extensionFeatu17 = this._extensionFeatures.features) === null || _this$_extensionFeatu17 === void 0 ? void 0 : (_this$_extensionFeatu18 = _this$_extensionFeatu17.PagesReceiving) === null || _this$_extensionFeatu18 === void 0 ? void 0 : _this$_extensionFeatu18.available) && this.config.Pages);
    }
  }, {
    key: "hasVoicemailPermission",
    get: function get() {
      var _this$_extensionFeatu19, _this$_extensionFeatu20;
      return !!(((_this$_extensionFeatu19 = this._extensionFeatures.features) === null || _this$_extensionFeatu19 === void 0 ? void 0 : (_this$_extensionFeatu20 = _this$_extensionFeatu19.Voicemail) === null || _this$_extensionFeatu20 === void 0 ? void 0 : _this$_extensionFeatu20.available) && this.config.Voicemail);
    }
  }, {
    key: "hasReadFaxPermission",
    get: function get() {
      var _this$_extensionFeatu21, _this$_extensionFeatu22;
      return !!(((_this$_extensionFeatu21 = this._extensionFeatures.features) === null || _this$_extensionFeatu21 === void 0 ? void 0 : (_this$_extensionFeatu22 = _this$_extensionFeatu21.FaxReceiving) === null || _this$_extensionFeatu22 === void 0 ? void 0 : _this$_extensionFeatu22.available) && this.config.Fax);
    }
  }, {
    key: "hasSendFaxPermission",
    get: function get() {
      var _this$_extensionFeatu23, _this$_extensionFeatu24;
      return !!(((_this$_extensionFeatu23 = this._extensionFeatures.features) === null || _this$_extensionFeatu23 === void 0 ? void 0 : (_this$_extensionFeatu24 = _this$_extensionFeatu23.FaxSending) === null || _this$_extensionFeatu24 === void 0 ? void 0 : _this$_extensionFeatu24.available) && this.config.Fax);
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
      var _this$_extensionFeatu25, _this$_extensionFeatu26;
      return !!(((_this$_extensionFeatu25 = this._extensionFeatures.features) === null || _this$_extensionFeatu25 === void 0 ? void 0 : (_this$_extensionFeatu26 = _this$_extensionFeatu25.SMSSending) === null || _this$_extensionFeatu26 === void 0 ? void 0 : _this$_extensionFeatu26.available) && this.config.SMS);
    }
  }, {
    key: "hasSendMMSPermission",
    get: function get() {
      var _this$_extensionFeatu27, _this$_extensionFeatu28;
      return !!(((_this$_extensionFeatu27 = this._extensionFeatures.features) === null || _this$_extensionFeatu27 === void 0 ? void 0 : (_this$_extensionFeatu28 = _this$_extensionFeatu27.MMSSending) === null || _this$_extensionFeatu28 === void 0 ? void 0 : _this$_extensionFeatu28.available) && this.config.SMS);
    }
  }, {
    key: "hasOutboundSMSPermission",
    get: function get() {
      return this.hasSendSMSPermission;
    }
  }, {
    key: "hasSendPagesPermission",
    get: function get() {
      var _this$_extensionFeatu29, _this$_extensionFeatu30;
      return !!(((_this$_extensionFeatu29 = this._extensionFeatures.features) === null || _this$_extensionFeatu29 === void 0 ? void 0 : (_this$_extensionFeatu30 = _this$_extensionFeatu29.PagesSending) === null || _this$_extensionFeatu30 === void 0 ? void 0 : _this$_extensionFeatu30.available) && this.config.Pages);
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
      var _this$_extensionFeatu31, _this$_extensionFeatu32;
      return !!(((_this$_extensionFeatu31 = this._extensionFeatures.features) === null || _this$_extensionFeatu31 === void 0 ? void 0 : (_this$_extensionFeatu32 = _this$_extensionFeatu31.Meetings) === null || _this$_extensionFeatu32 === void 0 ? void 0 : _this$_extensionFeatu32.available) && this.config.Meetings);
    }
  }, {
    key: "hasRoomConnectorBeta",
    get: function get() {
      var _this$_extensionFeatu33, _this$_extensionFeatu34;
      return !!((_this$_extensionFeatu33 = this._extensionFeatures.features) === null || _this$_extensionFeatu33 === void 0 ? void 0 : (_this$_extensionFeatu34 = _this$_extensionFeatu33.RoomConnectorBeta) === null || _this$_extensionFeatu34 === void 0 ? void 0 : _this$_extensionFeatu34.available);
    }
  }, {
    key: "hasVideoE2EE",
    get: function get() {
      var _this$_extensionFeatu35, _this$_extensionFeatu36;
      return !!((_this$_extensionFeatu35 = this._extensionFeatures.features) === null || _this$_extensionFeatu35 === void 0 ? void 0 : (_this$_extensionFeatu36 = _this$_extensionFeatu35.MeetingsEncryption) === null || _this$_extensionFeatu36 === void 0 ? void 0 : _this$_extensionFeatu36.available);
    }
  }, {
    key: "readExtensionCallLogAvailable",
    get: function get() {
      var _this$_extensionFeatu37, _this$_extensionFeatu38;
      return (_this$_extensionFeatu37 = this._extensionFeatures.features) === null || _this$_extensionFeatu37 === void 0 ? void 0 : (_this$_extensionFeatu38 = _this$_extensionFeatu37.ReadExtensionCallLog) === null || _this$_extensionFeatu38 === void 0 ? void 0 : _this$_extensionFeatu38.available;
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
    key: "hasConferencing",
    get: function get() {
      var _this$_extensionFeatu39, _this$_extensionFeatu40;
      return !!(((_this$_extensionFeatu39 = this._extensionFeatures.features) === null || _this$_extensionFeatu39 === void 0 ? void 0 : (_this$_extensionFeatu40 = _this$_extensionFeatu39.Conferencing) === null || _this$_extensionFeatu40 === void 0 ? void 0 : _this$_extensionFeatu40.available) && this.config.Conferencing);
    }
  }, {
    key: "hasGlipPermission",
    get: function get() {
      var _this$_extensionFeatu41, _this$_extensionFeatu42;
      return !!(((_this$_extensionFeatu41 = this._extensionFeatures.features) === null || _this$_extensionFeatu41 === void 0 ? void 0 : (_this$_extensionFeatu42 = _this$_extensionFeatu41.Glip) === null || _this$_extensionFeatu42 === void 0 ? void 0 : _this$_extensionFeatu42.available) && this.config.Glip);
    }
  }, {
    key: "hasCallControl",
    get: function get() {
      var _this$_auth$token, _this$_auth$token$sco, _this$_auth$token2, _this$_auth$token2$sc;
      return !!((((_this$_auth$token = this._auth.token) === null || _this$_auth$token === void 0 ? void 0 : (_this$_auth$token$sco = _this$_auth$token.scope) === null || _this$_auth$token$sco === void 0 ? void 0 : _this$_auth$token$sco.indexOf('CallControl')) > -1 || ((_this$_auth$token2 = this._auth.token) === null || _this$_auth$token2 === void 0 ? void 0 : (_this$_auth$token2$sc = _this$_auth$token2.scope) === null || _this$_auth$token2$sc === void 0 ? void 0 : _this$_auth$token2$sc.indexOf('TelephonySession')) > -1) && this.config.CallControl);
    }
  }, {
    key: "hasDndPermission",
    get: function get() {
      var _this$_extensionFeatu43, _this$_extensionFeatu44;
      return (_this$_extensionFeatu43 = this._extensionFeatures.features) === null || _this$_extensionFeatu43 === void 0 ? void 0 : (_this$_extensionFeatu44 = _this$_extensionFeatu43.DND) === null || _this$_extensionFeatu44 === void 0 ? void 0 : _this$_extensionFeatu44.available;
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
      var _this$_extensionFeatu45, _this$_extensionFeatu46;
      return (_this$_extensionFeatu45 = this._extensionFeatures.features) === null || _this$_extensionFeatu45 === void 0 ? void 0 : (_this$_extensionFeatu46 = _this$_extensionFeatu45.OutboundCallPrefix) === null || _this$_extensionFeatu46 === void 0 ? void 0 : _this$_extensionFeatu46.available;
    }
  }, {
    key: "OCPValue",
    get: function get() {
      if (this.isOCPEnabled) {
        var _this$_extensionFeatu47, _this$_extensionFeatu48, _this$_extensionFeatu49, _this$_extensionFeatu50;
        return (_this$_extensionFeatu47 = this._extensionFeatures.features) === null || _this$_extensionFeatu47 === void 0 ? void 0 : (_this$_extensionFeatu48 = _this$_extensionFeatu47.OutboundCallPrefix) === null || _this$_extensionFeatu48 === void 0 ? void 0 : (_this$_extensionFeatu49 = _this$_extensionFeatu48.params) === null || _this$_extensionFeatu49 === void 0 ? void 0 : (_this$_extensionFeatu50 = _this$_extensionFeatu49[0]) === null || _this$_extensionFeatu50 === void 0 ? void 0 : _this$_extensionFeatu50.value;
      }
      return null;
    }
  }, {
    key: "enableSmartDialPlan",
    get: function get() {
      var _this$_extensionFeatu51, _this$_extensionFeatu52;
      return ((_this$_extensionFeatu51 = this._extensionFeatures.features) === null || _this$_extensionFeatu51 === void 0 ? void 0 : (_this$_extensionFeatu52 = _this$_extensionFeatu51.SmartDialPlanRouting) === null || _this$_extensionFeatu52 === void 0 ? void 0 : _this$_extensionFeatu52.available) && this.isEDPEnabled;
    }
  }, {
    key: "isEDPEnabled",
    get: function get() {
      return !!this.config.EDP && this._brand.brandConfig.enableEDP;
    }
  }, {
    key: "hasReadCallRecordings",
    get: function get() {
      var _this$_extensionFeatu53, _this$_extensionFeatu54;
      return (_this$_extensionFeatu53 = this._extensionFeatures.features) === null || _this$_extensionFeatu53 === void 0 ? void 0 : (_this$_extensionFeatu54 = _this$_extensionFeatu53.ReadExtensionCallRecordings) === null || _this$_extensionFeatu54 === void 0 ? void 0 : _this$_extensionFeatu54.available;
    }
  }, {
    key: "getAppDefaultRoutePath",
    value: function getAppDefaultRoutePath() {
      var _this2 = this;
      if (process.env.NODE_ENV !== 'production') {
        if (!this.ready) {
          throw new Error('AppFeatures is not ready, must wait until ready before calling getAppDefaultRoutePath');
        }
      }
      var guards = [function () {
        return [_this2.isCallingEnabled, '/dialer/keypad'];
      }, function () {
        return [_this2.isCallingEnabled || _this2.hasReadExtensionCallLog, '/dialer/history'];
      }, function () {
        return [_this2.hasReadTextPermission, '/messages'];
      }];
      for (var _i = 0, _guards = guards; _i < _guards.length; _i++) {
        var guard = _guards[_i];
        var _guard = guard(),
          _guard2 = _slicedToArray(_guard, 2),
          permission = _guard2[0],
          path = _guard2[1];
        if (permission) {
          return path;
        }
      }
      return '/settings';
    }
  }, {
    key: "appScopes",
    get: function get() {
      return this._auth.token && this._auth.token.scope || '';
    }
  }, {
    key: "hasSmartNotePermission",
    get: function get() {
      var _this$_extensionFeatu55, _this$_extensionFeatu56, _this$_extensionFeatu57;
      return this.enabledAIInternal && ((_this$_extensionFeatu55 = (_this$_extensionFeatu56 = this._extensionFeatures.features) === null || _this$_extensionFeatu56 === void 0 ? void 0 : (_this$_extensionFeatu57 = _this$_extensionFeatu56.RingSenseMVP) === null || _this$_extensionFeatu57 === void 0 ? void 0 : _this$_extensionFeatu57.available) !== null && _this$_extensionFeatu55 !== void 0 ? _this$_extensionFeatu55 : false) && this.hasAIGeneratedNotes && this.hasVoiceCallsLiveTranscriptions && this.hasVoiceCallsCloseCaptioning;
    }
  }, {
    key: "enabledAIInternal",
    get: function get() {
      return this.config.SmartNote && this.appScopes.indexOf('AIInternal') > -1 && this.appScopes.indexOf('TelephonySessions') > -1;
    }
  }, {
    key: "hasAIGeneratedNotes",
    get: function get() {
      var _this$_extensionFeatu58, _this$_extensionFeatu59, _this$_extensionFeatu60;
      return this.enabledAIInternal && ((_this$_extensionFeatu58 = (_this$_extensionFeatu59 = this._extensionFeatures.features) === null || _this$_extensionFeatu59 === void 0 ? void 0 : (_this$_extensionFeatu60 = _this$_extensionFeatu59.AIGeneratedNotes) === null || _this$_extensionFeatu60 === void 0 ? void 0 : _this$_extensionFeatu60.available) !== null && _this$_extensionFeatu58 !== void 0 ? _this$_extensionFeatu58 : false);
    }
  }, {
    key: "hasVoiceCallsLiveTranscriptions",
    get: function get() {
      var _this$_extensionFeatu61, _this$_extensionFeatu62, _this$_extensionFeatu63;
      return this.enabledAIInternal && ((_this$_extensionFeatu61 = (_this$_extensionFeatu62 = this._extensionFeatures.features) === null || _this$_extensionFeatu62 === void 0 ? void 0 : (_this$_extensionFeatu63 = _this$_extensionFeatu62.VoiceCallsLiveTranscriptions) === null || _this$_extensionFeatu63 === void 0 ? void 0 : _this$_extensionFeatu63.available) !== null && _this$_extensionFeatu61 !== void 0 ? _this$_extensionFeatu61 : false);
    }
  }, {
    key: "hasVoiceCallsCloseCaptioning",
    get: function get() {
      var _this$_extensionFeatu64, _this$_extensionFeatu65, _this$_extensionFeatu66;
      return this.enabledAIInternal && ((_this$_extensionFeatu64 = (_this$_extensionFeatu65 = this._extensionFeatures.features) === null || _this$_extensionFeatu65 === void 0 ? void 0 : (_this$_extensionFeatu66 = _this$_extensionFeatu65.VoiceCallsCloseCaptioning) === null || _this$_extensionFeatu66 === void 0 ? void 0 : _this$_extensionFeatu66.available) !== null && _this$_extensionFeatu64 !== void 0 ? _this$_extensionFeatu64 : false);
    }
  }, {
    key: "hasEditPresenceStatus",
    get: function get() {
      var _this$_auth$token$sco2, _this$_extensionFeatu67, _this$_extensionFeatu68;
      return (
        // app scopes must include EditPresence
        ((_this$_auth$token$sco2 = this._auth.token.scope) === null || _this$_auth$token$sco2 === void 0 ? void 0 : _this$_auth$token$sco2.includes('EditPresence')) &&
        // user must have permission to edit presence status
        !!((_this$_extensionFeatu67 = this._extensionFeatures.features) === null || _this$_extensionFeatu67 === void 0 ? void 0 : (_this$_extensionFeatu68 = _this$_extensionFeatu67.EditPresenceStatus) === null || _this$_extensionFeatu68 === void 0 ? void 0 : _this$_extensionFeatu68.available)
      );
    }
  }]);
}(_nextCore.RcModule), _applyDecoratedDescriptor(_class2.prototype, "config", [_dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "config"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=AppFeatures.js.map
