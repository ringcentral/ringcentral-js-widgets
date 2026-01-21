import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, getByTestId, screen } from '@testing-library/react';

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
