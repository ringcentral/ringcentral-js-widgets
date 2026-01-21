/**
 * RCI-2064: Schedule on behalf - Update PMI meeting
 * https://test_it_domain/test-cases/RCI-2064
 * Preconditions:
 * The user hasRCVpermission.
 * Already installed and logged in app
 * Entry point(/s):
 * Scheduler:Outlook > New Event > office add-in > meeting setting page > Mark on 'Use Personal Meeting ID XXX-XXX-XXX' > Click 'Change Personal Meeting settings' > show a pop-up window >Click'Change'
 * Outlook appointment:Login to Outlook: > New Meeting/Appointment > RingCentral for outlook> meeting setting page > Mark on 'Use Personal Meeting ID XXX-XXX-XXX'> Click 'Change Personal Meeting settings' > show a pop-up window>Click'Change'
 */
import type { RcVideoAPI } from '@ringcentral-integration/commons/interfaces/Rcv.model';
import { GenericMeeting } from '@ringcentral-integration/micro-meeting/src/app/services';
import {
  autorun,
  common,
  it,
  p2,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../../../../steps/CommonLogin';
import {
  CheckPatchMeetingParams,
  CheckRCVPageDisplay,
  ClickScheduleButton,
  ConfirmChangeToPMISetting,
  SwitchToggle,
  TurnOnToggle,
} from '../../../../../../steps/Meeting';
import {
  CheckModalVisible,
  ClickConfirmInModal,
} from '../../../../../../steps/Modal';

@autorun(test.skip)
@common
@it
@p2
@title('Schedule on behalf - Update PMI meeting')
export class RCI2064 extends Step {
  Login: StepFunction<any, any> = CommonLogin;
  run() {
    const { Login } = this;
    let meeting: RcVideoAPI;
    return (
      <Scenario desc="Schedule on behalf - Update PMI meeting" action={Login}>
        <When
          desc="Update the following settings, press 'Update Meeting' button
										Meeting settings
										Use Personal Meeting ID (except this option)
										Mute Audio for participants
										Turn off camera for participants
										Security
										Require Password
										Participantscan only join after host
										Enable waiting room
										Only authenticateduser canjoin
										Only host and moderator can share screen"
          action={[
            CheckRCVPageDisplay,
            <TurnOnToggle dataSign="usePersonalMeetingId" />,
            ConfirmChangeToPMISetting,
            CheckModalVisible,
            ClickConfirmInModal,
            <SwitchToggle dataSign="muteAudio" />,
            <SwitchToggle dataSign="turnOffCamera" />,
            <SwitchToggle dataSign="requirePassword" />,
            <SwitchToggle dataSign="allowJoinBeforeHost" />,
            <SwitchToggle dataSign="enableWaitingRoom" />,
            <SwitchToggle dataSign="isOnlyAuthUserJoin" />,
            <SwitchToggle dataSign="limitScreenSharing" />,
            ((_, { app }) => {
              const genericMeeting = app.container.got(GenericMeeting)!;
              meeting = genericMeeting.meeting;
            }) as StepFunction,
            ClickScheduleButton,
          ]}
        />
        <Then
          desc="Meeting is updated
										Settings are updated to backend (RCV web > Settings > Personal Meeting ID)"
          action={() => {
            const {
              allowJoinBeforeHost,
              allowScreenSharing,
              isMeetingSecret,
              isOnlyAuthUserJoin,
              isOnlyCoworkersJoin,
              meetingPassword,
              muteAudio,
              muteVideo,
              waitingRoomMode,
            } = meeting;
            return (
              <CheckPatchMeetingParams
                allowJoinBeforeHost={allowJoinBeforeHost}
                allowScreenSharing={allowScreenSharing}
                isMeetingSecret={isMeetingSecret}
                isOnlyAuthUserJoin={isOnlyAuthUserJoin}
                isOnlyCoworkersJoin={isOnlyCoworkersJoin}
                meetingPassword={isMeetingSecret ? meetingPassword : undefined}
                muteAudio={muteAudio}
                muteVideo={muteVideo}
                waitingRoomMode={waitingRoomMode}
              />
            );
          }}
        />
      </Scenario>
    );
  }
}
