import type dialingPlanBody from '@ringcentral-integration/mock/src/platform/data/dialingPlan.json';

import type { StepFunction } from '../../lib/step';

interface MockDialingPlanProps {
  handler?: (
    records: typeof dialingPlanBody.records,
  ) => typeof dialingPlanBody.records;
  repeat?: number;
}

export const MockDialingPlan: StepFunction<MockDialingPlanProps> = async (
  { handler, repeat },
  { rcMock },
) => {
  const mock = () => {
    rcMock.getDialingPlan((mockData) => {
      return {
        ...mockData,
        records: handler?.(mockData.records) ?? mockData.records,
      };
    }, repeat);
  };

  if (rcMock.initialized) {
    mock();
  } else {
    rcMock.replaceDefaultInitMock(rcMock.getDialingPlan, mock);
  }
};
