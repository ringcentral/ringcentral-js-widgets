import { transferTypes } from '../../../enums/transferTypes';

export default {
  callRecipient: 'Call recipient',
  phoneNumber: 'Phone number',
  callRecipientName: 'Call recipient name',
  callRecipientNumber: 'Call recipient number',
  enterThePhoneNumberPlaceholder: 'Enter the phone number',
  callRecipientNamePlaceholder: 'Please select',
  callRecipientNumberPlaceholder: 'None',
  queueGroup: 'Queue group',
  queueDetail: 'Queue',
  [transferTypes.internal]: 'Internal transfer',
  [transferTypes.phoneBook]: 'Phone book transfer',
  [transferTypes.manualEntry]: 'Enter a number',
  [transferTypes.queue]: 'Queue transfer',
} as const;
