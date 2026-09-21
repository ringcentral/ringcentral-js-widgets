import type { Message } from '@ringcentral-integration/commons/interfaces/MessageStore.model';
import type { FormatDateTimeOptions } from '@ringcentral-integration/micro-core/src/app/services';

import type { ConversationLogItem } from './ConversationLogger.interface';

export function getLogId({
  conversationId,
  date,
}: {
  conversationId: string;
  date: string;
}) {
  return `${conversationId}/${date}`;
}

export function getConversationLogIdFromMessage(
  message: Message,
  formatDateTime: (
    opts: Partial<FormatDateTimeOptions>,
  ) => string | null | undefined,
): string | null {
  if (!message) {
    return null;
  }
  const { conversationId, creationTime } = message;
  if (!conversationId || creationTime == null) {
    return null;
  }
  const date = formatDateTime({
    type: 'date',
    utcTimestamp: creationTime,
  });
  if (!date) {
    return null;
  }
  return getLogId({
    conversationId: String(conversationId),
    date,
  });
}

export function conversationLogIdentityFunction(
  conversation: ConversationLogItem,
) {
  return conversation.conversationLogId;
}
