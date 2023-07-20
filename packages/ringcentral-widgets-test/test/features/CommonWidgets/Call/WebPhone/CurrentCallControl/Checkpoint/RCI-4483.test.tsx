/**
 * RCI-4483: Verify the record for the user who no permission to manual record
 * https://test_it_domain/test-cases/RCI-4483
 * Preconditions:
 * <ol><li>The user has logged into 3rd party.</li><li>The user who has no permission to make his own manual recording <span style='background-color: transparent;'>has logged into RC CTI App</span></li><li>WebPhone is enabled and 'Browser'  is selected in Settings > Calling > Make my calls with</li></ol>
<p><strong><span style='color:#669966'>
 * Entry point(/s):
 * ntry point(/s): </span></strong></p><p>> Make an<span style='font-weight: bolder;'> </span>inbound call to CTI</p><p style='margin-bottom: 5px;'>> Answer the inbound call</p>
 */

import type { StepProp } from '@ringcentral-integration/test-utils';
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
  When,
} from '@ringcentral-integration/test-utils';
import type { Context } from '../../../../../../interfaces';
import {
  CallButtonBehavior,
  CheckButtonExist,
  MakeCall,
} from '../../../../../../steps/Call';
import { CommonLogin } from '../../../../../../steps/CommonLogin';

@autorun(test.skip)
@it
@p2
@title('Verify the record for the user who no permission to manual record')
export class RCI4483 extends Step {
  Login: StepProp = CommonLogin;

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
            (_, { phone }: Context) => {
              const sid = phone.webphone.sessions[0].id;
              jest.spyOn(phone.alert, 'danger');
              jest
                .spyOn(phone.webphone.originalSessions[sid], 'startRecord')
                .mockRejectedValue({
                  code: -5,
                });
            },
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
            (_, { phone }: Context) => {
              expect(phone.alert.danger).toBeCalledWith({
                message: 'webphone-recordDisabled',
              });
            },
            <CheckButtonExist callButtonBehaviorType="record" />,
          ]}
        />
      </Scenario>
    );
  }
}
