import { fireEvent, screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const NavigateToContactDetails: StepFunction<{
  userName: string;
}> = async ({ userName }) => {
  const contactItem = await screen.findByTitle(userName, {}, { timeout: 2000 });
  fireEvent.click(contactItem);

  const header = await screen.findByTestId('headerTitle');
  expect(header).toHaveTextContent('Contact Details');
};
