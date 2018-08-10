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

exports.default = (_callErrors$noToNumbe = {}, (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.noToNumber, "有効な電話番号を入力してください。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.noAreaCode, "7桁の国内電話番号を使用するには、{areaCodeLink}を設定してください。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.specialNumber, "緊急サービスまたは特別なサービスの番号へのダイヤルはサポートされていません。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.connectFailed, "接続に失敗しました。後でもう一度やり直してください。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.internalError, "内部エラーにより、接続できません。後でもう一度やり直してください。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.notAnExtension, "この内線番号は存在しません。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.networkError, "ネットワークの問題により、接続できません。後でもう一度やり直してください。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.noInternational, "国際電話を発信するためのアクセス許可がありません。アップグレードについて{brand}アカウント管理者にお問い合わせください。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, _callErrors2.default.noRingoutEnable, "お使いの内線は、デスクトップアプリを使用した通話発信が許可されています。\n    他の通話オプションに切り替えたい場合は、\n    アップグレードについてアカウント管理者にお問い合わせください。"), (0, _defineProperty3.default)(_callErrors$noToNumbe, "areaCode", "市外局番"), (0, _defineProperty3.default)(_callErrors$noToNumbe, "telus911", "緊急ダイヤルはサポートされていません。"), _callErrors$noToNumbe);

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
//# sourceMappingURL=ja-JP.js.map
