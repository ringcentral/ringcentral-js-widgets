/**
 * RCI-802: Single Incoming Call_ Answer Call
 * https://test_it_domain/test-cases/RCI-802
 * Preconditions:
 * 1. User has logged into 3rd party.
 * Entry point(/s):
 *
 */
import { Webphone } from '@ringcentral-integration/micro-phone/src/app/services';
import {
  autorun,
  common,
  it,
  p0,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import {
  AnswerCall,
  CheckButtonExist,
  CheckIncomingCallPageExist,
  MakeInboundCall,
} from '../../../../../../../steps/Call';
import { CommonLogin } from '../../../../../../../steps/CommonLogin';

@autorun(test.skip)
@common
@it
@p0
@title('Single Incoming Call_ Answer Call')
export class RCI802 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Single Incoming Call_ Answer Call" action={Login}>
        <When
          desc="Make an inbound call"
          action={[
            <MakeInboundCall />,
            ((_, { app }) => {
              const webphone = app.container.got(Webphone)!;
              jest.spyOn(webphone, 'answer');
            }) as StepFunction,
          ]}
        />
        <Then
          desc="1.User is navigated to the incoming call page and can seean Answer button for answering call on that page.
										[L10N]"
          action={[
            CheckIncomingCallPageExist,
            <CheckButtonExist callButtonBehaviorType="answer" />,
          ]}
        />
        <When desc="Click the answer button" action={AnswerCall} />
        <Then
          desc="1. Call should be answered.
										2.User should be navigated toCall Control Page."
          action={[
            ((_, { app }) => {
              const webphone = app.container.got(Webphone)!;
              expect(webphone.answer).toHaveBeenCalled();
            }) as StepFunction,
          ]}
        />
      </Scenario>
    );
  }
}
