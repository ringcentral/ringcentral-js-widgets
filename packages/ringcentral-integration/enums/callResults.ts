import type { ObjectMapKey } from '@ringcentral-integration/core/lib/ObjectMap';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const callResults = ObjectMap.fromObject({
  IPPhoneOffline: 'IP Phone Offline',
  abandoned: 'Abandoned',
  account: 'Account',
  blocked: 'Blocked',
  busy: 'Busy',
  callAccepted: 'Call accepted',
  accepted: 'Accepted',
  callConnected: 'Call connected',
  callFailed: 'Call Failed',
  callFailure: 'Call Failure',
  declined: 'Declined',
  faxOnDemand: 'Fax on Demand',
  faxReceiptError: 'Fax Receipt Error',
  faxSendError: 'Fax Send Error',
  hangUp: 'Hang up',
  HangUp: 'Hang Up', // The Platform not only returns 'Hang up' but alse 'Hang Up', So we add two Key
  internalError: 'Internal Error',
  internationalDisabled: 'International Disabled',
  internationalRestriction: 'International Restriction',
  missed: 'Missed',
  noAnswer: 'No Answer',
  noFaxMachine: 'No fax machine',
  partialReceive: 'Partial Receive',
  partiallySent: 'Partially Sent',
  poorLineQuality: 'Poor Line Quality',
  receiveError: 'Receive Error',
  received: 'Received',
  rejected: 'Rejected',
  reply: 'Reply',
  restrictedNumber: 'Restricted Number',
  resultEmpty: 'ResultEmpty',
  resultInProgress: 'ResultInProgress',
  sendError: 'Send Error',
  sent: 'Sent',
  stopped: 'Stopped',
  suspended: 'Suspended',
  unknown: 'Unknown',
  voicemail: 'Voicemail',
  wrongNumber: 'Wrong Number',
  faxReceipt: 'Fax Receipt',
  suspendedAccount: 'Suspended Account',
  disconnected: 'Disconnected',
  notAllowed: 'Not Allowed',
} as const);

export type CallResultsKey = ObjectMapKey<typeof callResults>;
export type CallResultsValue = (typeof callResults)[CallResultsKey];

export default callResults;
