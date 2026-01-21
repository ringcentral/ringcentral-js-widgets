/**
 * RCI-6619: Max upload ringtone files
 * https://test_it_domain/test-cases/RCI-6619
 * Preconditions:
 *
  | File name |Order |
  | Test 1 |4 |
	| Apple |1 |
	| Car |2 |
	| Data |3 |
	| Test 2 |5 |
	| The ring |6 |
	| Yellow |7 |
	| Yellow2 |8 |
	| Yellow3 |9 |

 * RC CTI app was installed and enabled
 * User has logged in to 3rd party
 * User has logged in to RC CTI
 * Entry point(/s):
 * Go to Settings > Audio >Output> Ringtones, click the dropdown list
 */
// need to import at the top
// eslint-disable-next-line prettier/prettier
import '../../../../steps/Mock/MockDefaultRingtoneSource';
import { RingtoneConfiguration } from '@ringcentral-integration/micro-phone/src/app/services';
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
  common,
} from '@ringcentral-integration/test-utils';

import {
  CheckRingtoneItem,
  ClickRingtoneInput,
} from '../../../../steps/AudioSettings';
import { CheckButton } from '../../../../steps/Common';
import { CommonLogin } from '../../../../steps/CommonLogin';
// eslint-disable-next-line prettier/prettier
import { CreateMock } from '../../../../steps/Mock';
import { NavigateTo } from '../../../../steps/Router';

// currently, app-demo-test use AudioSettingsPanel v1, so we can't enable this
@autorun(test.skip)
@common
@it
@p2
@title('Max upload ringtone files')
export class MaxRingToneFiles extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  run() {
    const { Login, CreateMock } = this;
    // Array is start from 0, so the order is start from 1, index start from 0
    const CUSTOM_FILES = [
      { value: 'Test 1', order: 4, index: 3 },
      { value: 'Apple', order: 1, index: 0 },
      { value: 'Car', order: 2, index: 1 },
      { value: 'Data', order: 3, index: 2 },
      { value: 'Test 2', order: 5, index: 4 },
      { value: 'The ring', order: 6, index: 5 },
      { value: 'Yellow', order: 7, index: 6 },
      { value: 'Yellow2', order: 8, index: 7 },
      { value: 'Yellow3', order: 9, index: 8 },
    ];
    return (
      <Scenario desc="Max upload ringtone files">
        <When
          desc="Direct to entry points, upload 9 custom audio files, include {File name}"
          action={[
            CreateMock,
            Login,
            <NavigateTo path="/settings/audio" />,
            ((_, { app }) => {
              const ringtoneConfiguration = app.container.got(
                RingtoneConfiguration,
              )!;
              CUSTOM_FILES.forEach((file) => {
                ringtoneConfiguration.uploadCustomRingtone({
                  id: `custom-${file.order}`,
                  url: `url-${file.value}`,
                  type: 'custom',
                  name: `${file.value}.wav`,
                });
              });
            }) as StepFunction,
          ]}
        />
        <Then
          desc="Add button is enabled
										Display as {order} are ordered by the letter of the file name."
          action={[
            ClickRingtoneInput,
            <CheckButton selector="addRingtone" text="Add" disabled={false} />,
            <CheckRingtoneItem options={CUSTOM_FILES} />,
          ]}
        />
        <When
          desc="Upload 1 custom audios again"
          action={[
            ((_, { app }) => {
              const ringtoneConfiguration = app.container.got(
                RingtoneConfiguration,
              )!;
              ringtoneConfiguration.uploadCustomRingtone({
                id: 'custom-12341234',
                url: 'url-custom-12341234',
                type: 'custom',
                name: 'c12341234.wav',
              });
            }) as StepFunction,
            ClickRingtoneInput,
          ]}
        />
        <Then
          desc="Add button is disabled"
          action={<CheckButton selector="addRingtone" text="Add" disabled />}
        />
      </Scenario>
    );
  }
}
