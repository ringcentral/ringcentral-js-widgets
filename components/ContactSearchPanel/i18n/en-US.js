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
var _default = (_HintsType$thirdParty = {}, _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.thirdPartyNoRecordsContent, 'Enter at least {minimumLength} characters or digits to search all {sourceName} records.'), _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsTitle, 'No results found'), _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsContent, 'Check results from other sources or change your keyword.'), _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.searching, 'Searching...'), _defineProperty(_HintsType$thirdParty, "companyTabTitle", 'Company'), _defineProperty(_HintsType$thirdParty, "personalTabTitle", 'Personal'), _defineProperty(_HintsType$thirdParty, "direct", 'Direct'), _defineProperty(_HintsType$thirdParty, "extension", 'Ext'), _defineProperty(_HintsType$thirdParty, "contact", 'Contact'), _defineProperty(_HintsType$thirdParty, "mobile", 'Mobile'), _defineProperty(_HintsType$thirdParty, "company", 'Company'), _defineProperty(_HintsType$thirdParty, "home", 'Home'), _defineProperty(_HintsType$thirdParty, "home2", 'Home'), _defineProperty(_HintsType$thirdParty, "other", 'Other'), _defineProperty(_HintsType$thirdParty, "business", 'Business'), _defineProperty(_HintsType$thirdParty, "business2", 'Business'), _defineProperty(_HintsType$thirdParty, "car", 'Car'), _defineProperty(_HintsType$thirdParty, "fax", 'Fax'), _defineProperty(_HintsType$thirdParty, "assistant", 'Assistant'), _defineProperty(_HintsType$thirdParty, "callback", 'Callback'), _defineProperty(_HintsType$thirdParty, "MobileNumber", 'Mobile Number'), _defineProperty(_HintsType$thirdParty, "ContactNumber", 'Contact Number'), _defineProperty(_HintsType$thirdParty, "DirectNumber", 'Direct Number'), _defineProperty(_HintsType$thirdParty, "doNotCall", 'Do Not Call'), _HintsType$thirdParty);
exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
