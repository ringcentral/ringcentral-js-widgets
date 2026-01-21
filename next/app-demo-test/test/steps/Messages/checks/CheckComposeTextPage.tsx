import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckComposeTextPage: StepFunction = async () => {
  expect(screen.getByTestId('messageInput')).not.toBeNull();
};
