import { whenStateOrTimerChange } from '@ringcentral-integration/core/test';
import { screen } from '@testing-library/react';

import type { StepFunction } from '../../lib/step';

export const CheckModalWithDataSign: StepFunction<{
  title: string;
  childrenContent?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}> = async ({
  title,
  childrenContent,
  confirmButtonText,
  cancelButtonText,
}) => {
  await whenStateOrTimerChange(() => {
    const modal = screen.getByRole('dialog');
    expect(modal).toBeVisible();

    expect(modal.querySelector('[data-sign="DialogTitle"]')).toHaveTextContent(
      title,
    );

    if (confirmButtonText) {
      expect(
        modal.querySelector('[data-sign="DialogOKButton"]'),
      ).toHaveTextContent(confirmButtonText);
    }
    if (cancelButtonText) {
      expect(
        modal.querySelector('[data-sign="DialogCancelButton"]'),
      ).toHaveTextContent(cancelButtonText);
    }
    if (childrenContent) {
      expect(
        modal.querySelector('[data-sign="DialogContent"]'),
      ).toHaveTextContent(childrenContent);
    }
  });
};
