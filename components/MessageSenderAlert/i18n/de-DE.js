"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _messageSenderMessages = _interopRequireDefault(require("ringcentral-integration/modules/MessageSender/messageSenderMessages"));

var _messageSenderMessage;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_messageSenderMessage = {}, _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sendSuccess, "Erfolgreich gesendet."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sendError, "Fehler beim Senden der Nachricht."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].numberValidateError, "Fehler beim Validieren der Telefonnummer."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].textEmpty, "Geben Sie den zu sendenden Text ein."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noPermission, "Sie verfügen über keine Berechtigung zum Senden von Nachrichten."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].senderEmpty, "Zum Senden Nummer aus Ihren Telefonnummern auswählen"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noToNumber, "Geben Sie eine gültige Telefonnummer ein."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].recipientsEmpty, "Geben Sie eine gültige Empfängernummer ein."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].textTooLong, "Text ist zu lang, maximal 1000 Zeichen"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].multipartTextTooLong, "Text ist zu lang, maximal 5000 Zeichen"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].recipientNumberInvalids, "Geben Sie eine gültige Telefonnummer ein."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noAreaCode, "Legen Sie für die {areaCodeLink} die Verwendung von 7-stelligen lokalen Telefonnummern fest."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].specialNumber, "Textnachrichten an Notrufnummern/bestimmte Servicenummern werden nicht unterstützt."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].connectFailed, "Verbindungsaufbau fehlgeschlagen. Versuchen Sie es später erneut."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].internalError, "Herstellen der Verbindung aufgrund interner Fehler nicht möglich. Versuchen Sie es später erneut."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].notAnExtension, "Die Durchwahlnummer existiert nicht."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].networkError, "Herstellen der Verbindung aufgrund von Netzwerkproblemen nicht möglich. Versuchen Sie es später erneut."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].senderNumberInvalid, "Zum Senden von Textnachrichten an Empfänger außerhalb Ihres Unternehmens ist eine gültige Telefonnummer erforderlich. Wenden Sie sich an Ihren Administrator, um Ihrem Konto eine Durchwahlnummer hinzuzufügen."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].notSmsToExtension, "Senden an eine Durchwahl mit Haupttelefonnummer nicht möglich. Geben Sie zunächst die Durchwahl an, wenn Sie an eine Durchwahl senden möchten."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].internationalSMSNotSupported, "Das Versenden von SMS an internationale Telefonnummern wird nicht unterstützt."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noInternalSMSPermission, "Sie haben keine Berechtigung, Nachrichten an Empfänger außerhalb Ihrer Organisation zu senden. Wenden Sie sich an Ihren {brand}-Kontoadministrator, um ein Upgrade zu erhalten."), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].noSMSPermission, "Sie haben keine Berechtigung, Nachrichten an Empfänger außerhalb Ihrer Organisation zu senden."), _defineProperty(_messageSenderMessage, "areaCode", "Vorwahl"), _defineProperty(_messageSenderMessage, _messageSenderMessages["default"].sending, "Nachricht wird versendet… Dies kann einige Minuten dauern."), _messageSenderMessage); // @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
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
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"[messageSenderMessages.sending]"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@


exports["default"] = _default;
//# sourceMappingURL=de-DE.js.map
