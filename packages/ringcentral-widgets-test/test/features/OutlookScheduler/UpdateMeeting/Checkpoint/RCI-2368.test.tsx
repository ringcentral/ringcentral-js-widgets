/**
 * RCI-2368: Update meeting -  for different delegators
 * https://test_id_domain/test-cases/RCI-2368
 * Preconditions:
 * RC CTI app is installed and enabled
 * The user has logged in to 3rd party with userA
 * UserB has set userA and userC as his delegators
 * User login Scheduler with RCV account
 * Note(/s):
 * userA and userC: The email set in SW should not be matched with the logged-in calendar's email
 * Entry point(/s):
 * Scheduler:Login to Outlook: Calendar -> New Event > RingCentral Scheduler AppOutlook appointment :Login to Outlook: > New Meeting/Appointment > RingCentral for outlook
 */

import {
  p2,
  it,
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  And,
  When,
  StepFunction,
} from '@ringcentral-integration/test-utils';

import { Login as CommonLogin } from '../../../../steps/Login';
import {
  CheckRCVPageDisplay,
  ClickScheduleButton,
  CheckPostMeetingParams,
  CheckDropDownStatus,
  CheckScheduleButton,
  CheckRemoveButton,
} from '../../../../steps/Meeting';
import { SelectOptionFromDropDown } from '../../../../steps/Common';

// could not mock relogin in single case, will separate into 2 cases.
@autorun(test.skip)
@it
@p2
@title('Update meeting - for different delegators: Schedule for userB')
export class RCI2368_ScheduleForUserB extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CheckInvitationInjection: StepFunction<any, any> = () => {};
  @examples(`
    | userB          | userBId    | accountId   |
    | 'TestAccountB' | '11111111' | '208594004' |
  `)
  run() {
    const { Login, CheckInvitationInjection } = this;
    return (
      <Scenario desc="Update meeting - for different delegators">
        <Given
          desc="Go to entry point:
          UserB has set userA and userC as his delegators
          The user has logged in to 3rd party with userA"
          action={Login}
        />
        <And desc="Wait for init" action={CheckRCVPageDisplay} />
        <When
          desc=">User select the userB from the drop-down list
										> Click the Add meeting button to schedule a meeting"
          action={async ({ userB }: any) => [
            <SelectOptionFromDropDown
              dropdownSelector="scheduleFor"
              targetOption={userB}
            />,
            <CheckDropDownStatus
              dataSign="scheduleFor"
              defaultValue={userB}
              isDisabled={false}
            />,
            ClickScheduleButton,
          ]}
        />
        <Then
          desc="Schedule the meeting successfully"
          action={async ({ userBId }: any) => [
            <CheckPostMeetingParams extensionId={userBId} />,
            CheckInvitationInjection,
          ]}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@it
@p2
@title('Update meeting - for different delegators: display for delegator userB')
export class RCI2368_DisplayForUserB extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  CheckInjectionNotHaveBeenCalled: StepFunction<any, any> = () => {};
  @examples(`
    | userB          | userC          | userBId    | userCId    | accountId   |
    | 'TestAccountB' | 'TestAccountC' | '11111111' | '22222222' | '208594004' |
  `)
  run() {
    const { Login, CheckInjectionNotHaveBeenCalled } = this;
    return (
      <Scenario desc="Update meeting - for different delegators">
        <Given
          desc="Go to entry point:
          UserB has set userA and userC as his delegators
          The user has logged in to 3rd party with userC
          There is a scheduled event of userB"
          action={Login}
        />
        <And desc="Wait for init" action={CheckRCVPageDisplay} />
        <Then
          desc="The email invitation on the left keep original
								From'Schedule on behalf of 'drop-down list: Default is userB
										DisplayRemove and Update button
										The Update button is in gray and disable status
										Default is userB"
          action={({ userB }: any) => [
            CheckInjectionNotHaveBeenCalled,
            <CheckDropDownStatus
              dataSign="scheduleFor"
              defaultValue={userB}
              isDisabled={false}
            />,
            CheckRemoveButton,
            <CheckScheduleButton buttonText="Update" isDisabled />,
          ]}
        />
      </Scenario>
    );
  }
}
