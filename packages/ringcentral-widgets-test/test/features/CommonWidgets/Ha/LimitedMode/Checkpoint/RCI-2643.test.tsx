/**
 * RCI-2643: Verify the App will go back to normal mode when health check returns 200
 * https://test_it_domain/test-cases/RCI-2643
 * Preconditions:
 * 1. It have already installed the CTI.
 * 2. The CTI is in 'Limited Mode'.
 * 3. Set the{Intercepted Health Check Url}response status to 200
 *
  | Intercepted Health Check Url |
  |  p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px 'Helvetica Neue'; color: #dca10d} p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px 'Helvetica Neue'}https://api-rcapps-xmnup.lab.nordigy.ru/restapi/v1.0/status |

 * Entry point(/s):
 *
 */
import {
  p2,
  it,
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
  WaitForRenderReady,
  UseFakeTimers,
  AdvanceTimersByTime,
  UseRealTimers,
  StepProp,
  common,
} from '@ringcentral-integration/test-utils';

import { CheckLimitedModeBadge } from '../../../../../steps/Badge/actions/CheckLimitedModeBadge';
import { CheckGetStatusApi } from '../../../../../steps/Badge/checks/CheckGetStatusApi';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { SendSMS } from '../../../../../steps/Messages';
import {
  CreateMock,
  MockNumberParserV2,
  MockGetStatus,
} from '../../../../../steps/Mock';
import { NavigateTo } from '../../../../../steps/Router';

@autorun(test)
@common
@it
@p2
@title(
  'Verify the App will go back to normal mode when health check returns 200',
)
export class BackToNormalModeWhenHealthCheckSuccess extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;
  retryAfter = 1;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Verify the App will go back to normal mode when health check returns 200">
        <Given
          desc="Login app with RC account
								> Simulate app enter limited mode"
          action={[
            CreateMock,
            <MockGetStatus repeat={0} status={200} />,
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
          desc="Wait for 60s and check the CTI"
          action={[
            <AdvanceTimersByTime ms={60 * 1000} />,
            WaitForRenderReady,
            <CheckGetStatusApi length={1} />,
          ]}
        />
        <Then
          desc="{Intercepted Health Check Url} request is sent and app still in Limited mode"
          action={[
            // no more status api requests sent
            <CheckGetStatusApi length={1} />,
            CheckLimitedModeBadge,
          ]}
        />
        <When
          desc="Wait for random time(maximum is 121 seconds)"
          action={[
            // 121s is the maximum of AvailabilityMonitor._randomTime
            // which is used for switch to normal mode
            <AdvanceTimersByTime ms={121 * 1000} />,
            UseRealTimers,
          ]}
        />
        <Then
          desc="The badge 'Limited mode' disappears automatically
										There is no {Intercepted Health Check Url} request during this 60s"
          action={[
            // no more status api requests sent
            <CheckGetStatusApi length={1} />,
            <CheckLimitedModeBadge show={false} />,
          ]}
        />
      </Scenario>
    );
  }
}
