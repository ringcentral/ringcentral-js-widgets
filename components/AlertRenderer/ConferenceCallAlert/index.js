"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ramda = require("ramda");

var _conferenceCallErrors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/ConferenceCall/conferenceCallErrors"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ConferenceAlert = function ConferenceAlert(props) {
  var msg = _i18n["default"].getString(props.message.message, props.currentLocale);

  return /*#__PURE__*/_react["default"].createElement("span", null, msg);
};

ConferenceAlert.handleMessage = function (_ref) {
  var message = _ref.message;
  return (0, _ramda.contains)(message, [_conferenceCallErrors["default"].bringInFailed, _conferenceCallErrors["default"].makeConferenceFailed, _conferenceCallErrors["default"].terminateConferenceFailed, _conferenceCallErrors["default"].removeFromConferenceFailed, _conferenceCallErrors["default"].callIsRecording]);
};

var _default = ConferenceAlert;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
