import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';

export default {
  [webphoneErrors.connected]: "Web phone registered.",
  [webphoneErrors.browserNotSupported]: "Calling with browser is only supported on Chrome.",
  [webphoneErrors.webphoneCountOverLimit]: "A maximum of 5 web phones could be registered.",
  [webphoneErrors.notOutboundCallWithoutDL]: "Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade.",
  [webphoneErrors.getSipProvisionError]: "You have no permission to send message.",
  [webphoneErrors.toVoiceMailError]: "Cannot send call to voicemail due to internal error",
  [webphoneErrors.muteError]: "Call cannot be muted at the moment.",
  [webphoneErrors.holdError]: "Call cannot be hold at the moment.",
  [webphoneErrors.flipError]: "Cannot flip the call. Please try again later.",
  [webphoneErrors.recordError]: "You cannot record the call at the moment. Error code: {errorCode}",
  [webphoneErrors.recordDisabled]: "Sorry, your account does not have the feature to record a call. Please contact your account administrator.",
  [webphoneErrors.transferError]: "Cannot transfer the call. Please try again later."
};

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
