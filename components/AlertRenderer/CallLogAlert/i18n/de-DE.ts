/* eslint-disable */
import callLogMessages from '@ringcentral-integration/commons/enums/callLogMessages';
export default {
  [callLogMessages.logCallLogFailed]:
    'Fehler beim Laden des Anrufprotokollformulars aufgrund eines unerwarteten Fehlers. Bitte aktualisieren Sie die Seite und versuchen Sie es erneut.',
  // New version of log failed message
  [callLogMessages.logFailed]:
    'Entschuldigung, Ihr Anruf konnte nicht protokolliert werden. Versuchen Sie es später noch einmal.',
  [callLogMessages.fieldRequired]: 'Pflichtfelder sind erforderlich.',
} as const;

// @key: @#@"[callLogMessages.logCallLogFailed]"@#@ @source: @#@"Failed to load call log form due to unexpected error. Please refresh the page and try again."@#@
// @key: @#@"[callLogMessages.logFailed]"@#@ @source: @#@"Sorry, we've failed to log your call. Please try again later."@#@
// @key: @#@"[callLogMessages.fieldRequired]"@#@ @source: @#@"Mandatory fields are required."@#@
