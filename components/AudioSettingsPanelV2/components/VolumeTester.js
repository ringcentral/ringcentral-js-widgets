"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
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
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var VolumeTester = exports.VolumeTester = function VolumeTester(props) {
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
//# sourceMappingURL=VolumeTester.js.map
