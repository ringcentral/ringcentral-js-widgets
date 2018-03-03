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
  [messageSenderMessages.noAreaCode]: 'Legen Sie für die {areaCodeLink} die Verwendung von 7-stelligen lokalen Telefonnummern fest.',
  [messageSenderMessages.specialNumber]: 'Das Anrufen des Notrufs oder bestimmter Servicenummern wird nicht unterstützt.',
  [messageSenderMessages.connectFailed]: 'Verbindungsaufbau fehlgeschlagen. Versuchen Sie es später erneut.',
  [messageSenderMessages.internalError]: 'Herstellen der Verbindung aufgrund interner Fehler nicht möglich. Versuchen Sie es später erneut.',
  [messageSenderMessages.notAnExtension]: 'Die Durchwahlnummer existiert nicht.',
  [messageSenderMessages.networkError]: 'Herstellen der Verbindung aufgrund von Netzwerkproblemen nicht möglich. Versuchen Sie es später erneut.',
  [messageSenderMessages.notSmsToExtension]: 'Senden an eine Durchwahl mit Haupttelefonnummer nicht möglich. Geben Sie zunächst die Durchwahl an, wenn Sie an eine Durchwahl senden möchten.',
  [messageSenderMessages.senderNumberInvalids]: 'Sie haben keine gültige Telefonnummer, um SMS zu versenden. Wenden Sie sich an Ihren Kontoadministrator.',
  [messageSenderMessages.internationalSMSNotSupported]: 'Das Versenden von SMS an internationale Telefonnummern wird nicht unterstützt.',
  areaCode: 'Vorwahl',
  [messageSenderMessages.senderNumberInvalid]: 'Zum Senden von Textnachrichten an Empfänger außerhalb Ihres Unternehmens ist eine gültige Telefonnummer erforderlich. Wenden Sie sich an Ihren Administrator, um Ihrem Konto eine Durchwahlnummer hinzuzufügen.',
};

// @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
// @key: @#@"[messageSenderMessages.sendError]"@#@ @source: @#@"Something wrong happened when send message."@#@
// @key: @#@"[messageSenderMessages.numberValidateError]"@#@ @source: @#@"Phone Number Validate Error."@#@
// @key: @#@"[messageSenderMessages.textEmpty]"@#@ @source: @#@"Please enter the text to be sent."@#@
// @key: @#@"[messageSenderMessages.noPermission]"@#@ @source: @#@"You have no permission to send message."@#@
// @key: @#@"[messageSenderMessages.senderEmpty]"@#@ @source: @#@"You must select a number from your phone numbers to send"@#@
// @key: @#@"[messageSenderMessages.noToNumber]"@#@ @source: @#@"Invalid phone number."@#@
// @key: @#@"[messageSenderMessages.recipientsEmpty]"@#@ @source: @#@"Please enter a valid receiver number."@#@
// @key: @#@"[messageSenderMessages.textTooLong]"@#@ @source: @#@"Text is too long, 1000 Limited"@#@
// @key: @#@"[messageSenderMessages.recipientNumberInvalids]"@#@ @source: @#@"Recipient number is invalids"@#@
// @key: @#@"[messageSenderMessages.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[messageSenderMessages.specialNumber]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported."@#@
// @key: @#@"[messageSenderMessages.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[messageSenderMessages.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[messageSenderMessages.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[messageSenderMessages.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[messageSenderMessages.senderNumberInvalid]"@#@ @source: @#@"A valid Phone Number is required to send text message to recipients outside of your company. Please contact your Administrator to add a direct number to your account."@#@
// @key: @#@"[messageSenderMessages.notSmsToExtension]"@#@ @source: @#@"Cannot send To a extension number with main phone number. If you want to sent to a extension Number, please just enter extension Number."@#@
// @key: @#@"[messageSenderMessages.internationalSMSNotSupported]"@#@ @source: @#@"Sending SMS to international phone number is not supported."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
