import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';
export default {
  [webphoneErrors.connectFailed]: "Lo sentimos, las funciones del teléfono no están disponibles en este momento. Vuelva a intentarlo más tarde. ",
  [webphoneErrors.connected]: "Teléfono web registrado.",
  [webphoneErrors.browserNotSupported]: "Lo sentimos, no es posible realizar llamadas con este navegador.",
  [webphoneErrors.webphoneCountOverLimit]: "Se pueden registrar 5 teléfonos web como máximo.",
  [webphoneErrors.checkDLError]: "No se pudo realizar una llamada saliente. Comuníquese con {brandName} para obtener asistencia si este error continúa apareciendo.",
  [webphoneErrors.noOutboundCallWithoutDL]: "En este momento, su extensión no puede realizar llamadas salientes con navegador, Comuníquese con su representante para acceder a la actualización.",
  [webphoneErrors.provisionUpdate]: "Lo sentimos, cometimos un error. Intentaremos volver a conectar rápidamente.",
  [webphoneErrors.serverConnecting]: "Lo sentimos, tenemos un problema para conectar al servidor telefónico.",
  [webphoneErrors.toVoiceMailError]: "No se puede enviar la llamada al buzón de voz debido a un error interno",
  [webphoneErrors.muteError]: "No se puede silenciar la llamada en este momento.",
  [webphoneErrors.holdError]: "No se puede poner la llamada en espera en este momento.",
  [webphoneErrors.flipError]: "No se puede voltear la llamada. Vuelva a intentarlo más tarde.",
  [webphoneErrors.recordError]: "No puede grabar la llamada en este momento. Código de error: {errorCode}",
  [webphoneErrors.recordDisabled]: "Su cuenta no incluye la función de grabar llamadas. Comuníquese con el administrador de su cuenta.",
  [webphoneErrors.transferError]: "No se puede transferir la llamada. Vuelva a intentarlo más tarde.",
  failWithStatusCode: "Lo sentimos, hemos detectado un error: {errorCode}. Si el problema persiste, comuníquelo al servicio técnico de {brandName}.",
  registeringWithStatusCode: "Lo sentimos, se produjo un error. Estamos intentando volver a conectar. Si el problema persiste, comuníquelo al servicio técnico de {brandName}. Código de error: {errorCode}.",
  failWithoutStatusCode: "Lo sentimos, cometimos un error. Si el error persiste, comuníquelo al servicio técnico de {brandName}.",
  registeringWithoutStatusCode: "Lo sentimos, se produjo un error. Estamos intentando volver a conectar. Si el problema persiste, comuníquelo al servicio técnico de {brandName}."
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
// @key: @#@"failWithStatusCode"@#@ @source: @#@"Sorry, we've encountered an error: {errorCode}. If the problem persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support. Error code: {errorCode}."@#@
// @key: @#@"failWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong on our end. If the error persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support."@#@
