/**
 * RCI-2635: Verify the app recover normal mode when Refresh token API returns 200
 * https://test_it_domain/test-cases/RCI-2635
 * Preconditions:
 * Open the Charles
 * App enter Voip mode when Refresh token API returns 503
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
import { CreateMock } from '../../../../../steps/Mock';
import { CreateInstance } from '../../../../../steps/CreateInstance';

const RefreshToken: StepFunction = async (_, { phone }: any) => {
  try {
    await phone.auth.refreshToken();
  } catch (error) {
    console.error('refreshToken error', error);
  }
};

@autorun(test)
@p2
@title('Verify the app recover normal mode when Refresh token API returns 200')
export class VerifyAppRecoverNormalMode extends Step {
  Login?: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = CreateMock;
  historyTabDataSign = 'History';
  appName = 'common';
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Should switch to normal mode when refresh token success">
        <Given
          desc="App enter Voip mode when Refresh token API returns 503"
          action={[
            CreateMock,
            <MockPostOauthToken failure repeat={1} failureCode={503} />,
            Login,
            RefreshToken,
            CheckVoipOnlyBadge,
          ]}
        />
        <When
          desc="Simulate Refresh token API returns 200 use Charles"
          action={[
            <MockPostOauthToken
              failure={false}
              repeat={1}
              isDefaultInit={false}
            />,
            RefreshToken,
          ]}
        />
        <Then
          desc="The badge'Voip Only' disappears
										All features work normally"
          action={[
            <CheckVoipOnlyBadge show={false} />,
            (_: any, { phone }: any) => {
              expect(phone.connectivityManager.isVoipOnlyMode).toBeFalsy();
            },
            <NavigateToHistory testId={this.historyTabDataSign} />,
            <CheckCallIcon disabled={false} />,
            <CheckTextIcon disabled={false} />,
          ]}
        />
      </Scenario>
    );
  }
}
