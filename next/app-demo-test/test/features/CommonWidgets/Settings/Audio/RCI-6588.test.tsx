/**
 * RCI-6588: Disabled the input/ringtone section when user has ringing call or on a call
 * https://test_it_domain/test-cases/RCI-6588
 * Preconditions:
 * RC CTI app was installed and enabled
 * User has logged in to 3rd party
 * User has logged in to RC CTI
 * User has the following device:Default microphone device: Macbook default microphoneBluetooth: AirPodsHDMI: Desktop2Virtual: Microsoft Teams audio
 * Entry point(/s):
 * User receive an incoming call, go to Settings > Audio
 * User answers an incoming call, go to Settings > Audio
 * User make an outbound call, go to Settings > Audio
 */
import {
  p2,
  it,
  autorun,
  examples,
  And,
  Scenario,
  Step,
  Then,
  title,
  When,
  StepFunction,
  screen,
  common,
} from '@ringcentral-integration/test-utils';

import { CheckInputSection } from '../../../../steps/AudioSettings';
import { AnswerCall, MakeCall } from '../../../../steps/Call';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateMock, TriggerActiveCallChanged } from '../../../../steps/Mock';
import { NavigateTo } from '../../../../steps/Router';

// currently, app-demo-test use AudioSettingsPanel v1, so we can't enable this
@autorun(test.skip)
@common
@it
@p2
@title(
  'Disabled the input/ringtone section when user has ringing call or on a call',
)
export class DisableRingtoneDuringCall extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  useUserAgentSession = true;
  @examples(`
    | direction  | isConnect |
    | 'Inbound'  | false     |
    | 'Inbound'  | true      |
    | 'Outbound' | false     |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Disabled the input section when user has ringing call or on a call">
        <When
          desc="Direct to entry points, check the Input section"
          action={[
            CreateMock,
            Login,
            <MakeCall
              useUserAgentSession={this.useUserAgentSession}
              direction={this.example.direction}
            />,
            () => {
              if (this.example.isConnect) {
                return <AnswerCall />;
              }
            },
            TriggerActiveCallChanged,
            <NavigateTo path="/settings/audio" />,
          ]}
        />
        <Then
          desc="The Input section is disabled"
          action={<CheckInputSection isEnabled={false} />}
        />
        <And
          desc="The Ringtone section is disabled"
          action={() => {
            expect(
              screen.queryByTestId('ringtoneSelection')?.querySelector('input'),
            ).toBeDisabled();
          }}
        />
      </Scenario>
    );
  }
}
