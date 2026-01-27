/* eslint-disable */
export default {
  to: 'To',
  from: 'From',
  ext: 'Ext.',
  myCallerId: 'My caller ID',
  callerId: 'Caller ID',
  unknownNumber: 'Unknown',
  Inbound: 'Incoming call',
  Outbound: 'Outgoing call',
  activeCall: 'Active call',
  otherDevice: 'On another device',
  onHold: 'On hold',
  day: 'day',
  hr: 'hr',
  min: 'min',
  sec: 'sec',
  yesterday: 'Yesterday',
  notes: 'AI notes',
  logged: 'Logged',
  unlogged: 'Unlogged',
  answeredBy: 'Answered by',
  conferenceCall: 'Conference Call',
  copyNumberSuccess: 'Number copied',
  // #region call status
  '911': '999/112',
  '933': '933',
  Abandoned: 'Abandoned',
  Accepted: 'Accepted',
  'Answered Not Accepted': 'Answered not accepted',
  Blocked: 'Blocked',
  Busy: 'Busy',
  'Call Failed': 'Call failed',
  'Call Failure': 'Call failure',
  'Call connected': 'Call connected',
  'Carrier is not active': 'Mobile network is not active',
  Declined: 'Declined',
  'EDGE trunk misconfigured': 'EDGE trunk misconfigured',
  'Fax Not Sent': 'Fax Not Sent',
  'Fax Partially Sent': 'Fax Partially Sent',
  'Fax Poor Line': 'Fax Poor Line',
  'Fax Receipt Error': 'Fax receipt error',
  'Fax on Demand': 'Fax on demand',
  'Hang Up': 'Hang Up',
  'IP Phone Offline': 'IP Phone Offline',
  'In Progress': 'In Progress',
  'Internal Error': 'Internal Error',
  'International Disabled': 'International Disabled',
  'International Restricted': 'International Restricted',
  Missed: 'Missed',
  'No Answer': 'No Answer',
  'No Calling Credit': 'No Calling Credit',
  'Not Allowed': 'Not Allowed',
  'Partial Receive': 'Partially Received',
  'Phone Login': 'Phone login',
  'Receive Error': 'Receive Error',
  Received: 'Received',
  Rejected: 'Rejected',
  Reply: 'Reply',
  'Restricted Number': 'Restricted Number',
  'Send Error': 'Send error',
  Sent: 'Sent',
  'Sent to Voicemail': 'Send to Voicemail',
  Stopped: 'Stopped',
  'Suspended account': 'Suspended account',
  Unknown: 'Unknown',
  Voicemail: 'Voicemail',
  'Wrong Number': 'Wrong number',
  // some fields are not in the platform list
  'Answered Elsewhere': 'Answered elsewhere',
  'Ringing Elsewhere': 'Ringing elsewhere',
  'Fax Send Error': 'Fax send error',
  Account: 'Account',
  'Call accepted': 'Call accepted',
  'Hang up': 'Hang up',
  'International Restriction': 'International restriction',
  'No fax machine': 'No fax machine',
  'Partially Sent': 'Partially sent',
  'Poor Line Quality': 'Poor line quality',
  ResultEmpty: 'empty',
  ResultInProgress: 'In Progress',
  Suspended: 'Suspended',
  'Fax Receipt': 'Fax receipt',
  'Suspended Account': 'Suspended account',
  Disconnected: 'Disconnected',
  multiMatchesContactName: '{name} and {count} more',
  // #endregion call status
  matches: '{numberOfMatches} matches',
  maybe: 'Maybe: {contactName}',
  optedOut: 'Recipient has opted out.',
  optOutAlertTooltip:
    'The recipient must opt back in to receive texts from this number.',
} as const;

