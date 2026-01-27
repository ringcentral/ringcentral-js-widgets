export default {
  specialNumber:
    'Sending text to emergency/special service numbers is not supported.',
  textEmpty: 'Please enter the text to be sent.',
  textTooLong: 'You can enter up to 1,000 characters.',
  multipartTextTooLong: 'You can enter up to 5,000 characters.',
  recipientsEmpty: 'Please enter a valid receiver number.',
  senderNumberInvalid:
    'A valid Phone Number is required to send text message to recipients outside of your company, Please contact your Administrator to add a direct number to your account.',
  recipientNumberInvalids: 'Please enter a valid phone number.',
  notAnExtension: 'The extension number does not exist.',
  noAttachmentToExtension: "It isn't supported to send MMS to an extension.",
  notSmsToExtension:
    'Cannot send to an extension number with main phone number. If you want to send to an extension number, please just enter extension number.',
  shortNumbersNotAvailable: 'Sending SMS to short numbers is not available.',
  internationalSMSNotSupported:
    'Sending SMS to international phone number is not supported.',
  noInternalSMSPermission:
    "You don't have permission to send messages. Please contact your {brand} account administrator for upgrade.",
  sendError: 'Something wrong happened when send message.',
} as const;
