"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = AuthAlert;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _authMessages = _interopRequireDefault(require("ringcentral-integration/modules/Auth/authMessages"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function AuthAlert(props) {
  var msg = _i18n["default"].getString(props.message.message, props.currentLocale);

  return /*#__PURE__*/_react["default"].createElement("span", null, msg);
}

AuthAlert.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  message: _propTypes["default"].shape({
    message: _propTypes["default"].string.isRequired
  }).isRequired
};

AuthAlert.handleMessage = function (_ref) {
  var message = _ref.message;
  return message === _authMessages["default"].accessDenied || message === _authMessages["default"].internalError || message === _authMessages["default"].sessionExpired;
};
//# sourceMappingURL=index.js.map
