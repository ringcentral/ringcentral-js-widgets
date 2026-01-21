/**
 * RCI-5916: Multiple calls: End & Answer should end 'Ringing' and 'Answer' call
 * https://test_it_domain/test-cases/RCI-5916
 * Preconditions:
 * User is logged into Salesforce.
 * User is logged in RC CTI App
 * User selects Browser mode in Settings > Calling
 * Entry point(/s):
 *
  | Call1 Direction |Call1 Status |Call2 Direction |Call2 Status |Call1 Behavior |Call2Behavior |
  | Outbound |Ringing(PSTN) |Outbound |Answer |Be ended |Be ended |
	| Outbound |Hold |Outbound |Ringing |Keep hold |Be ended |
	| Inbound |Answer |Inbound |Ringing |Be ended |Keep ringing |

 * Note(/s):
 * PSTN: Should make call both to PSTN and non-PSTN number, due to call status of outbound call(not answered) is different between PSTN and non-PSTN call
 * End & Answer' will end 'Ringing' and ''Answer' status call for outbound call but only end 'Answer' call for inbound call
 */
import {
  ActiveCallControl,
  Webphone,
} from '@ringcentral-integration/micro-phone/src/app/services';
import {
  autorun,
  common,
  examples,
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

import { MakeCall } from '../../../../../steps/Call';
import { ClickItemByDataSign } from '../../../../../steps/Common';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { CreateMock } from '../../../../../steps/Mock';

@autorun(test.skip)
@common
@it
@p2
@title(
  `Multiple calls: End & Answer should end 'Ringing' and 'Answer' call Entry 1`,
)
export class RCI5916 extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => <CreateMock />;
  DoCall: StepFunction<any, any> = (props) => <MakeCall {...props} />;
  TriggerAnswerAndCall: StepFunction<any, any> = () => (
    <ClickItemByDataSign dataSign="endAndAnswer" />
  );
  phoneNumber1 = '+16572343431';
  phoneNumber2 = '+16572343432';
  phoneNumber3 = '+16572343433';
  call1SessionId = '';
  call2SessionId = '';
  call3SessionId = '';
  @examples(`
    | entry | call1Direction | call1Status | call2Direction | call2Status | call1Behavior | call2Behavior |
    | 1     | 'Outbound'     | 'connected' | 'Outbound'     | 'connected' | 'BeEnded'     | 'BeEnded'     |
    | 2     | 'Outbound'     | 'hold'      | 'Outbound'     | 'connected' | 'KeepHold'    | 'BeEnded'     |
    | 3     | 'Inbound'      | 'connected' | 'Inbound'      | 'ring'      | 'BeEnded'     | 'KeepRinging' |
  `)
  run() {
    const {
      Login,
      DoCall,
      TriggerAnswerAndCall,
      CreateMock,
      phoneNumber1,
      phoneNumber2,
      phoneNumber3,
    } = this;
    return (
      <Scenario desc="Multiple calls: End & Answer should end 'Ringing' and 'Answer' call Entry 1">
        <Given
          desc="Logged in Third-part APP and CTI"
          action={[CreateMock, Login]}
        />
        <When
          desc="> Make Call1 with{Call1 Direction}and{Call1 Status}
										> Make Call2 with{Call2 Direction}and{Call2 Status}
										> Make another inbound Call3 > Click 'End & Answer' button"
          action={[
            <DoCall
              direction={this.example.call1Direction}
              status={this.example.call1Status}
              phoneNumber={phoneNumber1}
            />,
            <DoCall
              direction={this.example.call2Direction}
              status={this.example.call2Status}
              phoneNumber={phoneNumber2}
            />,
            ((_, { app, rcMock }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;
              const webphone = app.container.got(Webphone)!;
              this.call1SessionId =
                activeCallControl.data.sessions[0].telephonySessionId;
              const session = activeCallControl.data.sessions.find(
                (a) => a.telephonySessionId !== this.call1SessionId,
              )!;
              this.call2SessionId = session.telephonySessionId;
              if (this.example.call1Status === 'hold') {
                rcMock.holdCall(this.call1SessionId);
              }

              jest.spyOn(webphone, 'answer');
              jest.spyOn(activeCallControl, 'hangUp');
            }) as StepFunction,
            <DoCall
              direction={'Inbound'}
              status={'ring'}
              phoneNumber={phoneNumber3}
            />,
            ((_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;
              const session = activeCallControl.data.sessions.find(
                (a) =>
                  a.telephonySessionId !== this.call1SessionId &&
                  a.telephonySessionId !== this.call2SessionId,
              )!;
              this.call3SessionId = session.sessionId;
            }) as StepFunction,
            TriggerAnswerAndCall,
          ]}
        />
        <Then
          desc="Call1 should {Call1 Behavior}
                Call2 should{Call2 Behavior}
                Call3 should be answered"
          action={[
            ((_, { app }) => {
              const activeCallControl = app.container.got(ActiveCallControl)!;
              const webphone = app.container.got(Webphone)!;

              if (this.example.entry === 1) {
                expect(
                  jest.mocked(activeCallControl.hangUp).mock.calls,
                ).toEqual([[this.call1SessionId], [this.call2SessionId]]);
              } else if (this.example.entry === 2) {
                expect(
                  jest.mocked(activeCallControl.hangUp).mock.calls,
                ).toEqual([[this.call2SessionId]]);
              } else {
                expect(
                  jest.mocked(activeCallControl.hangUp).mock.calls,
                ).toEqual([[this.call1SessionId]]);
              }
              expect(webphone.answer).toHaveBeenCalledWith(this.call3SessionId);
            }) as StepFunction,
          ]}
        />
      </Scenario>
    );
  }
}
