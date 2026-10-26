/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
} from '@ringcentral-integration/test-utils';
import { sleep } from '@ringcentral-integration/utils';
import { act, createElement } from 'react';

import {
  injectable,
  state,
  action,
  useConnector,
  createSharedApp,
  RcViewModule,
  RcModule,
  PortManager,
  RouterPlugin,
  StoragePlugin,
  mockPairTransports,
  IRouterOptions,
  createBrowserHistory,
  RouterOptions,
  unmountComponentAtNode,
  render,
  App,
  computed,
  delegate,
  IStorageOptions,
  StorageOptions,
  storage,
  userStorage,
} from '../..';
import {
  CounterView as CounterComponent,
  AppView as AppComponent,
} from '../components';
import { createMockLock } from '../lib/mockLock';
import { MockStorage } from '../lib/mockStorage';

let serverContainer: Element;
let clientContainer: Element;
let serverApp: App<AppView, any, any>;
let clientApp: App<AppView, any, any>;

beforeEach(() => {
  location.href = 'http://localhost/';
  serverContainer = document.createElement('div');
  document.body.appendChild(serverContainer);
  clientContainer = document.createElement('div');
  document.body.appendChild(clientContainer);
});

afterEach(async () => {
  await act(async () => {
    clientContainer
      .querySelector('#home')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    unmountComponentAtNode(serverContainer);
    serverApp?.destroy();
    unmountComponentAtNode(clientContainer);
    clientApp?.destroy();
  });
  serverContainer.remove();
  clientContainer.remove();
  // @ts-ignore
  serverApp = undefined;
  // @ts-ignore
  clientApp = undefined;
});

@injectable({
  name: 'Counter',
})
class Counter extends RcModule {
  constructor(public storage: StoragePlugin) {
    super();
    this.storage.enable(this);
  }

  @storage
  @state
  count = 0;

  @action
  increment() {
    this.count += 1;
  }

  @delegate('server')
  async incrementProxify() {
    this.increment();
  }

  count1 = 0;

  increment1() {
    this.count1 += 1;
  }
}

@injectable({
  name: 'CounterView',
})
class CounterView extends RcViewModule {
  constructor(
    public portManager: PortManager,
    public counter: Counter,
    public router: RouterPlugin,
  ) {
    super();
  }

  @storage
  @state
  sum = 0;

  @action
  increment() {
    this.sum += 1;
  }

  name = 'counter';

  path = '/counter';

  @computed((that: CounterView) => [that.counter.count])
  get count() {
    return this.counter.count;
  }

  @delegate('server')
  async incrementAsync() {
    await this.counter.incrementProxify();
    return this.counter.count;
  }

  @delegate('server')
  async increment1Async() {
    this.counter.increment1();
  }

  component() {
    const count = useConnector(() => this.count);
    return createElement(CounterComponent, {
      count,
      increase: this.incrementAsync.bind(this),
    });
  }
}

@injectable({
  name: 'AppView',
})
class AppView extends RcViewModule {
  constructor(
    public counterView: CounterView,
    public router: RouterPlugin,
    public storage: StoragePlugin,
    public portManager: PortManager,
  ) {
    super();
    this.storage.enable(this);
  }

  @userStorage
  @state
  sum = 1;

  @action
  _increment() {
    this.sum += 1;
  }

  @delegate('server')
  async increment() {
    this._increment();
  }

  component() {
    const currentPath = useConnector(() => this.router.currentPath);
    return createElement(AppComponent, {
      currentPath,
      counterView: this.counterView.component,
      push: (path: string) => this.router.push(path),
      counterViewPath: this.counterView.path,
      counterViewName: this.counterView.name,
    });
  }
}

