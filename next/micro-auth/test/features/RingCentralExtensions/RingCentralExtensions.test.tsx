import CoreExtension from '@rc-ex/core';
import WebSocketExtension, { Events } from '@rc-ex/ws';
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
import { EventEmitter } from 'events';

import {
  Auth,
  Client,
  RingCentralExtensions,
  webSocketReadyStates,
  type RingCentralExtensionsOptions,
} from '../../../src/app/services';

class MockWebSocket extends EventEmitter {
  readyState?: number = WebSocket.OPEN;
  addEventListener(name: string, handler: () => void) {
    this.addListener(name, handler);
  }
  removeEventListener(name: string, handler: () => void) {
    this.removeListener(name, handler);
  }
}

const mockWebSocketExtensionWs = new MockWebSocket();
const mockWebSocketExtensionEventEmitter = new EventEmitter();
const mockWebSocketExtensionRecover = jest.fn();
const mockWebSocketExtensionRevoke = jest.fn();

jest.mock('@rc-ex/ws', () => {
  const Events = {
    autoRecoverSuccess: 'autoRecoverSuccess',
    autoRecoverFailed: 'autoRecoverFailed',
    autoRecoverError: 'autoRecoverError',
    newWebSocketObject: 'newWebSocketObject',
    newWsc: 'newWsc',
    connectionReady: 'connectionReady',
  };

  class MockWebSocketExtension {
    options = {
      autoRecover: { enabled: true },
    };
    eventEmitter = mockWebSocketExtensionEventEmitter;
    recover = mockWebSocketExtensionRecover;
    revoke = mockWebSocketExtensionRevoke;
    ws = mockWebSocketExtensionWs;
  }

  return {
    __esModule: true,
    Events,
    default: MockWebSocketExtension,
  };
});

const disposeFunctions: (() => void)[] = [];
const fireSleepDetected = jest.fn();
const fireBeforeLogoutHandler = jest.fn();
const fireAfterLoggedInHandler = jest.fn();
const recoveredEmissions: void[] = [];

const initApp = () =>
  testBed({
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
          onClient: (handler: () => () => void) => {
            disposeFunctions.push(handler());
          },
          onServer: (handler: () => () => void) => {
            disposeFunctions.push(handler());
          },
        },
      },
      {
        provide: StoragePlugin,
        useValue: {
          enable: () => {},
        },
      },
      {
        provide: Auth,
        useValue: {
          addBeforeLogoutHandler: (handler: () => void) => {
            fireBeforeLogoutHandler.mockImplementation(handler);
          },
          addAfterLoggedInHandler: (handler: () => void) => {
            fireAfterLoggedInHandler.mockImplementation(handler);
          },
          get loggedIn() {
            return true;
          },
        },
      },
      {
        provide: Client,
        useValue: {
          service: {},
        },
      },
      {
        provide: 'RingCentralExtensionsOptions',
        useValue: {
          debugMode: true,
        } satisfies RingCentralExtensionsOptions,
      },
    ],
    main: RingCentralExtensions,
  });

