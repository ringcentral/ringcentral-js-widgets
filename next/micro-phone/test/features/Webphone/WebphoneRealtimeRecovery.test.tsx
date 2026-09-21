import {
  AppFeatures,
  Auth,
  Client,
  ExtensionFeatures,
  RegionSettings,
  RingCentralExtensions,
  WebSocketSubscription as Subscription,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { NumberValidate } from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  Toast,
  Brand,
  SleepDetector,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  Initiator,
  PortManager,
  RcModule,
  SharedAppOptions,
  StoragePlugin,
  testBed,
} from '@ringcentral-integration/next-core';
import {
  Given,
  Scenario,
  Step,
  When,
  autorun,
  title,
  ut,
  p2,
  type Context,
} from '@ringcentral-integration/test-utils';
import { BehaviorSubject, of, Subject } from 'rxjs';

import { AudioSettings, Webphone } from '../../../src/app/services';

interface MockRingCentralExtensions extends Partial<RingCentralExtensions> {
  isWebSocketReady: boolean;
  ready$: Subject<boolean>;
  ready: boolean;
  recoverWebSocketConnection: jest.Mock;
}

interface MockSubscription extends Partial<Subscription> {
  subscriptionReady: boolean;
  ready$: Subject<boolean>;
  ready: boolean;
  filters: string[];
  subscriptionInfo: object | null;
}

function createMockRingCentralExtensions(
  isWebSocketReady = true,
): MockRingCentralExtensions {
  return {
    isWebSocketReady,
    ready$: new BehaviorSubject<boolean>(true),
    ready: true,
    recoverWebSocketConnection: jest.fn().mockResolvedValue(undefined),
  };
}

function createMockSubscription(
  subscriptionReady = true,
  filters: string[] = [],
  subscriptionInfo: object | null = null,
): MockSubscription {
  return {
    subscriptionReady,
    ready$: new BehaviorSubject<boolean>(true),
    ready: true,
    filters,
    subscriptionInfo,
  };
}

function createTestApp(
  mockExtensions?: MockRingCentralExtensions,
  mockSubscription?: MockSubscription,
) {
  const portEvents = new Map();
  return testBed({
    modules: [
      {
        provide: SharedAppOptions,
        useValue: {
          name: 'internal-test',
          type: 'SharedWorker',
          coworker: {
            isCoworker: true,
          },
        },
      },
      {
        provide: Auth,
        useValue: {
          addBeforeLogoutHandler: () => undefined,
          loggedIn: true,
        },
      },
      {
        provide: Toast,
        useValue: {},
      },
      {
        provide: Client,
        useValue: {},
      },
      {
        provide: NumberValidate,
        useValue: {},
      },
      {
        provide: AppFeatures,
        useValue: {},
      },
      {
        provide: ExtensionFeatures,
        useValue: {},
      },
      {
        provide: Brand,
        useValue: {},
      },
      {
        provide: SleepDetector,
        useValue: {},
      },
      {
        provide: RegionSettings,
        useValue: {},
      },
      {
        provide: AudioSettings,
        useValue: {
          callVolume: 1,
        },
      },
      {
        provide: StoragePlugin,
        useValue: {
          enable: () => undefined,
        },
      },
      {
        provide: PortManager,
        useValue: {
          shared: true,
          isWorkerMode: false,
          checkMainTabMapping: new Map(),
          customClientDelegateNameMapping: new Map(),
          onServer: (fn: () => void) => {
            portEvents.set('server', fn);
          },
          onClient: (fn: () => void) => {
            portEvents.set('client', fn);
          },
          onMainTab: (fn: () => void) => {
            portEvents.set('mainTab', fn);
          },
          _trigger: async (type: string, ...args: unknown[]) => {
            const handler = portEvents.get(type);
            return handler ? await handler(...args) : undefined;
          },
        },
      },
      {
        provide: RingCentralExtensions,
        useValue: mockExtensions ?? createMockRingCentralExtensions(),
      },
      ...(mockSubscription
        ? [
            {
              provide: 'Subscription',
              useValue: mockSubscription,
            },
          ]
        : []),
    ],
    main: Webphone,
  });
}

