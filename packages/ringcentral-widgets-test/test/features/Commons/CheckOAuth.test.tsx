import type { StepFunction } from '../../lib/step';
import {
  autorun,
  title,
  Scenario,
  Given,
  Then,
  Step,
  common,
} from '../../lib/step';
import { OAuthCheck } from '../../steps/OAuthCheck';
import { Login as CommonLogin } from '../../steps/Login';

@autorun(test)
@common
@title('Check OAuth module login url')
export class CommonCheckOAuth extends Step {
  Login?: StepFunction;
  useDiscovery?: boolean;

  run() {
    const { Login = CommonLogin, useDiscovery = true } = this;
    return (
      <Scenario desc="Check OAuth 'oAuthUri' getter">
        <Given desc="Create phone instance and login" action={Login} />
        <Then
          desc="Check 'oAuthUri' value should be expected"
          action={() => (
            <OAuthCheck
              brandId="1210"
              localeId="en-US"
              redirectUri="http://localhost/redirect.html"
              useDiscovery={useDiscovery}
            />
          )}
        />
      </Scenario>
    );
  }
}
