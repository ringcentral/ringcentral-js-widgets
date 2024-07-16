import { screen, waitFor } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckConversationPage: StepFunction<{
  message?: string;
  currentName: string;
}> = async ({ message = 'test message', currentName }) => {
  await waitFor(
    () => {
      expect(screen.getByTestId('conversationPanel')).toBeInTheDocument();
      expect(screen.getByTestId('currentName')).toHaveTextContent(currentName);
      expect(screen.getByText(message)).toBeInTheDocument();
    },
    { timeout: 10e3 },
  );
};
