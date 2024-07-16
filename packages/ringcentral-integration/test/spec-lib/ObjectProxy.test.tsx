import {
  Scenario,
  Step,
  Then,
  When,
  autorun,
  title,
  ut,
} from '@ringcentral-integration/test-utils';

import { ObjectProxy } from '../../lib/ObjectProxy';

@autorun(test)
@ut
@title('UT for ObjectProxy')
class ObjectProxyTest extends Step {
  run() {
    let proxyChrome: typeof chrome;
    const sendMessageSpy = jest.fn();
    const addListenerSpy = jest.fn();
    return (
      <Scenario desc="Check ObjectProxy">
        <When
          desc="Environment"
          action={() => {
            const _chrome: typeof chrome = {
              runtime: {
                sendMessage: sendMessageSpy,
              },
            } as any;
            const _chromeProxy: typeof chrome = {
              runtime: {
                onMessage: {
                  addListener: addListenerSpy,
                },
              },
            } as any;
            const objectProxy = new ObjectProxy(_chrome, _chromeProxy);
            proxyChrome = objectProxy.create();
          }}
        />
        <Then
          desc="Check behaviors"
          action={() => {
            // call to source object
            proxyChrome.runtime.sendMessage('test');
            expect(sendMessageSpy).toHaveBeenCalledWith('test');
            // call to delegated object
            proxyChrome.runtime.onMessage.addListener(() => {});
            expect(addListenerSpy).toHaveBeenCalledTimes(1);
            // "set" is not allowed
            expect(() => {
              proxyChrome.runtime = {} as any;
            }).toThrow('Setting properties is not allowed');
          }}
        />
      </Scenario>
    );
  }
}