@autorun(test)
@title('base SPA with Storage in base mode')
class BaseSpaWithStorageInBaseMode extends Step {
  run() {
    const serverStorage = new MockStorage({
      'persist:AppView':
        '{"sum":"{\\"__default__\\":1}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
      'persist:Counter':
        '{"count":"1","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
      'persist:root': '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
    });
    return (
      <Scenario desc="Base Module">
        <Given
          desc="Create and bootstrap base app"
          action={async () => {
            serverApp = await createSharedApp({
              modules: [
                StoragePlugin,
                {
                  provide: StorageOptions,
                  useValue: {
                    storage: serverStorage,
                    blacklist: [],
                  } as IStorageOptions,
                },
                RouterPlugin,
                {
                  provide: RouterOptions,
                  useValue: {
                    createHistory: () => createBrowserHistory(),
                  } as IRouterOptions,
                },
              ],
              main: AppView,
              render,
              share: {
                name: 'counter',
                type: 'Base',
              },
            });
            expect(serverStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"1","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
            expect(serverApp.instance.storage.paused).toBeFalsy();
            expect(serverApp.instance.storage.rehydrated).toBeFalsy();

            expect(serverApp.instance.ready).toBeFalsy();
            expect(serverApp.instance.counterView.ready).toBeFalsy();
            expect(serverApp.instance.counterView.counter.ready).toBeFalsy();
          }}
        />
        <When
          desc="Trigger 'increment' action in base app"
          action={async () => {
            expect(serverApp.instance.ready).toBeFalsy();
            expect(serverApp.instance.counterView.ready).toBeTruthy();
            expect(serverApp.instance.counterView.counter.ready).toBeTruthy();
            await sleep(0);
            expect(serverStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"1","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
            expect(serverApp.instance.storage.paused).toBeFalsy();
            expect(serverApp.instance.storage.rehydrated).toBeTruthy();

            expect(serverApp.store!.getState()).toMatchInlineSnapshot(`
{
  "AppView": {
    "_persist": {
      "rehydrated": true,
      "version": -1,
    },
    "status": "PENDING",
    "sum": {
      "__default__": 1,
    },
  },
  "Counter": {
    "_persist": {
      "rehydrated": true,
      "version": -1,
    },
    "count": 1,
    "status": "READY",
  },
  "CounterView": {
    "status": "READY",
    "sum": 0,
  },
  "Initiator": {
    "initialized": true,
  },
  "PortManager": {
    "activeNonMainTabId": null,
    "activeTabId": null,
    "roleSnapshots": [],
  },
  "Root": {
    "expanded": false,
    "status": "READY",
  },
  "Router": {
    "_routers": {
      "default": {
        "action": "POP",
        "location": {
          "hash": "",
          "pathname": "/",
          "query": {},
          "search": "",
          "state": undefined,
        },
      },
    },
  },
  "Storage": {
    "status": "READY",
  },
  "_persist": {
    "rehydrated": true,
    "version": -1,
  },
  "lastAction-counter": {
    "_patches": [
      {
        "op": "replace",
        "path": [
          "CounterView",
          "status",
        ],
        "value": "READY",
      },
    ],
    "_reactant": "REACTANT_ACTION",
    "_sequence": 13,
    "method": "_setStatus",
    "params": [
      "READY",
    ],
    "type": "CounterView",
  },
  "router": {
    "action": "POP",
    "location": {
      "hash": "",
      "pathname": "/",
      "query": {},
      "search": "",
      "state": undefined,
    },
  },
}
`);

            expect(serverApp.instance.ready).toBeFalsy();
            expect(serverApp.instance.counterView.ready).toBeTruthy();
            expect(serverApp.instance.counterView.counter.ready).toBeTruthy();

            await sleep(0);
            expect(serverStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"1","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
            expect(serverApp.instance.storage.paused).toBeFalsy();
            expect(serverApp.instance.storage.rehydrated).toBeTruthy();
            expect(serverApp.instance.portManager.isMainTab).toBeFalsy();
            await act(() => serverApp.bootstrap(serverContainer));
            expect(serverContainer.querySelector('#content')?.textContent).toBe(
              'home',
            );
            serverApp.instance.counterView.counter.increment();
            expect(serverApp.instance.counterView.count).toBe(2);

            expect(serverStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"1","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
            expect(serverApp.instance.storage.paused).toBeFalsy();
            expect(serverApp.instance.storage.rehydrated).toBeTruthy();

            await sleep(0);

            expect(serverStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"2","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });

            expect(serverApp.instance.ready).toBeFalsy();
            expect(serverApp.instance.counterView.ready).toBeTruthy();
            expect(serverApp.instance.counterView.counter.ready).toBeTruthy();
          }}
        />
        <Then
          desc="Check the state in base app"
          action={async () => {
            expect(serverApp.instance.counterView.count).toBe(2);
            expect(serverContainer.querySelector('#content')?.textContent).toBe(
              'home',
            );
          }}
        />
        <When
          desc="call increment AppView action in base app"
          action={async () => {
            expect(serverApp.instance.ready).toBeFalsy();
            serverApp.instance.storage.getUserId = () => 'test';
            await serverApp.instance.increment();
            expect(serverApp.instance.ready).toBeTruthy();
          }}
        />
        <Then
          desc="Check the state and storage data in base app"
          action={async () => {
            expect(serverApp.instance.sum).toBe(2);

            await sleep(0);

            expect(serverStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1,\\"test\\":2}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"2","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
          }}
        />
        <When
          desc="call increment CounterView action in base app"
          action={async () => {
            serverApp.instance.counterView.increment();
          }}
        />
        <Then
          desc="Check the state and storage data in base app"
          action={async () => {
            expect(serverApp.instance.counterView.sum).toBe(1);
            await sleep(0);
            expect(serverStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1,\\"test\\":2}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"2","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
          }}
        />
        <When
          desc="call increment AppView action in server app"
          action={async () => {
            await serverApp.instance.increment();
          }}
        />
        <Then
          desc="Check the state and storage data in all app"
          action={async () => {
            expect(serverApp.instance.sum).toBe(3);

            await sleep(0);

            expect(serverStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1,\\"test\\":3}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"2","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
          }}
        />
        <When
          desc="change userId and reset storage state in server app"
          action={async () => {
            serverApp.instance['onInit'] = jest.fn();
            serverApp.instance['onReset'] = jest.fn();
            expect(serverApp.instance.storage.pending).toBeFalsy();
            expect(serverApp.instance.storage.resetting).toBeFalsy();
            expect(serverApp.instance.storage.initializing).toBeFalsy();
            expect(serverApp.instance.storage.ready).toBeTruthy();
            const resetStorageStatePromise =
              serverApp.instance.storage.resetStorageState(() => {
                serverApp.instance.storage.getUserId = () => 'test1';
              });
            expect(serverApp.instance.storage.pending).toBeFalsy();
            expect(serverApp.instance.storage.resetting).toBeTruthy();
            expect(serverApp.instance.storage.initializing).toBeFalsy();
            expect(serverApp.instance.storage.ready).toBeFalsy();
            await resetStorageStatePromise;
          }}
        />
        <Then
          desc="Check the state and storage data in all app"
          action={async () => {
            expect(serverApp.instance.storage.pending).toBeFalsy();
            expect(serverApp.instance.storage.resetting).toBeFalsy();
            expect(serverApp.instance.storage.initializing).toBeFalsy();
            expect(serverApp.instance.storage.ready).toBeTruthy();
            expect(serverApp.instance.sum).toBe(1);

            await sleep(0);

            expect(serverApp.instance['onInit']).toHaveBeenCalledTimes(1);
            expect(serverApp.instance['onReset']).toHaveBeenCalledTimes(1);

            expect(serverStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1,\\"test\\":3}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"2","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
          }}
        />
        <When
          desc="call increment AppView action in server app"
          action={async () => {
            await serverApp.instance.increment();
          }}
        />
        <Then
          desc="Check the state and storage data in all app"
          action={async () => {
            expect(serverApp.instance.sum).toBe(2);

            await sleep(0);

            expect(serverStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1,\\"test\\":3,\\"test1\\":2}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"2","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('base server/client port mode with Storage in base mode')
class BaseMultipleClientWithStorageInBaseMode extends Step {
  run() {
    const transports = mockPairTransports();
    const serverStorage = new MockStorage();
    const clientStorage = new MockStorage();
    return (
      <Scenario desc="Base Module">
        <Given
          desc="Create and bootstrap server app"
          action={async () => {
            serverApp = await createSharedApp({
              modules: [
                StoragePlugin,
                {
                  provide: StorageOptions,
                  useValue: {
                    storage: serverStorage,
                    blacklist: [],
                  } as IStorageOptions,
                },
                RouterPlugin,
                {
                  provide: RouterOptions,
                  useValue: {
                    createHistory: () => createBrowserHistory(),
                  } as IRouterOptions,
                },
              ],
              main: AppView,
              render,
              share: {
                name: 'counter',
                type: 'Base',
                port: 'server',
                transports: {
                  server: transports[0],
                },
              },
            });
            expect(serverStorage).toEqual({ data: {} });
            expect(serverApp.instance.storage.paused).toBeFalsy();
            expect(serverApp.instance.storage.rehydrated).toBeFalsy();

            expect(serverApp.instance.ready).toBeFalsy();
            expect(serverApp.instance.counterView.ready).toBeFalsy();
            expect(serverApp.instance.counterView.counter.ready).toBeFalsy();
          }}
        />
        <When
          desc="Trigger 'increment' action in server app, and create and bootstrap client app"
          action={async () => {
            expect(serverApp.instance.ready).toBeFalsy();
            expect(serverApp.instance.counterView.ready).toBeTruthy();
            expect(serverApp.instance.counterView.counter.ready).toBeTruthy();
            await sleep(0);
            expect(serverStorage).toEqual({
              data: {
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
            expect(serverApp.instance.storage.paused).toBeFalsy();
            expect(serverApp.instance.storage.rehydrated).toBeTruthy();

            expect(serverApp.store!.getState()).toMatchInlineSnapshot(`
{
  "AppView": {
    "_persist": {
      "rehydrated": true,
      "version": -1,
    },
    "status": "PENDING",
    "sum": {
      "__default__": 1,
    },
  },
  "Counter": {
    "_persist": {
      "rehydrated": true,
      "version": -1,
    },
    "count": 0,
    "status": "READY",
  },
  "CounterView": {
    "status": "READY",
    "sum": 0,
  },
  "Initiator": {
    "initialized": true,
  },
  "PortManager": {
    "activeNonMainTabId": null,
    "activeTabId": null,
    "roleSnapshots": [
      {
        "owners": [
          {
            "clientId": "__SERVER__",
          },
        ],
        "phase": "owned",
        "revision": 0,
        "role": "server",
      },
      {
        "owners": [],
        "phase": "owned",
        "revision": 0,
        "role": "connectedClients",
      },
      {
        "owners": [
          {
            "clientId": "__SERVER__",
          },
        ],
        "phase": "owned",
        "revision": 0,
        "role": "all",
      },
      {
        "owners": [
          {
            "clientId": "__SERVER__",
          },
        ],
        "phase": "owned",
        "revision": 1,
        "role": "electedClient",
      },
    ],
  },
  "Root": {
    "expanded": false,
    "status": "READY",
  },
  "Router": {
    "_routers": {
      "default": undefined,
    },
  },
  "Storage": {
    "status": "READY",
  },
  "_persist": {
    "rehydrated": true,
    "version": -1,
  },
  "lastAction-counter": {
    "_patches": [
      {
        "op": "replace",
        "path": [
          "PortManager",
          "roleSnapshots",
        ],
        "value": [
          {
            "owners": [
              {
                "clientId": "__SERVER__",
              },
            ],
            "phase": "owned",
            "revision": 0,
            "role": "server",
          },
          {
            "owners": [],
            "phase": "owned",
            "revision": 0,
            "role": "connectedClients",
          },
          {
            "owners": [
              {
                "clientId": "__SERVER__",
              },
            ],
            "phase": "owned",
            "revision": 0,
            "role": "all",
          },
          {
            "owners": [
              {
                "clientId": "__SERVER__",
              },
            ],
            "phase": "owned",
            "revision": 1,
            "role": "electedClient",
          },
        ],
      },
    ],
    "_reactant": "REACTANT_ACTION",
    "_sequence": 17,
    "method": "_setSharedRoleSnapshot",
    "params": [
      {
        "owners": [
          {
            "clientId": "__SERVER__",
          },
        ],
        "phase": "owned",
        "revision": 1,
        "role": "electedClient",
      },
    ],
    "type": "PortManager",
  },
  "router": {
    "action": "POP",
    "location": {
      "hash": "",
      "pathname": "/",
      "query": {},
      "search": "",
      "state": undefined,
    },
  },
}
`);

            expect(serverApp.instance.ready).toBeFalsy();
            expect(serverApp.instance.counterView.ready).toBeTruthy();
            expect(serverApp.instance.counterView.counter.ready).toBeTruthy();

            await sleep(0);
            expect(serverStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"0","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
            expect(serverApp.instance.storage.paused).toBeFalsy();
            expect(serverApp.instance.storage.rehydrated).toBeTruthy();
            expect(serverApp.instance.portManager.isMainTab).toBeTruthy();
            await act(() => serverApp.bootstrap(serverContainer));
            expect(serverContainer.querySelector('#content')?.textContent).toBe(
              'home',
            );
            serverApp.instance.counterView.counter.increment();
            expect(serverApp.instance.counterView.count).toBe(1);

            expect(serverStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"0","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
            expect(serverApp.instance.storage.paused).toBeFalsy();
            expect(serverApp.instance.storage.rehydrated).toBeTruthy();

            await sleep(0);

            expect(serverStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"1","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });

            expect(serverApp.instance.ready).toBeFalsy();
            expect(serverApp.instance.counterView.ready).toBeTruthy();
            expect(serverApp.instance.counterView.counter.ready).toBeTruthy();

            clientApp = await createSharedApp({
              modules: [
                StoragePlugin,
                {
                  provide: StorageOptions,
                  useValue: {
                    storage: clientStorage,
                    blacklist: [],
                  } as IStorageOptions,
                },
                RouterPlugin,
                {
                  provide: RouterOptions,
                  useValue: {
                    createHistory: () => createBrowserHistory(),
                  } as IRouterOptions,
                },
              ],
              main: AppView,
              render,
              share: {
                name: 'counter',
                type: 'Base',
                port: 'client',
                transports: {
                  client: transports[1],
                },
              },
            });
            expect(clientApp.instance.storage.paused).toBeFalsy();
            expect(clientApp.instance.storage.rehydrated).toBeFalsy();
            await act(() => clientApp.bootstrap(clientContainer));
            expect(clientApp.instance.storage.paused).toBeFalsy();
            expect(clientApp.instance.storage.rehydrated).toBeTruthy();
            await sleep(0);
            // Module state may already be persisted here depending on timing;
            // the full storage is checked after the next tick below.
            expect(clientStorage).toMatchObject({
              data: {
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
            expect(clientApp.instance.storage.paused).toBeFalsy();
            expect(clientApp.instance.storage.rehydrated).toBeTruthy();
            await sleep(0);
            expect(clientStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"1","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
            // !it should be false for sync all client storage data
            expect(clientApp.instance.storage.paused).toBeFalsy();
            expect(clientApp.instance.storage.rehydrated).toBeTruthy();
            // TODO: survey about sync state
            await clientApp.instance.portManager.portDetector.syncFullState();
          }}
        />
        <Then
          desc="Check the state in server/client app"
          action={async () => {
            expect(clientApp.instance.counterView.count).toBe(
              serverApp.instance.counterView.count,
            );

            // sync up all state with server action sequence
            await Promise.resolve();
            expect(
              clientApp.instance.portManager.portDetector.lastAction.sequence,
            ).toBe(
              serverApp.instance.portManager.portDetector.lastAction.sequence,
            );

            expect(clientContainer.querySelector('#content')?.textContent).toBe(
              'home',
            );
          }}
        />
        <When
          desc="call increment AppView action in client app"
          action={async () => {
            expect(serverApp.instance.ready).toBeFalsy();
            clientApp.instance.storage.getUserId = () => 'test';
            serverApp.instance.storage.getUserId = () => 'test';
            await clientApp.instance.increment();
            expect(serverApp.instance.ready).toBeTruthy();
          }}
        />
        <Then
          desc="Check the state and storage data in all app"
          action={async () => {
            expect(serverApp.instance.sum).toBe(2);
            expect(clientApp.instance.sum).toBe(2);

            await sleep(0);

            expect(serverStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1,\\"test\\":2}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"1","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
            expect(clientStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1,\\"test\\":2}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"1","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
          }}
        />
        <When
          desc="call increment CounterView action in server app"
          action={async () => {
            serverApp.instance.counterView.increment();
          }}
        />
        <Then
          desc="Check the state and storage data in all app"
          action={async () => {
            expect(serverApp.instance.counterView.sum).toBe(1);
            expect(clientApp.instance.counterView.sum).toBe(1);

            await sleep(0);

            expect(serverStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1,\\"test\\":2}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"1","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
            expect(clientStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1,\\"test\\":2}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"1","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
          }}
        />
        <When
          desc="set userId and call increment AppView action in server app"
          action={async () => {
            await serverApp.instance.increment();
          }}
        />
        <Then
          desc="Check the state and storage data in all app"
          action={async () => {
            expect(serverApp.instance.sum).toBe(3);
            expect(clientApp.instance.sum).toBe(3);

            await sleep(0);

            expect(serverStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1,\\"test\\":3}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"1","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
            expect(clientStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1,\\"test\\":3}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"1","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('base server/client port mode with Storage in SharedWorker')
class BaseMultipleClientWithStorageInSharedWorkerMode extends Step {
  run() {
    const transports = mockPairTransports();
    const serverStorage = new MockStorage();
    const clientStorage = new MockStorage();
    return (
      <Scenario desc="Base Module">
        <Given
          desc="Create and bootstrap client/server app"
          action={async () => {
            const mockLock = createMockLock();

            const clientAppPromise = createSharedApp({
              modules: [
                StoragePlugin,
                {
                  provide: StorageOptions,
                  useValue: {
                    storage: clientStorage,
                    blacklist: [],
                  } as IStorageOptions,
                },
                RouterPlugin,
                {
                  provide: RouterOptions,
                  useValue: {
                    createHistory: () => createBrowserHistory(),
                  } as IRouterOptions,
                },
              ],
              main: AppView,
              render,
              share: {
                name: 'counter',
                type: 'SharedWorker',
                port: 'client',
                transports: {
                  client: transports[1],
                },
              },
            });

            serverApp = await createSharedApp({
              modules: [
                StoragePlugin,
                {
                  provide: StorageOptions,
                  useValue: {
                    storage: serverStorage,
                    blacklist: [],
                  } as IStorageOptions,
                },
                RouterPlugin,
                {
                  provide: RouterOptions,
                  useValue: {
                    createHistory: () => createBrowserHistory(),
                  } as IRouterOptions,
                },
              ],
              main: AppView,
              render,
              share: {
                name: 'counter',
                type: 'SharedWorker',
                port: 'server',
                transports: {
                  server: transports[0],
                },
              },
            });

            expect(serverStorage).toEqual({ data: {} });
            expect(serverApp.instance.storage.paused).toBeFalsy();
            expect(serverApp.instance.storage.rehydrated).toBeFalsy();

            expect(serverApp.instance.ready).toBeFalsy();
            expect(serverApp.instance.counterView.ready).toBeFalsy();
            expect(serverApp.instance.counterView.counter.ready).toBeFalsy();

            clientApp = await clientAppPromise;
            await mockLock(clientApp);
            await act(() => clientApp.bootstrap(clientContainer));

            // Module state may already be persisted here depending on timing;
            // the full storage is checked after the next tick below.
            expect(serverStorage).toMatchObject({
              data: {
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
            expect(serverApp.instance.storage.paused).toBeFalsy();
            expect(serverApp.instance.storage.rehydrated).toBeTruthy();

            expect(serverApp.instance.ready).toBeFalsy();
            expect(serverApp.instance.counterView.ready).toBeTruthy();
            expect(serverApp.instance.counterView.counter.ready).toBeTruthy();

            // Module state may already be persisted here depending on timing;
            // the full storage is checked after the next tick below.
            expect(clientStorage).toMatchObject({
              data: {
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
            expect(clientApp.instance.storage.paused).toBeTruthy();
            expect(clientApp.instance.storage.rehydrated).toBeTruthy();

            expect(clientApp.instance.ready).toBeFalsy();
            expect(clientApp.instance.counterView.ready).toBeTruthy();
            expect(clientApp.instance.counterView.counter.ready).toBeTruthy();

            await sleep(0);
            expect(serverStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"0","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
            expect(clientStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"0","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
          }}
        />
        <When
          desc="Trigger 'increment' action in server app"
          action={async () => {
            expect(serverApp.instance.portManager.isMainTab).toBeFalsy();
            expect(clientApp.instance.counterView.count).toBe(
              serverApp.instance.counterView.count,
            );
            expect(
              clientApp.instance.portManager.portDetector.lastAction.sequence,
            ).toBe(
              serverApp.instance.portManager.portDetector.lastAction.sequence,
            );
            serverApp.instance.counterView.counter.increment();
            expect(serverApp.instance.counterView.count).toBe(1);

            expect(clientApp.instance.portManager.isMainTab).toBeTruthy();
          }}
        />
        <Then
          desc="Check the state in server app"
          action={async () => {
            expect(clientApp.instance.counterView.count).toBe(
              serverApp.instance.counterView.count,
            );
            expect(
              clientApp.instance.portManager.portDetector.lastAction.sequence,
            ).toBe(
              serverApp.instance.portManager.portDetector.lastAction.sequence,
            );

            expect(clientContainer.querySelector('#content')?.textContent).toBe(
              'home',
            );
            await sleep(0);
            expect(serverStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"1","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
            expect(clientStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"0","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
          }}
        />
        <When
          desc="call increment AppView action in client app"
          action={async () => {
            expect(serverApp.instance.ready).toBeFalsy();
            clientApp.instance.storage.getUserId = () => 'test';
            serverApp.instance.storage.getUserId = () => 'test';
            await clientApp.instance.increment();
            expect(serverApp.instance.ready).toBeTruthy();
          }}
        />
        <Then
          desc="Check the state and storage data in all app"
          action={async () => {
            expect(serverApp.instance.sum).toBe(2);
            expect(clientApp.instance.sum).toBe(2);

            await sleep(0);

            expect(serverStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1,\\"test\\":2}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"1","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
            expect(clientStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"0","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
          }}
        />
        <When
          desc="call increment CounterView action in server app"
          action={async () => {
            serverApp.instance.counterView.increment();
          }}
        />
        <Then
          desc="Check the state and storage data in all app"
          action={async () => {
            expect(serverApp.instance.counterView.sum).toBe(1);
            expect(clientApp.instance.counterView.sum).toBe(1);

            await sleep(0);

            expect(serverStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1,\\"test\\":2}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"1","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
            expect(clientStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"0","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
          }}
        />
        <When
          desc="set userId and call increment AppView action in server app"
          action={async () => {
            await serverApp.instance.increment();
          }}
        />
        <Then
          desc="Check the state and storage data in all app"
          action={async () => {
            expect(serverApp.instance.sum).toBe(3);
            expect(clientApp.instance.sum).toBe(3);

            await sleep(0);

            expect(serverStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1,\\"test\\":3}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"1","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
            expect(clientStorage).toEqual({
              data: {
                'persist:AppView':
                  '{"sum":"{\\"__default__\\":1}","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:Counter':
                  '{"count":"0","_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
                'persist:root':
                  '{"_persist":"{\\"version\\":-1,\\"rehydrated\\":true}"}',
              },
            });
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('storage flush() with @userStorage')
class StorageFlushUserStorage extends Step {
  run() {
    @injectable({
      name: 'CounterView',
    })
    class CounterView extends RcViewModule {
      constructor(public storage: StoragePlugin) {
        super();
        this.storage.enable(this);
      }

      @userStorage
      @state
      sum = 0;

      @action
      increment() {
        this.sum += 1;
      }

      @userStorage
      @state
      sum1 = 0;

      @action
      increment1() {
        this.sum1 += 1;
      }

      @computed
      get doubleSum() {
        return this.sum1 * 2;
      }

      @computed((that: CounterView) => {
        console.log(that.sum1);
        return [that.sum1];
      })
      get doubleSum1() {
        return this.sum1 * 2;
      }

      override component() {
        return null;
      }
    }
    return (
      <Scenario desc="Base Module">
        <Given
          desc="Create and bootstrap app with @userStorage and change user storage state"
          action={async () => {
            const app = await createSharedApp({
              main: CounterView,
              modules: [StoragePlugin],
              render,
              share: {
                name: 'counter',
                type: 'Base',
              },
            });
            await new Promise<void>((resolve) =>
              app.instance.storage.onRehydrated(resolve),
            );
            app.instance.increment();
            await app.instance.storage.flush();
          }}
        />
        <When
          desc="create new app and check user storage state, and flush the storage state"
          action={async () => {
            const app = await createSharedApp({
              main: CounterView,
              modules: [StoragePlugin],
              render,
              share: {
                name: 'counter',
                type: 'Base',
              },
            });
            await new Promise<void>((resolve) =>
              app.instance.storage.onRehydrated(resolve),
            );
            expect(app.store?.getState().CounterView).toEqual({
              status: 'PENDING',
              sum: { __default__: 1 },
              sum1: { __default__: 0 },
              _persist: { version: -1, rehydrated: true },
            });
            await app.instance.storage.purge();
          }}
        />
        <Then
          desc="create new app and check user storage state, it need to be flushed"
          action={async () => {
            const app = await createSharedApp({
              main: CounterView,
              modules: [StoragePlugin],
              render,
              share: {
                name: 'counter',
                type: 'Base',
              },
            });
            await new Promise<void>((resolve) =>
              app.instance.storage.onRehydrated(resolve),
            );
            expect(app.store?.getState().CounterView).toEqual({
              status: 'PENDING',
              sum: { __default__: 0 },
              sum1: { __default__: 0 },
              _persist: { version: -1, rehydrated: true },
            });
            expect([
              app.instance.sum1,
              app.instance.doubleSum,
              app.instance.doubleSum1,
            ]).toEqual([0, 0, 0]);
            app.instance.increment1();
            // !it should be re-computed
            expect([
              app.instance.sum1,
              app.instance.doubleSum,
              app.instance.doubleSum1,
            ]).toEqual([1, 2, 2]);
          }}
        />
      </Scenario>
    );
  }
}
