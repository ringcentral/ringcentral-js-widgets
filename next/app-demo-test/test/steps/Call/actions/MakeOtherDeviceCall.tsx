import {
  callDirection,
  type CallDirection,
} from '@ringcentral-integration/commons/enums/callDirections';
import { PartyStatusCode } from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MakeOtherDeviceCallProps {
  phoneNumber?: string;
  direction?: CallDirection;
  status?: PartyStatusCode;
  sessionId?: string;
  telephonySessionId?: string;
}

export const MakeOtherDeviceCall: StepFunction<MakeOtherDeviceCallProps> = (
  {
    phoneNumber = '+165023323333',
    direction = callDirection.outbound,
    status = PartyStatusCode.answered,
    sessionId,
    telephonySessionId,
  },
  { rcMock },
) => {
  rcMock.makeCall({
    phoneNumber,
    direction,
    isWebRTC: false,
    status,
    sessionId,
    telephonySessionId,
  });
};
