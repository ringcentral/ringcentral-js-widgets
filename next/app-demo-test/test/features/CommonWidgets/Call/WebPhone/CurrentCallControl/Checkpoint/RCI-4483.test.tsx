/**
 * RCI-4483: Verify the record for the user who no permission to manual record
 * https://test_it_domain/test-cases/RCI-4483
 * Preconditions:
 * <ol><li>The user has logged into 3rd party.</li><li>The user who has no permission to make his own manual recording <span style='background-color: transparent;'>has logged into RC CTI App</span></li><li>WebPhone is enabled and 'Browser'  is selected in Settings > Calling > Make my calls with</li></ol>
<p><strong><span style='color:#669966'>
 * Entry point(/s):
 * ntry point(/s): </span></strong></p><p>> Make an<span style='font-weight: bolder;'> </span>inbound call to CTI</p><p style='margin-bottom: 5px;'>> Answer the inbound call</p>
 */
import { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import { Webphone } from '@ringcentral-integration/micro-phone/src/app/services';
import {
  autorun,
  common,
  Given,
  it,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import {
  CallButtonBehavior,
  CheckButtonExist,
  MakeCall,
} from '../../../../../../steps/Call';
import { CommonLogin } from '../../../../../../steps/CommonLogin';

@autorun(test.skip)
@common
@it
@p2
@title('Verify the record for the user who no permission to manual record')
export class RCI4483 extends Step {
  Login: StepFunction<any, any> = CommonLogin;

  run() {
    const { Login } = this;
    return (
      <Scenario desc="Verify the record for the user who no permission to manual record">
        <Given
          desc="> Make an inbound call to CTI
            > Answer the inbound call"
          action={[
            Login,
            <MakeCall
              direction="Inbound"
              useUserAgentSession
              status="connected"
            />,
            ((_, { app }) => {
              const webphone = app.container.got(Webphone)!;
              const alert = app.container.got(Alert)!;
              const sid = webphone.sessions[0].id;
              jest.spyOn(alert, 'danger');
              jest
                .spyOn(webphone.originalSessions[sid], 'startRecord')
                .mockRejectedValue({
                  code: -5,
                });
            }) as StepFunction,
          ]}
        />
        <When
          desc="Press 'Record' button"
          action={<CallButtonBehavior callButtonBehaviorType="record" />}
        />
        <Then
          desc="Show prompted error message 'Sorry, your account does not have the feature to record a call. Please contact your account administrator.'
										The button keep in 'Record' status
										[L10N]"
          action={[
            ((_, { app }) => {
              const alert = app.container.got(Alert)!;
              expect(alert.danger).toHaveBeenCalledWith({
                message: 'webphone-recordDisabled',
              });
            }) as StepFunction,
            <CheckButtonExist callButtonBehaviorType="record" />,
          ]}
        />
      </Scenario>
    );
  }
}
