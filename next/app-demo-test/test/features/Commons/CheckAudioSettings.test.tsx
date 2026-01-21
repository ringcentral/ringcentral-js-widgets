import {
  AudioSettings,
  AudioSettingsData,
  DEFAULT_VALUE,
} from '@ringcentral-integration/micro-phone/src/app/services';
import {
  autorun,
  common,
  Scenario,
  Step,
  StepProp,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../steps/CommonLogin';
import { CreateInstance } from '../../steps/CreateInstance';
import { CreateMock } from '../../steps/Mock';

@autorun(test)
@common
@title('should fill data with default values if some keys are undefined')
export class CheckAudioSettings1 extends Step {
  run() {
    return (
      <Scenario
        desc="go to the app entry and mock refresh token error"
        action={[
          CreateMock,
          <CreateInstance />,
          (async (_, { app }) => {
            const audioSettings: AudioSettings =
              app.container.get(AudioSettings)!;
            audioSettings._setData({} as AudioSettingsData);
          }) as StepProp,
        ]}
      >
        <When desc="Login" action={<CommonLogin CreateInstance={() => {}} />} />
        <Then
          desc="Check if data is filled with default values"
          action={async () => {
            const audioSettings: AudioSettings =
              app.container.get(AudioSettings)!;
            expect(audioSettings.data.ringtoneVolume).toEqual(
              DEFAULT_VALUE.ringtoneVolume,
            );
            expect(audioSettings.data.callVolume).toEqual(
              DEFAULT_VALUE.callVolume,
            );
            expect(audioSettings.data.outputDeviceId).toEqual(
              DEFAULT_VALUE.outputDeviceId,
            );
            expect(audioSettings.data.inputDeviceId).toEqual(
              DEFAULT_VALUE.inputDeviceId,
            );
            expect(audioSettings.data.ringtoneDeviceId).toEqual(
              DEFAULT_VALUE.ringtoneDeviceId,
            );
            expect(audioSettings.data.hasAutoPrompted).toEqual(
              DEFAULT_VALUE.hasAutoPrompted,
            );
            expect(audioSettings.data.isAGCEnabled).toEqual(
              DEFAULT_VALUE.isAGCEnabled,
            );
            // only assume the labels are not undefined because they should be set by the actual device labels by now
            expect(audioSettings.data.outputDeviceLabel).not.toBeUndefined();
            expect(audioSettings.data.inputDeviceLabel).not.toBeUndefined();
            expect(audioSettings.data.hasAutoPrompted).toEqual(
              DEFAULT_VALUE.hasAutoPrompted,
            );
            expect(audioSettings.data.isAGCEnabled).toEqual(
              DEFAULT_VALUE.isAGCEnabled,
            );
          }}
        />
      </Scenario>
    );
  }
}
