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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = (_HintsType$thirdParty = {}, _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.thirdPartyNoRecordsContent, '輸入至少 {minimumLength} 個字元或數字以搜尋所有 {sourceName} 記錄。'), _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsTitle, '找不到結果'), _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsContent, '檢查其他來源的結果或變更關鍵字。'), _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.searching, '搜尋中…'), _defineProperty(_HintsType$thirdParty, "companyTabTitle", '公司'), _defineProperty(_HintsType$thirdParty, "personalTabTitle", '個人'), _defineProperty(_HintsType$thirdParty, "direct", '直撥'), _defineProperty(_HintsType$thirdParty, "extension", '分機'), _defineProperty(_HintsType$thirdParty, "contact", '連絡人'), _defineProperty(_HintsType$thirdParty, "mobile", '行動電話'), _defineProperty(_HintsType$thirdParty, "company", '公司'), _defineProperty(_HintsType$thirdParty, "home", '住家'), _defineProperty(_HintsType$thirdParty, "home2", '住家'), _defineProperty(_HintsType$thirdParty, "other", '其他'), _defineProperty(_HintsType$thirdParty, "business", '商務'), _defineProperty(_HintsType$thirdParty, "business2", '商務'), _defineProperty(_HintsType$thirdParty, "car", '汽車'), _defineProperty(_HintsType$thirdParty, "fax", '傳真'), _defineProperty(_HintsType$thirdParty, "assistant", '助理'), _defineProperty(_HintsType$thirdParty, "callback", '回撥'), _defineProperty(_HintsType$thirdParty, "MobileNumber", '行動電話號碼'), _defineProperty(_HintsType$thirdParty, "ContactNumber", '連絡人號碼'), _defineProperty(_HintsType$thirdParty, "DirectNumber", '直撥號碼'), _defineProperty(_HintsType$thirdParty, "doNotCall", '請勿來電'), _HintsType$thirdParty); // @key: @#@"[HintsType.thirdPartyNoRecordsContent]"@#@ @source: @#@"Enter at least {minimumLength} characters or digits to search all {sourceName} records."@#@
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
//# sourceMappingURL=zh-TW.js.map
