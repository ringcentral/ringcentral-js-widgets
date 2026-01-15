import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 *
 * @param param0 element is data sign
 */
export const CheckTooltip: StepFunction<{
  dataSign?: string;
  tooltip: string;
  browserTooltip?: boolean;
}> = async ({ dataSign: element, tooltip, browserTooltip = false }) => {
  if (!browserTooltip) {
    userEvent.hover(screen.getByTestId(element!));
    await waitFor(
      () => {
        expect(screen.getByRole('tooltip').textContent).toBe(tooltip);
      },
      { timeout: 2000 },
    );
    userEvent.unhover(screen.getByTestId(element!));
  } else {
    await waitFor(
      () => {
        expect(screen.getByTitle(tooltip)).not.toBeNull();
      },
      { timeout: 2000 },
    );
  }
};
