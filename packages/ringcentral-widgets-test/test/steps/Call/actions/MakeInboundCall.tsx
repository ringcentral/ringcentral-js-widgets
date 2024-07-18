import type { CallDirection } from '@ringcentral-integration/commons/enums/callDirections';
import type { NumberData } from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';

import type { StepFunction } from '../../../lib/step';

export interface InitACallProps {
  phoneNumber?: string;
  isWebRTC?: boolean;
  direction?: CallDirection;
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
  {
    phoneNumber = '+18882556247',
    fromNumberData,
    startTime,
    isWebRTC = true,
    ...props
  },
  { rcMock, phone },
) => {
  // No inbound call when webphone register failed
  if (isWebRTC) {
    const isWebphoneRegisterFailed = !!phone.webphone.errorCode;
    if (isWebphoneRegisterFailed) {
      return;
    }
  }

  await rcMock.makeCall({
    phoneNumber,
    fromNumberData,
    direction: 'Inbound',
    startTime,
    isWebRTC,
    ...props,
  });
};
