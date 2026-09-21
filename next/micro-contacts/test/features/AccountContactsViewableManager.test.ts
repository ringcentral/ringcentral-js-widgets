import type PresenceInfoResponse from '@rc-ex/core/lib/definitions/PresenceInfoResponse';
import {
  Auth,
  Client,
  ExtensionInfo,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  createSharedApp,
  injectable,
  RcViewModule,
  render,
} from '@ringcentral-integration/next-core';
import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { Subject } from 'rxjs';

import {
  AccountContactsViewableManager,
  DEFAULT_PRESENCE_TTL,
} from '../../src/app/services/AccountContacts/AccountContactsViewableManager';

@injectable({
  name: 'AccountContactsViewableManagerTestView',
})
class AccountContactsViewableManagerTestView extends RcViewModule {
  constructor(
    public accountContactsViewableManager: AccountContactsViewableManager,
  ) {
    super();
  }

  component() {
    return null;
  }
}

const mockPresence = (
  extensionId: string,
  presence: Partial<PresenceInfoResponse> = {},
) =>
  ({
    extension: { id: extensionId },
    dndStatus: 'TakeAllCalls',
    presenceStatus: 'Available',
    telephonyStatus: 'NoCall',
    userStatus: 'Available',
    meetingStatus: 'Disconnected',
    ...presence,
  } as PresenceInfoResponse);

const createManager = async (options?: {
  presenceData?: Record<string, unknown>;
  presenceTtl?: number;
}) => {
  const afterLogout$ = new Subject<void>();
  const multipartGet = jest.fn();
  const element = document.createElement('div');
  document.body.appendChild(element);

  const app = await createSharedApp({
    main: AccountContactsViewableManagerTestView,
    render,
    share: {
      name: 'internal-test',
      type: 'Base',
    },
    modules: [
      {
        provide: Auth,
        useValue: {
          afterLogout$,
        },
      },
      {
        provide: Client,
        useValue: {
          multipart: {
            get: multipartGet,
          },
        },
      },
      {
        provide: ExtensionInfo,
        useValue: {
          id: 101,
        },
      },
      {
        provide: 'Presence',
        useValue: {
          data: options?.presenceData,
        },
      },
      ...(options?.presenceTtl !== undefined
        ? [
            {
              provide: 'AccountContactsOptions',
              useValue: {
                presenceTtl: options.presenceTtl,
              },
            },
          ]
        : []),
    ],
  });
  await app.bootstrap(element);
  await waitForRenderReady();

  return {
    app,
    afterLogout$,
    destroy: () => {
      app.destroy();
      element.remove();
    },
    manager: app.instance.accountContactsViewableManager,
    multipartGet,
  };
};

