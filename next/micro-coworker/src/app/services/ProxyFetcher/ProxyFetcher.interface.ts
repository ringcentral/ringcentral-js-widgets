import type { DataFetcherConsumer } from '@ringcentral-integration/micro-auth/src/app/services';

export interface ProxyFetcherOptions {
  /**
   * enabled proxy fetcher modules
   */
  enabledProxyModules: DataFetcherConsumer<any>[];
}
