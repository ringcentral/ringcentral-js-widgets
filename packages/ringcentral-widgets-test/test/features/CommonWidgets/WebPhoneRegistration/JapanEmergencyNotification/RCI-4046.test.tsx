import { sleep } from '@ringcentral-integration/commons/utils';
import { callingSettingsMessages } from '@ringcentral-integration/commons/modules/CallingSettings';
import { waitFor } from '@testing-library/react';

import { mockPhoneNumberData } from '../../../../__mock__/data';
import type { StepFunction } from '../../../../lib/step';
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
} from '../../../../lib/step';
import {
  CheckJapanAlertMessage,
  ClearAlertSpy,
  CloseAlertMessage,
  SpyOnAlertWithMessages,
} from '../../../../steps/Alert';
import { Login as CommonLogin } from '../../../../steps/Login';
import { NavigateTo } from '../../../../steps/Router/action';
import {
  ClickSaveButton,
  ExpandDropdown,
  SelectCallingSetting,
} from '../../../../steps/Settings/actions/SetCallSetting';

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
  Login: StepFunction<any, any>;

  private _timeoutCompleted = false;

  @examples([
    {
      mockParams: {
        phoneNumberData: {
          records: [...mockPhoneNumberData()],
        },
      },
      settingName: 'Browser',
      show: true,
    },
  ])
  run() {
    const { Login = CommonLogin } = this;

    return (
      <Scenario desc="test different users' behavior after login">
        <Given
          desc="when user login to Office 365"
          action={[
            <SpyOnAlertWithMessages
              messages={[callingSettingsMessages.disableEmergencyInJapan]}
              onShowMessage={async (option, exec) => {
                expect(option.ttl).toBe(0);

                jest.useFakeTimers();

                // exec original alert
                const id = exec();

                const promise = sleep(5001);
                jest.advanceTimersByTime(5001);

                await promise;

                jest.useRealTimers();

                this._timeoutCompleted = true;

                return id;
              }}
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
          action={[
            async () => {
              await waitFor(() => {
                expect(this._timeoutCompleted).toBeTruthy();
              });
            },
            ClearAlertSpy,
          ]}
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
  Login: StepFunction<any, any>;

  @examples([
    {
      mockParams: {
        phoneNumberData: {
          records: [
            mockPhoneNumberData()[0],
            { ...mockPhoneNumberData()[1], usageType: 'MainCompanyNumber' },
          ],
        },
      },
      settingName: 'Browser',
      show: true,
    },
    {
      mockParams: {
        phoneNumberData: {
          records: [mockPhoneNumberData()[0], mockPhoneNumberData()[2]],
        },
      },
      settingName: 'Browser',
      show: false,
    },
    {
      mockParams: {
        phoneNumberData: {
          records: [...mockPhoneNumberData()],
        },
      },
      settingName: 'RingCentral App',
      show: false,
    },
  ])
  run() {
    const { Login = CommonLogin } = this;
    return (
      <Scenario desc="test different users' behavior after login">
        <Given desc="when user login to Office 365" action={Login} />
        <And
          desc="User switch calling settings to Softphone"
          action={({ settingName }: any) => {
            if (settingName === 'RingCentral App')
              return (
                <>
                  <CloseAlertMessage />
                  <NavigateTo path="/settings/calling" />
                  <ExpandDropdown />
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
