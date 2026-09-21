import {
  StepFunction,
  screen,
  waitFor,
  within,
} from '@ringcentral-integration/test-utils';

interface CheckUploadFileProps {
  expectedFiles: File[];
}

export const CheckAttachment: StepFunction<CheckUploadFileProps> = async ({
  expectedFiles,
}) => {
  if (!expectedFiles.length) {
    await waitFor(() => {
      expect(screen.queryByTestId('file-info')).not.toBeInTheDocument();
    });
    return;
  }
  await waitFor(() => {
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
