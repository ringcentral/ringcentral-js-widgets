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
var _webphoneErrors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/webphoneErrors"));
var _webphoneMessages = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/webphoneMessages"));
var _webphoneErrors$conne;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = (_webphoneErrors$conne = {}, _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connectFailed, 'Puhelimen ominaisuudet eivät ole tällä hetkellä käytettävissä. Yritä myöhemmin uudelleen. '), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connected, 'Verkkopuhelin rekisteröity.'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].browserNotSupported, 'Puhelujen soittamista tällä selaimella ei tueta.'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].webphoneCountOverLimit, 'Voin rekisteröidä enintään 5 verkkopuhelinta.'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].checkDLError, 'Puhelun soittaminen epäonnistui. Ota yhteyttä tukeen ({brandName}), jos näet tämän virheilmoituksen uudelleen.'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].noOutboundCallWithoutDL, 'Alanumerostasi ei voi tällä hetkellä soittaa puheluita selaimella. Pyydä päivitystä tilisi järjestelmänvalvojalta.'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].provisionUpdate, 'Jokin meni vikaan palvelimellamme. Yritämme muodostaa yhteyden automaattisesti hetken kuluttua.'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].serverConnecting, 'Puhelinpalvelinyhteydessä on ongelmia.'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].toVoiceMailError, 'Puhelun lähettäminen vastaajaan epäonnistui sisäisen virheen vuoksi'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].muteError, 'Puhelua ei voi mykistää tällä hetkellä.'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].holdError, 'Puhelua ei voi asettaa pitoon tällä hetkellä.'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].flipError, 'Puhelua ei voi kääntää. Yritä myöhemmin uudelleen.'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordError, 'Puhelua ei voi tallentaa tällä hetkellä. Virhekoodi: {errorCode}'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].pauseRecordError, 'Puhelun tallentamisen lopettaminen epäonnistui. Yritä myöhemmin uudelleen.'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordDisabled, 'Puheluiden tallennus ei ole käytössä tililläsi. Ota yhteyttä tilisi järjestelmänvalvojaan.'), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].transferError, 'Soitonsiirto epäonnistui. Yritä myöhemmin uudelleen.'), _defineProperty(_webphoneErrors$conne, _webphoneMessages["default"].parked, 'Puhelusi on siirretty säilytykseen tänne: {parkedNumber}'), _defineProperty(_webphoneErrors$conne, "failWithStatusCode", 'Tapahtui virhe: {errorCode}. Jos ongelma ei ratkea, ilmoita virheestä palvelun {brandName} tukeen.'), _defineProperty(_webphoneErrors$conne, "registeringWithStatusCode", 'Jokin meni vikaan. Yritetään yhdistää uudelleen. Jos ongelma ei ratkea, ilmoita virheestä palvelun {brandName} tukeen. Virhekoodi: {errorCode}.'), _defineProperty(_webphoneErrors$conne, "failWithoutStatusCode", 'Jokin meni vikaan palvelimellamme. Jos virhe ei korjaannu, ilmoita virheestä palvelun {brandName} tukeen.'), _defineProperty(_webphoneErrors$conne, "registeringWithoutStatusCode", 'Jokin meni vikaan. Yritetään yhdistää uudelleen. Jos ongelma ei ratkea, ilmoita virheestä palvelun {brandName} tukeen.'), _webphoneErrors$conne); // @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Sorry, phone features are currently unavailable. Please retry later. "@#@
// @key: @#@"[webphoneErrors.connected]"@#@ @source: @#@"Web phone registered."@#@
// @key: @#@"[webphoneErrors.browserNotSupported]"@#@ @source: @#@"Sorry, making calls using this browser is not supported."@#@
// @key: @#@"[webphoneErrors.webphoneCountOverLimit]"@#@ @source: @#@"A maximum of 5 web phones could be registered."@#@
// @key: @#@"[webphoneErrors.checkDLError]"@#@ @source: @#@"Unable to make outgoing call. Contact {brandName} for support if this error keeps showing."@#@
// @key: @#@"[webphoneErrors.noOutboundCallWithoutDL]"@#@ @source: @#@"Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade."@#@
// @key: @#@"[webphoneErrors.provisionUpdate]"@#@ @source: @#@"Sorry, something went wrong on our end. We will automatically try to reconnect shortly."@#@
// @key: @#@"[webphoneErrors.serverConnecting]"@#@ @source: @#@"Sorry, we are having an issue connecting to the phone server."@#@
// @key: @#@"[webphoneErrors.toVoiceMailError]"@#@ @source: @#@"Cannot send call to voicemail due to internal error"@#@
// @key: @#@"[webphoneErrors.muteError]"@#@ @source: @#@"Call cannot be muted at the moment."@#@
// @key: @#@"[webphoneErrors.holdError]"@#@ @source: @#@"Call cannot be hold at the moment."@#@
// @key: @#@"[webphoneErrors.flipError]"@#@ @source: @#@"Cannot flip the call. Please try again later."@#@
// @key: @#@"[webphoneErrors.recordError]"@#@ @source: @#@"You cannot record the call at the moment. Error code: {errorCode}"@#@
// @key: @#@"[webphoneErrors.pauseRecordError]"@#@ @source: @#@"Sorry, we weren't able to stop recording the call. Try again later."@#@
// @key: @#@"[webphoneErrors.recordDisabled]"@#@ @source: @#@"Sorry, your account does not have the feature to record a call. Please contact your account administrator."@#@
// @key: @#@"[webphoneErrors.transferError]"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@
// @key: @#@"[webphoneMessages.parked]"@#@ @source: @#@"Your call is parked at location: {parkedNumber}"@#@
// @key: @#@"failWithStatusCode"@#@ @source: @#@"Sorry, we've encountered an error: {errorCode}. If the problem persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support. Error code: {errorCode}."@#@
// @key: @#@"failWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong on our end. If the error persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support."@#@
exports["default"] = _default;
//# sourceMappingURL=fi-FI.js.map
