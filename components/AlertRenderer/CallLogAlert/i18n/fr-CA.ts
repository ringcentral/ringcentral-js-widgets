/* eslint-disable */
import callLogMessages from '@ringcentral-integration/commons/enums/callLogMessages';
export default {
  [callLogMessages.logCallLogFailed]:
    'Impossible de charger le formulaire du journal des appels en raison d’une erreur inattendue. Veuillez actualiser la page et réessayer.',
  // New version of log failed message
  [callLogMessages.logFailed]:
    'Désolés, nous n’avons pas réussi à enregistrer votre appel. Veuillez réessayer plus tard.',
  [callLogMessages.fieldRequired]: 'Tous les champs obligatoires sont requis.',
} as const;

// @key: @#@"[callLogMessages.logCallLogFailed]"@#@ @source: @#@"Failed to load call log form due to unexpected error. Please refresh the page and try again."@#@
// @key: @#@"[callLogMessages.logFailed]"@#@ @source: @#@"Sorry, we've failed to log your call. Please try again later."@#@
// @key: @#@"[callLogMessages.fieldRequired]"@#@ @source: @#@"Mandatory fields are required."@#@