@autorun(test)
@ut
@title('RingCentralExtensions.test')
class RingCentralExtensionsTest extends Step {
  run() {
    let ringCentralExtensions: RingCentralExtensions;
    return (
      <Scenario desc="RingCentralExtensions Test">
        <Given
          desc="Init app"
          action={async () => {
            const app = initApp();
            ringCentralExtensions = app.container.got(RingCentralExtensions)!;
            ringCentralExtensions.webSocketRecovered$.subscribe((value) => {
              recoveredEmissions.push(value);
            });
            jest.spyOn(ringCentralExtensions, 'onInitSuccess');
            await waitFor(() =>
              expect(ringCentralExtensions.onInitSuccess).toHaveBeenCalledTimes(
                1,
              ),
            );

            // ws connection events
            mockWebSocketExtensionEventEmitter.emit(
              Events.newWebSocketObject,
              mockWebSocketExtensionWs,
            );
            mockWebSocketExtensionEventEmitter.emit(Events.connectionReady);
            mockWebSocketExtensionEventEmitter.emit(Events.newWsc);
            mockWebSocketExtensionEventEmitter.emit(Events.autoRecoverFailed);
            mockWebSocketExtensionEventEmitter.emit(Events.autoRecoverSuccess);

            // dependency events
            fireSleepDetected();
            fireBeforeLogoutHandler();
            fireAfterLoggedInHandler();
          }}
        />
        <Then
          desc="Check default properties"
          action={() => {
            expect(ringCentralExtensions.debugMode).toBe(true);
            expect(ringCentralExtensions.isWebSocketReady).toBe(true);
            expect(ringCentralExtensions.core).toBeInstanceOf(CoreExtension);
            expect(ringCentralExtensions.webSocketExtension).toBeInstanceOf(
              WebSocketExtension,
            );
          }}
        />
        <When
          desc="WS OPEN"
          action={() => {
            mockWebSocketExtensionWs.readyState = WebSocket.OPEN;
            mockWebSocketExtensionWs.emit('open');
          }}
        />
        <Then
          desc="Check WS OPEN"
          action={() =>
            expect(ringCentralExtensions.webSocketReadyState).toBe(
              webSocketReadyStates.ready,
            )
          }
        />
        <When
          desc="WS CONNECTION"
          action={() => {
            mockWebSocketExtensionWs.readyState = WebSocket.CONNECTING;
            mockWebSocketExtensionWs.emit('open');
          }}
        />
        <Then
          desc="Check WS CONNECTION"
          action={() =>
            expect(ringCentralExtensions.webSocketReadyState).toBe(
              webSocketReadyStates.connecting,
            )
          }
        />
        <When
          desc="WS CLOSING"
          action={() => {
            mockWebSocketExtensionWs.readyState = WebSocket.CLOSING;
            mockWebSocketExtensionWs.emit('close');
          }}
        />
        <Then
          desc="Check WS CLOSING"
          action={() =>
            expect(ringCentralExtensions.webSocketReadyState).toBe(
              webSocketReadyStates.closing,
            )
          }
        />
        <When
          desc="WS CLOSED"
          action={() => {
            mockWebSocketExtensionWs.readyState = WebSocket.CLOSED;
            mockWebSocketExtensionWs.emit('close');
          }}
        />
        <Then
          desc="Check WS CLOSED"
          action={() =>
            expect(ringCentralExtensions.webSocketReadyState).toBe(
              webSocketReadyStates.closed,
            )
          }
        />
        <When
          desc="WS empty state"
          action={() => {
            mockWebSocketExtensionWs.readyState = undefined;
            mockWebSocketExtensionWs.emit('close');
          }}
        />
        <Then
          desc="Check WS empty state"
          action={() =>
            expect(ringCentralExtensions.webSocketReadyState).toBe(null)
          }
        />
        <When
          desc="WS reconnects through the normal sequence: closed -> connecting -> open -> ready"
          action={() => {
            recoveredEmissions.length = 0;
            mockWebSocketExtensionEventEmitter.emit(Events.connectionReady);
            mockWebSocketExtensionWs.readyState = WebSocket.CLOSED;
            mockWebSocketExtensionWs.emit('close');
            mockWebSocketExtensionWs.readyState = WebSocket.CONNECTING;
            mockWebSocketExtensionWs.emit('open');
            mockWebSocketExtensionWs.readyState = WebSocket.OPEN;
            mockWebSocketExtensionWs.emit('open');
            mockWebSocketExtensionEventEmitter.emit(Events.connectionReady);
            mockWebSocketExtensionWs.emit('open');
          }}
        />
        <Then
          desc="webSocketRecovered$ emits once the connection is ready again"
          action={async () => {
            await waitFor(() => expect(recoveredEmissions.length).toBe(1));
            expect(ringCentralExtensions.webSocketReadyState).toBe(
              webSocketReadyStates.ready,
            );
          }}
        />
        <Then
          desc="Teardown"
          action={() => {
            disposeFunctions.forEach((dispose) => dispose());
          }}
        />
      </Scenario>
    );
  }
}
