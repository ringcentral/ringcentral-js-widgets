export interface SubscriptionMock {
  trigger(event: object): Promise<void>;
  remove(): void;
  encryptionKey?: string;
}
