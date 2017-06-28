import callErrors from 'ringcentral-integration/modules/Call/callErrors';

export default {
  [callErrors.noToNumber]: 'Geben Sie eine gültige Telefonnummer ein.',
  [callErrors.noAreaCode]: 'Legen Sie für die {areaCodeLink} die Verwendung von 7-stelligen lokalen Telefonnummern fest.',
  [callErrors.specialNumber]: 'Das Anrufen des Notrufs oder bestimmter Servicenummern wird nicht unterstützt.',
  [callErrors.connectFailed]: 'Verbindungsaufbau fehlgeschlagen. Versuchen Sie es später erneut.',
  [callErrors.internalError]: 'Herstellen der Verbindung aufgrund interner Fehler nicht möglich. Versuchen Sie es später erneut.',
  [callErrors.notAnExtension]: 'Die Durchwahlnummer existiert nicht.',
  [callErrors.networkError]: 'Herstellen der Verbindung aufgrund von Netzwerkproblemen nicht möglich. Versuchen Sie es später erneut.',
  [callErrors.noRingoutEnable]: 'Mit Ihrer Durchwahl können Anrufe mit Desktop-Apps getätigt werden.\n    Wenden Sie sich an Ihren Kontoadministrator für ein Upgrade,\n    wenn Sie zu anderen Anrufoptionen wechseln möchten.',
  areaCode: 'Vorwahl',
};
