/**
 * RCI-1900: RCV - Schedule PMI meeting with changing settings
 * https://test_it_domain/test-cases/RCI-1900
 * Preconditions:
 * Already installed and logged in RingCentral Outlook Add-Ins.
 * User has logged in to 3rd party
 * User has PMI meeting settings below
 *
  | PMI default settings |Default key |Changed key |
  | Require password |ON |OFF |
	| Enable waiting room for |ON/Anyone not signed in |ON/Anyone outside my company |
	| Only host & moderators can share screen |ON |OFF |

 * Entry point(/s):
 * Google/O365 : More menu > schedule video meeting page >Mark on 'Use Personal Meeting ID XXX-XXX-XXX'
 * Scheduler:Outlook > New Event > office add-in > meeting setting page > Mark on 'Use Personal Meeting ID XXX-XXX-XXX' > Click 'Change Personal Meeting settings' > show a pop-up window >Click'Change'
 * Outlook appointment:Login to Outlook: > New Meeting/Appointment > RingCentral for outlook> meeting setting page > Mark on 'Use Personal Meeting ID XXX-XXX-XXX'> Click 'Change Personal Meeting settings' > show a pop-up window>Click'Change'
 */

import {
  p2,
  it,
  autorun,
  examples,
  StepFunction,
  Scenario,
  Step,
  Then,
  And,
  title,
  When,
  common,
} from '@ringcentral-integration/test-utils';

import { Login as CommonLogin } from '../../../../../../../steps/Login';
import {
  TurnOnToggle,
  CheckRCVPageDisplay,
  ConfirmChangeToPMISetting,
  CheckPatchMeetingParams,
  CheckboxIsDisabled,
  CheckboxIsChecked,
  CheckDropDownStatus,
  CheckChangePmiConfirmButton,
  ChangeMeetingOptionToOtherValue,
  ClickScheduleButton,
} from '../../../../../../../steps/Meeting';
import { SelectOptionFromDropDown } from '../../../../../../../steps/Common';
import {
  CheckModalExist,
  ClickConfirmInModal,
} from '../../../../../../../steps/Modal';
import type { StepProp } from '../../../../../../../lib/step';

@autorun(test.skip)
@common
@it
@p2
@title('RCV - Schedule PMI meeting with changing settings')
export class RCI1900 extends Step {
  Login: StepProp = CommonLogin;
  ClickScheduleButton: StepProp = ClickScheduleButton;
  CheckInjection: StepProp = () => {};

  @examples(`
    | pmiSetting                                | defaultKey                | changedKey                     | pmiKey               | itemDataSign         | defaultValue | changedValue |
    | 'Require password'                        | 'ON'                      | 'OFF'                          | 'isMeetingSecret'    | 'requirePassword'    | true         | false        |
    | 'Enable waiting room for'                 | 'ON/Anyone not signed in' | 'ON/Anyone outside my company' | 'waitingRoomMode'    | 'enableWaitingRoom'  | true         | 3            |
    | 'Only host & moderators can share screen' | 'ON'                      | 'OFF'                          | 'allowScreenSharing' | 'limitScreenSharing' | false        | true         |
  `)
  run() {
    const { Login, CheckInjection, ClickScheduleButton } = this;
    return (
      <Scenario desc="RCV - Schedule PMI meeting with changing settings">
        <When desc="Go to Entry point" action={Login} />
        <And desc="Wait for ready" action={CheckRCVPageDisplay} />
        <And
          desc="1. Mark on 'Use Personal Meeting ID XXX-XXX-XXX'
                2. Click 'Change Personal Meeting settings'  > show a pop-up window > Click 'Change'"
          action={[
            <TurnOnToggle dataSign="usePersonalMeetingId" />,
            ConfirmChangeToPMISetting,
            CheckModalExist,
            ClickConfirmInModal,
          ]}
        />
        <Then
          desc="The pop-up window will close(Applicable for Scheduler/outlook)
										The setting for PMI is enabled(Applicable for Scheduler/outlook)
										The 'Change Personal Meeting settings' button disappears(Applicable for Scheduler/outlook)
										[L10N]
										Check the PMI default settings show key as{Default key}"
          action={async ({
            pmiKey,
            itemDataSign,
            defaultValue,
            defaultKey,
          }: any) => [
            <CheckModalExist isExist={false} />,
            <CheckboxIsDisabled
              dataSign="requirePassword"
              isDisabled={false}
            />,
            <CheckboxIsDisabled dataSign="muteAudio" isDisabled={false} />,
            <CheckboxIsDisabled dataSign="turnOffCamera" isDisabled={false} />,
            <CheckboxIsDisabled
              dataSign="limitScreenSharing"
              isDisabled={false}
            />,
            <CheckboxIsDisabled
              dataSign="enableWaitingRoom"
              isDisabled={false}
            />,
            <CheckboxIsDisabled
              dataSign="allowJoinBeforeHost"
              isDisabled={false}
            />,
            <CheckboxIsDisabled
              dataSign="isOnlyAuthUserJoin"
              isDisabled={false}
            />,
            pmiKey === 'enableWaitingRoom' ? (
              <CheckDropDownStatus
                dataSign="waitingRoom"
                isDisabled={false}
                defaultValue={defaultKey.split('/')[1]}
              />
            ) : null,
            <CheckChangePmiConfirmButton isShown={false} />,
            <CheckboxIsChecked
              dataSign={itemDataSign}
              // Only host & moderators can share screen is a revert option
              isChecked={
                pmiKey === 'allowScreenSharing' ? !defaultValue : defaultValue
              }
            />,
          ]}
        />
        <When
          desc="> Change{PMI default settings}to{Changed key}
								> Add the PMI meeting to calendar"
          action={async ({ pmiKey, changedKey, itemDataSign }: any) => {
            return pmiKey === 'waitingRoomMode' ? (
              <SelectOptionFromDropDown
                dropdownSelector="waitingRoom"
                targetOption={changedKey.split('/')[1]}
              />
            ) : (
              <ChangeMeetingOptionToOtherValue meetingOption={itemDataSign} />
            );
          }}
        />
        <Then
          desc="Meeting inject successfully"
          action={[ClickScheduleButton, CheckInjection]}
        />
        <When
          desc="Go to RCV web > Settings > Personal Meeting ID > check the default settings:
            The key of PMI default settings is the same as{Changed key}"
          action={async ({ pmiKey, changedValue }: any) => {
            const assignProp = { [pmiKey]: changedValue };
            return <CheckPatchMeetingParams {...assignProp} />;
          }}
        />
      </Scenario>
    );
  }
}
