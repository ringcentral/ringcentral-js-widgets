import { CallQueues } from '../../src/app/services/CallQueues/CallQueues';

const createCallQueues = ({
  callQueuePickupAvailable = false,
  callQueueSmsRecipientAvailable = false,
  callQueues: callQueuesData = [],
}: {
  callQueuePickupAvailable?: boolean;
  callQueueSmsRecipientAvailable?: boolean;
  callQueues?: any[];
} = {}) => {
  const get = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({
      smsRecipients: [{ extensionNumber: '101' }],
    }),
  });
  const callQueues = Object.assign(Object.create(CallQueues.prototype), {
    logger: {
      error: jest.fn(),
    },
    _client: {
      service: {
        platform: jest.fn(() => ({
          get,
        })),
      },
    },
    _extensionFeatures: {
      features: {
        CallQueuePickup: {
          available: callQueuePickupAvailable,
        },
        CallQueueSmsRecipient: {
          available: callQueueSmsRecipientAvailable,
        },
      },
    },
    _dataFetcher: {
      getData: jest.fn(),
    },
  }) as CallQueues;
  Object.defineProperty(callQueues, 'data', {
    configurable: true,
    value: callQueuesData,
  });

  return {
    callQueues,
    mocks: {
      get,
    },
  };
};

describe('CallQueues', () => {
  it('allows call queue fetching for CallQueuePickup permission', () => {
    expect(
      (
        createCallQueues({
          callQueuePickupAvailable: true,
        }).callQueues as any
      ).callQueuePermissionCheckFunction(),
    ).toBe(true);
    expect(
      (
        createCallQueues({
          callQueuePickupAvailable: false,
        }).callQueues as any
      ).callQueuePermissionCheckFunction(),
    ).toBe(false);
  });

  it('allows call queue fetching for CallQueueSmsRecipient permission', () => {
    expect(
      (
        createCallQueues({
          callQueueSmsRecipientAvailable: true,
        }).callQueues as any
      ).callQueuePermissionCheckFunction(),
    ).toBe(true);
  });

  it('fetches call queue SMS recipients from extension endpoint', async () => {
    const { callQueues, mocks } = createCallQueues();

    await expect(
      (callQueues as any)._getCallQueuesSmsRecipients('queue-1'),
    ).resolves.toEqual([{ extensionNumber: '101' }]);

    expect(mocks.get).toHaveBeenCalledWith(
      '/restapi/v1.0/account/~/extension/queue-1/sms-recipients',
    );
  });

  it('gets call queue info from current data by id', () => {
    const { callQueues } = createCallQueues({
      callQueues: [
        { id: 'queue-1', name: 'Sales Queue' },
        { id: 'queue-2', name: 'Support Queue' },
      ],
    });

    expect(callQueues.getQueue('queue-2')).toEqual({
      id: 'queue-2',
      name: 'Support Queue',
    });
    expect(callQueues.getQueue('missing-queue')).toBeUndefined();
  });

  it('reads SMS recipient cache without queue metadata', () => {
    const { callQueues } = createCallQueues();

    callQueues.smsRecipientsCache = {
      'queue-1': {
        data: [{ extensionNumber: '101' }, { extensionNumber: '102' }],
        timestamp: Date.now(),
        loading: true,
      },
    };

    expect(callQueues.getSmsRecipients('queue-1')).toEqual([
      { extensionNumber: '101' },
      { extensionNumber: '102' },
    ]);
    expect(callQueues.getSmsRecipientsLoading('queue-1')).toBe(true);
    expect(callQueues.getSmsRecipients('missing-queue')).toEqual([]);
    expect(callQueues.getSmsRecipientsLoading('missing-queue')).toBe(false);
  });
});
