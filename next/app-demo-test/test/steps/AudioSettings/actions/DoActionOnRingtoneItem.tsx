import { fireEvent, screen, within } from '@ringcentral-integration/test-utils';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const DoActionOnRingtoneItem: StepFunction<{
  type: 'Delete' | 'Play' | 'Click';
  value: string;
  roleOption?: 'menuitem' | 'option';
  needPreOpen?: boolean;
}> = async ({ type, value, roleOption = 'option', needPreOpen }) => {
  if (needPreOpen) {
    const inputNode = screen
      .getByTestId('ringtoneSelection')
      .querySelector('[role = button]');
    fireEvent.mouseDown(inputNode!);
  }

  const option = screen.getByRole(roleOption, {
    name: new RegExp(value),
  });
  if (['Play', 'Delete'].includes(type)) {
    fireEvent.click(within(option).getByTitle(type));
  } else {
    fireEvent.click(option);
  }
};
