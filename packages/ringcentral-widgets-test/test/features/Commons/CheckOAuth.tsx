import {
  autorun,
  title,
  Scenario,
  Given,
  Then,
  Step,
  StepFunction,
} from '../../lib/step';
import { OAuthCheck } from '../../steps/OAuthCheck';

export const CheckOAuth = ({
  Login,
  useDiscovery = true,
}: {
  Login: StepFunction;
  useDiscovery?: boolean;
}) => {
  @autorun(test)
  @title('Check OAuth module login url')
  class OAuthCheckParams extends Step {
    run() {
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
};
