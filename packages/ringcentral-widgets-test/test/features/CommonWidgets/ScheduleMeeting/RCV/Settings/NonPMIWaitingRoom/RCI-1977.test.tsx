/**
 * RCI-1977: Enable waiting room - linkage "Participants can only join after me"
 * https://test_it_domain/test-cases/RCI-1977
 * Preconditions:
 * 1. RC CTI app is installed and enabled
 * 2. User has logged in to 3rd party
 * 3. User has logged in to RC CTI app
 * 4. User has RCV permission
 * 5.User has Mark OFF and Lock 'Participants can only join after me' ,Mark OFF'Enable waiting room for'in SW > Admin Portal > Meetings > Meetings Settings >Security
 * Entry point(/s):
 * 1.Login to Outlook: Calendar -> New Event > RCV Add-in App
 * 2.Microsoft 365/Google:More>Schedule Video Meeting>Security>'Enable wating room '
 */
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  p2,
  it,
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { SelectOptionFromDropDown } from '../../../../../../steps/Common';
import { Login as CommonLogin } from '../../../../../../steps/Login';
import {
  CheckboxIsChecked,
  CheckboxIsLocked,
  CheckboxIsDisabled,
  CheckItemLabel,
  CheckRCVPageDisplay,
  CheckDropDownStatus,
  TurnOnToggle,
} from '../../../../../../steps/Meeting';

@autorun(test.skip)
@it
@p2
@title(
  'Enable waiting room - linkage "Participants can only join after me" when join after me is locked',
)
export class RCI1977Part1 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Enable waiting room - linkage 'Participants can only join after me' when join after me is locked'">
        <When
          desc="Go to entry point:
            Mark OFF and lock 'Participants can only join after me',
            and Mark OFF 'Enable waiting room for' in SW"
          action={Login}
        />
        <Then
          desc="Wait RCV meeting page displays"
          action={CheckRCVPageDisplay}
        />
        <When
          desc="Mark ON 'Enable waiting room'"
          action={[
            <CheckItemLabel
              label="Enable waiting room"
              dataSign="isWaitingRoomWrapper"
            />,
            <TurnOnToggle dataSign="enableWaitingRoom" />,
          ]}
        />
        <Then
          desc="1.'Enable waiting room' change to'Enable waiting room for'
								2. 'Participants can only join after me' checkbox should be unchecked (unchecked and disable) and locked."
          action={[
            <CheckItemLabel
              label="Enable waiting room for"
              dataSign="isWaitingRoomWrapper"
            />,
            <CheckboxIsChecked
              isChecked={false}
              dataSign="allowJoinBeforeHost"
            />,
            <CheckboxIsDisabled isDisabled dataSign="allowJoinBeforeHost" />,
            <CheckboxIsLocked isLocked dataSign="allowJoinBeforeHostWrapper" />,
          ]}
        />
        <When
          desc="Select the 'Everyone'in the'Enable waiting room for'drop-down list"
          action={
            <SelectOptionFromDropDown
              dropdownSelector="waitingRoom"
              targetOption="Everyone"
            />
          }
        />
        <Then
          desc="'Participants can only join after me' checkbox should be automatically checked (checked and disable) and locked."
          action={[
            <CheckboxIsChecked isChecked dataSign="allowJoinBeforeHost" />,
            <CheckboxIsDisabled isDisabled dataSign="allowJoinBeforeHost" />,
            <CheckboxIsLocked isLocked dataSign="allowJoinBeforeHostWrapper" />,
          ]}
        />
        <When
          desc="Select the 'Anyone not signed in'in the'Enable waiting room for'drop-down list"
          action={
            <SelectOptionFromDropDown
              dropdownSelector="waitingRoom"
              targetOption="Anyone not signed in"
            />
          }
        />
        <Then
          desc="'Participants can only join after me' checkbox keep checked(checked and disabled) and locked."
          action={[
            <CheckboxIsChecked isChecked dataSign="allowJoinBeforeHost" />,
            <CheckboxIsDisabled isDisabled dataSign="allowJoinBeforeHost" />,
            <CheckboxIsLocked isLocked dataSign="allowJoinBeforeHostWrapper" />,
          ]}
        />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@it
@p2
@title(
  'Enable waiting room - linkage "Participants can only join after me" when join after me is unlocked',
)
export class RCI1977Part2 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Enable waiting room - linkage 'Participants can only join after me' when join after me is unlocked'">
        <When
          desc="Go to entry point:
            Mark OFF and unlock 'Participants can only join after me',
            and Mark OFF 'Enable waiting room for' in SW"
          action={Login}
        />
        <Then
          desc="Wait RCV meeting page displays"
          action={CheckRCVPageDisplay}
        />
        <When
          desc="Mark ON 'Enable waiting room'"
          action={<TurnOnToggle dataSign="enableWaitingRoom" />}
        />
        <Then
          desc="The drop-down list of'Enable waiting room for'options is selected 'Anyone outside my company' by default.
										'Participants can only join after me' checkbox should be unchecked (unchecked and enable) and unlocked."
          action={[
            <CheckDropDownStatus
              dataSign="waitingRoom"
              isDisabled={false}
              defaultValue="Anyone outside my company"
            />,
            <CheckboxIsChecked
              isChecked={false}
              dataSign="allowJoinBeforeHost"
            />,
            <CheckboxIsDisabled
              isDisabled={false}
              dataSign="allowJoinBeforeHost"
            />,
            <CheckboxIsLocked
              isLocked={false}
              dataSign="allowJoinBeforeHostWrapper"
            />,
          ]}
        />
        <When
          desc="Select the 'Anyone not signed in'in the'Enable waiting room for'drop-down list"
          action={
            <SelectOptionFromDropDown
              dropdownSelector="waitingRoom"
              targetOption="Anyone not signed in"
            />
          }
        />
        <Then
          desc="'Participants can only join after me'keep unchecked(unchecked and enable)and unlocked."
          action={[
            <CheckboxIsChecked
              isChecked={false}
              dataSign="allowJoinBeforeHost"
            />,
            <CheckboxIsDisabled
              isDisabled={false}
              dataSign="allowJoinBeforeHost"
            />,
            <CheckboxIsLocked
              isLocked={false}
              dataSign="allowJoinBeforeHostWrapper"
            />,
          ]}
        />
        <When
          desc="Select the'Everyone 'in the'Enable waiting room for'drop-down list"
          action={
            <SelectOptionFromDropDown
              dropdownSelector="waitingRoom"
              targetOption="Everyone"
            />
          }
        />
        <Then
          desc="'Participants can only join after me' checkbox should be automatically checked (checked and disable) and unlocked."
          action={[
            <CheckboxIsChecked isChecked dataSign="allowJoinBeforeHost" />,
            <CheckboxIsDisabled isDisabled dataSign="allowJoinBeforeHost" />,
            <CheckboxIsLocked
              isLocked={false}
              dataSign="allowJoinBeforeHostWrapper"
            />,
          ]}
        />
      </Scenario>
    );
  }
}
