"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _ramda = require("ramda");
var _ConferenceCall = require("@ringcentral-integration/commons/modules/ConferenceCall");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ConferenceCallAlert = function ConferenceCallAlert(props) {
  var msg = _i18n["default"].getString(props.message.message, props.currentLocale);
  return /*#__PURE__*/_react["default"].createElement("span", null, msg);
};
// @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
ConferenceCallAlert.handleMessage = function (_ref) {
  var message = _ref.message;
  return (0, _ramda.includes)(message, [_ConferenceCall.conferenceCallErrors.bringInFailed, _ConferenceCall.conferenceCallErrors.makeConferenceFailed, _ConferenceCall.conferenceCallErrors.terminateConferenceFailed, _ConferenceCall.conferenceCallErrors.removeFromConferenceFailed, _ConferenceCall.conferenceCallErrors.callIsRecording]);
};
var _default = ConferenceCallAlert;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
