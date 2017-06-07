import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';

export default {
  [webphoneErrors.connectFailed]: 'Connect with web phone server failed.',
  [webphoneErrors.browserNotSupported]: 'Calling with browser is only supported on Chrome.',
  [webphoneErrors.webphoneCountOverLimit]: 'A maximum of 5 web phones could be registered.',
  [webphoneErrors.notOutboundCallWithoutDL]: 'Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade.',
  [webphoneErrors.getSipProvisionError]: 'You have no permission to send message.',
};
