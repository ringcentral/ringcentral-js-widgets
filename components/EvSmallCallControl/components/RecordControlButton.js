"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecordControlButton = void 0;
var _react = _interopRequireDefault(require("react"));
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _iconRecord = _interopRequireDefault(require("../../../assets/icons/icon-record.svg"));
var _i18n = _interopRequireDefault(require("../i18n"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var RecordControlButton = function RecordControlButton(_ref) {
  var currentLocale = _ref.currentLocale,
    isRecording = _ref.isRecording,
    onRecord = _ref.onRecord,
    onStopRecord = _ref.onStopRecord,
    disablePauseRecord = _ref.disablePauseRecord,
    size = _ref.size,
    className = _ref.className,
    onPauseRecord = _ref.onPauseRecord;
  return isRecording ? /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    "data-sign": disablePauseRecord ? 'StopRecording' : 'PauseRecording',
    color: "danger.f02",
    symbol: _junoIcon.StopRecord,
    variant: "round",
    title: _i18n["default"].getString(disablePauseRecord ? 'stopRecording' : 'pauseRecording', currentLocale),
    onClick: disablePauseRecord ? onStopRecord : onPauseRecord,
    size: size,
    className: className,
    shouldPersistBg: true
  }) : /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    "data-sign": "StartRecording",
    symbol: _iconRecord["default"],
    variant: "round",
    title: _i18n["default"].getString('startRecording', currentLocale),
    onClick: onRecord,
    size: size,
    className: className
  });
};
exports.RecordControlButton = RecordControlButton;
RecordControlButton.defaultProps = {
  currentLocale: 'en-US'
};
//# sourceMappingURL=RecordControlButton.js.map
