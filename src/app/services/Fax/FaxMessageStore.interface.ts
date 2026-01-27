import type { MessageStoreOptions } from '../MessageStore/MessageStore.interface';

export interface FaxMessageStoreOptions
  extends Omit<MessageStoreOptions, 'messageType'> {}
