import { screen } from '@testing-library/react';

import type { StepFunction } from '../../lib/step';

export const CheckModalValue: StepFunction<{
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
  const modal = screen.getByRole('dialog');
  expect(modal).toBeVisible();

  expect(
    modal.querySelector('[data-test-automation-id="DialogTitle"]'),
  ).toHaveTextContent(title);

  if (confirmButtonText) {
    expect(
      modal.querySelector('[data-test-automation-id="DialogOKButton"]'),
    ).toHaveTextContent(confirmButtonText);
  }
  if (cancelButtonText) {
    expect(
      modal.querySelector('[data-test-automation-id="DialogCancelButton"]'),
    ).toHaveTextContent(cancelButtonText);
  }
  if (childrenContent) {
    expect(
      modal.querySelector('[data-test-automation-id="DialogContent"]'),
    ).toHaveTextContent(childrenContent);
  }
};
