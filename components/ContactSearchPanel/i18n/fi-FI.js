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
var _default = (_HintsType$thirdParty = {}, _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.thirdPartyNoRecordsContent, "Anna vähintään {minimumLength} merkkiä tai numeroa kaikkien lähteen {sourceName} tietueiden hakemiseksi."), _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsTitle, "Tuloksia ei löytynyt"), _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsContent, "Tarkista tulokset toisista lähteistä tai vaihda avainsanaasi."), _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.searching, "Haetaan…"), _defineProperty(_HintsType$thirdParty, "companyTabTitle", "Yritys"), _defineProperty(_HintsType$thirdParty, "personalTabTitle", "Henkilökohtainen"), _defineProperty(_HintsType$thirdParty, "direct", "Suora"), _defineProperty(_HintsType$thirdParty, "extension", "Alanro"), _defineProperty(_HintsType$thirdParty, "contact", "Yhteystieto"), _defineProperty(_HintsType$thirdParty, "mobile", "Mobiili"), _defineProperty(_HintsType$thirdParty, "company", "Yritys"), _defineProperty(_HintsType$thirdParty, "home", "Etusivu"), _defineProperty(_HintsType$thirdParty, "home2", "Etusivu"), _defineProperty(_HintsType$thirdParty, "other", "Muu"), _defineProperty(_HintsType$thirdParty, "business", "Työ"), _defineProperty(_HintsType$thirdParty, "business2", "Työ"), _defineProperty(_HintsType$thirdParty, "car", "Auto"), _defineProperty(_HintsType$thirdParty, "fax", "Faksi"), _defineProperty(_HintsType$thirdParty, "assistant", "Avustaja"), _defineProperty(_HintsType$thirdParty, "callback", "Takaisinsoitto"), _defineProperty(_HintsType$thirdParty, "MobileNumber", "Matkapuhelinnumero"), _defineProperty(_HintsType$thirdParty, "ContactNumber", "Yhteysnumero"), _defineProperty(_HintsType$thirdParty, "DirectNumber", "Suora numero"), _defineProperty(_HintsType$thirdParty, "doNotCall", "Älä soita"), _HintsType$thirdParty); // @key: @#@"[HintsType.thirdPartyNoRecordsContent]"@#@ @source: @#@"Enter at least {minimumLength} characters or digits to search all {sourceName} records."@#@
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
//# sourceMappingURL=fi-FI.js.map
