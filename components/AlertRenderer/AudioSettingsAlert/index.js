"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _AudioSettings = require("@ringcentral-integration/commons/modules/AudioSettings");
var _FormattedMessage = _interopRequireDefault(require("../../FormattedMessage"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var AudioSettingsAlert = function AudioSettingsAlert(_ref) {
  var application = _ref.application,
    currentLocale = _ref.currentLocale,
    message = _ref.message;
  var view = /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
    message: _i18n["default"].getString(message.message, currentLocale),
    values: {
      application: application
    }
  });
  return /*#__PURE__*/_react["default"].createElement("span", null, view);
};
// @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
AudioSettingsAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _AudioSettings.audioSettingsErrors.userMediaPermission;
};
var _default = AudioSettingsAlert;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
