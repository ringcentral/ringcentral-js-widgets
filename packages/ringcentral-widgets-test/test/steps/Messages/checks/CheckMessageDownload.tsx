import { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckMessageDownload: StepFunction = async (_, { phone }) => {
  const conversation = phone.messageStore.data.conversationList[0];
  const uri =
    phone.messageStore.data.conversationStore[conversation.id][0].attachments[0]
      .uri;
  const accessToken = phone.auth.accessToken;
  const downloadButton = screen.getByTestId('download');
  const downloadLink = downloadButton.querySelector('a[title="Download"]');
  expect(downloadLink).toBeInTheDocument();
  expect(downloadLink).toHaveAttribute(
    'href',
    `${uri}?access_token=${accessToken}&contentDisposition=Attachment`,
  );
};
