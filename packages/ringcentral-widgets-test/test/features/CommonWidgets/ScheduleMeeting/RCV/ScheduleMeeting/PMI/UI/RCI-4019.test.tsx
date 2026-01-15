/**
 * RCI-4019: UI - PMI Change settings button
 * https://test_it_domain/test-cases/RCI-4019
 * Preconditions:
 * Already installed and logged in RingCentral Outlook Add-Ins.
 * User has logged in to 3rd party
 * Entry point(/s):
 * Scheduler:Login to Outlook: Calendar -> New Event > RingCentral Scheduler Appmeeting setting page > Mark on 'Use Personal Meeting ID XXX-XXX-XXX'
 * Outlook appointment:Login to Outlook: > New Meeting/Appointment > RingCentral for outlook> meeting setting page > Mark on 'Use Personal Meeting ID XXX-XXX-XXX'
 */
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  p2,
  it,
  autorun,
  And,
  Scenario,
  Step,
  Then,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';

import { Login as CommonLogin } from '../../../../../../../steps/Login';
import {
  CheckRCVPageDisplay,
  SwitchUsePersonalMeetingId,
  CheckboxIsDisabled,
  CheckboxIsChecked,
  CheckChangePmiConfirmButton,
  ConfirmChangeToPMISetting,
  ClickCancelOnPopup,
  CheckDropDownStatus,
} from '../../../../../../../steps/Meeting';
import { CheckModalValue } from '../../../../../../../steps/Modal';

@autorun(test.skip)
@common
@it
@p2
@title('UI - PMI Change settings button')
export class RCI4019 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  run() {
    const { Login } = this;
    return (
      <Scenario desc="UI - PMI Change settings button">
        <When
          desc="Go to the Entry: User has rcv permission and open app"
          action={Login}
        />
        <And desc="RCV meeting page displays" action={CheckRCVPageDisplay} />
        <When desc="Turn on PMI checkbox" action={SwitchUsePersonalMeetingId} />
        <Then
          desc="The setting for PMI is disabled
								There is a button for changing PMI settings: Change Personal Meeting settings'button"
          action={[
            <CheckboxIsDisabled
              dataSign="usePersonalMeetingId"
              isDisabled={false}
            />,
            <CheckboxIsDisabled dataSign="requirePassword" isDisabled />,
            <CheckboxIsDisabled dataSign="muteAudio" isDisabled />,
            <CheckboxIsDisabled dataSign="turnOffCamera" isDisabled />,
            <CheckboxIsDisabled dataSign="limitScreenSharing" isDisabled />,
            <CheckboxIsDisabled dataSign="enableWaitingRoom" isDisabled />,
            <CheckboxIsDisabled dataSign="allowJoinBeforeHost" isDisabled />,
            <CheckboxIsDisabled dataSign="isOnlyAuthUserJoin" isDisabled />,
            <CheckDropDownStatus dataSign="waitingRoom" isDisabled />,
            <CheckDropDownStatus dataSign="authUserType" isDisabled />,
            <CheckChangePmiConfirmButton isShown />,
          ]}
        />
        <When
          desc="Click the 'Change Personal Meeting settings' button"
          action={ConfirmChangeToPMISetting}
        />
        <Then
          desc="There is a pop-up window below:
          Title: Change Personal Meeting settings?
          Content: Changing these settings will affect all meetings that use your personal meeting ID or name, including those you've already scheduled
          Cancel button
          Change button
          [L10N]"
          action={
            <CheckModalValue
              title="Change Personal Meeting settings?"
              confirmButtonText="Change"
              cancelButtonText="Cancel"
              childrenContent="Changing these settings will affect all meetings that use your personal meeting ID or name, including those you've already scheduled"
            />
          }
        />
        <When desc="Click 'Cancel' button" action={ClickCancelOnPopup} />
        <Then
          desc="Back to PMI meeting setting page, The setting for PMI is still disabled"
          action={[
            <CheckboxIsChecked dataSign="usePersonalMeetingId" isChecked />,
            <CheckboxIsDisabled
              dataSign="usePersonalMeetingId"
              isDisabled={false}
            />,
            <CheckboxIsDisabled dataSign="requirePassword" isDisabled />,
            <CheckboxIsDisabled dataSign="muteAudio" isDisabled />,
            <CheckboxIsDisabled dataSign="turnOffCamera" isDisabled />,
            <CheckboxIsDisabled dataSign="limitScreenSharing" isDisabled />,
            <CheckboxIsDisabled dataSign="enableWaitingRoom" isDisabled />,
            <CheckboxIsDisabled dataSign="allowJoinBeforeHost" isDisabled />,
            <CheckboxIsDisabled dataSign="isOnlyAuthUserJoin" isDisabled />,
            <CheckDropDownStatus dataSign="waitingRoom" isDisabled />,
            <CheckDropDownStatus dataSign="authUserType" isDisabled />,
          ]}
        />
      </Scenario>
    );
  }
}
