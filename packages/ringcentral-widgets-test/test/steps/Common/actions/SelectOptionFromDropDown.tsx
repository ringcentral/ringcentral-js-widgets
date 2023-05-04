import { waitForRenderReady } from '@ringcentral-integration/test-utils/lib/test-utils';
import { fireEvent, getByText, screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';
import { DropdownDataSign } from '../interface';

export const SelectOptionFromDropDown: StepFunction<{
  dropdownSelector: DropdownDataSign;
  targetOption: string;
}> = async ({ dropdownSelector, targetOption }) => {
  const inputNode = screen
    .getByTestId(dropdownSelector)
    .querySelector('[role = button]');
  expect(inputNode).not.toBeNull();
  if (!inputNode) return;

  fireEvent.mouseDown(inputNode);
  const optionNode = getByText(screen.getByRole('listbox'), targetOption);
  optionNode.click();
  await waitForRenderReady();
};
