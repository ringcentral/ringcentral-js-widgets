import { waitUntilTo } from '@ringcentral-integration/utils';
import { fireEvent, screen, within } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const NavigateToContactDetails: StepFunction<{
  userName: string;
}> = async ({ userName }) => {
  await waitUntilTo(() => {
    expect(screen.getByTitle(userName)).toBeInTheDocument();
  });
  const contactItem = screen.getByTitle(userName);
  fireEvent.click(contactItem);

  let recentActivityHeader: HTMLElement | undefined;
  const recentActivityPanel = screen.queryByTestId('recentActivityPanel');
  if (recentActivityPanel) {
    recentActivityHeader =
      within(recentActivityPanel).getByTestId('headerTitle');
  }

  const header = screen
    .queryAllByTestId('headerTitle')
    .filter((node) => node !== recentActivityHeader);

  expect(header[0]).toBeInTheDocument();
  expect(header[0]).toHaveTextContent('Contact Details');
};
