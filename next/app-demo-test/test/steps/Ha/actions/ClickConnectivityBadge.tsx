import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
