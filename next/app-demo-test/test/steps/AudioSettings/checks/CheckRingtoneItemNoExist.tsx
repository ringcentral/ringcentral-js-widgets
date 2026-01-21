import { fireEvent, screen, within } from '@ringcentral-integration/test-utils';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const CheckRingtoneItemNoExist: StepFunction<{
  optionName: string;
}> = async ({ optionName }) => {
  const dropdownList = screen.getByRole('listbox');
  const options = within(dropdownList).getAllByRole('option');

  options.forEach((option) => {
    expect(option.textContent).not.toEqual(optionName);
  });
};
