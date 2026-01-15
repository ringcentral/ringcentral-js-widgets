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
var _Call = require("@ringcentral-integration/commons/modules/Call");
var _callErrors$emergency;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = exports["default"] = (_callErrors$emergency = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_callErrors$emergency, _Call.callErrors.emergencyNumber, 'Hätänumeroon soittaminen ei ole käytettävissä. Soita hätäkeskukseen toisella puhelimella'), _Call.callErrors.noToNumber, 'Anna kelvollinen puhelinnumero.'), _Call.callErrors.noAreaCode, 'Määritä {areaCodeLink} käyttämään 7-numeroisia paikallispuhelinnumeroita.'), _Call.callErrors.connectFailed, 'Yhteys epäonnistui. Yritä myöhemmin uudelleen.'), _Call.callErrors.internalError, 'Ei voida yhdistää sisäisten virheiden takia. Yritä myöhemmin uudelleen.'), _Call.callErrors.notAnExtension, 'Alanumeroa ei ole olemassa.'), _Call.callErrors.networkError, 'Ei voida yhdistää verkko-ongelmien takia. Yritä myöhemmin uudelleen.'), _Call.callErrors.noInternational, 'Sinulla ei ole lupaa soittaa kansainvälisiä puheluita. Pyydä päivitystä palvelun {brand} tilin järjestelmänvalvojalta.'), _Call.callErrors.noRingoutEnable, 'Alanumerostasi voi soittaa puheluita työpöytäsovelluksen kautta.\n    Jos haluat vaihtaa toiseen puheluvaihtoehtoon,\n     pyydä päivitystä tilisi järjestelmänvalvojalta.'), _Call.callErrors.numberParseError, 'Järjestelmässämme ilmeni ongelma. Yritä myöhemmin uudelleen.'), _defineProperty(_defineProperty(_defineProperty(_callErrors$emergency, "areaCode", 'suuntanumero'), "telus911", 'Hätäpuheluita ei tueta.'), _Call.callErrors.fromAndToNumberIsSame, 'RingOut-numero ja kohdenumero eivät voi olla sama numero. Päivitä numero ja yritä uudelleen.')); // @key: @#@"[callErrors.emergencyNumber]"@#@ @source: @#@"Emergency calling is not available. Please use another phone to contact emergency services"@#@
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
//# sourceMappingURL=fi-FI.js.map
