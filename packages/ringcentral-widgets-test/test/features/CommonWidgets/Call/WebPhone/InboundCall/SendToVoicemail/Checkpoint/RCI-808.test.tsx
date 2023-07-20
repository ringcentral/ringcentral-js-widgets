/**
 * RCI-808: Single/second incoming Call_ Send to voicemail
 * https://test_it_domain/test-cases/RCI-808
 * Preconditions:
 *
 * Entry point(/s):
 * 1. Make an inbound call
 * 2. Make a call and keep in call control page, then make an inbound call
 */

import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  p1,
  it,
  autorun,
  examples,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import {
  CallItemButtonBehavior,
  MakeInboundCall,
  CheckActiveCallExist,
  CheckButtonExist,
  CheckIncomingCallPageExist,
  MakeCall,
} from '../../../../../../../steps/Call';
import { CheckRouterNavigation } from '../../../../../../../steps/Navigate';
import { CommonLoginEntry } from '../../../../../../../steps/CommonLogin';
import { TriggerActiveCallChanged } from '../../../../../../../steps/Mock';

@autorun(test)
@it
@p1
@title('Single/second incoming Call_ Send to voicemail - ${actionType}')
export class RCI808 extends Step {
  Login: StepFunction<any, any> = CommonLoginEntry;
  @examples(`
    | actionType    | voiceMailCall |
    | 'single_call' | '18882556241' |
    | 'second_call' | '18882556241' |
  `)
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Single/second incoming Call_ Send to voicemail">
        <When
          desc="Direct to entry points"
          action={async ({ actionType, voiceMailCall }: any) => [
            Login,
            <MakeCall
              useUserAgentSession
              direction="Inbound"
              phoneNumber={
                actionType === 'second_call' ? undefined : voiceMailCall
              }
              status={actionType === 'second_call' ? 'connected' : 'ring'}
            />,
            actionType === 'second_call' ? (
              <MakeInboundCall
                phoneNumber={voiceMailCall}
                useUserAgentSession
              />
            ) : (
              () => {}
            ),
            TriggerActiveCallChanged,
            (_: any, { phone, payload }: any) => {
              jest.spyOn(phone.webphone, 'toVoiceMail');
              payload.toVoiceMailCallId = phone.webphone.sessions.find(
                (item) => item.to === voiceMailCall,
              )?.id;
            },
          ]}
        />
        <Then
          desc="User is navigated to incoming call page and 'To Voicemail' button is shown
										[L10N]"
          action={[
            CheckIncomingCallPageExist,
            <CheckButtonExist callButtonBehaviorType="toVoiceMail" />,
          ]}
        />
        <When
          desc="Press 'To Voicemail' button"
          action={
            <CallItemButtonBehavior callButtonBehaviorType="toVoiceMail" />
          }
        />
        <Then
          desc="Caller is send to voicemail
                User goes back to last page he/she is viewing."
          action={async ({ actionType }: any) => [
            async (_: any, { phone, payload }: any) => {
              expect(phone.webphone.toVoiceMail).toBeCalled();
              expect(phone.webphone.toVoiceMail).toBeCalledWith(
                payload.toVoiceMailCallId,
              );
            },
            actionType === 'single_call' ? (
              <CheckRouterNavigation toPage="Dialer" />
            ) : (
              CheckActiveCallExist
            ),
          ]}
        />
      </Scenario>
    );
  }
}
