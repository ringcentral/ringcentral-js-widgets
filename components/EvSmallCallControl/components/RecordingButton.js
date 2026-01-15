"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecordingButton = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireDefault(require("react"));
var _iconRecording = _interopRequireDefault(require("../../../assets/icons/icon-recording.svg"));
var _i18n = _interopRequireDefault(require("../i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var RecordingButton = exports.RecordingButton = function RecordingButton(_ref) {
  var currentLocale = _ref.currentLocale,
    disabled = _ref.disabled,
    size = _ref.size;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    "data-sign": "Recording",
    color: "danger.f02",
    symbol: _iconRecording["default"],
    variant: "round",
    title: _i18n["default"].getString('Recording', currentLocale),
    shouldPersistBg: true,
    TooltipProps: {
      ignorePointer: disabled,
      maskProps: {
        className: disabled && _styles["default"].disableRecordingBtn
      }
    },
    disabled: disabled,
    size: size
  });
};
RecordingButton.defaultProps = {
  disabled: true,
  currentLocale: 'en-US',
  dataSign: 'Recording',
  time: 0
};
//# sourceMappingURL=RecordingButton.js.map
