/**
 * RCI-802: Single Incoming Call_ Answer Call
 * https://test_it_domain/test-cases/RCI-802
 * Preconditions:
 * 1. User has logged into 3rd party.
 * Entry point(/s):
 *
 */

import {
  p0,
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
import type { StepFunction } from '../../../../../../../lib/step';
import {
  AnswerCall,
  CheckButtonExist,
  CheckIncomingCallPageExist,
  MakeInboundCall,
} from '../../../../../../../steps/Call';
import { CommonLogin } from '../../../../../../../steps/CommonLogin';
import { MockCallPresence } from '../../../../../../../steps/Mock';

@autorun(test.skip)
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
            (_: any, { phone }: any) => {
              jest.spyOn(phone.webphone, 'answer');
            },
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
            (_: any, { phone }: any) => {
              expect(phone.webphone.answer).toBeCalled();
            },
          ]}
        />
      </Scenario>
    );
  }
}
