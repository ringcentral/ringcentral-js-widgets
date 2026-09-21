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
  mockPairTransports,
  IRouterOptions,
  createBrowserHistory,
  RouterOptions,
  unmountComponentAtNode,
  render,
  App,
  computed,
  delegate,
} from '../../..';
import {
  CounterView as CounterComponent,
  AppView as AppComponent,
} from '../../components';
import { createMockLock } from '../../lib/mockLock';

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
  count2 = 0;

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

  increment1(sum = 2) {
    this.count1 += sum;
  }

  increment2(sum = 2) {
    this.count2 += sum;
  }
}

@injectable({
  name: 'CounterView',
})
class CounterView extends RcViewModule {
  constructor(public portManager: PortManager, public counter: Counter) {
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

  async increment1Async() {
    await delegate(this.counter, 'increment1', [1]);
  }

  async increment2Async() {
    await delegate(this.counter, 'increment2', [1], { target: 'clients' });
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
@title(`base server/client port mode with @delegate('server') in base mode`)
class BaseMultipleClientWithProxifyInBaseMode extends Step {
  run() {
    const transports = mockPairTransports();
    return (
      <Scenario desc="Base Module">
        <Given
          desc="Create and bootstrap server app"
          action={async () => {
            serverApp = await createSharedApp({
              modules: [
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
          desc="Trigger 'increment' action in client app"
          action={async () => {
            act(() => {
              clientContainer
                .querySelector('#counter')!
                .dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
          }}
        />
        <Then
          desc="Check the state and component render in all app"
          action={async () => {
            // sync to all instance
            await Promise.resolve();

            expect(serverContainer.querySelector('#content')?.textContent).toBe(
              '1+',
            );
            expect(clientContainer.querySelector('#content')?.textContent).toBe(
              '1+',
            );
          }}
        />

        <When
          desc="Trigger 'increaseAsync' with @delegate('server') function in client app"
          action={async () => {
            expect(clientApp.instance.counterView.count).toBe(
              serverApp.instance.counterView.count,
            );
            expect(
              clientApp.instance.portManager.portDetector.lastAction.sequence,
            ).toBe(
              serverApp.instance.portManager.portDetector.lastAction.sequence,
            );
            const result = await act(() =>
              clientApp.instance.counterView.incrementAsync(),
            );
            expect(result).toBe(2);
          }}
        />
        <Then
          desc="Check the state and component render in all app"
          action={async () => {
            expect(clientApp.instance.counterView.count).toBe(2);
            expect(clientApp.instance.counterView.count).toBe(
              serverApp.instance.counterView.count,
            );
            expect(
              clientApp.instance.portManager.portDetector.lastAction.sequence,
            ).toBe(
              serverApp.instance.portManager.portDetector.lastAction.sequence,
            );
          }}
        />
        <When
          desc="Trigger 'increment1Async' with @delegate('server')  action in server app"
          action={async () => {
            const result =
              await serverApp.instance.counterView.increment1Async();
            expect(result).toBeUndefined();
          }}
        />
        <Then
          desc="Check the state and component render in all app"
          action={async () => {
            expect(clientApp.instance.counterView.counter.count1).toBe(0);
            expect(serverApp.instance.counterView.counter.count1).toBe(1);
            expect(clientApp.instance.counterView.count).toBe(
              serverApp.instance.counterView.count,
            );
            expect(
              clientApp.instance.portManager.portDetector.lastAction.sequence,
            ).toBe(
              serverApp.instance.portManager.portDetector.lastAction.sequence,
            );
          }}
        />
        <When
          desc="Trigger 'increaseAsync' with @delegate('server') function in server app"
          action={async () => {
            expect(clientApp.instance.counterView.count).toBe(
              serverApp.instance.counterView.count,
            );
            expect(
              clientApp.instance.portManager.portDetector.lastAction.sequence,
            ).toBe(
              serverApp.instance.portManager.portDetector.lastAction.sequence,
            );
            const result = await act(() =>
              serverApp.instance.counterView.incrementAsync(),
            );
            expect(result).toBe(3);
          }}
        />
        <Then
          desc="Check the state and component render in all app"
          action={async () => {
            expect(clientApp.instance.counterView.count).toBe(3);
            expect(clientApp.instance.counterView.count).toBe(
              serverApp.instance.counterView.count,
            );
            expect(
              clientApp.instance.portManager.portDetector.lastAction.sequence,
            ).toBe(
              serverApp.instance.portManager.portDetector.lastAction.sequence,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title(`base server/client port mode with @delegate('server') in SharedWorker`)
class BaseMultipleClientWithProxifyInSharedWorkerMode extends Step {
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
          desc="Trigger 'increment' action in client app"
          action={async () => {
            act(() => {
              clientContainer
                .querySelector('#counter')!
                .dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
          }}
        />
        <Then
          desc="Check the state and component render in all app"
          action={async () => {
            // sync to all instance
            await Promise.resolve();

            expect(clientContainer.querySelector('#content')?.textContent).toBe(
              '1+',
            );
          }}
        />

        <When
          desc="Trigger 'increaseAsync' with @delegate('server') function in client app"
          action={async () => {
            expect(clientApp.instance.counterView.count).toBe(
              serverApp.instance.counterView.count,
            );
            expect(
              clientApp.instance.portManager.portDetector.lastAction.sequence,
            ).toBe(
              serverApp.instance.portManager.portDetector.lastAction.sequence,
            );
            const result = await act(() =>
              clientApp.instance.counterView.incrementAsync(),
            );
            expect(result).toBe(2);
          }}
        />
        <Then
          desc="Check the state and component render in all app"
          action={async () => {
            expect(clientApp.instance.counterView.count).toBe(2);
            expect(clientApp.instance.counterView.count).toBe(
              serverApp.instance.counterView.count,
            );
            expect(
              clientApp.instance.portManager.portDetector.lastAction.sequence,
            ).toBe(
              serverApp.instance.portManager.portDetector.lastAction.sequence,
            );
          }}
        />
        <When
          desc="Trigger 'increment1Async' with @delegate('server')  action in server app"
          action={async () => {
            const result =
              await serverApp.instance.counterView.increment1Async();
            expect(result).toBeUndefined();
          }}
        />
        <Then
          desc="Check the state and component render in all app"
          action={async () => {
            expect(clientApp.instance.counterView.counter.count1).toBe(0);
            expect(serverApp.instance.counterView.counter.count1).toBe(1);
            expect(clientApp.instance.counterView.count).toBe(
              serverApp.instance.counterView.count,
            );
            expect(
              clientApp.instance.portManager.portDetector.lastAction.sequence,
            ).toBe(
              serverApp.instance.portManager.portDetector.lastAction.sequence,
            );
          }}
        />
        <When
          desc="Trigger 'increaseAsync' with @delegate('server') function in server app"
          action={async () => {
            expect(clientApp.instance.counterView.count).toBe(
              serverApp.instance.counterView.count,
            );
            expect(
              clientApp.instance.portManager.portDetector.lastAction.sequence,
            ).toBe(
              serverApp.instance.portManager.portDetector.lastAction.sequence,
            );
            const result = await act(() =>
              serverApp.instance.counterView.incrementAsync(),
            );
            expect(result).toBe(3);
          }}
        />
        <Then
          desc="Check the state and component render in all app"
          action={async () => {
            expect(clientApp.instance.counterView.count).toBe(3);
            expect(clientApp.instance.counterView.count).toBe(
              serverApp.instance.counterView.count,
            );
            expect(
              clientApp.instance.portManager.portDetector.lastAction.sequence,
            ).toBe(
              serverApp.instance.portManager.portDetector.lastAction.sequence,
            );
          }}
        />
        <When
          desc="Trigger 'increment1Async' with delegate() to clients  action in server app"
          action={async () => {
            const result =
              await serverApp.instance.counterView.increment2Async();
            expect(result).toBeUndefined();
          }}
        />
        <Then
          desc="Check the state and component render in base app"
          action={async () => {
            expect(serverApp.instance.counterView.counter.count2).toBe(0);
            expect(clientApp.instance.counterView.counter.count2).toBe(1);
          }}
        />
        <When
          desc="Trigger 'increment1Async' with delegate() to clients action in client app"
          action={async () => {
            const result =
              await clientApp.instance.counterView.increment2Async();
            expect(result).toBeUndefined();
          }}
        />
        <Then
          desc="Check the state and component render in base app"
          action={async () => {
            expect(serverApp.instance.counterView.counter.count2).toBe(0);
            expect(clientApp.instance.counterView.counter.count2).toBe(2);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title(`base SPA with @delegate('server') in base mode`)
class BaseSpaWithProxifyInBaseMode extends Step {
  run() {
    return (
      <Scenario desc="Base Module">
        <Given
          desc="Create and bootstrap single app"
          action={async () => {
            serverApp = await createSharedApp({
              modules: [
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
          desc="Trigger 'increment' action in base app"
          action={async () => {
            act(() => {
              serverContainer
                .querySelector('#counter')!
                .dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
          }}
        />
        <When
          desc="Trigger 'increaseAsync' with @delegate('server') function in base app"
          action={async () => {
            expect(serverApp.instance.counterView.count).toBe(1);
            const result = await act(() =>
              serverApp.instance.counterView.incrementAsync(),
            );
            expect(result).toBe(2);
          }}
        />
        <Then
          desc="Check the state and component render in base app"
          action={async () => {
            expect(serverApp.instance.counterView.count).toBe(2);
          }}
        />
        <When
          desc="Trigger 'increment1Async' with delegate()  action in base app"
          action={async () => {
            const result =
              await serverApp.instance.counterView.increment1Async();
            expect(result).toBeUndefined();
          }}
        />
        <Then
          desc="Check the state and component render in base app"
          action={async () => {
            expect(serverApp.instance.counterView.counter.count1).toBe(1);
          }}
        />
        <When
          desc="Trigger 'increment1Async' with delegate() action in base app"
          action={async () => {
            const result =
              await serverApp.instance.counterView.increment2Async();
            expect(result).toBeUndefined();
          }}
        />
        <Then
          desc="Check the state and component render in base app"
          action={async () => {
            expect(serverApp.instance.counterView.counter.count2).toBe(1);
          }}
        />
      </Scenario>
    );
  }
}
