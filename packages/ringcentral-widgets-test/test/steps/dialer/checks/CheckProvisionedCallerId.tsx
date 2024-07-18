import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckProvisionedCallerId: StepFunction<{
  noProvisioned?: string;
  provisioned: string;
}> = async ({ noProvisioned = '', provisioned = '' }, context) => {
  expect(screen.queryAllByText(provisioned)[0]).toBeInTheDocument();
  noProvisioned && expect(screen.queryByText(noProvisioned)).toBeNull();
};
