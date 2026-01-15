/* eslint-disable */
import { conferenceCallErrors } from '@ringcentral-integration/commons/modules/ConferenceCall';
export default {
  [conferenceCallErrors.bringInFailed]:
    'Impossible de fusionner les appels en raison d’erreurs inattendues. Veuillez réessayer plus tard.',
  [conferenceCallErrors.makeConferenceFailed]:
    'Impossible de fusionner les appels en raison d’erreurs inattendues. Veuillez réessayer plus tard.',
  [conferenceCallErrors.terminateConferenceFailed]:
    'Impossible de raccrocher en raison d’erreurs inattendues. Veuillez réessayer plus tard.',
  [conferenceCallErrors.removeFromConferenceFailed]:
    'Impossible de supprimer le participant en raison d’erreurs inattendues. Veuillez réessayer plus tard.',
  [conferenceCallErrors.callIsRecording]:
    'Enregistrement d’appel en cours. Veuillez arrêter l’enregistrement et réessayer.',
} as const;

// @key: @#@"[conferenceCallErrors.bringInFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.makeConferenceFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.terminateConferenceFailed]"@#@ @source: @#@"Failed to hangup the conference due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.removeFromConferenceFailed]"@#@ @source: @#@"Failed to remove the participant due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.callIsRecording]"@#@ @source: @#@"Call recording in progress. Please stop recording and try again."@#@
