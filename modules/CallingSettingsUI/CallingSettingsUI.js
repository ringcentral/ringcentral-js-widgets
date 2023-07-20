"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallingSettingsUI = void 0;
var _di = require("@ringcentral-integration/commons/lib/di");
var _CallingSettings = require("@ringcentral-integration/commons/modules/CallingSettings");
var _core = require("@ringcentral-integration/core");
var _dec, _class;
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
