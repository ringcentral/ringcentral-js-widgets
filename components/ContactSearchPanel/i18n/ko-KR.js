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
var _default = (_HintsType$thirdParty = {}, _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.thirdPartyNoRecordsContent, '{sourceName} 레코드를 모두 찾으려면 검색어(문자 또는 숫자)를 최소 {minimumLength}자 이상 입력하세요.'), _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsTitle, '검색 결과 없음'), _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsContent, '다른 소스에서 결과를 확인하거나 키워드를 변경하세요.'), _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.searching, '검색하는 중...'), _defineProperty(_HintsType$thirdParty, "companyTabTitle", '회사'), _defineProperty(_HintsType$thirdParty, "personalTabTitle", '개인'), _defineProperty(_HintsType$thirdParty, "direct", '직접'), _defineProperty(_HintsType$thirdParty, "extension", '내선'), _defineProperty(_HintsType$thirdParty, "contact", '문의하기'), _defineProperty(_HintsType$thirdParty, "mobile", '모바일'), _defineProperty(_HintsType$thirdParty, "company", '회사'), _defineProperty(_HintsType$thirdParty, "home", '홈'), _defineProperty(_HintsType$thirdParty, "home2", '홈'), _defineProperty(_HintsType$thirdParty, "other", '기타'), _defineProperty(_HintsType$thirdParty, "business", '비즈니스'), _defineProperty(_HintsType$thirdParty, "business2", '비즈니스'), _defineProperty(_HintsType$thirdParty, "car", '자동차'), _defineProperty(_HintsType$thirdParty, "fax", '팩스'), _defineProperty(_HintsType$thirdParty, "assistant", '도우미'), _defineProperty(_HintsType$thirdParty, "callback", '콜백'), _defineProperty(_HintsType$thirdParty, "MobileNumber", '휴대폰 번호'), _defineProperty(_HintsType$thirdParty, "ContactNumber", '연락처 번호'), _defineProperty(_HintsType$thirdParty, "DirectNumber", '직통 번호'), _defineProperty(_HintsType$thirdParty, "doNotCall", '발신 금지'), _HintsType$thirdParty); // @key: @#@"[HintsType.thirdPartyNoRecordsContent]"@#@ @source: @#@"Enter at least {minimumLength} characters or digits to search all {sourceName} records."@#@
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
//# sourceMappingURL=ko-KR.js.map
