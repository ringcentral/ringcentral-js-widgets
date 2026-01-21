import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const ClickContactSourceFilterButton: StepFunction = async () => {
  const button = screen.getByTestId('contactSourceFilterButton');
  fireEvent.click(button);
};
