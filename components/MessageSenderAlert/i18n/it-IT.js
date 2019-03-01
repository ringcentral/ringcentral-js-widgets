"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _messageSenderMessages = _interopRequireDefault(require("ringcentral-integration/modules/MessageSender/messageSenderMessages"));

var _messageSenderMessage;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_messageSenderMessage = {}, _defineProperty(_messageSenderMessage, _messageSenderMessages.default.sendSuccess, "Invio completato."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.sendError, "Errore durante l'invio del messaggio."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.numberValidateError, "Errore di convalida numero di telefono."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.textEmpty, "Immetti il testo da inviare."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.noPermission, "Non disponi dell'autorizzazione per inviare il messaggio."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.senderEmpty, "Devi selezionare uno dei numeri di telefono per inviare il messaggio"), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.noToNumber, "Immetti un numero di telefono valido."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.recipientsEmpty, "Immetti un numero di destinazione valido."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.textTooLong, "Testo troppo lungo, limite di 1000"), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.multipartTextTooLong, "Testo troppo lungo, limite di 5000"), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.recipientNumberInvalids, "Immetti un numero di telefono valido."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.noAreaCode, "Imposta {areaCodeLink} per utilizzare i numeri di telefono locali a 7 cifre."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.specialNumber, "L'invio di SMS a numeri di servizi di emergenza o servizi speciali non è supportato."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.connectFailed, "Connessione non riuscita. Riprova più tardi."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.internalError, "Impossibile connettersi a causa di errori interni. Riprova più tardi."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.notAnExtension, "Il numero interno non esiste."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.networkError, "Impossibile connettersi a causa di problemi di rete. Riprova più tardi."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.senderNumberInvalid, "È richiesto un numero di telefono valido per inviare messaggi di testo a destinatari esterni all'azienda. Contatta l'amministratore per aggiungere un numero diretto al tuo account."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.notSmsToExtension, "Impossibile inviare a un numero interno con il numero di telefono principale. Per inviare a un numero interno, immetti il numero interno."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.internationalSMSNotSupported, "L'invio di SMS a un numero di telefono internazionale non è supportato."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.noInternalSMSPermission, "Non disponi delle autorizzazioni per inviare messaggi. Contatta l'amministratore dell'account {brand} per effettuare un upgrade."), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.noSMSPermission, "Non sei autorizzato a inviare messaggi a destinatari esterni all'organizzazione."), _defineProperty(_messageSenderMessage, "areaCode", "prefisso"), _defineProperty(_messageSenderMessage, _messageSenderMessages.default.sending, "Invio messaggio in corso… l'operazione potrebbe richiedere un paio di minuti."), _messageSenderMessage); // @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
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


exports.default = _default;
//# sourceMappingURL=it-IT.js.map
