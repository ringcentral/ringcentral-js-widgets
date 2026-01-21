import {
  fireEvent,
  screen,
  StepFunction,
  within,
} from '@ringcentral-integration/test-utils';

export const SelectRingOutOption: StepFunction<{ settingName: string }> = ({
  settingName,
}) => {
  const menuItem = within(screen.getByRole('menu')).getByText(settingName);
  fireEvent.click(menuItem);
};
