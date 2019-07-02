import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';
export default {
  [webphoneErrors.connected]: "Telefono web registrato.",
  [webphoneErrors.webphoneCountOverLimit]: "È possibile registrare fino a 5 telefoni web.",
  [webphoneErrors.noOutboundCallWithoutDL]: "Con questo interno non è attualmente consentito effettuare chiamate in uscita con il browser. Contatta il rappresentante dell'account per un aggiornamento",
  [webphoneErrors.toVoiceMailError]: "Impossibile inviare la chiamata alla segreteria telefonica a causa di un errore interno",
  [webphoneErrors.muteError]: "Impossibile disattivare l'audio della chiamata in questo momento.",
  [webphoneErrors.holdError]: "Impossibile mettere in attesa la chiamata in questo momento.",
  [webphoneErrors.flipError]: "Impossibile commutare la chiamata. Riprova più tardi.",
  [webphoneErrors.recordError]: "Non è possibile registrare la chiamata in questo momento. Codice errore: {errorCode}",
  [webphoneErrors.recordDisabled]: "La funzione di registrazione chiamata non è disponibile nel tuo account. Contatta l'amministratore del tuo account.",
  [webphoneErrors.transferError]: "Impossibile trasferire la chiamata. Riprova più tardi.",
};

// @key: @#@"[webphoneErrors.connected]"@#@ @source: @#@"Web phone registered."@#@
// @key: @#@"[webphoneErrors.browserNotSupported]"@#@ @source: @#@"Calling with browser is only supported on Chrome."@#@
// @key: @#@"[webphoneErrors.webphoneCountOverLimit]"@#@ @source: @#@"A maximum of 5 web phones could be registered."@#@
// @key: @#@"[webphoneErrors.noOutboundCallWithoutDL]"@#@ @source: @#@"Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade."@#@
// @key: @#@"[webphoneErrors.toVoiceMailError]"@#@ @source: @#@"Cannot send call to voicemail due to internal error"@#@
// @key: @#@"[webphoneErrors.muteError]"@#@ @source: @#@"Call cannot be muted at the moment."@#@
// @key: @#@"[webphoneErrors.holdError]"@#@ @source: @#@"Call cannot be hold at the moment."@#@
// @key: @#@"[webphoneErrors.flipError]"@#@ @source: @#@"Cannot flip the call. Please try again later."@#@
// @key: @#@"[webphoneErrors.recordError]"@#@ @source: @#@"You cannot record the call at the moment. Error code: {errorCode}"@#@
// @key: @#@"[webphoneErrors.recordDisabled]"@#@ @source: @#@"Sorry, your account does not have the feature to record a call. Please contact your account administrator."@#@
// @key: @#@"[webphoneErrors.transferError]"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@