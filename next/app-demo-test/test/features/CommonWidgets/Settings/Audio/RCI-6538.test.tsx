/**
 * RCI-6538: Output - select Speaker source
 * https://test_it_domain/test-cases/RCI-6538
 * Preconditions:
 * RC CTI app was installed and enabled
 * User has logged in to 3rd party
 * User has logged in to RC CTI
 * User has the following device:Default microphone device: Macbook default speakerBluetooth: AirPodsHDMI: Desktop2Virtual: Microsoft Teams audio
 * Entry point(/s):
 * Go to Settings > Audio >Output
 *
  | No. |Preconditions |Selected |Display |Enabled |
  | 1 |No microphone permission was granted |N/A |'No device' |False |
	| 2 |Default speaker device |N/A |Default -Macbook default speaker |True |
	| 3 |Bluetooth |True |AirPods |True |
	| 4 |empty speaker device label |True |Unknown device |True |

 */
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
  common,
  StepFunction,
} from '@ringcentral-integration/test-utils';

import {
  CheckOutputSection,
  CheckRingtoneSection,
  CheckVolumeSlider,
} from '../../../../steps/AudioSettings';
import {
  CheckDropDownList,
  ClickItemByTextContent,
} from '../../../../steps/Common';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateMock } from '../../../../steps/Mock';
import { NavigateTo } from '../../../../steps/Router';

// currently, app-demo-test use AudioSettingsPanel v1, so we can't enable this
@autorun(test.skip)
@common
@it
@p2
@title('Output - select Speaker source')
export class NoDevice extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Output - select Speaker source">
        <When
          desc="User is on No.1-2, {Preconditions },"
          action={[
            CreateMock,
            <Login mockDevices={[]} />,
            <NavigateTo path="/settings/audio" />,
          ]}
        />
        <Then
          desc="Display section label: Output
										Title: Speaker source
										The Input dropdown list {Display} and {Enabled}
										Speaker volume: with a volume slider, the default value is 50%
										[L10N]"
          action={[
            <CheckOutputSection selectedItem="No devices" isEnabled={false} />,
            <CheckRingtoneSection
              selectedItem="No devices"
              isEnabled={false}
            />,
            <CheckVolumeSlider
              value="50"
              label="Speaker volume"
              dataSign="speakerVolume"
            />,
          ]}
        />
      </Scenario>
    );
  }
}

// currently, app-demo-test use AudioSettingsPanel v1, so we can't enable this
@autorun(test.skip)
@common
@it
@p2
@title('Output - select Speaker source')
export class HaveDevice extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  @examples(`
    | preconditions             | selected | selectLabel            | display                                | enabled |
    | 'Macbook default speaker' | false    | 'N/A'                  | 'Default - Macbook default microphone' | true    |
    | 'AirPods'                 | true     | 'AirPods'              | 'AirPods'                              | true    |
    | 'Unknown device'          | true     | 'Unknown device(06bb)' | 'Unknown device(06bb)'                 | true    |
  `)
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Output - select Speaker source">
        <When
          desc="User is on No.1-2, {Preconditions },"
          action={[
            CreateMock,
            <Login
              mockDevices={[
                {
                  deviceId: 'default',
                  kind: 'audiooutput',
                  label: 'Default - Macbook default speaker',
                  groupId: '1855236cbcfb',
                },
                // mock Unknown device
                {
                  deviceId: '3f56ac3b050e1fd896906bb',
                  kind: 'audiooutput',
                  label: '',
                  groupId: '12',
                },
                {
                  deviceId: '935714619096d',
                  kind: 'audiooutput',
                  label: 'AirPods',
                  groupId: '1855236cbcfbf',
                },
                {
                  deviceId: '55ea4c31f9eef7',
                  kind: 'audiooutput',
                  label: 'Macbook default speaker',
                  groupId: '0cd66aa641267fc',
                },
                {
                  deviceId: 'f3912c04ea91ffe1',
                  kind: 'audiooutput',
                  label: 'Microsoft Teams audio',
                  groupId: '13b521f5b0a03c1ff',
                },
                {
                  deviceId: '67890fghij',
                  kind: 'audiooutput',
                  label: 'Desktop2',
                  groupId: '123456',
                },
              ]}
            />,
            <NavigateTo path="/settings/audio" />,
          ]}
        />
        <Then
          desc="Display section label: Output
										Title: Speaker source
										The Input dropdown list {Display} and {Enabled}
										Speaker volume: with a volume slider, the default value is 50%
										[L10N]"
          action={
            <CheckOutputSection
              selectedItem="Default - Macbook default speaker"
              isEnabled
            />
          }
        />
        <When desc="User click output dropdown list" />
        <Then
          desc="It will display all input devices:
										Default microphone device: Macbook default speaker
										AirPods
										Desktop2
										Microsoft Teams audio"
          action={
            <CheckDropDownList
              dataSign="speakerDeviceSelect"
              options={[
                {
                  value: 'Default - Macbook default speaker',
                },
                {
                  value: 'AirPods',
                },
                {
                  value: 'Macbook default speaker',
                },
                {
                  value: 'Microsoft Teams audio',
                },
                {
                  value: 'Desktop2',
                },
                {
                  value: 'Unknown device(06bb)',
                },
              ]}
            />
          }
        />
        <When
          desc="User is on No.3, {Preconditions } and {Selected}"
          action={() => {
            if (this.example.selected) {
              return (
                <ClickItemByTextContent
                  getByRole="listbox"
                  text={this.example.selectLabel}
                />
              );
            }
          }}
        />
        <Then
          desc="The Input dropdown list {Display} and {Enabled}"
          action={() => {
            if (this.example.selected) {
              return (
                <CheckOutputSection
                  selectedItem={this.example.display}
                  isEnabled
                />
              );
            }
          }}
        />
      </Scenario>
    );
  }
}
