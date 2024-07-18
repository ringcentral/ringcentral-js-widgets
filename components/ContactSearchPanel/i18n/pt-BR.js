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
var _default = (_HintsType$thirdParty = {}, _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.thirdPartyNoRecordsContent, "Insira ao menos {minimumLength} caracteres ou dígitos para pesquisar todos os registros de {sourceName}."), _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsTitle, "Nenhum resultado encontrado"), _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.noFilterOrSearchRecordsContent, "Verifique os resultados em outras fontes ou altere a palavra-chave."), _defineProperty(_HintsType$thirdParty, _ContactSearchPanelEnum.HintsType.searching, "Pesquisando..."), _defineProperty(_HintsType$thirdParty, "companyTabTitle", "Empresa"), _defineProperty(_HintsType$thirdParty, "personalTabTitle", "Pessoal"), _defineProperty(_HintsType$thirdParty, "direct", "Direto"), _defineProperty(_HintsType$thirdParty, "extension", "Ramal"), _defineProperty(_HintsType$thirdParty, "contact", "Contato"), _defineProperty(_HintsType$thirdParty, "mobile", "Dispositivo móvel"), _defineProperty(_HintsType$thirdParty, "company", "Empresa"), _defineProperty(_HintsType$thirdParty, "home", "Casa"), _defineProperty(_HintsType$thirdParty, "home2", "Casa"), _defineProperty(_HintsType$thirdParty, "other", "Outro"), _defineProperty(_HintsType$thirdParty, "business", "Comercial"), _defineProperty(_HintsType$thirdParty, "business2", "Comercial"), _defineProperty(_HintsType$thirdParty, "car", "Carro"), _defineProperty(_HintsType$thirdParty, "fax", "Fax"), _defineProperty(_HintsType$thirdParty, "assistant", "Assistente"), _defineProperty(_HintsType$thirdParty, "callback", "Retorno de chamada"), _defineProperty(_HintsType$thirdParty, "MobileNumber", "Número do dispositivo móvel"), _defineProperty(_HintsType$thirdParty, "ContactNumber", "Número de contato"), _defineProperty(_HintsType$thirdParty, "DirectNumber", "Número direto"), _defineProperty(_HintsType$thirdParty, "doNotCall", "Não ligar"), _HintsType$thirdParty); // @key: @#@"[HintsType.thirdPartyNoRecordsContent]"@#@ @source: @#@"Enter at least {minimumLength} characters or digits to search all {sourceName} records."@#@
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
//# sourceMappingURL=pt-BR.js.map
