import { StepFunction } from '@ringcentral-integration/test-utils';
import { act, screen } from '@testing-library/react';

export const CheckConversationTabTooltip: StepFunction<{ title: string }> = ({
  title,
}) => {
  const conversationsPanel = screen.queryByTestId('ConversationsPanel');
  const tabTooltip = conversationsPanel!.querySelector(
    `nav [title="${title}"]`,
  );
  expect(tabTooltip).toBeInTheDocument();
};
