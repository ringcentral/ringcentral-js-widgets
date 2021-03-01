import { Module } from 'ringcentral-integration/lib/di';

import { Storage } from 'ringcentral-integration/modules/StorageV2';
import loginStatus from 'ringcentral-integration/modules/Auth/loginStatus';
import moduleStatuses from 'ringcentral-integration/enums/moduleStatuses';
import { Deps } from './EvStorage.interface';
import { loginStatus as evLoginStatus } from '../../enums/loginStatus';

@Module({
  name: 'Storage',
  deps: [
    'Auth',
    'EvAuth',
    { dep: 'TabManager', optional: true },
    { dep: 'StorageOptions', optional: true },
  ],
})
export class EvStorage extends Storage<Deps> {
  constructor(deps: Deps) {
    super(deps);
    this._disableInactiveTabsWrite =
      this._deps.storageOptions?.disableInactiveTabsWrite ?? true;
  }

  async initModule() {
    let storedData: Record<string, unknown> = null;
    this.store.subscribe(async () => {
      if (
        this._deps.auth.loginStatus === loginStatus.loggedIn &&
        (!this._deps.tabManager || this._deps.tabManager.ready) &&
        this._deps.evAuth.loginStatus === evLoginStatus.LOGIN_SUCCESS &&
        this.pending
      ) {
        this.store.dispatch({
          type: this._storageActionTypes.init,
        });
        const agentId = this._deps.evAuth.agentId;
        const storageKey = `${this.prefix ? `${this.prefix}-` : ''}storage-${
          this._deps.auth.ownerId
        }${agentId ? `-${agentId}` : ''}`;

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
        this.resetStorage();
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
