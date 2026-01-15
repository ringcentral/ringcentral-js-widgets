import { whenStateOrTimerChange } from '@ringcentral-integration/core/test';
import { screen, within } from '@testing-library/react';

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
  await whenStateOrTimerChange(() => {
    const modal = screen.getByRole('dialog');
    expect(modal).toBeVisible();

    expect(modal).toHaveTextContent(title);
    const buttons = within(modal).getAllByRole('button');
    const buttonTexts = buttons.map((button) => button.textContent);

    if (confirmButtonText) {
      try {
        expect(
          buttonTexts.some((text) => text?.includes(confirmButtonText)),
        ).toBeTruthy();
      } catch (error) {
        throw new Error(
          `[confirmButtonText] "${buttonTexts.join(
            ', ',
          )}" does not include "${confirmButtonText}"`,
        );
      }
    }
    if (cancelButtonText) {
      try {
        expect(modal).toHaveTextContent(cancelButtonText);
      } catch (error) {
        throw new Error(
          `[cancelButtonText] "${buttonTexts.join(
            ', ',
          )}" does not include "${cancelButtonText}"`,
        );
      }
    }
    if (childrenContent) {
      expect(modal).toHaveTextContent(childrenContent);
    }
  });
};
