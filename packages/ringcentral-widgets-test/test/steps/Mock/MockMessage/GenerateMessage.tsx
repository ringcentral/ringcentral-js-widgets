import type messageSyncBody from '@ringcentral-integration/mock/src/platform/data/messageSync.json';

import fax from './MockMessageRecords/fax.json';
import voiceMail from './MockMessageRecords/voicemail.json';
import sms from './MockMessageRecords/sms.json';

type MessageRecord = typeof messageSyncBody.records[0];

const message = {
  Fax: fax,
  VoiceMail: voiceMail,
  SMS: sms,
};

export const generateMessage = ({
  length = 1,
  mockRecords = [],
  unreadCount = 0,
  type = 'SMS',
  id,
}: {
  length?: number;
  mockRecords?: MessageRecord[];
  unreadCount?: number;
  type?: 'SMS' | 'Fax' | 'VoiceMail';
  id?: number;
}) => {
  const messages: MessageRecord[] = [];

  const templateRecord = message[type];

  for (let i = 0; i < length; i++) {
    messages.push({
      ...templateRecord,
      // 5475922005
      id: id || Math.floor(Math.random() * 10e10),
      startTime: new Date().toISOString(),
      readStatus: i < unreadCount ? 'Unread' : 'Read',
      ...mockRecords[i],
    });
  }

  return messages;
};
