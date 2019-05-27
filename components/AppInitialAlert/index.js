"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = AppInitialAlert;

var _ramda = require("ramda");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _errorMessages = _interopRequireDefault(require("ringcentral-integration/modules/AvailabilityMonitor/errorMessages"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function AppInitialAlert(props) {
  var msg = _i18n["default"].getString(props.message.message, props.currentLocale);

  return _react["default"].createElement("span", null, msg);
}

AppInitialAlert.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  message: _propTypes["default"].shape({
    message: _propTypes["default"].string.isRequired
  }).isRequired
};

AppInitialAlert.handleMessage = function (_ref) {
  var message = _ref.message;
  return (0, _ramda.contains)(message, [_errorMessages["default"].appInitialError, _errorMessages["default"].serviceLimited]);
};
//# sourceMappingURL=index.js.map
