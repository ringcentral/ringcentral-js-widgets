import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';
export default {
  [webphoneErrors.connectFailed]: "Sorry, phone features are currently unavailable. Please retry later. ",
  [webphoneErrors.connected]: "Web phone registered.",
  [webphoneErrors.browserNotSupported]: "Sorry, making calls using this browser is not supported.",
  [webphoneErrors.webphoneCountOverLimit]: "A maximum of 5 web phones could be registered.",
  [webphoneErrors.checkDLError]: "Unable to make outgoing call. Contact {brandName} for support if this error keeps showing.",
  [webphoneErrors.noOutboundCallWithoutDL]: "Your extension is currently not allowed to make outbound calls with browser. Please contact your account representative for an upgrade.",
  [webphoneErrors.provisionUpdate]: "Sorry, something went wrong on our end. We will automatically try to reconnect shortly.",
  [webphoneErrors.serverConnecting]: "Sorry, we are having an issue with connecting to the phone server.",
  [webphoneErrors.toVoiceMailError]: "Cannot send call to voicemail due to internal error",
  [webphoneErrors.muteError]: "Call cannot be muted at the moment.",
  [webphoneErrors.holdError]: "Call cannot be held at the moment.",
  [webphoneErrors.flipError]: "Cannot flip the call. Please try again later.",
  [webphoneErrors.recordError]: "You cannot record the call at the moment. Error code: {errorCode}",
  [webphoneErrors.recordDisabled]: "Sorry, your account does not have the feature to record a call. Please contact your account administrator.",
  [webphoneErrors.transferError]: "Cannot transfer the call. Please try again later.",
  failWithStatusCode: "Sorry, we have encountered an error: {errorCode}. If the problem persists, report this error to {brandName} support.",
  registeringWithStatusCode: "Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support. Error code: {errorCode}.",
  failWithoutStatusCode: "Sorry, something went wrong on our end. If the error persists, report this error to {brandName} support.",
  registeringWithoutStatusCode: "Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support."
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
