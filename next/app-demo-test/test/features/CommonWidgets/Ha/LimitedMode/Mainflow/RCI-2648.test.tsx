/**
 * RCI-2648: Verify the App sync up the SMS permission in the limited mode
 * https://test_it_domain/test-cases/RCI-2648
 * Preconditions:
 * 1. It have already installed the CTI.
 * 2. Let the test env in Survival Mode
 * Note:
 * Before the test, make a notification in the company group
 * Login tohttps://toolset.lab.nordigy.ru/qatools/ReadOnly-> Go to 'QATools' -> Go to 'Read Only' -> Choose the XMNUP env
 * Before the test, make a notification in the company group
 * 3.Go to Admin web and update the 'SMS/MMS Feature Availability' to Off
 * Entry point(/s):
 * > Login to the App
 * > Go to 'Message' -> 'Text' page
 */
import { AvailabilityMonitor } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  autorun,
  common,
  Given,
  it,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CheckAlertMessage } from '../../../../../steps/Alert';
import { CheckLimitedModeBadge } from '../../../../../steps/Badge';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { SendSMS } from '../../../../../steps/Messages';
import { CreateMock, MockPermission } from '../../../../../steps/Mock';
import { NavigateToComposeText } from '../../../../../steps/Navigate';

@common
@autorun(test)
@p2
@it
@title('Verify the App sync up the SMS permission in the limited mode')
export class RCI2648 extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = CreateMock;

  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario desc="Please enter Scenario...">
        <Given
          desc="Logged in Third-part APP and CTI"
          action={[
            CreateMock,
            <MockPermission
              handler={(features) => {
                return features
                  .filter((feature) => feature.id !== 'SMSSending')
                  .concat([
                    {
                      id: 'SMSSending',
                      available: false,
                      reason: {
                        code: 'AccountLimitation',
                        message: '',
                        permission: '',
                      },
                      params: [],
                    },
                  ]);
              }}
            />,
            Login,
            ((_, { app }) => {
              const availabilityMonitor =
                app.container.got(AvailabilityMonitor)!;
              availabilityMonitor.setLimitedMode();
            }) as StepFunction,
          ]}
        />
        <When
          desc="Send a message"
          action={[
            CheckLimitedModeBadge,
            <NavigateToComposeText />,
            <SendSMS textMessage="Test sms" phoneNumber="858-7301" />,
          ]}
        />
        <Then
          desc="It can't send SMS
										There is alert message 'You don't have permission to send messages to recipients outside of your organization.'
										[L10N]"
          action={
            <CheckAlertMessage message="You don't have permission to send messages to recipients outside of your organization." />
          }
        />
      </Scenario>
    );
  }
}
