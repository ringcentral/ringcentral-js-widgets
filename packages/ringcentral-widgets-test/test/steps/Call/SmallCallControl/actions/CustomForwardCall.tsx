import { waitUntilTo } from '@ringcentral-integration/commons/utils';
import { fireEvent, screen } from '@testing-library/react';

import type { StepFunction } from '../../../../lib/step';

import { CallButtonBehavior } from './CallButtonBehavior';

export const CustomForwardCall: StepFunction<{
  customSelector?: string;
}> = async ({ customSelector = 'custom' }, context) => {
  await CallButtonBehavior({ callButtonBehaviorType: 'forward' }, context);
  const customEle = screen.getByTestId(customSelector);
  fireEvent.click(customEle);
  await waitUntilTo(() => {
    expect(screen.getByTestId('forwardPage')).toBeInTheDocument();
  });
};

export const TypeCustomForwardNumber: StepFunction<{
  phoneNumber: string;
}> = async ({ phoneNumber }) => {
  const inputEle = screen.getByTestId('input');
  fireEvent.change(inputEle, {
    target: { value: phoneNumber },
  });
  await waitUntilTo(() => {
    expect(screen.getByTestId('input')).toHaveValue(phoneNumber);
  });
};

export const ClickForwardButton: StepFunction = async () => {
  // in forward circle btn, will not trigger click when tagName is svg
  const forwardButton = screen.getByTestId('forwardBtn').querySelector('g');
  fireEvent.click(forwardButton!);
};
