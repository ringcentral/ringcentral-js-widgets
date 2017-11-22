import authMessages from 'ringcentral-integration/modules/Auth/authMessages';

export default {
  [authMessages.internalError]: 'Falha de login devido a erros internos. Tente novamente mais tarde.',
  [authMessages.accessDenied]: 'Acesso negado. Entre em contato com o Suporte.',
  [authMessages.sessionExpired]: 'Sessão expirada. Conecte-se.',
};
