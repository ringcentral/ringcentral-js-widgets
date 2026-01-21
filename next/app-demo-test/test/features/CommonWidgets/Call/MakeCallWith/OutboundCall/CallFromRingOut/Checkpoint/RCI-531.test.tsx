/**
 * RCI-531: Outbound call - Ringout fails
 * https://test_it_domain/test-cases/RCI-531
 * Preconditions:
 * <ol><li style='margin: 0px; padding: 0px;'>User is logged-in into 3rd party</li><li style='margin: 0px; padding: 0px;'>CTI app is integrated,</li><li style='margin: 0px; padding: 0px;'>User has log in CTI app</li></ol>
<p><strong><span style='color:#669966'>
 * Entry point(/s):
 * ntry point(/s): </span></strong></p>
<ol>
<li class='u'>Settings > Calling > Make my calls with >RingOut</li></ol>
 */
import type { GetExtensionPhoneNumbersResponse } from '@ringcentral-integration/mock';
import deviceBody from '@ringcentral-integration/mock/src/platform/data/device.json';
import phoneNumberBody from '@ringcentral-integration/mock/src/platform/data/phoneNumber.json';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  And,
  autorun,
  common,
  examples,
  Given,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import {
  CheckAlertMessage,
  CloseAlertMessage,
} from '../../../../../../../steps/Alert';
import { MakeOutboundCall } from '../../../../../../../steps/Call';
import { Entry } from '../../../../../../../steps/Entry';
import { Login } from '../../../../../../../steps/Login';
import {
  CreateMock,
  MockGetPhoneNumber,
  MockGetRingOut,
} from '../../../../../../../steps/Mock';
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
@it
@p2
@common
@title('Outbound call - Ringout fails')
export class RCI531 extends Step {
  Login: StepFunction<any, any>[] = [() => <Entry manualMock />, Login];

  CreateMock: StepFunction<any, any> = CreateMock;
  @examples([
    {
      offlineDeviceNumber:
        deviceBody.records[0].phoneLines[0].phoneInfo.phoneNumber,
    },
  ])
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="Outbound call - Ringout fails"
        action={async ({ offlineDeviceNumber }: any) => [
          CreateMock,
          <MockGetPhoneNumber
            getPhoneNumberData={() => {
              const phoneNumberData = phoneNumberBody;
              const record = phoneNumberData.records.find(
                (item) => item.usageType === 'DirectNumber',
              );
              if (record) {
                record.phoneNumber = offlineDeviceNumber;
              }
              return phoneNumberData as GetExtensionPhoneNumbersResponse;
            }}
          />,
          <MockGetRingOut
            handler={(mockData) => {
              mockData.status.callerStatus = 'Invalid';
              return mockData;
            }}
          />,
        ]}
      >
        <Given desc="Login in the CTI" action={Login} />
        <And
          desc="Settings > Calling > Make my calls with >RingOut"
          action={[
            <NavigateTo path="/settings/calling" />,
            ExpandCallingSettingDropdown,
            <SelectCallingSetting settingName="RingOut" />,
          ]}
        />
        <When
          desc="Go to setting > Calling, set My 'Location' to an offline DL, fill a number and click call button"
          action={async ({ offlineDeviceNumber }: any) => [
            ExpandRingOutDropdown,
            <SelectRingOutOption settingName={offlineDeviceNumber} />,
            ClickSaveButton,
            <CloseAlertMessage message="Settings saved successfully." />,
            NavigateToDialer,
            MakeOutboundCall,
          ]}
        />
        <Then
          desc="'Connection failed. Please try again later.' prompts
										[L10N]"
          action={
            <CheckAlertMessage message="Connection failed. Please try again later." />
          }
        />
      </Scenario>
    );
  }
}
