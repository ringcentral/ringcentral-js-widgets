import moduleStatuses from '../../enums/moduleStatuses';
import { Module } from '../../lib/di';
import { IStorage, StorageBase } from '../../lib/StorageBaseV2';
import { Deps } from './GlobalStorage.interface';

@Module({
  name: 'GlobalStorage',
  deps: [{ dep: 'GlobalStorageOptions', optional: true }],
})
export class GlobalStorage extends StorageBase<Deps> {
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
      name: 'globalStorage',
      StorageProvider: deps.globalStorageOptions?.StorageProvider,
    });
  }

  // overridden RcModuleV2 `initModule`
  async initModule() {
    let storedData: Record<string, any> = null;
    const storageKey = `${this.prefix ? `${this.prefix}-` : ''}GlobalStorage`;
    this._storage = new this._StorageProvider({
      storageKey,
    });
    storedData = await this._storage.getData();
    for (const key in storedData) {
      if (!this._storageReducers[key]) {
        delete storedData[key];
        await this._storage.removeItem(key);
      }
    }
    this.store.dispatch({
      type: this._storageActionTypes.initSuccess,
      data: storedData,
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
    this.store.subscribe(() => {
      if (this.status !== moduleStatuses.pending) {
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
