import callDirection from '@ringcentral-integration/commons/enums/callDirections';
import { CallDirection } from '@ringcentral-integration/commons/modules/ConferenceCall';
import { PartyStatusCode } from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';

import { StepFunction } from '../../../lib/step';

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
