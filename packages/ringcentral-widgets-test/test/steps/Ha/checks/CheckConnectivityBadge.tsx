import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

interface CheckConnectivityBadgeProps {
  exists?: boolean;
  textContent?: string;
}

/**
 * Check connectivity badge display or not and what is the text content in the badge
 * @param exists boolean value for indicating to check exists of not
 * @param textContent string value for checking the badge text when the badge exists
 */
export const CheckConnectivityBadge: StepFunction<
  CheckConnectivityBadgeProps
> = async ({ exists = true, textContent }) => {
  const connectivityBadge = await screen.queryByTestId('ConnectivityBadge');
  if (exists) {
    expect(connectivityBadge).toBeInTheDocument();
    if (connectivityBadge && textContent) {
      expect(connectivityBadge.textContent).toBe(textContent);
    }
  } else {
    expect(connectivityBadge).not.toBeInTheDocument();
  }
};
