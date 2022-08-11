/**
 * RCI-2424: Meeting information should be injected into Outlook after add meeting
 * https://test_id_domain/test-cases/RCI-2424
 * Preconditions:
 * RC CTI app is installed and enabled
 * User has logged in to 3rd party
 * User logged in to RC CTI app
 * Entry point(/s):
 * Outlook > Calendar >New Event >Click'RingCentral Scheduler' / 'Schedule with RingCentral'
 * Outlook > Calendar >Click 'New Appointment' or 'New Meeting' in the menu bar > Click {Brand name} for Outlook
 */

import {
  p1,
  it,
  autorun,
  And,
  Scenario,
  StepFunction,
  Step,
  Given,
  Then,
  title,
  When,
  examples,
} from '@ringcentral-integration/test-utils';

import { Login as CommonLogin } from '../../../../steps/Login';
import { CheckRCVPageDisplay } from '../../../../steps/Meeting';
import { CheckAlertToBeCallWith } from '../../../../steps/Alert';

@autorun(test.skip)
@it
@p1
@title('Meeting information should be injected into Outlook after add meeting')
export class RCI2424 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CheckInjection: StepFunction<any, any> = () => {};
  @examples(`
    | brand   | topic                                  | brandName            |
    | 'rc'    | 'RingCentral Video Meeting'            | 'RingCentral'        |
    | 'bt'    | 'BT Cloud Work Video Meeting'          | 'Cloud Work'         |
    | 'telus' | 'TELUS Business Connect Video Meeting' | 'Business Connect'   |
    | 'avaya' | 'Avaya Cloud Office Video Meeting'     | 'Avaya Cloud Office' |
    | 'att'   | 'AT&T Office@Hand Meetings Meeting'    | 'Office@Hand'        |
  `)
  run() {
    const { Login, CheckInjection } = this;
    return (
      <Scenario desc="Meeting information should be injected into Outlook after add meeting">
        <Given desc="User has an outlook event (Event1) with description" />
        <When desc="User enter Entry point" action={Login} />
        <Then
          desc="Open settings config at the same time "
          action={CheckRCVPageDisplay}
        />
        <And
          desc="1. Can inject a meeting successfully
                  inject meeting title to Outlook Event title
                  inject meeting link in event location
                  inject meeting invitation in the event body
                2. Show toast message on top of calendar page:
                    'Adding {brand name} meeting details'
                    'Meeting added'
                Note: Result 2 only suite for scheduler not suite for outlook"
          action={CheckInjection}
        />
        <Then
          desc="Show toast message on top of CTI: 'Meeting added'"
          action={
            <CheckAlertToBeCallWith
              level="success"
              message="meetingStatus-scheduledSuccess"
            />
          }
        />
      </Scenario>
    );
  }
}
