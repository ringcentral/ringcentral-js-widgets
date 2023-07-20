import { waitUntilTo } from '@ringcentral-integration/utils';
import { fireEvent, screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const NavigateToContactDetails: StepFunction<{
  userName: string;
}> = async ({ userName }) => {
  await waitUntilTo(() => {
    expect(screen.getByTitle(userName)).toBeInTheDocument();
  });
  const contactItem = screen.getByTitle(userName);
  fireEvent.click(contactItem);

  const header = await screen.findByTestId('headerTitle');
  expect(header).toHaveTextContent('Contact Details');
};
