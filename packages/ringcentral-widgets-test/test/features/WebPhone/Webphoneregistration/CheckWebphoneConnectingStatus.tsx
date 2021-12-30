/**
 * RCI-831: Web phone registration - display progressing icon and disable call button
 * https://testit.ringcentral.com/test-cases/RCI-831
 * Preconditions:
 * Account's WebRTC is enabled
 * 'Browser' is selected in Setting > Calling > Make my calls with
 * Entry point(/s):
 * Log in to the CTI app
 * Log in to the CTI app > Change Make my calls with to RingOut mode in Calling Settings > ChangeMake my calls withtoBrowsermode in Calling Settings
 * Note(/s):
 * Calling Settings:Settings -> Calling -> Make my calls with
 */

import { connectionStatus } from '@ringcentral-integration/commons/modules/WebphoneV2';

import { Context } from '../../../interfaces';
import {
  autorun,
  title,
  Scenario,
  Then,
  Step,
  StepFunction,
  it,
  p2,
  When,
} from '../../../lib/step';
import {
  CheckCallButtonActive,
  CheckCallButtonDisabled,
  CheckDialerNotShowSpinner,
  CheckDialerShowSpinner,
} from '../../../steps/dialer';

export const CheckWebphoneConnectingStatus = ({
  Login,
}: {
  Login: StepFunction;
}) => {
  @autorun(test)
  @it
  @p2
  @title(
    'Web phone registration - display progressing icon and disable call button',
  )
  class CheckWebphoneConnectingStatus extends Step {
    run() {
      return (
        <Scenario desc="Web phone registration - display progressing icon and disable call button'">
          <When desc="Direct to entry points" action={Login} />
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
};
