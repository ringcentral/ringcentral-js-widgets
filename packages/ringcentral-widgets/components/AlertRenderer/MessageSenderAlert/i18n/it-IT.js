import messageSenderMessages from '@ringcentral-integration/commons/modules/MessageSender/messageSenderMessages';
import messageSenderMessagesV2 from '@ringcentral-integration/commons/modules/MessageSenderV2/messageSenderMessages';
export default {
  [messageSenderMessages.sendSuccess]: "Invio completato.",
  [messageSenderMessages.sendError]: "Errore durante l'invio del messaggio.",
  [messageSenderMessages.numberValidateError]: "Errore di convalida numero di telefono.",
  [messageSenderMessages.textEmpty]: "Immetti il testo da inviare.",
  [messageSenderMessages.noPermission]: "Non disponi dell'autorizzazione per inviare il messaggio.",
  [messageSenderMessages.senderEmpty]: "Devi selezionare uno dei numeri di telefono per inviare il messaggio",
  [messageSenderMessages.noToNumber]: "Immetti un numero di telefono valido.",
  [messageSenderMessages.recipientsEmpty]: "Immetti un numero di destinazione valido.",
  [messageSenderMessages.textTooLong]: "Testo troppo lungo, limite di 1000",
  [messageSenderMessages.multipartTextTooLong]: "Testo troppo lungo, limite di 5000",
  [messageSenderMessages.recipientNumberInvalids]: "Immetti un numero di telefono valido.",
  [messageSenderMessages.noAreaCode]: "Imposta {areaCodeLink} per utilizzare i numeri di telefono locali a 7 cifre.",
  [messageSenderMessages.specialNumber]: "L'invio di SMS a numeri di servizi di emergenza o servizi speciali non è supportato.",
  [messageSenderMessages.connectFailed]: "Connessione non riuscita. Riprova più tardi.",
  [messageSenderMessages.internalError]: "Impossibile connettersi a causa di errori interni. Riprova più tardi.",
  [messageSenderMessages.notAnExtension]: "Il numero interno non esiste.",
  [messageSenderMessages.networkError]: "Impossibile connettersi a causa di problemi di rete. Riprova più tardi.",
  [messageSenderMessages.senderNumberInvalid]: "È richiesto un numero di telefono valido per inviare messaggi di testo a destinatari esterni all'azienda. Contatta l'amministratore per aggiungere un numero diretto al tuo account.",
  [messageSenderMessages.notSmsToExtension]: "Impossibile inviare a un numero interno con il numero di telefono principale. Per inviare a un numero interno, immetti il numero interno.",
  [messageSenderMessages.internationalSMSNotSupported]: "L'invio di SMS a un numero di telefono internazionale non è supportato.",
  [messageSenderMessages.noInternalSMSPermission]: "Non disponi delle autorizzazioni per inviare messaggi. Contatta l'amministratore dell'account {brand} per effettuare un upgrade.",
  [messageSenderMessages.noSMSPermission]: "Non sei autorizzato a inviare messaggi a destinatari esterni all'organizzazione.",
  [messageSenderMessagesV2.attachmentCountLimitation]: "Massimo 10 allegati.",
  [messageSenderMessagesV2.attachmentSizeLimitation]: "La dimensione massima degli allegati è 1,5 MB.",
  [messageSenderMessagesV2.noAttachmentToExtension]: "Non è supportato l'invio di MMS a un interno.",
  areaCode: "prefisso",
  [messageSenderMessages.sending]: "Invio messaggio in corso… l'operazione potrebbe richiedere un paio di minuti."
};

// @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
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
