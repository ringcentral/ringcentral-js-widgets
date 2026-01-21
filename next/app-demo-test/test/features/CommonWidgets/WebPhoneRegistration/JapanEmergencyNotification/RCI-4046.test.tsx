import { callingSettingsMessages } from '@ringcentral-integration/commons/modules/CallingSettings';
import { sleep } from '@ringcentral-integration/commons/utils';
import {
  whenStateChange,
  whenStateOrTimerChange,
} from '@ringcentral-integration/next-core/test';
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

import { mockPhoneNumberData } from '../../../../__mock__/data';
import { doMockSleep } from '../../../../lib/mockSleep';
import {
  CheckJapanAlertMessage,
  CloseAlertMessage,
} from '../../../../steps/Alert';
import { Login as CommonLogin } from '../../../../steps/Login';
import { CreateMock, MockPhoneNumber } from '../../../../steps/Mock';
import { NavigateTo } from '../../../../steps/Router';
import {
  ClickSaveButton,
  ExpandCallingSettingDropdown,
  SelectCallingSetting,
} from '../../../../steps/Settings';

// TODO: skip this widget test since webphone mock has some errors, only run in other projects
// User story:
// https://jira_domain/browse/RCINT-23300
@autorun(test.skip)
@common
@it
@p2
@title(
  'Japan Emergency Service Not allowing notification and reload page the alert still display',
)
export class TestJapanEmergencyServiceNotificationAndReload extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;
  private _timeoutCompleted = false;

  @examples([
    {
      settingName: 'Browser',
      show: true,
    },
  ])
  run() {
    const { Login, CreateMock } = this;

    return (
      <Scenario desc="test different users' behavior after login">
        <Given
          desc="when user login"
          action={[
            () => {
              doMockSleep();
            },
            CreateMock,
            <MockPhoneNumber
              isDefaultInit
              handler={(mockData) => ({
                ...mockData,
                records: [...mockPhoneNumberData()],
              })}
            />,
            Login,
          ]}
        />
        <Then
          desc="JPNotification will {Is show}on the app.
          The notification should be 'Emergency service is not available in Japan.'
          [L10N]"
          action={CheckJapanAlertMessage}
        />
        <When
          desc="Wait for 5.001 seconds"
          action={async () => {
            // because above already mock sleep method, so we can use sleep directly
            await sleep(5001);
          }}
        />
        <Then
          desc="The notification will still display"
          action={() => <CheckJapanAlertMessage show />}
        />
        <When
          desc="Click the X button on the notification"
          action={CloseAlertMessage}
        />
        <Then
          desc="TheJPNotification will disappear"
          action={<CheckJapanAlertMessage show={false} />}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@common
@it
@p2
@title('Japan Emergency Service Not allowing notification')
export class TestJapanEmergencyServiceNotification extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CreateMock: StepFunction<any, any> | null = CreateMock;

  @examples([
    {
      phoneNumberData: {
        records: [
          mockPhoneNumberData()[0],
          { ...mockPhoneNumberData()[1], usageType: 'MainCompanyNumber' },
        ],
      },
      settingName: 'Browser',
      show: true,
    },
    {
      phoneNumberData: {
        records: [mockPhoneNumberData()[0], mockPhoneNumberData()[2]],
      },
      settingName: 'Browser',
      show: false,
    },
    {
      phoneNumberData: {
        records: [...mockPhoneNumberData()],
      },
      settingName: 'RingCentral app',
      show: false,
    },
  ])
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="test different users' behavior after login">
        <Given
          desc="when user login to Office 365"
          action={[
            CreateMock,
            <MockPhoneNumber
              isDefaultInit
              handler={(mockData) => ({
                ...mockData,
                ...this.example.phoneNumberData,
              })}
            />,
            Login,
          ]}
        />
        <And
          desc="User switch calling settings to Softphone"
          action={({ settingName }: any) => {
            if (settingName === 'RingCentral app')
              return (
                <>
                  <CloseAlertMessage />
                  <NavigateTo path="/settings/calling" />
                  <ExpandCallingSettingDropdown />
                  <SelectCallingSetting settingName={settingName} />
                  <ClickSaveButton />
                </>
              );
          }}
        />
        <Then
          desc="JPNotification will {Is show}on the app.
          The notification should be 'Emergency service is not available in Japan.'
          [L10N]"
          action={CheckJapanAlertMessage}
        />
      </Scenario>
    );
  }
}
