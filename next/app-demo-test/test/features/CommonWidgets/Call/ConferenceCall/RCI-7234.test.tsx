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

@autorun(test.skip)
@common
@it
@p1
@title('Call control_hang up')
export class RCI7234Base extends Step {
  CustomLogin?: StepFunction<any, any>;
  CustomLogout?: StepFunction<any, any>;
  run() {
    const { CustomLogin, CustomLogout } = this;
    return (
      <Scenario desc="Conference call is ended when click end&anwser button">
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
                .mockImplementation(() => {
                  console.log('mocked call for feature flag');
                  return true;
                });
              this.hangUp = jest
                .spyOn(activeCallControl, 'hangUp')
                .mockImplementation(async () => {
                  console.log('hangup Called');
                });
            }) as StepFunction,
            <MakeCall telephonySessionId="session-id-1" isConferenceCall />,
          ]}
        />
        <When
          desc="Receive another incoming call
										>Click end&answer button"
          action={[
            <MakeCall
              direction={'Inbound'}
              status={'ring'}
              phoneNumber={'123442332'}
            />,
            <ClickItemByDataSign dataSign="endAndAnswer" />,
          ]}
        />
        <Then
          desc="The conference is ended for all user"
          action={[
            (async (_, { app }) => {
              expect(this.hangUp).toHaveBeenCalledTimes(1);
              expect(this.hangUp).toHaveBeenCalledWith('session-id-1');
            }) as StepFunction,
          ]}
        />
      </Scenario>
    );
  }
}
