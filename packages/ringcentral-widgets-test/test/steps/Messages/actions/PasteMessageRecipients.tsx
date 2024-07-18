import { fireEvent, screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

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
};
