/**
 * RCI-6650: Defalut ringtone when delete custom Ringtone
 * https://test_it_domain/test-cases/RCI-6650
 * Preconditions:
 * RC CTI app was installed and enabled
 * User has logged in to 3rd party
 * User has logged in to RC CTI
 * User uploadTest and Test 2 as custom ringtone
 * Entry point(/s):
 * Go to Settings > Audio >Output > Ringtones, click the dropdown list, set Test as default ringtone
 */
// need to import at the top
// eslint-disable-next-line prettier/prettier
import '../../../../steps/Mock/MockDefaultRingtoneSource';
import { RingtoneConfiguration } from '@ringcentral-integration/micro-phone/src/app/services';
import {
  p2,
  it,
  autorun,
  common,
  StepFunction,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import {
  CheckRingtoneClosedAndSelected,
  CheckRingtoneItemNoExist,
  ClickRingtoneInput,
  DoActionOnRingtoneItem,
} from '../../../../steps/AudioSettings';
import { CommonLogin } from '../../../../steps/CommonLogin';
// eslint-disable-next-line prettier/prettier
import { CreateMock } from '../../../../steps/Mock';
import {
  CheckModalVisible,
  ClickConfirmInModal,
} from '../../../../steps/Modal';
import { NavigateTo } from '../../../../steps/Router';

// currently, app-demo-test use AudioSettingsPanel v1, so we can't enable this
@autorun(test.skip)
@common
@it
@p2
@title('Default ringtone when delete custom Ringtone')
export class DeleteCustomRingtone extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Default ringtone when delete custom Ringtone">
        <When
          desc="Direct to entry points,Click the delete icon of Test1"
          action={[
            CreateMock,
            Login,
            <NavigateTo path="/settings/audio" />,
            ((_, { app }) => {
              const ringtoneConfiguration = app.container.got(
                RingtoneConfiguration,
              )!;
              ringtoneConfiguration.uploadCustomRingtone({
                id: 'custom-0b7124c6-778a-4ab5-b5d3-1111',
                url: 'Test1.wav',
                type: 'custom',
                name: 'Test1.wav',
              });
              ringtoneConfiguration.uploadCustomRingtone({
                id: 'custom-0b7124c6-778a-4ab5-b5d3-2222',
                url: 'Test2.wav',
                type: 'custom',
                name: 'Test2.wav',
              });
            }) as StepFunction,
            // Set Test1 as default ringtone
            <DoActionOnRingtoneItem needPreOpen type="Click" value="Test1" />,
            <DoActionOnRingtoneItem needPreOpen type="Delete" value="Test1" />,
            <ClickConfirmInModal confirmButtonText="Delete" />,
            <CheckModalVisible isExist={false} />,
          ]}
        />
        <Then
          desc="Delete 1 custom audio file 'Test1.mp3'
										And the Ringtone changed to the default item: Phone Ring 1"
          action={[
            <CheckRingtoneClosedAndSelected value="Phone Ring 1" />,
            ClickRingtoneInput,
            <CheckRingtoneItemNoExist optionName="Test1" />,
          ]}
        />
        <When
          desc="Open ringtone dropdown list, select the Phone Ring 2 as ringtone,
										click the delete icon of Test 2 item"
          action={[
            <DoActionOnRingtoneItem
              needPreOpen
              type="Click"
              value="Phone Ring 2"
            />,
            <DoActionOnRingtoneItem needPreOpen type="Delete" value="Test2" />,
            <ClickConfirmInModal confirmButtonText="Delete" />,
            <CheckModalVisible isExist={false} />,
          ]}
        />
        <Then
          desc="Delete 1 custom audio file 'Test 2.mp3'
								And the Ringtone keep: Phone Ring 2"
          action={[
            <CheckRingtoneClosedAndSelected value="Phone Ring 2" />,
            <CheckRingtoneItemNoExist optionName="Test2" />,
          ]}
        />
      </Scenario>
    );
  }
}
