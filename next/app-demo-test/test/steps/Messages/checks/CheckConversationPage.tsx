import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckConversationPage: StepFunction<{
  message?: string;
  currentName: string;
}> = async ({ message = 'test message', currentName }) => {
  await whenStateChange(
    () => {
      expect(screen.getByTestId('conversationPanel')).toBeInTheDocument();
      expect(screen.getByTestId('currentName')).toHaveTextContent(currentName);
      expect(screen.getByText(message)).toBeInTheDocument();
    },
    { timeout: 10e3 },
  );
};
