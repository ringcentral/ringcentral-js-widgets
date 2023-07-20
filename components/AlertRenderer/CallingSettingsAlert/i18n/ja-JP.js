"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _CallingSettings = require("@ringcentral-integration/commons/modules/CallingSettings");
var _callingSettingsMessa;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_callingSettingsMessa = {}, _defineProperty(_callingSettingsMessa, _CallingSettings.callingSettingsMessages.saveSuccess, "設定が正常に保存されました。"), _defineProperty(_callingSettingsMessa, _CallingSettings.callingSettingsMessages.saveSuccessWithSoftphone, "設定が正常に保存されました。お使いのコンピューターに{brand}がインストールされていることを確認してください。"), _defineProperty(_callingSettingsMessa, _CallingSettings.callingSettingsMessages.permissionChanged, "アクセス許可が最近変更されました。{link}の順に移動して、[通話]のオプションを確認してください。"), _defineProperty(_callingSettingsMessa, _CallingSettings.callingSettingsMessages.phoneNumberChanged, "電話番号情報が最近変更されました。{link}にアクセスして、[通話]のオプションを確認してください。"), _defineProperty(_callingSettingsMessa, "link", "[設定] > [通話]"), _defineProperty(_callingSettingsMessa, _CallingSettings.callingSettingsMessages.webphonePermissionRemoved, "アクセス許可が変更されたため、ブラウザーを使用した通話はできません。詳細については、アカウント管理者にお問い合わせください。"), _defineProperty(_callingSettingsMessa, _CallingSettings.callingSettingsMessages.emergencyCallingNotAvailable, "緊急サービスまたは特別なサービスの番号へのダイヤルはサポートされていません。緊急時は、従来の有線電話または携帯電話を使用して、緊急電話番号に電話してください。"), _defineProperty(_callingSettingsMessa, _CallingSettings.callingSettingsMessages.saveSuccessWithJupiter, "設定が正常に保存されました。お使いのコンピューターに{brand}がインストールされていることを確認してください。"), _defineProperty(_callingSettingsMessa, _CallingSettings.callingSettingsMessages.disableEmergencyInJapan, "緊急サービスは日本では利用できません。"), _callingSettingsMessa); // @key: @#@"[callingSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithSoftphone]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} installed in your computer."@#@
// @key: @#@"[callingSettingsMessages.permissionChanged]"@#@ @source: @#@"Your permissions have been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"[callingSettingsMessages.phoneNumberChanged]"@#@ @source: @#@"Your phone number information has been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"link"@#@ @source: @#@"Settings > Calling"@#@
// @key: @#@"[callingSettingsMessages.webphonePermissionRemoved]"@#@ @source: @#@"Your permissions have been changed and you cannot make calls with Browser. For details please contact your account administrator."@#@
// @key: @#@"[callingSettingsMessages.emergencyCallingNotAvailable]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported. In an emergency, use your traditional wireline or wireless phone to call an emergency number."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithJupiter]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} installed in your computer."@#@
// @key: @#@"[callingSettingsMessages.disableEmergencyInJapan]"@#@ @source: @#@"Emergency service is not available in Japan."@#@
exports["default"] = _default;
//# sourceMappingURL=ja-JP.js.map
