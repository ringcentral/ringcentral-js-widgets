/**
 * RCI-2432: Add meeting fails when RCV server errors
 * https://test_it_domain/test-cases/RCI-2432
 * Preconditions:
 * 1. RC CTI app is installed and enabled
 * 2. User has logged in to 3rd party
 * 3. User logged in to RC CTI app
 * Entry point(/s):
 * Outlook > Calendar >New Event >Click'RingCentral Scheduler' / 'Schedule with RingCentral' > Failed to add a meeting
 * Outlook > Calendar >Click 'New Appointment' or 'New Meeting' in the menu bar > Click {Brand name} for Outlook> Failed to add a meeting
 * Note:
 * Failed to add a meeting Some scenarios such as poor network connection
 */
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  p2,
  it,
  autorun,
  And,
  Scenario,
  Step,
  Given,
  Then,
  title,
  When,
  examples,
  common,
} from '@ringcentral-integration/test-utils';

import { CheckAlertToBeCallWith } from '../../../../../steps/Alert';
import { Login as CommonLogin } from '../../../../../steps/Login';
import { CheckRCVPageDisplay } from '../../../../../steps/Meeting';

@autorun(test.skip)
@common
@it
@p2
@title('Add meeting fails when RCV server errors')
export class RCI2432 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CheckCalendarNotification: StepFunction<any, any> = () => {};
  run() {
    const { Login, CheckCalendarNotification } = this;
    return (
      <Scenario desc="Add meeting fails when RCV server errors">
        <When
          desc="User go to Entry point: Failed to add a meeting： Some scenarios such as poor network connection"
          action={[
            Login,
            async (_: any, { phone }: any) => {
              // mock detect connection loss
              phone.connectivityMonitor._requestErrorHandler({});
            },
          ]}
        />
        <Then
          desc="Open settings config at the same time"
          action={CheckRCVPageDisplay}
        />
        <And
          desc="
            1. Error message is shown on top of calendar page:
              'Sorry, something went wrong on our end and the meeting wasn't created. Try again.'
           2.  Show toast message on top of CTI
              'Sorry, something went wrong on our end. Try again.'
              'Cannot connect to the server. Please retry later'
            Note: Result 1 only suite for scheduler not suite for outlook plugin"
          action={[
            CheckCalendarNotification,
            <CheckAlertToBeCallWith
              level="danger"
              allowDuplicates={false}
              message="connectivityTypes-offline"
            />,
            <CheckAlertToBeCallWith
              level="danger"
              message="meetingStatus-internalError"
            />,
          ]}
        />
      </Scenario>
    );
  }
}
