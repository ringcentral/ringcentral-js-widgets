import {
  autorun,
  common,
  Given,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
} from '@ringcentral-integration/test-utils';

import { Entry } from '../../steps/Entry';
import { Login } from '../../steps/Login';
import { OAuthCheck } from '../../steps/OAuthCheck';

@autorun(test)
@common
@title('Check OAuth module login url')
export class CommonCheckOAuth extends Step {
  useDiscovery = true;

  Login: StepFunction | StepFunction[] = () => [
    // @ts-ignore
    <Entry enableDiscovery />,
    Login,
  ];

  run() {
    return (
      <Scenario desc="Check OAuth 'oAuthUri' getter">
        <Given desc="Create phone instance and login" action={this.Login} />
        <Then
          desc="Check 'oAuthUri' value should be expected"
          action={() => (
            <OAuthCheck
              brandId="1210"
              localeId="en-US"
              redirectUri="http://localhost/redirect.html"
              useDiscovery={this.useDiscovery}
            />
          )}
        />
      </Scenario>
    );
  }
}
