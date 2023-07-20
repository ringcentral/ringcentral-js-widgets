import { fireEvent, getByText, screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';
import type { DropdownDataSign } from '../interface';

export const SelectMenuItem: StepFunction<{
  dropdownSelector: DropdownDataSign;
  targetOption: string;
}> = async ({ dropdownSelector, targetOption }) => {
  const dropdownSelect = screen.getByTestId(dropdownSelector);
  const menuList = dropdownSelect.querySelector('ul');
  // if dropdownSelect already open, we don't need to click it again
  if (!menuList) {
    const inputNode = screen
      .getByTestId(dropdownSelector)
      .querySelector('[data-sign="selectRoot"]');

    expect(inputNode).not.toBeNull();
    if (!inputNode) return;

    fireEvent.click(inputNode);
  }

  const dropdownItem = screen.getByText(targetOption);
  dropdownItem.click();
};
