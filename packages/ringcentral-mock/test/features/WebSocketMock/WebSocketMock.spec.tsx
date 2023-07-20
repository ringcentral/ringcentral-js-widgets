import React from 'react';
import { WS } from 'jest-websocket-mock';

import { BehaviorSubject, filter, firstValueFrom } from 'rxjs';

import { RcMock, WebSocketMock } from '@ringcentral-integration/mock';
import { render } from '@ringcentral-integration/test-utils';

import { App } from './App';

beforeEach(() => {
  (global as any).SUBSCRIBE_CALLBACK = new BehaviorSubject(false);
});

afterEach(() => {
  WS.clean();
});
describe('WebSocket Mock work', () => {
  it.each`
    search
    ${1}
    ${1}
    ${1}
    ${1}
    ${1}
  `(
    'the server keeps track of received messages, and yields them as they come in',
    async () => {
      const server = new WS('ws://localhost:1234');
      const client = new WebSocket('ws://localhost:1234');

      await server.connected;
      client.send('hello');
      await expect(server).toReceiveMessage('hello');
      expect(server).toHaveReceivedMessages(['hello']);
    },
  );

  it.each`
    search
    ${1}
    ${1}
    ${1}
    ${1}
    ${1}
  `(
    'Run many times to check run twice without issue with WS clean',
    async () => {
      const socketMock = new WebSocketMock();
      const rcMock = new RcMock({
        subscription: socketMock,
        enableValidation: true,
      });
      rcMock.init();

      render(<App />);

      rcMock.subscription.trigger({ example: '123' });

      const result = await firstValueFrom(
        (global as any).SUBSCRIBE_CALLBACK.asObservable().pipe(
          filter((connected) => !!connected),
        ),
      );
      expect(result).toEqual(expect.objectContaining({ example: '123' }));
    },
  );
});
