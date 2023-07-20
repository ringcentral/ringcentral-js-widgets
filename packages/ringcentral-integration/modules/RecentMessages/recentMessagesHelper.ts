import type GetMessageInfoResponse from '@rc-ex/core/lib/definitions/GetMessageInfoResponse';
import type GetMessageList from '@rc-ex/core/lib/definitions/GetMessageList';

import type { Entity } from '../../interfaces/Entity.interface';
import type { Message } from '../../interfaces/MessageStore.model';
import type { MessageStoreItem } from '../MessageStore';
import type { RecentMessage } from './RecentMessages.interface';

export const filterPhoneNumber = (message: MessageStoreItem) => {
  return ({ phoneNumber }: Entity['phoneNumbers'][number]) =>
    phoneNumber === message.from.phoneNumber ||
    !!message.to.find((to) => to.phoneNumber === phoneNumber) ||
    phoneNumber === message.from.extensionNumber ||
    !!message.to.find((to) => to.extensionNumber === phoneNumber);
};

export const flattenToMessageRecords = (allMessages: GetMessageList[]) => {
  return allMessages.reduce(
    (acc, { records }) => acc.concat(records),
    [] as GetMessageInfoResponse[],
  );
};

export const sortMessages = (recentMessages: RecentMessage[]) => {
  // Sort by time in descending order
  return recentMessages.sort(
    (a, b) =>
      new Date(b.creationTime).getTime() - new Date(a.creationTime).getTime(),
  );
};

export const markAsRemoteMessage = (messages: GetMessageInfoResponse[]) => {
  return messages.map((message) => {
    return {
      ...message,
      fromRemote: true,
    } as RecentMessage;
  });
};

export const dedup = (messages: (Message | RecentMessage)[]) => {
  const hash: Record<string, boolean> = {};
  return messages.reduce((acc, cur) => {
    if (hash[cur.id]) return acc;
    hash[cur.id] = true;
    return acc.concat(cur);
  }, []);
};
