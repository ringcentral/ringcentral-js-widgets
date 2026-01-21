import { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckModalVisible: StepFunction<{
  isExist?: boolean;
}> = async ({ isExist = true }) => {
  const modal = screen.getByRole('dialog');

  if (isExist) {
    expect(modal).toBeVisible();
  } else {
    expect(modal).not.toBeVisible();
  }
};

export const CheckModalExist: StepFunction<{
  isExist?: boolean;
}> = async ({ isExist = true }) => {
  const modal = screen.queryByRole('dialog');

  if (isExist) {
    expect(modal).toBeInTheDocument();
  } else {
    expect(modal).not.toBeInTheDocument();
  }
};
