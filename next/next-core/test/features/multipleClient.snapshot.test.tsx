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
  subscribe,
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
  delegate,
  App,
  computed,
} from '../..';
import {
  CounterView as CounterComponent,
  AppView as AppComponent,
} from '../components';

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
    unmountComponentAtNode(clientContainer);
    clientApp?.destroy();
    serverApp?.destroy();
  });
  serverContainer.remove();
  clientContainer.remove();
});

let onClientFn: jest.Mock<any, any>;
let subscribeOnClientFn: jest.Mock<any, any>;

let onServerFn: jest.Mock<any, any>;
let subscribeOnServerFn: jest.Mock<any, any>;

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
}

@injectable({
  name: 'CounterView',
})
class CounterView extends RcViewModule {
  constructor(public portManager: PortManager, public counter: Counter) {
    super();
    this.portManager.onClient(() => {
      onClientFn?.();
      return subscribe(this, () => {
        subscribeOnClientFn?.(this.portManager.portDetector.lastAction.action);
      });
    });
    this.portManager.onServer(() => {
      onServerFn?.();
      return subscribe(this, () => {
        subscribeOnServerFn?.(this.portManager.portDetector.lastAction.action);
      });
    });
  }

  name = 'counter';

  path = '/counter';

  @computed((that: CounterView) => [that.counter.count])
  get count() {
    return this.counter.count;
  }

