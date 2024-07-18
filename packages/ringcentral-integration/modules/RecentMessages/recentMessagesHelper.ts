import type GetMessageInfoResponse from '@rc-ex/core/lib/definitions/GetMessageInfoResponse';
import type GetMessageList from '@rc-ex/core/lib/definitions/GetMessageList';

import type { Entity } from '../../interfaces/Entity.interface';
import type { Message } from '../../interfaces/MessageStore.model';
import type { MessageStoreItem } from '../MessageStore';

import type { RecentMessage } from './RecentMessages.interface';

export const filterPhoneNumber = (message: MessageStoreItem) => {
  // @ts-expect-error TS(2537): Type 'EntityPhoneNumberItem[] | undefined' has no ... Remove this comment to see the full error message
  return ({ phoneNumber }: Entity['phoneNumbers'][number]) =>
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    phoneNumber === message.from.phoneNumber ||
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    !!message.to.find((to) => to.phoneNumber === phoneNumber) ||
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    phoneNumber === message.from.extensionNumber ||
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    !!message.to.find((to) => to.extensionNumber === phoneNumber);
};

export const flattenToMessageRecords = (allMessages: GetMessageList[]) => {
  return allMessages.reduce(
    // @ts-expect-error TS(2769): No overload matches this call.
    (acc, { records }) => acc.concat(records),
    [] as GetMessageInfoResponse[],
  );
};

export const sortMessages = (recentMessages: RecentMessage[]) => {
  // Sort by time in descending order
  return recentMessages.sort(
    (a, b) =>
      // @ts-expect-error TS(2769): No overload matches this call.
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
    // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
    if (hash[cur.id]) return acc;
    // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
    hash[cur.id] = true;
    // @ts-expect-error TS(2769): No overload matches this call.
    return acc.concat(cur);
  }, []);
};
