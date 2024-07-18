import webphoneErrors from '@ringcentral-integration/commons/modules/Webphone/webphoneErrors';
import webphoneMessages from '@ringcentral-integration/commons/modules/Webphone/webphoneMessages';

export default {
  [webphoneErrors.connectFailed]:
    'Sorry, phone features are currently unavailable. Please retry later. ',
  [webphoneErrors.connected]: 'Web phone registered.',
  [webphoneErrors.browserNotSupported]:
    'Sorry, making calls using this browser is not supported.',
  [webphoneErrors.webphoneCountOverLimit]:
    'A maximum of 5 web phones could be registered.',
  [webphoneErrors.checkDLError]:
    'Unable to make outgoing call. Contact {brandName} for support if this error keeps showing.',
  [webphoneErrors.noOutboundCallWithoutDL]:
    'Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade.',
  [webphoneErrors.provisionUpdate]:
    'Sorry, something went wrong on our end. We will automatically try to reconnect shortly.',
  [webphoneErrors.serverConnecting]:
    'Sorry, we are having an issue connecting to the phone server.',
  [webphoneErrors.toVoiceMailError]:
    'Cannot send call to voicemail due to internal error',
  [webphoneErrors.muteError]: 'Call cannot be muted at the moment.',
  [webphoneErrors.holdError]: 'Call cannot be hold at the moment.',
  [webphoneErrors.flipError]: 'Cannot flip the call. Please try again later.',
  [webphoneErrors.recordError]:
    'You cannot record the call at the moment. Error code: {errorCode}',
  [webphoneErrors.pauseRecordError]:
    "Sorry, we weren't able to stop recording the call. Try again later.",
  [webphoneErrors.recordDisabled]:
    'Sorry, your account does not have the feature to record a call. Please contact your account administrator.',
  [webphoneErrors.transferError]:
    'Cannot transfer the call. Please try again later.',
  [webphoneMessages.parked]: 'Your call is parked at location: {parkedNumber}',
  failWithStatusCode:
    "Sorry, we've encountered an error: {errorCode}. If the problem persists, report this error to {brandName} support.",
  registeringWithStatusCode:
    'Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support. Error code: {errorCode}.',
  failWithoutStatusCode:
    'Sorry, something went wrong on our end. If the error persists, report this error to {brandName} support.',
  registeringWithoutStatusCode:
    'Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support.',
} as const;
