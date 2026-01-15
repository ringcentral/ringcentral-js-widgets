"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHelperTextForPasswordField = getHelperTextForPasswordField;
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function getHelperTextForPasswordField(meetingPassword, isMeetingPasswordValid, currentLocale) {
  if (!meetingPassword) {
    return _i18n["default"].getString('passwordEmptyError', currentLocale);
  }
  if (!isMeetingPasswordValid) {
    return _i18n["default"].getString('passwordInvalidError', currentLocale);
  }
  return _i18n["default"].getString('passwordHintText', currentLocale);
}
//# sourceMappingURL=utils.js.map
