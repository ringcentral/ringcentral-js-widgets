/**
 * RCI-6537: Input - select Microphone
 * https://test_it_domain/test-cases/RCI-6537
 * Preconditions:
 * RC CTI app was installed and enabled
 * User has logged in to 3rd party
 * User has logged in to RC CTI
 * User has the following device:Default microphone device: Macbook default microphoneBluetooth: AirPodsHDMI: Desktop2Virtual: Microsoft Teams audio
 * Entry point(/s):
 * Go to Settings > Audio
 *
  | No. |Preconditions |Selected |Display |Enabled |
  | 1 |No microphone permission was granted |N/A |'No devices' |False |
	| 2 |Default Microphone device |N/A |Default - Macbook default microphone |True |
	| 3 |Bluetooth microphone |True |AirPods |True |
	| 4 |empty microphone device |True |Unknown device |True |

 */
import {
  p2,
  it,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
  StepFunction,
  common,
} from '@ringcentral-integration/test-utils';

import { CheckInputSection } from '../../../../steps/AudioSettings';
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
@title('Input - select Microphone')
export class NoDevice extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Input - select Microphone">
        <When
          desc="User is on No.1-2, {Preconditions },"
          action={[
            CreateMock,
            <Login mockDevices={[]} />,
            <NavigateTo path="/settings/audio" />,
          ]}
        />
        <Then
          desc="Display section label: Input
										Title: Microphone
										The Input dropdown list {Display} and {Enabled}
										[L10N]"
          action={[
            <CheckInputSection selectedItem="No devices" isEnabled={false} />,
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
@title('Input - select Microphone')
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
      <Scenario desc="Input - select Microphone">
        <When
          desc="User is on No.1-2, {Preconditions },"
          action={[
            CreateMock,
            <Login
              mockDevices={[
                {
                  deviceId: 'default',
                  kind: 'audioinput',
                  label: 'Default - Macbook default speaker',
                  groupId: '1855236',
                },
                // mock Unknown device
                {
                  deviceId: '3f56ac3b050e1fd896906bb',
                  kind: 'audioinput',
                  label: '',
                  groupId: '12',
                },
                {
                  deviceId: '9357146',
                  kind: 'audioinput',
                  label: 'AirPods',
                  groupId: '1855236',
                },
                {
                  deviceId: '55ea4c3',
                  kind: 'audioinput',
                  label: 'Macbook default speaker',
                  groupId: '0cd66aa64',
                },
                {
                  deviceId: 'f3912c04ea',
                  kind: 'audioinput',
                  label: 'Microsoft Teams audio',
                  groupId: '13b521f5b0',
                },
                {
                  deviceId: '67890fghij',
                  kind: 'audioinput',
                  label: 'Desktop2',
                  groupId: '123456',
                },
              ]}
            />,
            <NavigateTo path="/settings/audio" />,
          ]}
        />
        <Then
          desc="Display section label: Input
										Title: Microphone
										The Input dropdown list {Display} and {Enabled}
										[L10N]"
          action={[
            <CheckInputSection
              selectedItem="Default - Macbook default speaker"
              isEnabled
            />,
          ]}
        />
        <When desc="User click input dropdown list" />
        <Then
          desc="It will display all input devices:
										Default microphone device: Macbook default speaker
										AirPods
										Desktop2
										Microsoft Teams audio"
          action={
            <CheckDropDownList
              dataSign="microphoneDeviceSelect"
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
                <CheckInputSection
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
