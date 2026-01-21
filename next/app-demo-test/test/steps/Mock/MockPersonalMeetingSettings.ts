import type { RcMock } from '@ringcentral-integration/mock';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export interface MockPersonalMeetingSettingsProps {
  handle?: Parameters<RcMock['getVideoPersonalSettings']>[0];
}

export const MockPersonalMeetingSettings: StepFunction<
  MockPersonalMeetingSettingsProps
> = async ({ handle }, { rcMock }) => {
  rcMock.replaceDefaultInitMock(rcMock.getVideoPersonalSettings, () => {
    rcMock.getVideoPersonalSettings(handle);
  });
};
