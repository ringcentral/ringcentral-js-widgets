import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckFaxActionMenu: StepFunction = async () => {
  const viewButton = screen.queryByTestId('View');
  expect(viewButton).toBeInTheDocument();

  const downloadButton = screen.queryByTestId('download');
  expect(downloadButton).toBeInTheDocument();

  const deleteButton = screen.queryByTestId('Delete');
  expect(deleteButton).toBeInTheDocument();

  const markButton = screen.queryByTestId('mark');
  expect(markButton).toBeInTheDocument();
};
