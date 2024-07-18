import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { StepFunction } from '../../../lib/step';

export const ClickConnectivityBadge: StepFunction<{
  textContent?: string;
}> = async ({ textContent }) => {
  const connectivityBadge = await screen.getByTestId('ConnectivityBadge');
  expect(connectivityBadge).toBeInTheDocument();
  if (connectivityBadge && textContent) {
    expect(connectivityBadge.textContent).toBe(textContent);
  }
  userEvent.click(connectivityBadge);
};
