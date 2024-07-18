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
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import type { Context } from '../../../../../interfaces';
import type { StepFunction } from '../../../../../lib/step';
import { CheckVoipOnlyBadge } from '../../../../../steps/Badge';
import { RefreshToken } from '../../../../../steps/Common';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { MockGetStatus } from '../../../../../steps/Ha';
import { CreateMock, MockPostOauthToken } from '../../../../../steps/Mock';
import { NavigateTo } from '../../../../../steps/Router';
import { CheckCallButtonActive } from '../../../../../steps/dialer';

@autorun(test)
@common
@p2
@title('Verify the app recover normal mode when Refresh token API returns 200')
export class VerifyAppRecoverNormalMode extends Step {
  Login?: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = CreateMock;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Should switch to normal mode when refresh token success">
        <Given
          desc="App enter Voip mode when Refresh token API returns 503"
          action={[
            CreateMock,
            MockGetStatus,
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
            <RefreshToken healthCheck />,
          ]}
        />
        <Then
          desc="The badge'Voip Only' disappears
										All features work normally"
          action={[
            <CheckVoipOnlyBadge show={false} />,
            (_: unknown, { phone }: Context) => {
              expect(phone.connectivityManager.isVoipOnlyMode).toBeFalsy();
            },
            <NavigateTo path={'/dialer'} />,
            <CheckCallButtonActive />,
          ]}
        />
      </Scenario>
    );
  }
}
