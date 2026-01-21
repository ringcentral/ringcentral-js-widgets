import type GetMessageInfoResponse from '@rc-ex/core/lib/definitions/GetMessageInfoResponse';
import type { GetMessageSyncResponse } from '@ringcentral-integration/mock';
import dayjs from 'dayjs';

export const createMockTextResponse = (
  count = 1,
  overrides: Partial<GetMessageInfoResponse>[] = [],
): GetMessageSyncResponse => {
  if (count === 0) {
    return {
      uri: 'restapi/v1.0/account/~/extension/~/message-sync',
      records: [],
      syncInfo: {
        syncType: 'FSync',
        syncToken:
          'AQEAAAAAAwAAAYE6E3pgBgAAAPoFAAABgvvRwV4TABYAAAAyCAAAAAAJLcMUCQEKARkAAAGC-9HJL6kUvuk',
        syncTime: new Date().toISOString(),
        olderRecordsExist: false,
      },
    };
  }

  const now = dayjs();
  const data: any[] = [];
  for (let i = 0; i < count; i++) {
    const {
      creationTime,
      direction,
      messageStatus,
      readStatus,
      attachments,
      conversation,
      conversationId,
      from,
      to,
      type,
      id = `209390500` + i,
      subject = 'Testyooo',
      ...rest
    } = overrides[i] || {};

    const dir = direction || 'Outbound';
    const defaultMsgStatus = dir === 'Inbound' ? 'Received' : 'Sent';

    const caller =
      dir === 'Inbound'
        ? {
            from: {
              location: 'Clinton, IA',
              ...{
                name: 'John Doe701',
                phoneNumber: '+15632412226',
                ...from,
              },
            },
            to: to || [
              {
                name: 'System New',
                phoneNumber: '+17204084363',
                location: 'Brighton, CO',
              },
            ],
          }
        : {
            from: {
              location: 'Clinton, IA',
              ...(from || {
                name: 'System New',
                phoneNumber: '+17204084363',
                location: 'Brighton, CO',
              }),
            },
            to: to || [
              {
                name: 'John Doe701',
                phoneNumber: '+15632412226',
              },
            ],
          };

    const randomConversationId = Date.now() + 10 * Math.random();

    data.push({
      uri: 'https://api-rcapps-xmnuplabs_domain/restapi/v1.0/account/153994004/extension/153994004/message-store/2093905004',
      id,
      subject,
      ...caller,
      type,
      priority: 'Normal',
      availability: 'Alive',
      direction: dir,
      messageStatus: messageStatus ?? defaultMsgStatus,
      lastModifiedTime:
        (creationTime && dayjs(creationTime).add(5, 'minutes')) ||
        now.subtract(i + 5, 'minutes').toISOString(),
      creationTime: creationTime || now.subtract(i, 'minutes').toISOString(),
      readStatus: readStatus || 'Unread',
      conversationId: conversationId || randomConversationId,
      conversation: conversation || {
        id: conversationId || randomConversationId,
        uri: `https://api-rcapps-xmnuplabs_domain/restapi/v1.0/conversation/${
          conversationId || randomConversationId
        }`,
      },
      attachments: attachments?.map((it, idx) => ({
        id: `1000` + idx,
        type: 'Text',
        contentType: 'text/plain',
        ...it,
      })) || [
        {
          id: 2195977004,
          uri: 'https://api-xmrupxmn.intlabs_domain/restapi/v1.0/account/608207004/extension/608209004/message-store/2195977004/content/2195977004',
          type: 'Text',
          contentType: 'text/plain',
        },
      ],
      ...rest,
    });
  }
  // uri: 'restapi/v1.0/account/~/extension/~/message-sync?recordCountPerConversation=50&syncType=FSync&recordCount=500&dateFrom=2022-06-18T07%3A51%3A48.184Z&messageType=SMS&messageType=VoiceMail&messageType=Pager&messageType=Text',
  return {
    uri: 'restapi/v1.0/account/~/extension/~/message-sync',
    records: data,
    syncInfo: {
      syncType: 'FSync',
      syncToken:
        'AQEAAAAAAwAAAYE6E3pgBgAAAPoFAAABgvvRwV4TABYAAAAyCAAAAAAJLcMUCQEKARkAAAGC-9HJL6kUvuk',
      syncTime: new Date().toISOString(),
      olderRecordsExist: false,
    },
  };
};
