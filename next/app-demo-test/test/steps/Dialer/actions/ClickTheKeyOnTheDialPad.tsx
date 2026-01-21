import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

interface ClickTheKeyOnTheDialPadProps {
  theDialValue: string;
}
export const ClickTheKeyOnTheDialPad: StepFunction<
  ClickTheKeyOnTheDialPadProps
> = async ({ theDialValue }) => {
  const numberArray = theDialValue.split('');
  numberArray.forEach((item) => {
    const dialPadBtn = screen.getByTestId(`dialPadBtn${item}`);
    userEvent.click(dialPadBtn);
  });
};
