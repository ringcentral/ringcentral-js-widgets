import { Auth } from '@ringcentral-integration/micro-auth/src/app/services';
import { MessageStore } from '@ringcentral-integration/micro-message/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckMessageDownload: StepFunction = async (_, { app }) => {
  const messageStore = app.container.got(MessageStore)!;
  const auth = app.container.got(Auth)!;

  const conversation = messageStore.data!.conversationList[0];
  const uri =
    messageStore.data!.conversationStore[conversation.id][0].attachments![0]
      .uri;
  const accessToken = auth.accessToken;
  const downloadButton = screen.getByTestId('download');
  const downloadLink = downloadButton.querySelector('a[title="Download"]');
  expect(downloadLink).toBeInTheDocument();
  expect(downloadLink).toHaveAttribute(
    'href',
    `${uri}?access_token=${accessToken}&contentDisposition=Attachment`,
  );
};
