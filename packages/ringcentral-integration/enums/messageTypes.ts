import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const messageTypes = ObjectMap.fromObject({
  all: 'All',
  fax: 'Fax',
  sms: 'SMS',
  voiceMail: 'VoiceMail',
  pager: 'Pager',
  text: 'Text',
} as const);

export default messageTypes;
