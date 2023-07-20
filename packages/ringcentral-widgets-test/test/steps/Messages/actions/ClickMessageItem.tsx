import { fireEvent, screen } from '@testing-library/react';
import type { StepFunction } from '../../../lib/step';

export const ClickMessageItem: StepFunction = async () => {
  const smsItem = screen.getAllByTestId('unread')[0];
  fireEvent.click(smsItem);
};
