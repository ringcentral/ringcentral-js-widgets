import messageSenderMessages from 'ringcentral-integration/modules/MessageSender/messageSenderMessages';

export default {
  [messageSenderMessages.sendSuccess]: 'Invio completato.',
  [messageSenderMessages.sendError]: 'Errore durante l\'invio del messaggio.',
  [messageSenderMessages.numberValidateError]: 'Errore di convalida numero di telefono.',
  [messageSenderMessages.textEmpty]: 'Immetti il testo da inviare.',
  [messageSenderMessages.noPermission]: 'Non disponi dell\'autorizzazione per inviare il messaggio.',
  [messageSenderMessages.senderEmpty]: 'Devi selezionare uno dei numeri di telefono per inviare il messaggio',
  [messageSenderMessages.recipientsEmpty]: 'Immetti un numero di destinazione valido.',
  [messageSenderMessages.textTooLong]: 'Testo troppo lungo, limite di 1000',
  [messageSenderMessages.noAreaCode]: 'Imposta {areaCodeLink} per utilizzare i numeri di telefono locali a 7 cifre.',
  [messageSenderMessages.connectFailed]: 'Connessione non riuscita. Riprova più tardi.',
  [messageSenderMessages.internalError]: 'Impossibile connettersi a causa di errori interni. Riprova più tardi.',
  [messageSenderMessages.notAnExtension]: 'Il numero interno non esiste.',
  [messageSenderMessages.networkError]: 'Impossibile connettersi a causa di problemi di rete. Riprova più tardi.',
  [messageSenderMessages.senderNumberInvalid]: 'Non sei autorizzato a inviare messaggi a destinatari esterni all\'organizzazione. Contatta l\'amministratore dell\'account RingCentral per un aggiornamento.',
  [messageSenderMessages.notSmsToExtension]: 'Impossibile inviare a un numero interno con il numero di telefono principale. Per inviare a un numero interno, immetti il numero interno.',
  [messageSenderMessages.internationalSMSNotSupported]: 'L\'invio di SMS a un numero di telefono internazionale non è supportato.',
  areaCode: 'prefisso',
  [messageSenderMessages.recipientNumberInvalids]: 'Immetti un numero di telefono valido.',
  [messageSenderMessages.noInternalSMSPermission]: 'Non disponi delle autorizzazioni per inviare messaggi. Contatta l\'amministratore dell\'account RingCentral per un aggiornamento.',
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
// @key: @#@"[messageSenderMessages.noSMSPermission]"@#@ @source: @#@"You don't have permission to send messages to recipients outside of your organization. Please contact your {brand} account administrator for upgrade."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
