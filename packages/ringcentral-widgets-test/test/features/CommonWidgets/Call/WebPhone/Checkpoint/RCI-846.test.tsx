/**
 * RCI-846: Multiple calls incoming_answer and hold
 * https://test_it_domain/test-cases/RCI-846
 * Preconditions:
 * 2. User has logged into RC CTI App
 * Entry point(/s):
 * Make a call and keep in call control page
 */
import {
  p1,
  it,
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
  Given,
} from '@ringcentral-integration/test-utils';

import type { StepFunction } from '../../../../../lib/step';
import {
  CallItemButtonBehavior,
  CheckAllCallsListPage,
  MakeCall,
  MakeInboundCall,
} from '../../../../../steps/Call';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import {
  CreateMock as CommonCreateMock,
  TriggerActiveCallChanged,
  MockActiveCall,
} from '../../../../../steps/Mock';

@autorun(test.skip)
@it
@p1
@title('Multiple calls incoming_answer and hold')
export class RCI846 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="Multiple calls incoming_answer and hold"
        action={[
          CreateMock,
          <MockActiveCall repeat={0} />,
          Login,
          (_, { phone }) => {
            jest.spyOn(phone.webphone, 'answer');
            jest.spyOn(phone.webphone, '_onAccepted');
            jest.spyOn(phone.webphone, '_holdOtherSession');
          },
        ]}
      >
        <Given
          desc="Make a call and keep in call control page"
          action={() => [
            <MakeCall
              phoneNumber="15552556247"
              direction="Inbound"
              status="connected"
            />,
          ]}
        />
        <When
          desc="Make more than two calls incoming simultaneously"
          action={[
            <MakeInboundCall phoneNumber="+18882556247" />,
            TriggerActiveCallChanged,
            <MakeInboundCall phoneNumber="+18882556248" />,
            TriggerActiveCallChanged,
          ]}
        />
        <Then
          desc="User directs to all calls list page"
          action={CheckAllCallsListPage}
        />
        <When
          desc="Click on answer button(one of new calls)"
          action={<CallItemButtonBehavior callButtonBehaviorType="accept" />}
        />
        <Then
          desc="The new call is answered
										The current call is held
										The other new calls status will not be changed"
          action={[
            (_: any, { phone }: any) => {
              const firstIncomingCall = phone.webphone.sessions.find(
                (item) =>
                  item.direction === 'Inbound' &&
                  item.callStatus === 'webphone-session-connecting',
              );
              // The new call is answered
              expect(phone.webphone.answer).toHaveBeenCalledWith(
                firstIncomingCall.id,
              );
              expect(phone.webphone._onAccepted).toHaveBeenCalledWith(
                expect.objectContaining({
                  id: firstIncomingCall.id,
                }),
              );
              // other call would be held
              expect(phone.webphone._holdOtherSession).toHaveBeenCalledWith(
                firstIncomingCall.id,
              );
            },
          ]}
        />
      </Scenario>
    );
  }
}
