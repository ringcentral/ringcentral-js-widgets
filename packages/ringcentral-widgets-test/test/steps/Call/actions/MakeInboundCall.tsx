import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import { NumberData } from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';

import { StepFunction } from '../../../lib/step';

type CallDirectionsKeys = keyof typeof callDirections;
type CallDirections = typeof callDirections[CallDirectionsKeys];

export interface InitACallProps {
  phoneNumber?: string;
  isWebRTC?: boolean;
  direction?: CallDirections;
  telephonySessionId?: string;
  sessionId?: string;
  fromNumberData?: NumberData;
  toNumberData?: NumberData;
  startTime?: string;
  isRecording?: boolean;
  useUserAgentSession?: boolean;
  queueCall?: boolean;
  tempSocketMockServer?: { trigger(...args: any[]): Promise<void> };
}

export const MakeInboundCall: StepFunction<InitACallProps> = async (
  { phoneNumber = '+18882556247', fromNumberData, startTime, ...props },
  { rcMock },
) => {
  await rcMock.makeCall({
    phoneNumber,
    fromNumberData,
    direction: 'Inbound',
    startTime,
    ...props,
  });
};
