import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';

export default {
  [webphoneErrors.connectFailed]: 'Erfolgreich gesendet.',
  [webphoneErrors.browserNotSupported]: 'Das Tätigen von Anrufen über den Browser wird nur in Chrome unterstützt.',
  [webphoneErrors.webphoneCountOverLimit]: 'Maximal fünf Webtelefone können registriert werden.',
  [webphoneErrors.notOutboundCallWithoutDL]: 'Ihre Durchwahl ist aktuell nicht dazu berechtigt, ausgehende Anrufe über den Browser zu tätigen. Wenden Sie sich bitte an Ihren Kontoadministrator, um ein Upgrade zu erhalten.',
  [webphoneErrors.getSipProvisionError]: 'Sie verfügen über keine Berechtigung zum Senden von Nachrichten.',
};
