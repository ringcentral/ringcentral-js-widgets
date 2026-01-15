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
var _MessageSender = require("@ringcentral-integration/commons/modules/MessageSender");
var _messageSenderMessage;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = exports["default"] = (_messageSenderMessage = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sendSuccess, 'Onnistui!'), _MessageSender.messageSenderMessages.sendError, 'Jokin meni vikaan lähetettäessä viestiä.'), _MessageSender.messageSenderMessages.numberValidateError, 'Puhelinnumeron vahvistusvirhe.'), _MessageSender.messageSenderMessages.textEmpty, 'Anna lähetettävän viestin teksti.'), _MessageSender.messageSenderMessages.noPermission, 'Sinulla ei ole lupaa lähettää viestiä.'), _MessageSender.messageSenderMessages.senderEmpty, 'Sinun on valittava numero puhelinnumeroistasi lähettämistä varten'), _MessageSender.messageSenderMessages.noToNumber, 'Anna kelvollinen puhelinnumero.'), _MessageSender.messageSenderMessages.recipientsEmpty, 'Anna kelvollinen vastaanottajan puhelinnumero.'), _MessageSender.messageSenderMessages.textTooLong, 'Teksti on liian pitkä, rajoitus 1 000 merkkiä'), _MessageSender.messageSenderMessages.multipartTextTooLong, 'Teksti on liian pitkä, rajoitus 5 000 merkkiä'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.recipientNumberInvalids, 'Anna kelvollinen puhelinnumero.'), _MessageSender.messageSenderMessages.noAreaCode, 'Määritä {areaCodeLink} käyttämään 7-numeroisia paikallispuhelinnumeroita.'), _MessageSender.messageSenderMessages.specialNumber, 'Tekstiviestien lähettämistä hätä-/erikoispalvelunumeroihin ei tueta.'), _MessageSender.messageSenderMessages.connectFailed, 'Yhteys epäonnistui. Yritä myöhemmin uudelleen.'), _MessageSender.messageSenderMessages.internalError, 'Ei voida yhdistää sisäisten virheiden takia. Yritä myöhemmin uudelleen.'), _MessageSender.messageSenderMessages.notAnExtension, 'Alanumeroa ei ole olemassa.'), _MessageSender.messageSenderMessages.networkError, 'Ei voida yhdistää verkko-ongelmien takia. Yritä myöhemmin uudelleen.'), _MessageSender.messageSenderMessages.senderNumberInvalid, 'Tarvitset kelvollisen puhelinnumeron, jotta voit lähettää tekstiviestejä yrityksen ulkopuolisille vastaanottajille. Lisää suora numero tiliisi ottamalla yhteyttä järjestelmänvalvojaasi.'), _MessageSender.messageSenderMessages.notSmsToExtension, 'Ei voida lähettää alanumeroon pääpuhelinnumerolla. Jos haluat lähettää alanumeroon, anna vain alanumero.'), _MessageSender.messageSenderMessages.internationalSMSNotSupported, 'Tekstiviestien lähettämistä kansainväliseen numeroon ei tueta.'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noInternalSMSPermission, 'Sinulla ei ole lupaa lähettää viestejä. Pyydä päivitystä palvelun {brand} tilin järjestelmänvalvojalta.'), _MessageSender.messageSenderMessages.noSMSPermission, 'Sinulla ei ole lupaa lähettää viestejä organisaatiosi ulkopuolisille vastaanottajille.'), _MessageSender.messageSenderMessages.attachmentCountLimitation, 'Yhdessä viestissä voi olla enintään 10 liitettä'), _MessageSender.messageSenderMessages.attachmentSizeLimitation, 'Liitteiden kokonaiskoko ei saa olla suurempi kuin 1,5 Mt viestiä kohden.'), _MessageSender.messageSenderMessages.noAttachmentToExtension, 'Multimediaviestin lähettämistä alanumeroon ei tueta.'), "areaCode", 'suuntanumero'), _MessageSender.messageSenderMessages.sending, 'Viestiä lähetetään… Lähetys voi kestää muutaman minuutin.'), _MessageSender.messageSenderMessages.shortNumbersNotAvailable, 'SMS-viestien lähetys lyhytnumeroihin ei ole käytettävissä.')); // @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
// @key: @#@"[messageSenderMessages.sendError]"@#@ @source: @#@"Something wrong happened when send message."@#@
// @key: @#@"[messageSenderMessages.numberValidateError]"@#@ @source: @#@"Phone Number Validate Error."@#@
// @key: @#@"[messageSenderMessages.textEmpty]"@#@ @source: @#@"Please enter the text to be sent."@#@
// @key: @#@"[messageSenderMessages.noPermission]"@#@ @source: @#@"You have no permission to send message."@#@
// @key: @#@"[messageSenderMessages.senderEmpty]"@#@ @source: @#@"You must select a number from your phone numbers to send"@#@
// @key: @#@"[messageSenderMessages.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[messageSenderMessages.recipientsEmpty]"@#@ @source: @#@"Please enter a valid receiver number."@#@
// @key: @#@"[messageSenderMessages.textTooLong]"@#@ @source: @#@"You can enter up to 1,000 characters."@#@
// @key: @#@"[messageSenderMessages.multipartTextTooLong]"@#@ @source: @#@"You can enter up to 5,000 characters."@#@
// @key: @#@"[messageSenderMessages.recipientNumberInvalids]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[messageSenderMessages.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[messageSenderMessages.specialNumber]"@#@ @source: @#@"Sending text to emergency/special service numbers is not supported."@#@
// @key: @#@"[messageSenderMessages.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[messageSenderMessages.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[messageSenderMessages.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[messageSenderMessages.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[messageSenderMessages.senderNumberInvalid]"@#@ @source: @#@"A valid Phone Number is required to send text message to recipients outside of your company, Please contact your Administrator to add a direct number to your account."@#@
// @key: @#@"[messageSenderMessages.notSmsToExtension]"@#@ @source: @#@"Cannot send to an extension number with main phone number. If you want to send to an extension number, please just enter extension number."@#@
// @key: @#@"[messageSenderMessages.internationalSMSNotSupported]"@#@ @source: @#@"Sending SMS to international phone number is not supported."@#@
// @key: @#@"[messageSenderMessages.noInternalSMSPermission]"@#@ @source: @#@"You don't have permission to send messages. Please contact your {brand} account administrator for upgrade."@#@
// @key: @#@"[messageSenderMessages.noSMSPermission]"@#@ @source: @#@"You don't have permission to send messages to recipients outside of your organization."@#@
// @key: @#@"[messageSenderMessages.attachmentCountLimitation]"@#@ @source: @#@"Can't be more than 10 attachments per message"@#@
// @key: @#@"[messageSenderMessages.attachmentSizeLimitation]"@#@ @source: @#@"The over all attachment size can't be larger than 1.5 MB per message."@#@
// @key: @#@"[messageSenderMessages.noAttachmentToExtension]"@#@ @source: @#@"It isn't supported to send MMS to an extension."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"[messageSenderMessages.sending]"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@
// @key: @#@"[messageSenderMessages.shortNumbersNotAvailable]"@#@ @source: @#@"Sending SMS to short numbers is not available."@#@
//# sourceMappingURL=fi-FI.js.map
