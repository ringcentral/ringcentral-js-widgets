"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckPauseRecordingTooltip = void 0;

var _juno = require("@ringcentral/juno");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@testing-library/react");

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function setup(_ref) {
  var _ref$currentLocale = _ref.currentLocale,
      currentLocale = _ref$currentLocale === void 0 ? 'en-US' : _ref$currentLocale,
      _ref$isRecording = _ref.isRecording,
      isRecording = _ref$isRecording === void 0 ? true : _ref$isRecording,
      _ref$onRecord = _ref.onRecord,
      onRecord = _ref$onRecord === void 0 ? function () {} : _ref$onRecord,
      _ref$onStopRecord = _ref.onStopRecord,
      onStopRecord = _ref$onStopRecord === void 0 ? function () {} : _ref$onStopRecord,
      _ref$disablePauseReco = _ref.disablePauseRecord,
      disablePauseRecord = _ref$disablePauseReco === void 0 ? true : _ref$disablePauseReco,
      _ref$onPauseRecord = _ref.onPauseRecord,
      onPauseRecord = _ref$onPauseRecord === void 0 ? function () {} : _ref$onPauseRecord;
  return (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_.RecordControlButton, {
    currentLocale: currentLocale,
    isRecording: isRecording,
    onRecord: onRecord,
    onStopRecord: onStopRecord,
    disablePauseRecord: disablePauseRecord,
    onPauseRecord: onPauseRecord
  })));
}

var CheckPauseRecordingTooltip = function CheckPauseRecordingTooltip() {
  var _setup = setup({
    disablePauseRecord: false
  }),
      container = _setup.container;

  var node = container.querySelector('[data-sign="PauseRecording"]');
  expect(node).toBeTruthy;
  expect(node.title).toBe('Pause recording');
};

exports.CheckPauseRecordingTooltip = CheckPauseRecordingTooltip;
//# sourceMappingURL=RecordControlButton.ut.js.map
