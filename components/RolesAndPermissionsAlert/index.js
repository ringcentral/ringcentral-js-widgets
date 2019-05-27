"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = RolesAndPermissionsAlert;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _permissionsMessages = _interopRequireDefault(require("ringcentral-integration/modules/RolesAndPermissions/permissionsMessages"));

var _FormattedMessage = _interopRequireDefault(require("../FormattedMessage"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function RolesAndPermissionsAlert(_ref) {
  var message = _ref.message.message,
      currentLocale = _ref.currentLocale,
      brand = _ref.brand,
      application = _ref.application;
  var msg;

  switch (message) {
    case _permissionsMessages["default"].invalidTier:
      msg = _react["default"].createElement(_FormattedMessage["default"], {
        message: _i18n["default"].getString(message, currentLocale),
        values: {
          brand: brand,
          application: application
        }
      });
      break;

    default:
      msg = _i18n["default"].getString(message, currentLocale);
      break;
  }

  return _react["default"].createElement("div", null, msg);
}

RolesAndPermissionsAlert.propTypes = {
  message: _propTypes["default"].shape({
    message: _propTypes["default"].string.isRequired
  }).isRequired,
  brand: _propTypes["default"].string.isRequired,
  application: _propTypes["default"].string,
  currentLocale: _propTypes["default"].string.isRequired
};
RolesAndPermissionsAlert.defaultProps = {
  application: undefined
};

RolesAndPermissionsAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _permissionsMessages["default"].invalidTier || message === _permissionsMessages["default"].insufficientPrivilege;
};
//# sourceMappingURL=index.js.map
