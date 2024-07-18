"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallingSettingsUI = void 0;
var _di = require("@ringcentral-integration/commons/lib/di");
var _CallingSettings = require("@ringcentral-integration/commons/modules/CallingSettings");
var _core = require("@ringcentral-integration/core");
var _dec, _class;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var CallingSettingsUI = (_dec = (0, _di.Module)({
  name: 'CallingSettingsUI',
  deps: ['CallingSettings', 'Brand', 'Locale', 'RouterInteraction', {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'CallingSettingsUIOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(CallingSettingsUI, _RcUIModuleV);
  var _super = _createSuper(CallingSettingsUI);
  function CallingSettingsUI(deps) {
    _classCallCheck(this, CallingSettingsUI);
    return _super.call(this, {
      deps: deps
    });
  }
  _createClass(CallingSettingsUI, [{
    key: "getUIProps",
    value: function getUIProps() {
      var _this$_deps$webphone, _this$_deps$webphone2, _this$_deps$webphone3, _this$_deps$webphone4, _this$_deps$webphone5, _this$_deps$webphone6, _this$_deps$webphone7, _this$_deps$webphone8, _this$_deps$brand$bra;
      return {
        currentLocale: this._deps.locale.currentLocale,
        callWithOptions: this._deps.callingSettings.callWithOptions,
        // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
        callWith: this._deps.callingSettings.callWith,
        myLocation: this._deps.callingSettings.myLocation,
        ringoutPrompt: this._deps.callingSettings.ringoutPrompt,
        defaultRingoutPrompt: this._deps.callingSettings.defaultRingoutPrompt,
        availableNumbersWithLabel: this._deps.callingSettings.availableNumbersWithLabel,
        disabled: !!(this._deps.webphone && this._deps.webphone.sessions.length > 0),
        showSpinner: this.showSpinner,
        locationSearchable: this.locationSearchable,
        // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
        showRingToneSettings: this.ringtoneSettings && this._deps.callingSettings.isChangeRingToneAllowed,
        // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
        incomingAudioFile: (_this$_deps$webphone = this._deps.webphone) === null || _this$_deps$webphone === void 0 ? void 0 : _this$_deps$webphone.incomingAudioFile,
        incomingAudio: (_this$_deps$webphone2 = this._deps.webphone) === null || _this$_deps$webphone2 === void 0 ? void 0 : _this$_deps$webphone2.incomingAudio,
        // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
        outgoingAudioFile: (_this$_deps$webphone3 = this._deps.webphone) === null || _this$_deps$webphone3 === void 0 ? void 0 : _this$_deps$webphone3.outgoingAudioFile,
        outgoingAudio: (_this$_deps$webphone4 = this._deps.webphone) === null || _this$_deps$webphone4 === void 0 ? void 0 : _this$_deps$webphone4.outgoingAudio,
        defaultIncomingAudioFile: (_this$_deps$webphone5 = this._deps.webphone) === null || _this$_deps$webphone5 === void 0 ? void 0 : _this$_deps$webphone5.defaultIncomingAudioFile,
        defaultIncomingAudio: (_this$_deps$webphone6 = this._deps.webphone) === null || _this$_deps$webphone6 === void 0 ? void 0 : _this$_deps$webphone6.defaultIncomingAudio,
        // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
        defaultOutgoingAudioFile: (_this$_deps$webphone7 = this._deps.webphone) === null || _this$_deps$webphone7 === void 0 ? void 0 : _this$_deps$webphone7.outgoingAudioFile,
        defaultOutgoingAudio: (_this$_deps$webphone8 = this._deps.webphone) === null || _this$_deps$webphone8 === void 0 ? void 0 : _this$_deps$webphone8.outgoingAudio,
        // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
        jupiterAppName: this._deps.callingSettings.jupiterAppName,
        // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
        softphoneAppName: (_this$_deps$brand$bra = this._deps.brand.brandConfig.callWithSoftphone) === null || _this$_deps$brand$bra === void 0 ? void 0 : _this$_deps$brand$bra.name
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this = this;
      return {
        onBackButtonClick: function onBackButtonClick() {
          return _this._deps.routerInteraction.goBack();
        },
        onSave: function onSave(_ref) {
          var callWith = _ref.callWith,
            myLocation = _ref.myLocation,
            ringoutPrompt = _ref.ringoutPrompt,
            isCustomLocation = _ref.isCustomLocation,
            incomingAudio = _ref.incomingAudio,
            incomingAudioFile = _ref.incomingAudioFile,
            outgoingAudio = _ref.outgoingAudio,
            outgoingAudioFile = _ref.outgoingAudioFile;
          _this._deps.callingSettings.setData({
            callWith: callWith,
            myLocation: myLocation,
            ringoutPrompt: ringoutPrompt,
            isCustomLocation: isCustomLocation
          }, true);
          if (_this._deps.webphone && callWith === _CallingSettings.callingOptions.browser) {
            _this._deps.webphone.setRingtone({
              // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
              incomingAudio: incomingAudio,
              // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
              incomingAudioFile: incomingAudioFile,
              // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
              outgoingAudio: outgoingAudio,
              // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
              outgoingAudioFile: outgoingAudioFile
            });
          }
        }
      };
    }
  }, {
    key: "showSpinner",
    get: function get() {
      return !(this._deps.callingSettings.ready && this._deps.brand.ready && this._deps.locale.ready && (!this._deps.webphone || this._deps.webphone.ready) && this._deps.routerInteraction.ready);
    }
  }, {
    key: "locationSearchable",
    get: function get() {
      var _this$_deps$callingSe, _this$_deps$callingSe2;
      return !!((_this$_deps$callingSe = (_this$_deps$callingSe2 = this._deps.callingSettingsUIOptions) === null || _this$_deps$callingSe2 === void 0 ? void 0 : _this$_deps$callingSe2.locationSearchable) !== null && _this$_deps$callingSe !== void 0 ? _this$_deps$callingSe : true);
    }
  }, {
    key: "ringtoneSettings",
    get: function get() {
      var _this$_deps$callingSe3, _this$_deps$callingSe4;
      return !!((_this$_deps$callingSe3 = (_this$_deps$callingSe4 = this._deps.callingSettingsUIOptions) === null || _this$_deps$callingSe4 === void 0 ? void 0 : _this$_deps$callingSe4.ringtoneSettings) !== null && _this$_deps$callingSe3 !== void 0 ? _this$_deps$callingSe3 : false);
    }
  }]);
  return CallingSettingsUI;
}(_core.RcUIModuleV2)) || _class);
exports.CallingSettingsUI = CallingSettingsUI;
//# sourceMappingURL=CallingSettingsUI.js.map
