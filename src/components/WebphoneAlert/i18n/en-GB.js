import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';

export default {
  [webphoneErrors.connectFailed]: 'Send success.',
  [webphoneErrors.browserNotSupported]: 'Calling with browser is only supported on Chrome.',
  [webphoneErrors.webphoneCountOverLimit]: 'A maximum of 5 web phones could be registered.',
  [webphoneErrors.notOutboundCallWithoutDL]: 'Your extension is currently not allowed to make outbound calls with browser. Please contact your account representative for an upgrade.',
  [webphoneErrors.getSipProvisionError]: 'You do not have permission to send messages.',
  [webphoneErrors.connected]: 'Web phone registered.',
  [webphoneErrors.toVoiceMailError]: 'Cannot send call to voicemail due to internal error',
  [webphoneErrors.muteError]: 'Call cannot be muted at the moment.',
  [webphoneErrors.holdError]: 'Call cannot be held at the moment.',
  [webphoneErrors.flipError]: 'Cannot flip the call. Please try again later.',
  [webphoneErrors.recordError]: 'You cannot record the call at the moment. Error code: {errorCode}',
  [webphoneErrors.recordDisabled]: 'Sorry, your account does not have the feature to record a call. Please contact your account administrator.',
  [webphoneErrors.transferError]: 'Cannot transfer the call. Please try again later.',
};