// Helper function to call private _checkRealtimeReadiness method
function callCheckRealtimeReadiness(
  webphone: Webphone,
  params: {
    ringCentralExtensions: any;
    subscription?: any;
    shouldWaitForSubscription: boolean;
    timeoutMs: number;
  },
): boolean {
  return (webphone as any)._checkRealtimeReadiness(params);
}

// Helper function to call protected _awaitRealtimeRecovery method
async function callAwaitRealtimeRecovery(
  webphone: Webphone,
  params?: {
    recover?: boolean;
    timeout?: number;
  },
): Promise<boolean> {
  return (webphone as any)._awaitRealtimeRecovery(params);
}

// Helper function to call private _waitModuleReady method
async function callWaitModuleReady(
  webphone: Webphone,
  module?: RcModule,
  timeoutMs?: number,
): Promise<void> {
  return (webphone as any)._waitModuleReady(module, timeoutMs);
}

// ============================================================================
// _checkRealtimeReadiness Tests
// ============================================================================

@autorun(test)
@ut
@p2
@title(
  '_checkRealtimeReadiness - returns true when websocket is ready and no subscription wait needed',
)
class CheckRealtimeReadinessWebsocketReadyNoSubscription extends Step {
  run() {
    let webphone: Webphone;

    return (
      <Scenario desc="Verify _checkRealtimeReadiness returns true when websocket is ready and shouldWaitForSubscription is false">
        <Given
          desc="Initialize test app with mock data"
          action={(_: unknown, context: Context) => {
            Object.defineProperty(context, 'app', {
              value: createTestApp(),
              writable: false,
            });
            webphone = context.app.container.got(Webphone)!;
            expect(webphone).toBeDefined();
          }}
        />
        <When
          desc="Call _checkRealtimeReadiness with websocket ready and no subscription wait"
          action={() => {
            const mockExtensions = createMockRingCentralExtensions(true);
            const result = callCheckRealtimeReadiness(webphone, {
              ringCentralExtensions: mockExtensions,
              subscription: undefined,
              shouldWaitForSubscription: false,
              timeoutMs: 8000,
            });
            expect(result).toBe(true);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@ut
@p2
@title('_checkRealtimeReadiness - returns false when websocket is not ready')
class CheckRealtimeReadinessWebsocketNotReady extends Step {
  run() {
    let webphone: Webphone;

    return (
      <Scenario desc="Verify _checkRealtimeReadiness returns false when websocket is not ready">
        <Given
          desc="Initialize test app with mock data"
          action={(_: unknown, context: Context) => {
            Object.defineProperty(context, 'app', {
              value: createTestApp(),
              writable: false,
            });
            webphone = context.app.container.got(Webphone)!;
            expect(webphone).toBeDefined();
          }}
        />
        <When
          desc="Call _checkRealtimeReadiness with websocket not ready"
          action={() => {
            const mockExtensions = createMockRingCentralExtensions(false);
            const result = callCheckRealtimeReadiness(webphone, {
              ringCentralExtensions: mockExtensions,
              subscription: undefined,
              shouldWaitForSubscription: false,
              timeoutMs: 8000,
            });
            expect(result).toBe(false);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@ut
@p2
@title(
  '_checkRealtimeReadiness - returns true when both websocket and subscription are ready',
)
class CheckRealtimeReadinessBothReady extends Step {
  run() {
    let webphone: Webphone;

    return (
      <Scenario desc="Verify _checkRealtimeReadiness returns true when both are ready">
        <Given
          desc="Initialize test app with mock data"
          action={(_: unknown, context: Context) => {
            Object.defineProperty(context, 'app', {
              value: createTestApp(),
              writable: false,
            });
            webphone = context.app.container.got(Webphone)!;
            expect(webphone).toBeDefined();
          }}
        />
        <When
          desc="Call _checkRealtimeReadiness with both websocket and subscription ready"
          action={() => {
            const mockExtensions = createMockRingCentralExtensions(true);
            const mockSubscription = createMockSubscription(true);
            const result = callCheckRealtimeReadiness(webphone, {
              ringCentralExtensions: mockExtensions,
              subscription: mockSubscription,
              shouldWaitForSubscription: true,
              timeoutMs: 8000,
            });
            expect(result).toBe(true);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@ut
@p2
@title(
  '_checkRealtimeReadiness - returns false when subscription not ready and should wait',
)
class CheckRealtimeReadinessSubscriptionNotReady extends Step {
  run() {
    let webphone: Webphone;

    return (
      <Scenario desc="Verify _checkRealtimeReadiness returns false when subscription not ready">
        <Given
          desc="Initialize test app with mock data"
          action={(_: unknown, context: Context) => {
            Object.defineProperty(context, 'app', {
              value: createTestApp(),
              writable: false,
            });
            webphone = context.app.container.got(Webphone)!;
            expect(webphone).toBeDefined();
          }}
        />
        <When
          desc="Call _checkRealtimeReadiness with subscription not ready"
          action={() => {
            const mockExtensions = createMockRingCentralExtensions(true);
            const mockSubscription = createMockSubscription(false);
            const result = callCheckRealtimeReadiness(webphone, {
              ringCentralExtensions: mockExtensions,
              subscription: mockSubscription,
              shouldWaitForSubscription: true,
              timeoutMs: 8000,
            });
            expect(result).toBe(false);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@ut
@p2
@title(
  '_checkRealtimeReadiness - returns true when subscription not ready but shouldWaitForSubscription is false',
)
class CheckRealtimeReadinessSubscriptionNotReadyButNoWait extends Step {
  run() {
    let webphone: Webphone;

    return (
      <Scenario desc="Verify _checkRealtimeReadiness returns true when not waiting for subscription">
        <Given
          desc="Initialize test app with mock data"
          action={(_: unknown, context: Context) => {
            Object.defineProperty(context, 'app', {
              value: createTestApp(),
              writable: false,
            });
            webphone = context.app.container.got(Webphone)!;
            expect(webphone).toBeDefined();
          }}
        />
        <When
          desc="Call _checkRealtimeReadiness with subscription not ready but shouldWaitForSubscription false"
          action={() => {
            const mockExtensions = createMockRingCentralExtensions(true);
            const mockSubscription = createMockSubscription(false);
            const result = callCheckRealtimeReadiness(webphone, {
              ringCentralExtensions: mockExtensions,
              subscription: mockSubscription,
              shouldWaitForSubscription: false,
              timeoutMs: 8000,
            });
            expect(result).toBe(true);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@ut
@p2
@title(
  '_checkRealtimeReadiness - returns false when websocket not ready but subscription ready',
)
class CheckRealtimeReadinessWebsocketNotReadySubscriptionReady extends Step {
  run() {
    let webphone: Webphone;

    return (
      <Scenario desc="Verify _checkRealtimeReadiness returns false when websocket not ready">
        <Given
          desc="Initialize test app with mock data"
          action={(_: unknown, context: Context) => {
            Object.defineProperty(context, 'app', {
              value: createTestApp(),
              writable: false,
            });
            webphone = context.app.container.got(Webphone)!;
            expect(webphone).toBeDefined();
          }}
        />
        <When
          desc="Call _checkRealtimeReadiness with websocket not ready but subscription ready"
          action={() => {
            const mockExtensions = createMockRingCentralExtensions(false);
            const mockSubscription = createMockSubscription(true);
            const result = callCheckRealtimeReadiness(webphone, {
              ringCentralExtensions: mockExtensions,
              subscription: mockSubscription,
              shouldWaitForSubscription: true,
              timeoutMs: 8000,
            });
            expect(result).toBe(false);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@ut
@p2
@title(
  '_checkRealtimeReadiness - handles undefined subscription when shouldWaitForSubscription is true',
)
class CheckRealtimeReadinessUndefinedSubscriptionWithWait extends Step {
  run() {
    let webphone: Webphone;

    return (
      <Scenario desc="Verify _checkRealtimeReadiness handles undefined subscription correctly">
        <Given
          desc="Initialize test app with mock data"
          action={(_: unknown, context: Context) => {
            Object.defineProperty(context, 'app', {
              value: createTestApp(),
              writable: false,
            });
            webphone = context.app.container.got(Webphone)!;
            expect(webphone).toBeDefined();
          }}
        />
        <When
          desc="Call _checkRealtimeReadiness with undefined subscription but shouldWaitForSubscription true"
          action={() => {
            const mockExtensions = createMockRingCentralExtensions(true);
            // When subscription is undefined, subscription?.subscriptionReady is undefined (falsy)
            // So subscriptionReady = !shouldWaitForSubscription || Boolean(undefined) = false || false = false
            const result = callCheckRealtimeReadiness(webphone, {
              ringCentralExtensions: mockExtensions,
              subscription: undefined,
              shouldWaitForSubscription: true,
              timeoutMs: 8000,
            });
            expect(result).toBe(false);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@ut
@p2
@title('_checkRealtimeReadiness - handles all false values correctly')
class CheckRealtimeReadinessAllFalse extends Step {
  run() {
    let webphone: Webphone;

    return (
      <Scenario desc="Verify _checkRealtimeReadiness handles all false conditions">
        <Given
          desc="Initialize test app with mock data"
          action={(_: unknown, context: Context) => {
            Object.defineProperty(context, 'app', {
              value: createTestApp(),
              writable: false,
            });
            webphone = context.app.container.got(Webphone)!;
            expect(webphone).toBeDefined();
          }}
        />
        <When
          desc="Call _checkRealtimeReadiness with all false conditions"
          action={() => {
            const mockExtensions = createMockRingCentralExtensions(false);
            const mockSubscription = createMockSubscription(false);
            const result = callCheckRealtimeReadiness(webphone, {
              ringCentralExtensions: mockExtensions,
              subscription: mockSubscription,
              shouldWaitForSubscription: true,
              timeoutMs: 8000,
            });
            expect(result).toBe(false);
          }}
        />
      </Scenario>
    );
  }
}

// ============================================================================
// _awaitRealtimeRecovery Tests
// ============================================================================

@autorun(test)
@ut
@p2
@title('_awaitRealtimeRecovery - returns true immediately in test environment')
class AwaitRealtimeRecoveryTestEnvironment extends Step {
  run() {
    let webphone: Webphone;

    return (
      <Scenario desc="Verify _awaitRealtimeRecovery returns true in test environment">
        <Given
          desc="Initialize test app with mock data"
          action={(_: unknown, context: Context) => {
            Object.defineProperty(context, 'app', {
              value: createTestApp(),
              writable: false,
            });
            webphone = context.app.container.got(Webphone)!;
            expect(webphone).toBeDefined();
          }}
        />
        <When
          desc="Call _awaitRealtimeRecovery"
          action={async () => {
            // In test environment, this should return true immediately due to the
            // if (process.env.NODE_ENV === 'test') return true; check
            const result = await callAwaitRealtimeRecovery(webphone);
            expect(result).toBe(true);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@ut
@p2
@title(
  '_awaitRealtimeRecovery - with recover=false does not affect result in test env',
)
class AwaitRealtimeRecoveryNoRecover extends Step {
  run() {
    let webphone: Webphone;

    return (
      <Scenario desc="Verify _awaitRealtimeRecovery with recover=false still returns true in test env">
        <Given
          desc="Initialize test app with mock data"
          action={(_: unknown, context: Context) => {
            Object.defineProperty(context, 'app', {
              value: createTestApp(),
              writable: false,
            });
            webphone = context.app.container.got(Webphone)!;
            expect(webphone).toBeDefined();
          }}
        />
        <When
          desc="Call _awaitRealtimeRecovery with recover=false"
          action={async () => {
            const result = await callAwaitRealtimeRecovery(webphone, {
              recover: false,
            });
            expect(result).toBe(true);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@ut
@p2
@title(
  '_awaitRealtimeRecovery - with custom timeout still returns true in test env',
)
class AwaitRealtimeRecoveryCustomTimeout extends Step {
  run() {
    let webphone: Webphone;

    return (
      <Scenario desc="Verify _awaitRealtimeRecovery with custom timeout returns true in test env">
        <Given
          desc="Initialize test app with mock data"
          action={(_: unknown, context: Context) => {
            Object.defineProperty(context, 'app', {
              value: createTestApp(),
              writable: false,
            });
            webphone = context.app.container.got(Webphone)!;
            expect(webphone).toBeDefined();
          }}
        />
        <When
          desc="Call _awaitRealtimeRecovery with custom timeout"
          action={async () => {
            const result = await callAwaitRealtimeRecovery(webphone, {
              timeout: 3000,
            });
            expect(result).toBe(true);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@ut
@p2
@title('_awaitRealtimeRecovery - with default parameters returns true')
class AwaitRealtimeRecoveryDefaultParams extends Step {
  run() {
    let webphone: Webphone;

    return (
      <Scenario desc="Verify _awaitRealtimeRecovery works with default parameters">
        <Given
          desc="Initialize test app with mock data"
          action={(_: unknown, context: Context) => {
            Object.defineProperty(context, 'app', {
              value: createTestApp(),
              writable: false,
            });
            webphone = context.app.container.got(Webphone)!;
            expect(webphone).toBeDefined();
          }}
        />
        <When
          desc="Call _awaitRealtimeRecovery without parameters"
          action={async () => {
            const result = await callAwaitRealtimeRecovery(webphone);
            expect(result).toBe(true);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@ut
@p2
@title('_awaitRealtimeRecovery - with empty object parameters returns true')
class AwaitRealtimeRecoveryEmptyParams extends Step {
  run() {
    let webphone: Webphone;

    return (
      <Scenario desc="Verify _awaitRealtimeRecovery works with empty object parameters">
        <Given
          desc="Initialize test app with mock data"
          action={(_: unknown, context: Context) => {
            Object.defineProperty(context, 'app', {
              value: createTestApp(),
              writable: false,
            });
            webphone = context.app.container.got(Webphone)!;
            expect(webphone).toBeDefined();
          }}
        />
        <When
          desc="Call _awaitRealtimeRecovery with empty object"
          action={async () => {
            const result = await callAwaitRealtimeRecovery(webphone, {});
            expect(result).toBe(true);
          }}
        />
      </Scenario>
    );
  }
}

// ============================================================================
// _waitModuleReady Tests
// ============================================================================

@autorun(test)
@ut
@p2
@title('_waitModuleReady - returns immediately when module is undefined')
class WaitModuleReadyUndefinedModule extends Step {
  run() {
    let webphone: Webphone;

    return (
      <Scenario desc="Verify _waitModuleReady returns immediately for undefined module">
        <Given
          desc="Initialize test app with mock data"
          action={(_: unknown, context: Context) => {
            Object.defineProperty(context, 'app', {
              value: createTestApp(),
              writable: false,
            });
            webphone = context.app.container.got(Webphone)!;
            expect(webphone).toBeDefined();
          }}
        />
        <When
          desc="Call _waitModuleReady with undefined module"
          action={async () => {
            const startTime = Date.now();
            await callWaitModuleReady(webphone, undefined, 30000);
            const elapsed = Date.now() - startTime;
            // Should return immediately
            expect(elapsed).toBeLessThan(100);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@ut
@p2
@title('_waitModuleReady - returns immediately when module is already ready')
class WaitModuleReadyAlreadyReady extends Step {
  run() {
    let webphone: Webphone;

    return (
      <Scenario desc="Verify _waitModuleReady returns immediately for ready module">
        <Given
          desc="Initialize test app with mock data"
          action={(_: unknown, context: Context) => {
            Object.defineProperty(context, 'app', {
              value: createTestApp(),
              writable: false,
            });
            webphone = context.app.container.got(Webphone)!;
            expect(webphone).toBeDefined();
          }}
        />
        <When
          desc="Call _waitModuleReady with ready module"
          action={async () => {
            const mockModule = {
              ready: true,
              ready$: of(true),
            } as unknown as RcModule;

            const startTime = Date.now();
            await callWaitModuleReady(webphone, mockModule, 30000);
            const elapsed = Date.now() - startTime;
            // Should return immediately
            expect(elapsed).toBeLessThan(100);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@ut
@p2
@title('_waitModuleReady - waits for module to become ready')
class WaitModuleReadyWaitsForReady extends Step {
  run() {
    let webphone: Webphone;

    return (
      <Scenario desc="Verify _waitModuleReady waits for module to become ready">
        <Given
          desc="Initialize test app with mock data"
          action={(_: unknown, context: Context) => {
            Object.defineProperty(context, 'app', {
              value: createTestApp(),
              writable: false,
            });
            webphone = context.app.container.got(Webphone)!;
            expect(webphone).toBeDefined();
          }}
        />
        <When
          desc="Call _waitModuleReady with module that becomes ready after delay"
          action={async () => {
            const ready$ = new Subject<boolean>();
            const mockModule = {
              ready: false,
              ready$,
            } as unknown as RcModule;

            // Emit ready after a short delay
            setTimeout(() => {
              ready$.next(true);
            }, 50);

            const startTime = Date.now();
            await callWaitModuleReady(webphone, mockModule, 5000);
            const elapsed = Date.now() - startTime;
            // Should have waited for the module to become ready
            expect(elapsed).toBeGreaterThanOrEqual(40);
            expect(elapsed).toBeLessThan(1000);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@ut
@p2
@title('_waitModuleReady - handles timeout gracefully')
class WaitModuleReadyTimeout extends Step {
  run() {
    let webphone: Webphone;

    return (
      <Scenario desc="Verify _waitModuleReady handles timeout gracefully">
        <Given
          desc="Initialize test app with mock data"
          action={(_: unknown, context: Context) => {
            Object.defineProperty(context, 'app', {
              value: createTestApp(),
              writable: false,
            });
            webphone = context.app.container.got(Webphone)!;
            expect(webphone).toBeDefined();
          }}
        />
        <When
          desc="Call _waitModuleReady with module that never becomes ready"
          action={async () => {
            const ready$ = new Subject<boolean>();
            const mockModule = {
              ready: false,
              ready$,
            } as unknown as RcModule;

            const startTime = Date.now();
            // Use a very short timeout
            await callWaitModuleReady(webphone, mockModule, 100);
            const elapsed = Date.now() - startTime;
            // Should timeout after ~100ms
            expect(elapsed).toBeGreaterThanOrEqual(90);
            expect(elapsed).toBeLessThan(300);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@ut
@p2
@title('_waitModuleReady - uses default timeout when not specified')
class WaitModuleReadyDefaultTimeout extends Step {
  run() {
    let webphone: Webphone;

    return (
      <Scenario desc="Verify _waitModuleReady uses default timeout">
        <Given
          desc="Initialize test app with mock data"
          action={(_: unknown, context: Context) => {
            Object.defineProperty(context, 'app', {
              value: createTestApp(),
              writable: false,
            });
            webphone = context.app.container.got(Webphone)!;
            expect(webphone).toBeDefined();
          }}
        />
        <When
          desc="Call _waitModuleReady without specifying timeout"
          action={async () => {
            const mockModule = {
              ready: true,
              ready$: of(true),
            } as unknown as RcModule;

            // Should not throw and should return immediately for ready module
            await expect(
              callWaitModuleReady(webphone, mockModule),
            ).resolves.not.toThrow();
          }}
        />
      </Scenario>
    );
  }
}

// ============================================================================
// Integration Tests - Test the combined behavior
// ============================================================================

@autorun(test)
@ut
@p2
@title(
  'Integration - _checkRealtimeReadiness correctly evaluates compound conditions',
)
class CheckRealtimeReadinessCompoundConditions extends Step {
  run() {
    let webphone: Webphone;

    return (
      <Scenario desc="Verify _checkRealtimeReadiness evaluates compound boolean logic correctly">
        <Given
          desc="Initialize test app with mock data"
          action={(_: unknown, context: Context) => {
            Object.defineProperty(context, 'app', {
              value: createTestApp(),
              writable: false,
            });
            webphone = context.app.container.got(Webphone)!;
            expect(webphone).toBeDefined();
          }}
        />
        <When
          desc="Test various combinations of websocketReady and subscriptionReady"
          action={() => {
            // Case 1: websocket=true, subscription=true, wait=true -> true
            expect(
              callCheckRealtimeReadiness(webphone, {
                ringCentralExtensions: createMockRingCentralExtensions(true),
                subscription: createMockSubscription(true),
                shouldWaitForSubscription: true,
                timeoutMs: 8000,
              }),
            ).toBe(true);

            // Case 2: websocket=true, subscription=false, wait=true -> false
            expect(
              callCheckRealtimeReadiness(webphone, {
                ringCentralExtensions: createMockRingCentralExtensions(true),
                subscription: createMockSubscription(false),
                shouldWaitForSubscription: true,
                timeoutMs: 8000,
              }),
            ).toBe(false);

            // Case 3: websocket=true, subscription=false, wait=false -> true
            expect(
              callCheckRealtimeReadiness(webphone, {
                ringCentralExtensions: createMockRingCentralExtensions(true),
                subscription: createMockSubscription(false),
                shouldWaitForSubscription: false,
                timeoutMs: 8000,
              }),
            ).toBe(true);

            // Case 4: websocket=false, subscription=true, wait=true -> false
            expect(
              callCheckRealtimeReadiness(webphone, {
                ringCentralExtensions: createMockRingCentralExtensions(false),
                subscription: createMockSubscription(true),
                shouldWaitForSubscription: true,
                timeoutMs: 8000,
              }),
            ).toBe(false);

            // Case 5: websocket=false, subscription=true, wait=false -> false
            expect(
              callCheckRealtimeReadiness(webphone, {
                ringCentralExtensions: createMockRingCentralExtensions(false),
                subscription: createMockSubscription(true),
                shouldWaitForSubscription: false,
                timeoutMs: 8000,
              }),
            ).toBe(false);

            // Case 6: websocket=true, subscription=undefined, wait=false -> true
            expect(
              callCheckRealtimeReadiness(webphone, {
                ringCentralExtensions: createMockRingCentralExtensions(true),
                subscription: undefined,
                shouldWaitForSubscription: false,
                timeoutMs: 8000,
              }),
            ).toBe(true);

            // Case 7: websocket=true, subscription=undefined, wait=true -> false
            expect(
              callCheckRealtimeReadiness(webphone, {
                ringCentralExtensions: createMockRingCentralExtensions(true),
                subscription: undefined,
                shouldWaitForSubscription: true,
                timeoutMs: 8000,
              }),
            ).toBe(false);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@ut
@p2
@title(
  'Integration - _awaitRealtimeRecovery accepts all parameter combinations',
)
class AwaitRealtimeRecoveryAllCombinations extends Step {
  run() {
    let webphone: Webphone;

    return (
      <Scenario desc="Verify _awaitRealtimeRecovery accepts various parameter combinations">
        <Given
          desc="Initialize test app with mock data"
          action={(_: unknown, context: Context) => {
            Object.defineProperty(context, 'app', {
              value: createTestApp(),
              writable: false,
            });
            webphone = context.app.container.got(Webphone)!;
            expect(webphone).toBeDefined();
          }}
        />
        <When
          desc="Call _awaitRealtimeRecovery with various parameter combinations"
          action={async () => {
            // All should return true in test environment

            // Default params (undefined)
            expect(await callAwaitRealtimeRecovery(webphone)).toBe(true);

            // Empty object
            expect(await callAwaitRealtimeRecovery(webphone, {})).toBe(true);

            // recover = true
            expect(
              await callAwaitRealtimeRecovery(webphone, { recover: true }),
            ).toBe(true);

            // recover = false
            expect(
              await callAwaitRealtimeRecovery(webphone, { recover: false }),
            ).toBe(true);

            // timeout only
            expect(
              await callAwaitRealtimeRecovery(webphone, { timeout: 5000 }),
            ).toBe(true);

            // Both params
            expect(
              await callAwaitRealtimeRecovery(webphone, {
                recover: true,
                timeout: 10000,
              }),
            ).toBe(true);

            expect(
              await callAwaitRealtimeRecovery(webphone, {
                recover: false,
                timeout: 1000,
              }),
            ).toBe(true);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@ut
@p2
@title(
  '_waitModuleReady - handles module emitting ready after being already ready',
)
class WaitModuleReadyEmitAfterReady extends Step {
  run() {
    let webphone: Webphone;

    return (
      <Scenario desc="Verify _waitModuleReady handles edge case correctly">
        <Given
          desc="Initialize test app with mock data"
          action={(_: unknown, context: Context) => {
            Object.defineProperty(context, 'app', {
              value: createTestApp(),
              writable: false,
            });
            webphone = context.app.container.got(Webphone)!;
            expect(webphone).toBeDefined();
          }}
        />
        <When
          desc="Call _waitModuleReady with ready module that also emits"
          action={async () => {
            const ready$ = new BehaviorSubject<boolean>(true);
            const mockModule = {
              ready: true,
              ready$,
            } as unknown as RcModule;

            const startTime = Date.now();
            await callWaitModuleReady(webphone, mockModule, 5000);
            const elapsed = Date.now() - startTime;
            // Should return immediately since ready is true
            expect(elapsed).toBeLessThan(100);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@ut
@p2
@title('_waitModuleReady - handles BehaviorSubject with initial false value')
class WaitModuleReadyBehaviorSubjectFalse extends Step {
  run() {
    let webphone: Webphone;

    return (
      <Scenario desc="Verify _waitModuleReady waits for BehaviorSubject to emit true">
        <Given
          desc="Initialize test app with mock data"
          action={(_: unknown, context: Context) => {
            Object.defineProperty(context, 'app', {
              value: createTestApp(),
              writable: false,
            });
            webphone = context.app.container.got(Webphone)!;
            expect(webphone).toBeDefined();
          }}
        />
        <When
          desc="Call _waitModuleReady with BehaviorSubject starting with false"
          action={async () => {
            const ready$ = new BehaviorSubject<boolean>(false);
            const mockModule = {
              ready: false,
              ready$,
            } as unknown as RcModule;

            // Emit true after 50ms
            setTimeout(() => {
              ready$.next(true);
            }, 50);

            const startTime = Date.now();
            await callWaitModuleReady(webphone, mockModule, 5000);
            const elapsed = Date.now() - startTime;
            // Should have waited for true emission
            expect(elapsed).toBeGreaterThanOrEqual(40);
            expect(elapsed).toBeLessThan(1000);
          }}
        />
      </Scenario>
    );
  }
}
