import {
  DataFetcher,
  DataFetcherConsumer,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  AddressBook,
  CompanyContacts,
} from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  Coworker,
  injectable,
  optional,
  RcModule,
  SymmetricTransport,
  watch,
} from '@ringcentral-integration/next-core';

import type { ProxyFetcherOptions } from './ProxyFetcher.interface';

type SyncDataEvent = `${string}-SyncData`;

type ProxyFetcherInteraction = Record<
  SyncDataEvent,
  (data: unknown, updatedTimestamp: number) => Promise<void>
>;

@injectable({
  name: 'ProxyFetcher',
})
export class ProxyFetcher extends RcModule {
  protected enabledProxyModules: DataFetcherConsumer<unknown>[];

  constructor(
    protected _coworker: Coworker,
    protected _dataFetcher: DataFetcher,
    protected _addressBook: AddressBook,
    protected _companyContacts: CompanyContacts,
    @optional('ProxyFetcherOptions')
    protected _proxyFetcherOptions: ProxyFetcherOptions,
  ) {
    super();
    this.enabledProxyModules = [
      this._addressBook,
      this._companyContacts,
      ...(this._proxyFetcherOptions?.enabledProxyModules ?? []),
    ];
    this.applyProxy();
  }

  protected applyProxy(
    enabledProxyModules: DataFetcherConsumer<unknown>[] = this
      .enabledProxyModules,
  ) {
    enabledProxyModules.forEach((module) => {
      const { props } = module.source;
      props.disableSetNull = this._coworker.isMain;
      const { permissionCheckFunction } = props;
      props.permissionCheckFunction = () =>
        !!(this._coworker.isCoworker && permissionCheckFunction?.());
      const syncEventName = `${module.key}-SyncData` as const;
      if (this._coworker.isMain) {
        this.transport.listen(syncEventName, async (data, updatedTimestamp) => {
          if (module.updatedTimestamp < updatedTimestamp) {
            this._dataFetcher.updateData(module.source, data, updatedTimestamp);
          }
        });
      }
      if (this._coworker.isCoworker) {
        global.addEventListener('connect', () => {
          this.initializeInCoworker(module, syncEventName);
        });
      }
    });
  }

  /**
   * enable proxy fetcher modules
   */
  enable(
    enabledModules:
      | DataFetcherConsumer<unknown>[]
      | DataFetcherConsumer<unknown>,
  ) {
    const enabledProxyModules = Array.isArray(enabledModules)
      ? enabledModules
      : [enabledModules];
    this.enabledProxyModules.push(...enabledProxyModules);
    this.applyProxy(enabledProxyModules);
  }

  protected initializeInCoworker(
    module: DataFetcherConsumer<unknown>,
    syncEventName: SyncDataEvent,
  ) {
    this.transport.emit(syncEventName, module.data, module.updatedTimestamp);
    watch(
      this,
      () => module.data,
      () => {
        this.transport.emit(
          syncEventName,
          module.data,
          module.updatedTimestamp,
        );
      },
    );
  }

  get transport() {
    return this._coworker
      .transport as SymmetricTransport<ProxyFetcherInteraction>;
  }
}
