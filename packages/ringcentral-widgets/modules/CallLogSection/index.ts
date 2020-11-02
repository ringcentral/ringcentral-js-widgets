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
import { Module } from 'ringcentral-integration/lib/di';
import ensureExist from 'ringcentral-integration/lib/ensureExist';
import RcModule from 'ringcentral-integration/lib/RcModule';
import { selector } from 'ringcentral-integration/lib/selector';

import { Mapping } from '../../typings';
import actionTypes from './actionTypes';
import { CallLogSectionCallStatus } from './CallLogSection.interface';
import getCallLogSectionReducer from './getCallLogSectionReducer';
import getStorageReducer from './getStorageReducer';

@Module({
  deps: [
    'Storage',
    {
      dep: 'CallLogSectionOptions',
      optional: true,
    },
  ],
})
export default class CallLogSection extends RcModule {
  _notSyncOpenState: boolean;
  _storageKey: string;
  _storageReducer: any;

  constructor({ storage, notSyncOpenState = false, ...options }) {
    super({
      storage,
      actionTypes,
      ...options,
    });
    this._storage = storage;
    this._notSyncOpenState = notSyncOpenState;
    this._storageReducer = getStorageReducer(
      this.actionTypes,
      notSyncOpenState,
    );
    this._storageKey = 'callLogSection';
    this._storage.registerReducer({
      key: this._storageKey,
      reducer: this._storageReducer,
    });
    this._reducer = getCallLogSectionReducer(
      this.actionTypes,
      notSyncOpenState,
    );
  }

  async _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      if (typeof this._onInit === 'function') {
        await this._onInit();
      }
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
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
    return this._storage.ready && this._readyCheckFunction() && this.pending;
  }

  _shouldReset() {
    return (!this._storage.ready || !this._readyCheckFunction()) && this.ready;
  }

  _handleSuccess(identify, ...args) {
    this.store.dispatch({
      type: this.actionTypes.saveSuccess,
      identify,
    });
    if (typeof this._onSuccess === 'function')
      this._onSuccess(identify, ...args);
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
        identify,
      });
    }
  }

  _showLogNotification(identify) {
    if (
      !this.showNotification ||
      identify !== this.currentNotificationIdentify
    ) {
      this.store.dispatch({
        type: this.actionTypes.showLogNotification,
        identify,
      });
    }
  }

  addLogHandler({
    logFunction,
    readyCheckFunction,
    onUpdate,
    onSuccess,
    onError,
  }) {
    this._logFunction = ensureExist.call(this, logFunction, 'logFunction');
    this._readyCheckFunction = ensureExist.call(
      this,
      readyCheckFunction,
      'readyCheckFunction',
    );
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
    if (
      identify &&
      (!this.callsMapping[identify] || !this.callsMapping[identify].isSaving)
    ) {
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
        type: this.actionTypes.closeLogSection,
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
        type: this.actionTypes.closeLogNotification,
      });
    }
  }

  // shrink the popover menu appear when click log button at call notificaiton
  shrinkNotification() {
    if (this.notificationIsExpand) {
      this.store.dispatch({
        type: this.actionTypes.shrinkNotification,
      });
    }
  }

  expandLogNotification() {
    if (!this.show) {
      this._showLogSection(this.currentNotificationIdentify);
      this.closeLogNotification();
    } else if (!this.notificationIsExpand) {
      this.store.dispatch({
        type: this.actionTypes.expandNotification,
      });
    }
  }

  @selector
  calls = [
    () => this.callsList,
    () => this.callsMapping,
    (list, mapping) => {
      const a = list.map((identify) => mapping[identify]);
      console.log('calls', a);
      return a;
    },
  ];

  /**
   * Merge isSaving property from reducer to callsMapping
   */
  @selector
  callsMapping: Mapping<CallLogSectionCallStatus> = [
    () => this._callsMapping,
    () => this._callsSavingStatus,
    converge(mergeWith(flip(assoc('isSaving'))), [
      identity,
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useWith(pick, [keys, identity]),
    ]),
  ] as any;

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

  get _storageCurrentIdentify() {
    return this._storage.getItem(this._storageKey).currentIdentify;
  }

  get _stateCurrentIdentify() {
    return this.state.currentIdentify;
  }

  get currentIdentify() {
    return this._notSyncOpenState
      ? this._stateCurrentIdentify
      : this._storageCurrentIdentify;
  }

  get show() {
    return !!this.currentIdentify;
  }

  get _storageCurrentNotificationIdentify() {
    return this._storage.getItem(this._storageKey).currentNotificationIdentify;
  }

  get _stateCurrentNotificationIdentify() {
    return this.state.currentNotificationIdentify;
  }

  get currentNotificationIdentify() {
    return this._notSyncOpenState
      ? this._stateCurrentNotificationIdentify
      : this._storageCurrentNotificationIdentify;
  }

  get showNotification() {
    return !!this.currentNotificationIdentify;
  }

  get _storageNotificationIsExpand() {
    return this._storage.getItem(this._storageKey).notificationIsExpand;
  }

  get _stateNotificationIsExpand() {
    return this.state.notificationIsExpand;
  }

  get notificationIsExpand() {
    return this._notSyncOpenState
      ? this._stateNotificationIsExpand
      : this._storageNotificationIsExpand;
  }

  get status() {
    return this.state.status;
  }
}
