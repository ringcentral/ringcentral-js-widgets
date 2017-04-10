import messageSenderMessages from 'ringcentral-integration/modules/MessageSender/messageSenderMessages';

export default {
  [messageSenderMessages.sendSuccess]: 'Erfolgreich gesendet.',
  [messageSenderMessages.sendError]: 'Fehler beim Senden der Nachricht.',
  [messageSenderMessages.numberValidateError]: 'Fehler beim Validieren der Telefonnummer.',
  [messageSenderMessages.textEmpty]: 'Geben Sie den zu sendenden Text ein.',
  [messageSenderMessages.noPermission]: 'Sie verfügen über keine Berechtigung zum Senden von Nachrichten.',
  [messageSenderMessages.senderEmpty]: 'Zum Senden Nummer aus Ihren Telefonnummern auswählen',
  [messageSenderMessages.noToNumber]: 'Geben Sie eine gültige Telefonnummer ein.',
  [messageSenderMessages.recipientsEmpty]: 'Geben Sie eine gültige Empfängernummer ein.',
  [messageSenderMessages.textTooLong]: 'Text ist zu lang, maximal 1000 Zeichen',
  [messageSenderMessages.recipientNumberInvalids]: 'Ungültige Empfängernummer',
  [messageSenderMessages.noAreaCode]: 'Legen Sie für die {areaCodeLink} die Verwendung von 7-stelligen lokalen Telefonnummern fest.',
  [messageSenderMessages.specialNumber]: 'Das Anrufen des Notrufs oder bestimmter Servicenummern wird nicht unterstützt.',
  [messageSenderMessages.connectFailed]: 'Verbindungsaufbau fehlgeschlagen. Versuchen Sie es später erneut.',
  [messageSenderMessages.internalError]: 'Herstellen der Verbindung aufgrund interner Fehler nicht möglich. Versuchen Sie es später erneut.',
  [messageSenderMessages.notAnExtension]: 'Die Durchwahlnummer existiert nicht.',
  [messageSenderMessages.networkError]: 'Herstellen der Verbindung aufgrund von Netzwerkproblemen nicht möglich. Versuchen Sie es später erneut.',
  [messageSenderMessages.notSmsToExtension]: `Senden an eine Durchwahl mit Haupttelefonnummer nicht möglich.\n    Geben Sie zunächst die Durchwahl an,\n    wenn Sie an eine Durchwahl senden möchten.`,
  [messageSenderMessages.senderNumberInvalids]: `Sie haben keine gültige Telefonnummer, um SMS
    zu versenden. Wenden Sie sich an Ihren Kontoadministrator.`,
  [messageSenderMessages.internationalSMSNotSupported]: `Das Versenden von SMS an internationale Telefonnummern
    wird nicht unterstützt.`,
  areaCode: 'Vorwahl',
};
