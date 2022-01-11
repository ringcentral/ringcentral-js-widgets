"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecordControlButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _IconButton = require("@ringcentral/juno/es6/components/Buttons/IconButton/IconButton.js");

var _StopRecord = _interopRequireDefault(require("@ringcentral/juno/es6/icon/StopRecord.js"));

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
  return isRecording ? /*#__PURE__*/_react["default"].createElement(_IconButton.RcIconButton, {
    "data-sign": disablePauseRecord ? 'StopRecording' : 'PauseRecording',
    color: "danger.f02",
    symbol: _StopRecord["default"],
    variant: "round",
    title: _i18n["default"].getString(disablePauseRecord ? 'stopRecording' : 'pauseRecording', currentLocale),
    onClick: disablePauseRecord ? onStopRecord : onPauseRecord,
    size: size,
    className: className,
    shouldPersistBg: true
  }) : /*#__PURE__*/_react["default"].createElement(_IconButton.RcIconButton, {
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
