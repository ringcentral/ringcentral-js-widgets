"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioSettingsUI = void 0;
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
var AudioSettingsUI = (_dec = (0, _di.Module)({
  name: 'AudioSettingsUI',
  deps: ['AudioSettings', 'Locale', 'CallingSettings', 'RouterInteraction', 'CallMonitor', {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'AudioSettingsUIOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(AudioSettingsUI, _RcUIModuleV);
  var _super = _createSuper(AudioSettingsUI);
  function AudioSettingsUI(deps) {
    _classCallCheck(this, AudioSettingsUI);
    return _super.call(this, {
      deps: deps
    });
  }
  _createClass(AudioSettingsUI, [{
    key: "getUIProps",
    value: function getUIProps() {
      return {
        currentLocale: this._deps.locale.currentLocale,
        dialButtonVolume: this._deps.audioSettings.dialButtonVolume,
        dialButtonMuted: this._deps.audioSettings.dialButtonMuted,
        ringtoneVolume: this._deps.audioSettings.ringtoneVolume,
        ringtoneMuted: this._deps.audioSettings.ringtoneMuted,
        callVolume: this._deps.audioSettings.callVolume,
        availableInputDevices: this._deps.audioSettings.availableInputDevices,
        inputDeviceId: this._deps.audioSettings.inputDeviceId,
        availableOutputDevices: this._deps.audioSettings.availableOutputDevices,
        outputDeviceId: this._deps.audioSettings.outputDeviceId,
        supportDevices: this._deps.audioSettings.supportDevices,
        userMedia: this._deps.audioSettings.userMedia,
        isWebRTC: this._deps.callingSettings.callWith === _CallingSettings.callingOptions.browser,
        outputDeviceDisabled: !this._deps.audioSettings.availableOutputDevices.length,
        inputDeviceDisabled: !!(!this._deps.audioSettings.availableInputDevices.length || this._deps.webphone && this._deps.webphone.sessions.length > 0 || this._deps.callMonitor.useTelephonySession && this._deps.callMonitor.activeRingCalls.length + this._deps.callMonitor.activeOnHoldCalls.length + this._deps.callMonitor.activeCurrentCalls.length > 0)
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
        onSave: function onSave(data) {
          return _this._deps.audioSettings.setData(data);
        },
        checkUserMedia: function checkUserMedia() {
          return _this._deps.audioSettings.getUserMedia();
        }
      };
    }
  }]);
  return AudioSettingsUI;
}(_core.RcUIModuleV2)) || _class);
exports.AudioSettingsUI = AudioSettingsUI;
//# sourceMappingURL=AudioSettingsUI.js.map
