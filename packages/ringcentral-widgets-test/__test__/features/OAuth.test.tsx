import { autorun, title, Scenario, Given, When, Then, Step } from '../steps';
import { Login } from '../steps/Login';
import { OAuthCheck } from '../steps/OAuthCheck';

@autorun(test)
@title('Check OAuth module login url')
export class OAuthCheckParams extends Step {
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
            />
          )}
        />
      </Scenario>
    );
  }
}
