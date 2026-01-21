/**
 * RCI-6622: Duplicate custom ringtone file
 * https://test_it_domain/test-cases/RCI-6622
 * Preconditions:
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
import { whenStateChange } from '@ringcentral-integration/next-core/test';
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

import { CheckAlertMessage } from '../../../../steps/Alert';
import {
  CheckRingtoneClosedAndSelected,
  ClickRingtoneInput,
  UploadRingtoneFile,
} from '../../../../steps/AudioSettings';
import { CommonLogin } from '../../../../steps/CommonLogin';
// eslint-disable-next-line prettier/prettier
import { CreateMock } from '../../../../steps/Mock';
import { NavigateTo } from '../../../../steps/Router';

jest.mock(
  '@ringcentral-integration/widgets/components/RingtoneSelection/helper',
  () => {
    return {
      __esModule: true,
      ...jest.requireActual(
        '@ringcentral-integration/widgets/components/RingtoneSelection/helper',
      ),
      isAudioFile: () => true,
    };
  },
);

// currently, app-demo-test use AudioSettingsPanel v1, so we can't enable this
@autorun(test.skip)
@common
@it
@p2
@title('Duplicate custom ringtone file')
export class ShowAlertWhenDuplicateFile extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Duplicate custom ringtone file">
        <When
          desc="Direct to entry points, click Add, and upload the 'Test.mp3' file;
										Click the Ringtone dropdown list, Add, and upload the 'Test.mp3' file again"
          action={[
            CreateMock,
            Login,
            <NavigateTo path="/settings/audio" />,
            ClickRingtoneInput,
            <UploadRingtoneFile filename="Test.mp3" />,
            <CheckRingtoneClosedAndSelected value="Test" />,
            ClickRingtoneInput,
            <UploadRingtoneFile filename="Test.mp3" />,
          ]}
        />
        <Then
          desc="Display error:
										'The ringtone you're trying to add already exists.'
										[L10N]"
          action={[
            <CheckAlertMessage message="The ringtone you're trying to add already exists." />,
          ]}
        />
        <When
          desc="Click the Ringtone dropdown list, Add, and upload the 'Test.wav' file"
          action={[
            ClickRingtoneInput,
            <UploadRingtoneFile filename="Test.wav" />,
          ]}
        />
        <Then
          desc="Upload successfully"
          action={
            (async (_, { app }) => {
              const ringtoneConfiguration = app.container.got(
                RingtoneConfiguration,
              )!;
              await whenStateChange(() => {
                // have two custom ringtone files
                expect(ringtoneConfiguration.customRingtoneList).toHaveLength(
                  2,
                );
              });
            }) as StepFunction
          }
        />
      </Scenario>
    );
  }
}
