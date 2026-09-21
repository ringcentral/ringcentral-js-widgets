import { SleepDetector } from '@ringcentral-integration/micro-core/src/app/services';
import {
  Initiator,
  PortManager,
  SharedAppOptions,
  StoragePlugin,
  testBed,
} from '@ringcentral-integration/next-core';
import {
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  ut,
  waitFor,
  When,
} from '@ringcentral-integration/test-utils';
import { Subject } from 'rxjs';

import {
  Auth,
  Client,
  RingCentralExtensions,
  WebSocketSubscription,
} from '../../../src/app/services';

const WS_URL = 'wss://ws.example.com/ws?access_token=token';

const mockSubscribe = jest.fn();
const webSocketRecoveredSubject = new Subject<void>();

const makeSubscription = (id: string) => ({
  subscriptionInfo: {
    id,
    uri: `/restapi/v1.0/subscription/${id}`,
    eventFilters: [],
  },
  revoke: jest.fn(),
  refresh: jest.fn(),
  remove: jest.fn(),
});

@autorun(test)
@ut
@title(
  'WebSocketSubscription forces new subscription after sleep or WS reconnect',
)
class WebSocketSubscriptionTest extends Step {
  run() {
    let subscription: WebSocketSubscription;
    let sleepDetector: SleepDetector;

    return (
      <Scenario desc="WebSocketSubscription stale subscription handling">
        <Given
          desc="Init app with cached subscription on same channel"
          action={async () => {
            mockSubscribe.mockReset();
            mockSubscribe.mockImplementation(async () =>
              makeSubscription('sub-1'),
            );

            const app = testBed({
              modules: [
                Initiator,
                {
                  provide: SharedAppOptions,
                  useValue: {
                    name: 'internal-test',
                    type: 'Base',
                  },
                },
                {
                  provide: PortManager,
                  useValue: {
                    onClient: () => () => {},
                    onServer: () => () => {},
                  },
                },
                {
                  provide: StoragePlugin,
                  useValue: {
                    enable: () => {},
                  },
                },
                {
                  provide: Client,
                  useValue: {
                    service: {
                      platform: () => ({
                        delete: jest.fn(),
                      }),
                    },
                  },
                },
                {
                  provide: Auth,
                  useValue: {
                    get loggedIn() {
                      return true;
                    },
                  },
                },
                {
                  provide: RingCentralExtensions,
                  useValue: {
                    webSocketExtension: {
                      subscribe: mockSubscribe,
                      ws: { url: WS_URL },
                    },
                    webSocketRecovered$:
                      webSocketRecoveredSubject.asObservable(),
                    get isWebSocketReady() {
                      return true;
                    },
                  },
                },
                {
                  provide: SleepDetector,
                  useValue: {
                    detect$: new Subject<void>(),
                  },
                },
              ],
              main: WebSocketSubscription,
            });

            subscription = app.container.got(WebSocketSubscription)!;
            sleepDetector = app.container.got(SleepDetector)!;
            await waitFor(() => expect(subscription.ready).toBe(true));

            // register a fake subscriber so there are event filters
            subscription.register(subscription, {
              filters: ['/restapi/v1.0/account/~/extension/~/presence'],
            });

            // seed a cached subscription bound to the current ws channel
            subscription['_setTokens'](
              {
                id: 'sub-0',
                uri: '/restapi/v1.0/subscription/sub-0',
              } as any,
              WS_URL,
            );

            await subscription['_updateSubscription']();
            expect(mockSubscribe).toHaveBeenCalledTimes(1);
          }}
        />
        <Then
          desc="Cached subscription is reused when channel is unchanged"
          action={() => {
            expect(mockSubscribe.mock.calls[0][2]).toEqual({
              id: 'sub-0',
              uri: '/restapi/v1.0/subscription/sub-0',
            });
            expect(subscription.subscriptionInfo?.id).toBe('sub-1');
            expect(subscription.subscriptionReady).toBe(true);
          }}
        />
        <When
          desc="Sleep is detected and subscription updates again"
          action={async () => {
            mockSubscribe.mockImplementation(async () =>
              makeSubscription('sub-2'),
            );
            (sleepDetector.detect$ as Subject<void>).next();
            await waitFor(() => expect(mockSubscribe).toHaveBeenCalledTimes(2));
          }}
        />
        <Then
          desc="Cached subscription is NOT reused even when the socket stays open and _wsSubscription exists"
          action={() => {
            expect(mockSubscribe.mock.calls[1][2]).toBeNull();
            expect(subscription.subscriptionInfo?.id).toBe('sub-2');
          }}
        />
        <When
          desc="WebSocket recovers after a real close"
          action={async () => {
            mockSubscribe.mockImplementation(async () =>
              makeSubscription('sub-3'),
            );
            const oldWsSubscription = subscription['_wsSubscription'];
            webSocketRecoveredSubject.next();
            await waitFor(() => expect(mockSubscribe).toHaveBeenCalledTimes(3));
            expect(oldWsSubscription?.revoke).toHaveBeenCalledTimes(1);
          }}
        />
        <Then
          desc="Subscription is revoked and recreated after WS recovery"
          action={() => {
            expect(mockSubscribe.mock.calls[2][2]).toBeNull();
            expect(subscription.subscriptionInfo?.id).toBe('sub-3');
          }}
        />
        <When
          desc="Ready watcher fires before the recovery stream on the same transition"
          action={async () => {
            mockSubscribe.mockImplementation(async () =>
              makeSubscription('sub-4'),
            );
            const oldWsSubscription = subscription['_wsSubscription'];
            // simulate the watcher running first: regular update with the
            // flag not yet set, then the recovery emission
            await subscription['_updateSubscription']();
            webSocketRecoveredSubject.next();
            await waitFor(() => expect(mockSubscribe).toHaveBeenCalledTimes(4));
            expect(oldWsSubscription?.revoke).toHaveBeenCalledTimes(1);
          }}
        />
        <Then
          desc="Exactly one new subscription is created, never with the cached info"
          action={() => {
            expect(mockSubscribe.mock.calls[3][2]).toBeNull();
            expect(subscription.subscriptionInfo?.id).toBe('sub-4');
            expect(mockSubscribe).toHaveBeenCalledTimes(4);
          }}
        />
        <When
          desc="Recovery arrives while a regular update is still in flight"
          action={async () => {
            let resolveSlowSubscribe: (s: any) => void;
            // force _obtainSubscription path so subscribe() is actually called
            subscription['_wsSubscription'] = undefined;
            // regular update starts first and hangs inside subscribe()
            mockSubscribe.mockImplementationOnce(
              () =>
                new Promise((resolve) => {
                  resolveSlowSubscribe = resolve;
                }),
            );
            const inFlight = subscription['_updateSubscription']();
            // recovery arrives while the regular update is in flight
            webSocketRecoveredSubject.next();
            mockSubscribe.mockImplementation(async () =>
              makeSubscription('sub-5'),
            );
            resolveSlowSubscribe!(makeSubscription('sub-in-flight'));
            await inFlight;
            await waitFor(() =>
              expect(subscription.subscriptionInfo?.id).toBe('sub-5'),
            );
          }}
        />
        <Then
          desc="In-flight update cannot clobber the recovered subscription"
          action={() => {
            expect(subscription.subscriptionInfo?.id).toBe('sub-5');
          }}
        />
      </Scenario>
    );
  }
}
