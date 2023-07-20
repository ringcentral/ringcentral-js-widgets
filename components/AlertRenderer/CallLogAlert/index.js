"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CallLogAlert;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _callLogMessages = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callLogMessages"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function CallLogAlert(_ref) {
  var message = _ref.message.message,
    currentLocale = _ref.currentLocale;
  return _i18n["default"].getString(message, currentLocale);
}
CallLogAlert.propTypes = {
  message: _propTypes["default"].shape({
    message: _propTypes["default"].string.isRequired
  }).isRequired,
  currentLocale: _propTypes["default"].string.isRequired
};
CallLogAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _callLogMessages["default"].logCallLogFailed || message === _callLogMessages["default"].fieldRequired || message === _callLogMessages["default"].logFailed;
};
//# sourceMappingURL=index.js.map
