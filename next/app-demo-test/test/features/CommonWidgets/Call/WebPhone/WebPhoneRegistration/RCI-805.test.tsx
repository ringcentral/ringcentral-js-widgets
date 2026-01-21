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
import { loggerV2 } from '@ringcentral-integration/core/lib/logger/loggerV2';
import { Webphone } from '@ringcentral-integration/micro-phone/src/app/services';
import {
  autorun,
  common,
  it,
  mockAllLogs,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  WaitForRenderReady,
  When,
} from '@ringcentral-integration/test-utils';

import {
  CheckContainsAlertMessage,
  CheckNoAnyAlerts,
  CloseAlertMessage,
} from '../../../../../steps/Alert';
import {
  CheckIncomingCallPageNotExist,
  MakeInboundCall,
  MakeOutboundCall,
} from '../../../../../steps/Call';
import { TriggerWebphoneEvent } from '../../../../../steps/Call/Webphone';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { CheckFromFieldExists } from '../../../../../steps/Dialer';
import {
  CreateMock as CommonCreateMock,
  MockGetPhoneNumber,
  MockMessageSync,
} from '../../../../../steps/Mock';
import { CheckRoutePathIs, NavigateTo } from '../../../../../steps/Router';
import {
  ClickSaveButton,
  ExpandCallingSettingDropdown,
  SelectCallingSetting,
} from '../../../../../steps/Settings';

beforeEach(() => {
  mockAllLogs();

  jest.spyOn(loggerV2, 'log');
  jest.spyOn(loggerV2, 'warn');
  jest.spyOn(loggerV2, 'error');
  jest.spyOn(loggerV2, 'info');
});

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
        action={[
          CreateMock,
          MockGetPhoneNumber,
          MockMessageSync,
          <Login shouldMockWebphone={false} />,
          <TriggerWebphoneEvent
            eventName="registrationFailed"
            args={[{ statusCode: 603 }]}
          />,
        ]}
      >
        <When
          desc="choose 'Browser' in 'Make my calls with' dropdown list"
          action={[
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
        action={[
          CreateMock,
          MockGetPhoneNumber,
          MockMessageSync,
          <Login shouldMockWebphone={false} />,
          ((_, { app }) => {
            const webphone = app.container.got(Webphone)!;
            jest.spyOn(webphone.logger, 'log');
          }) as StepFunction,
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
            ((_, { app }) => {
              const webphone = app.container.got(Webphone)!;
              console.log(jest.mocked(webphone.logger.log).mock.calls);
              expect(webphone.logger.log).toHaveBeenCalledWith(
                'webphone not able to make call, errorCode or not ready or not connected more than 30s',
                {
                  ready: true,
                  connected: false,
                  errorCode: 'webphoneCountOverLimit',
                },
              );
            }) as StepFunction,
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
        action={[
          CreateMock,
          MockGetPhoneNumber,
          MockMessageSync,
          <Login shouldMockWebphone={false} />,
          <TriggerWebphoneEvent
            eventName="registrationFailed"
            args={[{ statusCode: 603 }]}
          />,
          // wait multiple tick to make sure all alert already be opened, and close all of them to make sure the test is clean
          WaitForRenderReady,
          WaitForRenderReady,
          WaitForRenderReady,
          WaitForRenderReady,
          WaitForRenderReady,
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
