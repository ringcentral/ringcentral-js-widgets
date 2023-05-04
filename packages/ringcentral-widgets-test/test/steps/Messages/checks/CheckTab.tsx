import { screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

const CheckTab: StepFunction<{
  tabName: string;
}> = async ({ tabName }) => {
  const tab = screen.getByTestId(tabName);
  expect(tab).toBeInTheDocument();
};

export { CheckTab };
