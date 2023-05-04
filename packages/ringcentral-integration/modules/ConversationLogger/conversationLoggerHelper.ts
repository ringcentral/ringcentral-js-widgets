import { ConversationLogItem } from './ConversationLogger.interface';

export function getLogId({
  conversationId,
  date,
}: {
  conversationId: string;
  date: string;
}) {
  return `${conversationId}/${date}`;
}

export function conversationLogIdentityFunction(
  conversation: ConversationLogItem,
) {
  return conversation.conversationLogId;
}
