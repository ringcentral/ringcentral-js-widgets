import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckEnvironmentOptions: StepFunction<{
  server?: string;
}> = ({ server }) => {
  const serverElem = screen.getByTestId('envServerUrl');
  expect(serverElem).toBeTruthy();
  expect(serverElem).toHaveValue(server);
};
