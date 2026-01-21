/**
 * RCI-6554: End test speaker
 * https://test_it_domain/test-cases/RCI-6554
 * Preconditions:
 * RC CTI app was installed and enabled
 * User has logged in to 3rd party
 * User has logged in to RC CTI
 * User has the following device:Default speaker device: Macbook default speakerBluetooth: AirPodsHDMI: Desktop2Virtual: Microsoft Teams audio
 * Entry point(/s):
 * Go to Settings > Audio >Output
 */
import { VolumeInspector } from '@ringcentral-integration/micro-phone/src/app/services';
import {
  p2,
  it,
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
  StepFunction,
} from '@ringcentral-integration/test-utils';

import { CheckTestVolumeHint } from '../../../../steps/AudioSettings';
import { CheckButton, ClickItemByDataSign } from '../../../../steps/Common';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateMock } from '../../../../steps/Mock';
import { NavigateTo } from '../../../../steps/Router';

// currently, app-demo-test use AudioSettingsPanel v1, so we can't enable this
@autorun(test.skip)
@it
@p2
@common
@title('End test speaker')
export class EndTestSpeaker extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="End test speaker" action={[CreateMock, Login]}>
        <When
          desc="Direct to entry points,click the'Test speaker' and wait for the sample audio play to end"
          action={[
            <NavigateTo path="/settings/audio" />,
            <ClickItemByDataSign dataSign="test-speaker-button" />,
            (_: any, { app }: any) => {
              const volumeInspector = app.container.got(VolumeInspector)!;
              // mock native player will trigger onended when play end
              volumeInspector.onEnded();
            },
          ]}
        />
        <Then
          desc="The button changed to 'Test speaker' and enabled
								There is no content"
          action={[
            <CheckButton
              selector="test-speaker-button"
              text="Test speaker"
              disabled={false}
            />,
            <CheckTestVolumeHint selector="test-microphone-hint" text="" />,
          ]}
        />
      </Scenario>
    );
  }
}
