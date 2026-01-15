/* eslint-disable */
import webphoneErrors from '@ringcentral-integration/commons/modules/Webphone/webphoneErrors';
import webphoneMessages from '@ringcentral-integration/commons/modules/Webphone/webphoneMessages';
export default {
  [webphoneErrors.connectFailed]:
    'No momento, os recursos do telefone estão indisponíveis. Tente novamente mais tarde. ',
  [webphoneErrors.connected]: 'Telefone da Web registrado.',
  [webphoneErrors.browserNotSupported]:
    'Não há suporte para chamadas usando este navegador.',
  [webphoneErrors.webphoneCountOverLimit]:
    'É possível registrar no máximo cinco telefones Web.',
  [webphoneErrors.checkDLError]:
    'Não é possível fazer uma chamada. Entre em contato com o {brandName} para obter suporte se esse erro continuar aparecendo.',
  [webphoneErrors.noOutboundCallWithoutDL]:
    'No momento, o ramal não pode fazer chamadas de saída com o navegador. Entre em contato com o representante da conta para fazer uma atualização.',
  [webphoneErrors.provisionUpdate]:
    'Algo deu errado do nosso lado. Tentaremos reconectar automaticamente em breve.',
  [webphoneErrors.serverConnecting]:
    'Há um problema de conexão com o servidor de telefone.',
  [webphoneErrors.toVoiceMailError]:
    'Não é possível enviar chamadas para caixa postal devido a um erro interno',
  [webphoneErrors.muteError]:
    'Não é possível deixar a chamada sem som no momento.',
  [webphoneErrors.holdError]:
    'Não é possível colocar a chamada em espera no momento.',
  [webphoneErrors.flipError]:
    'Não é possível transferir dinamicamente a chamada. Tente novamente mais tarde.',
  [webphoneErrors.recordError]:
    'Não é possível gravar a chamada no momento. Código de erro: {errorCode}.',
  [webphoneErrors.pauseRecordError]:
    'Não foi possível parar a gravação da chamada. Tente novamente mais tarde.',
  [webphoneErrors.recordDisabled]:
    'Sua conta não tem o recurso de gravação de chamadas. Entre em contato com o administrador da conta.',
  [webphoneErrors.transferError]:
    'Não é possível transferir a chamada. Tente novamente mais tarde.',
  [webphoneMessages.parked]:
    'Sua chamada está estacionada no local: {parkedNumber}',
  failWithStatusCode:
    'Ocorreu um erro: {errorCode}. Se o problema continuar, reporte esse erro ao suporte da {brandName}.',
  registeringWithStatusCode:
    'Ocorreu um problema. Estamos tentando reconectar. Se o problema continuar, reporte-o ao suporte da {brandName}. Código de erro: {errorCode}.',
  failWithoutStatusCode:
    'Algo deu errado do nosso lado. Se o erro continuar, reporte-o ao suporte do {brandName}.',
  registeringWithoutStatusCode:
    'Ocorreu um problema. Estamos tentando reconectar. Se o problema continuar, reporte-o ao suporte da {brandName}.',
} as const;

// @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Sorry, phone features are currently unavailable. Please retry later. "@#@
// @key: @#@"[webphoneErrors.connected]"@#@ @source: @#@"Web phone registered."@#@
// @key: @#@"[webphoneErrors.browserNotSupported]"@#@ @source: @#@"Sorry, making calls using this browser is not supported."@#@
// @key: @#@"[webphoneErrors.webphoneCountOverLimit]"@#@ @source: @#@"A maximum of 5 web phones could be registered."@#@
// @key: @#@"[webphoneErrors.checkDLError]"@#@ @source: @#@"Unable to make outgoing call. Contact {brandName} for support if this error keeps showing."@#@
// @key: @#@"[webphoneErrors.noOutboundCallWithoutDL]"@#@ @source: @#@"Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade."@#@
// @key: @#@"[webphoneErrors.provisionUpdate]"@#@ @source: @#@"Sorry, something went wrong on our end. We will automatically try to reconnect shortly."@#@
// @key: @#@"[webphoneErrors.serverConnecting]"@#@ @source: @#@"Sorry, we are having an issue connecting to the phone server."@#@
// @key: @#@"[webphoneErrors.toVoiceMailError]"@#@ @source: @#@"Cannot send call to voicemail due to internal error"@#@
// @key: @#@"[webphoneErrors.muteError]"@#@ @source: @#@"Call cannot be muted at the moment."@#@
// @key: @#@"[webphoneErrors.holdError]"@#@ @source: @#@"Call cannot be hold at the moment."@#@
// @key: @#@"[webphoneErrors.flipError]"@#@ @source: @#@"Cannot flip the call. Please try again later."@#@
// @key: @#@"[webphoneErrors.recordError]"@#@ @source: @#@"You cannot record the call at the moment. Error code: {errorCode}"@#@
// @key: @#@"[webphoneErrors.pauseRecordError]"@#@ @source: @#@"Sorry, we weren't able to stop recording the call. Try again later."@#@
// @key: @#@"[webphoneErrors.recordDisabled]"@#@ @source: @#@"Sorry, your account does not have the feature to record a call. Please contact your account administrator."@#@
// @key: @#@"[webphoneErrors.transferError]"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@
// @key: @#@"[webphoneMessages.parked]"@#@ @source: @#@"Your call is parked at location: {parkedNumber}"@#@
// @key: @#@"failWithStatusCode"@#@ @source: @#@"Sorry, we've encountered an error: {errorCode}. If the problem persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support. Error code: {errorCode}."@#@
// @key: @#@"failWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong on our end. If the error persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support."@#@
