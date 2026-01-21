import { callDirection } from '@ringcentral-integration/commons/enums/callDirections';
import { PartyStatusCode } from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MakeOtherDeviceConferenceCallProps {
  status: PartyStatusCode;
}

export const MakeOtherDeviceConferenceCall: StepFunction<
  MakeOtherDeviceConferenceCallProps
> = ({ status = PartyStatusCode.answered }, { rcMock }) => {
  rcMock.makeCall({
    phoneNumber: 'conference',
    direction: callDirection.outbound,
    isWebRTC: false,
    status,
    toNumberData: { phoneNumber: 'conference', name: 'Conference' },
    originType: 'Conference',
  });
};
