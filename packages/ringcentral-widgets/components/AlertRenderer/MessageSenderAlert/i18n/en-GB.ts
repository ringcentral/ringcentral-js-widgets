/* eslint-disable */
import { messageSenderMessages } from '@ringcentral-integration/commons/modules/MessageSender';

export default {
  [messageSenderMessages.sendSuccess]: 'Send Success.',
  [messageSenderMessages.sendError]:
    'Something went wrong when sending the message.',
  [messageSenderMessages.numberValidateError]: 'Phone Number Validation Error.',
  [messageSenderMessages.textEmpty]: 'Please enter the text to be sent.',
  [messageSenderMessages.noPermission]:
    'You don’t have permission to send messages.',
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
    'Sending texts to emergency/special service numbers is not supported.',
  [messageSenderMessages.connectFailed]:
    'Connection failed. Please try again later.',
  [messageSenderMessages.internalError]:
    'Cannot connect due to internal errors. Please try again later.',
  [messageSenderMessages.notAnExtension]:
    'The extension number does not exist.',
  [messageSenderMessages.networkError]:
    'Cannot connect due to network issues. Please try again later.',
  [messageSenderMessages.senderNumberInvalid]:
    'A valid phone number is required to send text messages to recipients outside of your company. Please contact your administrator to add a direct number to your account.',
  [messageSenderMessages.notSmsToExtension]:
    'Cannot send to an extension number with main phone number. If you want to send to an extension number, please just enter extension number.',
  [messageSenderMessages.internationalSMSNotSupported]:
    'Sending an SMS to an international phone number is not supported.',
  [messageSenderMessages.noInternalSMSPermission]:
    "You don't have permission to send messages. Please contact your {brand} account administrator to upgrade.",
  [messageSenderMessages.noSMSPermission]:
    "You don't have permission to send messages to recipients outside your organisation.",
  [messageSenderMessages.attachmentCountLimitation]:
    'Can’t be more than ten attachments per message',
  [messageSenderMessages.attachmentSizeLimitation]:
    'The overall attachment size can’t be larger than 1.5 MB per message.',
  [messageSenderMessages.noAttachmentToExtension]:
    'Sending MMS to an extension is not supported.',
  areaCode: 'area code',
  [messageSenderMessages.sending]:
    'Message being sent… It may take a couple of minutes to complete.',
  [messageSenderMessages.shortNumbersNotAvailable]:
    'Sending SMS to short numbers is not available.',
} as const;

// @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
// @key: @#@"[messageSenderMessages.sendError]"@#@ @source: @#@"Something wrong happened when send message."@#@
// @key: @#@"[messageSenderMessages.numberValidateError]"@#@ @source: @#@"Phone Number Validate Error."@#@
// @key: @#@"[messageSenderMessages.textEmpty]"@#@ @source: @#@"Please enter the text to be sent."@#@
// @key: @#@"[messageSenderMessages.noPermission]"@#@ @source: @#@"You have no permission to send message."@#@
// @key: @#@"[messageSenderMessages.senderEmpty]"@#@ @source: @#@"You must select a number from your phone numbers to send"@#@
// @key: @#@"[messageSenderMessages.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[messageSenderMessages.recipientsEmpty]"@#@ @source: @#@"Please enter a valid receiver number."@#@
// @key: @#@"[messageSenderMessages.textTooLong]"@#@ @source: @#@"You can enter up to 1,000 characters."@#@
// @key: @#@"[messageSenderMessages.multipartTextTooLong]"@#@ @source: @#@"You can enter up to 5,000 characters."@#@
// @key: @#@"[messageSenderMessages.recipientNumberInvalids]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[messageSenderMessages.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[messageSenderMessages.specialNumber]"@#@ @source: @#@"Sending text to emergency/special service numbers is not supported."@#@
// @key: @#@"[messageSenderMessages.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[messageSenderMessages.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[messageSenderMessages.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[messageSenderMessages.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[messageSenderMessages.senderNumberInvalid]"@#@ @source: @#@"A valid Phone Number is required to send text message to recipients outside of your company, Please contact your Administrator to add a direct number to your account."@#@
// @key: @#@"[messageSenderMessages.notSmsToExtension]"@#@ @source: @#@"Cannot send to an extension number with main phone number. If you want to send to an extension number, please just enter extension number."@#@
// @key: @#@"[messageSenderMessages.internationalSMSNotSupported]"@#@ @source: @#@"Sending SMS to international phone number is not supported."@#@
// @key: @#@"[messageSenderMessages.noInternalSMSPermission]"@#@ @source: @#@"You don't have permission to send messages. Please contact your {brand} account administrator for upgrade."@#@
// @key: @#@"[messageSenderMessages.noSMSPermission]"@#@ @source: @#@"You don't have permission to send messages to recipients outside of your organization."@#@
// @key: @#@"[messageSenderMessages.attachmentCountLimitation]"@#@ @source: @#@"Can't be more than 10 attachments per message"@#@
// @key: @#@"[messageSenderMessages.attachmentSizeLimitation]"@#@ @source: @#@"The over all attachment size can't be larger than 1.5 MB per message."@#@
// @key: @#@"[messageSenderMessages.noAttachmentToExtension]"@#@ @source: @#@"It isn't supported to send MMS to an extension."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"[messageSenderMessages.sending]"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@
// @key: @#@"[messageSenderMessages.shortNumbersNotAvailable]"@#@ @source: @#@"Sending SMS to short numbers is not available."@#@
