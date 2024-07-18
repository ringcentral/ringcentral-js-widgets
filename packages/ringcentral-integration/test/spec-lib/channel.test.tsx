import {
  autorun,
  Scenario,
  Step,
  Then,
  title,
  ut,
  When,
} from '@ringcentral-integration/test-utils';

import { Channel } from '../../lib/channel';

@autorun(test)
@ut
@title('Channel Test')
export class ChannelTest extends Step {
  run() {
    let channel: Channel;
    let sendRuntimeMessage: jest.SpyInstance;
    let sendTabMessageSpy: jest.SpyInstance;
    let onMessageHandler: (
      message: any,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: any) => void,
    ) => void;
    const fakeActionHandler = jest.fn();
    return (
      <Scenario
        desc="Channel Test"
        action={() => {
          sendRuntimeMessage = jest.spyOn(chrome.runtime, 'sendMessage');
          jest
            .spyOn(chrome.runtime.onMessage, 'addListener')
            .mockImplementation((handler) => {
              onMessageHandler = handler;
            });
          const tab: chrome.tabs.Tab = { id: 123 } as any;
          jest.spyOn(chrome.tabs, 'query').mockResolvedValue([tab]);
          sendTabMessageSpy = jest.spyOn(chrome.tabs, 'sendMessage');
        }}
      >
        <When
          desc="Channel is created"
          action={() => {
            channel = new Channel('my-channel-type');
          }}
        />
        <Then
          desc="Method 'select' should work as expected"
          action={() => {
            const action = 'fake-action';
            channel.select(action, fakeActionHandler);
            expect(channel._mux[action]).toBe(fakeActionHandler);
          }}
        />
        <Then
          desc="Method 'send' should work as expected"
          action={async () => {
            await channel.send({ message: 'my-message' });
            expect(sendRuntimeMessage).toHaveBeenCalledWith({
              type: 'my-channel-type',
              message: 'my-message',
            });
          }}
        />
        <Then
          desc="Method 'broadcast' should work as expected"
          action={async () => {
            await channel.broadcast({ message: 'my-broadcast' });
            expect(sendTabMessageSpy).toHaveBeenCalledWith(123, {
              type: 'my-channel-type',
              message: 'my-broadcast',
            });
          }}
        />
        <Then
          desc="Method '_make' should work as expected"
          action={async () => {
            const sender = { id: 'sender-id' };
            const message = {
              type: 'my-channel-type',
              action: 'fake-action',
            };

            // handler respond success
            await new Promise((resolve) => {
              fakeActionHandler
                .mockReset()
                .mockReturnValue(Promise.resolve(true));
              const asyncFlag = onMessageHandler(message, sender, (res) => {
                expect(fakeActionHandler).toHaveBeenCalledWith(message, sender);
                expect(res).toBe(true);
                resolve(res);
              });
              expect(asyncFlag).toBe(true);
            });

            // handler respond failed
            await new Promise((resolve) => {
              fakeActionHandler
                .mockReset()
                .mockReturnValue(Promise.reject('any reason'));
              const asyncFlag = onMessageHandler(message, sender, (res) => {
                expect(fakeActionHandler).toHaveBeenCalledWith(message, sender);
                expect(res).toBe(undefined);
                resolve(res);
              });
              expect(asyncFlag).toBe(true);
            });

            // action type not match
            fakeActionHandler.mockReset();
            const otherMessage = { type: 'other-type' };
            const asyncFlag = onMessageHandler(otherMessage, sender, () => {});
            expect(asyncFlag).toBe(false);
            expect(fakeActionHandler).toHaveBeenCalledTimes(0);
          }}
        />
      </Scenario>
    );
  }
}
