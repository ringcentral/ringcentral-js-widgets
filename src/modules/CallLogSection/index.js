import RcModule from 'ringcentral-integration/lib/RcModule';
import { Module } from 'ringcentral-integration/lib/di';
import ensureExist from 'ringcentral-integration/lib/ensureExist';
import getter from 'ringcentral-integration/lib/getter';
import { createSelector } from 'reselect';
import getCallLogSectionReducer from './getCallLogSectionReducer';
import getStorageReducer from './getStorageReducer';
import actionTypes from './actionTypes';

@Module({
  deps: [
    'Storage',
  ]
})
export default class CallLogSection extends RcModule {
  constructor(
    {
      storage,
      ...options,
    }
  ) {
    super(
      {
        storage,
        actionTypes,
        ...options,
      }
    );
    this._storage = storage;
    this._storageReducer = getStorageReducer(this.actionTypes);
    this._storageKey = 'callLogSection';
    this._storage.registerReducer({
      key: this._storageKey,
      reducer: this._storageReducer,
    });
    this._reducer = getCallLogSectionReducer(this.actionTypes);
  }

  async _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.init
      });
      if (typeof this._onInit === 'function') {
        await this._onInit();
      }
      this.store.dispatch({
        type: this.actionTypes.initSuccess
      });
    } else if (this._shouldReset()) {
      if (typeof this._onReset === 'function') {
        await this._onReset();
      }
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
    }
  }

  _shouldInit() {
    return (
      this._storage.ready &&
      this._readyCheckFunction() &&
      this.pending
    );
  }

  _shouldReset() {
    return (
      (
        !this._storage.ready ||
        !this._readyCheckFunction()
      ) && this.ready
    );
  }

  addLogHandler(
    {
      logFunction,
      readyCheckFunction,
      onSuccess,
      onError
    }
  ) {
    this._logFunction = this::ensureExist(logFunction, 'logFunction');
    this._readyCheckFunction = this::ensureExist(readyCheckFunction, 'readyCheckFunction');
    this._onSuccess = onSuccess;
    this._onError = onError;
  }

  updateCallLog(identify) {
    this.store.dispatch({
      type: this.actionTypes.update,
      identify,
    });
  }

  async saveCallLog(identify) {
    if (identify) {
      this.store.dispatch({
        type: this.actionTypes.saving,
        identify,
      });
      try {
        const result = await this._logCall();
        if (result) {
          this._handleSuccess(identify);
        } else {
          this._handleError(identify);
        }
      } catch (e) {
        this._handleError(identify);
      }
    }
  }

  _handleSuccess(identify) {
    this.store.dispatch({
      type: this.actionTypes.saveSuccess,
      identify,
    });
    if (typeof this._onSuccess === 'function') this._onSuccess();
  }

  _handleError(identify) {
    this.store.dispatch({
      type: this.actionTypes.saveError,
      identify,
    });
    if (typeof this._onError === 'function') this._onError();
  }

  showLogSection(identify) {
    if (!this.show) {
      this.store.dispatch({
        type: this.actionTypes.showLogSection,
        identify
      });
    }
  }

  hideLogSection() {
    if (this.show) {
      this.store.dispatch({
        type: this.actionTypes.hideLogSection
      });
    }
  }

  @getter
  calls = createSelector(
    () => this.callsList,
    () => this.callsMapping,
    (list, mapping) => list.map(identify => mapping[identify])
  );

  get callsList() {
    return this._storage.getItem(this._storageKey).callsList;
  }

  get callsMapping() {
    return this._storage.getItem(this._storageKey).callsMapping;
  }

  get currentIdentify() {
    return this._storage.getItem(this._storageKey).currentIdentify;
  }

  get show() {
    return !!this._storage.getItem(this._storageKey).currentIdentify;
  }

  get status() {
    return this.state.status;
  }
}
