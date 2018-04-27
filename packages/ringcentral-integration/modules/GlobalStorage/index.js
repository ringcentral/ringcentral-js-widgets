import { Module } from '../../lib/di';
import StorageBase from '../../lib/StorageBase';
import moduleStatuses from '../../enums/moduleStatuses';

/**
 * @class
 * @description Alternative implementation of the Storage class.
 *  Allows registeration of reducers so that persisted states can be computed with reducers.
 */
@Module({
  deps: [{ dep: 'GlobalStorageOptions', optional: true }]
})
export default class GlobalStorage extends StorageBase {
  /**
   * @constructor
   */
  constructor({
    ...options
  }) {
    super({
      name: 'globalStorage',
      ...options,
    });
  }
  initialize() {
    let storedData = null;
    const storageKey =
      `${this.prefix ? `${this.prefix}-` : ''}GlobalStorage`;
    this._storage = new this._StorageProvider({
      storageKey,
    });
    storedData = this._storage.getData();
    for (const key in storedData) {
      if (!this._reducers[key]) {
        delete storedData[key];
        this._storage.removeItem(key);
      }
    }
    this.store.dispatch({
      type: this.actionTypes.initSuccess,
      storageKey,
      data: storedData,
    });
    this._storageHandler = ({ key, value }) => {
      if (this.ready) {
        storedData[key] = value;
        this.store.dispatch({
          type: this.actionTypes.sync,
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
