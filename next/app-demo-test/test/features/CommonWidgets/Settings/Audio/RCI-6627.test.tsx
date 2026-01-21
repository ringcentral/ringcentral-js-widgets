/**
 * RCI-6627: Failed to add Ringtone source
 * https://test_it_domain/test-cases/RCI-6627
 * Preconditions:
 * RC CTI app was installed and enabled
 * User has logged in to 3rd party
 * User has logged in to RC CTI
 * Entry point(/s):
 * Go to Settings > Audio >Output > Ringtones, click the dropdown list
 */
// need to import at the top
// eslint-disable-next-line prettier/prettier
import '../../../../steps/Mock/MockDefaultRingtoneSource';
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

import { CheckAlertMessage } from '../../../../steps/Alert';
import {
  ClickRingtoneInput,
  DoActionOnRingtoneItem,
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
      isAudioFile: () => false,
    };
  },
);

// currently, app-demo-test use AudioSettingsPanel v1, so we can't enable this
@autorun(test.skip)
@common
@it
@p2
@title('Failed to add Ringtone source')
export class FailedToUpload extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Failed to add Ringtone source">
        <When
          desc="Direct to entry points, click the 'Add' button to add a custom ringtone
										And meet some errors, like the file extension name is not correct"
          action={[
            CreateMock,
            Login,
            <NavigateTo path="/settings/audio" />,
            ClickRingtoneInput,
            <DoActionOnRingtoneItem
              value="Add"
              roleOption="menuitem"
              type="Click"
            />,
            <UploadRingtoneFile filename="Test.mp3" />,
          ]}
        />
        <Then
          desc="Display error:
                'We're having trouble adding your ringtone. Please try again.'
                [L10N]"
          action={
            <CheckAlertMessage message="We're having trouble adding your ringtone. Please try again." />
          }
        />
      </Scenario>
    );
  }
}
