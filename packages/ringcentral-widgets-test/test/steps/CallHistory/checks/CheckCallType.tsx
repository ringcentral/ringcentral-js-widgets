import { screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const CheckCallType: StepFunction = ({ expectedValues }: any) => {
  const callItems = screen.getAllByTestId('calls_item_wrapper');
  callItems.forEach((item, index) => {
    const expectedValue = expectedValues[index];
    const callType = item.querySelector(`[title="${expectedValue.callType}"]`);
    expect(callType).toBeInTheDocument();
  });
};
