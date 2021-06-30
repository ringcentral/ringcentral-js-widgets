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

var _default = (_callingSettingsMessa = {}, _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].saveSuccess, "设置已成功保存。"), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].saveSuccessWithSoftphone, "设置已成功保存。请确保您的计算机上已安装 {brand}。"), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].permissionChanged, "您的权限最近已被更改。请前往 {link} 检查您的呼叫选项。"), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].phoneNumberChanged, "您的电话号码信息最近已被更改。请前往 {link} 检查您的呼叫选项。"), _defineProperty(_callingSettingsMessa, "link", "设置 > 呼叫"), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].webphonePermissionRemoved, "您的权限已被更改，您无法通过浏览器拨打电话。有关详细信息，请联系您的帐户管理员。"), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].emergencyCallingNotAvailable, "不支持紧急或特殊服务号码拨号。在紧急情况下，请使用传统有线或无线电话拨打紧急号码。"), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].saveSuccessWithJupiter, "设置已成功保存。请确保您的计算机上已安装 {brand}。"), _callingSettingsMessa); // @key: @#@"[callingSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithSoftphone]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} installed in your computer."@#@
// @key: @#@"[callingSettingsMessages.permissionChanged]"@#@ @source: @#@"Your permissions have been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"[callingSettingsMessages.phoneNumberChanged]"@#@ @source: @#@"Your phone number information has been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"link"@#@ @source: @#@"Settings > Calling"@#@
// @key: @#@"[callingSettingsMessages.webphonePermissionRemoved]"@#@ @source: @#@"Your permissions have been changed and you cannot make calls with Browser. For details please contact your account administrator."@#@
// @key: @#@"[callingSettingsMessages.emergencyCallingNotAvailable]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported. In an emergency, use your traditional wireline or wireless phone to call an emergency number."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithJupiter]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} installed in your computer."@#@


exports["default"] = _default;
//# sourceMappingURL=zh-CN.js.map
