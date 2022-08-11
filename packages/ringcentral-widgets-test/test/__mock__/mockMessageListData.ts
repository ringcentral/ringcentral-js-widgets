import messageListBody from '@ringcentral-integration/commons/integration-test/mock/data/messageList.json';
import {
  GetMessageSyncResponse,
  GetMessageInfoResponse,
} from '@ringcentral-integration/mock';
import { v4 as uuidV4 } from 'uuid';

const messageItem = messageListBody.records[0];

type MessageItemProps = typeof messageItem;

export type MessageListData = {
  records: MessageItemProps[];
};

export type IGenerateMessageRecordProps = Partial<GetMessageInfoResponse> & {
  toNumber?: string;
  toName?: string;
  fromNumber?: string;
  fromName?: string;
  toNumbers?: string[];
};

export const generateMessageRecord = (
  options: Partial<IGenerateMessageRecordProps> = {},
) => {
  const {
    id,
    creationTime,
    type = 'Text',
    readStatus = 'Unread',
    direction = 'Inbound',
    toNumber = '101',
    toName = 'ac New11',
    fromNumber = '101',
    fromName = 'Something1 New1',
    conversationId,
    toNumbers,
    ...rest
  } = options;

  const timeStamp = uuidV4();
  const messageId = id || timeStamp;

  const to = toNumbers
    ? toNumbers.map((number) => ({
        phoneNumber: number,
        name: toName,
      }))
    : [
        {
          phoneNumber: toNumber,
          name: toName,
        },
      ];
  return {
    ...messageItem,
    ...rest,
    direction,
    to,
    from: {
      extensionNumber: fromNumber,
      name: fromName,
    },
    type,
    readStatus,
    id: messageId,
    conversationId: conversationId || messageId,
    conversation: {
      id: conversationId || messageId,
    },
    messageStatus: direction === 'Inbound' ? 'Received' : 'Sent',
    creationTime: creationTime || new Date().toISOString(),
    lastModifiedTime: new Date().toISOString(),
  };
};

export const mockMessageListData = (
  item: Partial<MessageItemProps> | Partial<MessageItemProps>[] | null,
) => {
  if (item === null) {
    return {
      records: {},
    };
  }

  if (Array.isArray(item)) {
    const records = item.map((val: Partial<MessageItemProps>, index) =>
      generateMessageRecord({
        ...val,
        id: val.id ? val.id : new Date().getTime() + index,
      }),
    );
    return {
      records,
    };
  }

  return {
    records: [generateMessageRecord(item)],
  };
};

export const generateMessageRecords = ({
  direction,
  type,
  readStatus,
  phoneNumberList,
  conversationId,
}: Partial<MessageItemProps> & {
  phoneNumberList: Array<string>;
}) => {
  const records = [];
  for (let i = 0; i < phoneNumberList.length; i++) {
    const record = {
      direction,
      type,
      readStatus,
      conversationId,
    };
    if (direction === 'Inbound') {
      record.fromNumber = phoneNumberList[i];
    } else {
      record.toNumber = phoneNumberList[i];
    }
    records.push(record);
  }
  return records;
};
interface ModifyMessageStatusProps {
  count: number;
  messageListData: GetMessageSyncResponse;
  change: {
    key: Partial<MessageItemProps>;
    value: Partial<MessageItemProps>;
  };
}
export const modifyMessageStatus = ({
  count,
  change: { key, value },
  messageListData,
}: ModifyMessageStatusProps) => {
  const { records } = messageListData;
  for (let i = 0; i < count; i++) {
    records[i] = {
      ...records[i],
      [key]: value,
    };
  }
  return messageListData;
};

interface IGeneratePhoneNumberList {
  count: number;
}
export const generatePhoneNumberList = ({
  count,
}: IGeneratePhoneNumberList) => {
  const phoneNumberList = [];
  for (let i = 0; i < count; i++) {
    const suffix = i < 10 ? `0${i}` : i;
    const phoneNumber = `+165098074${suffix}`;
    phoneNumberList.push(phoneNumber);
  }
  return phoneNumberList;
};
