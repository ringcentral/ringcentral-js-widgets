import messageSenderMessages from 'ringcentral-integration/modules/MessageSender/messageSenderMessages';

export default {
  [messageSenderMessages.sendSuccess]: 'Send Success.',
  [messageSenderMessages.sendError]: 'Something went wrong with sending the message.',
  [messageSenderMessages.numberValidateError]: 'Phone Number Validation Error.',
  [messageSenderMessages.textEmpty]: 'Please enter the text to be sent.',
  [messageSenderMessages.noPermission]: 'You do not have permission to send messages.',
  [messageSenderMessages.senderEmpty]: 'You must select a number from your phone numbers to send',
  [messageSenderMessages.noToNumber]: 'Please enter a valid phone number.',
  [messageSenderMessages.recipientsEmpty]: 'Please enter a valid receiver number.',
  [messageSenderMessages.textTooLong]: 'Text is too long, 1000 limit',
  [messageSenderMessages.multipartTextTooLong]: 'Text is too long, 5000 limit',
  [messageSenderMessages.recipientNumberInvalids]: 'Please enter a valid phone number.',
  [messageSenderMessages.noAreaCode]: 'Please set {areaCodeLink} to use 7-digit local phone numbers.',
  [messageSenderMessages.specialNumber]: 'Sending texts to emergency/special service numbers is not supported.',
  [messageSenderMessages.connectFailed]: 'Connection failed. Please try again later.',
  [messageSenderMessages.internalError]: 'Cannot connect due to internal errors. Please try again later.',
  [messageSenderMessages.notAnExtension]: 'The extension number does not exist.',
  [messageSenderMessages.networkError]: 'Cannot connect due to network issues. Please try again later.',
  [messageSenderMessages.senderNumberInvalid]: 'A valid phone number is required to send text messages to recipients outside of your company. Please contact your administrator to add a direct number to your account.',
  [messageSenderMessages.notSmsToExtension]: 'Cannot send To a extension number with main phone number. If you want to sent to a extension Number, please just enter extension Number.',
  [messageSenderMessages.internationalSMSNotSupported]: 'Sending SMS to international phone numbers is not supported.',
  [messageSenderMessages.noInternalSMSPermission]: 'You do not have permission to send messages. Please contact your {brand} account administrator for an upgrade.',
  [messageSenderMessages.noSMSPermission]: 'You do not have permission to send messages to recipients outside of your organisation. Please contact your {brand} account administrator for an upgrade.',
  areaCode: 'area code',
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
// @key: @#@"[messageSenderMessages.noSMSPermission]"@#@ @source: @#@"You don't have permission to send messages to recipients outside of your organization. Please contact your {brand} account administrator for upgrade."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
