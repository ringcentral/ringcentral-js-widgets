import { screen, StepFunction } from '@ringcentral-integration/test-utils';

interface CheckDropdownProps {
  appName: string;
  dataSign?: string;
}

export const CheckDropdown: StepFunction<CheckDropdownProps> = ({
  appName,
  dataSign,
}) => {
  if (dataSign) {
    expect(screen.getByTestId(dataSign)).toHaveTextContent(appName);
    return;
  }
  expect(screen.getByText(appName)).toBeInTheDocument();
};
