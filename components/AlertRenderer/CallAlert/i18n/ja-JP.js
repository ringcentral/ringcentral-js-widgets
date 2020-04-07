"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callErrors = _interopRequireDefault(require("ringcentral-integration/modules/Call/callErrors"));

var _callErrors$noToNumbe;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_callErrors$noToNumbe = {}, _defineProperty(_callErrors$noToNumbe, _callErrors["default"].noToNumber, "有効な電話番号を入力してください。"), _defineProperty(_callErrors$noToNumbe, _callErrors["default"].noAreaCode, "7桁の国内電話番号を使用するには、{areaCodeLink}を設定してください。"), _defineProperty(_callErrors$noToNumbe, _callErrors["default"].specialNumber, "緊急サービスまたは特別なサービスの番号へのダイヤルはサポートされていません。"), _defineProperty(_callErrors$noToNumbe, _callErrors["default"].connectFailed, "接続に失敗しました。後でもう一度やり直してください。"), _defineProperty(_callErrors$noToNumbe, _callErrors["default"].internalError, "内部エラーにより、接続できません。後でもう一度やり直してください。"), _defineProperty(_callErrors$noToNumbe, _callErrors["default"].notAnExtension, "この内線番号は存在しません。"), _defineProperty(_callErrors$noToNumbe, _callErrors["default"].networkError, "ネットワークの問題により、接続できません。後でもう一度やり直してください。"), _defineProperty(_callErrors$noToNumbe, _callErrors["default"].noInternational, "国際電話を発信するためのアクセス許可がありません。アップグレードについて{brand}アカウント管理者にお問い合わせください。"), _defineProperty(_callErrors$noToNumbe, _callErrors["default"].noRingoutEnable, "お使いの内線は、デスクトップアプリを使用した通話発信が許可されています。\n    他の通話オプションに切り替えたい場合は、\n    アップグレードについてアカウント管理者にお問い合わせください。"), _defineProperty(_callErrors$noToNumbe, "areaCode", "市外局番"), _defineProperty(_callErrors$noToNumbe, "telus911", "緊急ダイヤルはサポートされていません。"), _callErrors$noToNumbe); // @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
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


exports["default"] = _default;
//# sourceMappingURL=ja-JP.js.map
