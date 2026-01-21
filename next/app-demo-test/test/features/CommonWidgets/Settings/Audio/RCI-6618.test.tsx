/**
 * RCI-6618: Upload Ringtone source
 * https://test_it_domain/test-cases/RCI-6618
 * Preconditions:
 * RC CTI app was installed and enabled
 * User has logged in to 3rd party
 * User has logged in to RC CTI
 * Entry point(/s):
 * Go to Settings > Audio >Output > Ringtones, click the dropdown list
 */
import { RingtoneConfiguration } from '@ringcentral-integration/micro-phone/src/app/services';
import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  p2,
  it,
  autorun,
  screen,
  fireEvent,
  Scenario,
  Step,
  Then,
  title,
  When,
  StepFunction,
  common,
} from '@ringcentral-integration/test-utils';

import {
  CheckRingtoneClosedAndSelected,
  CheckRingtoneItem,
  DoActionOnRingtoneItem,
  UploadRingtoneFile,
} from '../../../../steps/AudioSettings';
import { CommonLogin } from '../../../../steps/CommonLogin';
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
@title('Upload Ringtone source')
export class UploadRingtoneSource extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  run() {
    let fileInputClickMock;
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Upload Ringtone source">
        <When
          desc="Direct to entry points, click Add button"
          action={[
            CreateMock,
            Login,
            <NavigateTo path="/settings/audio" />,
            () => {
              const inputNode = screen
                .getByTestId('ringtoneSelection')
                .querySelector('[role = button]');
              fireEvent.mouseDown(inputNode!);
              const fileInput = screen.getByTestId('uploadRingtoneInput');
              // Mock the click function of the file input element
              fileInputClickMock = jest.spyOn(fileInput, 'click');
            },
            <DoActionOnRingtoneItem
              value="Add"
              roleOption="menuitem"
              type="Click"
            />,
          ]}
        />
        <Then
          desc="The OS file selector pops out"
          action={() => {
            expect(fileInputClickMock!).toHaveBeenCalled();
          }}
        />
        <When
          desc="Select 1 .mp3/.wav file with name 'Test' and upload"
          action={<UploadRingtoneFile filename="Test.mp3" />}
        />
        <Then
          desc="Upload successfully and store in app/account local storage
                    Set 'Test' as ringtone"
          action={[
            (async (_, { app }) => {
              const ringtoneConfiguration = app.container.got(
                RingtoneConfiguration,
              )!;
              await whenStateChange(() => {
                const uploadFileTest =
                  ringtoneConfiguration.customRingtoneList[0];
                expect(uploadFileTest.name).toEqual('Test.mp3');
              });
            }) as StepFunction,
            <CheckRingtoneClosedAndSelected value="Test" />,
          ]}
        />
        <When desc="Check the ringtone list" />
        <Then
          desc="There is 1 new item on the top: Test"
          action={
            <CheckRingtoneItem
              options={[
                {
                  index: 0,
                  value: 'Test',
                  canDelete: true,
                  canPlay: true,
                },
              ]}
            />
          }
        />
      </Scenario>
    );
  }
}
