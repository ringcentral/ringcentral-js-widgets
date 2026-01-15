import {
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
  StepFunction,
  StepProp,
  common,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../steps/CommonLogin';
import { CreateInstance } from '../../steps/CreateInstance';
import { CreateMock } from '../../steps/Mock';

@autorun(test)
@common
@title('should call _setData with default values if some keys are undefined')
export class CheckAudioSettings1 extends Step {
  run() {
    const DEFAULT_VALUE = {
      ringtoneVolume: 0.5,
      callVolume: 0.5,
      outputDeviceId: 'default',
      inputDeviceId: 'default',
      ringtoneDeviceId: 'default',
      hasAutoPrompted: false,
      isAGCEnabled: false,
    };

    let setDataSpy: any;

    return (
      <Scenario
        desc="go to the app entry and mock refresh token error"
        action={[
          CreateMock,
          <CreateInstance />,
          ((_, { phone }) => {
            phone.audioSettings.data = {};
            setDataSpy = jest.spyOn(phone.audioSettings, '_setData');
          }) as StepProp,
        ]}
      >
        <When desc="Login" action={<CommonLogin CreateInstance={() => {}} />} />
        <Then
          desc="Check if _setData was called with the correct parameters"
          action={async () => {
            expect(setDataSpy).toHaveBeenCalledWith({
              ringtoneVolume: DEFAULT_VALUE.ringtoneVolume,
              callVolume: DEFAULT_VALUE.callVolume,
              outputDeviceId: DEFAULT_VALUE.outputDeviceId,
              inputDeviceId: DEFAULT_VALUE.inputDeviceId,
              isAGCEnabled: DEFAULT_VALUE.isAGCEnabled,
              ringtoneDeviceId: DEFAULT_VALUE.ringtoneDeviceId,
            });
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@common
@title('should not call _setData if all keys are defined')
export class CheckAudioSettings2 extends Step {
  run() {
    let setDataSpy: any;

    return (
      <Scenario
        desc="go to the app entry and mock refresh token error"
        action={[
          CreateMock,
          <CreateInstance />,
          ((_, { phone }) => {
            setDataSpy = jest.spyOn(phone.audioSettings, '_setData');
            expect(phone.audioSettings.data).toBeDefined();
          }) as StepProp,
        ]}
      >
        <When desc="Login" action={<CommonLogin CreateInstance={() => {}} />} />
        <Then
          desc="Check if _setData was called with the correct parameters"
          action={async () => {
            expect(setDataSpy).not.toHaveBeenCalledWith();
          }}
        />
      </Scenario>
    );
  }
}
