import postRcvBridgesBody from '@ringcentral-integration/mock/src/platform/data/postRcvBridges.json';
import rcvMeetingSettingsV2Body from '@ringcentral-integration/mock/src/platform/data/rcvMeetingSettingsV2.json';

import type { StepFunction } from '../../../lib/step';

interface MockPatchBridgesProps {
  handler?: (bridge: any) => any;
  repeat?: number;
  useV1?: boolean;
}

export const MockPatchBridges: StepFunction<MockPatchBridgesProps> = async (
  { handler = (a) => a, repeat = 0, useV1 },
  { rcMock },
) => {
  if (useV1) {
    rcMock.patch('/rcvideo/v1/bridges/:meetingId' as any, 200, {
      response: { body: handler(postRcvBridgesBody) },
    });
    return;
  }
  rcMock.patch('/rcvideo/v2/bridges/:meetingId' as any, 200, {
    repeat,
    response: {
      body: handler(rcvMeetingSettingsV2Body),
    },
  });
};
