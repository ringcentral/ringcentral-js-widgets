"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioSettingsUI = void 0;
require("core-js/modules/es.array.every.js");
require("core-js/modules/es.object.to-string.js");
var _di = require("@ringcentral-integration/commons/lib/di");
var _CallingSettings = require("@ringcentral-integration/commons/modules/CallingSettings");
var _core = require("@ringcentral-integration/core");
var _uuid = require("uuid");
var _dec, _class;
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
var AudioSettingsUI = exports.AudioSettingsUI = (_dec = (0, _di.Module)({
  name: 'AudioSettingsUI',
  deps: ['AudioSettings', 'Locale', 'CallingSettings', 'RouterInteraction', 'CallMonitor', {
    dep: 'RingtoneConfiguration',
    optional: true
  }, {
    dep: 'VolumeInspector',
    optional: true
  }, {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'AudioSettingsUIOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  function AudioSettingsUI(deps) {
    _classCallCheck(this, AudioSettingsUI);
    return _callSuper(this, AudioSettingsUI, [{
      deps: deps
    }]);
  }
  _inherits(AudioSettingsUI, _RcUIModuleV);
  return _createClass(AudioSettingsUI, [{
    key: "checkAllDevicesAreEmpty",
    value: function checkAllDevicesAreEmpty(devices) {
      return devices.every(function (item) {
        return item.label === '' && item.deviceId === '' || item.label === '' && item.deviceId === 'off';
      });
    }
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      var _this$_deps$audioSett, _this$_deps$audioSett2, _this$_deps$volumeIns, _this$_deps$ringtoneC, _this$_deps$ringtoneC2, _this$_deps$ringtoneC3, _this$_deps$ringtoneC4;
      var isHavingCall = !!(this._deps.webphone && this._deps.webphone.sessions.length > 0 || this._deps.callMonitor.useTelephonySession && this._deps.callMonitor.activeRingCalls.length + this._deps.callMonitor.activeOnHoldCalls.length + this._deps.callMonitor.activeCurrentCalls.length > 0);
      return {
        currentLocale: this._deps.locale.currentLocale,
        hasUserMedia: this._deps.audioSettings.hasUserMedia,
        isAGCEnabled: this._deps.audioSettings.isAGCEnabled,
        showAGCEnabled: this._deps.audioSettings.isSupportAGC,
        ringtoneVolume: this._deps.audioSettings.ringtoneVolume,
        callVolume: this._deps.audioSettings.callVolume,
        availableInputDevices: this._deps.audioSettings.availableInputDevices,
        inputDeviceId: this._deps.audioSettings.inputDeviceId,
        ringtoneDeviceId: this._deps.audioSettings.ringtoneDeviceId,
        availableOutputDevices: this._deps.audioSettings.availableOutputDevices,
        availableRingtoneDevices: this._deps.audioSettings.availableRingtoneDevices,
        outputDeviceId: this._deps.audioSettings.outputDeviceId,
        supportDevices: this._deps.audioSettings.supportDevices,
        userMedia: this._deps.audioSettings.userMedia,
        isWebRTC: this._deps.callingSettings.callWith === _CallingSettings.callingOptions.browser,
        outputDeviceDisabled: !this._deps.audioSettings.availableOutputDevices.length || this.checkAllDevicesAreEmpty(this._deps.audioSettings.availableOutputDevices),
        inputDeviceDisabled: !!(!this._deps.audioSettings.availableInputDevices.length || isHavingCall || this.checkAllDevicesAreEmpty(this._deps.audioSettings.availableInputDevices)),
        ringtoneSelectDisabled: isHavingCall,
        showCallVolume: (_this$_deps$audioSett = this._deps.audioSettingsUIOptions) === null || _this$_deps$audioSett === void 0 ? void 0 : _this$_deps$audioSett.showCallVolume,
        showRingToneVolume: (_this$_deps$audioSett2 = this._deps.audioSettingsUIOptions) === null || _this$_deps$audioSett2 === void 0 ? void 0 : _this$_deps$audioSett2.showRingToneVolume,
        volumeTestData: (_this$_deps$volumeIns = this._deps.volumeInspector) === null || _this$_deps$volumeIns === void 0 ? void 0 : _this$_deps$volumeIns.data,
        selectedRingtoneId: (_this$_deps$ringtoneC = this._deps.ringtoneConfiguration) === null || _this$_deps$ringtoneC === void 0 ? void 0 : _this$_deps$ringtoneC.selectedRingtoneId,
        fullRingtoneList: ((_this$_deps$ringtoneC2 = this._deps.ringtoneConfiguration) === null || _this$_deps$ringtoneC2 === void 0 ? void 0 : _this$_deps$ringtoneC2.fullRingtoneList) || [],
        isUploadRingtoneDisabled: (_this$_deps$ringtoneC3 = this._deps.ringtoneConfiguration) === null || _this$_deps$ringtoneC3 === void 0 ? void 0 : _this$_deps$ringtoneC3.isUploadRingtoneDisabled,
        enableCustomRingtone: (_this$_deps$ringtoneC4 = this._deps.ringtoneConfiguration) === null || _this$_deps$ringtoneC4 === void 0 ? void 0 : _this$_deps$ringtoneC4.enableCustomRingtone
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
        },
        checkAudioAvailable: function checkAudioAvailable() {
          return _this._deps.audioSettings.checkAudioAvailable({
            checkIfNoDevices: false
          });
        },
        handleTestMicroClick: function handleTestMicroClick(testState) {
          var _this$_deps$volumeIns2;
          (_this$_deps$volumeIns2 = _this._deps.volumeInspector) === null || _this$_deps$volumeIns2 === void 0 ? void 0 : _this$_deps$volumeIns2.handleTestMicroClick(testState);
        },
        handleTestSpeakerClick: function handleTestSpeakerClick(testState) {
          var _this$_deps$volumeIns3;
          (_this$_deps$volumeIns3 = _this._deps.volumeInspector) === null || _this$_deps$volumeIns3 === void 0 ? void 0 : _this$_deps$volumeIns3.handleTestSpeakerClick(testState);
        },
        updateCurrentRingtone: function updateCurrentRingtone(id) {
          _this.selectToRingtone(id);
        },
        removeCustomRingtone: function removeCustomRingtone(id) {
          var _this$_deps$ringtoneC5;
          (_this$_deps$ringtoneC5 = _this._deps.ringtoneConfiguration) === null || _this$_deps$ringtoneC5 === void 0 ? void 0 : _this$_deps$ringtoneC5.removeCustomRingtone(id);
        },
        uploadCustomRingtone: function uploadCustomRingtone(audioInfo) {
          var _this$_deps$ringtoneC6;
          var id = "custom-".concat((0, _uuid.v4)());
          (_this$_deps$ringtoneC6 = _this._deps.ringtoneConfiguration) === null || _this$_deps$ringtoneC6 === void 0 ? void 0 : _this$_deps$ringtoneC6.uploadCustomRingtone({
            id: id,
            name: audioInfo.fileName,
            url: audioInfo.dataUrl,
            type: 'custom'
          });
          _this.selectToRingtone(id);
        },
        showDangerAlert: function showDangerAlert(message) {
          var _this$_deps$ringtoneC7;
          (_this$_deps$ringtoneC7 = _this._deps.ringtoneConfiguration) === null || _this$_deps$ringtoneC7 === void 0 ? void 0 : _this$_deps$ringtoneC7.showDangerAlert(message);
        }
      };
    }
  }, {
    key: "selectToRingtone",
    value: function selectToRingtone(id) {
      if (!this._deps.ringtoneConfiguration) return;
      this._deps.ringtoneConfiguration.setSelectedRingtoneId(id);
      this._deps.ringtoneConfiguration.updateIncomingRingtone();
    }
  }]);
}(_core.RcUIModuleV2)) || _class);
//# sourceMappingURL=AudioSettingsUI.js.map
