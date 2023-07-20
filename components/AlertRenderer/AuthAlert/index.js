"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _ramda = require("ramda");
var _Auth = require("@ringcentral-integration/commons/modules/Auth");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var AuthAlert = function AuthAlert(props) {
  var msg = _i18n["default"].getString(props.message.message, props.currentLocale);
  return /*#__PURE__*/_react["default"].createElement("span", null, msg);
};
// @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
AuthAlert.handleMessage = function (_ref) {
  var message = _ref.message;
  return (0, _ramda.includes)(message, [_Auth.authMessages.accessDenied, _Auth.authMessages.internalError, _Auth.authMessages.sessionExpired, _Auth.authMessages.beforeLogoutError, _Auth.authMessages.logoutError, _Auth.authMessages.siteAccessForbidden]);
};
var _default = AuthAlert;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
