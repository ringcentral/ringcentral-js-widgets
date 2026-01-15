/* RCI-3758: Check auto recording but not allow mute
https://test_it_domain/test-cases/RCI-3758
*/
import type {
  FeaturesData,
  Record,
} from '@ringcentral-integration/commons/integration-test/mock';

import type { Context } from '../../interfaces';
import type { StepFunction } from '../../lib/step';
import {
  autorun,
  title,
  Scenario,
  Then,
  Step,
  Given,
  examples,
  it,
  p2,
  When,
  And,
} from '../../lib/step';
import { CheckAlertMessage } from '../../steps/Alert';
import {
  ClickMoreButton,
  StopRecordCall,
  MakeInboundCall,
  MakeOutboundCall,
  CheckRecordingIndicator,
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
  available: false,
  id: 'AutoCallRecordingMute',
  reason: {
    code: 'AccountLimitation',
    message: 'The feature is turned off for the current account',
  },
});

export const checkAutoRecordingButNotAllowMute = ({
  Login,
  needCheckRecordingIndicator = false,
}: {
  Login: StepFunction<{
    featuresData: Partial<FeaturesData>;
    isRecording: boolean;
  }>;
  needCheckRecordingIndicator?: boolean;
}) => {
  @autorun(test)
  @it
  @p2
  @title('Check ${direction} call auto recording but not allow mute')
  class CheckAutoRecordingButNotAllowMute extends Step {
    @examples(`
      | direction  | mock_auto_call_recording         | mock_auto_call_recording_mute | status     | is_recording |
      | 'Inbound'  | ${mockAutoInboundCallRecording}  | ${mockAutoCallRecordingMute}  | 'connected'| true         |
      | 'Outbound' | ${mockAutoOutboundCallRecording} | ${mockAutoCallRecordingMute}  | 'ring'     | true         |
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
              (_: any, { rcMock }: Context) => {
                rcMock.stopRecording(403);
              },
              ClickMoreButton,
            ]}
          />
          <And
            desc="User click 'Stop recording' button"
            action={StopRecordCall}
          />
          <Then
            desc="User should see that the call is being recording"
            action={() => {
              if (needCheckRecordingIndicator)
                return <CheckRecordingIndicator recordingIndicatorExist />;
            }}
          />
          <And
            desc="User should see that alert error message and fail to pause"
            action={
              <CheckAlertMessage message="Sorry, we weren't able to stop recording the call. Try again later." />
            }
          />
        </Scenario>
      );
    }
  }
};
