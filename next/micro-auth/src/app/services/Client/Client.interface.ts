import { SDK } from '@ringcentral/sdk';
import { Client as RingCentralClient } from 'ringcentral-client';

export interface ClientOptions {
  init?: (service: RingCentralClient['service']) => void;
  sdk?: SDK;
  /**
   * When true, Discovery/SDK will not send brandId so this app can accept
   * accounts from other brands. App-level only; do not put this on BrandConfig.
   */
  omitDiscoveryBrandId?: boolean;
}
