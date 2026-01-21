/**
 * RCI-808: Single/second incoming Call_ Send to voicemail
 * https://test_it_domain/test-cases/RCI-808
 * Preconditions:
 *
 * Entry point(/s):
 * 1. Make an inbound call
 * 2. Make a call and keep in call control page, then make an inbound call
 */
import { Webphone } from '@ringcentral-integration/micro-phone/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  autorun,
  common,
  examples,
  it,
  p1,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import {
  CallItemButtonBehavior,
  CheckActiveCallExist,
  CheckButtonExist,
  CheckIncomingCallPageExist,
  MakeCall,
  MakeInboundCall,
} from '../../../../../../../steps/Call';
import { CommonLoginEntry } from '../../../../../../../steps/CommonLogin';
import { TriggerActiveCallChanged } from '../../../../../../../steps/Mock';
import { CheckRouterNavigation } from '../../../../../../../steps/Navigate';

@autorun(test)
@common
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
            ((_, { app, payload }) => {
              const webphone = app.container.got(Webphone)!;
              jest.spyOn(webphone, 'toVoiceMail');
              payload.toVoiceMailCallId = webphone.sessions.find(
                (item) => item.to === voiceMailCall,
              )?.id;
            }) as StepFunction,
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
            (async (_, { app, payload }) => {
              const webphone = app.container.got(Webphone)!;
              expect(webphone.toVoiceMail).toHaveBeenCalled();
              expect(webphone.toVoiceMail).toHaveBeenCalledWith(
                payload.toVoiceMailCallId,
              );
            }) as StepFunction,
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
