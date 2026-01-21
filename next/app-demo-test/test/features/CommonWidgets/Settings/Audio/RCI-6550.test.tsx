/**
 * RCI-6550: Test speaker
 * https://test_it_domain/test-cases/RCI-6550
 * Preconditions:
 * RC CTI app was installed and enabled
 * User has logged in to 3rd party
 * User has logged in to RC CTI
 * User has the following device:Default speaker device: Macbook default speakerBluetooth: AirPodsHDMI: Desktop2Virtual: Microsoft Teams audio
 * Entry point(/s):
 * Go to Settings > Audio >Output
 *
  | No. |Preconditions |Selected |Section Enabled |
  | 1 |No audio permission was granted |N/A |False |
	| 2 |Default audio device |N/A |True |
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
  common,
} from '@ringcentral-integration/test-utils';

import { DEFAULT_DEVICES } from '../../../../__mock__/mockAudioDevices';
import { CheckTestVolumeHint } from '../../../../steps/AudioSettings';
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
@title('Test speaker')
export class TestSpeaker extends Step {
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
      <Scenario
        desc="Test speaker"
        action={[
          CreateMock,
          MockSampleAudioFile,
          <Login shouldMockDevices={this.example.isMockUserMedia} />,
          <NavigateTo path="/settings/audio" />,
        ]}
      >
        <When
          desc="Direct to entry points, user is on No.1-3, {Preconditions },"
          action={<NavigateTo path="/settings/audio" />}
        />
        <Then
          desc="The 'Test speaker' is {Section Enabled}"
          action={
            <CheckButton
              selector="test-speaker-button"
              text="Test speaker"
              disabled={!this.example.isMockUserMedia}
            />
          }
        />
        {this.example.isMockUserMedia && (
          <>
            <When
              desc="For No.2-3, click'Test speaker'"
              action={[
                <SelectOptionFromDropDown
                  dropdownSelector="speakerDeviceSelect"
                  targetOption={this.example.deviceName}
                />,
                (_: any, { app }: any) => {
                  const volumeInspector = app.container.got(VolumeInspector)!;
                  volumeInspector.outputEl.setSinkId = jest.fn();
                },
                <ClickItemByDataSign dataSign="test-speaker-button" />,
              ]}
            />
            <Then
              desc="The content showed 'Playing sample sound...'in green color
										The button becomes 'Stop test'.
										The sample audio should be played to the current Speaker."
              action={[
                <CheckButton
                  selector="test-speaker-button"
                  text="Stop test"
                  disabled={false}
                />,
                <CheckTestVolumeHint
                  selector="test-speaker-hint"
                  text="Playing sample sound..."
                  color="green"
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
              desc="Click'Stop test' button"
              action={<ClickItemByDataSign dataSign="test-speaker-button" />}
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
                <CheckTestVolumeHint selector="test-speaker-hint" text="" />,
              ]}
            />
          </>
        )}
      </Scenario>
    );
  }
}
