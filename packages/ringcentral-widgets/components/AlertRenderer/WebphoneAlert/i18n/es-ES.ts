import webphoneErrors from '@ringcentral-integration/commons/modules/Webphone/webphoneErrors';
import webphoneMessages from '@ringcentral-integration/commons/modules/Webphone/webphoneMessages';
export default {
  [webphoneErrors.connectFailed]: "Las funciones del teléfono no están disponibles actualmente. Inténtelo de nuevo más tarde. ",
  [webphoneErrors.connected]: "Teléfono web registrado.",
  [webphoneErrors.browserNotSupported]: "No es posible realizar llamadas a través de este navegador.",
  [webphoneErrors.webphoneCountOverLimit]: "Se han podido registrar 5 teléfonos web en total.",
  [webphoneErrors.checkDLError]: "No es posible realizar una llamada saliente. Si el error persiste, póngase en contacto con {brandName} para obtener asistencia.",
  [webphoneErrors.noOutboundCallWithoutDL]: "En este momento, su extensión no puede realizar llamadas salientes con el navegador. Póngase en contacto con su representante de cuentas para acceder a una actualización.",
  [webphoneErrors.provisionUpdate]: "Se ha producido un error en nuestro sistema. Intentaremos restablecer la conexión automáticamente.",
  [webphoneErrors.serverConnecting]: "Tenemos un problema con la conexión al servidor del teléfono.",
  [webphoneErrors.toVoiceMailError]: "No se puede enviar la llamada al buzón de voz debido a un error interno",
  [webphoneErrors.muteError]: "No se puede silenciar la llamada en este momento.",
  [webphoneErrors.holdError]: "No se puede poner la llamada en espera en este momento.",
  [webphoneErrors.flipError]: "No se puede traspasar la llamada. Inténtelo de nuevo más tarde.",
  [webphoneErrors.recordError]: "No puede grabar la llamada en este momento. Código de error: {errorCode}.",
  [webphoneErrors.pauseRecordError]: "Lo sentimos, no pudimos dejar de grabar la llamada. Inténtelo de nuevo más tarde.",
  [webphoneErrors.recordDisabled]: "Su cuenta no incluye la función para grabar llamadas. Póngase en contacto con el administrador de su cuenta.",
  [webphoneErrors.transferError]: "No se puede transferir la llamada. Inténtelo de nuevo más tarde.",
  [webphoneMessages.parked]: "Su llamada se ha puesto en espera en la ubicación siguiente: {parkedNumber}",
  failWithStatusCode: "Hemos encontrado un error: {errorCode}. Si el problema persiste, póngase en contacto con el soporte técnico de {brandName}.",
  registeringWithStatusCode: "Se ha producido un error. Estamos intentando restablecer la conexión. Si el problema persiste, póngase en contacto con el soporte técnico de {brandName}. Código de error: {errorCode}.",
  failWithoutStatusCode: "Se ha producido un error en nuestro sistema. Si el error persiste, póngase en contacto con el soporte técnico de {brandName}.",
  registeringWithoutStatusCode: "Se ha producido un error. Estamos intentando restablecer la conexión. Si el problema persiste, póngase en contacto con el soporte técnico de {brandName}."
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
// @key: @#@"[webphoneErrors.pauseRecordError]"@#@ @source: @#@"Sorry, we weren't able to stop recording the call. Try again later."@#@
// @key: @#@"[webphoneErrors.recordDisabled]"@#@ @source: @#@"Sorry, your account does not have the feature to record a call. Please contact your account administrator."@#@
// @key: @#@"[webphoneErrors.transferError]"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@
// @key: @#@"[webphoneMessages.parked]"@#@ @source: @#@"Your call is parked at location: {parkedNumber}"@#@
// @key: @#@"failWithStatusCode"@#@ @source: @#@"Sorry, we've encountered an error: {errorCode}. If the problem persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support. Error code: {errorCode}."@#@
// @key: @#@"failWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong on our end. If the error persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support."@#@
