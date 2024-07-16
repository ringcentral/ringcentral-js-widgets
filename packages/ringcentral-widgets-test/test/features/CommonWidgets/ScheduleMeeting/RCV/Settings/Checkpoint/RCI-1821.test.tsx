/**
 * RCI-1821: RCV - Only allow authenticated users to join meetings
 * https://test_it_domain/test-cases/RCI-1821
 * Preconditions:
 * CTI app is installed and enabled
 * Users have an RCV account that is usable.
 * Entry point(/s):
 * Google browser: > Standalone app/floating window > More > Schedule Video Meeting
 * Salesforce/RingCentral for Google/O365 Settings:More Menu > schedule video meeting > Security
 * LTI:Click the Schedule' button on the Home/Recents meeting list page
 */
import type { StepFunction } from '../../../../../../lib/step';
import {
  p2,
  it,
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
} from '../../../../../../lib/step';
import {
  SelectOptionFromDropDown,
  CheckDropDownList,
} from '../../../../../../steps/Common';
import { Login as CommonLogin } from '../../../../../../steps/Login';
import {
  TurnOnToggle,
  ClickScheduleButton,
  CheckPostMeetingParams,
  CheckPatchMeetingParams,
  CheckRCVPageDisplay,
} from '../../../../../../steps/Meeting';

@autorun(test.skip)
@common
@it
@p2
@title('RCV - Only allow authenticated users to join meetings')
export class RCI1821 extends Step {
  Login: StepFunction<any, any>;

  run() {
    const { Login = CommonLogin } = this;
    return (
      <Scenario desc="RCV - Only allow authenticated users to join meetings">
        <When
          desc="Turn on 'Only authenticated users can join'."
          action={[
            Login,
            CheckRCVPageDisplay,
            <TurnOnToggle dataSign="isOnlyAuthUserJoin" />,
          ]}
        />
        <Then desc="A new drop-down box displayed." />
        <When desc="Click the drop-down box" />
        <Then
          desc="Two options displayed:
										Signed in users
										Signed in co-workers"
          action={
            <CheckDropDownList
              dataSign="authUserType"
              options={[
                {
                  value: 'Signed in users',
                  isSelected: true,
                },
                {
                  value: 'Signed in co-workers',
                },
              ]}
            />
          }
        />
        <When
          desc="> Select the 'Signed in users'
										> Schedule a new meeting"
          action={[
            <SelectOptionFromDropDown
              dropdownSelector="authUserType"
              targetOption="Signed in users"
            />,
            ClickScheduleButton,
          ]}
        />
        <Then
          desc="The status of Only authenticated users can join meeting should beSigned in users"
          action={
            <CheckPostMeetingParams
              isOnlyAuthUserJoin
              isOnlyCoworkersJoin={false}
            />
          }
        />
        <When
          desc="> Select the 'Signed in co-workers'
										> Schedule a new meeting"
          action={[
            <SelectOptionFromDropDown
              dropdownSelector="authUserType"
              targetOption="Signed in co-workers"
            />,
            ClickScheduleButton,
          ]}
        />
        <Then
          desc="The status ofOnly authenticated users can joinmeeting should beSigned in co-workers"
          action={
            <CheckPatchMeetingParams isOnlyAuthUserJoin isOnlyCoworkersJoin />
          }
        />
      </Scenario>
    );
  }
}