// @key: @#@"to"@#@ @source: @#@"To"@#@
// @key: @#@"from"@#@ @source: @#@"From"@#@
// @key: @#@"ext"@#@ @source: @#@"Ext."@#@
// @key: @#@"myCallerId"@#@ @source: @#@"My caller ID"@#@
// @key: @#@"callerId"@#@ @source: @#@"Caller ID"@#@
// @key: @#@"unknownNumber"@#@ @source: @#@"Unknown"@#@
// @key: @#@"Inbound"@#@ @source: @#@"Incoming call"@#@
// @key: @#@"Outbound"@#@ @source: @#@"Outgoing call"@#@
// @key: @#@"activeCall"@#@ @source: @#@"Active call"@#@
// @key: @#@"otherDevice"@#@ @source: @#@"On other device"@#@
// @key: @#@"onHold"@#@ @source: @#@"On hold"@#@
// @key: @#@"day"@#@ @source: @#@"day"@#@
// @key: @#@"hr"@#@ @source: @#@"hr"@#@
// @key: @#@"min"@#@ @source: @#@"min"@#@
// @key: @#@"sec"@#@ @source: @#@"sec"@#@
// @key: @#@"yesterday"@#@ @source: @#@"Yesterday"@#@
// @key: @#@"notes"@#@ @source: @#@"AI notes"@#@
// @key: @#@"logged"@#@ @source: @#@"Logged"@#@
// @key: @#@"unlogged"@#@ @source: @#@"Unlogged"@#@
// @key: @#@"answeredBy"@#@ @source: @#@"Answered by"@#@
// @key: @#@"conferenceCall"@#@ @source: @#@"Conference Call"@#@
// @key: @#@"copyNumberSuccess"@#@ @source: @#@"Number copied"@#@
// @key: @#@"'911'"@#@ @source: @#@"911"@#@
// @key: @#@"'933'"@#@ @source: @#@"933"@#@
// @key: @#@"Abandoned"@#@ @source: @#@"Abandoned"@#@
// @key: @#@"Accepted"@#@ @source: @#@"Accepted"@#@
// @key: @#@"'Answered Not Accepted'"@#@ @source: @#@"Answered Not Accepted"@#@
// @key: @#@"Blocked"@#@ @source: @#@"Blocked"@#@
// @key: @#@"Busy"@#@ @source: @#@"Busy"@#@
// @key: @#@"'Call Failed'"@#@ @source: @#@"Call Failed"@#@
// @key: @#@"'Call Failure'"@#@ @source: @#@"Call Failure"@#@
// @key: @#@"'Call connected'"@#@ @source: @#@"Call connected"@#@
// @key: @#@"'Carrier is not active'"@#@ @source: @#@"Carrier is not active"@#@
// @key: @#@"Declined"@#@ @source: @#@"Declined"@#@
// @key: @#@"'EDGE trunk misconfigured'"@#@ @source: @#@"EDGE trunk misconfigured"@#@
// @key: @#@"'Fax Not Sent'"@#@ @source: @#@"Fax Not Sent"@#@
// @key: @#@"'Fax Partially Sent'"@#@ @source: @#@"Fax Partially Sent"@#@
// @key: @#@"'Fax Poor Line'"@#@ @source: @#@"Fax Poor Line"@#@
// @key: @#@"'Fax Receipt Error'"@#@ @source: @#@"Fax Receipt Error"@#@
// @key: @#@"'Fax on Demand'"@#@ @source: @#@"Fax on Demand"@#@
// @key: @#@"'Hang Up'"@#@ @source: @#@"Hang Up"@#@
// @key: @#@"'IP Phone Offline'"@#@ @source: @#@"IP Phone Offline"@#@
// @key: @#@"'In Progress'"@#@ @source: @#@"In Progress"@#@
// @key: @#@"'Internal Error'"@#@ @source: @#@"Internal Error"@#@
// @key: @#@"'International Disabled'"@#@ @source: @#@"International Disabled"@#@
// @key: @#@"'International Restricted'"@#@ @source: @#@"International Restricted"@#@
// @key: @#@"Missed"@#@ @source: @#@"Missed"@#@
// @key: @#@"'No Answer'"@#@ @source: @#@"No Answer"@#@
// @key: @#@"'No Calling Credit'"@#@ @source: @#@"No Calling Credit"@#@
// @key: @#@"'Not Allowed'"@#@ @source: @#@"Not Allowed"@#@
// @key: @#@"'Partial Receive'"@#@ @source: @#@"Partial Receive"@#@
// @key: @#@"'Phone Login'"@#@ @source: @#@"Phone Login"@#@
// @key: @#@"'Receive Error'"@#@ @source: @#@"Receive Error"@#@
// @key: @#@"Received"@#@ @source: @#@"Received"@#@
// @key: @#@"Rejected"@#@ @source: @#@"Rejected"@#@
// @key: @#@"Reply"@#@ @source: @#@"Reply"@#@
// @key: @#@"'Restricted Number'"@#@ @source: @#@"Restricted Number"@#@
// @key: @#@"'Send Error'"@#@ @source: @#@"Send Error"@#@
// @key: @#@"Sent"@#@ @source: @#@"Sent"@#@
// @key: @#@"'Sent to Voicemail'"@#@ @source: @#@"Sent to Voicemail"@#@
// @key: @#@"Stopped"@#@ @source: @#@"Stopped"@#@
// @key: @#@"'Suspended account'"@#@ @source: @#@"Suspended account"@#@
// @key: @#@"Unknown"@#@ @source: @#@"Unknown"@#@
// @key: @#@"Voicemail"@#@ @source: @#@"Voicemail"@#@
// @key: @#@"'Wrong Number'"@#@ @source: @#@"Wrong Number"@#@
// @key: @#@"'Answered Elsewhere'"@#@ @source: @#@"Answered elsewhere"@#@
// @key: @#@"'Ringing Elsewhere'"@#@ @source: @#@"Ringing elsewhere"@#@
// @key: @#@"'Fax Send Error'"@#@ @source: @#@"Fax Send Error"@#@
// @key: @#@"Account"@#@ @source: @#@"Account"@#@
// @key: @#@"'Call accepted'"@#@ @source: @#@"Call accepted"@#@
// @key: @#@"'Hang up'"@#@ @source: @#@"Hang up"@#@
// @key: @#@"'International Restriction'"@#@ @source: @#@"International Restriction"@#@
// @key: @#@"'No fax machine'"@#@ @source: @#@"No fax machine"@#@
// @key: @#@"'Partially Sent'"@#@ @source: @#@"Partially Sent"@#@
// @key: @#@"'Poor Line Quality'"@#@ @source: @#@"Poor Line Quality"@#@
// @key: @#@"ResultEmpty"@#@ @source: @#@"empty"@#@
// @key: @#@"ResultInProgress"@#@ @source: @#@"In Progress"@#@
// @key: @#@"Suspended"@#@ @source: @#@"Suspended"@#@
// @key: @#@"'Fax Receipt'"@#@ @source: @#@"Fax Receipt"@#@
// @key: @#@"'Suspended Account'"@#@ @source: @#@"Suspended Account"@#@
// @key: @#@"Disconnected"@#@ @source: @#@"Disconnected"@#@
// @key: @#@"multiMatchesContactName"@#@ @source: @#@"{name} and {count} more"@#@
// @key: @#@"matches"@#@ @source: @#@"{numberOfMatches} matches"@#@
// @key: @#@"maybe"@#@ @source: @#@"Maybe: {contactName}"@#@
// @key: @#@"optedOut"@#@ @source: @#@"Recipient has opted out."@#@

// @key: @#@"optOutAlertTooltip"@#@ @source: @#@"The recipient must opt back in to receive texts from this number."@#@
