import authMessages from '@ringcentral-integration/commons/modules/Auth/authMessages';
export default {
  [authMessages.internalError]: "O início de sessão falhou devido a erros internos. Tente novamente mais tarde.",
  [authMessages.accessDenied]: "Acesso negado. Contacte o suporte.",
  [authMessages.sessionExpired]: "Sessão expirada. Inicie sessão."
};

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