describe('AccountContactsViewableManager', () => {
  let destroy: (() => void) | undefined;

  afterEach(() => {
    destroy?.();
    destroy = undefined;
    jest.restoreAllMocks();
  });

  it('fetches and caches viewable presence by account batch', async () => {
    const testContext = await createManager();
    destroy = testContext.destroy;
    const { manager, multipartGet } = testContext;
    const warn = jest.fn();

    manager['logger'] = {
      warn,
      error: jest.fn(),
    } as never;

    multipartGet
      .mockResolvedValueOnce([
        mockPresence('102', {
          presenceStatus: 'Busy',
          telephonyStatus: 'CallConnected',
        }),
        {
          errorCode: 'CMN-101',
        },
      ])
      .mockResolvedValueOnce([
        mockPresence('103', {
          dndStatus: 'DoNotAcceptAnyCalls',
          userStatus: 'Offline',
        }),
      ]);

    const result = await manager['handlePresenceUpdate']([
      ['account-1', ['102']],
      ['account-2', ['103']],
    ]);

    expect(multipartGet).toHaveBeenNthCalledWith(
      1,
      '/restapi/v1.0/account/account-1/extension/102/presence',
      {
        batch: true,
      },
    );
    expect(multipartGet).toHaveBeenNthCalledWith(
      2,
      '/restapi/v1.0/account/account-2/extension/103/presence',
      {
        batch: true,
      },
    );
    expect(warn).toHaveBeenCalledWith({
      errorCode: 'CMN-101',
    });
    expect(result).toEqual(['102', '103']);
    expect(manager.presenceMap).toEqual({
      102: {
        dndStatus: 'TakeAllCalls',
        presenceStatus: 'Busy',
        telephonyStatus: 'CallConnected',
        userStatus: 'Available',
        meetingStatus: 'Disconnected',
      },
      103: {
        dndStatus: 'DoNotAcceptAnyCalls',
        presenceStatus: 'Available',
        telephonyStatus: 'NoCall',
        userStatus: 'Offline',
        meetingStatus: 'Disconnected',
      },
    });
  });

  it('falls back to an empty update when batch presence request fails', async () => {
    const testContext = await createManager();
    destroy = testContext.destroy;
    const { manager, multipartGet } = testContext;
    const error = new Error('network error');
    const loggerError = jest.fn();

    manager['logger'] = {
      warn: jest.fn(),
      error: loggerError,
    } as never;
    multipartGet.mockRejectedValueOnce(error);

    await expect(
      manager['handlePresenceUpdate']([['account-1', ['102']]]),
    ).resolves.toEqual([]);
    expect(loggerError).toHaveBeenCalledWith('batchGetApi error', error);
    expect(manager.presenceMap).toEqual({});
  });

  it('overrides own extension with presence service data', async () => {
    const testContext = await createManager({
      presenceData: {
        dndStatus: 'DoNotAcceptAnyCalls',
        presenceStatus: 'Offline',
        telephonyStatus: 'NoCall',
        userStatus: 'Offline',
        meetingStatus: 'Disconnected',
        irrelevant: 'ignored',
      },
    });
    destroy = testContext.destroy;
    const { manager } = testContext;

    manager['_updatePresenceMap']({
      102: {
        dndStatus: 'TakeAllCalls',
        presenceStatus: 'Busy',
        telephonyStatus: 'NoCall',
        userStatus: 'Available',
        meetingStatus: 'Disconnected',
      },
    });
    expect(manager.presenceMap).toEqual({
      101: {
        dndStatus: 'DoNotAcceptAnyCalls',
        presenceStatus: 'Offline',
        telephonyStatus: 'NoCall',
        userStatus: 'Offline',
        meetingStatus: 'Disconnected',
      },
      102: {
        dndStatus: 'TakeAllCalls',
        presenceStatus: 'Busy',
        telephonyStatus: 'NoCall',
        userStatus: 'Available',
        meetingStatus: 'Disconnected',
      },
    });
  });

  it('clears cached presence and viewable tracking after logout', async () => {
    const testContext = await createManager();
    destroy = testContext.destroy;
    const { afterLogout$, manager } = testContext;
    const clear = jest.spyOn(manager['viewableManager'], 'clear');

    manager['_updatePresenceMap']({
      102: {
        dndStatus: 'TakeAllCalls',
        presenceStatus: 'Busy',
        telephonyStatus: 'NoCall',
        userStatus: 'Available',
        meetingStatus: 'Disconnected',
      },
    });

    afterLogout$.next();

    expect(manager.presenceMap).toEqual({});
    expect(clear).toHaveBeenCalled();
  });

  it('uses configured presence ttl when provided', async () => {
    const testContext = await createManager({
      presenceTtl: 1234,
    });
    destroy = testContext.destroy;
    const { manager } = testContext;

    expect(manager.presenceTtl).toBe(1234);
  });

  it('uses default presence ttl without options', async () => {
    const testContext = await createManager();
    destroy = testContext.destroy;
    const { manager } = testContext;

    expect(manager.presenceTtl).toBe(DEFAULT_PRESENCE_TTL);
  });
});
