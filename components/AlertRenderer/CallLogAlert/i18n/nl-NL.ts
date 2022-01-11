import callLogMessages from '@ringcentral-integration/commons/enums/callLogMessages';
export default {
  [callLogMessages.logCallLogFailed]: "Kan oproeplijst niet laden vanwege een onverwachte fout. Vernieuw de pagina en probeer het opnieuw.",
  // New version of log failed message
  [callLogMessages.logFailed]: "We kunnen uw oproep niet loggen. Probeer het later opnieuw.",
  [callLogMessages.fieldRequired]: "Verplichte velden moeten ingevuld worden."
};

// @key: @#@"[callLogMessages.logCallLogFailed]"@#@ @source: @#@"Failed to load call log form due to unexpected error. Please refresh the page and try again."@#@
// @key: @#@"[callLogMessages.logFailed]"@#@ @source: @#@"Sorry, we've failed to log your call. Please try again later."@#@
// @key: @#@"[callLogMessages.fieldRequired]"@#@ @source: @#@"Mandatory fields are required."@#@
