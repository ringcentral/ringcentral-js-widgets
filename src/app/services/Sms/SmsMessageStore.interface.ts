import type { MessageStoreOptions } from '../MessageStore/MessageStore.interface';

export interface SmsMessageStoreOptions
  extends Omit<MessageStoreOptions, 'messageType'> {}