  @delegate('server')
  async incrementAsync() {
    this.counter.increment();
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
@title('base server/client port mode with router')
class BaseMultipleClient extends Step {
  run() {
    onClientFn = jest.fn();
    subscribeOnClientFn = jest.fn();
    onServerFn = jest.fn();
    subscribeOnServerFn = jest.fn();

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
            expect(onClientFn.mock.calls.length).toMatchInlineSnapshot(`0`);
            expect(subscribeOnClientFn.mock.calls.length).toMatchInlineSnapshot(
              `0`,
            );
            expect(onServerFn.mock.calls.length).toMatchInlineSnapshot(`1`);
            expect(subscribeOnServerFn.mock.calls.length).toMatchInlineSnapshot(
              `10`,
            );
          }}
        />
        <When
          desc="Trigger 'increment' action in server app, and create and bootstrap client app"
          action={async () => {
            await act(async () => {
              await serverApp.bootstrap(serverContainer);
            });
            expect(onClientFn.mock.calls.length).toMatchInlineSnapshot(`0`);
            expect(subscribeOnClientFn.mock.calls.length).toMatchInlineSnapshot(
              `0`,
            );
            expect(onServerFn.mock.calls.length).toMatchInlineSnapshot(`1`);
            expect(subscribeOnServerFn.mock.calls.length).toMatchInlineSnapshot(
              `16`,
            );
            expect(
              serverContainer.querySelector('#content')?.textContent,
            ).toMatchInlineSnapshot(`"home"`);
            serverApp.instance.counterView.counter.increment();
            expect(serverApp.instance.counterView.count).toMatchInlineSnapshot(
              `1`,
            );
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

            expect(onClientFn.mock.calls.length).toMatchInlineSnapshot(`1`);
            expect(subscribeOnClientFn.mock.calls.length).toMatchInlineSnapshot(
              `0`,
            );
            expect(onServerFn.mock.calls.length).toMatchInlineSnapshot(`1`);
            expect(subscribeOnServerFn.mock.calls.length).toMatchInlineSnapshot(
              `23`,
            );

            await act(async () => {
              await clientApp.bootstrap(clientContainer);
            });
          }}
        />
        <Then
          desc="Check the state in server app"
          action={async () => {
            expect(clientApp.instance.counterView.count).toMatchInlineSnapshot(
              `1`,
            );

            // sync up all state with server action sequence
            await Promise.resolve();

            // Normalize random values in snapshots
            const normalizeRandomValues = (calls: any[]) => {
              return calls.map((call) =>
                call.map((action: any) => {
                  const item = { ...action };
                  if (item.method === '_setActiveTabId') {
                    item.params = ['NORMALIZED_TAB_ID'];
                    item._patches = JSON.parse(JSON.stringify(item._patches));
                    item._patches[0].value = 'NORMALIZED_TAB_ID';
                  }
                  if (item.method === '_setActiveNonMainTabId') {
                    item.params = ['NORMALIZED_TAB_ID'];
                    item._patches = JSON.parse(JSON.stringify(item._patches));
                    item._patches[0].value = 'NORMALIZED_TAB_ID';
                  }
                  if (item.method === '_setSharedRoleSnapshot') {
                    const normalizeClientId = (key: string, value: unknown) =>
                      key === 'clientId' && value !== '__SERVER__'
                        ? 'NORMALIZED_CLIENT_ID'
                        : value;
                    item.params = JSON.parse(
                      JSON.stringify(item.params, normalizeClientId),
                    );
                    item._patches = JSON.parse(
                      JSON.stringify(item._patches, normalizeClientId),
                    );
                  }
                  if (
                    item.type === 'persist/REHYDRATE' &&
                    item.payload?._persist
                  ) {
                    item.payload = undefined;
                  }
                  return item;
                }),
              );
            };

            expect(
              normalizeRandomValues(subscribeOnClientFn.mock.calls),
            ).toMatchSnapshot();
            expect(
              normalizeRandomValues(subscribeOnServerFn.mock.calls),
            ).toMatchSnapshot();
            expect(
              clientApp.instance.portManager.portDetector.lastAction.sequence,
            ).toMatchInlineSnapshot(`24`);

            expect(onClientFn.mock.calls.length).toMatchInlineSnapshot(`1`);
            expect(subscribeOnClientFn.mock.calls.length).toMatchInlineSnapshot(
              `6`,
            );
            expect(onServerFn.mock.calls.length).toMatchInlineSnapshot(`1`);
            expect(subscribeOnServerFn.mock.calls.length).toMatchInlineSnapshot(
              `23`,
            );
            expect(
              clientContainer.querySelector('#content')?.textContent,
            ).toMatchInlineSnapshot(`"home"`);
          }}
        />
        <When
          desc="navigate to counter page from client app"
          action={async () => {
            act(() => {
              serverContainer
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
            expect(onClientFn.mock.calls.length).toMatchInlineSnapshot(`1`);
            expect(subscribeOnClientFn.mock.calls.length).toMatchInlineSnapshot(
              `8`,
            );
            expect(onServerFn.mock.calls.length).toMatchInlineSnapshot(`1`);
            expect(subscribeOnServerFn.mock.calls.length).toMatchInlineSnapshot(
              `25`,
            );
            expect(
              serverContainer.querySelector('#content')?.textContent,
            ).toMatchInlineSnapshot(`"1+"`);
            expect(
              clientContainer.querySelector('#content')?.textContent,
            ).toMatchInlineSnapshot(`"1+"`);
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

            expect(onClientFn.mock.calls.length).toMatchInlineSnapshot(`1`);
            expect(subscribeOnClientFn.mock.calls.length).toMatchInlineSnapshot(
              `10`,
            );
            expect(onServerFn.mock.calls.length).toMatchInlineSnapshot(`1`);
            expect(subscribeOnServerFn.mock.calls.length).toMatchInlineSnapshot(
              `26`,
            );

            expect(
              serverContainer.querySelector('#content')?.textContent,
            ).toMatchInlineSnapshot(`"1+"`);
            expect(
              clientContainer.querySelector('#content')?.textContent,
            ).toMatchInlineSnapshot(`"1+"`);
          }}
        />

        <When
          desc="Trigger 'increaseAsync' function in client app"
          action={async () => {
            expect(subscribeOnClientFn.mock.calls.length).toMatchInlineSnapshot(
              `10`,
            );
            expect(subscribeOnServerFn.mock.calls.length).toMatchInlineSnapshot(
              `26`,
            );
            expect(clientApp.instance.counterView.count).toMatchInlineSnapshot(
              `1`,
            );
            expect(
              clientApp.instance.portManager.portDetector.lastAction.sequence,
            ).toMatchInlineSnapshot(`26`);
            await act(() => clientApp.instance.counterView.incrementAsync());
          }}
        />
        <Then
          desc="Check the state and component render in all app"
          action={async () => {
            expect(clientApp.instance.counterView.count).toMatchInlineSnapshot(
              `2`,
            );
            expect(
              clientApp.instance.portManager.portDetector.lastAction.sequence,
            ).toMatchInlineSnapshot(`27`);
            expect(subscribeOnClientFn.mock.calls.length).toMatchInlineSnapshot(
              `11`,
            );
            expect(subscribeOnServerFn.mock.calls.length).toMatchInlineSnapshot(
              `27`,
            );
          }}
        />
        <When
          desc="Trigger 'increaseAsync' action in server app"
          action={async () => {
            await act(() => serverApp.instance.counterView.incrementAsync());
          }}
        />
        <Then
          desc="Check the state and component render in all app"
          action={async () => {
            expect(clientApp.instance.counterView.count).toMatchInlineSnapshot(
              `3`,
            );
            expect(
              clientApp.instance.portManager.portDetector.lastAction.sequence,
            ).toMatchInlineSnapshot(`28`);
            expect(subscribeOnClientFn.mock.calls.length).toMatchInlineSnapshot(
              `12`,
            );
            expect(subscribeOnServerFn.mock.calls.length).toMatchInlineSnapshot(
              `28`,
            );
          }}
        />
      </Scenario>
    );
  }
}
