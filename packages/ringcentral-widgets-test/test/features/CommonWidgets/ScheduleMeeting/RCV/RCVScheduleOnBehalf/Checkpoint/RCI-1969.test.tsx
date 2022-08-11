/**
 * RCI-1969: Schedule on behalf - no delegates
 * https://test_id_domain/test-cases/RCI-1969
 * Preconditions:
 * User has RCV permission
 * Already installed and logged in CTI app
 * Entry point(/s):
 * Scheduler:Login to Outlook: Calendar -> New Event > RingCentral Scheduler
 * Outlook appointment: Login to Outlook > CalendarNew Meeting > RingCentral for Outlook
 */

import {
  autorun,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

import { StepProp } from '../../../../../../lib/step';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CheckRCVPageDisplay } from '../../../../../../steps/Meeting';

@autorun(test.skip)
@it
@p2
@title('Schedule on behalf - no delegates')
export class RCI1969 extends Step {
  Login: StepProp = CommonLogin;
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Schedule on behalf - no delegates">
        <When
          desc="Clear 'Delegates' in RCV web > Settings > Delegates, login app"
          action={Login}
        />
        <Then
          desc="'Schedule on behalf of' dropdown is not shown above 'Meeting settings' section"
          action={[
            CheckRCVPageDisplay,
            () => {
              expect(
                screen.queryByTestId('scheduleFor'),
              ).not.toBeInTheDocument();
            },
          ]}
        />
      </Scenario>
    );
  }
}
