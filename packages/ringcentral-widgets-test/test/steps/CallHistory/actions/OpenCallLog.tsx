import { whenStateChange } from '@ringcentral-integration/core/test';
import { fireEvent, getByTestId, screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const OpenCallLog: StepFunction = async () => {
  // make sure the log button is enabled
  const logButton = await whenStateChange(() => {
    const callItem = screen.queryAllByTestId('calls_item_wrapper')[0];
    const logButton = getByTestId(callItem, 'log');
    expect(logButton).toHaveAttribute('aria-disabled', 'false');

    return logButton;
  });
  fireEvent.click(logButton);
};
