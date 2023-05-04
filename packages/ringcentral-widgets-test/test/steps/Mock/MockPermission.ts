import { StepFunction } from '../../lib/step';

interface MockPermissionProps {
  handler?: (permissions: any) => any;
  repeat?: number;
}

export const MockPermission: StepFunction<MockPermissionProps> = async (
  { handler, repeat },
  { rcMock },
) => {
  rcMock.getFeatures((mockData) => {
    return {
      ...mockData,
      records: handler?.(mockData.records) ?? mockData.records,
    };
  }, repeat);
};
