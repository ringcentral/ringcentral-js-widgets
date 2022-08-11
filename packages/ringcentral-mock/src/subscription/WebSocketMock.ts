import JestWebSocketMock from 'jest-websocket-mock';

import { waitUntilTo } from '@ringcentral-integration/commons/utils';

import ClientRequest from '../platform/data/ws/clientRequest.json';
import wsConnectionDetailsBody from '../platform/data/ws/connectionDetails.json';
import wsHeartbeatResponse from '../platform/data/ws/heartbeatResponse.json';
import serverNotification from '../platform/data/ws/serverNotification.json';
import wsSubscriptionResponse from '../platform/data/ws/subscriptionResponse.json';
import { SubscriptionMock } from './interface';

const subscriptionId = wsSubscriptionResponse[1].id;
export class WebSocketMock implements SubscriptionMock {
  connected = false;
  server?: JestWebSocketMock;
  constructor() {
    this.subscribe();
  }
  subscribe() {
    // to do: we need to think if there should be opmitimized when there are other events we should add.
    try {
      if (this.server || this.connected) {
        return;
      }
      const fakeURL = 'ws://whatever';
      this.server = new JestWebSocketMock(fakeURL);
      this.server.on('connection', (socket) => {
        // type: ConnectionDetails
        socket.send(JSON.stringify(wsConnectionDetailsBody));
        socket.on('message', (message) => {
          const [meta, body] = JSON.parse(message);
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
                this.connected = true;
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
          }
        });
      });
    } catch (e) {
      console.warn(`A mock server is already listening on this url`, e);
    }
  }

  async trigger(event: object) {
    // FIXME: should change to event way better.
    await waitUntilTo(
      () => {
        expect(this.connected).toBeTruthy();
      },
      {
        interval: 100,
        timeout: 30000,
      },
    );
    const message = JSON.stringify([
      serverNotification[0],
      {
        ...event,
        subscriptionId,
      },
    ]);
    this.server!.send(message);
  }

  remove() {
    this.connected = false;
    this.server?.close();
    this.server = undefined;
    try {
      JestWebSocketMock.clean();
    } catch (e) {
      console.warn(`there is some error when removing WS Connection:: ${e}`);
    }
  }
}
