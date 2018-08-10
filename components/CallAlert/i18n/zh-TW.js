"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _callErrors$noToNumbe;

var _callErrors = require("ringcentral-integration/modules/Call/callErrors");

var _callErrors2 = _interopRequireDefault(_callErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_callErrors$noToNumbe = {}, (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.noToNumber, "請輸入有效的電話號碼。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.noAreaCode, "請設定讓 {areaCodeLink} 使用 7 位數的本地電話號碼。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.specialNumber, "不支援撥號至緊急或特別服務號碼。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.connectFailed, "連線失敗。請稍後再試一次。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.internalError, "因為內部錯誤導致無法連線。請稍後再試一次。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.notAnExtension, "分機號碼不存在。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.networkError, "因為網路問題導致無法連線。請稍後再試一次。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.noInternational, "您沒有進行國際通話的權限。請聯絡您的 {brand} 帳戶管理員進行升級。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.noRingoutEnable, "您的分機可以使用桌面應用程式進行通話。\n    若您希望切換至其他通話選項，\n    請聯絡您的帳戶管理員進行升級。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, "areaCode", "區碼"), (0, _defineProperty3.default)(_callErrors$noToNumbe, "telus911", "不支援緊急撥號。"), _callErrors$noToNumbe);

// @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.specialNumber]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noInternational]"@#@ @source: @#@"You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@
//# sourceMappingURL=zh-TW.js.map
