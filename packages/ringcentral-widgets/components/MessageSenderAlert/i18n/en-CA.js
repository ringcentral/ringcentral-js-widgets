import messageSenderMessages from 'ringcentral-integration/modules/MessageSender/messageSenderMessages';

export default {
  [messageSenderMessages.sendSuccess]: "Send Success.",
  [messageSenderMessages.sendError]: "Something wrong happened when send message.",
  [messageSenderMessages.numberValidateError]: "Phone Number Validate Error.",
  [messageSenderMessages.textEmpty]: "Please enter the text to be sent.",
  [messageSenderMessages.noPermission]: "You have no permission to send message.",
  [messageSenderMessages.senderEmpty]: "You must select a number from your phone numbers to send",

  [messageSenderMessages.recipientsEmpty]: "Please enter a valid receiver number.",
  [messageSenderMessages.textTooLong]: "Text is too long, 1000 Limited",
  [messageSenderMessages.multipartTextTooLong]: "Text is too long, 5000 Limited",
  [messageSenderMessages.recipientNumberInvalids]: "Please enter a valid phone number.",
  [messageSenderMessages.noAreaCode]: "Please set {areaCodeLink} to use 7-digit local phone numbers.",

  [messageSenderMessages.connectFailed]: "Connection failed. Please try again later.",
  [messageSenderMessages.internalError]: "Cannot connect due to internal errors. Please try again later.",
  [messageSenderMessages.notAnExtension]: "The extension number does not exist.",
  [messageSenderMessages.networkError]: "Cannot connect due to network issues. Please try again later.",
  [messageSenderMessages.senderNumberInvalid]: "You don't have permission to send messages to recipients outside of your organization. Please contact your RingCentral account administrator for upgrade.",
  [messageSenderMessages.notSmsToExtension]: "Cannot send To a extension number with main phone number. If you want to sent to a extension Number, please just enter extension Number.",
  [messageSenderMessages.internationalSMSNotSupported]: "Sending SMS to international phone number is not supported.",
  [messageSenderMessages.noInternalSMSPermission]: "You don't have permission to send messages. Please contact your RingCentral account administrator for upgrade.",

  areaCode: "area code"
};

// @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
// @key: @#@"[messageSenderMessages.sendError]"@#@ @source: @#@"Something wrong happened when send message."@#@
// @key: @#@"[messageSenderMessages.numberValidateError]"@#@ @source: @#@"Phone Number Validate Error."@#@
// @key: @#@"[messageSenderMessages.textEmpty]"@#@ @source: @#@"Please enter the text to be sent."@#@
// @key: @#@"[messageSenderMessages.noPermission]"@#@ @source: @#@"You have no permission to send message."@#@
// @key: @#@"[messageSenderMessages.senderEmpty]"@#@ @source: @#@"You must select a number from your phone numbers to send"@#@
// @key: @#@"[messageSenderMessages.recipientsEmpty]"@#@ @source: @#@"Please enter a valid receiver number."@#@
// @key: @#@"[messageSenderMessages.textTooLong]"@#@ @source: @#@"Text is too long, 1000 Limited"@#@
// @key: @#@"[messageSenderMessages.multipartTextTooLong]"@#@ @source: @#@"Text is too long, 5000 Limited"@#@
// @key: @#@"[messageSenderMessages.recipientNumberInvalids]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[messageSenderMessages.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[messageSenderMessages.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[messageSenderMessages.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[messageSenderMessages.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[messageSenderMessages.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[messageSenderMessages.senderNumberInvalid]"@#@ @source: @#@"A valid Phone Number is required to send text message to recipients outside of your company, Please contact your Administrator to add a direct number to your account."@#@
// @key: @#@"[messageSenderMessages.notSmsToExtension]"@#@ @source: @#@"Cannot send To a extension number with main phone number. If you want to sent to a extension Number, please just enter extension Number."@#@
// @key: @#@"[messageSenderMessages.internationalSMSNotSupported]"@#@ @source: @#@"Sending SMS to international phone number is not supported."@#@
// @key: @#@"[messageSenderMessages.noInternalSMSPermission]"@#@ @source: @#@"You don't have permission to send messages. Please contact your {brand} account administrator for upgrade."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
