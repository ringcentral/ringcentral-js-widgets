import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckCallType: StepFunction = ({ expectedValues }: any) => {
  const callItems = screen.getAllByTestId('calls_item_wrapper');
  callItems.forEach((item, index) => {
    const expectedValue = expectedValues[index];
    const callType = item.querySelector(`[title="${expectedValue.callType}"]`);
    expect(callType).toBeInTheDocument();
  });
};
