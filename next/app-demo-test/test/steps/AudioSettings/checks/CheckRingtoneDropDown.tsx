import { fireEvent, screen, within } from '@ringcentral-integration/test-utils';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const CheckRingtoneDropDown: StepFunction<{
  summary?: string;
  options?: Array<{
    value: string;
    isDisabled?: boolean;
    isSelected?: boolean;
    roleOption?: 'menuitem' | 'option';
    canDelete?: boolean;
    canPlay?: boolean;
  }>;
  dataSign: string;
}> = async ({ summary = 'Ringtones', options = [], dataSign }) => {
  const labelEl = screen.queryByTestId('ringtoneSelectionLabel');
  expect(labelEl?.textContent).toBe(summary);
  const inputNode = screen
    .getByTestId(dataSign)
    .querySelector('[role = button]');

  expect(inputNode).not.toBeNull();

  if (!inputNode) return;

  fireEvent.mouseDown(inputNode);

  options.forEach(
    async ({
      value,
      roleOption = 'option',
      isDisabled,
      isSelected,
      canDelete = false,
      canPlay = true,
    }) => {
      const option = screen.getByRole(roleOption, {
        name: `${value}${canDelete ? ' Delete' : ''}${canPlay ? ' Play' : ''}`,
        selected: isSelected,
      });
      expect(option.textContent).toBe(value);

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
