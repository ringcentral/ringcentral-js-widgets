"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ConferenceAlert;

var _ramda = require("ramda");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _conferenceCallErrors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/ConferenceCall/conferenceCallErrors"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ConferenceAlert(props) {
  var msg = _i18n["default"].getString(props.message.message, props.currentLocale);

  return /*#__PURE__*/_react["default"].createElement("span", null, msg);
}

ConferenceAlert.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  message: _propTypes["default"].shape({
    message: _propTypes["default"].string.isRequired
  }).isRequired
};

ConferenceAlert.handleMessage = function (_ref) {
  var message = _ref.message;
  return (0, _ramda.contains)(message, [_conferenceCallErrors["default"].bringInFailed, _conferenceCallErrors["default"].makeConferenceFailed, _conferenceCallErrors["default"].terminateConferenceFailed, _conferenceCallErrors["default"].removeFromConferenceFailed, _conferenceCallErrors["default"].callIsRecording]);
};
//# sourceMappingURL=index.js.map
