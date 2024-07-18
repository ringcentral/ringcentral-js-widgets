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
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_messageSenderMessage = {}, _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sendSuccess, "Invio completato."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sendError, "Errore durante l'invio del messaggio."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.numberValidateError, "Errore di convalida numero di telefono."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.textEmpty, "Immetti il testo da inviare."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noPermission, "Non disponi dell'autorizzazione per inviare il messaggio."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.senderEmpty, "Devi selezionare uno dei numeri di telefono per inviare il messaggio"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noToNumber, "Inserisci un numero di telefono valido."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.recipientsEmpty, "Inserisci un numero di destinazione valido."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.textTooLong, "Testo troppo lungo, limite di 1000"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.multipartTextTooLong, "Testo troppo lungo, limite di 5000"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.recipientNumberInvalids, "Inserisci un numero di telefono valido."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noAreaCode, "Imposta {areaCodeLink} per l'utilizzo dei numeri di telefono locali a 7 cifre."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.specialNumber, "L'invio di SMS a numeri di servizi di emergenza o servizi speciali non è supportato."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.connectFailed, "Connessione non riuscita. Riprova più tardi."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.internalError, "Impossibile connettersi a causa di errori interni. Riprova più tardi."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.notAnExtension, "Il numero interno non esiste."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.networkError, "Impossibile connettersi a causa di problemi di rete. Riprova più tardi."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.senderNumberInvalid, "È richiesto un numero di telefono valido per inviare messaggi di testo a destinatari esterni all'azienda. Contatta l'amministratore per aggiungere un numero diretto al tuo account."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.notSmsToExtension, "Impossibile inviare a un numero interno con numero di telefono principale. Se desideri inviare a un numero interno, immetti il numero."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.internationalSMSNotSupported, "L'invio di SMS a un numero di telefono internazionale non è supportato."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noInternalSMSPermission, "Non disponi dell'autorizzazione per inviare messaggi. Contatta l'amministratore del tuo account {brand} per eseguire l'upgrade."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noSMSPermission, "Non hai l'autorizzazione per inviare messaggi a destinatari esterni all'organizzazione."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.attachmentCountLimitation, "Massimo 10 allegati."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.attachmentSizeLimitation, "La dimensione massima degli allegati è 1,5 MB."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.noAttachmentToExtension, "Non è supportato l'invio di MMS a un interno."), _defineProperty(_messageSenderMessage, "areaCode", "prefisso"), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.sending, "Invio messaggio in corso… l'operazione potrebbe richiedere un paio di minuti."), _defineProperty(_messageSenderMessage, _MessageSender.messageSenderMessages.shortNumbersNotAvailable, "L'invio di SMS a numeri brevi non è disponibile."), _messageSenderMessage); // @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
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
//# sourceMappingURL=it-IT.js.map
