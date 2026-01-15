"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PermissionsAlert = void 0;
var _permissionsMessages = require("@ringcentral-integration/commons/enums/permissionsMessages");
var _react = _interopRequireDefault(require("react"));
var _FormattedMessage = _interopRequireDefault(require("../../FormattedMessage"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PermissionsAlert = exports.PermissionsAlert = function PermissionsAlert(_ref) {
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
PermissionsAlert.defaultProps = {
  application: undefined
};
// @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
PermissionsAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _permissionsMessages.permissionsMessages.invalidTier || message === _permissionsMessages.permissionsMessages.insufficientPrivilege;
};
var _default = exports["default"] = PermissionsAlert;
//# sourceMappingURL=index.js.map
