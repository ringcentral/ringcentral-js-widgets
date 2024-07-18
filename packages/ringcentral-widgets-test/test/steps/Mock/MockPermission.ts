import type { FeatureInfo } from '@ringcentral-integration/mock';

import type { StepFunction } from '../../lib/step';

interface MockPermissionProps {
  handler?: (permissions: FeatureInfo[]) => FeatureInfo[] | undefined;
  repeat?: number;
  isDefaultInit?: boolean;
}

export const MockPermission: StepFunction<MockPermissionProps> = async (
  { handler, repeat, isDefaultInit = false },
  { rcMock },
) => {
  if (isDefaultInit) {
    rcMock.defaultInitMocks.delete(rcMock.getFeatures);
    rcMock.defaultInitMocks.add(() =>
      rcMock.getFeatures((mockData) => {
        return {
          ...mockData,
          records: handler?.(mockData.records) ?? mockData.records,
        };
      }, repeat),
    );
  }

  rcMock.getFeatures((mockData) => {
    return {
      ...mockData,
      records: handler?.(mockData.records) ?? mockData.records,
    };
  }, repeat);
};
