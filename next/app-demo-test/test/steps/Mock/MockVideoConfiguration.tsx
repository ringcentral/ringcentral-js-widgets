import type { RcMock } from '@ringcentral-integration/mock';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockVideoConfigurationProps {
  handle?: Parameters<RcMock['getVideoConfiguration']>[0];
}

export const MockVideoConfiguration: StepFunction<
  MockVideoConfigurationProps
> = async ({ handle }, { rcMock }) => {
  rcMock.replaceDefaultInitMock(rcMock.getVideoConfiguration, () => {
    rcMock.getVideoConfiguration(handle);
  });
};
