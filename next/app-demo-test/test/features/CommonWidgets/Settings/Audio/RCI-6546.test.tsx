/**
 * RCI-6546: Test microphone
 * https://test_it_domain/test-cases/RCI-6546
 * Preconditions:
 * RC CTI app was installed and enabled
 * User has logged in to 3rd party
 * User has logged in to RC CTI
 * User has the following device:Default microphone device: Macbook default speakerBluetooth: AirPodsHDMI: Desktop2Virtual: Microsoft Teams audio
 * Entry point(/s):
 * Go to Settings > Audio >Input
 *
  | No. |Preconditions |Selected |Enabled |
  | 1 |No microphone permission was granted |N/A |False |
	| 2 |Default microphone device |N/A |True |
	| 3 |Bluetooth |True |True |

 */
// need to import before the VolumeInspector
// eslint-disable-next-line prettier/prettier
import '../../../../steps/Mock/MockCreateAudioElement';
import { VolumeInspector } from '@ringcentral-integration/micro-phone/src/app/services';
import {
  p2,
  it,
  autorun,
  examples,
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

import { DEFAULT_DEVICES } from '../../../../__mock__/mockAudioDevices';
import {
  CheckTestVolumeHint,
  MockBeforeStopRecording,
} from '../../../../steps/AudioSettings';
import {
  CheckButton,
  ClickItemByDataSign,
  SelectOptionFromDropDown,
} from '../../../../steps/Common';
import { CommonLogin } from '../../../../steps/CommonLogin';
// eslint-disable-next-line prettier/prettier
import { CreateMock, MockSampleAudioFile } from '../../../../steps/Mock';
import { NavigateTo } from '../../../../steps/Router';

// in general, default selected device id will be 'default'
const defaultOutputDeviceId = 'default';
const airPodsOutputDeviceId = DEFAULT_DEVICES.find(
  (device) => device.label === 'AirPods' && device.kind === 'audiooutput',
)?.deviceId;

// currently, app-demo-test use AudioSettingsPanel v1, so we can't enable this
@autorun(test.skip)
@common
@it
@p2
@title('Test microphone')
export class TestMicrophone extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  @examples([
    {
      // no microphone permission was granted
      isMockUserMedia: false,
    },
    {
      isMockUserMedia: true,
      deviceId: defaultOutputDeviceId,
      deviceName: 'Default - MacBook Pro Speakers (Built-in)',
    },
    {
      isMockUserMedia: true,
      deviceId: airPodsOutputDeviceId,
      deviceName: 'AirPods',
    },
  ])
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Test microphone">
        <When
          desc="Direct to entry points, user is on No.1-3, {Preconditions },"
          action={[
            CreateMock,
            MockSampleAudioFile,
            <Login shouldMockDevices={this.example.isMockUserMedia} />,
            <NavigateTo path="/settings/audio" />,
          ]}
        />
        <Then
          desc="The 'Test microphone' is {Enabled}"
          action={[
            <CheckButton
              selector="test-microphone-button"
              text="Test microphone"
              disabled={!this.example.isMockUserMedia}
            />,
          ]}
        />
        {this.example.isMockUserMedia && (
          <>
            <When
              desc="For No.2-3, click Test microphone"
              action={[
                <SelectOptionFromDropDown
                  dropdownSelector="speakerDeviceSelect"
                  targetOption={this.example.deviceName}
                />,
                <ClickItemByDataSign dataSign="test-microphone-button" />,
                (_: any, { app }: any) => {
                  const volumeInspector = app.container.got(VolumeInspector)!;
                  volumeInspector.outputEl.setSinkId = jest.fn();
                },
                UseFakeTimers,
              ]}
            />
            <Then
              desc="The button changed to 'Stop recording'.
                      A content with a countdown shows under the button saying 'Say something to check your mic level (12 sec)' in red color.
                      The countdown starts at 12.
                      [L10N]"
              action={[
                <CheckButton
                  selector="test-microphone-button"
                  text="Stop recording"
                  disabled={false}
                />,
                <CheckTestVolumeHint
                  selector="test-microphone-hint"
                  text="Say something to check your mic level (12 sec)"
                  color="red"
                />,
              ]}
            />
            <When
              desc="The countdown goes to 0"
              action={[
                <AdvanceTimersByTime ms={12e3} />,
                WaitForRenderReady,
                UseRealTimers,
                <MockBeforeStopRecording shouldTriggerStop />,
              ]}
            />
            <Then
              desc="The content become 'Playing your recording...'in green color
                      The button become 'Stop test'.
                      The voice that was recorded should be played to the current Speaker.
                      [L10N]"
              action={[
                <CheckTestVolumeHint
                  selector="test-microphone-hint"
                  text="Playing your recording..."
                  color="green"
                />,
                <CheckButton
                  selector="test-microphone-button"
                  text="Stop test"
                  disabled={false}
                />,
                (_: any, { app }: any) => {
                  const volumeInspector = app.container.got(VolumeInspector)!;
                  expect(
                    volumeInspector.outputEl.setSinkId,
                  ).toHaveBeenCalledWith(this.example.deviceId);
                },
              ]}
            />
            <When
              desc="The recording play end"
              action={(_: any, { app }: any) => {
                const volumeInspector = app.container.got(VolumeInspector)!;
                // mock native player will trigger onended when play end
                volumeInspector.onEnded();
              }}
            />
            <Then
              desc="The button change to 'Test microphone' and enabled
                      There is no content
                      [L10N]"
              action={[
                <CheckButton
                  selector="test-microphone-button"
                  text="Test microphone"
                  disabled={false}
                />,
                <CheckTestVolumeHint selector="test-microphone-hint" text="" />,
              ]}
            />
          </>
        )}
      </Scenario>
    );
  }
}
