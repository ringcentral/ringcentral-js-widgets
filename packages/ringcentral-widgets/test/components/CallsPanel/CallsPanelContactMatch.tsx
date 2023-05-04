import { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface UTContactMatchProps {
  userName?: string;
}

export const UTContactMatch: StepFunction<UTContactMatchProps> = (
  { userName },
  _,
) => {
  const displayUserName = screen.queryByTestId('currentName');
  if (userName) {
    expect(displayUserName).toHaveTextContent(userName);
  }

  const clickToDial = screen.queryByTestId('Call');
  expect(clickToDial).toBeInTheDocument();

  const clickToSms = screen.queryByTestId('clickToSms');
  expect(clickToSms).toBeInTheDocument();
};
