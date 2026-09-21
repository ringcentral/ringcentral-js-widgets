import type { Client } from '@ringcentral-integration/micro-auth/src/app/services';

import { MessageStoreBase } from '../../src/app/services/MessageStore/MessageStoreBase';

const createMessageStore = () => {
  const list = jest.fn().mockResolvedValue({
    records: [],
    syncInfo: {
      olderRecordsExist: false,
    },
  });
  const client = {
    account: jest.fn(() => ({
      extension: jest.fn(() => ({
        messageSync: jest.fn(() => ({
          list,
        })),
      })),
    })),
  } as unknown as jest.Mocked<Client>;
  const messageStore = Object.assign(
    Object.create(MessageStoreBase.prototype),
    {
      _client: client,
      _fSyncRequestParams: {
        owner: 'Shared',
        messageType: 'SMS',
      },
    },
  ) as MessageStoreBase;

  return {
    list,
    messageStore,
  };
};

describe('MessageStoreBase', () => {
  it('applies custom request parameters only to FSync', async () => {
    const { list, messageStore } = createMessageStore();

    await messageStore._syncFunction({
      recordCount: 250,
      conversationLoadLength: 100,
    });
    await messageStore._syncFunction({
      syncToken: 'ISync',
    });

    expect(list).toHaveBeenNthCalledWith(1, {
      messageType: 'SMS',
      owner: 'Shared',
      recordCount: 250,
      recordCountPerConversation: 100,
      syncType: 'FSync',
    });
    expect(list).toHaveBeenNthCalledWith(2, {
      syncToken: 'ISync',
      syncType: 'ISync',
    });
  });
});
