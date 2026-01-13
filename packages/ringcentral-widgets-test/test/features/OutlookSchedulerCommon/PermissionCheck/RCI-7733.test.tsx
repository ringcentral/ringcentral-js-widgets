/**
 * RCI-7733: Remove the error when user has no PMI
 * https://test_it_domain/test-cases/RCI-7733
 * Preconditions:
 * Already installed and logged in RingCentral Office Add-In
 * Entry point(/s):
 * Outlook Web Client
 * Windows Outlook
 * Mac Outlook
 * Outlook > Calendar > Event > RingCentral Scheduler
 */
import { whenStateChange } from '@ringcentral-integration/core/test';
import {
  p2,
  it,
  autorun,
  screen,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';

import { StepProp } from '../../../lib/step';
import { CheckRCVPageDisplay } from '../../../steps/Meeting';
import { MockPersonalMeetingSettings } from '../../../steps/Mock';

@autorun(test.skip)
@it
@p2
@common
@title('Remove the error when user has no PMI')
export class RCI7733 extends Step {
  Login: StepProp | null = null;
  CreateMock: StepProp | null = null;
  run() {
    return (
      <Scenario desc="Remove the error when user has no PMI">
        <When
          desc="Login to the app with no PMI account"
          action={[
            this.CreateMock,
            <MockPersonalMeetingSettings status={400} />,
            this.Login,
            CheckRCVPageDisplay,
          ]}
        />
        <Then
          desc="There is no error message:Sorry, something went wrong on our end. Try again."
          action={async () => {
            expect(
              screen.queryByTestId('usePersonalMeetingId'),
            ).not.toBeInTheDocument();
            expect(screen.queryByTestId('meeting-alert')).not.toHaveTextContent(
              'Sorry, something went wrong on our end. Try again.',
            );
            expect(screen.queryByTestId('meeting-alert')).toHaveTextContent(
              'Meeting added',
            );
          }}
        />
      </Scenario>
    );
  }
}
