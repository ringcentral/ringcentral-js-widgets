import { fireEvent, screen } from '@testing-library/react';
import { StepFunction } from '../../../../lib/step';

export const StopRecordCall: StepFunction = () => {
  const stopRecord = screen.queryByTestId('stopRecord');
  fireEvent.click(stopRecord);
};
