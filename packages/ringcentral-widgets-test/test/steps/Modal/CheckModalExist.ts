import { whenStateOrTimerChange } from '@ringcentral-integration/core/test';
import { screen } from '@testing-library/react';

import type { StepFunction } from '../../lib/step';

export const CheckModalExist: StepFunction<{
  isExist?: boolean;
}> = async ({ isExist = true }) => {
  await whenStateOrTimerChange(() => {
    const modal = screen.getByRole('dialog');

    if (isExist) {
      expect(modal).toBeVisible();
    } else {
      expect(modal).not.toBeVisible();
    }
  });
};
