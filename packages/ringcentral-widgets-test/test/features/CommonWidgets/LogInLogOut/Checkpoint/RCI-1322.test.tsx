/**
 * RCI-1322: Logout from RC CTI App after permission is removed from SW
 * https://test_it_domain/test-cases/RCI-1322
 * Preconditions:
 * RC CTI app is installed and enabled
 * User must have login 3rd party
 * User has logged into RC CTI
 * Entry point(/s):
 * Log in CIT app
 */
import {
  p2,
  it,
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';

import { StepFunction } from '../../../../lib/step';
import { CheckAlertMessage } from '../../../../steps/Alert';
import { MakeOutboundCall } from '../../../../steps/Call';
import {
  CommonLogin,
  CheckLoginButtonExists,
} from '../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../steps/CreateInstance';
import {
  CreateMock as CommonCreateMock,
  MockGetPhoneNumber,
  MockMessageSync,
  MockNumberParserV2,
  MockPostOauthToken,
} from '../../../../steps/Mock';
import { CheckRoutePathIs, NavigateTo } from '../../../../steps/Router';

@autorun(test)
@common
@it
@p2
@title('Logout from RC CTI App after permission is removed from SW')
export class RCI1322 extends Step {
  CreateMock: StepFunction<any, any> = CommonCreateMock;
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );

  run() {
    const { CreateMock, Login } = this;
    const MockNumberParserV2TokenInvalid: StepFunction = () => (
      <MockNumberParserV2
        isDefaultInit={false}
        repeat={0}
        status={401}
        handler={() =>
          ({
            errorCode: 'TokenInvalid',
            message: 'Access token corrupted',
            errors: [
              {
                errorCode: 'OAU-129',
                message: 'Access token corrupted',
              },
            ],
          } as any)
        }
      />
    );

    return (
      <Scenario
        desc="Logout from RC CTI App after permission is removed from SW"
        action={() => [
          CreateMock,
          MockGetPhoneNumber,
          MockMessageSync,
          MockNumberParserV2TokenInvalid,
          Login,
        ]}
      >
        <When
          desc="> Go to SW > My Extension > More > Service Console > Authorized app
										> Delete the authorized app
										> Back to CTI app, refresh the page, or try to send an SMS/make calls"
          action={() => [
            <NavigateTo path={'/dialer'} />,
            <CheckRoutePathIs path={'/dialer'} />,
            <CheckLoginButtonExists exists={false} />,
            <MakeOutboundCall />,
          ]}
        />
        <Then
          desc="The user is logged off
										The message 'Sorry, there was a problem on our end. Please try again later.' shown"
          action={() => [
            <CheckRoutePathIs path={'/'} />,
            <CheckLoginButtonExists exists />,
            <CheckAlertMessage
              message={
                'Sorry, there was a problem on our end. Please try again later.'
              }
            />,
          ]}
        />
      </Scenario>
    );
  }
}
