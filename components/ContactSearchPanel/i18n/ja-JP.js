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
var _ContactSearchPanelEnum = require("../ContactSearchPanelEnum");
var _HintsType$thirdParty;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_HintsType$thirdParty = {}, _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.thirdPartyNoRecordsContent, "すべての{sourceName}の記録を検索するには、少なくとも{minimumLength}つの文字または数字を入力してください。"), _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsTitle, "結果が見つかりません"), _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsContent, "他のソースから結果を確認するか、キーワードを変更してください。"), _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.searching, "検索中..."), _defineProperty(_HintsType$thirdParty, "companyTabTitle", "会社"), _defineProperty(_HintsType$thirdParty, "personalTabTitle", "個人"), _defineProperty(_HintsType$thirdParty, "direct", "直通"), _defineProperty(_HintsType$thirdParty, "extension", "内線"), _defineProperty(_HintsType$thirdParty, "contact", "連絡先"), _defineProperty(_HintsType$thirdParty, "mobile", "モバイル"), _defineProperty(_HintsType$thirdParty, "company", "会社"), _defineProperty(_HintsType$thirdParty, "home", "自宅"), _defineProperty(_HintsType$thirdParty, "home2", "自宅"), _defineProperty(_HintsType$thirdParty, "other", "その他"), _defineProperty(_HintsType$thirdParty, "business", "職場"), _defineProperty(_HintsType$thirdParty, "business2", "職場"), _defineProperty(_HintsType$thirdParty, "car", "自動車"), _defineProperty(_HintsType$thirdParty, "fax", "FAX"), _defineProperty(_HintsType$thirdParty, "assistant", "アシスタント"), _defineProperty(_HintsType$thirdParty, "callback", "コールバック"), _defineProperty(_HintsType$thirdParty, "MobileNumber", "携帯電話番号"), _defineProperty(_HintsType$thirdParty, "ContactNumber", "連絡先電話番号"), _defineProperty(_HintsType$thirdParty, "DirectNumber", "ダイレクトナンバー"), _defineProperty(_HintsType$thirdParty, "doNotCall", "通話拒否"), _HintsType$thirdParty); // @key: @#@"[HintsType.thirdPartyNoRecordsContent]"@#@ @source: @#@"Enter at least {minimumLength} characters or digits to search all {sourceName} records."@#@
// @key: @#@"[HintsType.noFilterOrSearchRecordsTitle]"@#@ @source: @#@"No results found"@#@
// @key: @#@"[HintsType.noFilterOrSearchRecordsContent]"@#@ @source: @#@"Check results from other sources or change your keyword."@#@
// @key: @#@"[HintsType.searching]"@#@ @source: @#@"Searching..."@#@
// @key: @#@"companyTabTitle"@#@ @source: @#@"Company"@#@
// @key: @#@"personalTabTitle"@#@ @source: @#@"Personal"@#@
// @key: @#@"direct"@#@ @source: @#@"Direct"@#@
// @key: @#@"extension"@#@ @source: @#@"Ext"@#@
// @key: @#@"contact"@#@ @source: @#@"Contact"@#@
// @key: @#@"mobile"@#@ @source: @#@"Mobile"@#@
// @key: @#@"company"@#@ @source: @#@"Company"@#@
// @key: @#@"home"@#@ @source: @#@"Home"@#@
// @key: @#@"home2"@#@ @source: @#@"Home"@#@
// @key: @#@"other"@#@ @source: @#@"Other"@#@
// @key: @#@"business"@#@ @source: @#@"Business"@#@
// @key: @#@"business2"@#@ @source: @#@"Business"@#@
// @key: @#@"car"@#@ @source: @#@"Car"@#@
// @key: @#@"fax"@#@ @source: @#@"Fax"@#@
// @key: @#@"assistant"@#@ @source: @#@"Assistant"@#@
// @key: @#@"callback"@#@ @source: @#@"Callback"@#@
// @key: @#@"MobileNumber"@#@ @source: @#@"Mobile Number"@#@
// @key: @#@"ContactNumber"@#@ @source: @#@"Contact Number"@#@
// @key: @#@"DirectNumber"@#@ @source: @#@"Direct Number"@#@
// @key: @#@"doNotCall"@#@ @source: @#@"Do Not Call"@#@
exports["default"] = _default;
//# sourceMappingURL=ja-JP.js.map
