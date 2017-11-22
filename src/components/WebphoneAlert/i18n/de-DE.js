import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';

export default {
  [webphoneErrors.connectFailed]: 'Erfolgreich gesendet.',
  [webphoneErrors.browserNotSupported]: 'Das Tätigen von Anrufen über den Browser wird nur in Chrome unterstützt.',
  [webphoneErrors.webphoneCountOverLimit]: 'Maximal fünf Webtelefone können registriert werden.',
  [webphoneErrors.notOutboundCallWithoutDL]: 'Ihre Durchwahl ist aktuell nicht dazu berechtigt, ausgehende Anrufe über den Browser zu tätigen. Wenden Sie sich bitte an Ihren Kontoadministrator, um ein Upgrade zu erhalten.',
  [webphoneErrors.getSipProvisionError]: 'Sie verfügen über keine Berechtigung zum Senden von Nachrichten.',
  [webphoneErrors.connected]: 'Das Webtelefon wurde registriert.',
  [webphoneErrors.toVoiceMailError]: 'Der Anruf konnte wegen eines internen Fehlers nicht an die Voicemail geleitet werden.',
  [webphoneErrors.muteError]: 'Der Anruf kann im Moment nicht stummgeschaltet werden.',
  [webphoneErrors.holdError]: 'Der Anruf kann im Moment nicht gehalten werden.',
  [webphoneErrors.flipError]: 'Der Anruf kann nicht umgelegt werden. Versuchen Sie es später erneut.',
  [webphoneErrors.recordError]: 'Sie können den Anruf gegenwärtig nicht aufzeichnen. Fehlercode: {errorCode}',
  [webphoneErrors.recordDisabled]: 'Ihr Konto verfügt über keine Funktion zum Aufzeichnen von Anrufen. Wenden Sie sich an Ihren Kontoadministrator.',
  [webphoneErrors.transferError]: 'Der Anruf kann nicht weitergeleitet werden. Versuchen Sie es später erneut.',
};
