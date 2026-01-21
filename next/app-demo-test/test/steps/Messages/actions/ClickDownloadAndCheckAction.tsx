import { screen, userEvent, within } from '@ringcentral-integration/test-utils';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  downloadFileWithIframe,
  waitUntilTo,
} from '@ringcentral-integration/utils';

export const ClickDownloadAndCheckAction: StepFunction<{
  downloadLink: string;
  fileName: string;
  type: 'image' | 'file';
}> = async ({ downloadLink, fileName, type }) => {
  if (type === 'file') {
    const container = screen.getByTestId('OutboundAttachment');
    userEvent.click(within(container).getByTestId('download'));
    await waitUntilTo(() => {
      expect(downloadFileWithIframe).toHaveBeenCalledWith(
        downloadLink,
        fileName,
      );
    });
    return;
  }

  if (type === 'image') {
    const imgElement = screen.getByRole('img', { name: fileName });
    expect(imgElement).toBeInTheDocument();
    userEvent.hover(imgElement);
    const toolbarElement = imgElement.nextElementSibling!;
    expect(toolbarElement).toBeVisible();

    const downloadButton = toolbarElement.querySelector(
      '[data-sign="download"]',
    );
    userEvent.click(downloadButton!);
    await waitUntilTo(() => {
      expect(downloadFileWithIframe).toHaveBeenCalledWith(
        downloadLink,
        fileName,
      );
    });
    return;
  }
};
