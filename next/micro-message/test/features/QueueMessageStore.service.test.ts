import type {
  AppFeatures,
  Auth,
  Client,
  ConnectivityMonitor,
  DataFetcher,
} from '@ringcentral-integration/micro-auth/src/app/services';
import type { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import type {
  CallQueues,
  Grant,
} from '@ringcentral-integration/micro-phone/src/app/services';
import type { PortManager } from '@ringcentral-integration/next-core';
import { of } from 'rxjs';

import type { MessageStoreEventSubscriber } from '../../src/app/services/MessageStoreEventSubscriber';
import type {
  QueueConversationsOptions,
  QueueMessageStoreOptions,
} from '../../src/app/services/QueueConversations/QueueConversations.interface';
import { QueueMessageStore } from '../../src/app/services/QueueConversations/QueueMessageStore';

const createQueueMessageStore = ({
  hasReadTextPermission = true,
  shared = true,
  queueConversationsOptions,
  queueMessageStoreOptions,
}: {
  hasReadTextPermission?: boolean;
  shared?: boolean;
  queueConversationsOptions?: QueueConversationsOptions;
  queueMessageStoreOptions?: QueueMessageStoreOptions;
} = {}) => {
  let serverCallback: (() => void) | undefined;
  const dataFetcher = {
    ready$: of(true),
    register: jest.fn(),
  } as unknown as jest.Mocked<DataFetcher>;
  const grant = {
    ready: true,
    grants: [
      {
        extension: { id: 'q2', type: 'Department' },
        callQueueSmsRecipient: true,
      },
      {
        extension: { id: 'q1', type: 'Department' },
        callQueueSmsRecipient: true,
      },
      {
        extension: { id: 'q3', type: 'Department' },
        callQueueSmsRecipient: false,
      },
      {
        extension: { id: 'user-1', type: 'User' },
        callQueueSmsRecipient: true,
      },
    ],
  } as unknown as jest.Mocked<Grant>;
  const appFeatures = {
    ready: true,
    hasReadTextPermission,
  } as unknown as jest.Mocked<AppFeatures>;
  const portManager = {
    shared,
    onServer: jest.fn((callback: () => void) => {
      serverCallback = callback;
    }),
  } as unknown as jest.Mocked<PortManager>;
  const store = new QueueMessageStore(
    {} as Toast,
    {} as Auth,
    {} as Client,
    dataFetcher,
    {} as ConnectivityMonitor,
    {} as MessageStoreEventSubscriber,
    appFeatures,
    grant,
    { ready: true } as CallQueues,
    portManager,
    undefined,
    undefined,
    undefined,
    queueMessageStoreOptions,
    queueConversationsOptions,
  );

  return {
    store,
    mocks: {
      appFeatures,
      dataFetcher,
      grant,
      portManager,
      runServerCallback: () => serverCallback?.(),
    },
  };
};

describe('QueueMessageStore', () => {
  it('registers main-tab initialization and exposes eligible queue permissions', () => {
    const { store, mocks } = createQueueMessageStore();

    expect(mocks.dataFetcher.register).toHaveBeenCalledTimes(1);
    expect(mocks.portManager.onServer).toHaveBeenCalledTimes(1);
    expect(store.eligibleGrantIds).toEqual(['q1', 'q2']);
    expect(store._hasPermission).toBe(true);
    expect((store as any)._readyCheck).toBe(true);
    expect((store as any)._shouldHandleInstantMessageEvent).toBe(false);
    expect((store as any)._shouldHandleMessageStoreEvent).toBe(false);

    mocks.runServerCallback();
  });

  it('initializes directly in a non-shared tab without read permission', () => {
    const { store, mocks } = createQueueMessageStore({
      hasReadTextPermission: false,
      shared: false,
    });

    expect(mocks.portManager.onServer).not.toHaveBeenCalled();
    expect(store._hasPermission).toBe(false);
    expect((store as any)._readyCheck).toBe(true);
  });

  it('disables permission when queueConversationsOptions.enable is false', () => {
    const { store } = createQueueMessageStore({
      queueConversationsOptions: { enable: false },
    });

    expect(store._hasPermission).toBe(false);
  });

  it('disables permission when queueMessageStoreOptions.enable is false', () => {
    const { store } = createQueueMessageStore({
      queueMessageStoreOptions: { enable: false },
    });

    expect(store._hasPermission).toBe(false);
  });
});
