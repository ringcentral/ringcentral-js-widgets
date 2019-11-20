import callLogMessages from 'ringcentral-integration/enums/callLogMessages';
export default {
  [callLogMessages.logCallLogFailed]: "Falha ao carregar o log de chamadas devido a um erro inesperado. Atualize a página e tente novamente.",
  // New version of log failed message
  [callLogMessages.logFailed]: "Não foi possível registrar sua chamada."
};

// @key: @#@"[callLogMessages.logCallLogFailed]"@#@ @source: @#@"Failed to load call log form due to unexpected error. Please refresh the page and try again."@#@
// @key: @#@"[callLogMessages.logFailed]"@#@ @source: @#@"Sorry, we've failed to log your call. Please try again later."@#@
