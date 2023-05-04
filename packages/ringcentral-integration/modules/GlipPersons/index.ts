import { sleep } from '@ringcentral-integration/utils';

import moduleStatuses from '../../enums/moduleStatuses';
import { batchGetApi } from '../../lib/batchApiHelper';
import { Module } from '../../lib/di';
import ensureExist from '../../lib/ensureExist';
import proxify from '../../lib/proxy/proxify';
import RcModule from '../../lib/RcModule';
import { actionTypes } from './actionTypes';
import getReducer, { getGlipPersonStoreReducer } from './getReducer';

const MaximumBatchGetPersons = 30;
const DEFAULT_BATCH_FETCH_DELAY = 500;

@Module({
  deps: [
    'Client',
    'Auth',
    'AppFeatures',
    { dep: 'Storage', optional: true },
    { dep: 'TabManager', optional: true },
    { dep: 'GlipPersonsOptions', optional: true },
  ],
})
export default class GlipPersons extends RcModule {
  constructor({
    client,
    auth,
    storage,
    tabManager,
    appFeatures,
    batchFetchDelay = DEFAULT_BATCH_FETCH_DELAY,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });

    this._appFeatures = appFeatures;
    this._client = ensureExist.call(this, client, 'client');
    this._auth = ensureExist.call(this, auth, 'auth');
    this._tabManager = tabManager;
    this._storage = storage;

    this._fetchingIds = {};
    this._batchFetchDelay = batchFetchDelay;

    this._dataStorageKey = 'glipPersonsData';
    if (this._storage) {
      this._reducer = getReducer(this.actionTypes);
      this._storage.registerReducer({
        key: this._dataStorageKey,
        reducer: getGlipPersonStoreReducer(this.actionTypes),
      });
    } else {
      this._reducer = getReducer(this.actionTypes, {
        glipPersonStore: getGlipPersonStoreReducer(this.actionTypes),
      });
    }
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  async _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      if (this._auth.isFreshLogin) {
        this.store.dispatch({
          type: this.actionTypes.cleanUp,
        });
      }
      if (!this._hasPermission) return;
      await this.loadMe();
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (this._shouldReset()) {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
    }
  }

  override _shouldInit() {
    return (
      this._auth.loggedIn &&
      this._appFeatures.ready &&
      (!this._storage || this._storage.ready) &&
      (!this._tabManager || this._tabManager.ready) &&
      this.pending
    );
  }

  override _shouldReset() {
    return (
      ((this._storage && !this._storage.ready) ||
        (this._tabManager && !this._tabManager.ready) ||
        !this._appFeatures.ready ||
        !this._auth.loggedIn) &&
      this.ready
    );
  }

  @proxify
  async loadMe() {
    await this.loadPerson(this._auth.ownerId);
  }

  @proxify
  async loadPerson(id) {
    try {
      this.store.dispatch({
        type: this.actionTypes.fetch,
      });
      const person = await this._client.glip().persons(id).get();
      this.store.dispatch({
        type: this.actionTypes.fetchSuccess,
        person,
      });
    } catch (e: any /** TODO: confirm with instanceof */) {
      this.store.dispatch({
        type: this.actionTypes.fetchError,
      });
    }
  }

  @proxify
  async loadPersons(personIds) {
    if (!this._auth.loggedIn) {
      return;
    }
    if (!personIds) {
      return;
    }
    const { ownerId } = this._auth;
    const newPersonIds = [];
    personIds.forEach((id) => {
      if (!this.personsMap[id] && !this._fetchingIds[id]) {
        newPersonIds.push(id);
      }
    });
    if (newPersonIds.length === 0) {
      return;
    }
    const ids = newPersonIds.slice(0, MaximumBatchGetPersons);
    ids.forEach((id) => {
      this._fetchingIds[id] = 1;
    });
    try {
      this.store.dispatch({
        type: this.actionTypes.fetch,
      });
      const persons = await this._batchGetPersons(ids);
      this.store.dispatch({
        type: this.actionTypes.batchFetchSuccess,
        persons,
      });
      ids.forEach((id) => {
        delete this._fetchingIds[id];
      });
    } catch (e: any /** TODO: confirm with instanceof */) {
      this.store.dispatch({
        type: this.actionTypes.fetchError,
      });
      ids.forEach((id) => {
        delete this._fetchingIds[id];
      });
    }
    if (ownerId !== this._auth.ownerId) {
      return;
    }
    const lastIds = newPersonIds.slice(MaximumBatchGetPersons);
    if (lastIds.length > 0) {
      await sleep(this._batchFetchDelay);
      await this.loadPersons(lastIds);
    }
  }

  async _batchGetPersons(personIds) {
    if (!personIds || personIds.length === 0) {
      return [];
    }
    if (personIds.length === 1) {
      const response = await this._client.glip().persons(personIds[0]).get();
      return [response];
    }
    const ids = personIds.join(',');
    const multipartResponse = await batchGetApi({
      platform: this._client.service.platform(),
      url: `/restapi/v1.0/glip/persons/${ids}`,
    });
    const responses = await Promise.all(
      multipartResponse.filter((r) => r.ok).map((x) => x.json()),
    );
    return responses;
  }

  get _actionTypes() {
    return actionTypes;
  }

  get personsMap() {
    if (this._storage) {
      return this._storage.getItem(this._dataStorageKey) || {};
    }
    return this.state.glipPersonStore;
  }

  get status() {
    return this.state.status;
  }

  get ready() {
    return this.status === moduleStatuses.ready;
  }

  get me() {
    return this.personsMap[this._auth.ownerId];
  }

  get _hasPermission() {
    return !!this._appFeatures.hasGlipPermission;
  }
}
