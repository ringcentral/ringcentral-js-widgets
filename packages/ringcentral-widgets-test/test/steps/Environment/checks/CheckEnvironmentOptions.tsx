import { screen } from '@testing-library/react';

import type { Context } from '../../../interfaces';
import type { StepFunction } from '../../../lib/step';

export const CheckEnvironmentOptions: StepFunction<{
  server?: string;
}> = ({ server }, context: Context) => {
  const serverElem = screen.getByTestId('envServerUrl');
  expect(serverElem).toBeTruthy();
  expect(serverElem).toHaveValue(server);
};
