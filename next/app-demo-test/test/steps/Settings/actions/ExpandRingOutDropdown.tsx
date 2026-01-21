import {
  fireEvent,
  screen,
  StepFunction,
  within,
} from '@ringcentral-integration/test-utils';

export const ExpandRingOutDropdown: StepFunction = async () => {
  const callingSettingElement = screen.getByTestId('dropdownSelect');
  const selectRoot = within(callingSettingElement).getByTestId('selectRoot');
  fireEvent.click(selectRoot);
};
