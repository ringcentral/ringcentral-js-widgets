import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const ClickCloseChipButton: StepFunction = async () => {
  const deleteButton = screen
    .getByTestId('recipientsChip')
    .querySelector('button');
  fireEvent.click(deleteButton);
};
