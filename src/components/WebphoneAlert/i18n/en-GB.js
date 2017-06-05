import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';

export default {
  [webphoneErrors.connectFailed]: 'Send success.',
  [webphoneErrors.browserNotSupported]: 'Calling with browser is only supported on Chrome.',
  [webphoneErrors.webphoneCountOverLimit]: 'A maximum of 5 web phones could be registered.',
  [webphoneErrors.notOutboundCallWithoutDL]: 'Your extension is currently not allowed to make outbound calls with browser. Please contact your account representative for an upgrade.',
  [webphoneErrors.getSipProvisionError]: 'You do not have permission to send messages.',
};
