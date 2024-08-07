/**
 * RCI-1056: Current conference call control_mute/muted
 * https://test_it_domain/test-cases/RCI-1056
 * Preconditions:
 * Account type(/s):RC US/CA/UK/EU/AU, TELUS, BT, AT&T
 * Extension type(/s):
 * Entry point(/s):
 *
 */
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  p1,
  it,
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
  And,
} from '@ringcentral-integration/test-utils';

import {
  CheckMuteButton,
  CheckUnmuteButton,
  CallButtonBehavior,
  ClickAddButton,
  ClickMergeButton,
  MakeCall,
  CheckConferenceCallControlPage,
  CheckConferenceInfoPage,
} from '../../../../../../steps/Call';
import { CommonLogin } from '../../../../../../steps/CommonLogin';
import {
  MockConferenceCall,
  MockTelephonySession,
  MockBringInToConference,
  MockMessageList,
  MockMessageSync,
} from '../../../../../../steps/Mock';
import { NavigateToDialer } from '../../../../../../steps/Navigate';
import { NavigateTo } from '../../../../../../steps/Router';
import {
  ClickSaveButton,
  ExpandCallingSettingDropdown,
  SelectCallingSetting,
} from '../../../../../../steps/Settings';

@autorun(test.skip)
@it
@p1
@title('Current conference call control_mute/muted')
export class RCI1056 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  useRcMock?: boolean = false;
  run() {
    const { Login } = this;
    return (
      <Scenario
        desc="Current conference call control_mute/muted"
        action={[
          Login,
          this.useRcMock && <MockMessageList repeat={0} />,
          this.useRcMock && <MockMessageSync repeat={3} />,
        ]}
      >
        <Given
          desc="Navigate To CallingSetting, Web Phone is enabled and 'Browser'  is selected in Settings > Calling > Make my calls with"
          action={[
            <NavigateTo path="/settings/calling" />,
            ExpandCallingSettingDropdown,
            <SelectCallingSetting settingName="Browser" />,
            ClickSaveButton,
          ]}
        />
        <When
          desc="Click the call button"
          action={[NavigateToDialer, <MakeCall phoneNumber="+18882556247" />]}
        />
        <And
          desc="Add a call"
          action={[ClickAddButton, <MakeCall phoneNumber="+18882556241" />]}
        />
        <Then
          desc="Check the conference call control page"
          action={CheckConferenceCallControlPage}
        />
        <When
          desc="Merge a call"
          action={[
            MockConferenceCall,
            MockBringInToConference,
            MockTelephonySession,
            ClickMergeButton,
            CheckConferenceInfoPage,
          ]}
        />
        <Then
          desc="There is a 'Mute' button
										[L10N]"
          action={CheckMuteButton}
        />
        <When
          desc="Press 'Mute' button"
          action={<CallButtonBehavior callButtonBehaviorType="unmute" />}
        />
        <Then
          desc="1.The current user's conference call will mute, but can hear other participants talking
                2. Other participants can talk to each other
                3. 'Mute' button is replaced by 'Unmute' button
                [L10N]"
          action={CheckUnmuteButton}
        />
        <When
          desc="Press 'Unmute' button"
          action={<CallButtonBehavior callButtonBehaviorType="mute" />}
        />
        <Then
          desc="1.The current user's conference call is resumed and unmuted
								2.The 'Unmute' button is replaced with 'Mute' button"
          action={CheckMuteButton}
        />
      </Scenario>
    );
  }
}
