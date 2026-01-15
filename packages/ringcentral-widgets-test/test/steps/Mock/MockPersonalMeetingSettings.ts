import type { RcMock } from '@ringcentral-integration/internal-mock';

import type { StepFunction } from '../../lib/step';

export interface MockPersonalMeetingSettingsProps {
  status?: number;
  handle?: Parameters<RcMock['getVideoPersonalSettingsV2']>[0];
}

export const MockPersonalMeetingSettings: StepFunction<
  MockPersonalMeetingSettingsProps
> = async ({ status, handle }, { rcMock }) => {
  rcMock.defaultInitMocks.delete(rcMock.getVideoPersonalSettingsV2);
  rcMock.defaultInitMocks.add(() => {
    rcMock.getVideoPersonalSettingsV2(handle, status);
  });
};
