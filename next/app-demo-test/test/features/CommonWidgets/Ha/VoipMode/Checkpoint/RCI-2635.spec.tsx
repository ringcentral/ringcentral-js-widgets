import { ConnectivityManager } from '@ringcentral-integration/micro-auth/src/app/services';

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
  common,
  Given,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CheckVoipOnlyBadge } from '../../../../../steps/Badge';
import { RefreshToken } from '../../../../../steps/Common';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { CheckCallButtonActive } from '../../../../../steps/Dialer';
import { CreateMock, MockPostOauthToken } from '../../../../../steps/Mock';
import { NavigateToDialer } from '../../../../../steps/Navigate';

@autorun(test)
@common
@p2
@title('Verify the app recover normal mode when Refresh token API returns 200')
export class VerifyAppRecoverNormalMode extends Step {
  Login?: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = CreateMock;
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
            ((_, { app }) => {
              const connectivityManager =
                app.container.got(ConnectivityManager)!;
              expect(connectivityManager.isVoipOnlyMode).toBeFalsy();
            }) as StepFunction,
            NavigateToDialer,
            CheckCallButtonActive,
          ]}
        />
      </Scenario>
    );
  }
}
