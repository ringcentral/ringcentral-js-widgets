import messageSenderMessages from 'ringcentral-integration/modules/MessageSender/messageSenderMessages';

export default {
  [messageSenderMessages.sendSuccess]: 'Send Success.',
  [messageSenderMessages.sendError]: 'Something wrong happened when send message.',
  [messageSenderMessages.numberValidateError]: 'Phone Number Validate Error.',
  [messageSenderMessages.textEmpty]: 'Please enter the text to be sent.',
  [messageSenderMessages.noPermission]: 'You have no permission to send message.',
  [messageSenderMessages.senderEmpty]: 'You must select a number from your phone numbers to send',
  [messageSenderMessages.noToNumber]: 'Invalid phone number.',
  [messageSenderMessages.recipientsEmpty]: 'Please enter a valid receiver number.',
  [messageSenderMessages.textTooLong]: 'Text is too long, 1000 Limited',
  [messageSenderMessages.recipientNumberInvalids]: 'Recipient number is invalids',
  [messageSenderMessages.noAreaCode]: 'Please set {areaCodeLink} to use 7-digit local phone numbers.',
  [messageSenderMessages.specialNumber]: 'Dialing emergency or special service numbers is not supported.',
  [messageSenderMessages.connectFailed]: 'Connection failed. Please try again later.',
  [messageSenderMessages.internalError]: 'Cannot connect due to internal errors. Please try again later.',
  [messageSenderMessages.notAnExtension]: 'The extension number does not exist.',
  [messageSenderMessages.networkError]: 'Cannot connect due to network issues. Please try again later.',
  [messageSenderMessages.senderNumberInvalids]: `You don't have valid phone number to send SMS 
    from. Please contact your account administrator.`,
  [messageSenderMessages.senderNumbersInvalids]: `A valid Phone Number is required to send text message to
    recipients outside of your company. Please contact your Administrator to add a direct number to your account.`,
  [messageSenderMessages.notSmsToExtension]: `Cannot send To a extension number with main phone number.
    If you want to sent to a extension Number,
    please just enter extension Number.`,
  [messageSenderMessages.internationalSMSNotSupported]: `Sending SMS to international phone number 
    is not supported.`,
};
