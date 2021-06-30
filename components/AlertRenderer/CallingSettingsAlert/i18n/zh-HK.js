"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callingSettingsMessages = _interopRequireDefault(require("@ringcentral-integration/commons/modules/CallingSettings/callingSettingsMessages"));

var _callingSettingsMessa;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_callingSettingsMessa = {}, _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].saveSuccess, "設定已成功儲存。"), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].saveSuccessWithSoftphone, "設定儲存成功。請確定您在電腦上已安裝 {brand}。"), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].permissionChanged, "您的權限最近已變更。請前往 {link} 以檢查您的通話選項。"), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].phoneNumberChanged, "您的電話號碼資訊最近已變更。請前往 {link} 以檢查您的通話選項。"), _defineProperty(_callingSettingsMessa, "link", "設定 > 通話"), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].webphonePermissionRemoved, "您的權限已變更，而您無法使用瀏覽器進行通話。如需詳細資訊，請聯絡您的帳戶管理員。"), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].emergencyCallingNotAvailable, "不支援撥打緊急或特殊服務號碼。在發生緊急狀況時，請使用您的傳統有線線路或無線電話撥打緊急電話。"), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].saveSuccessWithJupiter, "設定儲存成功。請確定您在電腦上已安裝 {brand}。"), _callingSettingsMessa); // @key: @#@"[callingSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithSoftphone]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} installed in your computer."@#@
// @key: @#@"[callingSettingsMessages.permissionChanged]"@#@ @source: @#@"Your permissions have been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"[callingSettingsMessages.phoneNumberChanged]"@#@ @source: @#@"Your phone number information has been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"link"@#@ @source: @#@"Settings > Calling"@#@
// @key: @#@"[callingSettingsMessages.webphonePermissionRemoved]"@#@ @source: @#@"Your permissions have been changed and you cannot make calls with Browser. For details please contact your account administrator."@#@
// @key: @#@"[callingSettingsMessages.emergencyCallingNotAvailable]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported. In an emergency, use your traditional wireline or wireless phone to call an emergency number."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithJupiter]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} installed in your computer."@#@


exports["default"] = _default;
//# sourceMappingURL=zh-HK.js.map
