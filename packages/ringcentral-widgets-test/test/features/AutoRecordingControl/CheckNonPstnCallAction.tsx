/* RCI-3778: Check non-pstn call control action
https://testit.ringcentral.com/test-cases/RCI-3778
*/

import {
  FeaturesData,
  MockStopRecordError,
  Record,
} from '@ringcentral-integration/commons/integration-test/mock';
import { Context } from '../../interfaces';
import {
  autorun,
  title,
  Scenario,
  Then,
  Step,
  Given,
  StepFunction,
  examples,
  it,
  p2,
  When,
  And,
} from '../../lib/step';
import { CheckAlertMessage } from '../../steps/Alert';
import {
  ClickMoreButton,
  ClickStopRecordButton,
  MakeInboundCall,
  MakeOutboundCall,
  CheckCannotControlMute,
  CheckStopRecordButtonExist,
} from '../../steps/Call';
import { generateFeaturesData } from './helper';

const mockAutoInboundCallRecording = JSON.stringify({
  id: 'AutoInboundCallRecording',
  available: true,
});

const mockAutoOutboundCallRecording = JSON.stringify({
  id: 'AutoOutboundCallRecording',
  available: true,
});

const mockAutoCallRecordingMute = JSON.stringify({
  available: true,
  id: 'AutoCallRecordingMute',
});

export const checkNonPstnCallAction = ({
  Login,
}: {
  Login: StepFunction<{
    featuresData: Partial<FeaturesData>;
    isRecording: boolean;
  }>;
}) => {
  @autorun(test)
  @it
  @p2
  @title('Check non-pstn call control action')
  class CheckNonPstnCallAction extends Step {
    @examples(`
     | direction  | mock_auto_call_recording         | mock_auto_call_recording_mute | status     |is_recording |
     | 'Inbound'  | ${mockAutoInboundCallRecording}  | ${mockAutoCallRecordingMute}  | 'answered' |true         |
     | 'Outbound' | ${mockAutoOutboundCallRecording} | ${mockAutoCallRecordingMute}  | 'ring'     |true         |
    `)
    run() {
      return (
        <Scenario desc="Check auto recording but not allow mute">
          <Given
            desc="User login and set config ${mock_auto_call_recording} and ${mock_auto_call_recording_mute} in Service Web"
            action={({
              mockAutoCallRecording,
              mockAutoCallRecordingMute,
              isRecording,
            }: {
              mockAutoCallRecording: Record;
              mockAutoCallRecordingMute: Record;
              isRecording: boolean;
            }) => {
              return (
                <Login
                  featuresData={generateFeaturesData(
                    mockAutoCallRecording,
                    mockAutoCallRecordingMute,
                  )}
                  isRecording={isRecording}
                />
              );
            }}
          />
          <When
            desc="User make a ${direction} call"
            action={[
              ({
                direction,
                isRecording,
                status,
              }: {
                direction: 'Inbound' | 'Outbound';
                isRecording: boolean;
                status: 'connected' | 'ring';
              }) => {
                if (direction === 'Inbound') {
                  return (
                    <MakeInboundCall
                      isRecording={isRecording}
                      status={status}
                    />
                  );
                }
                return <MakeOutboundCall />;
              },
              (_: any, { phone }: Context) => {
                const {
                  id: sessionId,
                  recordings,
                  party,
                } = phone.activeCallControl.sessions[0];
                const recordingId = recordings[0].id;
                const partyId = party.id;
                MockStopRecordError({
                  sessionId,
                  recordingId,
                  partyId,
                });
              },
            ]}
          />
          <Then
            desc="User should see that the call is being recording"
            action={[ClickMoreButton, CheckStopRecordButtonExist]}
          />
          <Then
            desc="User click the recording button"
            action={ClickStopRecordButton}
          />
          <And
            desc="User should see that alert error message and fail to pause, Call is still on recording status"
            action={[
              <CheckAlertMessage message="Sorry, we weren't able to stop recording the call. Try again later." />,
              CheckCannotControlMute,
              CheckStopRecordButtonExist,
            ]}
          />
        </Scenario>
      );
    }
  }
};
