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
  telus911: 'Notrufe werden nicht unterstützt.',
};

// @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.specialNumber]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@
