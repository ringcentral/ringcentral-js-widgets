import type telephonySessionResponse from '@ringcentral-integration/mock/src/platform/data/telephonySession.json';

import type { StepFunction } from '../../lib/step';

interface MockTelephonySessionProps {
  handler?: (
    res: typeof telephonySessionResponse,
  ) => typeof telephonySessionResponse;
  repeat?: number;
}

export const MockTelephonySession: StepFunction<MockTelephonySessionProps> =
  async ({ handler, repeat }, { rcMock }) => {
    rcMock.getTelephonySession(handler, repeat);
  };
