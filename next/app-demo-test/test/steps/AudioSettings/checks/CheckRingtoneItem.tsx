import { fireEvent, screen, within } from '@ringcentral-integration/test-utils';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const CheckRingtoneItem: StepFunction<{
  options?: Array<{
    value: string;
    index: number;
    isDisabled?: boolean;
    isSelected?: boolean;
    roleOption?: 'menuitem' | 'option';
    canDelete?: boolean;
    canPlay?: boolean;
  }>;
}> = async ({ options = [] }) => {
  // open the dropdown
  const inputNode = screen
    .getByTestId('ringtoneSelection')
    .querySelector('[role = button]');
  expect(inputNode).not.toBeNull();
  if (!inputNode) return;
  fireEvent.mouseDown(inputNode);

  const dropdownList = screen.getByRole('listbox');
  // check options
  options.forEach(
    async ({
      index,
      value,
      roleOption = 'option',
      isDisabled,
      canDelete = false,
      canPlay = true,
    }) => {
      const option = within(dropdownList).getAllByRole(roleOption)[index];
      expect(option).toHaveTextContent(value);

      // check play button
      if (canDelete) {
        const element = within(option).queryByTitle('Delete');
        expect(element).toBeInTheDocument();
      }

      // check play button
      if (canPlay) {
        const element = within(option).getByTitle('Play');
        expect(element).toBeInTheDocument();
      }

      if (isDisabled === undefined) {
        // won't check disable status
      } else if (isDisabled) {
        expect(option).toHaveClass('Mui-disabled');
      } else {
        expect(option).not.toHaveClass('Mui-disabled');
      }
    },
  );
};
