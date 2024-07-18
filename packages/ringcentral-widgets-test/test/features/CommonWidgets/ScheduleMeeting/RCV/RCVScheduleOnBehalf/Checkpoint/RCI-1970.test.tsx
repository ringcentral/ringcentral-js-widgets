/**
 * RCI-1970: Schedule on behalf - delegates
 * https://test_it_domain/test-cases/RCI-1970
 * Preconditions:
 * User has RCV permission
 * Already installed and logged in app
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

import type { StepProp } from '../../../../../../lib/step';
import { CheckDropDownList } from '../../../../../../steps/Common';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import { CheckRCVPageDisplay } from '../../../../../../steps/Meeting';

@autorun(test.skip)
@it
@p2
@title('Schedule on behalf - delegates')
export class RCI1970 extends Step {
  Login: StepProp = CommonLogin;

  run() {
    const { Login } = this;
    const mockDelegatorData = [
      { id: '11111', name: 'TestAccountA' },
      { id: '33333', name: 'TestAccountB' },
    ];
    return (
      <Scenario
        desc="Schedule on behalf - delegates"
        action={<Login mockDelegatorData={mockDelegatorData} />}
      >
        <When
          desc="Set 'Delegates' in RCV web > settings > Delegates, login app"
          action={CheckRCVPageDisplay}
        />
        <Then
          desc="'Schedule on behalf of dropdown is shown above 'Meeting settings' section
										The other values in the dropdown is the same as RCV web
										The overlong names are shown as '...'
										[L10N]"
          action={() => {
            const summaryDoms = screen
              .getByTestId('videoConfigsPanel')
              .querySelectorAll('[data-sign*="PanelSummary"]');
            // 'Schedule on behalf of dropdown is shown above 'Meeting settings' section
            expect(summaryDoms[0].textContent).toBe('Schedule on behalf of');
            // The other values in the dropdown is the same as RCV web
            return (
              <CheckDropDownList
                dataSign="scheduleFor"
                options={[
                  {
                    value: 'Myself',
                    isSelected: true,
                  },
                  {
                    value: mockDelegatorData[0].name,
                  },
                  {
                    value: mockDelegatorData[1].name,
                  },
                ]}
              />
            );
          }}
        />
      </Scenario>
    );
  }
}
