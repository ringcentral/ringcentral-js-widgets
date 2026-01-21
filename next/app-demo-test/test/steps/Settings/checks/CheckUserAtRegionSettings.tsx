import { screen, StepFunction } from '@ringcentral-integration/test-utils';

export const CheckUserAtRegionSettings: StepFunction = () => {
  expect(screen.getByText('Region')).toBeInTheDocument();
};
