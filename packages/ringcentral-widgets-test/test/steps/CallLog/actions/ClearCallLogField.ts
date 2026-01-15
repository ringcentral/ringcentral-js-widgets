import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { StepFunction } from '../../../lib/step';

export const ClearCallLogField: StepFunction<{
  dataSign: string;
  type: 'input' | 'textarea';
}> = ({ dataSign, type }) => {
  const targetField = screen.getByTestId(dataSign).querySelector(type)!;
  userEvent.clear(targetField);
};
