import messageSenderMessages from '@ringcentral-integration/commons/modules/MessageSender/messageSenderMessages';
import messageSenderMessagesV2 from '@ringcentral-integration/commons/modules/MessageSenderV2/messageSenderMessages';
export default {
  [messageSenderMessages.sendSuccess]: "Erfolgreich gesendet.",
  [messageSenderMessages.sendError]: "Fehler beim Senden der Nachricht.",
  [messageSenderMessages.numberValidateError]: "Fehler beim Validieren der Telefonnummer.",
  [messageSenderMessages.textEmpty]: "Geben Sie die Textnachricht ein, den Sie senden möchten.",
  [messageSenderMessages.noPermission]: "Sie verfügen nicht über die Berechtigung zum Versenden der Nachricht.",
  [messageSenderMessages.senderEmpty]: "Zum Senden müssen Sie eine Nummer aus Ihren Telefonnummern auswählen",
  [messageSenderMessages.noToNumber]: "Geben Sie eine gültige Telefonnummer ein.",
  [messageSenderMessages.recipientsEmpty]: "Geben Sie eine gültige Empfängernummer ein.",
  [messageSenderMessages.textTooLong]: "Textnachricht ist zu lang, auf 1000 beschränkt",
  [messageSenderMessages.multipartTextTooLong]: "Textnachricht ist zu lang, auf 5000 beschränkt",
  [messageSenderMessages.recipientNumberInvalids]: "Geben Sie eine gültige Telefonnummer ein.",
  [messageSenderMessages.noAreaCode]: "Legen Sie {areaCodeLink} fest, um lokale Telefonnummer mit 7 Ziffern verwenden zu können.",
  [messageSenderMessages.specialNumber]: "Textnachrichten an Notrufnummern/bestimmte Servicenummern werden nicht unterstützt.",
  [messageSenderMessages.connectFailed]: "Verbindungsaufbau fehlgeschlagen. Versuchen Sie es später erneut.",
  [messageSenderMessages.internalError]: "Herstellen der Verbindung aufgrund interner Fehler nicht möglich. Bitte versuchen Sie es später erneut.",
  [messageSenderMessages.notAnExtension]: "Die Durchwahlnummer ist nicht vorhanden.",
  [messageSenderMessages.networkError]: "Verbindung aufgrund von Netzwerkproblemen fehlgeschlagen. Bitte versuchen Sie es später erneut.",
  [messageSenderMessages.senderNumberInvalid]: "Um eine Textnachricht an einen Empfänger außerhalb Ihres Unternehmens zu senden, ist eine gültige Telefonnummer nötig. Wenden Sie sich an Ihren Administrator, um eine Durchwahlnummer zu Ihrem Konto hinzuzufügen.",
  [messageSenderMessages.notSmsToExtension]: "Mit der Haupttelefonnummer kann keine Textnachricht an eine Durchwahlnummer gesendet werden. Wenn Sie an eine Durchwahlnummer senden möchten, geben Sie einfach die Durchwahlnummer ein.",
  [messageSenderMessages.internationalSMSNotSupported]: "SMS können nicht an internationale Telefonnummern gesendet werden.",
  [messageSenderMessages.noInternalSMSPermission]: "Sie verfügen nicht über die Berechtigung zum Versenden von Nachrichten. Wenden Sie sich an den Administrator des {brand}-Kontos, um ein Upgrade durchzuführen.",
  [messageSenderMessages.noSMSPermission]: "Sie haben keine Berechtigung, Nachrichten an Empfänger außerhalb Ihrer Organisation zu senden.",
  [messageSenderMessagesV2.attachmentCountLimitation]: "Maximal 10 Anhänge.",
  [messageSenderMessagesV2.attachmentSizeLimitation]: "Anhanggröße ist begrenzt auf 1,5 MBytes.",
  [messageSenderMessagesV2.noAttachmentToExtension]: "Versenden von MMS an Durchwahlen wird nicht unterstützt.",
  areaCode: "Vorwahl",
  [messageSenderMessages.sending]: "Nachricht wird versendet… Dies kann einige Minuten dauern."
};

// @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
// @key: @#@"[messageSenderMessages.sendError]"@#@ @source: @#@"Something wrong happened when send message."@#@
// @key: @#@"[messageSenderMessages.numberValidateError]"@#@ @source: @#@"Phone Number Validate Error."@#@
// @key: @#@"[messageSenderMessages.textEmpty]"@#@ @source: @#@"Please enter the text to be sent."@#@
// @key: @#@"[messageSenderMessages.noPermission]"@#@ @source: @#@"You have no permission to send message."@#@
// @key: @#@"[messageSenderMessages.senderEmpty]"@#@ @source: @#@"You must select a number from your phone numbers to send"@#@
// @key: @#@"[messageSenderMessages.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[messageSenderMessages.recipientsEmpty]"@#@ @source: @#@"Please enter a valid receiver number."@#@
// @key: @#@"[messageSenderMessages.textTooLong]"@#@ @source: @#@"Text is too long, 1000 Limited"@#@
// @key: @#@"[messageSenderMessages.multipartTextTooLong]"@#@ @source: @#@"Text is too long, 5000 Limited"@#@
// @key: @#@"[messageSenderMessages.recipientNumberInvalids]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[messageSenderMessages.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[messageSenderMessages.specialNumber]"@#@ @source: @#@"Sending text to emergency/special service numbers is not supported."@#@
// @key: @#@"[messageSenderMessages.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[messageSenderMessages.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[messageSenderMessages.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[messageSenderMessages.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[messageSenderMessages.senderNumberInvalid]"@#@ @source: @#@"A valid Phone Number is required to send text message to recipients outside of your company, Please contact your Administrator to add a direct number to your account."@#@
// @key: @#@"[messageSenderMessages.notSmsToExtension]"@#@ @source: @#@"Cannot send To a extension number with main phone number. If you want to sent to a extension Number, please just enter extension Number."@#@
// @key: @#@"[messageSenderMessages.internationalSMSNotSupported]"@#@ @source: @#@"Sending SMS to international phone number is not supported."@#@
// @key: @#@"[messageSenderMessages.noInternalSMSPermission]"@#@ @source: @#@"You don't have permission to send messages. Please contact your {brand} account administrator for upgrade."@#@
// @key: @#@"[messageSenderMessages.noSMSPermission]"@#@ @source: @#@"You don't have permission to send messages to recipients outside of your organization."@#@
// @key: @#@"[messageSenderMessagesV2.attachmentCountLimitation]"@#@ @source: @#@"Maximum 10 attachments."@#@
// @key: @#@"[messageSenderMessagesV2.attachmentSizeLimitation]"@#@ @source: @#@"Attachments size is limited to 1.5M bytes."@#@
// @key: @#@"[messageSenderMessagesV2.noAttachmentToExtension]"@#@ @source: @#@"It isn't supported to send MMS to an extension."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"[messageSenderMessages.sending]"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@
