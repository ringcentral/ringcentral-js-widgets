/**
 * RCI-7259: Ignore Call queue call
 * https://test_it_domain/test-cases/RCI-7259
 * Preconditions:
 * 1. User is logged into CRM
 * 2. User is logged in RC CTI App
 * 3. User selects Browser mode in Settings > Calling
 * 4. User A and User B are in a Call queue group and the Call queue setting isSimultaneous or the call queue only include user A
 * Entry point(/s):
 * 1. User is logged into CRM
 * 2. User is logged in RC CTI App
 * 3. User selects Browser mode in Settings > Calling
 * 4. User A and User B are in a Call queue group and the Call queue setting isSimultaneous or the call queue only include user A
 * Account type(/s):
 * Extension type(/s):
 * Entry point(/s): Another user make a call to the call queue that include user A -> User A receive the incoming call from the call queue.
 */
import { Webphone } from '@ringcentral-integration/micro-phone/src/app/services/Webphone';
import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import {
  p2,
  it,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  screen,
  When,
  StepFunction,
  WaitForRenderReady,
  userEvent,
  common,
} from '@ringcentral-integration/test-utils';

import { CallButtonBehavior } from '../../../steps/Call';
import { CheckToVoicemailButton } from '../../../steps/Call/checks/CheckToVoiceMailButton';

@autorun(test.skip)
@it
@p2
@common
@title('Ignore Call queue call')
export class RCI7259Base extends Step {
  CreateMock?: StepFunction<any, any>;
  CustomLogin?: StepFunction<any, any>;
  CustomMakeCallFunction?: StepFunction<any, any>;
  CustomExpectations?: StepFunction<any, any>;
  CustomDisconnectCall?: StepFunction<any, any>;
  @examples([
    {
      phoneNumber: '17204084363',
      displayName: 'Tech Support',
      avatar: 'callQueue',
    },
  ])
  run() {
    const {
      CreateMock,
      CustomLogin,
      CustomMakeCallFunction,
      CustomDisconnectCall: SetCallDisconnect,
    } = this;
    return (
      <Scenario desc="Ignore Call queue call">
        <When
          desc="User logs in to the CTI"
          action={[CreateMock, CustomLogin]}
        />
        <Then
          desc="Get an incoming queue call and ignore it"
          action={[
            ((_, { app }) => {
              const webphone = app.container.got(Webphone)!;
              jest.spyOn(webphone, 'reject');
            }) as StepFunction,
            CustomMakeCallFunction,
          ]}
        />
        <When
          desc="User clicks ignore on the call page"
          action={[
            (async (_, context) => {
              const webphone = context.app.container.got(Webphone)!;
              const sessions = webphone.sessions;
              await webphone.updateSessionsState([
                {
                  ...sessions[0],
                  callQueueName: 'Tech Support',
                },
              ]);
            }) as StepFunction,

            <CheckToVoicemailButton exists={false} />,
            <CallButtonBehavior callButtonBehaviorType={'ignore'} />,
            SetCallDisconnect,
            WaitForRenderReady,
          ]}
        />
        <Then
          desc="Check call buttons are not active, the call is not available in the active calls list"
          action={[
            (async (_, { app }) => {
              const webphone = app.container.got(Webphone)!;
              expect(webphone.reject).toHaveBeenCalled();
            }) as StepFunction,

            async () => {
              const smallCtrlButtons = screen.queryByTestId('smallCallControl');
              expect(smallCtrlButtons).not.toBeInTheDocument();
              const backButton = await whenStateOrTimerChange(() => {
                const button = screen.getByTestId('backButton');
                expect(button).toBeInTheDocument();
                return button;
              });
              await userEvent.click(backButton);

              const callsList = screen.queryByTestId('callsList');
              expect(callsList).not.toBeInTheDocument();
            },
          ]}
        />
      </Scenario>
    );
  }
}
