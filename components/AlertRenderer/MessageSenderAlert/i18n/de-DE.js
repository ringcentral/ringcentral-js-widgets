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

var _default = (_messageSenderMessage = {}, _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sendSuccess, "Erfolgreich gesendet."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sendError, "Fehler beim Senden der Nachricht."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].numberValidateError, "Fehler beim Validieren der Telefonnummer."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].textEmpty, "Geben Sie die Textnachricht ein, den Sie senden möchten."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noPermission, "Sie verfügen nicht über die Berechtigung zum Versenden der Nachricht."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].senderEmpty, "Zum Senden müssen Sie eine Nummer aus Ihren Telefonnummern auswählen"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noToNumber, "Geben Sie eine gültige Telefonnummer ein."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].recipientsEmpty, "Geben Sie eine gültige Empfängernummer ein."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].textTooLong, "Textnachricht ist zu lang, auf 1000 beschränkt"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].multipartTextTooLong, "Textnachricht ist zu lang, auf 5000 beschränkt"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].recipientNumberInvalids, "Geben Sie eine gültige Telefonnummer ein."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noAreaCode, "Legen Sie {areaCodeLink} fest, um lokale Telefonnummer mit 7 Ziffern verwenden zu können."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].specialNumber, "Textnachrichten an Notrufnummern/bestimmte Servicenummern werden nicht unterstützt."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].connectFailed, "Verbindungsaufbau fehlgeschlagen. Versuchen Sie es später erneut."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].internalError, "Herstellen der Verbindung aufgrund interner Fehler nicht möglich. Bitte versuchen Sie es später erneut."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].notAnExtension, "Die Durchwahlnummer ist nicht vorhanden."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].networkError, "Verbindung aufgrund von Netzwerkproblemen fehlgeschlagen. Bitte versuchen Sie es später erneut."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].senderNumberInvalid, "Um eine Textnachricht an einen Empfänger außerhalb Ihres Unternehmens zu senden, ist eine gültige Telefonnummer nötig. Wenden Sie sich an Ihren Administrator, um eine Durchwahlnummer zu Ihrem Konto hinzuzufügen."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].notSmsToExtension, "Mit der Haupttelefonnummer kann keine Textnachricht an eine Durchwahlnummer gesendet werden. Wenn Sie an eine Durchwahlnummer senden möchten, geben Sie einfach die Durchwahlnummer ein."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].internationalSMSNotSupported, "SMS können nicht an internationale Telefonnummern gesendet werden."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noInternalSMSPermission, "Sie verfügen nicht über die Berechtigung zum Versenden von Nachrichten. Wenden Sie sich an den Administrator des {brand}-Kontos, um ein Upgrade durchzuführen."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noSMSPermission, "Sie haben keine Berechtigung, Nachrichten an Empfänger außerhalb Ihrer Organisation zu senden."), _defineProperty(_messageSenderMessage, _messageSenderMessages2["default"].attachmentCountLimitation, "Maximal 10 Anhänge."), _defineProperty(_messageSenderMessage, _messageSenderMessages2["default"].attachmentSizeLimitation, "Anhanggröße ist begrenzt auf 1,5 MBytes."), _defineProperty(_messageSenderMessage, _messageSenderMessages2["default"].noAttachmentToExtension, "Versenden von MMS an Durchwahlen wird nicht unterstützt."), _defineProperty(_messageSenderMessage, "areaCode", "Vorwahl"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sending, "Nachricht wird versendet… Dies kann einige Minuten dauern."), _messageSenderMessage); // @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
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
//# sourceMappingURL=de-DE.js.map
