/**
 * RCI-6625: Delete Ringtone source
 * https://test_it_domain/test-cases/RCI-6625
 * Preconditions:
 * RC CTI app was installed and enabled
 * User has logged in to 3rd party
 * User has logged in to RC CTI
 * Entry point(/s):
 * Go to Settings > Audio >Output > Ringtones, click the dropdown list, and add 1 custom audio file{Filename}successfullye.g {Filename}' is Test'
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
  common,
  StepFunction,
} from '@ringcentral-integration/test-utils';

import {
  CheckRingtoneButtonTooltip,
  CheckRingtoneItem,
  CheckRingtoneItemNoExist,
  ClickRingtoneInput,
  DoActionOnRingtoneItem,
} from '../../../../steps/AudioSettings';
import { CommonLogin } from '../../../../steps/CommonLogin';
// eslint-disable-next-line prettier/prettier
import { CreateMock } from '../../../../steps/Mock';
import {
  CheckModalValue,
  CheckModalVisible,
  ClickCancelInModal,
  ClickConfirmInModal,
} from '../../../../steps/Modal';
import { NavigateTo } from '../../../../steps/Router';

// currently, app-demo-test use AudioSettingsPanel v1, so we can't enable this
@autorun(test.skip)
@common
@it
@p2
@title('Delete Ringtone source')
export class DeleteRingtone extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Delete Ringtone source">
        <When
          desc="Direct to entry points, hover on the custom audio file"
          action={[
            CreateMock,
            Login,
            <NavigateTo path="/settings/audio" />,
            ((_, { app }) => {
              const ringtoneConfiguration = app.container.got(
                RingtoneConfiguration,
              )!;
              ringtoneConfiguration.uploadCustomRingtone({
                id: 'custom-0b7124c6-778a-4ab5-b5d3-b1c2429e7f3d',
                url: 'Test.wav',
                type: 'custom',
                name: 'Test.wav',
              });
            }) as StepFunction,
          ]}
        />
        <Then
          desc="Display a 'Delete' icon with Tooltip 'Delete'
										[L10N]"
          action={[
            <CheckRingtoneItem
              options={[
                {
                  index: 0,
                  value: 'Test',
                  canDelete: true,
                },
              ]}
            />,
            <CheckRingtoneButtonTooltip
              checkCustom
              customCount={1}
              button="Delete"
              tooltip="Delete"
            />,
          ]}
        />
        <When
          desc="Click the delete icon"
          action={
            <DoActionOnRingtoneItem needPreOpen type="Delete" value="Test" />
          }
        />
        <Then
          desc="Popup:
										'Delete {Filename}?' with Cancel and Delete buttons
										[L10N]"
          action={
            <CheckModalValue
              title="Delete Test?"
              confirmButtonText="Delete"
              cancelButtonText="Cancel"
            />
          }
        />
        <When desc="Click Cancel button" action={ClickCancelInModal} />
        <Then
          desc="Close the popup"
          action={<CheckModalVisible isExist={false} />}
        />
        <When
          desc="Back to Step2, and click Delete button"
          action={[
            <DoActionOnRingtoneItem type="Delete" value="Test" needPreOpen />,
            <ClickConfirmInModal confirmButtonText="Delete" />,
          ]}
        />
        <Then
          desc="Delete 1 custom audio file 'Test.mp3'"
          action={[
            ClickRingtoneInput,
            <CheckRingtoneItemNoExist optionName="Test" />,
          ]}
        />
      </Scenario>
    );
  }
}
