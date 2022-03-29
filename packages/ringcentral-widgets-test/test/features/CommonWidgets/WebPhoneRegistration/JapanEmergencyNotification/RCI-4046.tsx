import {
  And,
  autorun,
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
  CheckJapanAlertMessage,
  CloseAlertMessage,
} from '../../../../steps/Alert';
import { NavigateTo } from '../../../../steps/Router/action';
import {
  ClickSaveButton,
  ExpandDropdown,
  SelectCallingSetting,
} from '../../../../steps/Settings/actions/SetCallSetting';

import { Login } from '../../../../steps/Login';
import { mockPhoneNumberData } from '../../../../__mock__/data';

// User story:
// https://jira.ringcentral.com/browse/RCINT-23300
export const CheckJapanNotification = ({ Login }: { Login: any }) => {
  @autorun(test)
  @it
  @p2
  @title(
    'Japan Emergency Service Not allowing notification and reload page the alert still display',
  )
  class TestJapanEmergencyServiceNotificationAndReload extends Step {
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
      return (
        <Scenario desc="test different users' behavior after login">
          <Given desc="when user login to Office 365" action={Login} />
          <Then
            desc="JPNotification will {Is show}on the app.
          The notification should be 'Emergency service is not available in Japan.'
          [L10N]"
            action={CheckJapanAlertMessage}
          />
          <When desc="Wait for 5.001 seconds" />
          <Then
            desc="The notification will still display"
            action={async () => {
              jest.useFakeTimers();
              // wait for 5001 ms since timeout for alert is 5000 ms
              jest.advanceTimersByTime(5001);
              jest.useRealTimers();
              return <CheckJapanAlertMessage show />;
            }}
          />
          <When
            desc="Click the X button on the notification"
            action={CloseAlertMessage}
          />
          <Then
            desc="TheJPNotification will disappear"
            action={async () => {
              return <CheckJapanAlertMessage show={false} />;
            }}
          />
        </Scenario>
      );
    }
  }

  @autorun(test)
  @it
  @p2
  @title('Japan Emergency Service Not allowing notification')
  class TestJapanEmergencyServiceNotificationGoogle extends Step {
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
};

// TODO: skip this widget test since webphone mock has some errors
// CheckJapanNotification({ Login });
