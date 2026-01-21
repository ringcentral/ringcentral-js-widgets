import {
  connectionStatus,
  Webphone,
} from '@ringcentral-integration/micro-phone/src/app/services';

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
import {
  autorun,
  common,
  it,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../steps/CommonLogin';
import { CreateInstance } from '../../../steps/CreateInstance';
import {
  CheckCallButtonActive,
  CheckCallButtonDisabled,
  CheckDialerNotShowSpinner,
  CheckDialerShowSpinner,
} from '../../../steps/Dialer';
import { CreateMock } from '../../../steps/Mock';

@autorun(test)
@common
@it
@p2
@title(
  'Web phone registration - display progressing icon and disable call button',
)
export class CheckWebphoneConnectingStatus extends Step {
  Login: StepFunction<any, any>[] | StepFunction<any, any> = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> | null = CreateMock;

  run() {
    const { CreateMock, Login } = this;
    return (
      <Scenario desc="Web phone registration - display progressing icon and disable call button'">
        <When desc="Direct to entry points" action={[CreateMock, Login]} />
        <Then
          desc="Before webphone is registered:
                 Call button will be disabled on dialer
                 Display a progressing circle on dialer"
          action={
            ((_, { app }) => {
              const webphone = app.container.got(Webphone)!;
              webphone._setConnectionStatus(connectionStatus.connecting);
              return [CheckCallButtonDisabled, CheckDialerShowSpinner];
            }) as StepFunction
          }
        />
        <When
          desc="Wait until webphone get registered"
          action={
            ((_, { app }) => {
              const webphone = app.container.got(Webphone)!;
              webphone._setConnectionStatus(connectionStatus.connected);
            }) as StepFunction
          }
        />
        <Then
          desc="Enable Call button; Don't show progressing circle on dialer"
          action={[CheckCallButtonActive, CheckDialerNotShowSpinner]}
        />
      </Scenario>
    );
  }
}
