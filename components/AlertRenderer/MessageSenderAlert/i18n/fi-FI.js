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
var _MessageSender = require("@ringcentral-integration/commons/modules/MessageSender");
var _messageSenderMessage;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_messageSenderMessage = {}, _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sendSuccess, "Onnistui!"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sendError, "Jokin meni vikaan lähetettäessä viestiä."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.numberValidateError, "Puhelinnumeron vahvistusvirhe."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.textEmpty, "Anna lähetettävän viestin teksti."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noPermission, "Sinulla ei ole lupaa lähettää viestiä."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.senderEmpty, "Sinun on valittava numero puhelinnumeroistasi lähettämistä varten"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noToNumber, "Anna kelvollinen puhelinnumero."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.recipientsEmpty, "Anna kelvollinen vastaanottajan puhelinnumero."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.textTooLong, "Teksti on liian pitkä, rajoitus 1 000 merkkiä"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.multipartTextTooLong, "Teksti on liian pitkä, rajoitus 5 000 merkkiä"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.recipientNumberInvalids, "Anna kelvollinen puhelinnumero."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noAreaCode, "Määritä {areaCodeLink} käyttämään 7-numeroisia paikallispuhelinnumeroita."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.specialNumber, "Tekstiviestien lähettämistä hätä-/erikoispalvelunumeroihin ei tueta."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.connectFailed, "Yhteys epäonnistui. Yritä myöhemmin uudelleen."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.internalError, "Ei voida yhdistää sisäisten virheiden takia. Yritä myöhemmin uudelleen."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.notAnExtension, "Alanumeroa ei ole olemassa."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.networkError, "Ei voida yhdistää verkko-ongelmien takia. Yritä myöhemmin uudelleen."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.senderNumberInvalid, "Tarvitset kelvollisen puhelinnumeron, jotta voit lähettää tekstiviestejä yrityksen ulkopuolisille vastaanottajille. Lisää suora numero tiliisi ottamalla yhteyttä järjestelmänvalvojaasi."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.notSmsToExtension, "Ei voida lähettää alanumeroon pääpuhelinnumerolla. Jos haluat lähettää alanumeroon, anna vain alanumero."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.internationalSMSNotSupported, "Tekstiviestien lähettämistä kansainväliseen numeroon ei tueta."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noInternalSMSPermission, "Sinulla ei ole lupaa lähettää viestejä. Pyydä päivitystä palvelun {brand} tilin järjestelmänvalvojalta."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noSMSPermission, "Sinulla ei ole lupaa lähettää viestejä organisaatiosi ulkopuolisille vastaanottajille."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.attachmentCountLimitation, "Enintään 10 liitettä."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.attachmentSizeLimitation, "Liitteen koko voi olla enintään 1,5 Mt."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noAttachmentToExtension, "Multimediaviestin lähettämistä alanumeroon ei tueta."), _defineProperty(_messageSenderMessage, "areaCode", "suuntanumero"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sending, "Viestiä lähetetään... Lähetys voi kestää muutaman minuutin."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.shortNumbersNotAvailable, "SMS-viestien lähetys lyhytnumeroihin ei ole käytettävissä."), _messageSenderMessage); // @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
// @key: @#@"[messageSenderMessages.sendError]"@#@ @source: @#@"Something wrong happened when send message."@#@
// @key: @#@"[messageSenderMessages.numberValidateError]"@#@ @source: @#@"Phone Number Validate Error."@#@
// @key: @#@"[messageSenderMessages.textEmpty]"@#@ @source: @#@"Please enter the text to be sent."@#@
// @key: @#@"[messageSenderMessages.noPermission]"@#@ @source: @#@"You have no permission to send message."@#@
// @key: @#@"[messageSenderMessages.senderEmpty]"@#@ @source: @#@"You must select a number from your phone numbers to send"@#@
// @key: @#@"[messageSenderMessages.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[messageSenderMessages.recipientsEmpty]"@#@ @source: @#@"Please enter a valid receiver number."@#@
// @key: @#@"[messageSenderMessages.textTooLong]"@#@ @source: @#@"Text is too long, 1000 Limited"@#@
// @key: @#@"[messageSenderMessages.multipartTextTooLong]"@#@ @source: @#@"Text is too long, 5000 Limited"@#@
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
// @key: @#@"[messageSenderMessages.attachmentCountLimitation]"@#@ @source: @#@"Maximum 10 attachments."@#@
// @key: @#@"[messageSenderMessages.attachmentSizeLimitation]"@#@ @source: @#@"Attachments size is limited to 1.5M bytes."@#@
// @key: @#@"[messageSenderMessages.noAttachmentToExtension]"@#@ @source: @#@"It isn't supported to send MMS to an extension."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"[messageSenderMessages.sending]"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@
// @key: @#@"[messageSenderMessages.shortNumbersNotAvailable]"@#@ @source: @#@"Sending SMS to short numbers is not available."@#@
exports["default"] = _default;
//# sourceMappingURL=fi-FI.js.map
