/* eslint-disable no-console */
import { SOCKET_MOCK_URL } from '@ringcentral-integration/test-utils/lib/socketMockUrl';
import { WS } from 'jest-websocket-mock';
import type { Client } from 'mock-socket';
import {
  BehaviorSubject,
  filter,
  firstValueFrom,
  merge,
  switchMap,
  throwError,
  timer,
} from 'rxjs';

import ClientRequest from '../platform/data/ws/clientRequest.json';
import wsConnectionDetailsBody from '../platform/data/ws/connectionDetails.json';
import wsHeartbeatResponse from '../platform/data/ws/heartbeatResponse.json';
import serverNotification from '../platform/data/ws/serverNotification.json';
import wsSubscriptionResponse from '../platform/data/ws/subscriptionResponse.json';

import type { SubscriptionMock } from './interface';

const subscriptionId = wsSubscriptionResponse[1].id;
export class WebSocketMock implements SubscriptionMock {
  private connected$ = new BehaviorSubject(false);

  get connected() {
    return this.connected$.value;
  }
  server?: WS;

  constructor(
    /**
     * add random
     */
    public url = SOCKET_MOCK_URL,
  ) {
    this.subscribe();
  }

  private subscribe() {
    if (this.server || this.connected) {
      console.warn(
        `[WebSocketMock] A mock server is already listening on this url`,
      );

      return;
    }

    this.server = new WS(this.url);
    this.server.on('connection', (socket) => {
      socket.send(JSON.stringify(wsConnectionDetailsBody));

      // https://github.com/thoov/mock-socket
      // that implement in mock-socket
      (socket as Client).on('message', (message) => {
        // in @rc-ex/ws alway use string as message
        const [meta, body] = JSON.parse(message as string);
        // type: Heartbeat
        if (meta.type === 'Heartbeat') {
          socket.send(
            JSON.stringify([
              {
                ...wsHeartbeatResponse[0],
                ...meta,
              },
              body,
            ]),
          );
        }

        // type: ClientRequest
        else if (meta.type === 'ClientRequest') {
          const subscriptionCreateOrUpdate = '/restapi/v1.0/subscription';
          const path = meta.path.startsWith(subscriptionCreateOrUpdate)
            ? subscriptionCreateOrUpdate
            : meta.path;
          switch (path) {
            case '/restapi/v1.0/subscription':
              socket.send(
                JSON.stringify([
                  {
                    ...wsSubscriptionResponse[0],
                    ...meta,
                  },
                  {
                    ...wsSubscriptionResponse[1],
                    id: subscriptionId,
                  },
                ]),
              );

              // wait a promise for make sure socket send
              Promise.resolve().then(() => this.connected$.next(true));

              break;
            default:
              console.log(
                `[WebSocketMockServer] Matched ${meta.method || 'GET'} to ${
                  meta.path
                }`,
              );
              socket.send(
                JSON.stringify([
                  {
                    ...ClientRequest[0],
                    ...meta,
                  },
                ]),
              );
              break;
          }
        } else {
          console.warn(`[WebSocketMock] UnMock WS ClientRequest`);
        }
      });
    });
  }

  async trigger(event: object) {
    await firstValueFrom(
      merge(
        timer(5000).pipe(
          switchMap(() =>
            throwError(() => new Error('wait websocket connection timeout')),
          ),
        ),
        this.connected$.asObservable().pipe(filter((connected) => connected)),
      ),
    );

    const message = JSON.stringify([
      serverNotification[0],
      {
        ...event,
        subscriptionId,
      },
    ]);

    this.server?.send(message);
  }

  remove() {
    this.connected$.next(false);
    this.server?.close();
    this.server = undefined;

    WS.clean();
  }
}
