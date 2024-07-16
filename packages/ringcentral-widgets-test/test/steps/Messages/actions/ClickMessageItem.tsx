import { fireEvent, screen } from '@ringcentral-integration/test-utils';

import type { StepFunction } from '../../../lib/step';

export const ClickMessageItem: StepFunction = async (_, { phone }) => {
  const smsItem = screen.getAllByTestId('unread')[0];
  fireEvent.click(smsItem);
};
