import { sleep } from '@ringcentral-integration/utils';

import moduleStatuses from '../../enums/moduleStatuses';
import RcModule from '../../lib/RcModule';
import { batchGetApi } from '../../lib/batchApiHelper';
import { Module } from '../../lib/di';
import ensureExist from '../../lib/ensureExist';
import proxify from '../../lib/proxy/proxify';

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
// @ts-expect-error TS(2415): Class 'GlipPersons' incorrectly extends base class... Remove this comment to see the full error message
export default class GlipPersons extends RcModule {
  _appFeatures: any;
  _auth: any;
  _batchFetchDelay: any;
  _client: any;
  _dataStorageKey: any;
  _fetchingIds: any;
  _storage: any;
  _tabManager: any;
  constructor({
    client,
    auth,
    storage,
    tabManager,
    appFeatures,
    batchFetchDelay = DEFAULT_BATCH_FETCH_DELAY,
    ...options
  }: any) {
    super({
      ...options,
      actionTypes,
    });

    this._appFeatures = appFeatures;
    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    this._client = ensureExist.call(this, client, 'client');
    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
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

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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

  // @ts-expect-error TS(4113): This member cannot have an 'override' modifier bec... Remove this comment to see the full error message
  override _shouldInit() {
    return (
      this._auth.loggedIn &&
      this._appFeatures.ready &&
      (!this._storage || this._storage.ready) &&
      (!this._tabManager || this._tabManager.ready) &&
      this.pending
    );
  }

  // @ts-expect-error TS(4113): This member cannot have an 'override' modifier bec... Remove this comment to see the full error message
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
  async loadPerson(id: any) {
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
  async loadPersons(personIds: any) {
    if (!this._auth.loggedIn) {
      return;
    }
    if (!personIds) {
      return;
    }
    const { ownerId } = this._auth;
    const newPersonIds: any = [];
    personIds.forEach((id: any) => {
      if (!this.personsMap[id] && !this._fetchingIds[id]) {
        newPersonIds.push(id);
      }
    });
    if (newPersonIds.length === 0) {
      return;
    }
    const ids = newPersonIds.slice(0, MaximumBatchGetPersons);
    // @ts-expect-error TS(7006): Parameter 'id' implicitly has an 'any' type.
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
      // @ts-expect-error TS(7006): Parameter 'id' implicitly has an 'any' type.
      ids.forEach((id) => {
        delete this._fetchingIds[id];
      });
    } catch (e: any /** TODO: confirm with instanceof */) {
      this.store.dispatch({
        type: this.actionTypes.fetchError,
      });
      // @ts-expect-error TS(7006): Parameter 'id' implicitly has an 'any' type.
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

  async _batchGetPersons(personIds: any) {
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
      multipartResponse.filter((r: any) => r.ok).map((x: any) => x.json()),
    );
    return responses;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  get _actionTypes() {
    return actionTypes;
  }

  get personsMap() {
    if (this._storage) {
      return this._storage.getItem(this._dataStorageKey) || {};
    }
    return this.state.glipPersonStore;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  get status() {
    return this.state.status;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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
