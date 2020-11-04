"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callingSettingsMessages = _interopRequireDefault(require("ringcentral-integration/modules/CallingSettings/callingSettingsMessages"));

var _callingSettingsMessa;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_callingSettingsMessa = {}, _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].saveSuccess, "설정이 성공적으로 저장되었습니다."), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].saveSuccessWithSoftphone, "설정이 성공적으로 저장되었습니다. 컴퓨터에 {brand}이(가) 설치되어 있는지 확인하세요."), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].permissionChanged, "최근 권한이 변경되었습니다. {link}(으)로 이동하여 통화 옵션을 확인하세요."), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].phoneNumberChanged, "최근 전화번호 정보가 변경되었습니다. {link}(으)로 이동하여 통화 옵션을 확인하세요."), _defineProperty(_callingSettingsMessa, "link", "설정 > 통화"), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].webphonePermissionRemoved, "권한이 변경되어 브라우저를 사용하여 전화를 걸 수 없습니다. 자세한 내용은 계정 관리자에게 문의하세요."), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].emergencyCallingNotAvailable, "긴급 또는 특별 서비스 번호로 전화 걸기는 지원되지 않습니다. 비상시에는 기존 유선 전화 또는 무선 전화를 사용하여 긴급 번호로 전화를 거세요."), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].saveSuccessWithJupiter, "설정이 성공적으로 저장되었습니다. 컴퓨터에 {brand}이(가) 설치되어 있는지 확인하세요."), _callingSettingsMessa); // @key: @#@"[callingSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithSoftphone]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} installed in your computer."@#@
// @key: @#@"[callingSettingsMessages.permissionChanged]"@#@ @source: @#@"Your permissions have been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"[callingSettingsMessages.phoneNumberChanged]"@#@ @source: @#@"Your phone number information has been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"link"@#@ @source: @#@"Settings > Calling"@#@
// @key: @#@"[callingSettingsMessages.webphonePermissionRemoved]"@#@ @source: @#@"Your permissions have been changed and you cannot make calls with Browser. For details please contact your account administrator."@#@
// @key: @#@"[callingSettingsMessages.emergencyCallingNotAvailable]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported. In an emergency, use your traditional wireline or wireless phone to call an emergency number."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithJupiter]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} installed in your computer."@#@


exports["default"] = _default;
//# sourceMappingURL=ko-KR.js.map
