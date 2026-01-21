import { screen, StepFunction } from '@ringcentral-integration/test-utils';

interface CheckDropdownProps {
  appName: string;
}

export const CheckDropdown: StepFunction<CheckDropdownProps> = ({
  appName,
}) => {
  expect(screen.getByText(appName)).toBeInTheDocument();
};
