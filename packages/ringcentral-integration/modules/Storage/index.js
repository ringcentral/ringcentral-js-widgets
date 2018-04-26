import { Module } from '../../lib/di';
import StorageBase from '../../lib/StorageBase';
import loginStatus from '../Auth/loginStatus';
import moduleStatuses from '../../enums/moduleStatuses';

/**
 * @class
 * @description Alternative implementation of the Storage class.
 *  Allows registeration of reducers so that persisted states can be computed with reducers.
 */
@Module({
  deps: ['Auth', { dep: 'StorageOptions', optional: true }]
})
export default class Storage extends StorageBase {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   */
  constructor({
    auth,
    ...options
  }) {
    super({
      name: 'storage',
      ...options,
    });
    this._auth = auth;
  }
  initialize() {
    let storedData = null;
    const self = this;
    this.store.subscribe(() => {
      if (
        this._auth.loginStatus === loginStatus.loggedIn &&
        !this.ready
      ) {
        const storageKey =
          `${this.prefix ? `${this.prefix}-` : ''}storage-${this._auth.ownerId}`;
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
      } else if (
        this._auth.loginStatus === loginStatus.notLoggedIn &&
        this.ready
      ) {
        this.store.dispatch({
          type: this.actionTypes.reset,
        });
        if (this._storageHandler) {
          this._storage.off('storage', this._storageHandler);
          this._storageHandler = null;
        }
        if (this._storage) {
          this._storage.destroy();
          this._storage = null;
        }
        this.store.dispatch({
          type: this.actionTypes.resetSuccess,
        });
      }
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
