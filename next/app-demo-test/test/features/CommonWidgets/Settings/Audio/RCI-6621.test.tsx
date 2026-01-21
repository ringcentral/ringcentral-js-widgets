/**
 * RCI-6621: Max size ringtone file
 * https://test_it_domain/test-cases/RCI-6621
 * Preconditions:
 *
  | File name |Size |Expected behavior |
  | Less |5*1024-1kb |Upload successfully |
	| Equal |5*1024kb |Upload successfully |
	| Over |5*1024+1kb |'The file youre trying to upload is too large. Try one that's smaller than 5MB.' |

 * RC CTI app was installed and enabled
 * User has logged in to 3rd party
 * User has logged in to RC CTI
 * Entry point(/s):
 * Go to Settings > Audio >Output> Ringtones, click the dropdown list
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
@title('Max size ringtone file')
export class MaxSizeRingtoneFile extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  run() {
    const { Login, CreateMock } = this;
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const FILES = [
      {
        fileName: 'Less',
        size: MAX_FILE_SIZE - 1,
        content: 'a'.repeat(MAX_FILE_SIZE - 1),
        expectedBehavior: 'Upload successfully',
      },
      {
        fileName: 'Equal',
        size: MAX_FILE_SIZE,
        content: 'a'.repeat(MAX_FILE_SIZE),
        expectedBehavior: 'Upload successfully',
      },
      {
        fileName: 'Over',
        size: MAX_FILE_SIZE + 1,
        content: 'a'.repeat(MAX_FILE_SIZE + 1),
        expectedBehavior:
          "The file you're trying to upload is too large. Try one that's smaller than 5MB.",
      },
    ];
    return (
      <Scenario desc="Max size ringtone file">
        <When
          desc="Direct to entry points, upload {File name}"
          action={[CreateMock, Login, <NavigateTo path="/settings/audio" />]}
        />
        <When
          desc="upload {File name}"
          action={[
            ClickRingtoneInput,
            <UploadRingtoneFile
              filename={`${FILES[2].fileName}.mp3`}
              content={FILES[2].content}
            />,
          ]}
        />
        <Then
          desc="{Expected behavior}
										[L10N]"
          action={<CheckAlertMessage message={FILES[2].expectedBehavior} />}
        />
      </Scenario>
    );
  }
}
