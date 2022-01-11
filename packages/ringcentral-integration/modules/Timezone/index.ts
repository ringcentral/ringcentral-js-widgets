import Client from 'ringcentral-client';

import moduleStatuses from '../../enums/moduleStatuses';
import { Module } from '../../lib/di';
import proxify from '../../lib/proxy/proxify';
import RcModule from '../../lib/RcModule';
import actionTypes, { TimezoneActionTypes } from './actionTypes';
import getTimezoneReducer from './getTimezoneReducer';

interface ITimezoneResponse {
  navigation: {
    firstPage: { uri: string };
    lastPage: { uri: string };
  };
  paging: {
    page: number;
    pageEnd: number;
    pageStart: number;
    perPage: number;
    totalElements: number;
    totalPages: number;
  };
  records: ITimezone[];
}

interface ITimezone {
  id: string;
  bias?: string;
  description?: string;
  name?: string;
  uri?: string;
}

/**
 * @class
 * @description timezone module
 */
@Module({
  deps: ['Auth', 'Client', 'Storage'],
})
export default class Timezone extends RcModule<
  Record<string, any>,
  TimezoneActionTypes
> {
  private CACHE_TTL = 60 * 60e3;

  private _auth: any;
  private _client: Client;
  private _storage: any;
  private _storageKey: string;
  private _localeTimezone: ITimezone;

  _reducer: any;

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  constructor({ auth, client, storage, ...options }) {
    super({
      actionTypes,
      ...options,
    });
    this._auth = auth;
    this._client = client;
    this._storage = storage;

    this._reducer = getTimezoneReducer(this.actionTypes);
    this._storageKey = 'timezone';
    this._storage.registerReducer({
      key: this._storageKey,
      reducer: this._reducer,
    });
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  async _onStateChange() {
    if (this.pending && this._auth.ready && this._storage.ready) {
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      if (this.shouldUpdateTimezones) {
        await this._initTimezones();
        this.updateCacheExpiredAt();
      }
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    }
    if (this.ready && !this._auth.ready && !this._storage.ready) {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
    }
  }

  @proxify
  private async _initTimezones() {
    const data = await this._client.dictionary().timezone().get();
    const { records = [] } = data as ITimezoneResponse;
    this.updateTimezones(records);
  }

  @proxify
  updateTimezones(timezones: ITimezone[]) {
    this.store.dispatch({
      type: this.actionTypes.updateTimezones,
      timezones,
    });
  }

  @proxify
  updateCacheExpiredAt() {
    const cacheExpiredAt = +new Date() + this.CACHE_TTL;
    this.store.dispatch({
      type: this.actionTypes.updateCacheExpiredAt,
      cacheExpiredAt,
    });
  }

  get status() {
    return this.state.status;
  }

  get storage() {
    if (!this._storage.ready) {
      return {};
    }
    return this._storage.getItem(this._storageKey) || {};
  }

  get ready() {
    return this.status === moduleStatuses.ready;
  }

  get pending() {
    return this.state.status === moduleStatuses.pending;
  }

  get timezones(): ITimezone[] {
    return this.state.timezones || [];
  }

  get cacheExpiredAt() {
    return this.state.cacheExpiredAt || null;
  }

  get localeTimezone() {
    if (!this._localeTimezone) {
      const bias = String(-new Date().getTimezoneOffset());
      this._localeTimezone = this.timezones.find(
        (timezone) => timezone.bias === bias,
      );
    }
    return this._localeTimezone;
  }

  get shouldUpdateTimezones() {
    return !this.cacheExpiredAt || this.cacheExpiredAt < +new Date();
  }
}
