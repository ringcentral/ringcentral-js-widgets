"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CallInfo;

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _permissionsMessages = require("ringcentral-integration/modules/RolesAndPermissions/permissionsMessages");

var _FormattedMessage = _interopRequireDefault(require("../../FormattedMessage"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function CallInfo(_ref) {
  var message = _ref.message.message,
      currentLocale = _ref.currentLocale,
      brand = _ref.brand;
  return /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
    message: _i18n["default"].getString(message, currentLocale),
    values: {
      brand: brand.name
    }
  });
}

CallInfo.propTypes = {
  message: _propTypes["default"].shape({
    message: _propTypes["default"].string.isRequired
  }).isRequired,
  brand: _propTypes["default"].object.isRequired,
  currentLocale: _propTypes["default"].string.isRequired
};

CallInfo.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _permissionsMessages.permissionsMessages.callingDisable;
};
//# sourceMappingURL=index.js.map
