import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

const CheckDialPadPage: StepFunction = async () => {
  expect(screen.getByTestId('dialPad')).not.toBeNull();
};

export { CheckDialPadPage };
