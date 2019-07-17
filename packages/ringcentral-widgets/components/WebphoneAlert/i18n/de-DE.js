import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';
export default {
  [webphoneErrors.connectFailed]: "Leider sind Telefonfunktionen zurzeit nicht verfügbar. Bitte versuchen Sie es später erneut. ",
  [webphoneErrors.connected]: "Das Webtelefon wurde registriert.",
  [webphoneErrors.browserNotSupported]: "Das Tätigen von Anrufen mit diesem Browser wird leider nicht unterstützt.",
  [webphoneErrors.webphoneCountOverLimit]: "Maximal fünf Webtelefone können registriert werden.",
  [webphoneErrors.checkDLError]: "Der ausgehende Anruf konnte nicht getätigt werden. Wenden Sie sich an {brandName}, um Unterstützung zu erhalten, wenn dieser Fehler weiterhin angezeigt wird.",
  [webphoneErrors.noOutboundCallWithoutDL]: "Ihre Durchwahl ist aktuell nicht dazu berechtigt, ausgehende Anrufe über den Browser zu tätigen. Wenden Sie sich bitte an Ihren Kontoadministrator, um ein Upgrade zu erhalten.",
  [webphoneErrors.provisionUpdate]: "Leider ist auf unserer Seite ein Fehler aufgetreten. Wir versuchen in Kürze automatisch, die Verbindung neu herzustellen.",
  [webphoneErrors.serverConnecting]: "Leider ist ein Problem beim Herstellen einer Verbindung mit dem Telefonserver aufgetreten.",
  [webphoneErrors.toVoiceMailError]: "Der Anruf konnte wegen eines internen Fehlers nicht an die Voicemail geleitet werden.",
  [webphoneErrors.muteError]: "Der Anruf kann im Moment nicht stummgeschaltet werden.",
  [webphoneErrors.holdError]: "Der Anruf kann im Moment nicht gehalten werden.",
  [webphoneErrors.flipError]: "Der Anruf kann nicht umgelegt werden. Versuchen Sie es später erneut.",
  [webphoneErrors.recordError]: "Sie können den Anruf gegenwärtig nicht aufzeichnen. Fehlercode: {errorCode}",
  [webphoneErrors.recordDisabled]: "Ihr Konto verfügt über keine Funktion zum Aufzeichnen von Anrufen. Wenden Sie sich an Ihren Kontoadministrator.",
  [webphoneErrors.transferError]: "Der Anruf kann nicht weitergeleitet werden. Versuchen Sie es später erneut.",
  failWithStatusCode: "Leider ist bei uns ein Fehler aufgetreten: {errorCode}. Sollte das Problem weiterhin bestehen, melden Sie es an den {brandName}-Kundendienst.",
  registeringWithStatusCode: "Leider ist ein Fehler aufgetreten. Wir versuchen, die Verbindung neu herzustellen. Sollte das Problem weiterhin bestehen, melden Sie es bitte an den {brandName}-Kundendienst. Fehlercode: {errorCode}.",
  failWithoutStatusCode: "Leider ist auf unserer Seite ein Fehler aufgetreten. Sollte dieser Fehler weiterhin bestehen, melden Sie ihn an den {brandName}-Kundendienst.",
  registeringWithoutStatusCode: "Leider ist ein Fehler aufgetreten. Wir versuchen, die Verbindung neu herzustellen. Sollte das Problem weiterhin bestehen, melden Sie es bitte an den {brandName}-Kundendienst."
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
