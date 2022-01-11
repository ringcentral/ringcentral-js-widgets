import webphoneErrors from '@ringcentral-integration/commons/modules/Webphone/webphoneErrors';
import webphoneMessages from '@ringcentral-integration/commons/modules/Webphone/webphoneMessages';
export default {
  [webphoneErrors.connectFailed]: "Le funzioni telefoniche non sono attualmente disponibili. Riprova più tardi. ",
  [webphoneErrors.connected]: "Telefono web registrato.",
  [webphoneErrors.browserNotSupported]: "Le chiamate mediante questo browser non sono supportate.",
  [webphoneErrors.webphoneCountOverLimit]: "È possibile registrare fino a 5 telefoni web.",
  [webphoneErrors.checkDLError]: "Impossibile effettuare una chiamata in uscita. Se l'errore persiste, contatta {brandName} per assistenza.",
  [webphoneErrors.noOutboundCallWithoutDL]: "Con questo interno non è attualmente consentito effettuare chiamate in uscita con il browser. Contatta il rappresentante dell'account per un upgrade.",
  [webphoneErrors.provisionUpdate]: "Spiacenti, si è verificato un problema. Tenteremo la riconnessione automatica a breve.",
  [webphoneErrors.serverConnecting]: "Si è verificato un problema durante la connessione al server telefonico.",
  [webphoneErrors.toVoiceMailError]: "Impossibile inviare la chiamata alla segreteria telefonica a causa di un errore interno",
  [webphoneErrors.muteError]: "Impossibile disattivare l'audio della chiamata in questo momento.",
  [webphoneErrors.holdError]: "Impossibile mettere in attesa la chiamata in questo momento.",
  [webphoneErrors.flipError]: "Impossibile commutare la chiamata. Riprova più tardi.",
  [webphoneErrors.recordError]: "Non è possibile registrare la chiamata in questo momento. Codice errore: {errorCode}",
  [webphoneErrors.pauseRecordError]: "Non è stato possibile interrompere la registrazione della chiamata. Riprova più tardi.",
  [webphoneErrors.recordDisabled]: "La funzione di registrazione chiamata non è disponibile nel tuo account. Contatta l'amministratore del tuo account.",
  [webphoneErrors.transferError]: "Impossibile trasferire la chiamata. Riprova più tardi.",
  [webphoneMessages.parked]: "La tua chiamata è parcheggiata nella posizione: {parkedNumber}",
  failWithStatusCode: "Abbiamo riscontrato un errore: {errorCode}. Se il problema persiste, segnala l'errore all'assistenza {brandName}.",
  registeringWithStatusCode: "Si è verificato un problema. Tentativo di riconnessione. Se il problema persiste, segnala l'errore all'assistenza {brandName}. Codice errore: {errorCode}.",
  failWithoutStatusCode: "Spiacenti, si è verificato un problema. Se l'errore persiste, segnala il problema all'assistenza {brandName}.",
  registeringWithoutStatusCode: "Si è verificato un problema. Tentativo di riconnessione. Se il problema persiste, segnala l'errore all'assistenza {brandName}."
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
