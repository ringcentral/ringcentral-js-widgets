import {
  assoc,
  converge,
  flip,
  identity,
  keys,
  mergeWith,
  pick,
  useWith,
} from 'ramda';
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
      ...options
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

  _handleSuccess(identify, ...args) {
    this.store.dispatch({
      type: this.actionTypes.saveSuccess,
      identify,
    });
    if (typeof this._onSuccess === 'function') this._onSuccess(identify, ...args);
  }

  _handleError(identify, ...args) {
    this.store.dispatch({
      type: this.actionTypes.saveError,
      identify,
    });
    if (typeof this._onError === 'function') this._onError(identify, ...args);
  }

  _showLogSection(identify) {
    if (!this.show || identify !== this.currentIdentify) {
      this.store.dispatch({
        type: this.actionTypes.showLogSection,
        identify
      });
    }
  }

  _showLogNotification(identify) {
    if (!this.showNotification || identify !== this.currentNotificationIdentify) {
      this.store.dispatch({
        type: this.actionTypes.showLogNotification,
        identify
      });
    }
  }

  addLogHandler(
    {
      logFunction,
      readyCheckFunction,
      onUpdate,
      onSuccess,
      onError
    }
  ) {
    this._logFunction = this:: ensureExist(logFunction, 'logFunction');
    this._readyCheckFunction = this:: ensureExist(readyCheckFunction, 'readyCheckFunction');
    this._onUpdate = onUpdate;
    this._onSuccess = onSuccess;
    this._onError = onError;
  }

  async updateCallLog(identify, ...args) {
    this.store.dispatch({
      type: this.actionTypes.update,
      identify,
    });
    await this._onUpdate(identify, ...args);
  }

  async saveCallLog(identify, ...args) {
    if (identify && (
      !this.callsMapping[identify] || !this.callsMapping[identify].isSaving
    )) {
      this.store.dispatch({
        type: this.actionTypes.saving,
        identify,
      });
      try {
        const result = await this._logFunction(identify, ...args);
        if (result) {
          this._handleSuccess(identify, ...args);
        } else {
          this._handleError(identify, ...args);
        }
        return result;
      } catch (e) {
        this._handleError(identify, ...args);
        console.warn(e);
      }
    }
    return null;
  }

  handleLogSection(identify) {
    // prevent `isSameCall` for repeat run more time.
    const isSameCall = this.currentIdentify === identify;
    if (!this.show) {
      // Preferentially show call log section.
      this._showLogSection(identify);
    } else if (!this.notificationIsExpand && !isSameCall) {
      // Check it to show log notification when the call log notification isn't expanded.
      this._showLogNotification(identify);
    }
  }

  closeLogSection() {
    if (this.show) {
      this.store.dispatch({
        type: this.actionTypes.closeLogSection
      });
    }
  }

  discardAndHandleNotification() {
    const currentNotificationIdentify = this.currentNotificationIdentify;
    this.closeLogNotification();
    this.closeLogSection();
    this._showLogSection(currentNotificationIdentify);
  }

  async saveAndHandleNotification() {
    const currentNotificationIdentify = this.currentNotificationIdentify;
    const currentIdentify = this.currentIdentify;
    await this.saveCallLog(currentIdentify);
    this.closeLogNotification();
    this.closeLogSection();
    this._showLogSection(currentNotificationIdentify);
  }

  closeLogNotification() {
    if (this.showNotification) {
      this.store.dispatch({
        type: this.actionTypes.closeLogNotification
      });
    }
  }

  expandLogNotification() {
    if (!this.show) {
      this._showLogSection(this.currentNotificationIdentify);
      this.closeLogNotification();
    } else if (!this.notificationIsExpand) {
      this.store.dispatch({
        type: this.actionTypes.expandNotification
      });
    }
  }

  @getter
  calls = createSelector(
    () => this.callsList,
    () => this.callsMapping,
    (list, mapping) => list.map(identify => mapping[identify])
  );

  /**
   * Merge isSaving property from reducer to callsMapping
   */
  @getter
  callsMapping = createSelector(
    () => this._callsMapping,
    () => this._callsSavingStatus,
    converge(
      mergeWith(flip(assoc('isSaving'))),
      [identity, useWith(pick, [keys, identity])]
    )
  )

  get callsList() {
    return this._storage.getItem(this._storageKey).callsList;
  }

  /**
   * Private calls mapping relationship without isSaving property
   */
  get _callsMapping() {
    return this._storage.getItem(this._storageKey).callsMapping;
  }

  get _callsSavingStatus() {
    return this.state.callsSavingStatus;
  }

  get currentIdentify() {
    return this._storage.getItem(this._storageKey).currentIdentify;
  }

  get show() {
    return !!this.currentIdentify;
  }

  get currentNotificationIdentify() {
    return this._storage.getItem(this._storageKey).currentNotificationIdentify;
  }

  get showNotification() {
    return !!this.currentNotificationIdentify;
  }

  get notificationIsExpand() {
    return this._storage.getItem(this._storageKey).notificationIsExpand;
  }

  get status() {
    return this.state.status;
  }
}
