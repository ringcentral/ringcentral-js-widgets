"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VolumeTester = void 0;
var _VolumeInspector = require("@ringcentral-integration/commons/modules/VolumeInspector");
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _i18n = require("../i18n");
var _styles = _interopRequireDefault(require("../styles.scss"));
var _VolumeGauge = require("./VolumeGauge");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
var VolumeTester = function VolumeTester(props) {
  var type = props.type,
    audioType = props.audioType,
    handleButtonClick = props.handleButtonClick,
    _props$gaugeSize = props.gaugeSize,
    gaugeSize = _props$gaugeSize === void 0 ? 16 : _props$gaugeSize,
    volume = props.volume,
    testState = props.testState,
    countDown = props.countDown,
    isRecording = props.isRecording,
    disabled = props.disabled;
  var isInactive = (0, _react.useMemo)(function () {
    return type && audioType !== type;
  }, [audioType, type]);
  var convertVolumeForGauge = (0, _react.useMemo)(function () {
    if (isInactive) {
      return 0;
    }
    return Math.floor(gaugeSize * volume) * (100 / gaugeSize);
  }, [gaugeSize, volume, isInactive]);
  var buttonText = (0, _react.useMemo)(function () {
    var defaultText = (0, _i18n.t)(audioType === _VolumeInspector.TEST_TYPE.microphone ? 'startRecordButton' : 'startTestButton');
    if (isInactive) {
      return defaultText;
    }
    switch (testState) {
      case _VolumeInspector.TEST_STATE.RECORDS_AUDIO:
        return (0, _i18n.t)('stopRecordButton');
      case _VolumeInspector.TEST_STATE.PLAYS_AUDIO:
        return (0, _i18n.t)('stopPlaybackButton');
      default:
        return defaultText;
    }
  }, [testState, audioType, isInactive]);
  var hintText = (0, _react.useMemo)(function () {
    if (isInactive) {
      return null;
    }
    if (testState === _VolumeInspector.TEST_STATE.RECORDS_AUDIO && countDown) {
      return (0, _i18n.t)('stopRecordDescription', {
        countDown: countDown
      });
    }
    if (testState === _VolumeInspector.TEST_STATE.PLAYS_AUDIO) {
      return (0, _i18n.t)(audioType === _VolumeInspector.TEST_TYPE.microphone ? 'stopPlaybackDescription' : 'stopTestDescription');
    }
    return null;
  }, [countDown, testState, audioType, isInactive]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].testVolumeContainer
  }, hintText ? /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    "data-sign": "test-".concat(audioType, "-hint"),
    className: _styles["default"].testVolumeHint,
    color: isRecording ? 'danger.f02' : 'success.f02',
    variant: "caption1",
    display: "block"
  }, hintText) : null, /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    className: _styles["default"].testVolumeButton,
    size: "small",
    variant: "outlined",
    "data-sign": "test-".concat(audioType, "-button"),
    disabled: isInactive || disabled,
    onClick: handleButtonClick
  }, buttonText), /*#__PURE__*/_react["default"].createElement(_VolumeGauge.VolumeGauge, {
    "data-sign": "test-".concat(audioType, "-volume-gauge"),
    volume: convertVolumeForGauge,
    size: gaugeSize,
    isRecording: isRecording
  }));
};
exports.VolumeTester = VolumeTester;
//# sourceMappingURL=VolumeTester.js.map
