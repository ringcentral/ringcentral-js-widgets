import callLogMessages from '@ringcentral-integration/commons/enums/callLogMessages';
export default {
  [callLogMessages.logCallLogFailed]: "No se pudo cargar el registro de llamadas a causa de un error inesperado. Actualice la página y vuelva a intentarlo.",
  // New version of log failed message
  [callLogMessages.logFailed]: "No pudimos registrar su llamada. Vuelva a intentarlo más tarde.",
  [callLogMessages.fieldRequired]: "Se deben completar los campos obligatorios."
};

// @key: @#@"[callLogMessages.logCallLogFailed]"@#@ @source: @#@"Failed to load call log form due to unexpected error. Please refresh the page and try again."@#@
// @key: @#@"[callLogMessages.logFailed]"@#@ @source: @#@"Sorry, we've failed to log your call. Please try again later."@#@
// @key: @#@"[callLogMessages.fieldRequired]"@#@ @source: @#@"Mandatory fields are required."@#@
