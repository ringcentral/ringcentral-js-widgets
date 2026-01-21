import type {
  ICoworkerOptions,
  ServiceIdentifier,
} from '@ringcentral-integration/next-core';

export interface ProxyExecutorOptions
  extends Pick<ICoworkerOptions, 'ignoreSyncStateKeys'> {
  /**
   * enabled proxy executor modules
   */
  enabledProxyModules: ServiceIdentifier<unknown>[];
}
