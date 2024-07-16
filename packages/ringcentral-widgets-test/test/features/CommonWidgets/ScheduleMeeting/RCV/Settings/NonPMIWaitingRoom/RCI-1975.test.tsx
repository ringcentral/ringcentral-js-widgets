/**
 * RCI-1975: Enable waiting room - linkage "Only authenticated users can join"
 * https://test_it_domain/test-cases/RCI-1975
 * Preconditions:
 * 1. RC CTI app is installed and enabled
 * 2. User has logged in to 3rd party
 * 3. User has logged in to RC CTI app
 * 4. User has RCV permission
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

import {
  SelectOptionFromDropDown,
  CheckDropDownList,
} from '../../../../../../steps/Common';
import { Login as CommonLogin } from '../../../../../../steps/Login';
import {
  CheckItemLabel,
  CheckRCVPageDisplay,
  CheckDropDownStatus,
  TurnOffToggle,
  TurnOnToggle,
} from '../../../../../../steps/Meeting';

@autorun(test.skip)
@it
@p2
@title('Enable waiting room - linkage "Only authenticated users can join"')
export class RCI1975 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Enable waiting room - linkage 'Only authenticated users can join'">
        <When desc="Go to entry point" action={Login} />
        <Then
          desc="Wait RCV meeting page displays"
          action={CheckRCVPageDisplay}
        />
        <When
          desc="Mark OFF the 'Only authenticated users can join' option and Mark ON the 'Enable waiting room' option"
          action={[
            <CheckItemLabel
              label="Enable waiting room"
              dataSign="isWaitingRoomWrapper"
            />,
            <TurnOffToggle dataSign="isOnlyAuthUserJoin" />,
            <TurnOnToggle dataSign="enableWaitingRoom" />,
          ]}
        />
        <Then
          desc="1.'Enable waiting room ' change to'Enable waiting room for'
								2.There are 3 options are available in the dropdown menu for'Enable waiting room for'
                  Everyone
                  Anyone outside my company
                  Anyone not signed in
								3.The drop-down list of'Enable waiting room for'options is selected 'Anyone outside my company' by default."
          action={[
            <CheckItemLabel
              label="Enable waiting room for"
              dataSign="isWaitingRoomWrapper"
            />,
            <CheckDropDownList
              dataSign="waitingRoom"
              options={[
                {
                  value: 'Everyone',
                },
                {
                  value: 'Anyone outside my company',
                  isSelected: true,
                },
                {
                  value: 'Anyone not signed in',
                },
              ]}
            />,
            <CheckDropDownStatus
              dataSign="waitingRoom"
              isDisabled={false}
              defaultValue="Anyone outside my company"
            />,
          ]}
        />
        <When
          desc="Mark ON 'Only authenticated users can join' and select the 'Signed in users'in the' Only authenticated users can join'drop-down list"
          action={[
            <TurnOnToggle dataSign="isOnlyAuthUserJoin" />,
            <SelectOptionFromDropDown
              dropdownSelector="authUserType"
              targetOption="Signed in users"
            />,
          ]}
        />
        <Then
          desc="1.'Anyone outside my company' of'Enable waiting room for'by default.
								2.'Anyone not signed in'of'Enable waiting room for'is disabled"
          action={
            <CheckDropDownList
              dataSign="waitingRoom"
              options={[
                {
                  value: 'Everyone',
                },
                {
                  value: 'Anyone outside my company',
                  isSelected: true,
                },
                {
                  value: 'Anyone not signed in',
                  isDisabled: true,
                },
              ]}
            />
          }
        />
        <When
          desc="Select the 'Signed in co-workers'in the 'Only authenticated users can join'drop-down list"
          action={
            <SelectOptionFromDropDown
              dropdownSelector="authUserType"
              targetOption="Signed in co-workers"
            />
          }
        />
        <Then
          desc="1. 'Anyone outside of my company' and 'Anyone not signed in'are disabled
                2.'Everyone ' (= Signed in users) is auto-converted"
          action={
            <CheckDropDownList
              dataSign="waitingRoom"
              options={[
                {
                  value: 'Everyone',
                  isSelected: true,
                },
                {
                  value: 'Anyone outside my company',
                  isDisabled: true,
                },
                {
                  value: 'Anyone not signed in',
                  isDisabled: true,
                },
              ]}
            />
          }
        />
      </Scenario>
    );
  }
}
