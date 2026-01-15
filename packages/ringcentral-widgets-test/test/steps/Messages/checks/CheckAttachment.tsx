import { whenStateChange } from '@ringcentral-integration/core/test';
import {
  StepFunction,
  within,
  screen,
} from '@ringcentral-integration/test-utils';

interface CheckUploadFileProps {
  expectedFiles: File[];
}

export const CheckAttachment: StepFunction<CheckUploadFileProps> = async ({
  expectedFiles,
}) => {
  if (!expectedFiles.length) {
    expect(screen.queryByTestId('file-info')).not.toBeInTheDocument();
    return;
  }
  await whenStateChange(() => {
    const allAttachmentFiles = screen.getAllByTestId('file-info');
    expectedFiles.forEach((file, idx) => {
      const fileInfoElement = allAttachmentFiles[idx];
      const withinInfoItem = within(fileInfoElement);

      // check name
      expect(fileInfoElement).toHaveTextContent(file.name);

      // remove button
      expect(
        withinInfoItem.getByTestId('removeFileIconButton'),
      ).toBeInTheDocument();
    });
  });
};
