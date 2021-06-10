import RcModule from 'ringcentral-integration/lib/RcModule';
import { Module } from 'ringcentral-integration/lib/di';
import proxify from 'ringcentral-integration/lib/proxy/proxify';
import ensureExist from 'ringcentral-integration/lib/ensureExist';
import moduleStatuses from 'ringcentral-integration/enums/moduleStatuses';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { getModuleStatusReducer } from 'ringcentral-integration/lib/getModuleStatusReducer';
import { baseMessageTypes } from '../AdapterCore/baseMessageTypes';
import { baseActionTypes } from './baseActionTypes';
import getDefaultGlobalStorageReducer from './getDefaultGlobalStorageReducer';
import IframeMessageTransport from '../IframeMessageTransport';

@Module({
  deps: ['GlobalStorage', 'Locale', 'Presence', 'RouterInteraction', 'Storage'],
})
export default class AdapterModuleCoreBase extends RcModule {
  constructor({
    prefix,
    storageKey = 'adapterCore',
    messageTypes = baseMessageTypes,
    actionTypes = baseActionTypes,
    globalStorage,
    locale,
    presence,
    routerInteraction,
    getGlobalStorageReducer = getDefaultGlobalStorageReducer,
    messageTransport = new IframeMessageTransport({
      targetWindow: window.parent,
    }),
    ...options
  }) {
    super({
      prefix,
      actionTypes,
      ...options,
    });

    this._messageTypes = ObjectMap.prefixValues(messageTypes, prefix);
    this._locale = ensureExist.call(this, locale, 'locale');
    this._messageTransport = ensureExist.call(
      this,
      messageTransport,
      'messageTransport',
    );
    this._presence = ensureExist.call(this, presence, 'presence');
    this._router = ensureExist.call(
      this,
      routerInteraction,
      'routerInteraction',
    );

    this._storageKey = storageKey;
    this._globalStorage = ensureExist.call(
      this,
      globalStorage,
      'globalStorage',
    );

    this._globalStorage.registerReducer({
      key: this._storageKey,
      reducer: getGlobalStorageReducer(this.actionTypes),
    });

    this._reducer = getModuleStatusReducer(this.actionTypes);
  }

  initialize() {
    this._messageTransport.addListener((msg) => this._onMessage(msg));
    this.store.subscribe(() => this._onStateChange());
  }

  _shouldInit() {
    return (
      this.pending &&
      this._globalStorage.ready &&
      this._locale.ready &&
      this._router.ready
    );
  }

