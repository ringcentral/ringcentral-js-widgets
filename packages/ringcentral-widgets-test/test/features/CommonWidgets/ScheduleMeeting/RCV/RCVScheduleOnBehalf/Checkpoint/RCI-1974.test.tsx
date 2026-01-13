/**
 * RCI-1974: RCV - Schedule on behalf - Add PMI meeting
 * https://test_it_domain/test-cases/RCI-1974
 * Preconditions:
 * The user hasRCVpermission.
 * Already installed and logged in app
 * Entry point(/s):
 * Scheduler:Login to Outlook: Calendar -> New Event > RingCentral Scheduler
 * Outlook appointment: Login to Outlook > CalendarNew Meeting > RingCentral for Outlook
 */
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
} from '@ringcentral-integration/test-utils';

import type { StepFunction, StepProp } from '../../../../../../lib/step';
import { SelectOptionFromDropDown } from '../../../../../../steps/Common';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import {
  CheckPatchMeetingParams,
  CheckRcvMeetingSettingsValues,
  CheckRCVPageDisplay,
  ClickScheduleButton,
  TurnOnToggle,
} from '../../../../../../steps/Meeting';

@autorun(test.skip)
@common
@it
@p2
@title('RCV - Schedule on behalf - Add PMI meeting')
export class RCI1974 extends Step {
  Login: StepProp = CommonLogin;
  CheckInjection: StepFunction<any, any> | JSX.Element[] = [];
  run() {
    const { Login, CheckInjection } = this;
    const mockDelegatorData = [
      { id: '11111', name: 'TestAccountA' },
      { id: '33333', name: 'TestAccountB' },
    ];
    return (
      <Scenario
        desc="RCV - Schedule on behalf - Add PMI meeting"
        action={<Login mockDelegatorData={mockDelegatorData} />}
      >
        <When
          desc=">Select other values from the 'Schedule on behalf of' dropdown
										> Select 'Personal Meeting ID (PMI)
										>Check the meeting setting page of add-in
										[L10N]"
          action={[
            CheckRCVPageDisplay,
            <SelectOptionFromDropDown
              dropdownSelector="scheduleFor"
              targetOption={mockDelegatorData[0].name}
            />,
            <TurnOnToggle dataSign="usePersonalMeetingId" />,
          ]}
        />
        <Then
          desc="The Meeting Options dynamically updates to show:
										the selected user's PMI settings
										[L10N]"
          action={() => (
            <CheckRcvMeetingSettingsValues
              meeting={this.context.phone.rcVideo.personalVideo}
            />
          )}
        />
        <When
          desc="Click 'Update Meeting' button and save the event.
										[L10N]"
          action={ClickScheduleButton}
        />
        <Then
          desc="The meeting is added for the selected user's meeting meeting list
										Invitation in Calendar
										[L10N]"
          action={[
            CheckInjection,
            <CheckPatchMeetingParams name="TestAccountA's video meeting" />,
          ]}
        />
      </Scenario>
    );
  }
}
