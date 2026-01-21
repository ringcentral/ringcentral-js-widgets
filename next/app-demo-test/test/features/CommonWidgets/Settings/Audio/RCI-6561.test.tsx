/**
 * RCI-6561: Ringtone and notification volume
 * https://test_it_domain/test-cases/RCI-6561
 * Preconditions:
 * RC CTI app was installed and enabled
 * User has logged in to 3rd party
 * User has logged in to RC CTI
 * User has the following device:Default speaker device: Macbook default speakerBluetooth: AirPodsHDMI: Desktop2Virtual: Microsoft Teams audio
 * Entry point(/s):
 * Go to Settings > Audio >Output
 */
import {
  AudioSettings,
  Webphone,
} from '@ringcentral-integration/micro-phone/src/app/services';
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
  common,
  StepFunction,
} from '@ringcentral-integration/test-utils';

import {
  CheckVolumeSlider,
  SetVolumeSlider,
} from '../../../../steps/AudioSettings';
import { SelectOptionFromDropDown } from '../../../../steps/Common';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateMock } from '../../../../steps/Mock';
import { NavigateTo } from '../../../../steps/Router';

// currently, app-demo-test use AudioSettingsPanel v1, so we can't enable this
@autorun(test.skip)
@common
@it
@p2
@title('Ringtone and notification volume')
export class RingtoneVolume extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Ringtone and notification volume">
        <When
          desc="Direct to entry points"
          action={[CreateMock, Login, <NavigateTo path="/settings/audio" />]}
        />
        <Then
          desc="There is an item:
										'Ringtone and notification volume'
										with volume slide with default value 50%
										[L10N]"
          action={
            <CheckVolumeSlider
              value="50"
              label="Ringtone and notification volume"
              dataSign="ringtoneVolume"
            />
          }
        />
        <When
          desc="Set volume to 0%, and receive an incoming call"
          action={
            <SetVolumeSlider value="0" containerDataSign="ringtoneVolume" />
          }
        />
        <Then
          desc="The ringtone volume should be 0%"
          action={[
            <CheckVolumeSlider value="0" dataSign="ringtoneVolume" />,
            ((_, { app }) => {
              const audioSettings = app.container.got(AudioSettings)!;
              expect(audioSettings.ringtoneVolume).toBe(0);
            }) as StepFunction,
          ]}
        />
        <When
          desc="Set the volume to 10%, and receive an incoming call"
          action={
            <SetVolumeSlider value="10" containerDataSign="ringtoneVolume" />
          }
        />
        <Then
          desc="The ringtone volume should be 10%"
          action={[
            <CheckVolumeSlider value="10" dataSign="ringtoneVolume" />,
            ((_, { app }) => {
              const audioSettings = app.container.got(AudioSettings)!;
              expect(audioSettings.ringtoneVolume).toBe(0.1);
            }) as StepFunction,
          ]}
        />
        <When
          desc="Select off as the Ringtone and notification source
										And set the volume to 100%"
          action={[
            <SelectOptionFromDropDown
              dropdownSelector="ringtoneDeviceSelect"
              targetOption="Off"
            />,
            <SetVolumeSlider value="100" containerDataSign="ringtoneVolume" />,
          ]}
        />
        <Then
          desc="There is no ringtone"
          action={[
            <CheckVolumeSlider value="100" dataSign="ringtoneVolume" />,
            ((_, { app }) => {
              const webphone = app.container.got(Webphone)!;
              const audioSettings = app.container.got(AudioSettings)!;
              expect(webphone._webphone?.userAgent.audioHelper._deviceId).toBe(
                '',
              );
              expect(audioSettings.ringtoneVolume).toBe(1);
            }) as StepFunction,
          ]}
        />
      </Scenario>
    );
  }
}
