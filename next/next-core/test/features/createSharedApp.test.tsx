/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
  examples,
} from '@ringcentral-integration/test-utils';

import {
  injectable,
  state,
  action,
  createSharedApp,
  RcModule,
  RcViewModule,
  useConnector,
  App,
  render,
  unmountComponentAtNode,
  PortManager,
  Initiator,
} from '../..';
import { installedUpdate$ } from '../../src/modules/Initiator';

let componentRenderFn = jest.fn();
let element: Element;

beforeEach(() => {
  componentRenderFn = jest.fn();
  element = document.createElement('div');
  document.body.appendChild(element);
});

afterEach(() => {
  unmountComponentAtNode(element);
  element.remove();
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

  @state
  count1 = 0;

  @action
  increment1() {
    this.count1 += 1;
  }
}

@injectable({
  name: 'CounterView',
})
class CounterView extends RcViewModule {
  constructor(public counter: Counter, public initiator: Initiator) {
    super();
  }

  component() {
    const count = useConnector(() => this.counter.count);
    componentRenderFn(count);
    return null;
  }
}

@autorun(test)
@title('throw error with ${module.name} unexpected injection')
class BaseThrowError extends Step {
  @examples([{ module: PortManager }, { module: Initiator }])
  run() {
    let appConfig: any;
    return (
      <Scenario desc="Base Module">
        <When
          desc="set app config"
          action={async () => {
            appConfig = {
              modules: [this.example.module],
              main: CounterView,
              share: {
                name: 'Base',
                type: 'Base',
              },
              render: () => {
                //
              },
            };
          }}
        />
        <When
          desc="createSharedApp and it should throw error"
          action={async () => {
            await expect(createSharedApp(appConfig)).rejects.toThrow(
              `Ambiguous match found for serviceIdentifier:`,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('"global.app" assigned')
class Base extends Step {
  run() {
    let app: App<CounterView, any, any>;
    return (
      <Scenario desc="Base Module">
        <When
          desc="create app"
          action={async () => {
            app = await createSharedApp({
              modules: [],
              main: CounterView,
              share: {
                name: 'Base',
                type: 'Base',
              },
              render: () => {
                //
              },
            });
          }}
        />
        <Then
          desc="global.app should be assigned"
          action={async () => {
            expect(global.app).not.toBeUndefined();
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('installedUpdate$ Subject functionality')
class InstalledUpdateSubjectTest extends Step {
  run() {
    return (
      <Scenario desc="installedUpdate$ Subject">
        <Then
          desc="installedUpdate$ should be exported and be a Subject"
          action={async () => {
            expect(installedUpdate$).toBeDefined();
            expect(typeof installedUpdate$.next).toBe('function');
            expect(typeof installedUpdate$.subscribe).toBe('function');
          }}
        />
        <Then
          desc="installedUpdate$ should emit values correctly"
          action={async () => {
            const receivedValues: boolean[] = [];
            const subscription = installedUpdate$.subscribe((value) => {
              receivedValues.push(value);
            });

            installedUpdate$.next(true);
            installedUpdate$.next(false);
            installedUpdate$.next(true);

            expect(receivedValues).toEqual([true, false, true]);
            subscription.unsubscribe();
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Initiator checkMfeInfo functionality')
class InitiatorCheckMfeInfoTest extends Step {
  run() {
    let app: App<CounterView, any, any>;
    let initiator: Initiator;

    return (
      <Scenario desc="Initiator checkMfeInfo">
        <Given
          desc="create app with shared worker mode"
          action={async () => {
            // Mock shared worker environment
            Object.defineProperty(global, '__rc_shared_worker__', {
              value: { url: '/worker.js' },
              writable: true,
            });

            app = await createSharedApp({
              modules: [],
              main: CounterView,
              share: {
                name: 'test-app',
                type: 'SharedWorker',
              },
              render: () => {
                //
              },
            });

            initiator = app.container.got(Initiator)!;
          }}
        />

        <When
          desc="checkMfeInfo should return early when localMfeInfo is empty"
          action={async () => {
            // Mock empty localMfeInfo
            Object.defineProperty(initiator, 'localMfeInfo', {
              value: {},
              writable: true,
              configurable: true,
            });

            const getServerLocalMfeInfoSpy = jest.spyOn(
              initiator,
              'getServerLocalMfeInfo',
            );

            await initiator.checkMfeInfo();

            // Should not call getServerLocalMfeInfo if localMfeInfo is empty
            expect(getServerLocalMfeInfoSpy).not.toHaveBeenCalled();
          }}
        />

        <When
          desc="checkMfeInfo should subscribe to installedUpdate$ when localMfeInfo is not empty"
          action={async () => {
            // Mock non-empty localMfeInfo
            Object.defineProperty(initiator, 'localMfeInfo', {
              value: {
                mfe1: 'v1.0.0',
                mfe2: 'v2.0.0',
              },
              writable: true,
              configurable: true,
            });

            // Mock portDetector and syncFullStatePromise
            const mockPromise = Promise.resolve();
            const mockPortDetector = {
              syncFullStatePromise: mockPromise,
            };
            Object.defineProperty(initiator['_portManager'], 'portDetector', {
              value: mockPortDetector,
              writable: true,
              configurable: true,
            });

            const getServerLocalMfeInfoSpy = jest
              .spyOn(initiator, 'getServerLocalMfeInfo')
              .mockResolvedValue({
                mfe1: 'v1.0.0',
                mfe2: 'v2.0.0',
              });

            const reloadAllClientsSpy = jest
              .spyOn(initiator, 'reloadAllClients')
              .mockResolvedValue(undefined);

            await initiator.checkMfeInfo();

            // Emit installedUpdate$ event
            installedUpdate$.next(true);

            // Wait for async operations to complete
            await new Promise((resolve) => setTimeout(resolve, 0));
            await mockPromise;

            expect(getServerLocalMfeInfoSpy).toHaveBeenCalled();
            expect(reloadAllClientsSpy).not.toHaveBeenCalled(); // Should not reload when versions match
          }}
        />

        <When
          desc="checkMfeInfo should reload all clients when MFE versions differ"
          action={async () => {
            // Reset mocks
            jest.clearAllMocks();

            // Mock non-empty localMfeInfo
            Object.defineProperty(initiator, 'localMfeInfo', {
              value: {
                mfe1: 'v1.0.0',
                mfe2: 'v2.0.0',
              },
              writable: true,
              configurable: true,
            });

            // Mock portDetector and syncFullStatePromise
            const mockPromise = Promise.resolve();
            const mockPortDetector = {
              syncFullStatePromise: mockPromise,
            };
            Object.defineProperty(initiator['_portManager'], 'portDetector', {
              value: mockPortDetector,
              writable: true,
              configurable: true,
            });

            // Mock different server MFE info
            const getServerLocalMfeInfoSpy = jest
              .spyOn(initiator, 'getServerLocalMfeInfo')
              .mockResolvedValue({
                mfe1: 'v1.1.0', // Different version
                mfe2: 'v2.0.0',
              });

            const reloadAllClientsSpy = jest
              .spyOn(initiator, 'reloadAllClients')
              .mockResolvedValue(undefined);

            await initiator.checkMfeInfo();

            // Emit installedUpdate$ event
            installedUpdate$.next(true);

            // Wait for async operations to complete
            await new Promise((resolve) => setTimeout(resolve, 0));
            await mockPromise;

            expect(getServerLocalMfeInfoSpy).toHaveBeenCalled();
            expect(reloadAllClientsSpy).toHaveBeenCalled(); // Should reload when versions differ
          }}
        />

        <When
          desc="checkMfeInfo should not execute callback when installedUpdate$ emits false"
          action={async () => {
            // Reset mocks
            jest.clearAllMocks();

            // Mock non-empty localMfeInfo
            Object.defineProperty(initiator, 'localMfeInfo', {
              value: {
                mfe1: 'v1.0.0',
              },
              writable: true,
              configurable: true,
            });

            const getServerLocalMfeInfoSpy = jest
              .spyOn(initiator, 'getServerLocalMfeInfo')
              .mockResolvedValue({});

            await initiator.checkMfeInfo();

            // Emit false to installedUpdate$
            installedUpdate$.next(false);

            // Wait for any potential async operations
            await new Promise((resolve) => setTimeout(resolve, 0));

            // Should not call getServerLocalMfeInfo when isInstalled is false
            expect(getServerLocalMfeInfoSpy).not.toHaveBeenCalled();
          }}
        />

        <When
          desc="checkMfeInfo should handle multiple MFE differences"
          action={async () => {
            // Reset mocks
            jest.clearAllMocks();

            // Mock non-empty localMfeInfo with multiple MFEs
            Object.defineProperty(initiator, 'localMfeInfo', {
              value: {
                mfe1: 'v1.0.0',
                mfe2: 'v2.0.0',
                mfe3: 'v3.0.0',
              },
              writable: true,
              configurable: true,
            });

            // Mock portDetector and syncFullStatePromise
            const mockPromise = Promise.resolve();
            const mockPortDetector = {
              syncFullStatePromise: mockPromise,
            };
            Object.defineProperty(initiator['_portManager'], 'portDetector', {
              value: mockPortDetector,
              writable: true,
              configurable: true,
            });

            // Mock server MFE info with multiple differences
            const getServerLocalMfeInfoSpy = jest
              .spyOn(initiator, 'getServerLocalMfeInfo')
              .mockResolvedValue({
                mfe1: 'v1.1.0', // Different
                mfe2: 'v2.1.0', // Different
                mfe3: 'v3.0.0', // Same
              });

            const reloadAllClientsSpy = jest
              .spyOn(initiator, 'reloadAllClients')
              .mockResolvedValue(undefined);

            await initiator.checkMfeInfo();

            // Emit installedUpdate$ event
            installedUpdate$.next(true);

            // Wait for async operations to complete
            await new Promise((resolve) => setTimeout(resolve, 0));
            await mockPromise;

            expect(getServerLocalMfeInfoSpy).toHaveBeenCalled();
            // Should reload when any version differs
            expect(reloadAllClientsSpy).toHaveBeenCalled();
          }}
        />

        <When
          desc="checkMfeInfo should handle empty server MFE info gracefully"
          action={async () => {
            // Reset mocks
            jest.clearAllMocks();

            // Mock non-empty localMfeInfo
            Object.defineProperty(initiator, 'localMfeInfo', {
              value: {
                mfe1: 'v1.0.0',
              },
              writable: true,
              configurable: true,
            });

            // Mock portDetector and syncFullStatePromise
            const mockPromise = Promise.resolve();
            const mockPortDetector = {
              syncFullStatePromise: mockPromise,
            };
            Object.defineProperty(initiator['_portManager'], 'portDetector', {
              value: mockPortDetector,
              writable: true,
              configurable: true,
            });

            // Mock empty server MFE info (returns empty object instead of undefined)
            const getServerLocalMfeInfoSpy = jest
              .spyOn(initiator, 'getServerLocalMfeInfo')
              .mockResolvedValue({});

            const reloadAllClientsSpy = jest
              .spyOn(initiator, 'reloadAllClients')
              .mockResolvedValue(undefined);

            await initiator.checkMfeInfo();

            // Emit installedUpdate$ event
            installedUpdate$.next(true);

            // Wait for async operations to complete
            await new Promise((resolve) => setTimeout(resolve, 0));
            await mockPromise;

            expect(getServerLocalMfeInfoSpy).toHaveBeenCalled();
            // Should not reload when server info is empty
            expect(reloadAllClientsSpy).not.toHaveBeenCalled();
          }}
        />
      </Scenario>
    );
  }
}
