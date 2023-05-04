/**
 * RCI-531: Outbound call - Ringout fails
 * https://test_id_domain/test-cases/RCI-531
 * Preconditions:
 * <ol><li style='margin: 0px; padding: 0px;'>User is logged-in into 3rd party</li><li style='margin: 0px; padding: 0px;'>CTI app is integrated,</li><li style='margin: 0px; padding: 0px;'>User has log in CTI app</li></ol>
<p><strong><span style='color:#669966'>
 * Entry point(/s):
 * ntry point(/s): </span></strong></p>
<ol>
<li class='u'>Settings > Calling > Make my calls with >RingOut</li></ol>
 */

import {
  p2,
  it,
  autorun,
  examples,
  And,
  Given,
  Scenario,
  Step,
  StepProp,
  Then,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';
import deviceBody from '@ringcentral-integration/mock/src/platform/data/device.json';
import phoneNumberBody from '@ringcentral-integration/mock/src/platform/data/phoneNumber.json';
import { GetExtensionPhoneNumbersResponse } from '@ringcentral-integration/mock';

import {
  CheckAlertMessage,
  CloseAlertMessage,
} from '../../../../../../../steps/Alert';
import { CommonLogin } from '../../../../../../../steps/CommonLogin';
import {
  CreateMock,
  MockGetPhoneNumber,
  MockGetRingOut,
} from '../../../../../../../steps/Mock';
import { CreateInstance } from '../../../../../../../steps/CreateInstance';
import {
  ClickSaveButton,
  ExpandDropdown,
  SelectCallingSetting,
  ExpandRingOutDropdown,
  SelectRingOutOption,
} from '../../../../../../../steps/Settings';
import { MakeOutboundCall } from '../../../../../../../steps/Call';
import { NavigateTo } from '../../../../../../../steps/Router/action';
import { NavigateToDialer } from '../../../../../../../steps/Navigate';

@autorun(test)
@it
@p2
@common
@title('Outbound call - Ringout fails')
export class RCI531 extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
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
            ExpandDropdown,
            <SelectCallingSetting settingName="RingOut" />,
          ]}
        />
        <When
          desc="Go to setting > Calling, set My 'Location' to an offline DL, fill a number and click call button"
          action={async ({ offlineDeviceNumber }: any) => [
            ExpandRingOutDropdown,
            <SelectRingOutOption settingName={offlineDeviceNumber} />,
            ClickSaveButton,
            CloseAlertMessage,
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
