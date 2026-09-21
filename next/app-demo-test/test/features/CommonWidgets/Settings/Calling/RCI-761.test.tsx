/**
 * RCI-761: Calling settings (WebPhone permission is removed)
 * https://test_it_domain/test-cases/RCI-761
 * Preconditions:
 *
 * Entry point(/s):
 *
 */
import {
  callingOptions,
  CallingSettings,
} from '@ringcentral-integration/micro-phone/src/app/services';
import {
  autorun,
  common,
  Given,
  it,
  p3,
  Scenario,
  screen,
  Step,
  type StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CheckAlertMessage, CheckNoAnyAlerts } from '../../../../steps/Alert';
import { CommonLogin } from '../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../steps/CreateInstance';
import {
  CreateMock as CommonCreateMock,
  MockPermission,
} from '../../../../steps/Mock';
import {
  NavigateToCallingSetting,
  NavigateToDialer,
} from '../../../../steps/Navigate';
import { Relogin } from '../../../../steps/Relogin';
import { ExpandCallingSettingDropdown } from '../../../../steps/Settings';

@autorun(test)
@p3
@it
@common
@title('Calling settings (WebPhone permission is removed)')
export class RCI761 extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = () => <CommonCreateMock />;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Calling settings (WebPhone permission is removed)">
        <Given
          desc="Logged in Third-part APP and CTI"
          action={[
            CreateMock,
            <MockPermission
              isDefaultInit
              handler={(features) => {
                const permission = features
                  .filter((p) => p.id !== 'WebPhone')
                  .concat({
                    id: 'WebPhone',
                    available: false,
                  });
                return permission;
              }}
            />,
            <Login shouldMockWebphone={false} />,
          ]}
        />
        <When
          desc="Go to Admin Web, turn off 'web phone', after client get the notification from platform Note:   App will send request to get the account permission for 30 mins Subscription will notify in real time"
          action={[
            async (_, { app }) => {
              app.container
                .got(CallingSettings)
                .setDataAction({ callWith: callingOptions.browser });
              await app.container.got(CallingSettings)._validateSettings();
            },
          ]}
        />
        <Then
          desc="Prompt message is shown:'Your permissions have been changed and you cannot make calls with Browser. For details please contact your account administrator. '
										[L10N]"
          action={[
            <CheckAlertMessage
              message={
                'Your permissions have been changed and you cannot make calls with Browser. For details please contact your account administrator.'
              }
            />,
          ]}
        />
        <When
          desc="Check 'Make my call with' options"
          action={[NavigateToCallingSetting]}
        />
        <Then
          desc="'Browser' is removed from the dropdown list"
          action={[
            ExpandCallingSettingDropdown,
            () => {
              expect(screen.queryByText('Browser')).toBeNull();
            },
          ]}
        />
        <When
          desc="Navigate to other tabs, check the prompt message"
          action={[NavigateToDialer]}
        />
        <Then
          desc="The message is permanent until user close it manually"
          action={[
            <CheckAlertMessage
              message={
                'Your permissions have been changed and you cannot make calls with Browser. For details please contact your account administrator.'
              }
            />,
          ]}
        />
        <When
          desc="Logout and login again"
          action={[
            ((_, { rcMock }) => {
              rcMock.postAuthRevoke();
              rcMock.getFeatures();
              rcMock.getAccount();
              rcMock.getAddressBookSync();
              rcMock.getPhoneNumber();
              rcMock.getExtension();
              rcMock.getDialingPlan();
              rcMock.getExtensionList();
              rcMock.postNumberParserV2();
              rcMock.getContacts();
              rcMock.getCallLog();
              rcMock.getCallLogSync();
              rcMock.getForwardingNumber();
              rcMock.postSipProvision();
              rcMock.putMessageStore();
              rcMock.getMessageSync({ repeat: 10 });
            }) as StepFunction,
            <Relogin shouldMockWebphone={false} />,
          ]}
        />
        <Then
          desc="The prompt message is not shown again"
          action={[CheckNoAnyAlerts]}
        />
      </Scenario>
    );
  }
}
