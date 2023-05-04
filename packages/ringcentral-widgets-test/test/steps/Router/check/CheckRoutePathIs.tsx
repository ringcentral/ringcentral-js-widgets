import { waitFor } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

export const CheckRoutePathIs: StepFunction<{ path: string }> = async (
  { path },
  { phone },
) => {
  await waitFor(() => expect(phone.routerInteraction.currentPath).toBe(path));
};
