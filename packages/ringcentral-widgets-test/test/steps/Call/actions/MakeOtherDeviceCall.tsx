import { initACall } from '../../../../__test__/support/activeSessionCallHelper';

import { StepFunction } from '../../../lib/step';

interface MakeOtherDeviceCallProps {
  phoneNumber?: string;
}

export const MakeOtherDeviceCall: StepFunction<MakeOtherDeviceCallProps> =
  async ({ phoneNumber = '+18882556247' }, context) => {
    await initACall({
      phoneNumber,
      direction: 'Inbound',
      status: 'connected',
      isWebRTC: false,
    });
  };
