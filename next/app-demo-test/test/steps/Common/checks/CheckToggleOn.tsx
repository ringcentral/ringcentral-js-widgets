import { screen } from '@ringcentral-integration/test-utils';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const CheckToggleOn: StepFunction<{
  dataSign: string;
}> = async ({ dataSign }) => {
  const checkbox = screen
    .getByTestId(dataSign)
    .getElementsByTagName('input')[0];

  expect(checkbox.checked).toBe(true);
};
