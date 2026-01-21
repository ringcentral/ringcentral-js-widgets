import {
  Given,
  Scenario,
  Step,
  Then,
  When,
  autorun,
  it,
  title,
} from '@ringcentral-integration/test-utils';

import { ActiveCallControl } from '../../../../src/app/services';
import { type Context } from '../../../interfaces';
import { LoginWithMock } from '../../../steps/Entry';

import startRingServerNotification from './startRingServerNotification.json';
import stopRingServerNotification from './stopRingServerNotification.json';

// TODO: Jest worker encountered 4 child process exceptions
@autorun(test.skip)
@it
@title('Ring start/stop message subscription')
class RingMessageSubscriptionTest extends Step {
  run() {
    let activeCallControl: ActiveCallControl;
    return (
      <Scenario desc="Ring start/stop message subscription">
        <Given
          desc="App started with user logged in"
          action={[
            <LoginWithMock />,
            (_: unknown, context: Context) => {
              activeCallControl = context.app.container.got(ActiveCallControl)!;
              expect(activeCallControl).toBeDefined();
              // spy
              jest.spyOn(activeCallControl, 'addRingMessage');
              jest.spyOn(activeCallControl, 'removeRingMessage');
            },
          ]}
        />

        <When
          desc="Received start-ring message"
          action={async (_: unknown, context: Context) => {
            // Trigger start-ring message
            await context.rcMock.subscription.trigger(
              startRingServerNotification[1],
            );
          }}
        />
        <Then
          desc="Ring message should be cached with telephony session id"
          action={() => {
            // Check action being called
            expect(activeCallControl.addRingMessage).toHaveBeenCalledWith(
              startRingServerNotification[1].body?.telephonySessionId,
              startRingServerNotification[1].body,
            );
            // Check cached message
            const telephonySessionId =
              startRingServerNotification[1].body?.telephonySessionId!;
            expect(telephonySessionId).toBeDefined();
            expect(
              (activeCallControl as any).ringMessages[telephonySessionId],
            ).toEqual(startRingServerNotification[1].body);
          }}
        />

        <When
          desc="Received stop-ring message"
          action={async (_: unknown, context: Context) => {
            // Trigger stop-ring message
            await context.rcMock.subscription.trigger(
              stopRingServerNotification[1],
            );
          }}
        />
        <Then
          desc="Ring message that is cached should be removed"
          action={() => {
            // Check action being called
            expect(activeCallControl.removeRingMessage).toHaveBeenCalledWith(
              stopRingServerNotification[1].body?.telephonySessionId,
            );
            // Check cached message
            const telephonySessionId =
              startRingServerNotification[1].body?.telephonySessionId!;
            expect(telephonySessionId).toBeDefined();
            expect(
              (activeCallControl as any).ringMessages[telephonySessionId],
            ).toBeUndefined();
          }}
        />
      </Scenario>
    );
  }
}
