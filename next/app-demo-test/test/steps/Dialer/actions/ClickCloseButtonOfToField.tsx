import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const ClickCloseButtonOfToField: StepFunction = async () => {
  const deleteButton = screen.getByTestId('deleteButton');
  userEvent.click(deleteButton);
};
