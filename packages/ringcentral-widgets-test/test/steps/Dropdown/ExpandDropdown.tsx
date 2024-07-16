import {
  fireEvent,
  screen,
  StepFunction,
} from '@ringcentral-integration/test-utils';

interface ExpandDropdownProps {
  testId: string;
}

export const ExpandDropdown: StepFunction<ExpandDropdownProps> = ({
  testId,
}) => {
  const callingSettingElement = screen.getByTestId(testId);
  const selectRoot = callingSettingElement.querySelector(
    '[data-sign="selectRoot"]',
  );
  fireEvent.click(selectRoot!);
};
