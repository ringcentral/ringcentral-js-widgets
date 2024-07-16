import { AUTH_ERRORS } from '@ringcentral-integration/commons/modules/Auth/authErrors';
import {
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  ut,
} from '@ringcentral-integration/test-utils';

@autorun(test)
@ut
@title('Check configuration of auth errors')
class CheckAuthErrors extends Step {
  run() {
    let authErrors: typeof AUTH_ERRORS;
    return (
      <Scenario desc="Check configuration of auth errors">
        <Given
          desc="Auth errors configuration is loaded"
          action={() => {
            authErrors = AUTH_ERRORS;
          }}
        />
        <Then
          desc="Auth errors configuration should match snapshot"
          action={() => {
            expect(authErrors).toMatchSnapshot();
          }}
        />
      </Scenario>
    );
  }
}
