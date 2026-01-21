import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { hoverTooltipHost, leaveTooltipHost } from '../../Tooltip';

/**
 * Check element tooltip
 * @param element data sign of the target element
 * @param tooltip tooltip text
 * @param browserTooltip whether the tooltip is a browser builtin tooltip
 */
export const CheckTooltip: StepFunction<{
  dataSign?: string;
  tooltip: string;
  browserTooltip?: boolean;
}> = async ({ dataSign, tooltip, browserTooltip = false }) => {
  if (!browserTooltip) {
    if (!dataSign) {
      throw new Error('dataSign is required');
    }

    const host = screen.getByTestId(dataSign);
    hoverTooltipHost(host);

    const haveTooltip = screen.getAllByRole('tooltip').some((item) => {
      return item.textContent === tooltip;
    });
    expect(haveTooltip).toBeTruthy();

    leaveTooltipHost(host);
    userEvent.unhover(host);
  } else {
    const elements = screen.getAllByTitle(tooltip);
    expect(elements[0]).toBeInTheDocument();
  }
};
