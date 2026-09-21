import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckProvisionedCallerId: StepFunction<{
  noProvisioned?: string;
  provisioned: string;
}> = async ({ noProvisioned = '', provisioned = '' }, context) => {
  await whenStateOrTimerChange(() => {
    expect(screen.queryAllByText(provisioned)[0]).toBeInTheDocument();
    noProvisioned && expect(screen.queryByText(noProvisioned)).toBeNull();
  });
};
