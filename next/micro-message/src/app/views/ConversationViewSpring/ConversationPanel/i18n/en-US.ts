export default {
  dncAlert: 'This contact is on a Do Not Call list.',
  optOutAlert: 'The recipient has opted out.',
  readOnlyConversationPrefix: 'This conversation is read-only.',
  smsNotEnabledAlert:
    'Text messaging is not yet enabled for this account. Please contact your company admin for more information.',
  smsNoNumberAvailableAlert:
    "Your number(s) can't send or receive texts until it's been registered with US carriers by a company admin.",
  smsReceiveOnlyNumberAlert:
    "Your number(s) are set to receive incoming text messages. You can't send or reply to texts.",
  learnMore: 'Learn more',
  smsCapabilityAlert:
    'This conversation is read-only. Your number {phoneNumber} must be registered by an admin to send texts.',
  saveLog: 'Save log',
  viewInCrm: 'View in {crmName}',
  createLog: 'Create log',
  insertOptOut: 'Insert opt-out',
  removeOptOut: 'Remove opt-out',
  movedToSharedTabAlert:
    'Texting from the number {phoneNumber} has been moved to Shared tab.',
  replyInSharedTab: 'Reply in Shared tab',
  smsConsentRequired:
    'Sending messages requires recipients to have given consent to receive messages.',
  smsConsentRequiredMultipleTitle: 'Message blocked',
  smsConsentRequiredMultiple:
    'Texting to recipients who have not opted in is blocked by your admin.',
  addConsent: 'Add consent',
  sharedSmsLogReminder:
    'Make sure to log your messages prior to resolving the conversation',
  noAccessToSendFromNumber:
    'You no longer have access to send from this number.',
} as const;
