import {
  Auth,
  Client,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
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

import { RingCentralExtensions } from '../../../src/app/services';

function initApp() {
  const portEvents = new Map();
  return testBed({
    modules: [
      {
        provide: SharedAppOptions,
        useValue: {
          name: 'internal-test',
          type: 'SharedWorker',
        },
      },
      {
        provide: Auth,
        useValue: {
          loggedIn: true,
          addAfterLoggedInHandler: () => undefined,
          addBeforeLogoutHandler: () => undefined,
        },
      },
      {
        provide: Client,
        useValue: {},
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
          onServer: (fn: () => {}) => {
            portEvents.set('server', fn);
          },
          onClient: (fn: () => {}) => {
            portEvents.set('client', fn);
          },
          _trigger: (type: string) => {
            const handler = portEvents.get(type);
            return handler();
          },
        },
      },
    ],
    main: RingCentralExtensions,
  });
}

@autorun(test)
@ut
@title('RingCentralExtensions PortManager unit test')
export class RingCentralExtensionsPortManagerTest extends Step {
  run() {
    let ringCentralExtensions: RingCentralExtensions;
    let portManager: PortManager;
    let clientDisposer: any;
    let serverDisposer: any;
    return (
      <Scenario desc="Verify RingCentralExtensions PortManager behaviors">
        <Given
          desc="Fulfill context with mock data"
          action={async (_: unknown, context: Context) => {
            Object.defineProperty(context, 'app', {
              value: initApp(),
              writable: false,
            });
            ringCentralExtensions = context.app.container.got(
              RingCentralExtensions,
            )!;
            portManager = context.app.container.got(PortManager)!;
            expect(ringCentralExtensions).toBeDefined();
            expect(portManager).toBeDefined();
            await ringCentralExtensions.onInitOnce();
          }}
        />
        <When
          desc="App is shared mode"
          action={() => {
            clientDisposer = (portManager as any)._trigger('client');
            serverDisposer = (portManager as any)._trigger('server');
            expect(clientDisposer).toBeDefined();
            expect(serverDisposer).toBeDefined();
          }}
        />

        <And
          desc="When client is disposed"
          action={() => {
            jest.spyOn(ringCentralExtensions, 'enableAutoRecover');
            clientDisposer();
          }}
        />
        <Then
          desc="Auto recover should be enabled"
          action={() => {
            expect(
              ringCentralExtensions.enableAutoRecover,
            ).toHaveBeenCalledTimes(1);
          }}
        />

        <And
          desc="When server is disposed"
          action={() => {
            jest.spyOn(ringCentralExtensions, 'disableAutoRecover');
            serverDisposer();
          }}
        />
        <Then
          desc="Auto recover should be disabled"
          action={() => {
            expect(
              ringCentralExtensions.disableAutoRecover,
            ).toHaveBeenCalledTimes(1);
          }}
        />
      </Scenario>
    );
  }
}