  _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      this._pushAdapterState();
      this._pushOtherStateChanges();
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    }
    this._pushPresence();
    this._pushLocale();
    this._pushOtherStateChanges();
  }

  _pushOtherStateChanges() {
    console.log('implement to handle other state changes pushing.');
  }

  _pushPresence() {
    if (
      this.ready &&
      (this._lastDndStatus !== this._presence.dndStatus ||
        this._lastUserStatus !== this._presence.userStatus ||
        this._lastTelephonyStatus !== this._presence.telephonyStatus)
    ) {
      this._lastDndStatus = this._presence.dndStatus;
      this._lastUserStatus = this._presence.userStatus;
      this._lastTelephonyStatus = this._presence.telephonyStatus;
      this._postMessage({
        type: this._messageTypes.pushPresence,
        telephonyStatus: this._presence.telephonyStatus,
        userStatus: this._presence.userStatus,
        dndStatus: this._presence.dndStatus,
        presenceOption: this._presence.presenceOption,
      });
    }
  }

  _pushLocale() {
    if (
      this.ready &&
      this._locale.ready &&
      this._lastLocale !== this._locale.currentLocale
    ) {
      this._lastLocale = this._locale.currentLocale;
      this._postMessage({
        type: this._messageTypes.pushLocale,
        locale: this._locale.currentLocale,
        strings: this.localeStrings,
      });
    }
  }

  _postMessage(data) {
    this._messageTransport.postMessage(data);
  }

  _pushAdapterState() {
    if (
      this.ready &&
      (this._lastDndStatus !== this._presence.dndStatus ||
        this._lastUserStatus !== this._presence.userStatus ||
        this._lastTelephonyStatus !== this._presence.telephonyStatus ||
        this._lastClosed !== this.closed ||
        this._lastMinimized !== this.minimized ||
        this._lastPosition.translateX !== this.position.translateX ||
        this._lastPosition.translateY !== this.position.translateY ||
        this._lastPosition.minTranslateX !== this.position.minTranslateX ||
        this._lastPosition.minTranslateY !== this.position.minTranslateY)
    ) {
      this._lastDndStatus = this._presence.dndStatus;
      this._lastUserStatus = this._presence.userStatus;
      this._lastTelephonyStatus = this._presence.telephonyStatus;
      this._lastClosed = this.closed;
      this._lastMinimized = this.minimized;
      this._lastPosition = this.position;
      this._postMessage({
        type: this._messageTypes.pushAdapterState,
        size: this.size,
        minimized: this.minimized,
        closed: this.closed,
        position: this.position,
        telephonyStatus: this._presence.telephonyStatus,
        userStatus: this._presence.userStatus,
        dndStatus: this._presence.dndStatus,
      });
    }
  }

  _onMessage(msg) {
    if (msg) {
      switch (msg.type) {
        case this._messageTypes.syncClosed:
          this._syncClosed(msg.closed);
          break;
        case this._messageTypes.syncMinimized:
          this._syncMinimized(msg.minimized);
          break;
        case this._messageTypes.syncSize:
          this._syncSize(msg.size);
          break;
        case this._messageTypes.syncPosition:
          this._syncPosition(msg.position);
          break;
        case this._messageTypes.presenceItemClicked:
          this._onPresenceItemClicked(msg.presenceType);
          break;
        case this._messageTypes.navigateToCurrentCall:
          this._onNavigateToCurrentCall();
          break;
        case this._messageTypes.navigateToViewCalls:
          this._onNavigateToViewCalls();
          break;
        case this._messageTypes.popOut:
          this._onPopOut();
          break;
        default:
          break;
      }
    }
  }

  @proxify
  async _syncClosed(closed) {
    this.store.dispatch({
      type: this.actionTypes.syncClosed,
      closed,
    });
  }

  @proxify
  async _syncMinimized(minimized) {
    this.store.dispatch({
      type: this.actionTypes.syncMinimized,
      minimized,
    });
  }

  @proxify
  async _syncSize(size = {}) {
    this.store.dispatch({
      type: this.actionTypes.syncSize,
      size,
    });
  }

  @proxify
  async _syncPosition(position = {}) {
    this.store.dispatch({
      type: this.actionTypes.syncPosition,
      position,
    });
  }

  @proxify
  async _onPresenceItemClicked(presenceData) {
    await this._presence.setPresence(presenceData);
  }

  @proxify
  async showAdapter() {
    this.store.dispatch({
      type: this.actionTypes.showAdapter,
    });
  }

  @proxify
  async _onNavigateToCurrentCall() {
    throw new Error('Should implement the _onNavigateToCurrentCall function.');
  }

  @proxify
  async _onNavigateToViewCalls() {
    throw new Error('Should implement the _onNavigateToViewCalls function.');
  }

  @proxify
  _onPopOut() {
    if (typeof this.showClientWindow === 'function') {
      this.showClientWindow();
    }
  }

  get status() {
    // * compatibility other sub-module
    return this.state.status || this.state;
  }

  get ready() {
    return this.status === moduleStatuses.ready;
  }

  get pending() {
    return this.status === moduleStatuses.pending;
  }

  get minimized() {
    return this._globalStorage.getItem(this._storageKey).minimized;
  }

  get closed() {
    return this._globalStorage.getItem(this._storageKey).closed;
  }

  get size() {
    return this._globalStorage.getItem(this._storageKey).size;
  }

  get position() {
    return this._globalStorage.getItem(this._storageKey).position;
  }
}
