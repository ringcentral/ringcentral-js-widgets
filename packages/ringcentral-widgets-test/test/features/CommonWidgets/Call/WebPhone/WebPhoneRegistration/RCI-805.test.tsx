/**
 * RCI-805: Web phone registration limitations - over limit
 * https://test_it_domain/test-cases/RCI-805
 * Preconditions:
 * 1. account's WebRTC is enabled
 * 2. user has DLs (for AT&T and TELUS brands, has Phone)
 * 3. there are 5 or more browsers/apps(eg. RC for Google/SfB/Outlook) logged in a same user and registered Web Phone
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
  CloseAlertMessage,
} from '../../../../../steps/Alert';
import {
  CheckIncomingCallPageNotExist,
  MakeInboundCall,
  MakeOutboundCall,
} from '../../../../../steps/Call';
import {
  MockSipProvision,
  TriggerWebphoneEvent,
} from '../../../../../steps/Call/Webphone';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import {
  CreateMock as CommonCreateMock,
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
@title('Web phone registration limitations - over limit')
export class RCI805_ChangeCallingOption extends Step {
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario
        desc="Web phone registration limitations - over limit"
        action={() => [
          CreateMock,
          MockGetPhoneNumber,
          MockMessageSync,
          <MockSipProvision repeat={0} />,
          Login,
          <TriggerWebphoneEvent
            eventName="registrationFailed"
            args={[{ statusCode: 603 }]}
          />,
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
										'A maximum of 5 web phones could be registered.'"
          action={
            <CheckContainsAlertMessage
              message={'A maximum of 5 web phones could be registered.'}
            />
          }
        />
      </Scenario>
    );
  }
}

@autorun(test)
@common
@it
@p2
@title('Web phone registration limitations - over limit')
export class RCI805_MakeOutboundCall extends Step {
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario
        desc="Web phone registration limitations - over limit"
        action={() => [
          CreateMock,
          MockGetPhoneNumber,
          MockMessageSync,
          <MockSipProvision repeat={0} />,
          Login,
          <TriggerWebphoneEvent
            eventName="registrationFailed"
            args={[{ statusCode: 603 }]}
          />,
        ]}
      >
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
          action={[<MakeOutboundCall executeByCallFunction />]}
        />
        <Then
          desc="Outbound call can't be made, and the following message is shown:
										'A maximum of 5 web phones could be registered.'"
          action={[
            <CheckContainsAlertMessage
              message={'A maximum of 5 web phones could be registered.'}
            />,
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
@title('Web phone registration limitations - over limit')
export class RCI805_MakeInboundCall extends Step {
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario
        desc="Web phone registration limitations - over limit"
        action={() => [
          CreateMock,
          MockGetPhoneNumber,
          MockMessageSync,
          <MockSipProvision repeat={0} />,
          Login,
          <TriggerWebphoneEvent
            eventName="registrationFailed"
            args={[{ statusCode: 603 }]}
          />,
          CloseAlertMessage,
        ]}
      >
        <When desc="make an inbound call" action={MakeInboundCall} />
        <Then
          desc="Inbound call can't be made, no message is shown."
          action={[CheckIncomingCallPageNotExist, CheckNoAnyAlerts]}
        />
      </Scenario>
    );
  }
}
