import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const ClickMessageItem: StepFunction = async () => {
  const smsItem = screen.getAllByTestId('unread')[0];
  fireEvent.click(smsItem);
};
