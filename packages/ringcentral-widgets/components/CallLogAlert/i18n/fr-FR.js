import callLogMessages from 'ringcentral-integration/enums/callLogMessages';
export default {
  [callLogMessages.logCallLogFailed]: "Échec du chargement du formulaire du journal des appels en raison d'une erreur inattendue. Veuillez actualiser la page et réessayer.",
  // New version of log failed message
  [callLogMessages.logFailed]: "L’enregistrement de votre appel a échoué. Veuillez réessayer plus tard.",
  [callLogMessages.fieldRequired]: "Remplissez les champs obligatoires."
};

// @key: @#@"[callLogMessages.logCallLogFailed]"@#@ @source: @#@"Failed to load call log form due to unexpected error. Please refresh the page and try again."@#@
// @key: @#@"[callLogMessages.logFailed]"@#@ @source: @#@"Sorry, we've failed to log your call. Please try again later."@#@
// @key: @#@"[callLogMessages.fieldRequired]"@#@ @source: @#@"Mandatory fields are required."@#@
