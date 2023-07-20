import { fireEvent, screen } from '@testing-library/react';
import type { StepFunction } from '../../../lib/step';
import type { DropdownDataSign } from '../interface';

export const CheckMenuItemExist: StepFunction<{
  dataSign: DropdownDataSign;
  options: string[];
}> = async ({ dataSign, options }) => {
  const inputNode = screen
    .getByTestId(dataSign)
    .querySelector('[data-sign="selectRoot"]');

  expect(inputNode).not.toBeNull();
  if (!inputNode) return;

  fireEvent.click(inputNode);

  const dropdownItems = screen.getByTestId(dataSign).querySelectorAll('li');

  const dropdownContent = Array.from(dropdownItems).map(
    (item) => item.textContent,
  );
  options.forEach((optionText) => {
    expect(dropdownContent).toContain(optionText);
  });
};
