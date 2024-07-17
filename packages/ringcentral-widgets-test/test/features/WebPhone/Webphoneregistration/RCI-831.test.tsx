/**
 * RCI-831: Web phone registration - display progressing icon and disable call button
 * https://test_it_domain/test-cases/RCI-831
 * Preconditions:
 * Account's WebRTC is enabled
 * 'Browser' is selected in Setting > Calling > Make my calls with
 * Entry point(/s):
 * Log in to the CTI app
 * Log in to the CTI app > Change Make my calls with to RingOut mode in Calling Settings > ChangeMake my calls withtoBrowsermode in Calling Settings
 * Note(/s):
 * Calling Settings:Settings -> Calling -> Make my calls with
 */
import { connectionStatus } from '@ringcentral-integration/commons/modules/Webphone';

import type { Context } from '../../../interfaces';
import type { StepFunction } from '../../../lib/step';
import {
  autorun,
  common,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '../../../lib/step';
import { Login } from '../../../steps/Login';
import {
  CheckCallButtonActive,
  CheckCallButtonDisabled,
  CheckDialerNotShowSpinner,
  CheckDialerShowSpinner,
} from '../../../steps/dialer';

@autorun(test)
@common
@it
@p2
@title(
  'Web phone registration - display progressing icon and disable call button',
)
export class CheckWebphoneConnectingStatus extends Step {
  Login: StepFunction<any, any> = Login;

  run() {
    return (
      <Scenario desc="Web phone registration - display progressing icon and disable call button'">
        <When desc="Direct to entry points" action={this.Login} />
        <Then
          desc="Before webphone is registered:
                 Call button will be disabled on dialer
                 Display a progressing circle on dialer"
          action={(_: any, context: Context) => {
            context.phone.webphone._setConnectionStatus(
              connectionStatus.connecting,
            );
            return [CheckCallButtonDisabled, CheckDialerShowSpinner];
          }}
        />
        <When
          desc="Wait until webphone get registered"
          action={(_: any, context: Context) => {
            context.phone.webphone._setConnectionStatus(
              connectionStatus.connected,
            );
          }}
        />
        <Then
          desc="Enable Call button; Don't show progressing circle on dialer"
          action={[CheckCallButtonActive, CheckDialerNotShowSpinner]}
        />
      </Scenario>
    );
  }
}
