import type { RcMock } from '@ringcentral-integration/internal-mock';

import type { StepFunction } from '../../lib/step';

export interface MockPersonalMeetingSettingsProps {
  handle?: Parameters<RcMock['getVideoPersonalSettings']>[0];
}

export const MockPersonalMeetingSettings: StepFunction<
  MockPersonalMeetingSettingsProps
> = async ({ handle }, { rcMock }) => {
  rcMock.defaultInitMocks.delete(rcMock.getVideoPersonalSettings);
  rcMock.defaultInitMocks.add(() => {
    rcMock.getVideoPersonalSettings(handle);
  });
};
