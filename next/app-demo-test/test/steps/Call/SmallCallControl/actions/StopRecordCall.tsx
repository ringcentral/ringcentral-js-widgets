import { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const StopRecordCall: StepFunction = () => {
  const stopRecord = screen.queryByTestId('stopRecord');
  fireEvent.click(stopRecord!);
};
