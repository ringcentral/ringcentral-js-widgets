import type { ConversationsOptions as BaseOptions } from '../Conversations/Conversations.interface';

export interface FaxConversationsOptions
  extends Omit<BaseOptions, 'showMMSAttachment'> {}
