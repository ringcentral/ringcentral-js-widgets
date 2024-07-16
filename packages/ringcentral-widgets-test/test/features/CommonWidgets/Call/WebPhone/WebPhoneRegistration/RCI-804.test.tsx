/**
 * RCI-804: Web phone registration limitations - no DLs
 * https://test_it_domain/test-cases/RCI-804
 * Preconditions:
 * 1. account's WebRTC is enabled
 * 2. user doesn't have DLs (for AT&T and TELUS brands, doesn't have Phone)
 * Entry point(/s):
 * Login CTI APP > Settings > Calling
 */
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
} from '@ringcentral-integration/test-utils';

import type { StepFunction } from '../../../../../lib/step';
import {
  CheckNoAnyAlerts,
  CheckContainsAlertMessage,
} from '../../../../../steps/Alert';
import {
  CheckIncomingCallPageExist,
  ClickBackButtonOfIncomingCallPanel,
  MakeInboundCall,
  MakeOutboundCall,
} from '../../../../../steps/Call';
import { MockSipProvision } from '../../../../../steps/Call/Webphone';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import {
  CreateMock as CommonCreateMock,
  MockExtensionDeviceList,
  MockGetPhoneNumber,
  MockMessageSync,
} from '../../../../../steps/Mock';
import { CheckRoutePathIs, NavigateTo } from '../../../../../steps/Router';
import {
  ExpandCallingSettingDropdown,
  SelectCallingSetting,
  ClickSaveButton,
} from '../../../../../steps/Settings';
import { CheckFromFieldExists } from '../../../../../steps/dialer';

@autorun(test)
@common
@it
@p2
@title('Web phone registration limitations - no DLs')
export class RCI804 extends Step {
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario
        desc="Web phone registration limitations - no DLs"
        action={() => [
          CreateMock,
          MockGetPhoneNumber,
          MockMessageSync,
          <MockSipProvision repeat={0} />,
          <MockExtensionDeviceList DLs="no" />,
          Login,
        ]}
      >
        <When
          desc="choose 'Browser' in 'Make my calls with' dropdown list"
          action={() => [
            <NavigateTo path="/settings/calling" />,
            <CheckRoutePathIs path="/settings/calling" />,

            // Select other option
            ExpandCallingSettingDropdown,
            <SelectCallingSetting settingName="RingCentral Phone" />,
            ClickSaveButton,

            // Select back to "Browser" option
            ExpandCallingSettingDropdown,
            <SelectCallingSetting settingName="Browser" />,
            ClickSaveButton,
          ]}
        />
        <Then
          desc="The following message is shown:
										'Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade.'  [L10N]"
          action={
            <CheckContainsAlertMessage
              message={
                'Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade.'
              }
            />
          }
        />
        <When
          desc="save settings > direct to 'Dial Pad' tab"
          action={<NavigateTo path="/dialer" />}
        />
        <Then
          desc="Web phone view displays (there is a 'From' dropdown list)"
          action={CheckFromFieldExists}
        />
        <When
          desc="make an outbound call"
          action={<MakeOutboundCall executeByCallFunction />}
        />
        <Then
          desc="Outbound call can't be made, and the following message is shown:
										'Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade.'"
          action={[
            <CheckContainsAlertMessage
              message={
                'Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade.'
              }
            />,
          ]}
        />
        <When desc="make an inbound call" action={<MakeInboundCall />} />
        <Then
          desc="Inbound call is made, and can be answered."
          action={[
            CheckIncomingCallPageExist,
            ClickBackButtonOfIncomingCallPanel,
          ]}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@common
@it
@p2
@title('Web phone registration limitations - no DLs')
export class RCI804_AddDL extends Step {
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario desc="Web phone registration limitations - no DLs">
        <When
          desc="go to SW and add a DL to the user > relogin CTI app > make an outbound call"
          action={() => [
            CreateMock,
            MockGetPhoneNumber,
            MockMessageSync,
            <MockExtensionDeviceList DLs="default" />,
            Login,
            <MakeOutboundCall executeByCallFunction />,
          ]}
        />
        <Then desc="Outbound call is made." action={<CheckNoAnyAlerts />} />
      </Scenario>
    );
  }
}
