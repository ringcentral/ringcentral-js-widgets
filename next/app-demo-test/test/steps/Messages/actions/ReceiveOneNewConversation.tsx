import { MessageStore } from '@ringcentral-integration/micro-message/src/app/services';
import type {
  GetMessageInfoResponse,
  GetMessageSyncResponse,
} from '@ringcentral-integration/mock';
import type { StepFunction } from '@ringcentral-integration/test-utils';

type ReceiveOneNewSmsProps = {
  direction?: 'Inbound' | 'Outbound';
  type?: GetMessageInfoResponse['type'];
  repeat?: number;
  waitSuccess?: boolean;
  conversationId?: number;
  getRecords?: (
    mockData: GetMessageSyncResponse,
  ) => GetMessageSyncResponse['records'];
  fromNumber?: string;
  toNumber?: string;
};

export const ReceiveOneNewSms: StepFunction<ReceiveOneNewSmsProps> = async (
  {
    fromNumber = '101',
    toNumber = '101',
    direction = 'Inbound',
    getRecords: _getRecords,
    type = 'SMS',
    repeat = 0,
    waitSuccess = false,
    conversationId: _conversationId,
  },
  { rcMock, app },
) => {
  const messageStore = app.container.got(MessageStore)!;
  const getRecords =
    _getRecords ||
    ((mockData: GetMessageSyncResponse) => {
      const firstRecord = mockData.records[0];
      return [
        {
          ...firstRecord,
          messageStatus: type === 'Fax' ?  'Sent' : firstRecord.messageStatus,
          direction,
          from: {
            ...firstRecord.from,
            phoneNumber: fromNumber,
            extensionNumber: fromNumber,
          },
          to: [{ ...firstRecord.to[0], extensionNumber: toNumber }],
          type,
          conversationId: _conversationId || firstRecord.conversationId,
          conversation: {
            ...firstRecord.conversation,
            id:
              _conversationId?.toString() ||
              firstRecord.conversationId.toString(),
          },
        },
      ];
    });
  await rcMock.receiveMessage(
    {
      message: 'receive a message',
      repeat,
    },
    (mockData) => ({
      ...mockData,
      records: getRecords(mockData),
    }),
  );
  if (waitSuccess) {
    await new Promise((resolve) => {
      messageStore.onMessageUpdated(() => {
        resolve(true);
      });
    });
  }
};
