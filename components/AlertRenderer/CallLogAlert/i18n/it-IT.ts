/* eslint-disable */
import callLogMessages from '@ringcentral-integration/commons/enums/callLogMessages';
export default {
  [callLogMessages.logCallLogFailed]:
    'Impossibile caricare il registro chiamate a causa di un errore imprevisto. Aggiorna la pagina e riprova.',
  // New version of log failed message
  [callLogMessages.logFailed]:
    'Impossibile registrare la chiamata. Riprova più tardi.',
  [callLogMessages.fieldRequired]: 'I campi sono obbligatori.',
} as const;

// @key: @#@"[callLogMessages.logCallLogFailed]"@#@ @source: @#@"Failed to load call log form due to unexpected error. Please refresh the page and try again."@#@
// @key: @#@"[callLogMessages.logFailed]"@#@ @source: @#@"Sorry, we've failed to log your call. Please try again later."@#@
// @key: @#@"[callLogMessages.fieldRequired]"@#@ @source: @#@"Mandatory fields are required."@#@
