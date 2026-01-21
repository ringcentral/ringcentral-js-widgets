import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const CloseCallLogPage: StepFunction = async (_, context) => {
  const backButton = screen.getByTestId('backButton');
  fireEvent.click(backButton);
};
