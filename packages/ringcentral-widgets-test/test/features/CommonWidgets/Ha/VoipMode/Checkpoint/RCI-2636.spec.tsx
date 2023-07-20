/**
 * RCI-2636: Verify the app is in the normal mode when any rc API except Refresh token api returns >=502
 * https://test_it_domain/test-cases/RCI-2636
 * Preconditions:
 * Open the Charles
 * Account type(/s):
 * RC US/CA/UK/EU/AU
 * Extension type(/s):
 * Entry point(/s):
 *
 */
import {
  autorun,
  Given,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { NavigateToHistory } from '../../../../../steps/Navigate';
import { CheckCallIcon, CheckTextIcon } from '../../../../../steps/CallHistory';
import { CheckVoipOnlyBadge } from '../../../../../steps/Badge';
import { MockPostOauthToken } from '../../../../../steps/Mock/MockPostOauthToken';
import {
  CreateMock,
  MockDialingPlan,
  MockExtensionsList,
  mockExtensionsListData,
  MockPostSMS,
} from '../../../../../steps/Mock';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { NavigateTo } from '../../../../../steps/Router';
import { SendSMS } from '../../../../../steps/Messages';
import { generateDialPlanData } from '../../../../../__mock__/generateDialPlanData';

@autorun(test)
@p2
@title(
  'Verify the app is in the normal mode when any rc API except Refresh token api returns >=502',
)
export class VerifyAppInNormalModeWhenOtherAPI500 extends Step {
  Login?: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = CreateMock;
  historyTabDataSign = 'History';
  appName = 'common';
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Verify the app is in the normal mode when send sms return 503">
        <Given desc="Logged in Third-part APP and CTI" action={[CreateMock]} />
        <When
          desc="Login app with RC account
										->Simulate any RC API expect Refresh token API returns>=500 use Charles"
          action={[
            <MockPostSMS repeat={0} status={503} />,
            Login,
            <NavigateTo path="/composeText" />,
            SendSMS,
          ]}
        />
        <Then
          desc="App works normally"
          action={[
            <NavigateToHistory testId={this.historyTabDataSign} />,
            <CheckCallIcon disabled={false} />,
            <CheckTextIcon disabled={false} />,
          ]}
        />
      </Scenario>
    );
  }
}
