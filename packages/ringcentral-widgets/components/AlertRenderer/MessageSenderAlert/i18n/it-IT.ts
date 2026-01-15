/* eslint-disable */
import { messageSenderMessages } from '@ringcentral-integration/commons/modules/MessageSender';

export default {
  [messageSenderMessages.sendSuccess]: 'Invio completato.',
  [messageSenderMessages.sendError]: "Errore durante l'invio del messaggio.",
  [messageSenderMessages.numberValidateError]:
    'Errore di convalida numero di telefono.',
  [messageSenderMessages.textEmpty]: 'Immetti il testo da inviare.',
  [messageSenderMessages.noPermission]:
    "Non disponi dell'autorizzazione per inviare il messaggio.",
  [messageSenderMessages.senderEmpty]:
    'Devi selezionare uno dei numeri di telefono per inviare il messaggio',
  [messageSenderMessages.noToNumber]: 'Inserisci un numero di telefono valido.',
  [messageSenderMessages.recipientsEmpty]:
    'Inserisci un numero di destinazione valido.',
  [messageSenderMessages.textTooLong]: 'Testo troppo lungo, limite di 1000',
  [messageSenderMessages.multipartTextTooLong]:
    'Testo troppo lungo, limite di 5000',
  [messageSenderMessages.recipientNumberInvalids]:
    'Inserisci un numero di telefono valido.',
  [messageSenderMessages.noAreaCode]:
    "Imposta {areaCodeLink} per l'utilizzo dei numeri di telefono locali a 7 cifre.",
  [messageSenderMessages.specialNumber]:
    "L'invio di SMS a numeri di servizi di emergenza o servizi speciali non è supportato.",
  [messageSenderMessages.connectFailed]:
    'Connessione non riuscita. Riprova più tardi.',
  [messageSenderMessages.internalError]:
    'Impossibile connettersi a causa di errori interni. Riprova più tardi.',
  [messageSenderMessages.notAnExtension]: 'Il numero interno non esiste.',
  [messageSenderMessages.networkError]:
    'Impossibile connettersi a causa di problemi di rete. Riprova più tardi.',
  [messageSenderMessages.senderNumberInvalid]:
    "È richiesto un numero di telefono valido per inviare SMS a destinatari esterni all'azienda. Contatta l'amministratore per aggiungere un numero diretto al tuo account.",
  [messageSenderMessages.notSmsToExtension]:
    'Impossibile inviare a un numero interno con numero di telefono principale. Se desideri inviare a un numero interno, immetti il numero.',
  [messageSenderMessages.internationalSMSNotSupported]:
    "L'invio di SMS a un numero di telefono internazionale non è supportato.",
  [messageSenderMessages.noInternalSMSPermission]:
    "Non disponi dell'autorizzazione per inviare messaggi. Contatta l'amministratore del tuo account {brand} per eseguire l'upgrade.",
  [messageSenderMessages.noSMSPermission]:
    "Non hai l'autorizzazione per inviare messaggi a destinatari esterni all'organizzazione.",
  [messageSenderMessages.attachmentCountLimitation]:
    'Non possono essere presenti più di 10 allegati per messaggio',
  [messageSenderMessages.attachmentSizeLimitation]:
    'Le dimensioni complessive degli allegati non possono essere superiori a 1,5 MB per messaggio.',
  [messageSenderMessages.noAttachmentToExtension]:
    "Non è supportato l'invio di MMS a un interno.",
  areaCode: 'prefisso',
  [messageSenderMessages.sending]:
    "Invio messaggio in corso… L'operazione potrebbe richiedere un paio di minuti.",
  [messageSenderMessages.shortNumbersNotAvailable]:
    "L'invio di SMS a numeri brevi non è disponibile.",
} as const;

// @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
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
