import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  autorun,
  common,
  Given,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CheckAlertMessage } from '../../../../../../../steps/Alert';
import { ClickDialButton } from '../../../../../../../steps/Call';
import { CommonLogin } from '../../../../../../../steps/CommonLogin';
import { InputToField } from '../../../../../../../steps/Dialer';
import { CreateMock, MockPhoneNumber } from '../../../../../../../steps/Mock';
import { NavigateToDialer } from '../../../../../../../steps/Navigate';
import { NavigateTo } from '../../../../../../../steps/Router';
import {
  ClickSaveButton,
  ExpandCallingSettingDropdown,
  ExpandRingOutDropdown,
  SelectCallingSetting,
  SelectRingOutOption,
} from '../../../../../../../steps/Settings';

@autorun(test)
@common
@it
@p2
@title(
  'Outbound call - Ringout numbers and callee number should not be the same',
)
export class RCI6382 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> = CreateMock;
  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario desc="Outbound call - Ringout numbers and callee number should not be the same">
        <Given
          desc="Settings > Calling > Make my calls with > RingOut > Set 'My Location to '+19075228319' > Go to dialer pag"
          action={[
            CreateMock,
            <MockPhoneNumber
              isDefaultInit
              handler={(phoneNumberData) => ({
                ...phoneNumberData,
                records: [
                  {
                    ...phoneNumberData.records[0],
                    features: [
                      'CallerId',
                      'SmsSender',
                      'MmsSender',
                      'InternationalSmsSender',
                    ],
                    id: 431458088,
                    phoneNumber: '+19075228319',
                    type: 'VoiceFax',
                    usageType: 'DirectNumber',
                    primary: true,
                  },
                ],
              })}
            />,
            <Login shouldMockCall={false} />,
            <NavigateTo path="/settings/calling" />,
            ExpandCallingSettingDropdown,
            <SelectCallingSetting settingName="RingOut" />,
            // <InputRingOutOption phoneNumber={'+19075228319'} />,
            ExpandRingOutDropdown,
            <SelectRingOutOption settingName={'+19075228319'} />,
            ClickSaveButton,
          ]}
        />
        <When
          desc="Input '+19075228319' in 'To' field and click call number."
          action={[
            NavigateToDialer,
            <InputToField input={'+19075228319'} />,
            ClickDialButton,
          ]}
        />
        <Then
          desc="Should show alert message 'The RingOut number and the destination number can't be the same. Please update the number and try again.' And the phone number should be cleared and not direct to call log page.[L10N]"
          action={[
            <CheckAlertMessage
              message={`The RingOut number and destination number can't be the same. Please update the number and try again.`}
            />,
          ]}
        />
      </Scenario>
    );
  }
}
