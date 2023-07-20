import { fireEvent, screen } from '@testing-library/react';
import type { StepFunction } from '../../../../lib/step';

export const RecordCall: StepFunction = () => {
  const record = screen.queryByTestId('record');
  fireEvent.click(record);
};
