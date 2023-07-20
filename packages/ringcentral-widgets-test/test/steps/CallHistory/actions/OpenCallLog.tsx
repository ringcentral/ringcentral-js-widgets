import { fireEvent, getByTestId, screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const OpenCallLog: StepFunction = async () => {
  const callItem = screen.queryAllByTestId('calls_item_wrapper')[0];
  const logButton = getByTestId(callItem, 'log');
  fireEvent.click(logButton);
};
