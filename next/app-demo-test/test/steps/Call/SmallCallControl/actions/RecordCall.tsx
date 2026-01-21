import { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const RecordCall: StepFunction = () => {
  const record = screen.queryByTestId('record');
  fireEvent.click(record!);
};
