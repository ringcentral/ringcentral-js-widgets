import { skipWebSocketClosedError } from '@ringcentral-integration/app-demo-test/test/lib/skipWebSocketClosedError';
import { NavigateTo } from '@ringcentral-integration/app-demo-test/test/steps/Router';
import { PartyStatusCode } from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';
import { ActiveCallControl } from '@ringcentral-integration/micro-phone/src/app/services';
import {
  autorun,
  type Context,
  Given,
  it,
  p1,
  Scenario,
  Step,
  Then,
  title,
  When,
  WaitForRenderReady,
  common,
  StepFunction,
} from '@ringcentral-integration/test-utils';

import { MakeCall } from '../../../../steps/Call';
import { CheckSectionByDataSign } from '../../../../steps/Call/checks/CheckSectionByDataSign';
import { CheckTextContent } from '../../../../steps/Common';
import { ClickItemByDataSign } from '../../../../steps/Common/actions/ClickItemByDataSign';
import { Logout } from '../../../../steps/Logout';

skipWebSocketClosedError();

@autorun(test.skip)
@it
@p1
@common
@title('Call control_hang up')
export class RCI7238Base extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomLogout?: StepFunction<any, any>;
  CustomHangup?: StepFunction<any, any>;
  run() {
    const { CustomLogin, CustomLogout, CustomHangup } = this;
    return (
      <Scenario desc="Only the user in FFS can see the leave conference confirmation">
        <Given
          desc="Logged in Third-part APP and CTI"
          action={[
            CustomLogin,

            (async (_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;
              jest
                .spyOn(activeCallControl, 'checkIfConferenceCall')
                .mockImplementation(async () => {
                  console.log('mocked call for is conference call');
                  return true;
                });
              jest
                .spyOn(activeCallControl, 'enableLeaveConferenceAsHost', 'get')
                .mockImplementationOnce(() => {
                  console.log('First call - returning true');
                  return true; // First call will return true
                })
                .mockImplementationOnce(() => {
                  console.log('Second call - returning false');
                  return false; // Second call will return false
                });
            }) as StepFunction,
          ]}
        />
        <When
          desc="Login SF CTI using a account which is in the feature flag: rc-app-desktop.app.enable_leave_conf_as_host >user is in a conference call
										>Click end call button"
          action={[
            <MakeCall telephonySessionId="session-id-1" isConferenceCall />,

            CustomHangup,
          ]}
        />
        <Then
          desc="Leave conference confirmation popup is displayed"
          action={[
            <CheckSectionByDataSign dataSign="leaveCall" />,
            <CheckSectionByDataSign dataSign="endCallForEveryone" />,
            <CheckSectionByDataSign dataSign="leaveOrEndCallTitle" />,
            <ClickItemByDataSign dataSign="endCallForEveryone" />,
          ]}
        />
        <When
          desc="Logout and login CTI using another account which has no thefeature flag
										>user is in a conference call
										>Click end call button"
          action={[CustomLogout, CustomLogin]}
        />
        <Then
          desc="Leave conference confirmation popup is not displayed"
          action={[
            <MakeCall telephonySessionId="session-id-1" isConferenceCall />,
            CustomHangup,
            <CheckSectionByDataSign
              dataSign="leaveConferenceCallDrawer"
              isShow={false}
            />,
            <CheckSectionByDataSign dataSign="leaveCall" isShow={false} />,
            <CheckSectionByDataSign
              dataSign="endCallForEveryone"
              isShow={false}
            />,
            <CheckSectionByDataSign
              dataSign="leaveOrEndCallTitle"
              isShow={false}
            />,
          ]}
        />
      </Scenario>
    );
  }
}
