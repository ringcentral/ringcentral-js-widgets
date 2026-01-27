import type { MessageStoreOptions } from '../MessageStore/MessageStore.interface';

export interface VoicemailMessageStoreOptions
  extends Omit<MessageStoreOptions, 'messageType'> {}
