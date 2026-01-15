import { messageSenderMessages } from '@ringcentral-integration/commons/modules/MessageSender';

export default {
  [messageSenderMessages.sendSuccess]: 'Send Success.',
  [messageSenderMessages.sendError]:
    'Something wrong happened when send message.',
  [messageSenderMessages.numberValidateError]: 'Phone Number Validate Error.',
  [messageSenderMessages.textEmpty]: 'Please enter the text to be sent.',
  [messageSenderMessages.noPermission]:
    'You have no permission to send message.',
  [messageSenderMessages.senderEmpty]:
    'You must select a number from your phone numbers to send',
  [messageSenderMessages.noToNumber]: 'Please enter a valid phone number.',
  [messageSenderMessages.recipientsEmpty]:
    'Please enter a valid receiver number.',
  [messageSenderMessages.textTooLong]: 'You can enter up to 1,000 characters.',
  [messageSenderMessages.multipartTextTooLong]:
    'You can enter up to 5,000 characters.',
  [messageSenderMessages.recipientNumberInvalids]:
    'Please enter a valid phone number.',
  [messageSenderMessages.noAreaCode]:
    'Please set {areaCodeLink} to use 7-digit local phone numbers.',
  [messageSenderMessages.specialNumber]:
    'Sending text to emergency/special service numbers is not supported.',
  [messageSenderMessages.connectFailed]:
    'Connection failed. Please try again later.',
  [messageSenderMessages.internalError]:
    'Cannot connect due to internal errors. Please try again later.',
  [messageSenderMessages.notAnExtension]:
    'The extension number does not exist.',
  [messageSenderMessages.networkError]:
    'Cannot connect due to network issues. Please try again later.',
  [messageSenderMessages.senderNumberInvalid]:
    'A valid Phone Number is required to send text message to recipients outside of your company, Please contact your Administrator to add a direct number to your account.',
  [messageSenderMessages.notSmsToExtension]:
    'Cannot send to an extension number with main phone number. If you want to send to an extension number, please just enter extension number.',
  [messageSenderMessages.internationalSMSNotSupported]:
    'Sending SMS to international phone number is not supported.',
  [messageSenderMessages.noInternalSMSPermission]:
    "You don't have permission to send messages. Please contact your {brand} account administrator for upgrade.",
  [messageSenderMessages.noSMSPermission]:
    "You don't have permission to send messages to recipients outside of your organization.",
  [messageSenderMessages.attachmentCountLimitation]:
    "Can't be more than 10 attachments per message",
  [messageSenderMessages.attachmentSizeLimitation]:
    "The over all attachment size can't be larger than 1.5 MB per message.",
  [messageSenderMessages.noAttachmentToExtension]:
    "It isn't supported to send MMS to an extension.",
  areaCode: 'area code',
  [messageSenderMessages.sending]:
    'Message being sent…It may take a couple of minutes to complete.',
  [messageSenderMessages.shortNumbersNotAvailable]:
    'Sending SMS to short numbers is not available.',
} as const;
