import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckFaxActionButtonsProps {
  direction?: 'Inbound' | 'Outbound';
  readStatus?: 'Read' | 'Unread' | null;
  userName?: string | null;
}

export const CheckFaxActionButtons: StepFunction<
  CheckFaxActionButtonsProps
> = async ({
  readStatus = 'Unread',
  direction = 'Outbound',
  userName = '',
}) => {
  const viewButton = screen.getByTitle('View');
  expect(viewButton).toBeInTheDocument();

  const downloadButton = screen.getByTitle('Download');
  expect(downloadButton).toBeInTheDocument();

  const deleteButton = screen.getByTitle('Delete');
  expect(deleteButton).toBeInTheDocument();

  if (userName !== null) {
    const detailsButton = screen.getByTitle('View Details');
    expect(detailsButton).toBeInTheDocument();
  }

  if (direction === 'Inbound' && readStatus) {
    const markTitle =
      readStatus === 'Unread' ? 'Mark as Read' : 'Mark as Unread';

    const markButton = screen.getAllByTitle(markTitle);
    expect(markButton.length).toBeGreaterThan(0);
  }
};
