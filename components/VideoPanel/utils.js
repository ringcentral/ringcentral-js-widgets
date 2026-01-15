"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHelperTextForPasswordField = getHelperTextForPasswordField;
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function getHelperTextForPasswordField(meetingPassword, isMeetingPasswordValid, currentLocale, isPasswordFocus) {
  if (!meetingPassword) {
    return _i18n["default"].getString('passwordEmptyError', currentLocale);
  }
  if (!isMeetingPasswordValid) {
    return _i18n["default"].getString('passwordInvalidError', currentLocale);
  }
  if (isPasswordFocus) {
    return _i18n["default"].getString('passwordHintText', currentLocale);
  }
  return '';
}
//# sourceMappingURL=utils.js.map
