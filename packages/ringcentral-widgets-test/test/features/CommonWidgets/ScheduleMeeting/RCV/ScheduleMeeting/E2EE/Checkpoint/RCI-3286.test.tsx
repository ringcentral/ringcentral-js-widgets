/**
 * RCI-3286: Interaction with other security options when E2EE is on
 * https://test_it_domain/test-cases/RCI-3286
 * Preconditions:
 * RC CTI app is installed and enabled
 * Turnonthe 'RingCentral Video E2EE Availability'flag on theAdmin web
 * The 'Use end-to-end encryption by default for new meetings' option is unlocked in SW Admin
 * Security settings areunlocked inSWAdmin
 * The user has logged in to RC CTI with the RCV provider
 * Keep the 'Use personal meeting id' option off
 * Entry point(/s):
 * Office Add-in > New Event > Schedule with RingCentral
 */
import {
  autorun,
  examples,
  it,
  p2,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import type { StepProp } from '../../../../../../../lib/step';
import { CheckDropDownList } from '../../../../../../../steps/Common';
import { CommonLogin } from '../../../../../../../steps/CommonLogin';
import {
  CheckboxIsChecked,
  CheckboxIsDisabled,
  CheckboxIsLocked,
  CheckRCVPageDisplay,
  TurnOnToggle,
} from '../../../../../../../steps/Meeting';

@autorun(test.skip)
@it
@p2
@title('Interaction with other security options when E2EE is on')
export class RCI3286 extends Step {
  Login: StepProp = CommonLogin;
  @examples(`
    | mockE2EEState | e2eeOptionValue |
    | 'off-unlock'  | false           |
  `)
  run() {
    const { Login } = this;
    return (
      <Scenario desc="Interaction with other security options when E2EE is on">
        <When desc="Go toEntry point" action={Login} />
        <Then
          desc="RCV meeting page displays
										Option 'Use end-to-end encryption' at the first line in Security Section'
										Option 'Use end-to-end encryption' status iseditable"
          action={({ e2eeOptionValue }: any) => [
            CheckRCVPageDisplay,
            <CheckboxIsChecked dataSign="e2ee" isChecked={e2eeOptionValue} />,
            <CheckboxIsDisabled isDisabled={false} dataSign="e2ee" />,
            <CheckboxIsLocked isLocked={false} dataSign="e2eeWrapper" />,
          ]}
        />
        <When
          desc="Turn on'Use end-to-end encryption'"
          action={<TurnOnToggle dataSign="e2ee" />}
        />
        <Then
          desc="PMI checkbox should be off and disabled
										'Require password' checkboxshould be onanddisabled
										'Enable waiting room' checkboxshould beonanddisabled
										'Only authenticated users can join' checkboxshould beonanddisabled
										'Participants can only join after me' checkboxshould beonandeditable"
          action={() => (
            <>
              {/* Use Personal Meeting ID  */}
              <CheckboxIsChecked
                isChecked={false}
                dataSign="usePersonalMeetingId"
              />
              <CheckboxIsDisabled isDisabled dataSign="usePersonalMeetingId" />
              {/* require password */}
              <CheckboxIsChecked isChecked dataSign="requirePassword" />
              <CheckboxIsDisabled isDisabled dataSign="requirePassword" />
              {/* Participants can only join after me */}
              <CheckboxIsChecked isChecked dataSign="allowJoinBeforeHost" />
              <CheckboxIsDisabled
                isDisabled={false}
                dataSign="allowJoinBeforeHost"
              />
              {/* Enable waiting room */}
              <CheckboxIsChecked isChecked dataSign="enableWaitingRoom" />
              <CheckboxIsDisabled isDisabled dataSign="enableWaitingRoom" />
              {/* Only authenticated users can join */}
              <CheckboxIsChecked isChecked dataSign="isOnlyAuthUserJoin" />
              <CheckboxIsDisabled isDisabled dataSign="isOnlyAuthUserJoin" />
            </>
          )}
        />
        <When desc="Check'Only authenticated users can join' dropdown" />
        <Then
          desc="Option'Signed in users'should set as default automatically andeditable
										Option'Signed in co-workers' should beeditable"
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
        <When desc="Check'Enable waiting room' dropdown" />
        <Then
          desc="Option'Anyone outside my company'should set as default automatically andeditable
										Option'Everyone' should be editable
										Option 'Anyone not signed in'should bedisabled"
          action={
            <CheckDropDownList
              dataSign="waitingRoom"
              options={[
                {
                  value: 'Anyone outside my company',
                  isSelected: true,
                },
                {
                  value: 'Everyone',
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
