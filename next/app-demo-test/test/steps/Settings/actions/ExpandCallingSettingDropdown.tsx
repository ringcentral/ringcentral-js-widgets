import {
  StepFunction,
  fireEvent,
  screen,
  within,
} from '@ringcentral-integration/test-utils';

export const ExpandCallingSettingDropdown: StepFunction = () => {
  const callingSettingElement = screen.getByTestId('callingSetting');
  const selectRoot = within(callingSettingElement).getByTestId('selectRoot');
  fireEvent.click(selectRoot);
};
