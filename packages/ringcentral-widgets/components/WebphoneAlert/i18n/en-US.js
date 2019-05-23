import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';

export default {
  [webphoneErrors.connectFailed]: 'Connect with web phone server failed.',
  [webphoneErrors.connected]: 'Web phone registered.',
  [webphoneErrors.browserNotSupported]: 'Calling with browser is only supported on Chrome.',
  [webphoneErrors.webphoneCountOverLimit]: 'A maximum of 5 web phones could be registered.',
  [webphoneErrors.checkDLError]: 'Fail to get DL data, please contact {brandName} for support if this error keeps showing.',
  [webphoneErrors.noOutboundCallWithoutDL]: 'Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade.',
  [webphoneErrors.toVoiceMailError]: 'Cannot send call to voicemail due to internal error',
  [webphoneErrors.muteError]: 'Call cannot be muted at the moment.',
  [webphoneErrors.holdError]: 'Call cannot be hold at the moment.',
  [webphoneErrors.flipError]: 'Cannot flip the call. Please try again later.',
  [webphoneErrors.recordError]: 'You cannot record the call at the moment. Error code: {errorCode}',
  [webphoneErrors.recordDisabled]: 'Sorry, your account does not have the feature to record a call. Please contact your account administrator.',
  [webphoneErrors.transferError]: 'Cannot transfer the call. Please try again later.',
  webphoneUnavailable: '{error}. If the error persists, please report this error to {brandName} Support.',
  webphoneRegistering:'We are reconnecting to server. If the error persists, please report this error to {brandName} Support. {error}.',
  errorCode: 'Error code: {errorCode}',
  occurs: 'Internal error',
};
