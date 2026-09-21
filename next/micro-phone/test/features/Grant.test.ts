import { subscriptionFilters } from '@ringcentral-integration/commons/enums/subscriptionFilters';
import type {
  Client,
  DataFetcher,
  ExtensionFeatures,
  WebSocketSubscription as Subscription,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { DataFetcherConsumer } from '@ringcentral-integration/micro-auth/src/app/services';
import { BehaviorSubject, NEVER, Subject } from 'rxjs';

import { Grant } from '../../src/app/services/Grant';

const createGrant = ({
  callQueuePickupAvailable = false,
  messageThreadsAvailable = true,
  grants = [],
}: {
  callQueuePickupAvailable?: boolean;
  messageThreadsAvailable?: boolean;
  grants?: any[];
} = {}) => {
  const grant = Object.assign(Object.create(Grant.prototype), {
    _extensionFeatures: {
      ready: true,
      features: {
        CallQueuePickup: {
          available: callQueuePickupAvailable,
        },
        MessageThreads: {
          available: messageThreadsAvailable,
        },
      },
    },
  }) as Grant;
  Object.defineProperty(grant, 'data', {
    configurable: true,
    value: grants,
  });

  return grant;
};

const permissionCheckFunction = (grant: Grant) =>
  (grant as any).permissionCheckFunction();

const createGrantWithSubscription = ({
  ready = true,
}: {
  ready?: boolean;
} = {}) => {
  const grant$ = new Subject<unknown>();
  const dataFetcher = {
    ready$: NEVER,
    register: jest.fn(),
    fetchData: jest.fn().mockResolvedValue(undefined),
    getData: jest.fn(),
    getTimestamp: jest.fn(),
  } as unknown as DataFetcher;
  const subscription = {
    register: jest.fn(),
    fromMessage$: jest.fn(() => grant$.asObservable()),
  } as unknown as Subscription & {
    register: jest.Mock;
    fromMessage$: jest.Mock;
  };
  const extensionFeatures = {
    ready: true,
    features: {
      MessageThreads: {
        available: true,
      },
    },
  } as unknown as ExtensionFeatures;
  const skipAutoInitOnce = jest
    .spyOn(Grant.prototype as any, 'onInitOnce')
    .mockImplementation();

  const grant = new Grant(
    {} as Client,
    extensionFeatures,
    dataFetcher,
    subscription,
  );

  skipAutoInitOnce.mockRestore();
  Object.defineProperty(grant, 'ready', {
    configurable: true,
    get: () => ready,
  });
  Object.defineProperty(grant, 'readyState$', {
    configurable: true,
    value: new BehaviorSubject(ready),
  });

  jest.spyOn(DataFetcherConsumer.prototype, 'onInitOnce').mockImplementation();
  grant.onInitOnce();

  return {
    dataFetcher: dataFetcher as DataFetcher & {
      register: jest.Mock;
      fetchData: jest.Mock;
    },
    grant,
    grant$,
    subscription,
  };
};

describe('Grant', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('registers extension grants subscription filter', () => {
    const { grant, subscription } = createGrantWithSubscription();

    expect(subscription.register).toHaveBeenCalledWith(grant, {
      filters: [subscriptionFilters.extensionGrants],
    });
  });

  it('subscribes to grant messages and refetches grants', async () => {
    const { dataFetcher, grant, grant$, subscription } =
      createGrantWithSubscription();

    expect(subscription.fromMessage$).toHaveBeenCalledTimes(1);
    const [grantRegExp] = subscription.fromMessage$.mock.calls[0];
    expect(grantRegExp).toBeInstanceOf(RegExp);
    expect(
      grantRegExp.test('/restapi/v1.0/account/123/extension/456/grant'),
    ).toBe(true);

    grant$.next({});
    await Promise.resolve();

    expect(dataFetcher.fetchData).toHaveBeenCalledWith(grant.source);
  });

  it('does not refetch grants before the module is ready', async () => {
    const { dataFetcher, grant$ } = createGrantWithSubscription({
      ready: false,
    });

    grant$.next({});
    await Promise.resolve();

    expect(dataFetcher.fetchData).not.toHaveBeenCalled();
  });

  it('allows extension grant fetching for MessageThreads permission', () => {
    expect(permissionCheckFunction(createGrant())).toBe(true);
    expect(
      permissionCheckFunction(createGrant({ messageThreadsAvailable: false })),
    ).toBe(false);
    expect(
      permissionCheckFunction(
        createGrant({
          callQueuePickupAvailable: true,
          messageThreadsAvailable: false,
        }),
      ),
    ).toBe(true);
  });

  it('detects company extension grant for shared SMS sender support', () => {
    expect(
      createGrant({
        grants: [
          {
            extension: {
              id: 'queue-1',
              type: 'Department',
            },
          },
        ],
      }).hasCompanyExtensionGrant,
    ).toBe(false);

    expect(
      createGrant({
        grants: [
          {
            extension: {
              id: 'company-1',
              type: 'CompanyExtension',
            },
            smsRecipient: false,
          },
        ],
      }).hasCompanyExtensionGrant,
    ).toBe(false);

    expect(
      createGrant({
        grants: [
          {
            extension: {
              id: 'company-1',
              type: 'CompanyExtension',
            },
            smsRecipient: true,
          },
        ],
      }).hasCompanyExtensionGrant,
    ).toBe(true);
  });

  it('detects shared SMS recipient grant by id only when SMS recipient is enabled', () => {
    const grant = createGrant({
      grants: [
        {
          extension: {
            id: 'site-1',
            type: 'Site',
          },
          smsRecipient: true,
        },
        {
          extension: {
            id: 'site-2',
            type: 'Site',
          },
          smsRecipient: false,
        },
        {
          extension: {
            id: 'dept-1',
            type: 'Department',
          },
          smsRecipient: true,
        },
        {
          extension: {
            id: 'user-1',
            type: 'User',
          },
          smsRecipient: true,
        },
      ],
    });

    expect(grant.isSharedSmsRecipientGrant('site-1')).toBe(true);
    expect(grant.isSharedSmsRecipientGrant('site-2')).toBe(false);
    expect(grant.isSharedSmsRecipientGrant('dept-1')).toBe(true);
    expect(grant.isSharedSmsRecipientGrant('user-1')).toBe(false);
    expect(grant.isSharedSmsRecipientGrant('missing-site')).toBe(false);
  });
});
