import callErrors from 'ringcentral-integration/modules/Call/callErrors';

export default {
  [callErrors.noToNumber]: 'Immetti un numero di telefono valido.',
  [callErrors.noAreaCode]: 'Imposta {areaCodeLink} per utilizzare i numeri di telefono locali a 7 cifre.',
  [callErrors.specialNumber]: 'Le chiamate di emergenza o a servizi speciali non sono supportate.',
  [callErrors.connectFailed]: 'Connessione non riuscita. Riprova più tardi.',
  [callErrors.internalError]: 'Impossibile connettersi a causa di errori interni. Riprova più tardi.',
  [callErrors.notAnExtension]: 'Il numero interno non esiste.',
  [callErrors.networkError]: 'Impossibile connettersi a causa di problemi di rete. Riprova più tardi.',
  [callErrors.noRingoutEnable]: `Dal tuo interno è possibile effettuare chiamate con l'app per il desktop.
    Per passare ad altre opzioni di chiamata
    contatta l'amministratore dell'account per un aggiornamento.`,
  areaCode: 'prefisso',
};
