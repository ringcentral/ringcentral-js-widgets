import {
  type StepFunction,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

interface PasteMessageRecipientsProps {
  pasteData: string;
}

export const PasteMessageRecipients: StepFunction<
  PasteMessageRecipientsProps
> = async ({ pasteData }) => {
  const recipientsInput =
    screen.getByTestId<HTMLInputElement>('recipientsInput');
  fireEvent.paste(recipientsInput, {
    clipboardData: { getData: () => pasteData },
  });
  await waitForRenderReady();
};
