"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ConnectivityAlert;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _connectivityTypes = _interopRequireDefault(require("../../../modules/ConnectivityManager/connectivityTypes"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ConnectivityAlert(_ref) {
  var message = _ref.message.message,
      currentLocale = _ref.currentLocale;
  return /*#__PURE__*/_react["default"].createElement("div", null, _i18n["default"].getString(message, currentLocale));
}

ConnectivityAlert.propTypes = {
  message: _propTypes["default"].shape({
    message: _propTypes["default"].string.isRequired
  }).isRequired,
  currentLocale: _propTypes["default"].string.isRequired
};

ConnectivityAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _connectivityTypes["default"].networkLoss || message === _connectivityTypes["default"].offline || message === _connectivityTypes["default"].serverUnavailable || message === _connectivityTypes["default"].voipOnly || message === _connectivityTypes["default"].survival || message === _connectivityTypes["default"].webphoneUnavailable;
};
//# sourceMappingURL=index.js.map
