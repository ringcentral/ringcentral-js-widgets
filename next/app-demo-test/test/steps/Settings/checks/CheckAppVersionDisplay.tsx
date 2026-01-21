import { screen, StepFunction } from '@ringcentral-integration/test-utils';

export const CheckAppVersionDisplay: StepFunction = async () => {
  expect(screen.queryByTestId('version')).not.toBeNull();
};
