"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _messageSenderMessages = _interopRequireDefault(require("@ringcentral-integration/commons/modules/MessageSender/messageSenderMessages"));

var _messageSenderMessages2 = _interopRequireDefault(require("@ringcentral-integration/commons/modules/MessageSenderV2/messageSenderMessages"));

var _messageSenderMessage;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_messageSenderMessage = {}, _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sendSuccess, "Onnistui!"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sendError, "Jotakin meni vikaan lähetettäessä viestiä."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].numberValidateError, "Puhelinnumeron vahvistusvirhe."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].textEmpty, "Anna lähetettävän viestin teksti."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noPermission, "Sinulla ei ole lupaa lähettää viestiä."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].senderEmpty, "Sinun on valittava numero puhelinnumeroistasi lähettämistä varten"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noToNumber, "Anna kelvollinen puhelinnumero."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].recipientsEmpty, "Anna kelvollinen vastaanottajan puhelinnumero."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].textTooLong, "Teksti on liian pitkä, rajoitus 1 000 merkkiä"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].multipartTextTooLong, "Teksti on liian pitkä, rajoitus 5 000 merkkiä"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].recipientNumberInvalids, "Anna kelvollinen puhelinnumero."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noAreaCode, "Määritä {areaCodeLink} käyttämään 7-numeroisia paikallispuhelinnumeroita."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].specialNumber, "Tekstiviestien lähettämistä hätä-/erikoispalvelunumeroihin ei tueta."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].connectFailed, "Yhteys epäonnistui. Yritä myöhemmin uudelleen."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].internalError, "Ei voida yhdistää sisäisten virheiden takia. Yritä myöhemmin uudelleen."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].notAnExtension, "Alanumeroa ei ole olemassa."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].networkError, "Ei voida yhdistää verkko-ongelmien takia. Yritä myöhemmin uudelleen."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].senderNumberInvalid, "Tarvitset kelvollisen puhelinnumeron, jotta voit lähettää tekstiviestejä yrityksen ulkopuolisille vastaanottajille. Lisää suora numero tiliisi ottamalla yhteyttä järjestelmänvalvojaasi."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].notSmsToExtension, "Ei voida lähettää alanumeroon pääpuhelinnumerolla. Jos haluat lähettää alanumeroon, anna vain alanumero."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].internationalSMSNotSupported, "Tekstiviestien lähettämistä kansainväliseen numeroon ei tueta."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noInternalSMSPermission, "Sinulla ei ole lupaa lähettää viestejä. Pyydä päivitystä palvelun {brand} tilin järjestelmänvalvojalta."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noSMSPermission, "Sinulla ei ole lupaa lähettää viestejä organisaatiosi ulkopuolisille vastaanottajille."), _defineProperty(_messageSenderMessage, _messageSenderMessages2["default"].attachmentCountLimitation, "Enintään 10 liitettä."), _defineProperty(_messageSenderMessage, _messageSenderMessages2["default"].attachmentSizeLimitation, "Liitteen koko voi olla enintään 1,5 Mt."), _defineProperty(_messageSenderMessage, _messageSenderMessages2["default"].noAttachmentToExtension, "Multimediaviestin lähettämistä alanumeroon ei tueta."), _defineProperty(_messageSenderMessage, "areaCode", "suuntanumero"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sending, "Viestiä lähetetään... Lähetys voi kestää muutaman minuutin."), _messageSenderMessage); // @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
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
// @key: @#@"[messageSenderMessages.notSmsToExtension]"@#@ @source: @#@"Cannot send To a extension number with main phone number. If you want to sent to a extension Number, please just enter extension Number."@#@
// @key: @#@"[messageSenderMessages.internationalSMSNotSupported]"@#@ @source: @#@"Sending SMS to international phone number is not supported."@#@
// @key: @#@"[messageSenderMessages.noInternalSMSPermission]"@#@ @source: @#@"You don't have permission to send messages. Please contact your {brand} account administrator for upgrade."@#@
// @key: @#@"[messageSenderMessages.noSMSPermission]"@#@ @source: @#@"You don't have permission to send messages to recipients outside of your organization."@#@
// @key: @#@"[messageSenderMessagesV2.attachmentCountLimitation]"@#@ @source: @#@"Maximum 10 attachments."@#@
// @key: @#@"[messageSenderMessagesV2.attachmentSizeLimitation]"@#@ @source: @#@"Attachments size is limited to 1.5M bytes."@#@
// @key: @#@"[messageSenderMessagesV2.noAttachmentToExtension]"@#@ @source: @#@"It isn't supported to send MMS to an extension."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"[messageSenderMessages.sending]"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@


exports["default"] = _default;
//# sourceMappingURL=fi-FI.js.map
