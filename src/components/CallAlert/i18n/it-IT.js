import callErrors from 'ringcentral-integration/modules/Call/callErrors';

export default {
  [callErrors.noToNumber]: 'Immetti un numero di telefono valido.',
  [callErrors.noAreaCode]: 'Imposta {areaCodeLink} per utilizzare i numeri di telefono locali a 7 cifre.',
  [callErrors.specialNumber]: 'Le chiamate di emergenza o a servizi speciali non sono supportate.',
  [callErrors.connectFailed]: 'Connessione non riuscita. Riprova più tardi.',
  [callErrors.internalError]: 'Impossibile connettersi a causa di errori interni. Riprova più tardi.',
  [callErrors.notAnExtension]: 'Il numero interno non esiste.',
  [callErrors.networkError]: 'Impossibile connettersi a causa di problemi di rete. Riprova più tardi.',
  [callErrors.noInternational]: 'Non disponi delle autorizzazioni per effettuare chiamate internazionali. Contatta l\'amministratore dell\'account {brand} per effettuare un upgrade.',
  [callErrors.noRingoutEnable]: 'Dal tuo interno è possibile effettuare chiamate con l\'app per il desktop.\n    Per passare ad altre opzioni di chiamata\n    contatta l\'amministratore dell\'account per un aggiornamento.',
  areaCode: 'prefisso',
  telus911: 'Chiamate di emergenza non supportate.'
};

// @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.specialNumber]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noInternational]"@#@ @source: @#@"You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@
