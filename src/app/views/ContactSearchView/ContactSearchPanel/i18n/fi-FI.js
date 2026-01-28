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
var _default = exports["default"] = (_HintsType$thirdParty = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.thirdPartyNoRecordsContent, 'Kirjoita vähintään {minimumLength} merkkiä, jotta voit hakea lähteen {sourceName} yhteystietoja.'), _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsTitle, 'Tuloksia ei löytynyt'), _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsContent, 'Tarkista tulokset toisista lähteistä tai vaihda avainsanaasi.'), _ContactSearchPanelEnum.HintsType.searching, 'Haetaan…'), "companyTabTitle", 'Yritys'), "personalTabTitle", 'Omat'), "direct", 'Suora'), "extension", 'Alanro'), "contact", 'Yhteystieto'), "mobile", 'Mobiili'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_HintsType$thirdParty, "company", 'Yritys'), "home", 'Etusivu'), "home2", 'Etusivu'), "other", 'Muu'), "business", 'Työ'), "business2", 'Työ'), "car", 'Auto'), "fax", 'Faksi'), "assistant", 'Avustaja'), "callback", 'Takaisinsoitto'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_HintsType$thirdParty, "MobileNumber", 'Matkapuhelinnumero'), "ContactNumber", 'Yhteysnumero'), "DirectNumber", 'Suora numero'), "doNotCall", 'Älä soita'), "enterNameOrNumber", 'Anna nimet tai puhelinnumerot'), "enterANameOrNumber", 'Anna nimi tai numero'), "to", 'Vastaanottaja'), "dial", 'Valitse'), "message", 'Viesti'), "transfer", 'Siirto'), _defineProperty(_defineProperty(_HintsType$thirdParty, "delete", 'Poista'), "invalidPhoneNumber", 'Virheellinen puhelinnumero.')); // @key: @#@"[HintsType.thirdPartyNoRecordsContent]"@#@ @source: @#@"Enter at least {minimumLength} characters to search {sourceName} contacts."@#@
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
//# sourceMappingURL=fi-FI.js.map
