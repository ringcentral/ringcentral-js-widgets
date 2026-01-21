import { fireEvent, screen } from '@ringcentral-integration/test-utils';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface UploadRingtoneFile {
  filename?: string;
  content?: string;
}

export const UploadRingtoneFile: StepFunction<UploadRingtoneFile> = async ({
  filename = 'custom.mp3',
  content = 'hello',
}) => {
  const fileInput = screen.getByTestId('uploadRingtoneInput');
  const file = new File([content], filename, {
    type: 'audio/mp3',
  });
  fireEvent.change(fileInput, { target: { files: [file] } });
};
