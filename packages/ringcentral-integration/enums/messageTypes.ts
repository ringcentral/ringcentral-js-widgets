export const messageTypes = {
  all: 'All',
  fax: 'Fax',
  sms: 'SMS',
  voiceMail: 'VoiceMail',
  pager: 'Pager',
  text: 'Text',
} as const;

export default messageTypes;

export type MessageTypes = (typeof messageTypes)[keyof typeof messageTypes];
