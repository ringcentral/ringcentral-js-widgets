import type {
  GetMessageInfoResponse,
  GetMessageSyncResponse,
} from '@ringcentral-integration/mock';

import type { StepFunction } from '../../../lib/step';

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
  { rcMock, phone },
) => {
  const getRecords =
    _getRecords ||
    ((mockData: GetMessageSyncResponse) => {
      const firstRecord = mockData.records[0];
      return [
        {
          ...firstRecord,
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
          // by default, set record to delivered
          messageStatus: 'Delivered',
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
      phone.messageStore.onMessageUpdated(() => {
        resolve(true);
      });
    });
  }
};
