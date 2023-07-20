import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckVoicemailDeleteConfirmPopup: StepFunction = async () => {
  const deleteModal = screen.queryByTestId('deleteModal');
  expect(deleteModal).toBeInTheDocument();

  const cancelButton = deleteModal!.querySelector('[data-sign=cancel]');
  expect(cancelButton).toBeInTheDocument();

  const confirmButton = deleteModal!.querySelector('[data-sign=confirm]');
  expect(confirmButton).toBeInTheDocument();

  const text = screen.getByText(
    'Are you sure you want to delete this voicemail?',
  );
  expect(text).toBeInTheDocument();
};

export const CheckFaxDeleteConfirmPopup: StepFunction = async () => {
  const deleteModal = screen.queryByTestId('deleteModal');
  expect(deleteModal).toBeInTheDocument();

  const cancelButton = deleteModal!.querySelector('[data-sign=cancel]');
  expect(cancelButton).toBeInTheDocument();

  const confirmButton = deleteModal!.querySelector('[data-sign=confirm]');
  expect(confirmButton).toBeInTheDocument();

  const text = screen.getByText('Are you sure you want to delete this fax?');
  expect(text).toBeInTheDocument();
};
