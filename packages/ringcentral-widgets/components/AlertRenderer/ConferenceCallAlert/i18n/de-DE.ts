import { conferenceCallErrors } from '@ringcentral-integration/commons/modules/ConferenceCall';
export default {
  [conferenceCallErrors.bringInFailed]: "Das Zusammenführen von Anrufen ist wegen unerwarteter Fehler fehlgeschlagen. Versuchen Sie es später noch einmal.",
  [conferenceCallErrors.makeConferenceFailed]: "Das Zusammenführen von Anrufen ist wegen unerwarteter Fehler fehlgeschlagen. Versuchen Sie es später noch einmal.",
  [conferenceCallErrors.terminateConferenceFailed]: "Das Beenden der Konferenz ist aufgrund unerwarteter Fehler fehlgeschlagen. Versuchen Sie es später noch einmal.",
  [conferenceCallErrors.removeFromConferenceFailed]: "Das Entfernen des Teilnehmers ist aufgrund unerwarteter Fehler fehlgeschlagen. Versuchen Sie es später noch einmal.",
  [conferenceCallErrors.callIsRecording]: "Anrufaufzeichnung in Verarbeitung. Bitte stoppen Sie die Aufzeichnung und versuchen Sie es erneut."
};

// @key: @#@"[conferenceCallErrors.bringInFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.makeConferenceFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.terminateConferenceFailed]"@#@ @source: @#@"Failed to hangup the conference due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.removeFromConferenceFailed]"@#@ @source: @#@"Failed to remove the participant due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.callIsRecording]"@#@ @source: @#@"Call recording in progress. Please stop recording and try again."@#@
