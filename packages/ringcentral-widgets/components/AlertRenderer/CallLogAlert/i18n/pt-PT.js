import callLogMessages from '@ringcentral-integration/commons/enums/callLogMessages';
export default {
  [callLogMessages.logCallLogFailed]: "Falha ao carregar o formulário de registo de chamadas devido a um erro inesperado. Atualize a página e tente novamente.",
  // New version of log failed message
  [callLogMessages.logFailed]: "Lamentamos, mas não foi possível registar a chamada. Tente novamente mais tarde.",
  [callLogMessages.fieldRequired]: "Os campos obrigatórios têm de ser preenchidos."
};

// @key: @#@"[callLogMessages.logCallLogFailed]"@#@ @source: @#@"Failed to load call log form due to unexpected error. Please refresh the page and try again."@#@
// @key: @#@"[callLogMessages.logFailed]"@#@ @source: @#@"Sorry, we've failed to log your call. Please try again later."@#@
// @key: @#@"[callLogMessages.fieldRequired]"@#@ @source: @#@"Mandatory fields are required."@#@
