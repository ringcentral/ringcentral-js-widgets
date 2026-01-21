/**
 * RCI-6558: Test speaker volume and device
 * https://test_it_domain/test-cases/RCI-6558
 * Preconditions:
 * RC CTI app was installed and enabled
 * User has logged in to 3rd party
 * User has logged in to RC CTI
 * User has the following device:Default speaker device: Macbook default speakerBluetooth: AirPodsHDMI: Desktop2Virtual: Microsoft Teams audio
 * Entry point(/s):
 * Go to Settings > Audio >Output
 */
// need to import before the VolumeInspector
// eslint-disable-next-line prettier/prettier
import '../../../../steps/Mock/MockCreateAudioElement';
import { VolumeInspector } from '@ringcentral-integration/micro-phone/src/app/services';
import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
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

import { DEFAULT_DEVICES } from '../../../../__mock__/mockAudioDevices';
import { SetVolumeSlider } from '../../../../steps/AudioSettings';
import {
  ClickItemByDataSign,
  SelectOptionFromDropDown,
} from '../../../../steps/Common';
import { CommonLogin } from '../../../../steps/CommonLogin';
// eslint-disable-next-line prettier/prettier
import { CreateMock, MockSampleAudioFile } from '../../../../steps/Mock';
import { NavigateTo } from '../../../../steps/Router';

// currently, app-demo-test use AudioSettingsPanel v1, so we can't enable this
@autorun(test.skip)
@common
@it
@p2
@title('Test speaker volume and device')
export class TestSpeakerVolume extends Step {
  // in general, default selected device id will be 'default'
  defaultOutputDeviceId = 'default';
  airPodsOutputDeviceId = DEFAULT_DEVICES.find(
    (device) => device.label === 'AirPods' && device.kind === 'audiooutput',
  )?.deviceId;
  audioUrl = 'blob:chrome-extension://pgjpmeckehbghpkamdammcgmmmbojbdi/xxx';

  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="Test speaker volume and device"
        action={[
          () => {
            URL.createObjectURL = jest.fn().mockReturnValue(this.audioUrl);
          },
          CreateMock,
          MockSampleAudioFile,
          Login,
        ]}
      >
        <When
          desc="Direct to entry points, set the volume to 10%, click the'Test speaker'"
          action={[
            <NavigateTo path="/settings/audio" />,
            <SetVolumeSlider value="10" containerDataSign="speakerVolume" />,
            (_: any, { app }: any) => {
              const volumeInspector = app.container.got(VolumeInspector)!;
              jest.spyOn(volumeInspector, 'startPlayback');
              volumeInspector.outputEl.setSinkId = jest.fn();
            },
            <ClickItemByDataSign dataSign="test-speaker-button" />,
          ]}
        />
        <Then
          desc="Playing sample sounds with 10% volume via default speaker device:Macbook default speaker"
          action={[
            (_: any, { app }: any) => {
              const volumeInspector = app.container.got(VolumeInspector)!;
              expect(volumeInspector.startPlayback).toHaveBeenCalledWith(
                this.audioUrl,
                0.1,
              );
              // check playing sound with 10% volume via default speaker
              expect(volumeInspector.outputEl.setSinkId).toHaveBeenCalledWith(
                this.defaultOutputDeviceId,
              );
              expect(volumeInspector.outputEl.volume).toBe(0.1);
            },
            // stop test
            <ClickItemByDataSign dataSign="test-speaker-button" />,
          ]}
        />
        <When
          desc="Change the speaker source to Bluetooth device: AirPods, and set volume to 50%"
          action={[
            <SelectOptionFromDropDown
              dropdownSelector="speakerDeviceSelect"
              targetOption="AirPods"
            />,
            <SetVolumeSlider value="50" containerDataSign="speakerVolume" />,
          ]}
        />
        <Then
          desc="Playing sample sounds with 50% volume via Bluetooth device Airpods"
          action={[
            <ClickItemByDataSign dataSign="test-speaker-button" />,
            async (_: any, { app }: any) => {
              await whenStateOrTimerChange(() => {
                const volumeInspector = app.container.got(VolumeInspector)!;
                expect(volumeInspector.outputEl.setSinkId).toHaveBeenCalledWith(
                  this.airPodsOutputDeviceId,
                );
                expect(volumeInspector.outputEl.volume).toBe(0.5);
              });
            },
          ]}
        />
      </Scenario>
    );
  }
}
