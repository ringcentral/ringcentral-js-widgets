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
  webphoneUnavailable: '{error}. Estamos nos reconectando ao servidor. Se o erro continuar, reporte esse erro ao Suporte de {brandName}.',
  errorCode: 'Código de erro interno: {errorCode}',
  occurs: 'Há um erro interno',
};

// @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Connect with web phone server failed."@#@
// @key: @#@"[webphoneErrors.connected]"@#@ @source: @#@"Web phone registered."@#@
// @key: @#@"[webphoneErrors.browserNotSupported]"@#@ @source: @#@"Calling with browser is only supported on Chrome."@#@
// @key: @#@"[webphoneErrors.webphoneCountOverLimit]"@#@ @source: @#@"A maximum of 5 web phones could be registered."@#@
// @key: @#@"[webphoneErrors.notOutboundCallWithoutDL]"@#@ @source: @#@"Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade."@#@
// @key: @#@"[webphoneErrors.getSipProvisionError]"@#@ @source: @#@"You have no permission to send message."@#@
// @key: @#@"[webphoneErrors.toVoiceMailError]"@#@ @source: @#@"Cannot send call to voicemail due to internal error"@#@
// @key: @#@"[webphoneErrors.muteError]"@#@ @source: @#@"Call cannot be muted at the moment."@#@
// @key: @#@"[webphoneErrors.holdError]"@#@ @source: @#@"Call cannot be hold at the moment."@#@
// @key: @#@"[webphoneErrors.flipError]"@#@ @source: @#@"Cannot flip the call. Please try again later."@#@
// @key: @#@"[webphoneErrors.recordError]"@#@ @source: @#@"You cannot record the call at the moment. Error code: {errorCode}"@#@
// @key: @#@"[webphoneErrors.recordDisabled]"@#@ @source: @#@"Sorry, your account does not have the feature to record a call. Please contact your account administrator."@#@
// @key: @#@"[webphoneErrors.transferError]"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@
// @key: @#@"webphoneUnavailable"@#@ @source: @#@"{error}. We are reconnecting to server. If the error persists, please report this error to {brandName} Support."@#@
// @key: @#@"errorCode"@#@ @source: @#@"Internal error code: {errorCode}"@#@
// @key: @#@"occurs"@#@ @source: @#@"Internal error occurs"@#@
