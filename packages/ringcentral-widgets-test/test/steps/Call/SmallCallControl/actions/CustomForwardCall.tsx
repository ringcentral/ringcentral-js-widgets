import { waitUntilTo } from '@ringcentral-integration/commons/utils';
import { fireEvent, screen } from '@testing-library/react';
import { StepFunction } from '../../../../lib/step';
import { CallButtonBehavior } from './CallButtonBehavior';

export const CustomForwardCall: StepFunction = async (props, context) => {
  await CallButtonBehavior({ callButtonBehaviorType: 'forward' }, context);
  const customEle = screen.getByTestId('custom');
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
