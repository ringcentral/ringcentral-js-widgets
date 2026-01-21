import {
  AppFeatures,
  Auth,
  Client,
  ExtensionFeatures,
  RegionSettings,
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
  SharedAppOptions,
  StoragePlugin,
  testBed,
} from '@ringcentral-integration/next-core';
import {
  And,
  Given,
  Scenario,
  Step,
  Then,
  When,
  autorun,
  title,
  ut,
  type Context,
} from '@ringcentral-integration/test-utils';

import {
  AudioSettings,
  connectionStatus,
  Webphone,
} from '../../../src/app/services';

import fakeSessions from './fakeSessions.json';

function initApp() {
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
          onServer: (fn: () => {}) => {
            portEvents.set('server', fn);
          },
          onClient: (fn: () => {}) => {
            portEvents.set('client', fn);
          },
          onMainTab: (fn: () => {}) => {
            portEvents.set('mainTab', fn);
          },
          _trigger: async (type: string, ...args: unknown[]) => {
            const handler = portEvents.get(type);
            return await handler(...args);
          },
        },
      },
    ],
    main: Webphone,
  });
}

const fakeTransportEvents = new Map();
const fakeTransport = {
  emit: async (name: string, ...args: unknown[]) => {
    const handler = fakeTransportEvents.get(name);
    await handler(...args);
  },
  listen: (name: string, handler: () => {}) => {
    fakeTransportEvents.set(name, handler);
  },
};

@autorun(test)
@ut
@title('Webphone PortManager unit test - on main tab')
class WebphonePortManagerMainTabTest extends Step {
  run() {
    let webphone: Webphone;
    let portManager: PortManager;
    let initiator: Initiator;
    return (
      <Scenario desc="Verify Webphone PortManager behaviors on main tab">
        <Given
          desc="Fulfill context with mock data"
          action={(_: unknown, context: Context) => {
            Object.defineProperty(context, 'app', {
              value: initApp(),
              writable: false,
            });
            webphone = context.app.container.got(Webphone)!;
            portManager = context.app.container.got(PortManager)!;
            initiator = context.app.container.got(Initiator)!;
            expect(webphone).toBeDefined();
            expect(portManager).toBeDefined();
            expect(initiator).toBeDefined();
          }}
        />
        <When
          desc="App is shared mode on main tab"
          action={async () => {
            (portManager as any)._trigger('mainTab');
            await webphone.updateSessionsState([]);
            expect(webphone.hasCallSessions).toBeFalsy();
          }}
        />
        <And
          desc="When there has webphone sessions"
          action={async () => {
            await webphone.updateSessionsState(fakeSessions as any);
            expect(webphone.hasCallSessions).toBeTruthy();
          }}
        />
        <Then
          desc="Hook 'reloadPromise' should be placed"
          action={() => {
            expect(initiator.reloadPromise).toBeTruthy();
          }}
        />
        <And
          desc="When there is no webphone sessions"
          action={async () => {
            await webphone.updateSessionsState([]);
            expect(webphone.hasCallSessions).toBeFalsy();
          }}
        />
        <Then
          desc="Hook 'reloadPromise' should be removed"
          action={() => {
            expect(initiator.reloadPromise).toBeFalsy();
          }}
        />
        <Then
          desc="Hook 'reloadPromise' should be removed"
          action={async () => {
            const result = await new Promise((resolve) => {
              const id = (globalThis as any).externalSetTimeout(() => {
                resolve('test');
                (globalThis as any).externalClearTimeout(id);
              }, 0);
              expect(typeof id === 'number').toBeTruthy();
            });
            expect(result).toBe('test');
          }}
        />
        <Then
          desc="'webphone disconnect' should trigger webphone disconnect in sync"
          action={() => {
            webphone._setConnectionStatus(connectionStatus.connected);
            const mockInstance = {
              userAgent: {
                stop: jest.fn(),
                once: jest.fn(),
              },
            };
            jest.spyOn(webphone, '_updateSessions').mockImplementation(() => {
              return Promise.resolve();
            });
            webphone.rcWebphoneInstance$.next(mockInstance as any);
            webphone._disconnect();

            expect(mockInstance.userAgent.stop).toHaveBeenCalled();
          }}
        />
      </Scenario>
    );
  }
}

// TODO: Jest worker encountered 4 child process exceptions
@autorun(test.skip)
@ut
@title('Webphone PortManager unit test - client server transport')
class WebphonePortManagerClientServerTransportTest extends Step {
  run() {
    let webphone: Webphone;
    let portManager: PortManager;
    return (
      <Scenario desc="Verify Webphone PortManager behaviors of client server transport">
        <Given
          desc="Fulfill context with mock data"
          action={(_: unknown, context: Context) => {
            Object.defineProperty(context, 'app', {
              value: initApp(),
              writable: false,
            });
            webphone = context.app.container.got(Webphone)!;
            portManager = context.app.container.got(PortManager)!;
          }}
        />
        <When
          desc="App is shared mode"
          action={async () => {
            (portManager as any)._trigger('client', fakeTransport);
            (portManager as any)._trigger('server', fakeTransport);
            webphone.isMainClient = true;
            fakeTransport.emit('customClientDelegateName', {
              method: '_updateSessions',
            });
            webphone.isMainClient = false;
            fakeTransport.emit('customClientDelegateName', {
              method: '_updateSessions',
            });
          }}
        />
        <And
          desc="When main client page is hide"
          action={() => {
            // mock client
            jest.spyOn(webphone, 'connect');
            portManager.checkMainTabMapping.set(webphone, () => false);
            // fire 'pagehide' event on server
            webphone.isMainClient = true;
            window.dispatchEvent(new Event('pagehide'));
          }}
        />
        <Then
          desc="Webphone on client should start connecting"
          action={() => {
            expect(webphone.connect).toHaveBeenCalledTimes(1);
          }}
        />
      </Scenario>
    );
  }
}
