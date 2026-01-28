"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _ContactSearchPanelEnum = require("../ContactSearchPanelEnum");
var _HintsType$thirdParty;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = exports["default"] = (_HintsType$thirdParty = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.thirdPartyNoRecordsContent, '请输入至少 {minimumLength} 个字符来搜索 {sourceName} 联系人。'), _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsTitle, '找不到结果'), _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsContent, '查看来自其他来源的结果或更改您的关键字。'), _ContactSearchPanelEnum.HintsType.searching, '正在搜索…'), "companyTabTitle", '公司'), "personalTabTitle", '个人'), "direct", '直拨'), "extension", '分机'), "contact", '联系人'), "mobile", '手机'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_HintsType$thirdParty, "company", '公司'), "home", '住宅'), "home2", '住宅'), "other", '其他'), "business", '商务'), "business2", '公司'), "car", '汽车'), "fax", '传真'), "assistant", '助手'), "callback", '回拨'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_HintsType$thirdParty, "MobileNumber", '手机号码'), "ContactNumber", '联系电话'), "DirectNumber", '直拨号码'), "doNotCall", '谢绝来电'), "enterNameOrNumber", '输入姓名或电话号码'), "enterANameOrNumber", '输入姓名或号码'), "to", '被叫方'), "dial", '拨号'), "message", '发送消息'), "transfer", '转接'), _defineProperty(_defineProperty(_HintsType$thirdParty, "delete", '删除'), "invalidPhoneNumber", '电话号码无效。')); // @key: @#@"[HintsType.thirdPartyNoRecordsContent]"@#@ @source: @#@"Enter at least {minimumLength} characters to search {sourceName} contacts."@#@
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
// @key: @#@"enterNameOrNumber"@#@ @source: @#@"Enter names or phone numbers"@#@
// @key: @#@"enterANameOrNumber"@#@ @source: @#@"Enter a name or number"@#@
// @key: @#@"to"@#@ @source: @#@"To"@#@
// @key: @#@"dial"@#@ @source: @#@"Dial"@#@
// @key: @#@"message"@#@ @source: @#@"Message"@#@
// @key: @#@"transfer"@#@ @source: @#@"Transfer"@#@
// @key: @#@"delete"@#@ @source: @#@"Delete"@#@
// @key: @#@"invalidPhoneNumber"@#@ @source: @#@"Invalid phone number."@#@
//# sourceMappingURL=zh-CN.js.map
