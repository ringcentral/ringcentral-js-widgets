/**
 * RCI-2644: Verify the App will keep the health check when in limited mode
 * https://test_it_domain/test-cases/RCI-2644
 * Preconditions:
 * 1. It have already installed the CTI.
 * 2. The CTI is in 'Limited Mode'.
 * 3. Set the{Intercepted Health Check Url}response status to 503 & error code CMN-211
 *
  | Intercepted Health Check Url |Retry-After Value |Response Header |
  | https://api-rcapps-xmnup.lab.nordigy.ru/restapi/v1.0/status |1 | p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px 'Helvetica Neue'}Retry-After: 1 |

 * Entry point(/s):
 *
 */
import {
  AdvanceTimersByTime,
  autorun,
  common,
  Given,
  it,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  UseFakeTimers,
  UseRealTimers,
  WaitForRenderReady,
  When,
} from '@ringcentral-integration/test-utils';

import {
  CheckGetStatusApi,
  CheckLimitedModeBadge,
} from '../../../../../steps/Badge';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { SendSMS } from '../../../../../steps/Messages';
import {
  CreateMock,
  MockGetStatus,
  MockNumberParserV2,
} from '../../../../../steps/Mock';
import { NavigateTo } from '../../../../../steps/Router';

@autorun(test)
@common
@it
@p2
@title('Verify the App will keep the health check when in limited mode')
export class KeepHealthCheckInLAMode extends Step {
  Login: StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> = CreateMock;
  retryAfter = 1;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Verify the App will keep the health check when in limited mode">
        <Given
          desc="Login app with RC account
								> Simulate app enter limited mode"
          action={[
            CreateMock,
            <MockGetStatus
              repeat={0}
              status={503}
              retryAfter={`${this.retryAfter}`}
              mockData={{
                status: 503,
                errorCode: 'CMN-211',
                errors: [{ errorCode: 'CMN-211' }],
              }}
            />,
            <MockNumberParserV2 repeat={1} />,
            <MockNumberParserV2
              repeat={0}
              status={503}
              handler={() => {
                return {
                  status: 503,
                  errorCode: 'CMN-211',
                  errors: [{ errorCode: 'CMN-211' }],
                };
              }}
            />,
            Login,
            UseFakeTimers,
            <NavigateTo path="/composeText" />,
            SendSMS,
            WaitForRenderReady,
            CheckLimitedModeBadge,
          ]}
        />
        <When
          desc="Check that UI"
          action={[<AdvanceTimersByTime ms={60 * 1000} />, WaitForRenderReady]}
        />
        <Then
          desc="There is still 'Limited Mode' badge"
          action={[CheckLimitedModeBadge, <CheckGetStatusApi length={1} />]}
        />
        <When
          desc="Wait for {Retry-After Value} second"
          action={[
            <AdvanceTimersByTime ms={this.retryAfter * 1000} />,
            WaitForRenderReady,
            UseRealTimers,
          ]}
        />
        <Then
          desc="The CTI send the {Intercepted Health Check Url} request"
          action={[<CheckGetStatusApi length={2} />, CheckLimitedModeBadge]}
        />
      </Scenario>
    );
  }
}
