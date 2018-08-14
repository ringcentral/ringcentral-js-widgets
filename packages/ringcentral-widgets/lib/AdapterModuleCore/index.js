import RcModule from 'ringcentral-integration/lib/RcModule';
import { Module } from 'ringcentral-integration/lib/di';
import proxify from 'ringcentral-integration/lib/proxy/proxify';
import ensureExist from 'ringcentral-integration/lib/ensureExist';
import moduleStatuses from 'ringcentral-integration/enums/moduleStatuses';
import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';
import { prefixEnum } from 'ringcentral-integration/lib/Enum';
import baseMessageTypes from '../AdapterCore/baseMessageTypes';
import baseActionTypes from './baseActionTypes';
import getDefaultGlobalStorageReducer from './getDefaultGlobalStorageReducer';
import IframeMessageTransport from '../IframeMessageTransport';

@Module({
  deps: [
    'CallingSettings',
    'GlobalStorage',
    'Locale',
    'Presence',
    'RouterInteraction',
    'Storage',
    'Webphone',
  ]
})
export default class AdapterModuleCore extends RcModule {
  constructor({
    prefix,
    storageKey = 'adapterCore',
    messageTypes = baseMessageTypes,
    actionTypes = baseActionTypes,
    callingSettings,
    globalStorage,
    locale,
    presence,
    routerInteraction,
    webphone,
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

    this._messageTypes = prefixEnum({ enumMap: messageTypes, prefix });
    this._locale = this::ensureExist(locale, 'locale');
    this._messageTransport = this::ensureExist(messageTransport, 'messageTransport');
    this._presence = this::ensureExist(presence, 'presence');
    this._router = this::ensureExist(routerInteraction, 'routerInteraction');
    this._callingSettings = callingSettings;
    this._webphone = webphone;

    this._storageKey = storageKey;
    this._globalStorage = this::ensureExist(globalStorage, 'globalStorage');

    this._globalStorage.registerReducer({
      key: this._storageKey,
      reducer: getGlobalStorageReducer(this.actionTypes),
    });
  }
  initialize() {
    this._messageTransport.addListener(msg => this._onMessage(msg));
    this.store.subscribe(() => this._onStateChange());
  }
  _shouldInit() {
    return this.pending &&
      this._globalStorage.ready &&
      this._locale.ready &&
      this._router.ready;
  }
  _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      this._pushAdapterState();
      this._pushRingState();
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    }
    this._pushPresence();
    this._pushLocale();
    this._pushRingState();
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
        case this._messageTypes.presenceClicked:
          this._onPresenceClicked();
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
      type: this.acitonTypes.syncSize,
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

  _pushRingState() {
    if (!this.ready || !this._callingSettings) return;

    const { callingMode } = this._callingSettings;
    if (callingMode === callingModes.webphone) {
      const webphone = this._webphone;
      if (!webphone) {
        throw new Error('webphone is a required dependency for monitoring WebRTC call');
      }
      if (webphone.ringSession && webphone.ringSessionId !== this._ringSessionId) {
        this._ringSessionId = webphone.ringSessionId;
        this._postMessage({
          type: this._messageTypes.pushRingState,
          ringing: true
        });
      }
      // Check if ringing is over
      if (this._ringSessionId) {
        const ringingSessions = webphone.sessions.filter(session =>
          session.callStatus === 'webphone-session-connecting' && session.direction === 'Inbound'
        );
        if (ringingSessions.length <= 0) {
          this._postMessage({
            type: this._messageTypes.pushRingState,
            ringing: false
          });
          this._ringSessionId = null;
        }
      }
    } else {
      const status = this._presence.telephonyStatus;
      if (this._presence.telephonyStatus !== this._telephonyStatus) {
        this._postMessage({
          type: this._messageTypes.pushRingState,
          ringing: status === 'Ringing'
        });
        this._telephonyStatus = status;
      }
    }
  }

  _pushPresence() {
    if (
      this.ready &&
      (
        this._lastDndStatus !== this._presence.dndStatus ||
        this._lastUserStatus !== this._presence.userStatus ||
        this._lastTelephonyStatus !== this._presence.telephonyStatus
      )
    ) {
      this._lastDndStatus = this._presence.dndStatus;
      this._lastUserStatus = this._presence.userStatus;
      this._lastTelephonyStatus = this._presence.telephonyStatus;
      this._postMessage({
        type: this._messageTypes.pushPresence,
        telephonyStatus: this._presence.telephonyStatus,
        userStatus: this._presence.userStatus,
        dndStatus: this._presence.dndStatus,
      });
    }
  }

  get localeStrings() {
    return {};
  }

  _pushLocale() {
    if (
      this.ready &&
      this._lastLocale !== this._locale.currentLocale
    ) {
      this._lastLocale = this._locale.currentLocale;
      this._postMessage({
        type: this._messageTypes.pushLocale,
        locale: this._locale.currentLocale,
        strings: this._localeStrings,
      });
    }
  }

  _postMessage(data) {
    this._messageTransport.postMessage(data);
  }

  _pushAdapterState() {
    if (
      this.ready &&
      (
        this._lastDndStatus !== this._presence.dndStatus ||
        this._lastUserStatus !== this._presence.userStatus ||
        this._lastTelephonyStatus !== this._presence.telephonyStatus ||
        this._lastClosed !== this.closed ||
        this._lastMinimized !== this.minimized ||
        this._lastPosition.translateX !== this.position.translateX ||
        this._lastPosition.translateY !== this.position.translateY ||
        this._lastPosition.minTranslateX !== this.position.minTranslateX ||
        this._lastPosition.minTranslateY !== this.position.minTranslateY
      )
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
  @proxify
  async _onPresenceClicked() {
    if (this.minimized) {
      this.showAdapter();
    }
    this._router.push('/settings?showPresenceSettings=1');
  }

  @proxify
  async showAdapter() {
    this.store.dispatch({
      type: this.actionTypes.showAdapter,
    });
  }

  get status() {
    return this.state.status;
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
