import type dialingPlanBody from '@ringcentral-integration/mock/src/platform/data/dialingPlan.json';
import type { StepFunction } from '../lib/step';

interface MockDialingPlanProps {
  handler?: (permissions: typeof dialingPlanBody) => typeof dialingPlanBody;
  repeat?: number;
}

export const MockDialingPlan: StepFunction<MockDialingPlanProps> = async (
  { handler, repeat },
  { rcMock },
) => {
  rcMock.defaultInitMocks.delete(rcMock.getDialingPlan);
  rcMock.defaultInitMocks.add(() => {
    rcMock.getDialingPlan((mockData) => {
      return {
        ...mockData,
        records: handler?.(mockData.records) ?? mockData.records,
      };
    }, repeat);
  });
};
