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
var _Call = require("@ringcentral-integration/commons/modules/Call");
var _callErrors$emergency;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = (_callErrors$emergency = {}, _defineProperty(_callErrors$emergency, _Call.callErrors.emergencyNumber, '緊急通話は利用できません。別の電話を使用して緊急サービスに連絡してください'), _defineProperty(_callErrors$emergency, _Call.callErrors.noToNumber, '有効な電話番号を入力してください。'), _defineProperty(_callErrors$emergency, _Call.callErrors.noAreaCode, '7桁の地域の電話番号を使用できるように{areaCodeLink}を設定してください。'), _defineProperty(_callErrors$emergency, _Call.callErrors.connectFailed, '接続に失敗しました。後でもう一度やり直してください。'), _defineProperty(_callErrors$emergency, _Call.callErrors.internalError, '内部エラーにより、接続できません。後でもう一度やり直してください。'), _defineProperty(_callErrors$emergency, _Call.callErrors.notAnExtension, 'この内線番号は存在しません。'), _defineProperty(_callErrors$emergency, _Call.callErrors.networkError, 'ネットワークの問題により、接続できません。後でもう一度やり直してください。'), _defineProperty(_callErrors$emergency, _Call.callErrors.noInternational, '国際電話を発信するためのアクセス許可がありません。アップグレードについては、{brand}のアカウント管理者にお問い合わせください。'), _defineProperty(_callErrors$emergency, _Call.callErrors.noRingoutEnable, 'お使いの内線は、デスクトップアプリを使用した通話発信が許可されています。\n    他の通話オプションに切り替えたい場合は、\n    アップグレードについてアカウント管理者にお問い合わせください。'), _defineProperty(_callErrors$emergency, _Call.callErrors.numberParseError, '申し訳ありませんが、こちら側で問題が発生しました。後でもう一度やり直してください。'), _defineProperty(_callErrors$emergency, "areaCode", '市外局番'), _defineProperty(_callErrors$emergency, "telus911", '緊急ダイヤルはサポートされていません。'), _defineProperty(_callErrors$emergency, _Call.callErrors.fromAndToNumberIsSame, 'RingOut番号と通話先の番号を同じにはできません。番号を変更してもう一度やり直してください。'), _callErrors$emergency); // @key: @#@"[callErrors.emergencyNumber]"@#@ @source: @#@"Emergency calling is not available. Please use another phone to contact emergency services"@#@
// @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noInternational]"@#@ @source: @#@"You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"[callErrors.numberParseError]"@#@ @source: @#@"Sorry, there was a problem on our end. Please try again later."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@
// @key: @#@"[callErrors.fromAndToNumberIsSame]"@#@ @source: @#@"The RingOut number and destination number can't be the same. Please update the number and try again."@#@
exports["default"] = _default;
//# sourceMappingURL=ja-JP.js.map
