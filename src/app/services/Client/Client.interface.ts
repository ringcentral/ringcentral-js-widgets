import { SDK } from '@ringcentral/sdk';
import { Client as RingCentralClient } from 'ringcentral-client';

export interface ClientOptions {
  init?: (service: RingCentralClient['service']) => void;
  sdk?: SDK;
}
