import {
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  ut,
} from '@ringcentral-integration/test-utils';

import { AUTH_ERRORS } from '../../../src/app/services';

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
            const result = Object.entries(authErrors).reduce(
              (acc, [key, [a, b, value]]) => {
                acc[key] =
                  value && Object.keys(value).length > 0
                    ? [a, b, { ...value, message: value?.message?.() }]
                    : [a, b, value];
                return acc;
              },
              {} as any,
            );
            expect(result).toMatchSnapshot();
          }}
        />
      </Scenario>
    );
  }
}
