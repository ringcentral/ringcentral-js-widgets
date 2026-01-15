import type { RcMock } from '@ringcentral-integration/internal-mock';

import type { StepFunction } from '../../lib/step';

interface MockRcvGetMeetingInfoProps {
  shortId: string;
  repeat?: number;
  isDefaultInit?: boolean;
  handle?: Parameters<RcMock['getRcvMeetingInfoV2']>[1];
}

export const MockRcvGetMeetingInfo: StepFunction<
  MockRcvGetMeetingInfoProps
> = async ({ shortId, repeat, handle, isDefaultInit = true }, { rcMock }) => {
  if (!isDefaultInit) {
    rcMock.getRcvMeetingInfoV2(shortId, handle, repeat);
    return;
  }
  rcMock.defaultInitMocks.delete(rcMock.getRcvMeetingInfoV2);
  rcMock.defaultInitMocks.add(() => {
    rcMock.getRcvMeetingInfoV2(shortId, handle, repeat);
  });
};
