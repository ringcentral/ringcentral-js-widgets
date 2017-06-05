import callingSettingsMessages from
  'ringcentral-integration/modules/CallingSettings/callingSettingsMessages';

export default {
  [callingSettingsMessages.saveSuccess]: 'Einstellungen wurden erfolgreich gespeichert.',
  [callingSettingsMessages.saveSuccessWithSoftphone]: 'Die Einstellungen wurden erfolgreich gespeichert. Stellen Sie sicher, dass Sie {brand} für Desktop auf Ihrem Computer installiert haben.',
  [callingSettingsMessages.firstLogin]: 'Wählen Sie im Abschnitt "Anruf" aus, wie Sie Ihren Anruf tätigen möchten. Es wäre schön, wenn Sie uns Ihren Standort mitteilen könnten, indem Sie Ihre Ländervorwahl und Vorwahl (sofern verfügbar) im Abschnitt "Region" angeben, damit Sie lokale Anrufe mit der App tätigen können.',
  [callingSettingsMessages.firstLoginOther]: 'Wählen Sie im Abschnitt "Anruf" aus, wie Sie Ihren Anruf tätigen möchten.',
  [callingSettingsMessages.permissionChanged]: 'Ihre Berechtigungen wurden kürzlich geändert. Navigieren Sie zu {link}, um Ihre Anrufoptionen zu überprüfen.',
  [callingSettingsMessages.phoneNumberChanged]: 'Ihre Telefonnummerninformationen wurden kürzlich geändert. Navigieren Sie zu {link}, um Ihre Anrufoptionen zu überprüfen.',
  link: 'Einstellungen > Anrufen',
  [callingSettingsMessages.webphonePermissionRemoved]: 'Ihre Berechtigungen wurden geändert und Sie können über den Browser keine Anrufe tätigen. Wenden Sie sich an Ihren Kontoadministrator, wenn Sie Details benötigen.',
  [callingSettingsMessages.emergencyCallingNotAvailable]: 'Das Anrufen des Notrufs oder bestimmter Servicenummern wird nicht unterstützt. Verwenden Sie für Notfallanrufe Ihr Festnetz- oder Ihr Mobiltelefon.',
};
