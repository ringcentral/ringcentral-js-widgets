import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';

export default {
  [webphoneErrors.connectFailed]: 'Falha ao conectar ao servidor de telefone da Web.',
  [webphoneErrors.connected]: 'Telefone da Web registrado.',
  [webphoneErrors.browserNotSupported]: 'Há suporte para ligação com o navegador somente no Chrome.',
  [webphoneErrors.webphoneCountOverLimit]: 'É possível registrar no máximo cinco telefones Web.',
  [webphoneErrors.notOutboundCallWithoutDL]: 'No momento, o ramal não pode fazer chamadas de saída com o navegador. Entre em contato com o representante da conta para fazer um upgrade.',
  [webphoneErrors.getSipProvisionError]: 'Você não tem permissão para enviar mensagens.',
  [webphoneErrors.toVoiceMailError]: 'Não é possível enviar chamadas para caixa postal devido a um erro interno',
  [webphoneErrors.muteError]: 'Não é possível deixar a chamada sem som no momento.',
  [webphoneErrors.holdError]: 'Não é possível colocar a chamada em espera no momento.',
  [webphoneErrors.flipError]: 'Não é possível transferir a chamada. Tente novamente mais tarde.',
  [webphoneErrors.recordError]: 'Não é possível gravar a chamada no momento. Código de erro: {errorCode}',
  [webphoneErrors.recordDisabled]: 'Sua conta não tem o recurso de gravação de chamadas. Entre em contato com o administrador da conta.',
  [webphoneErrors.transferError]: 'Não é possível transferir a chamada. Tente novamente mais tarde.',
};
