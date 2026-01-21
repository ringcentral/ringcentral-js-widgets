import { screen, StepFunction } from '@ringcentral-integration/test-utils';

export const CheckConversationTabTooltip: StepFunction<{ title: string }> = ({
  title,
}) => {
  const conversationsPanel = screen.queryByTestId('ConversationsPanel');
  const tabTooltip = conversationsPanel!.querySelector(
    `nav [title="${title}"]`,
  );
  expect(tabTooltip).toBeInTheDocument();
};
