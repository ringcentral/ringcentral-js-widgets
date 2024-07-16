import {
  callDirection,
  type CallDirection,
} from '@ringcentral-integration/commons/enums/callDirections';
import { PartyStatusCode } from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';

import type { StepFunction } from '../../../lib/step';

interface MakeOtherDeviceCallProps {
  phoneNumber?: string;
  direction?: CallDirection;
  status: PartyStatusCode;
}

export const MakeOtherDeviceCall: StepFunction<MakeOtherDeviceCallProps> = (
  {
    phoneNumber = '+165023323333',
    direction = callDirection.outbound,
    status = PartyStatusCode.answered,
  },
  { rcMock },
) => {
  rcMock.makeCall({
    phoneNumber,
    direction,
    isWebRTC: false,
    status,
  });
};
