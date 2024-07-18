"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.find");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioSettingsUI = void 0;
var _di = require("@ringcentral-integration/commons/lib/di");
var _AudioSettings = require("@ringcentral-integration/commons/modules/AudioSettings");
var _CallingSettings = require("@ringcentral-integration/commons/modules/CallingSettings");
var _RingtoneConfiguration = require("@ringcentral-integration/commons/modules/RingtoneConfiguration");
var _VolumeInspector = require("@ringcentral-integration/commons/modules/VolumeInspector");
var _core = require("@ringcentral-integration/core");
var _uuid = require("uuid");
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
var AudioSettingsUI = (_dec = (0, _di.Module)({
  name: 'AudioSettingsUI',
  deps: ['AudioSettings', 'Locale', 'CallingSettings', 'RouterInteraction', 'CallMonitor', {
    dep: 'RingtoneConfiguration',
    optional: true
  }, {
    dep: 'VolumeInspector',
    optional: true
  }, {
    dep: 'Alert',
    optional: true
  }, {
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
      var _this$_deps$audioSett, _this$_deps$audioSett2, _this$_deps$ringtoneC, _this$_deps$ringtoneC2, _this$_deps$ringtoneC3, _this$_deps$ringtoneC4, _this$_deps$ringtoneC5, _this$_deps$ringtoneC6;
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
        outputDeviceDisabled: !this._deps.audioSettings.availableOutputDevices.length,
        inputDeviceDisabled: !!(!this._deps.audioSettings.availableInputDevices.length || isHavingCall),
        ringtoneSelectDisabled: isHavingCall,
        showCallVolume: (_this$_deps$audioSett = this._deps.audioSettingsUIOptions) === null || _this$_deps$audioSett === void 0 ? void 0 : _this$_deps$audioSett.showCallVolume,
        showRingToneVolume: (_this$_deps$audioSett2 = this._deps.audioSettingsUIOptions) === null || _this$_deps$audioSett2 === void 0 ? void 0 : _this$_deps$audioSett2.showRingToneVolume,
        volumeTestData: this._deps.volumeInspector ? {
          volume: this._deps.volumeInspector.volume,
          countDown: this._deps.volumeInspector.countDown,
          testState: this._deps.volumeInspector.testState,
          isRecording: this._deps.volumeInspector.testState === _VolumeInspector.TEST_STATE.RECORDS_AUDIO,
          type: this._deps.volumeInspector.type
        } : undefined,
        selectedRingtoneId: (_this$_deps$ringtoneC = this._deps.ringtoneConfiguration) === null || _this$_deps$ringtoneC === void 0 ? void 0 : _this$_deps$ringtoneC.selectedRingtoneId,
        fullRingtoneList: ((_this$_deps$ringtoneC2 = this._deps.ringtoneConfiguration) === null || _this$_deps$ringtoneC2 === void 0 ? void 0 : _this$_deps$ringtoneC2.fullRingtoneList) || [],
        isUploadRingtoneDisabled: ((_this$_deps$ringtoneC3 = this._deps.ringtoneConfiguration) === null || _this$_deps$ringtoneC3 === void 0 ? void 0 : _this$_deps$ringtoneC3.customRingtoneList) && ((_this$_deps$ringtoneC4 = this._deps.ringtoneConfiguration) === null || _this$_deps$ringtoneC4 === void 0 ? void 0 : (_this$_deps$ringtoneC5 = _this$_deps$ringtoneC4.customRingtoneList) === null || _this$_deps$ringtoneC5 === void 0 ? void 0 : _this$_deps$ringtoneC5.length) >= _RingtoneConfiguration.MAX_CUSTOM_RINGTONE_COUNT,
        enableCustomRingtone: (_this$_deps$ringtoneC6 = this._deps.ringtoneConfiguration) === null || _this$_deps$ringtoneC6 === void 0 ? void 0 : _this$_deps$ringtoneC6.enableCustomRingtone
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
        showAlert: function showAlert() {
          return _this._deps.audioSettings.showAlert();
        },
        handleTestMicroClick: function handleTestMicroClick(testState) {
          var _this$_deps$volumeIns, _this$_deps$volumeIns2, _this$_deps$volumeIns3;
          switch (testState) {
            case _VolumeInspector.TEST_STATE.IDLE:
              (_this$_deps$volumeIns = _this._deps.volumeInspector) === null || _this$_deps$volumeIns === void 0 ? void 0 : _this$_deps$volumeIns.startRecording();
              break;
            case _VolumeInspector.TEST_STATE.RECORDS_AUDIO:
              (_this$_deps$volumeIns2 = _this._deps.volumeInspector) === null || _this$_deps$volumeIns2 === void 0 ? void 0 : _this$_deps$volumeIns2.stopRecording();
              break;
            case _VolumeInspector.TEST_STATE.PLAYS_AUDIO:
              (_this$_deps$volumeIns3 = _this._deps.volumeInspector) === null || _this$_deps$volumeIns3 === void 0 ? void 0 : _this$_deps$volumeIns3.completeTest();
              break;
          }
        },
        handleTestSpeakerClick: function handleTestSpeakerClick(testState) {
          var _this$_deps$volumeIns4, _this$_deps$volumeIns5;
          switch (testState) {
            case _VolumeInspector.TEST_STATE.IDLE:
              (_this$_deps$volumeIns4 = _this._deps.volumeInspector) === null || _this$_deps$volumeIns4 === void 0 ? void 0 : _this$_deps$volumeIns4.startPlaySampleAudio();
              break;
            case _VolumeInspector.TEST_STATE.PLAYS_AUDIO:
              (_this$_deps$volumeIns5 = _this._deps.volumeInspector) === null || _this$_deps$volumeIns5 === void 0 ? void 0 : _this$_deps$volumeIns5.completeTest();
              break;
          }
        },
        updateCurrentRingtone: function updateCurrentRingtone(id) {
          var _this$_deps$ringtoneC7, _this$_deps$ringtoneC8;
          (_this$_deps$ringtoneC7 = _this._deps.ringtoneConfiguration) === null || _this$_deps$ringtoneC7 === void 0 ? void 0 : _this$_deps$ringtoneC7.setSelectedRingtoneId(id);
          (_this$_deps$ringtoneC8 = _this._deps.ringtoneConfiguration) === null || _this$_deps$ringtoneC8 === void 0 ? void 0 : _this$_deps$ringtoneC8.updateIncomingRingtone();
        },
        removeCustomRingtone: function removeCustomRingtone(id) {
          var _this$_deps$ringtoneC9, _this$_deps$ringtoneC10, _this$_deps$ringtoneC11;
          var hasCustomRingtone = (_this$_deps$ringtoneC9 = _this._deps.ringtoneConfiguration) === null || _this$_deps$ringtoneC9 === void 0 ? void 0 : _this$_deps$ringtoneC9.customRingtoneList.find(function (ringtone) {
            return ringtone.id === id;
          });
          if (!id || !hasCustomRingtone) {
            var _this$_deps$alert;
            (_this$_deps$alert = _this._deps.alert) === null || _this$_deps$alert === void 0 ? void 0 : _this$_deps$alert.danger({
              message: _AudioSettings.audioSettingsErrors.deleteRingtoneFailed
            });
          }
          (_this$_deps$ringtoneC10 = _this._deps.ringtoneConfiguration) === null || _this$_deps$ringtoneC10 === void 0 ? void 0 : _this$_deps$ringtoneC10.removeCustomRingtone(id);
          // if the remove one the selected ringtone, set the first default ringtone as selected
          if (id === ((_this$_deps$ringtoneC11 = _this._deps.ringtoneConfiguration) === null || _this$_deps$ringtoneC11 === void 0 ? void 0 : _this$_deps$ringtoneC11.selectedRingtoneId)) {
            var _this$_deps$ringtoneC12;
            _this.selectToRingtone((_this$_deps$ringtoneC12 = _this._deps.ringtoneConfiguration) === null || _this$_deps$ringtoneC12 === void 0 ? void 0 : _this$_deps$ringtoneC12.defaultRingtoneList[0].id);
          }
        },
        uploadCustomRingtone: function uploadCustomRingtone(audioInfo) {
          var _this$_deps$ringtoneC13;
          var id = "custom-".concat((0, _uuid.v4)());
          (_this$_deps$ringtoneC13 = _this._deps.ringtoneConfiguration) === null || _this$_deps$ringtoneC13 === void 0 ? void 0 : _this$_deps$ringtoneC13.uploadCustomRingtone({
            id: id,
            name: audioInfo.fileName,
            url: audioInfo.dataUrl,
            type: 'custom'
          });
          _this.selectToRingtone(id);
        },
        showDangerAlert: function showDangerAlert(message) {
          if (message) {
            var _this$_deps$alert2;
            (_this$_deps$alert2 = _this._deps.alert) === null || _this$_deps$alert2 === void 0 ? void 0 : _this$_deps$alert2.danger({
              message: message
            });
          }
        }
      };
    }
  }, {
    key: "selectToRingtone",
    value: function selectToRingtone(id) {
      var _this$_deps$ringtoneC14, _this$_deps$ringtoneC15;
      (_this$_deps$ringtoneC14 = this._deps.ringtoneConfiguration) === null || _this$_deps$ringtoneC14 === void 0 ? void 0 : _this$_deps$ringtoneC14.setSelectedRingtoneId(id);
      (_this$_deps$ringtoneC15 = this._deps.ringtoneConfiguration) === null || _this$_deps$ringtoneC15 === void 0 ? void 0 : _this$_deps$ringtoneC15.updateIncomingRingtone();
    }
  }]);
  return AudioSettingsUI;
}(_core.RcUIModuleV2)) || _class);
exports.AudioSettingsUI = AudioSettingsUI;
//# sourceMappingURL=AudioSettingsUI.js.map
