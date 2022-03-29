/* RCI-3777: Check cannot auto recording
https://testit.ringcentral.com/test-cases/RCI-3777
*/

import {
  FeaturesData,
  Record,
} from '@ringcentral-integration/commons/integration-test/mock';
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
import {
  ClickMoreButton,
  MakeInboundCall,
  MakeOutboundCall,
  CheckRecordingIndicator,
  CheckCannotAutoCallRecording,
} from '../../steps/Call';
import { generateFeaturesData } from './helper';

const mockAutoInboundCallRecording = JSON.stringify({
  available: false,
  id: 'AutoInboundCallRecording',
  reason: {
    code: 'AccountLimitation',
    message: 'The feature is turned off for the current account',
  },
});

const mockAutoOutboundCallRecording = JSON.stringify({
  available: false,
  id: 'AutoOutboundCallRecording',
  reason: {
    code: 'AccountLimitation',
    message: 'The feature is turned off for the current account',
  },
});

const mockAutoCallRecordingMute = JSON.stringify({
  available: true,
  id: 'AutoCallRecordingMute',
});

export const checkCannotAutoRecording = ({
  Login,
  needCheckRecordingIndicator = false,
}: {
  Login: StepFunction<{
    featuresData: Partial<FeaturesData>;
  }>;
  needCheckRecordingIndicator?: boolean;
}) => {
  @autorun(test)
  @it
  @p2
  @title('Check cannot auto recording')
  class CheckCannotAutoRecording extends Step {
    @examples(`
      | direction  | mock_auto_call_recording         | mock_auto_call_recording_mute | status     |
      | 'Inbound'  | ${mockAutoInboundCallRecording}  | ${mockAutoCallRecordingMute}  | 'connected'|
      | 'Outbound' | ${mockAutoOutboundCallRecording} | ${mockAutoCallRecordingMute}  | 'ring'     |
  `)
    run() {
      return (
        <Scenario desc="Check auto recording but not allow mute">
          <Given
            desc="User login and set config ${mock_auto_call_recording} in Service Web"
            action={({
              mockAutoCallRecording,
              mockAutoCallRecordingMute,
            }: {
              mockAutoCallRecording: Record;
              mockAutoCallRecordingMute: Record;
            }) => {
              return (
                <Login
                  featuresData={generateFeaturesData(
                    mockAutoCallRecording,
                    mockAutoCallRecordingMute,
                  )}
                />
              );
            }}
          />
          <When
            desc="User make a ${direction} call"
            action={[
              ({
                direction,
                status,
              }: {
                direction: 'Inbound' | 'Outbound';
                status: 'connected' | 'ring';
              }) => {
                if (direction === 'Inbound') {
                  return <MakeInboundCall status={status} />;
                }
                return <MakeOutboundCall />;
              },
              ClickMoreButton,
            ]}
          />
          <Then
            desc="User should see that the call is not recording status"
            action={[
              CheckCannotAutoCallRecording,
              () => {
                if (needCheckRecordingIndicator) {
                  return (
                    <CheckRecordingIndicator recordingIndicatorExist={false} />
                  );
                }
              },
            ]}
          />
        </Scenario>
      );
    }
  }
};
