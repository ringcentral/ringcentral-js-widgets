/**
 * RCI-1973: Schedule on behalf fails
 * https://test_it_domain/test-cases/RCI-1973
 * Preconditions:
 * User hasRCVpermission.
 * Already installed and logged in app
 * Entry point(/s):
 * Scheduler:Login to Outlook: Calendar -> New Event > RingCentral Scheduler>Select other values from the 'Schedule on behalf of' dropdown
 * Outlook appointment: Login to Outlook > CalendarNew Meeting > RingCentral for Outlook>Select other values from the 'Schedule on behalf of' dropdown
 */
import { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import {
  autorun,
  common,
  it,
  p3,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../../../../steps/CommonLogin';
import {
  CheckRCVPageDisplay,
  ClickScheduleButton,
} from '../../../../../../steps/Meeting';

@autorun(test.skip)
@common
@it
@p3
@title('Schedule on behalf fails')
export class RCI1973 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Schedule on behalf fails">
        <When
          desc="> Mark on/off 'Personal Meeting ID (PMI)'
										> Click 'Add Meeting' but failed (non 200 response)"
          action={() => [
            Login,
            ((_, { app }) => {
              const alert = app.container.got(Alert)!;
              jest.spyOn(alert, 'danger');
            }) as StepFunction,
            CheckRCVPageDisplay,
            ClickScheduleButton,
          ]}
        />
        <Then
          desc="'Sorry, something went wrong on our end. Try again' is shown on the top of the screen
										[L10N]"
          action={
            ((_, { app }) => {
              const alert = app.container.got(Alert)!;
              expect(alert.danger).toHaveBeenCalledWith({
                message: 'meetingStatus-internalError',
              });
            }) as StepFunction
          }
        />
      </Scenario>
    );
  }
}
