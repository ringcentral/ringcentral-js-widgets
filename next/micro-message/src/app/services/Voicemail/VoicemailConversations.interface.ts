import type { ConversationsOptions as BaseOptions } from '../Conversations/Conversations.interface';

export interface VoicemailConversationsOptions
  extends Omit<BaseOptions, 'showMMSAttachment'> {}
