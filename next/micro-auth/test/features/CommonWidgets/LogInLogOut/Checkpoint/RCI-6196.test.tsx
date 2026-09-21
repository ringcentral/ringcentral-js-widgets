/**
 * RCI-6196: App should not logout when non_auth request meet 401 error
 * https://test_it_domain/test-cases/RCI-6196
 * Preconditions:
 *
 * Entry point(/s):
 * Logged CTI
 */
import {
  Scenario,
  Step,
  Then,
  When,
  autorun,
  examples,
  p2,
  title,
  ut,
} from '@ringcentral-integration/test-utils';

import {
  matchKnownRequestErrors,
  type AuthErrorConfig,
} from '../../../../../src/app/services';
import {
  makeApiError,
  type ExampleData,
} from '../../../Auth/MatchKnownRequestErrors.spec';

const exampleData: ExampleData[] = [
  {
    responseBody: {
      errors: [
        {
          errorCode: 'OAU-142',
          message: 'Login to account in current state is not allowed.',
        },
      ],
    },
    requestUrl:
      'https://api-rcapps-xmrupxmnrclab_domain/restapi/v1.0/account/~/extension/~/device',
    matches: [],
  },
];

@autorun(test)
@ut
@p2
@title('App should not logout when non_auth request meet 401 error')
class RCI6196 extends Step {
  @examples(exampleData)
  run() {
    let matchedErrors: AuthErrorConfig[];
    const { responseBody, requestUrl, matches } = this.example as ExampleData;
    return (
      <Scenario desc="App should not logout when non_auth request meet 401 error {}">
        <When
          desc="Non_auth request meet 401 error before auth token is refreshed
										Note: 1. 401 error with following response body:
										{
										'errors': [
										{
										'errorCode': 'OAU-142',
										'message': 'Login to account in current state is not allowed.'
										}
										]
										}
										or
										{
										'errors': [
										{
										'errorCode': 'OAU-142',
										'message': 'Login to account in current state is not allowed.'
										}
										]
										}
										2. can simulate the 401 error by edit the access toke to invalid, simulate the response by Charles tool
										3. edit a message status, cti will send a non-auth request"
          action={async () => {
            const apiError = makeApiError(responseBody, requestUrl);
            matchedErrors = await matchKnownRequestErrors(apiError);
          }}
        />
        <Then
          desc="App should not logout"
          action={() => {
            expect(matchedErrors).toEqual(matches);
            if (matchedErrors.length) {
              matchedErrors.forEach(([_1, _2, solutions]) => {
                expect(solutions?.logout).toBeFalsy(); // Config has no "logout" solution
              });
            }
          }}
        />
      </Scenario>
    );
  }
}
