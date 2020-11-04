import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';
import webphoneMessages from 'ringcentral-integration/modules/Webphone/webphoneMessages';
export default {
  [webphoneErrors.connectFailed]: "Lamentamos mas, de momento, as funcionalidades de telefone não estão disponíveis. Tente novamente mais tarde. ",
  [webphoneErrors.connected]: "Telefone da web registado.",
  [webphoneErrors.browserNotSupported]: "Lamentamos, mas não é possível efetuar chamadas através deste browser.",
  [webphoneErrors.webphoneCountOverLimit]: "É possível registar um máximo de cinco telefones da web.",
  [webphoneErrors.checkDLError]: "Não é possível efetuar uma chamada. Se este erro persistir, contacte {brandName} para obter ajuda.",
  [webphoneErrors.noOutboundCallWithoutDL]: "De momento, a sua extensão não tem permissão para efetuar chamadas através do browser. Contacte o representante da conta para obter uma atualização.",
  [webphoneErrors.provisionUpdate]: "Lamentamos, mas ocorreu um erro do nosso lado. Tentaremos restabelecer automaticamente a ligação em breve.",
  [webphoneErrors.serverConnecting]: "Lamentamos, mas estamos com problemas em ligar ao servidor de telefones.",
  [webphoneErrors.toVoiceMailError]: "Não é possível enviar chamada para o correio de voz devido a um erro interno",
  [webphoneErrors.muteError]: "De momento, não é possível desativar o som da chamada.",
  [webphoneErrors.holdError]: "De momento, não é possível colocar a chamada em espera.",
  [webphoneErrors.flipError]: "Não é possível transferir a chamada. Tente novamente mais tarde.",
  [webphoneErrors.recordError]: "De momento, não é possível gravar a chamada. Código de erro: {errorCode}",
  [webphoneErrors.recordDisabled]: "Lamentamos, mas a sua conta não dispõe da funcionalidade de gravação de chamada. Contacte o administrador da conta.",
  [webphoneErrors.transferError]: "Não é possível transferir a chamada. Tente novamente mais tarde.",
  [webphoneMessages.parked]: "A sua chamada está no ponto de espera no local: {parkedNumber}",
  failWithStatusCode: "Lamentamos, mas ocorreu um erro: {errorCode}. Se o problema persistir, comunique este erro ao suporte do {brandName}.",
  registeringWithStatusCode: "Lamentamos, mas ocorreu um erro. Estamos a tentar restabelecer a ligação. Se o problema persistir, comunique este erro ao suporte do {brandName}. Código de erro: {errorCode}.",
  failWithoutStatusCode: "Lamentamos, mas ocorreu um erro. Se o erro persistir, comunique este erro ao suporte do {brandName}.",
  registeringWithoutStatusCode: "Lamentamos, mas ocorreu um erro. Estamos a tentar restabelecer a ligação. Se o problema persistir, comunique este erro ao suporte do {brandName}."
};

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
// @key: @#@"[webphoneErrors.recordDisabled]"@#@ @source: @#@"Sorry, your account does not have the feature to record a call. Please contact your account administrator."@#@
// @key: @#@"[webphoneErrors.transferError]"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@
// @key: @#@"[webphoneMessages.parked]"@#@ @source: @#@"Your call is parked at location: {parkedNumber}"@#@
// @key: @#@"failWithStatusCode"@#@ @source: @#@"Sorry, we've encountered an error: {errorCode}. If the problem persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support. Error code: {errorCode}."@#@
// @key: @#@"failWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong on our end. If the error persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support."@#@
