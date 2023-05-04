import { fireEvent, screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

export const ClickMessageItem: StepFunction = async () => {
  const smsItem = screen.getAllByTestId('unread')[0];
  fireEvent.click(smsItem);
};
