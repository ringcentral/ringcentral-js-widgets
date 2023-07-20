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
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_HintsType$thirdParty = {}, _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.thirdPartyNoRecordsContent, "Voer minstens {minimumLength} tekens of cijfers in om alle {sourceName}-records te doorzoeken."), _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsTitle, "Geen resultaten gevonden"), _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsContent, "Controleer de resultaten van andere bronnen of wijzig uw trefwoord."), _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.searching, "Zoeken..."), _defineProperty(_HintsType$thirdParty, "companyTabTitle", "Bedrijf"), _defineProperty(_HintsType$thirdParty, "personalTabTitle", "Persoonlijk"), _defineProperty(_HintsType$thirdParty, "direct", "Direct"), _defineProperty(_HintsType$thirdParty, "extension", "Ext."), _defineProperty(_HintsType$thirdParty, "contact", "Contactpersoon"), _defineProperty(_HintsType$thirdParty, "mobile", "Mobiel"), _defineProperty(_HintsType$thirdParty, "company", "Bedrijf"), _defineProperty(_HintsType$thirdParty, "home", "Thuis"), _defineProperty(_HintsType$thirdParty, "home2", "Thuis"), _defineProperty(_HintsType$thirdParty, "other", "Overig"), _defineProperty(_HintsType$thirdParty, "business", "Zakelijk"), _defineProperty(_HintsType$thirdParty, "business2", "Zakelijk"), _defineProperty(_HintsType$thirdParty, "car", "Auto"), _defineProperty(_HintsType$thirdParty, "fax", "Fax"), _defineProperty(_HintsType$thirdParty, "assistant", "Assistant"), _defineProperty(_HintsType$thirdParty, "callback", "Call-back"), _defineProperty(_HintsType$thirdParty, "MobileNumber", "Mobiel nummer"), _defineProperty(_HintsType$thirdParty, "ContactNumber", "Nummer contactpersoon"), _defineProperty(_HintsType$thirdParty, "DirectNumber", "Direct nummer"), _defineProperty(_HintsType$thirdParty, "doNotCall", "Niet bellen"), _HintsType$thirdParty); // @key: @#@"[HintsType.thirdPartyNoRecordsContent]"@#@ @source: @#@"Enter at least {minimumLength} characters or digits to search all {sourceName} records."@#@
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
//# sourceMappingURL=nl-NL.js.map
