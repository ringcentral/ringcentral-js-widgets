import callLogMessages from 'ringcentral-integration/enums/callLogMessages';
export default {
  [callLogMessages.logCallLogFailed]: "Impossible de charger le formulaire du journal des appels en raison d'une erreur inattendue. Veuillez actualiser la page et réessayer.",
  // New version of log failed message
  [callLogMessages.logFailed]: "Désolés, nous n'avons pas pu enregistrer votre appel."
};

// @key: @#@"[callLogMessages.logCallLogFailed]"@#@ @source: @#@"Failed to load call log form due to unexpected error. Please refresh the page and try again."@#@
// @key: @#@"[callLogMessages.logFailed]"@#@ @source: @#@"Sorry, we've failed to log your call. Please try again later."@#@
