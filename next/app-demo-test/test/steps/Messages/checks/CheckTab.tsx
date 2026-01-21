import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

const CheckTab: StepFunction<{
  tabName: string;
}> = async ({ tabName }) => {
  const tab = screen.getByTestId(tabName);
  expect(tab).toBeInTheDocument();
};

export { CheckTab };
