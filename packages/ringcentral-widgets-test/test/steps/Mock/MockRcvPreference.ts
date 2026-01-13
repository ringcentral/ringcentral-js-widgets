import type { RcMock } from '@ringcentral-integration/internal-mock';

import type { StepFunction } from '../../lib/step';

interface MockRcvPreferenceProps {
  handle?: Parameters<RcMock['getPreferences']>[0];
}

export const MockRcvPreference: StepFunction<MockRcvPreferenceProps> = async (
  { handle },
  { rcMock },
) => {
  rcMock.defaultInitMocks.delete(rcMock.getPreferences);
  rcMock.defaultInitMocks.add(() => {
    rcMock.getPreferences(handle);
  });
};
