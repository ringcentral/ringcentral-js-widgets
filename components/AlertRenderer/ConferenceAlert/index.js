"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ConferenceAlert;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _messages = _interopRequireDefault(require("ringcentral-integration/modules/Conference/messages"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ConferenceAlert(props) {
  var msg = _i18n["default"].getString(props.message.message, props.currentLocale);

  return _react["default"].createElement("span", null, msg);
}

ConferenceAlert.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  message: _propTypes["default"].shape({
    message: _propTypes["default"].string.isRequired
  }).isRequired
};

ConferenceAlert.handleMessage = function (_ref) {
  var message = _ref.message;
  return message === _messages["default"].requireAditionalNumbers || message === _messages["default"].scheduledSuccess;
};
//# sourceMappingURL=index.js.map
