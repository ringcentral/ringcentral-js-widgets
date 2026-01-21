/**
 * RCI-846: Multiple calls incoming_answer and hold
 * https://test_it_domain/test-cases/RCI-846
 * Preconditions:
 * 2. User has logged into RC CTI App
 * Entry point(/s):
 * Make a call and keep in call control page
 */
import { Webphone } from '@ringcentral-integration/micro-phone/src/app/services';
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
  When,
} from '@ringcentral-integration/test-utils';

import {
  CallItemButtonBehavior,
  CheckAllCallsListPage,
  MakeCall,
  MakeInboundCall,
} from '../../../../../steps/Call';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import {
  CreateMock as CommonCreateMock,
  MockActiveCall,
  TriggerActiveCallChanged,
} from '../../../../../steps/Mock';

@autorun(test.skip)
@common
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
          ((_, { app }) => {
            const webphone = app.container.got(Webphone)!;
            jest.spyOn(webphone, 'answer');
            jest.spyOn(webphone, '_onAccepted');
            jest.spyOn(webphone, '_holdOtherSession');
          }) as StepFunction,
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
            ((_, { app }) => {
              const webphone = app.container.got(Webphone)!;
              const firstIncomingCall = webphone.sessions.find(
                (item) =>
                  item.direction === 'Inbound' &&
                  item.callStatus === 'webphone-session-connecting',
              )!;
              // The new call is answered
              expect(webphone.answer).toHaveBeenCalledWith(
                firstIncomingCall.id,
              );
              expect(webphone._onAccepted).toHaveBeenCalledWith(
                expect.objectContaining({
                  id: firstIncomingCall.id,
                }),
              );
              // other call would be held
              expect(webphone._holdOtherSession).toHaveBeenCalledWith(
                firstIncomingCall.id,
              );
            }) as StepFunction,
          ]}
        />
      </Scenario>
    );
  }
}
