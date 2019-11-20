import { createHashMap } from '../lib/HashMap';

const messageTypes = createHashMap({
  all: 'All',
  fax: 'Fax',
  sms: 'SMS',
  voiceMail: 'VoiceMail',
  pager: 'Pager',
  text: 'Text',
});

export default messageTypes;
