/**
 * RCI-2642: Verify the App will go into limited mode
 * https://test_it_domain/test-cases/RCI-2642
 * Preconditions:
 * 1. It have already installed the CTI.
 * 2. The CTI remains signed and 'Available' status.
 * 3. Set the {Intercepted Url}response status to 503 and set body value to {Response Body}
 *
  | NO. |Intercepted Url |Response Body |
  | 1 | p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px 'Helvetica Neue'; color: #dca10d} p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px 'Helvetica Neue'}https://api-rcapps-xmnup.lab.nordigy.ru/restapi/v1.0/number-parser | p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px 'Helvetica Neue'} p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px 'Helvetica Neue'}{'errorCode': 'CMN-211','message': 'Error message','errors': [{ 'errorCode': 'CMN-211' }]} |
	| 2 | p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px 'Helvetica Neue'; color: #dca10d}https://api-rcapps-xmnup.lab.nordigy.ru/restapi/v1.0/account/~/extension/~/presence |{'errorCode': 'CMN-211','message': 'Error message','errors': [{ 'errorCode': 'CMN-211' }]} |

 * Entry point(/s):
 *
  | Entry |Action |Intercepted Url |
  | 1 |Go to 'Message' tab and send message |1 |
	| 2 |Go to 'Settings' tab and update the status value |2 |

 * > Go to {Entry}
 * > Do the {Action} to call{Intercepted Url}
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
  examples,
  common,
} from '@ringcentral-integration/test-utils';

import {
  CheckAlertAutoDismiss,
  CheckContainsAlertMessage,
} from '../../../../../steps/Alert';
import { CheckLimitedModeBadge } from '../../../../../steps/Badge/actions/CheckLimitedModeBadge';
import { CommonLogin } from '../../../../../steps/CommonLogin';
import { CreateInstance } from '../../../../../steps/CreateInstance';
import { SendSMS } from '../../../../../steps/Messages';
import {
  CreateMock,
  MockNumberParserV2,
  MockPresence,
  MockLimitedPutPresence,
} from '../../../../../steps/Mock';
import { NavigateTo } from '../../../../../steps/Router';
import { SetPresenceStatus } from '../../../../../steps/Settings';

@autorun(test)
@it
@p2
@common
@title('Verify the App will go into limited mode')
export class LimitedMode extends Step {
  Login: StepProp = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepProp = CreateMock;

  @examples([
    {
      action: (
        <>
          <NavigateTo path="/composeText" />
          <SendSMS />
        </>
      ),
    },
    {
      action: (
        <>
          <NavigateTo path="/settings" />
          <SetPresenceStatus presence="DND" shouldMockPutPresence={false} />
        </>
      ),
    },
  ])
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario desc="Verify the App will go into limited mode">
        <Given
          desc="Go to {Action}"
          action={[
            CreateMock,
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
            <MockPresence repeat={0} isDefaultInit />,
            <MockLimitedPutPresence repeat={0} />,
            Login,
            UseFakeTimers,
            this.example.action,
          ]}
        />
        <When desc="Check that CTI" />
        <Then
          desc="There is 'Limited Mode' badge
										There is alert message:'Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available.'
										[L10N]"
          action={[
            WaitForRenderReady,
            CheckLimitedModeBadge,
            <CheckContainsAlertMessage message="Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available." />,
          ]}
        />
        <When
          desc="After 5s"
          action={[<AdvanceTimersByTime ms={5000} />, WaitForRenderReady]}
        />
        <Then
          desc="The alert disappears automatically
							  The 'Limited Mode' badge keep stay"
          action={[CheckLimitedModeBadge, CheckAlertAutoDismiss, UseRealTimers]}
        />
      </Scenario>
    );
  }
}
