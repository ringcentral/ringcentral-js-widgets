/**
 * RCI-6547: Stop record/test Microphone
 * https://test_it_domain/test-cases/RCI-6547
 * Preconditions:
 * RC CTI app was installed and enabled
 * User has logged in to 3rd party
 * User has logged in to RC CTI
 * User has the following device:Default microphone device: Macbook default speakerBluetooth: AirPodsHDMI: Desktop2Virtual: Microsoft Teams audio
 * Entry point(/s):
 * Go to Settings > Audio
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
  StepFunction,
  UseFakeTimers,
  AdvanceTimersByTime,
  WaitForRenderReady,
  UseRealTimers,
  common,
} from '@ringcentral-integration/test-utils';

import {
  CheckTestVolumeHint,
  MockBeforeStopRecording,
} from '../../../../steps/AudioSettings';
import { CheckButton, ClickItemByDataSign } from '../../../../steps/Common';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateMock } from '../../../../steps/Mock';
import { NavigateTo } from '../../../../steps/Router';

// currently, app-demo-test use AudioSettingsPanel v1, so we can't enable this
@autorun(test.skip)
@common
@it
@p2
@title('Stop record/test Microphone')
export class StopTestMicrophone extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="Stop record/test Microphone"
        action={[CreateMock, Login, <NavigateTo path="/settings/audio" />]}
      >
        <When
          desc="
            Direct to entry points, click Test microphone, say 'ABCABC' for 10 seconds
            The content display: 'Say something to check your mic level (2 sec)'"
          action={[
            <NavigateTo path="/settings/audio" />,
            <ClickItemByDataSign dataSign="test-microphone-button" />,
            UseFakeTimers,
            <AdvanceTimersByTime ms={10e3} />,
            WaitForRenderReady,
            UseRealTimers,
            MockBeforeStopRecording,
            (_: any, { app }: any) => {
              const volumeInspector = app.container.got(VolumeInspector)!;
              jest.spyOn(volumeInspector.outputEl, 'play');
              jest.spyOn(volumeInspector.outputEl, 'pause');
            },
            // click stop recording
            <CheckTestVolumeHint
              selector="test-microphone-hint"
              text="Say something to check your mic level (2 sec)"
              color="red"
            />,
          ]}
        />
        <When
          desc="Click the Stop record microphone"
          action={<ClickItemByDataSign dataSign="test-microphone-button" />}
        />
        <Then
          desc="The button become 'Stop test'.
								The recording 'ABC' is playing"
          action={[
            <CheckButton selector="test-microphone-button" text="Stop test" />,
            (_: any, { app }: any) => {
              const volumeInspector = app.container.got(VolumeInspector)!;
              expect(volumeInspector.outputEl.play).toHaveBeenCalledTimes(1);
            },
          ]}
        />
        <When
          desc="Click 'Stop test'"
          action={<ClickItemByDataSign dataSign="test-microphone-button" />}
        />
        <Then
          desc="The rest recording 'ABCABC' is stop playing
								The button change to 'Test microphone' and enabled"
          action={[
            (_: any, { app }: any) => {
              const volumeInspector = app.container.got(VolumeInspector)!;
              expect(volumeInspector.outputEl.pause).toHaveBeenCalledTimes(1);
            },
            <CheckButton
              selector="test-microphone-button"
              text="Test microphone"
              disabled={false}
            />,
          ]}
        />
      </Scenario>
    );
  }
}
