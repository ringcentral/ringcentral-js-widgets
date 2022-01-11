"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PermissionsAlert = void 0;

var _react = _interopRequireDefault(require("react"));

var _permissionsMessages = require("@ringcentral-integration/commons/enums/permissionsMessages");

var _FormattedMessage = _interopRequireDefault(require("../../FormattedMessage"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PermissionsAlert = function PermissionsAlert(_ref) {
  var message = _ref.message.message,
      currentLocale = _ref.currentLocale,
      brand = _ref.brand,
      application = _ref.application;
  var msg;

  switch (message) {
    case _permissionsMessages.permissionsMessages.invalidTier:
      msg = /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
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

  return /*#__PURE__*/_react["default"].createElement("div", null, msg);
};

exports.PermissionsAlert = PermissionsAlert;
PermissionsAlert.defaultProps = {
  application: undefined
};

PermissionsAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _permissionsMessages.permissionsMessages.invalidTier || message === _permissionsMessages.permissionsMessages.insufficientPrivilege;
};

var _default = PermissionsAlert;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
