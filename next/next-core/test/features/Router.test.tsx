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
let getParamsFn: jest.Mock;

beforeEach(() => {
  getParamsFn = jest.fn();
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
  // @ts-ignore
  getParamsFn = undefined;
});

@injectable({
  name: 'Counter',
})
class Counter extends RcModule {
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
    this.router.useParams(getParamsFn);
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
    public portManager: PortManager,
  ) {
    super();
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
@title('base server/client port mode with Router in base mode')
class BaseMultipleClientWithRouterInBaseMode extends Step {
  run() {
    const transports = mockPairTransports();
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
                    storage: new MockStorage(),
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
          }}
        />
        <When
          desc="Trigger 'increment' action in server app, and create and bootstrap client app"
          action={async () => {
            expect(serverApp.instance.portManager.isMainTab).toBeTruthy();
            await act(async () => {
              await serverApp.bootstrap(serverContainer);
            });
            expect(serverContainer.querySelector('#content')?.textContent).toBe(
              'home',
            );
            serverApp.instance.counterView.counter.increment();
            expect(serverApp.instance.counterView.count).toBe(1);
            clientApp = await createSharedApp({
              modules: [
                StoragePlugin,
                {
                  provide: StorageOptions,
                  useValue: {
                    storage: new MockStorage(),
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
            await act(async () => {
              await clientApp.bootstrap(clientContainer);
            });
          }}
        />
        <Then
          desc="Check the state in server app"
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
          desc="navigate to counter page from client app"
          action={async () => {
            act(() => {
              clientContainer
                .querySelector('#counter')!
                .dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
            // sync to all instance
            await Promise.resolve();
          }}
        />
        <Then
          desc="Check the state and component render in client app"
          action={async () => {
            expect(serverContainer.querySelector('#content')?.textContent).toBe(
              '1+',
            );
            expect(clientContainer.querySelector('#content')?.textContent).toBe(
              '1+',
            );
          }}
        />
        <When
          desc="navigate to home page from server app"
          action={async () => {
            act(() => {
              clientContainer
                .querySelector('#home')!
                .dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
          }}
        />
        <Then
          desc="Check the state and component render in all app"
          action={async () => {
            expect(serverContainer.querySelector('#content')?.textContent).toBe(
              'home',
            );
            expect(clientContainer.querySelector('#content')?.textContent).toBe(
              'home',
            );
          }}
        />
        <When
          desc="navigate to counter page with id from server app"
          action={async () => {
            expect(getParamsFn.mock.calls).toEqual([[{}], [{}]]);
            await act(async () => {
              await serverApp.instance.router.push('/counterList/2');
            });
          }}
        />
        <Then
          desc="Check the state and component render in all app"
          action={async () => {
            expect(getParamsFn.mock.calls).toEqual([
              [{}],
              [{}],
              [{ id: '2' }],
              [{ id: '2' }],
            ]);
            expect(serverContainer.querySelector('#content')?.textContent).toBe(
              '1+',
            );
            expect(clientContainer.querySelector('#content')?.textContent).toBe(
              '1+',
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('base server/client port mode with Router in SharedWorker')
class BaseMultipleClientWithRouterInSharedWorkerMode extends Step {
  run() {
    const transports = mockPairTransports();
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
                    storage: new MockStorage(),
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
                    storage: new MockStorage(),
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

            clientApp = await clientAppPromise;
            await mockLock(clientApp);
            await act(async () => {
              await clientApp.bootstrap(clientContainer);
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
          }}
        />
        <When
          desc="navigate to counter page from client app"
          action={async () => {
            act(() => {
              clientContainer
                .querySelector('#counter')!
                .dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
            // sync to all instance
            await Promise.resolve();
          }}
        />
        <Then
          desc="Check the state and component render in client app"
          action={async () => {
            expect(clientContainer.querySelector('#content')?.textContent).toBe(
              '1+',
            );
          }}
        />
        <When
          desc="navigate to home page from server app"
          action={async () => {
            act(() => {
              clientContainer
                .querySelector('#home')!
                .dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
          }}
        />
        <Then
          desc="Check the state and component render in client app"
          action={async () => {
            expect(clientContainer.querySelector('#content')?.textContent).toBe(
              'home',
            );
          }}
        />
        <When
          desc="navigate to counter page with id from server app"
          action={async () => {
            expect(getParamsFn.mock.calls).toEqual([[{}]]);
            await act(async () => {
              await serverApp.instance.router.push('/counterList/2');
            });
          }}
        />
        <Then
          desc="Check the state and component render in client app"
          action={async () => {
            expect(getParamsFn.mock.calls).toEqual([[{}], [{ id: '2' }]]);
            expect(clientContainer.querySelector('#content')?.textContent).toBe(
              '1+',
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('base SPA with Router in base mode')
class BaseSpaWithRouterInBaseMode extends Step {
  run() {
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
                    storage: new MockStorage(),
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
          }}
        />
        <When
          desc="Trigger 'increment' action in base app"
          action={async () => {
            expect(serverApp.instance.portManager.isMainTab).toBeFalsy();
            await act(async () => {
              await serverApp.bootstrap(serverContainer);
            });
            expect(serverContainer.querySelector('#content')?.textContent).toBe(
              'home',
            );
            serverApp.instance.counterView.counter.increment();
            expect(serverApp.instance.counterView.count).toBe(1);
          }}
        />
        <Then
          desc="Check the state in base app"
          action={async () => {
            expect(serverApp.instance.counterView.count).toBe(1);
            expect(serverContainer.querySelector('#content')?.textContent).toBe(
              'home',
            );
          }}
        />
        <When
          desc="navigate to counter page from base app"
          action={async () => {
            act(() => {
              serverContainer
                .querySelector('#counter')!
                .dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
          }}
        />
        <Then
          desc="Check the state and component render in base app"
          action={async () => {
            expect(serverContainer.querySelector('#content')?.textContent).toBe(
              '1+',
            );
          }}
        />
        <When
          desc="navigate to home page from base app"
          action={async () => {
            act(() => {
              serverContainer
                .querySelector('#home')!
                .dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
          }}
        />
        <Then
          desc="Check the state and component render in base app"
          action={async () => {
            expect(serverContainer.querySelector('#content')?.textContent).toBe(
              'home',
            );
          }}
        />
        <When
          desc="navigate to counter page with id from base app"
          action={async () => {
            expect(getParamsFn.mock.calls).toEqual([[{}]]);
            await act(async () => {
              await serverApp.instance.router.push('/counterList/2');
            });
          }}
        />
        <Then
          desc="Check the state and component render in all app"
          action={async () => {
            expect(getParamsFn.mock.calls).toEqual([[{}], [{ id: '2' }]]);
            expect(serverContainer.querySelector('#content')?.textContent).toBe(
              '1+',
            );
          }}
        />
      </Scenario>
    );
  }
}
