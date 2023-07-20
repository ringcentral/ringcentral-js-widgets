/**
 * RCI-1055: Current conference call control_Hold/unhold
 * https://test_it_domain/test-cases/RCI-1055
 * Preconditions:
 * The user has logged into 3rd party.
 * The user has logged into RC CTI App
 * WebPhone is enabled
 * 'Browser' is selected in Settings > Calling > Make my calls with
 * There is a conference call
 * Entry point(/s):
 *
 */

import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  p1,
  it,
  autorun,
  Given,
  And,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../../../../steps/CommonLogin';
import {
  CreateMock,
  MockGetPhoneNumber,
  MockMessageSync,
  MockPresence,
  MockConferenceCall,
  MockTelephonySession,
  MockBringInToConference,
} from '../../../../../../steps/Mock';
import { NavigateTo } from '../../../../../../steps/Router/action';
import { CreateInstance } from '../../../../../../steps/CreateInstance';
import {
  ClickSaveButton,
  ExpandDropdown,
  SelectCallingSetting,
} from '../../../../../../steps/Settings';
import {
  CheckHoldBehavior,
  CallButtonBehavior,
  CheckActiveCallExist,
  ClickAddButton,
  ClickMergeButton,
  MakeCall,
  CheckConferenceCallControlPage,
  CheckConferenceInfoPage,
  CheckCallCtrlButton,
  CheckCallCtrlButtonEnable,
} from '../../../../../../steps/Call';
import { NavigateToDialer } from '../../../../../../steps/Navigate';

@autorun(test)
@it
@p1
@title('Current conference call control_Hold/unhold')
export class RCI1055 extends Step {
  Login: StepFunction<any, any> | StepFunction<any, any>[] = (props) => (
    <CommonLogin {...props} CreateInstance={CreateInstance} />
  );
  CreateMock: StepFunction<any, any> | StepFunction<any, any>[] | null =
    CreateMock;
  run() {
    const { Login, CreateMock } = this;
    return (
      <Scenario
        desc="Current conference call control_Hold/unhold"
        action={[
          CreateMock,
          MockGetPhoneNumber,
          MockMessageSync,
          MockPresence,
          Login,
        ]}
      >
        <Given
          desc="Navigate To CallingSetting, Web Phone is enabled and 'Browser'  is selected in Settings > Calling > Make my calls with"
          action={[
            (_: any, { phone }: any) => {
              jest.spyOn(phone.webphone, 'unhold');
              jest.spyOn(phone.webphone, 'hold');
            },
            <NavigateTo path="/settings/calling" />,
            ExpandDropdown,
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
            <MockBringInToConference repeat={0} />,
            <MockTelephonySession repeat={0} />,
            ClickMergeButton,
            CheckConferenceInfoPage,
          ]}
        />
        <Then
          desc="User is on Conference Call call control page"
          action={[CheckActiveCallExist, CheckConferenceInfoPage]}
        />
        <And
          desc="Check there should be a Hold button [L10N]"
          action={<CheckCallCtrlButton callButtonBehaviorType="hold" />}
        />
        <When
          desc="Get conference call id"
          action={(_: any, { phone, payload }: any) => {
            payload.conferenceCallId = phone.webphone.sessions.find((session) =>
              session.id.includes('conf'),
            )?.id;
          }}
        />
        <And
          desc="Click the 'Hold' button"
          action={<CallButtonBehavior callButtonBehaviorType="hold" />}
        />
        <Then
          desc="The current user's call will be held, other participants still can hear each other
										All the participants can't hear the hold music
										The 'Mute/Record' button will be disabled
										The 'Hold' button is replaced by an unheld button,'On hold' is displayed under the unheld button.
										[L10N]"
          action={async (_: any, { payload }: any) => [
            <CheckHoldBehavior type="hold" callId={payload.conferenceCallId} />,
            <CheckCallCtrlButtonEnable
              callButtonBehaviorType="record"
              isDisabled
            />,
            <CheckCallCtrlButtonEnable
              callButtonBehaviorType="unmute"
              isDisabled
            />,
            <CheckCallCtrlButton callButtonBehaviorType="onHold" />,
          ]}
        />
        <When
          desc="Click the 'On hold' button"
          action={<CallButtonBehavior callButtonBehaviorType="onHold" />}
        />
        <Then
          desc="The call should be held"
          action={async (_: any, { payload }: any) => {
            return (
              <CheckHoldBehavior
                type="unhold"
                callId={payload.conferenceCallId}
              />
            );
          }}
        />
      </Scenario>
    );
  }
}
