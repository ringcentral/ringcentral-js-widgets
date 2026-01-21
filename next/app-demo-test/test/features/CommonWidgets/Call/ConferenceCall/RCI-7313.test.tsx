import {
  ActiveCallControl,
  Webphone,
} from '@ringcentral-integration/micro-phone/src/app/services';
import {
  autorun,
  common,
  Given,
  it,
  p1,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  WaitForRenderReady,
  When,
} from '@ringcentral-integration/test-utils';

import { MakeCall } from '../../../../steps/Call';
import { CheckSectionByDataSign } from '../../../../steps/Call/checks/CheckSectionByDataSign';
import { CheckTextContent } from '../../../../steps/Common';

@autorun(test.skip)
@common
@it
@p1
@title('Call control_hang up')
export class RCI7313Base extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomLogout?: StepFunction<any, any>;
  CustomHangup?: StepFunction<any, any>;
  run() {
    const { CustomLogin, CustomHangup } = this;
    return (
      <Scenario desc="Leave conference popup can be displayed when hang up on All calls tab">
        <Given
          desc="Logged in Third-part APP and CTI"
          action={[
            CustomLogin,
            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;
              jest
                .spyOn(activeCallControl, 'checkIfConferenceCall')
                .mockImplementation(async () => {
                  return true;
                });
              jest
                .spyOn(activeCallControl, 'enableLeaveConferenceAsHost', 'get')
                .mockImplementationOnce(() => {
                  return true; // First call will return true
                })
                .mockImplementationOnce(() => {
                  return false; // Second call will return false
                });
            }) as StepFunction,
          ]}
        />
        <When
          desc="Leave log call page >All calls tab"
          action={[
            <MakeCall
              direction="Outbound"
              telephonySessionId="session-id-1"
              status="connected"
              isConferenceCall
            />,

            ((_, { app }) => {
              const webphone = app.container.got(Webphone)!;
              const connectedCall = webphone.sessions.find(
                (item) => item.callId === 'session-id-1',
              )!;
              connectedCall.callStatus = 'connected';

              const connectedCall2 = webphone.sessions.find(
                (item) => item.callId === 'session-id-1',
              )!;

              expect(connectedCall).not.toBe(null);
            }) as StepFunction,

            WaitForRenderReady,
          ]}
        />
        <Then
          desc="'Leave or end call?'confirmation popup is displayed"
          action={[
            CustomHangup,
            <CheckSectionByDataSign dataSign="leaveCall" />,
            <CheckSectionByDataSign dataSign="endCallForEveryone" />,
            <CheckSectionByDataSign dataSign="leaveOrEndCallTitle" />,
            <CheckTextContent dataSign="leaveCall" content="Leave call" />,
            <CheckTextContent
              dataSign="endCallForEveryone"
              content="End call for everyone"
            />,
            <CheckTextContent
              dataSign="leaveOrEndCallTitle"
              content="Leave or end call?"
            />,
          ]}
        />
      </Scenario>
    );
  }
}
