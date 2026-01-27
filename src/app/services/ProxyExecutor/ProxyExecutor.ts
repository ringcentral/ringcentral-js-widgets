import {
  CompanyContacts,
  ContactMatcher,
  ContactSearch,
} from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  Coworker,
  injectable,
  optional,
  PortManager,
  RcModule,
  StoragePlugin as Storage,
  SymmetricTransport,
  watch,
} from '@ringcentral-integration/next-core';

import type { ProxyExecutorOptions } from './ProxyExecutor.interface';

@injectable({
  name: 'ProxyExecutor',
})
export class ProxyExecutor extends RcModule {
  constructor(
    protected _portManager: PortManager,
    protected _coworker: Coworker,
    protected _contactMatcher: ContactMatcher,
    protected _contactSearch: ContactSearch,
    @optional() protected _storage?: Storage,
    @optional('ProxyExecutorOptions')
    protected _proxyExecutorOptions?: ProxyExecutorOptions,
  ) {
    super();
    this._coworker.addProxyModules([
      ContactMatcher,
      ContactSearch,
      CompanyContacts,
      ...(this._proxyExecutorOptions?.enabledProxyModules ?? []),
    ]);
    // ignore base RcModule status sync from coworker to main process
    this._coworker.addIgnoreSyncStateKeys([
      'status',
      ...(this._proxyExecutorOptions?.ignoreSyncStateKeys ?? []),
    ]);
    this.handleContactMatch();
    if (this._coworker.isCoworker) {
      this._contactMatcher.asyncGetQueries = async () => {
        return this.transport.emit('getQueries');
      };
    }
    if (this._coworker.isMain) {
      this.transport.listen('getQueries', async () => {
        return this._contactMatcher._getQueries();
      });
    }
  }

  protected handleContactMatch() {
    if (this._coworker.isMain) {
      watch(
        this,
        () => this._contactMatcher.ready,
        () => {
          this._contactMatcher.triggerMatch();
        },
      );
    }
  }

  get transport() {
    return this._coworker.transport as SymmetricTransport<{
      getQueries: () => Promise<string[]>;
    }>;
  }
}
