import conferenceCallErrors from '@ringcentral-integration/commons/modules/ConferenceCall/conferenceCallErrors';
export default {
  [conferenceCallErrors.bringInFailed]: "Échec de la fusion des appels en raison d'erreurs inattendues. Veuillez réessayer ultérieurement.",
  [conferenceCallErrors.makeConferenceFailed]: "Échec de la fusion des appels en raison d'erreurs inattendues. Veuillez réessayer ultérieurement.",
  [conferenceCallErrors.terminateConferenceFailed]: "Échec de la clôture de la conférence en raison d'erreurs inattendues. Veuillez réessayer ultérieurement.",
  [conferenceCallErrors.removeFromConferenceFailed]: "Échec de la suppression du participant en raison d'erreurs inattendues. Veuillez réessayer ultérieurement.",
  [conferenceCallErrors.callIsRecording]: "Enregistrement d'appel en cours. Veuillez arrêter l'enregistrement et réessayer."
};

// @key: @#@"[conferenceCallErrors.bringInFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.makeConferenceFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.terminateConferenceFailed]"@#@ @source: @#@"Failed to hangup the conference due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.removeFromConferenceFailed]"@#@ @source: @#@"Failed to remove the participant due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.callIsRecording]"@#@ @source: @#@"Call recording in progress. Please stop recording and try again."@#@
