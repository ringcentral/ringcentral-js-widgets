import { whenStateChange } from '@ringcentral-integration/next-core/test';
import { type StepFunction } from '@ringcentral-integration/test-utils';
import { screen, within } from '@testing-library/react';

type CheckModalValueProps = {
  title: string;
  childrenContent?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonStatus?: 'loading';
  cancelButtonStatus?: 'disabled';
};

export const CheckSharedModalValue: StepFunction<
  CheckModalValueProps
> = async ({
  title,
  childrenContent,
  confirmButtonText,
  cancelButtonText,
  confirmButtonStatus,
  cancelButtonStatus,
}) => {
  const modal = screen.getByRole('dialog');
  expect(modal).toBeVisible();

  const modalScreen = within(modal);
  expect(modalScreen.queryByRole('heading')).toHaveTextContent(title);

  if (confirmButtonText) {
    expect(
      modalScreen.getByRole('button', {
        name: confirmButtonText,
      }),
    ).toBeInTheDocument();
  }

  if (confirmButtonStatus === 'loading') {
    expect(modalScreen.getByRole('progressbar')).toBeInTheDocument();
  }
  if (cancelButtonText) {
    expect(
      modalScreen.getByRole('button', {
        name: cancelButtonText,
      }),
    ).toBeInTheDocument();
  }

  if (cancelButtonStatus === 'disabled') {
    expect(
      modalScreen.getByRole('button', {
        name: cancelButtonText,
      }),
    ).toBeDisabled();
  }

  if (childrenContent) {
    await whenStateChange(() => {
      expect(modalScreen.queryByText(childrenContent)).toBeInTheDocument();
    });
  }
};
