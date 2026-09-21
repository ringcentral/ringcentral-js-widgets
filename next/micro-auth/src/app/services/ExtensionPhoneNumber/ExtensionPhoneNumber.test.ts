import type ExtensionInfoEventBody from '@rc-ex/core/lib/definitions/ExtensionInfoEventBody';
import { subscriptionFilters } from '@ringcentral-integration/commons/enums/subscriptionFilters';
import { subscriptionHints } from '@ringcentral-integration/commons/enums/subscriptionHints';
import { BehaviorSubject, NEVER, Subject } from 'rxjs';

import type { Client } from '../Client';
import type { DataFetcher } from '../DataFetcher';
import { DataFetcherConsumer } from '../DataFetcher';
import type { ExtensionFeatures } from '../ExtensionFeatures';
import type { WebSocketSubscription as Subscription } from '../WebSocketSubscription';

import { ExtensionPhoneNumber } from './ExtensionPhoneNumber';

function createExtensionPhoneNumber({
  ready = true,
}: {
  ready?: boolean;
} = {}) {
  const extensionInfo$ = new Subject<ExtensionInfoEventBody>();
  const grant$ = new Subject<unknown>();
  const dataFetcher = {
    ready$: NEVER,
    register: jest.fn(),
    fetchData: jest.fn().mockResolvedValue(undefined),
    getData: jest.fn(),
    getTimestamp: jest.fn(),
  } as unknown as DataFetcher;
  let messageStreamIndex = 0;
  const subscription = {
    register: jest.fn(),
    fromMessage$: jest.fn(() => {
      const stream = messageStreamIndex === 0 ? extensionInfo$ : grant$;
      messageStreamIndex += 1;
      return stream.asObservable();
    }),
  } as unknown as Subscription & {
    register: jest.Mock;
    fromMessage$: jest.Mock;
  };
  const extensionFeatures = {
    ready: true,
    features: {
      ReadExtensionPhoneNumbers: {
        available: true,
      },
    },
  } as unknown as ExtensionFeatures;
  const skipAutoInitOnce = jest
    .spyOn(ExtensionPhoneNumber.prototype as any, 'onInitOnce')
    .mockImplementation();

  const extensionPhoneNumber = new ExtensionPhoneNumber(
    {} as Client,
    dataFetcher,
    extensionFeatures,
    subscription,
  );

  skipAutoInitOnce.mockRestore();
  Object.defineProperty(extensionPhoneNumber, 'ready', {
    configurable: true,
    get: () => ready,
  });
  Object.defineProperty(extensionPhoneNumber, 'readyState$', {
    configurable: true,
    value: new BehaviorSubject(ready),
  });

  jest.spyOn(DataFetcherConsumer.prototype, 'onInitOnce').mockImplementation();
  (extensionPhoneNumber as any).onInitOnce();

  return {
    dataFetcher: dataFetcher as DataFetcher & {
      register: jest.Mock;
      fetchData: jest.Mock;
    },
    extensionPhoneNumber,
    extensionInfo$,
    grant$,
    subscription,
  };
}

describe('ExtensionPhoneNumber subscription updates', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('registers extension info subscription filter', () => {
    const { extensionPhoneNumber, subscription } = createExtensionPhoneNumber();

    expect(subscription.register).toHaveBeenCalledWith(extensionPhoneNumber, {
      filters: [subscriptionFilters.extensionInfo],
    });
  });

  it('subscribes to extension info messages and refetches on CompanyNumbers hint', async () => {
    const { dataFetcher, extensionInfo$, extensionPhoneNumber, subscription } =
      createExtensionPhoneNumber();

    expect(subscription.fromMessage$).toHaveBeenCalledTimes(2);
    const [extensionRegExp] = subscription.fromMessage$.mock.calls[0];
    expect(extensionRegExp).toBeInstanceOf(RegExp);
    expect(
      extensionRegExp.test('/restapi/v1.0/account/123/extension/456'),
    ).toBe(true);

    extensionInfo$.next({
      hints: [subscriptionHints.companyNumbers],
    });
    await Promise.resolve();

    expect(dataFetcher.fetchData).toHaveBeenCalledWith(
      extensionPhoneNumber.source,
    );
  });

  it('refetches on extension grant update', async () => {
    const { dataFetcher, extensionPhoneNumber, grant$, subscription } =
      createExtensionPhoneNumber();

    expect(subscription.fromMessage$).toHaveBeenCalledTimes(2);
    const [grantRegExp] = subscription.fromMessage$.mock.calls[1];
    expect(grantRegExp).toBeInstanceOf(RegExp);
    expect(
      grantRegExp.test('/restapi/v1.0/account/123/extension/456/grant'),
    ).toBe(true);

    grant$.next({});
    await Promise.resolve();

    expect(dataFetcher.fetchData).toHaveBeenCalledWith(
      extensionPhoneNumber.source,
    );
  });

  it('does not refetch for unrelated extension info hints', async () => {
    const { dataFetcher, extensionInfo$ } = createExtensionPhoneNumber();

    extensionInfo$.next({
      hints: [subscriptionHints.features],
    });
    await Promise.resolve();

    expect(dataFetcher.fetchData).not.toHaveBeenCalled();
  });

  it('does not refetch before the module is ready', async () => {
    const { dataFetcher, extensionInfo$, grant$ } = createExtensionPhoneNumber({
      ready: false,
    });

    extensionInfo$.next({
      hints: [subscriptionHints.companyNumbers],
    });
    grant$.next({});
    await Promise.resolve();

    expect(dataFetcher.fetchData).not.toHaveBeenCalled();
  });
});
