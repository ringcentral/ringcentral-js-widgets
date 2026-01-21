/**
 * RCI-6560: Ringtone and notification source
 * https://test_it_domain/test-cases/RCI-6560
 * Preconditions:
 * RC CTI app was installed and enabled
 * User has logged in to 3rd party
 * User has logged in to RC CTI
 * User has the following device:Default speaker device: Macbook default speakerBluetooth: AirPodsHDMI: Desktop2Virtual: Microsoft Teams audio
 * Entry point(/s):
 * Go to Settings > Audio >Output
 */
import { Webphone } from '@ringcentral-integration/micro-phone/src/app/services';
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

import { CheckRingtoneSection } from '../../../../steps/AudioSettings';
import {
  CheckDropDownList,
  ClickItemByTextContent,
  SelectOptionFromDropDown,
} from '../../../../steps/Common';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateMock } from '../../../../steps/Mock';
import { NavigateTo } from '../../../../steps/Router';

// currently, app-demo-test use AudioSettingsPanel v1, so we can't enable this
@autorun(test.skip)
@common
@it
@p2
@title('Ringtone and notification source')
export class RingtoneSource extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Ringtone and notification source">
        <When
          desc="Direct to entry points"
          action={[
            CreateMock,
            <Login
              mockDevices={[
                {
                  deviceId: 'default',
                  kind: 'audiooutput',
                  label: 'Default - MacBook Pro Speakers (Built-in)',
                  groupId: '1855236',
                },
                {
                  deviceId: 'AirPods-id-123',
                  kind: 'audiooutput',
                  label: 'AirPods',
                  groupId: '1855236',
                },
                {
                  deviceId: '55ea4c3',
                  kind: 'audiooutput',
                  label: 'MacBook Pro Speakers (Built-in)',
                  groupId: '0cd66aa64',
                },
                {
                  deviceId: 'f3912c04ea',
                  kind: 'audiooutput',
                  label: 'Microsoft Teams audio',
                  groupId: '13b521f5b0',
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
          desc="Display section label:
										'Ringtone and notification source'with a source dropdown list:
										Default - MacBook Pro Speakers (Built-in)
										[L10N]"
          action={
            <CheckRingtoneSection
              isEnabled
              selectedItem="Default - MacBook Pro Speakers (Built-in)"
            />
          }
        />
        <When desc="User click dropdown list" />
        <Then
          desc="It will display all input devices:
										Default microphone device: MacBook Pro Speakers (Built-in)
										AirPods
										Desktop2
										Microsoft Teams audio
										Off"
          action={
            <CheckDropDownList
              dataSign="ringtoneDeviceSelect"
              options={[
                {
                  value: 'Default - MacBook Pro Speakers (Built-in)',
                },
                {
                  value: 'AirPods',
                },
                {
                  value: 'MacBook Pro Speakers (Built-in)',
                },
                {
                  value: 'Microsoft Teams audio',
                },
                {
                  value: 'Desktop2',
                },
                {
                  value: 'Off',
                },
              ]}
            />
          }
        />
        <When
          desc="Select AirPods as the Ringtone and notification source
										And make an incoming call/SMS"
          action={<ClickItemByTextContent getByRole="listbox" text="AirPods" />}
        />
        <Then
          desc="The ringtone source will be AirPods"
          action={
            ((_, { app }) => {
              const webphone = app.container.got(Webphone)!;
              expect(webphone._webphone?.userAgent.audioHelper._deviceId).toBe(
                'AirPods-id-123',
              );
            }) as StepFunction
          }
        />
        <When
          desc="Select off
										as the Ringtone and notification source
										And make an incoming call/SMS"
          action={
            <SelectOptionFromDropDown
              dropdownSelector="ringtoneDeviceSelect"
              targetOption="Off"
            />
          }
        />
        <Then
          desc="There is no ringtone"
          action={
            ((_, { app }) => {
              const webphone = app.container.got(Webphone)!;
              expect(webphone._webphone?.userAgent.audioHelper._deviceId).toBe(
                '',
              );
            }) as StepFunction
          }
        />
      </Scenario>
    );
  }
}
