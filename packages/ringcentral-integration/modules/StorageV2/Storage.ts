import { Module } from '../../lib/di';
import { StorageBase, IStorage } from '../../lib/StorageBaseV2';
import loginStatus from '../Auth/loginStatus';
import moduleStatuses from '../../enums/moduleStatuses';
import { Deps } from './Storage.interface';

@Module({
  name: 'Storage',
  deps: [
    'Auth',
    { dep: 'TabManager', optional: true },
    { dep: 'StorageOptions', optional: true },
  ],
})
export class Storage extends StorageBase<Deps> {
  /* migration storage v1 to v2 */
  public migrationMapping: Record<string, string | Record<string, string>> = {};
  /* migration storage v1 to v2 */
  protected _disableInactiveTabsWrite: boolean;
  protected _storage: IStorage;
  protected _storageHandler: ({
    key,
    value,
  }: {
    key: string;
    value: unknown;
  }) => void = null;

  constructor(deps: Deps) {
    super(deps, {
      name: 'storage',
      StorageProvider: deps.storageOptions.StorageProvider,
    });
    this._disableInactiveTabsWrite =
      this._deps.storageOptions?.disableInactiveTabsWrite ?? true;
  }

  // overridden RcModuleV2 `initModule`
  async initModule() {
    let storedData: Record<string, unknown> = null;
    this.store.subscribe(async () => {
      if (
        this._deps.auth.loginStatus === loginStatus.loggedIn &&
        (!this._deps.tabManager || this._deps.tabManager.ready) &&
        this.pending
      ) {
        this.store.dispatch({
          type: this._storageActionTypes.init,
        });
        const storageKey = `${this.prefix ? `${this.prefix}-` : ''}storage-${
          this._deps.auth.ownerId
        }`;
        this._storage = new this._StorageProvider({
          storageKey,
        });
        storedData = await this._storage.getData();
        /* migration storage v1 to v2 */
        /* eslint-disable */
        for (const newKey in this.migrationMapping) {
          const oldKey = this.migrationMapping[newKey];
          if (typeof oldKey === 'string') {
            if (storedData[oldKey]) {
              storedData[newKey] = storedData[oldKey];
            }
          } else if (typeof oldKey === 'object') {
            for (const index in oldKey) {
              if (storedData[oldKey[index]]) {
                storedData[newKey] = storedData[newKey] ?? {};
                (storedData[newKey] as Record<string, any>)[index] =
                  storedData[oldKey[index]];
              }
            }
          }
          this._storage.setItem(newKey, storedData[newKey]);
        }
        /* eslint-enable */
        /* migration storage v1 to v2 */
        for (const key in storedData) {
          if (!this._storageReducers[key]) {
            delete storedData[key];
            await this._storage.removeItem(key);
          }
        }
        this.store.dispatch({
          type: this._storageActionTypes.initSuccess,
          // storageKey,
          // To fix same reference in redux store with storedData
          data: {
            ...storedData,
          },
        });
        this._storageHandler = ({ key, value }) => {
          if (this.ready) {
            storedData[key] = value;
            this.store.dispatch({
              type: this._storageActionTypes.sync,
              key,
              value,
            });
          }
        };
        this._storage.on('storage', this._storageHandler);
      } else if (
        ((!!this._deps.tabManager && !this._deps.tabManager.ready) ||
          this._deps.auth.notLoggedIn) &&
        this.ready
      ) {
        this.store.dispatch({
          type: this._storageActionTypes.reset,
        });
        if (this._storageHandler) {
          if (this._storage.off) {
            this._storage.off('storage', this._storageHandler);
          } else if (this._storage.removeListener) {
            this._storage.removeListener('storage', this._storageHandler);
          }
          this._storageHandler = null;
        }
        if (this._storage) {
          this._storage.destroy();
          this._storage = null;
        }
        this.store.dispatch({
          type: this._storageActionTypes.resetSuccess,
        });
      }
      if (
        this.status === moduleStatuses.ready &&
        (!this._disableInactiveTabsWrite ||
          !this._deps.tabManager ||
          this._deps.tabManager.active)
      ) {
        // save new data to storage when changed
        const currentData = this.data;
        for (const key in currentData) {
          if (storedData[key] !== currentData[key]) {
            this._storage.setItem(key, currentData[key]);
            storedData[key] = currentData[key];
          }
        }
      }
    });
  }
}
