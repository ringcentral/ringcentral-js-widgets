import callResults from '@ringcentral-integration/commons/enums/callResults';
import telephonyStatuses from '@ringcentral-integration/commons/enums/telephonyStatus';
import callDirections from '@ringcentral-integration/commons/enums/callDirections';

export default {
  [callDirections.inbound]: 'Inbound',
  [callDirections.outbound]: 'Outbound',
  status: 'Status:',
  InboundNumber: 'Caller Id:',
  OutboundNumber: 'Called:',
  InboundDirection: 'Inbound from:',
  OutboundDirection: 'Outbound to:',
  [telephonyStatuses.noCall]: 'Disconnected',
  [telephonyStatuses.callConnected]: 'Connected',
  [telephonyStatuses.ringing]: 'Ringing',
  [telephonyStatuses.onHold]: 'On Hold',
  [telephonyStatuses.parkedCall]: 'Parked',
  [callResults.unknown]: 'Unknown',
  [callResults.missed]: 'Missed',
  [callResults.callAccepted]: 'Answered',
  [callResults.accepted]: 'Answered',
  [callResults.voicemail]: 'Voicemail',
  [callResults.rejected]: 'Declined',
  [callResults.reply]: 'Reply',
  [callResults.received]: 'Received',
  [callResults.faxReceiptError]: 'Fax Receipt Error',
  [callResults.faxOnDemand]: 'Fax on Demand',
  [callResults.partialReceive]: 'Partial Receive',
  [callResults.blocked]: 'Blocked',
  [callResults.callConnected]: 'Call connected',
  [callResults.noAnswer]: 'No Answer',
  [callResults.internationalDisabled]: 'International Disabled',
  [callResults.busy]: 'Busy',
  [callResults.faxSendError]: 'Fax Send Error',
  [callResults.sent]: 'Sent',
  [callResults.callFailed]: 'Call Failed',
  [callResults.internalError]: 'Internal Error',
  [callResults.IPPhoneOffline]: 'IP Phone Offline',
  [callResults.restrictedNumber]: 'Restricted Number',
  [callResults.wrongNumber]: 'Wrong Number',
  [callResults.stopped]: 'Stopped',
  [callResults.suspendedAccount]: 'Suspended Account',
  [callResults.hangUp]: 'Hung up',
  [callResults.HangUp]: 'Hung up',
  [callResults.abandoned]: 'Abandoned',
  [callResults.declined]: 'Declined',
  [callResults.faxReceipt]: 'Fax Receipt',
  [callResults.disconnected]: 'Disconnected',
  [callResults.notAllowed]: 'Not Allowed',
};
