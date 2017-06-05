import messageSenderMessages from 'ringcentral-integration/modules/MessageSender/messageSenderMessages';

export default {
  [messageSenderMessages.sendSuccess]: 'Invio completato.',
  [messageSenderMessages.sendError]: 'Errore durante l\'invio del messaggio.',
  [messageSenderMessages.numberValidateError]: 'Errore di convalida numero di telefono.',
  [messageSenderMessages.textEmpty]: 'Immetti il testo da inviare.',
  [messageSenderMessages.noPermission]: 'Non disponi dell\'autorizzazione per inviare il messaggio.',
  [messageSenderMessages.senderEmpty]: 'Devi selezionare uno dei numeri di telefono per inviare il messaggio',
  [messageSenderMessages.noToNumber]: 'Numero di telefono non valido.',
  [messageSenderMessages.recipientsEmpty]: 'Immetti un numero di destinazione valido.',
  [messageSenderMessages.textTooLong]: 'Testo troppo lungo, limite di 1000',
  [messageSenderMessages.recipientNumberInvalids]: 'Numero destinatario non valido',
  [messageSenderMessages.noAreaCode]: 'Imposta {areaCodeLink} per utilizzare i numeri di telefono locali a 7 cifre.',
  [messageSenderMessages.specialNumber]: 'Le chiamate di emergenza o a servizi speciali non sono supportate.',
  [messageSenderMessages.connectFailed]: 'Connessione non riuscita. Riprova più tardi.',
  [messageSenderMessages.internalError]: 'Impossibile connettersi a causa di errori interni. Riprova più tardi.',
  [messageSenderMessages.notAnExtension]: 'Il numero interno non esiste.',
  [messageSenderMessages.networkError]: 'Impossibile connettersi a causa di problemi di rete. Riprova più tardi.',
  [messageSenderMessages.senderNumberInvalid]: 'È necessario un numero di telefono valido per inviare il messaggio di testo ai destinatari esterni all\'azienda. Contatta l\'amministratore per aggiungere un numero diretto all\'account.',
  [messageSenderMessages.notSmsToExtension]: 'Impossibile inviare a un numero interno con il numero di telefono principale. Per inviare a un numero interno, immetti il numero interno.',
  [messageSenderMessages.internationalSMSNotSupported]: 'L\'invio di SMS a un numero di telefono internazionale non è supportato.',
  areaCode: 'prefisso',
};
