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
var _default = exports["default"] = (_messageSenderMessage = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sendSuccess, 'Erfolgreich gesendet.'), _MessageSender.messageSenderMessages.sendError, 'Beim Senden der Nachricht ist ein Fehler aufgetreten.'), _MessageSender.messageSenderMessages.numberValidateError, 'Fehler beim Validieren der Telefonnummer.'), _MessageSender.messageSenderMessages.textEmpty, 'Geben Sie die Textnachricht ein, den Sie senden möchten.'), _MessageSender.messageSenderMessages.noPermission, 'Sie verfügen nicht über die Berechtigung zum Versenden der Nachricht.'), _MessageSender.messageSenderMessages.senderEmpty, 'Zum Senden müssen Sie eine Nummer aus Ihren Telefonnummern auswählen'), _MessageSender.messageSenderMessages.noToNumber, 'Geben Sie eine gültige Telefonnummer ein.'), _MessageSender.messageSenderMessages.recipientsEmpty, 'Geben Sie eine gültige Empfängernummer ein.'), _MessageSender.messageSenderMessages.textTooLong, 'Textnachricht ist zu lang, auf 1.000 beschränkt'), _MessageSender.messageSenderMessages.multipartTextTooLong, 'Textnachricht ist zu lang, auf 5.000 beschränkt'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.recipientNumberInvalids, 'Geben Sie eine gültige Telefonnummer ein.'), _MessageSender.messageSenderMessages.noAreaCode, 'Legen Sie {areaCodeLink} fest, um lokale Telefonnummer mit 7 Ziffern verwenden zu können.'), _MessageSender.messageSenderMessages.specialNumber, 'Textnachrichten an Notrufnummern/bestimmte Servicenummern werden nicht unterstützt.'), _MessageSender.messageSenderMessages.connectFailed, 'Verbindungsaufbau fehlgeschlagen. Versuchen Sie es später noch einmal.'), _MessageSender.messageSenderMessages.internalError, 'Herstellen der Verbindung aufgrund interner Fehler nicht möglich. Versuchen Sie es später noch einmal.'), _MessageSender.messageSenderMessages.notAnExtension, 'Die Nebenstellennummer ist nicht vorhanden.'), _MessageSender.messageSenderMessages.networkError, 'Verbindung aufgrund von Netzwerkproblemen fehlgeschlagen. Versuchen Sie es später noch einmal.'), _MessageSender.messageSenderMessages.senderNumberInvalid, 'Um eine Textnachricht an einen Empfänger außerhalb Ihres Unternehmens zu senden, ist eine gültige Telefonnummer nötig. Wenden Sie sich an Ihren Administrator, um eine Durchwahlnummer zu Ihrem Konto hinzuzufügen.'), _MessageSender.messageSenderMessages.notSmsToExtension, 'Mit der Haupttelefonnummer kann keine Textnachricht an eine Nebenstellennummer gesendet werden. Wenn Sie an eine Nebenstellennummer senden möchten, geben Sie einfach die Nebenstellennummer ein.'), _MessageSender.messageSenderMessages.internationalSMSNotSupported, 'SMS können nicht an internationale Telefonnummern gesendet werden.'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noInternalSMSPermission, 'Sie verfügen nicht über die Berechtigung zum Versenden von Nachrichten. Wenden Sie sich an den Administrator des {brand}-Kontos, um ein Upgrade durchzuführen.'), _MessageSender.messageSenderMessages.noSMSPermission, 'Sie verfügen nicht über die Berechtigung zum Versenden von Nachrichten an Empfänger außerhalb des Unternehmens.'), _MessageSender.messageSenderMessages.attachmentCountLimitation, 'Pro Nachricht sind maximal 10 Anhänge zulässig'), _MessageSender.messageSenderMessages.attachmentSizeLimitation, 'Die Gesamtgröße der Anhänge darf 1,5 MB pro Nachricht nicht überschreiten.'), _MessageSender.messageSenderMessages.noAttachmentToExtension, 'Versenden von MMS an Nebenstellen wird nicht unterstützt.'), "areaCode", 'Vorwahl'), _MessageSender.messageSenderMessages.sending, 'Nachricht wird versendet … Dies kann einige Minuten dauern.'), _MessageSender.messageSenderMessages.shortNumbersNotAvailable, 'Das Senden von SMS an Kurznummern ist nicht verfügbar.')); // @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
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
//# sourceMappingURL=de-DE.js.map
