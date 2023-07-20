import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import type { StepFunction } from '../../../lib/step';
import type { DropdownDataSign } from '../interface';

export const CheckDropDownList: StepFunction<{
  options?: Array<{
    value: string;
    isDisabled?: boolean;
    isSelected?: boolean;
  }>;
  dataSign: DropdownDataSign;
}> = async ({ options = [], dataSign }) => {
  const inputNode = screen
    .getByTestId(dataSign)
    .querySelector('[role = button]');

  expect(inputNode).not.toBeNull();

  if (!inputNode) return;

  fireEvent.mouseDown(inputNode);

  options.forEach(({ value, isDisabled, isSelected }) => {
    const option = screen.getByRole('option', {
      name: value,
      selected: isSelected,
    });
    expect(option).toHaveTextContent(value);

    if (isDisabled === undefined) {
      // won't check disable status
    } else if (isDisabled) {
      expect(option).toHaveClass('Mui-disabled');
    } else {
      expect(option).not.toHaveClass('Mui-disabled');
    }
  });
};
