import { find, filter } from 'ramda';
import { EventEmitter } from 'events';
import RingCentralWebphone from 'ringcentral-web-phone';
import defaultIncomingAudio from 'ringcentral-web-phone/audio/incoming.ogg';
import defaultOutgoingAudio from 'ringcentral-web-phone/audio/outgoing.ogg';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import { Module } from '../../lib/di';
import RcModule from '../../lib/RcModule';
import sleep from '../../lib/sleep';
import moduleStatuses from '../../enums/moduleStatuses';
import connectionStatus from './connectionStatus';

import sessionStatus from './sessionStatus';
import recordStatus from './recordStatus';
import actionTypes from './actionTypes';
import callDirections from '../../enums/callDirections';
import webphoneErrors from './webphoneErrors';
import webphoneMessages from './webphoneMessages';
import callErrors from '../Call/callErrors';
import ensureExist from '../../lib/ensureExist';
import proxify from '../../lib/proxy/proxify';
import { selector } from '../../lib/selector';
import validateNumbers from '../../lib/validateNumbers';

import {
  isBrowserSupport,
  isChrome,
  isEnableMidLinesInSDP,
  normalizeSession,
  isRing,
  isOnHold,
  extractHeadersData,
} from './webphoneHelper';
import getWebphoneReducer, {
  getWebphoneStorageReducer,
  DEFAULT_AUDIO,
} from './getWebphoneReducer';

const AUTO_RETRIES_DELAY = [
  0,
  5 * 1000,
  10 * 1000,
  30 * 1000,
  2 * 60 * 1000,
  5 * 60 * 1000,
  15 * 60 * 1000,
  30 * 60 * 1000,
];

const INACTIVE_SLEEP_DELAY = 1000;
const INCOMING_CALL_INVALID_STATE_ERROR_CODE = 2;

const extendedControlStatus = ObjectMap.fromKeys([
  'pending',
  'playing',
  'stopped',
]);

const EVENTS = ObjectMap.fromKeys([
  'callRing',
  'callStart',
  'callEnd',
  'callHold',
  'callResume',
  'beforeCallResume',
  'beforeCallEnd',
  'callInit',
  'webphoneRegistered',
  'webphoneUnregistered',
]);

const registerErrors = [
  webphoneErrors.sipProvisionError,
  webphoneErrors.webphoneCountOverLimit,
  webphoneErrors.webphoneForbidden,
  webphoneErrors.requestTimeout,
  webphoneErrors.internalServerError,
  webphoneErrors.serverTimeout,
  webphoneErrors.unknownError,
  webphoneErrors.connectFailed,
  webphoneErrors.provisionUpdate,
  webphoneErrors.serverConnecting,
];

/**
 * @constructor
 * @description Web phone module to handle phone interaction with WebRTC.
 */
@Module({
  deps: [
    'Auth',
    'Alert',
    'Client',
    'NumberValidate',
    'RolesAndPermissions',
    'Brand',
    'RegionSettings',
    'AudioSettings',
    'Storage',
    { dep: 'AvailabilityMonitor', optional: true },
    { dep: 'TabManager', optional: true },
    { dep: 'ContactMatcher', optional: true },
    { dep: 'WebphoneOptions', optional: true },
  ],
})
export default class Webphone extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Brand} params.brand - app brand
   * @param {RegionSettings} params.regionSettings - regionSettings
   * @param {String} params.appKey - app key
   * @param {String} params.appName - app name
   * @param {String} params.appVersion - app version
   * @param {Number} params.webphoneLogLevel - log Level
   * @param {Alert} params.alert - alert module instance
   * @param {Auth} params.auth - auth module instance
   * @param {Client} params.client - client module instance
   * @param {RolesAndPermissions} params.rolesAndPermissions - rolesAndPermissions module instance
   * @param {Storage} params.storage - storage module instance
   * @param {GlobalStorage} params.globalStorage - globalStorage module instance
   * @param {NumberValidate} params.numberValidate - numberValidate module instance
   * @param {ContactMatcher} params.contactMatcher - contactMatcher module instance, optional
   * @param {Function} params.onCallEnd - callback on a call end
   * @param {Function} params.onCallRing - callback on a call ring
   * @param {Function} params.onCallStart - callback on a call accpeted by callee
   * @param {Function} params.onCallInit - callback on create a new call
   * @param {Function} params.onCallResume - callback on a call resume
   * @param {Function} params.onCallHold - callback on a call holded
   * @param {Function} params.onBeforeCallResume - callback before a call resume
   * @param {Function} params.onBeforeCallEnd - callback before a call hangup
   * @param {Object} params.webphoneSDKOptions - callback before a call hangup
   */
  constructor({
    appKey,
    appName,
    appVersion,
    alert,
    auth,
    client,
    storage,
    rolesAndPermissions,
    webphoneLogLevel = 1,
    contactMatcher,
    numberValidate,
    audioSettings,
    tabManager,
    onCallEnd,
    onCallRing,
    onCallStart,
    onCallResume,
    onCallHold,
    onCallInit,
    onBeforeCallResume,
    onBeforeCallEnd,
    regionSettings,
    brand,
    webphoneSDKOptions,
    permissionCheck = true,
    availabilityMonitor,
    disconnectOnInactive = false,
    connectDelay = 0,
    prefix,
    ...options
  }) {
    super({
      ...options,
      prefix,
      actionTypes,
    });

    this._regionSettings = regionSettings;
    this._brand = brand;
    this._eventEmitter = new EventEmitter();
    this._appKey = appKey;
    this._appName = appName;
    this._appVersion = appVersion;
    this._alert = alert;
    this._webphoneLogLevel = webphoneLogLevel;
    this._auth = ensureExist.call(this, auth, 'auth');
    this._client = ensureExist.call(this, client, 'client');
    this._rolesAndPermissions = ensureExist.call(
      this,
      rolesAndPermissions,
      'rolesAndPermissions',
    );
    this._numberValidate = ensureExist.call(
      this,
      numberValidate,
      'numberValidate',
    );
    this._audioSettings = ensureExist.call(
      this,
      audioSettings,
      'audioSettings',
    );
    this._storage = storage;

    this._availabilityMonitor = availabilityMonitor;
    this._contactMatcher = contactMatcher;
    this._tabManager = tabManager;
    this._webphoneSDKOptions = webphoneSDKOptions || {};

    this._permissionCheck = permissionCheck;
    this._reconnectDelays = AUTO_RETRIES_DELAY;
    this._connectDelay = connectDelay;
    this._disconnectOnInactive = disconnectOnInactive;
    this._activeWebphoneKey = `${prefix}-active-webphone-key`;
    this._activeWebphoneActiveCallKey = `${prefix}-active-webphone-active-call-key`;
    this._storageKey = `${prefix}-webphone`;

    if (typeof onCallEnd === 'function') {
      this._eventEmitter.on(EVENTS.callEnd, onCallEnd);
    }
    if (typeof onCallRing === 'function') {
      this._eventEmitter.on(EVENTS.callRing, onCallRing);
    }
    if (typeof onCallStart === 'function') {
      this._eventEmitter.on(EVENTS.callStart, onCallStart);
    }
    if (typeof onCallResume === 'function') {
      this._eventEmitter.on(EVENTS.callResume, onCallResume);
    }
    if (typeof onCallHold === 'function') {
      this._eventEmitter.on(EVENTS.callHold, onCallHold);
    }
    if (typeof onCallInit === 'function') {
      this._eventEmitter.on(EVENTS.callInit, onCallInit);
    }
    if (typeof onBeforeCallResume === 'function') {
      this._eventEmitter.on(EVENTS.beforeCallResume, onBeforeCallResume);
    }
    this._onBeforeCallEndFunctions = [];
    if (typeof onBeforeCallEnd === 'function') {
      this._eventEmitter.on(EVENTS.beforeCallEnd, onBeforeCallEnd);
    }

    this._webphone = null;
    this._remoteVideo = null;
    this._localVideo = null;
    this._sessions = new Map();
    this._reducer = getWebphoneReducer(this.actionTypes);
    this._storage.registerReducer({
      key: this._storageKey,
      reducer: getWebphoneStorageReducer(this.actionTypes),
    });
    this._reconnectAfterSessionEnd = null;
    this._disconnectInactiveAfterSessionEnd = false;
    this._tabActive = false;
    this._connectTimeout = null;
    this._isFirstRegister = true;
    this._stopWebphoneUserAgentPromise = null;

    if (this._contactMatcher) {
      this._contactMatcher.addQuerySource({
        getQueriesFn: () => this.sessionPhoneNumbers,
        readyCheckFn: () => this.ready,
      });
    }
  }

  _prepareVideoElement() {
    this._remoteVideo = document.createElement('video');
    this._remoteVideo.id = 'remoteVideo';
    this._remoteVideo.setAttribute('hidden', 'hidden');
    this._localVideo = document.createElement('video');
    this._localVideo.id = 'localVideo';
    this._localVideo.setAttribute('hidden', 'hidden');
    this._localVideo.setAttribute('muted', 'muted');
    this._localVideo.muted = true;

    document.body.appendChild(this._remoteVideo);
    document.body.appendChild(this._localVideo);

    this._remoteVideo.volume = this._audioSettings.callVolume;
    if (this._audioSettings.supportDevices) {
      if (this._remoteVideo.setSinkId && this._audioSettings.outputDeviceId) {
        this._remoteVideo.setSinkId(this._audioSettings.outputDeviceId);
      }
    }

    this.store.dispatch({
      type: this.actionTypes.videoElementPrepared,
    });
  }

  initialize() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      if (document.readyState === 'loading') {
        window.addEventListener('load', () => {
          this._prepareVideoElement();
        });
      } else {
        this._prepareVideoElement();
      }
      window.addEventListener('unload', () => {
        this._disconnect();
        this._removeCurrentInstanceFromActiveWebphone();
      });
    }
    this.store.subscribe(() => this._onStateChange());
    this._auth.addBeforeLogoutHandler(async () => {
      await this._disconnect();
    });
    this._createOtherWebphoneInstanceListener();
  }

  async _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (this._shouldReset()) {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
    }
    if (
      this.ready &&
      (this._ringtoneVolume !== this._audioSettings.ringtoneVolume ||
        this._ringtoneMuted !== this._audioSettings.ringtoneMuted)
    ) {
      this._ringtoneVolume = this._audioSettings.ringtoneVolume;
      this._ringtoneMuted = this._audioSettings.ringtoneMuted;
      if (this._webphone && this._webphone.userAgent) {
        this._webphone.userAgent.audioHelper.setVolume(
          this._ringtoneMuted ? 0 : this._audioSettings.ringtoneVolume,
        );
      }
    }
    if (this.ready && this._callVolume !== this._audioSettings.callVolume) {
      this._callVolume = this._audioSettings.callVolume;
      if (this._remoteVideo) {
        this._remoteVideo.volume = this._audioSettings.callVolume;
      }
    }
    if (
      this.ready &&
      this._audioSettings.supportDevices &&
      this._outputDeviceId !== this._audioSettings.outputDeviceId
    ) {
      this._outputDeviceId = this._audioSettings.outputDeviceId;
      if (this._remoteVideo && this._remoteVideo.setSinkId) {
        this._remoteVideo.setSinkId(this._outputDeviceId);
      }
    }
    if (
      this.ready &&
      this._tabManager &&
      this._tabManager.ready &&
      this._tabActive !== this._tabManager.active
    ) {
      this._tabActive = this._tabManager.active;
      if (this._tabActive) {
        this._onTabActive();
      }
    }
  }

  _shouldInit() {
    return (
      this._auth.loggedIn &&
      this._rolesAndPermissions.ready &&
      this._numberValidate.ready &&
      this._audioSettings.ready &&
      this._storage.ready &&
      (!this._tabManager || this._tabManager.ready) &&
      this.pending
    );
  }

  _shouldReset() {
    return (
      (!this._auth.loggedIn ||
        !this._rolesAndPermissions.ready ||
        !this._numberValidate.ready ||
        (!!this._tabManager && !this._tabManager.ready) ||
        !this._audioSettings.ready) &&
      this.ready
    );
  }

  @proxify
  async _sipProvision() {
    const response = await this._client.service
      .platform()
      .post('/restapi/v1.0/client-info/sip-provision', {
        sipInfo: [{ transport: 'WSS' }],
      });
    return response.json();
  }

  async _fetchDL() {
    const response = await this._client.account().extension().device().list();
    const devices = response.records;
    let phoneLines = [];
    devices.forEach((device) => {
      if (!device.phoneLines || device.phoneLines.length === 0) {
        return;
      }
      phoneLines = phoneLines.concat(device.phoneLines);
    });
    return phoneLines;
  }

  async _removeWebphone() {
    if (!this._webphone || !this._webphone.userAgent) {
      return;
    }
    this._stopWebphoneUserAgentPromise = this._waitUnregistered(
      this._webphone.userAgent,
    );
    this._webphone.userAgent.stop();
    try {
      await this._stopWebphoneUserAgentPromise;
    } catch (e) {
      console.error(e);
    }
    this._stopWebphoneUserAgentPromise = null;
    try {
      this._webphone.userAgent.removeAllListeners();
      this._webphone.userAgent.transport.removeAllListeners();
      if (this._webphone.userAgent.transport.isConnected()) {
        this._webphone.userAgent.transport.disconnect();
      }
      if (this._webphone.userAgent.transport.reconnectTimer) {
        clearTimeout(this._webphone.userAgent.transport.reconnectTimer);
        this._webphone.userAgent.transport.reconnectTimer = undefined;
      }
      if (this._webphone.userAgent.transport.__clearSwitchBackTimer) {
        this._webphone.userAgent.transport.__clearSwitchBackTimer();
      }
    } catch (e) {
      console.error(e);
      // ignore clean listener error
    }
    this._webphone = null;
  }

  _waitUnregistered(userAgent) {
    return new Promise((resolve, reject) => {
      let timeout = setTimeout(() => {
        timeout = null;
        reject(new Error('unregistered timeout'));
      }, 2000);
      userAgent.once('unregistered', (e) => {
        if (timeout) {
          clearTimeout(timeout);
        }
        resolve(e);
      });
    });
  }

  async _createWebphone(provisionData) {
    await this._removeWebphone();
    this._webphone = new RingCentralWebphone(provisionData, {
      appKey: this._appKey,
      appName: this._appName,
      appVersion: this._appVersion,
      uuid: this._auth.endpointId,
      logLevel: this._webphoneLogLevel, // error 0, warn 1, log: 2, debug: 3
      audioHelper: {
        enabled: true, // enables audio feedback when web phone is ringing or making a call
      },
      media: {
        remote: this._remoteVideo,
        local: this._localVideo,
      },
      enableQos: isChrome(),
      enableMidLinesInSDP: isEnableMidLinesInSDP(),
      ...this._webphoneSDKOptions,
    });
    this.loadAudio();
    this._webphone.userAgent.audioHelper.setVolume(
      this._audioSettings.ringtoneMuted
        ? 0
        : this._audioSettings.ringtoneVolume,
    );
    // Webphone userAgent registered event
    this._webphone.userAgent.on('registered', () => {
      if (!this.connected) {
        this._onWebphoneRegistered(provisionData);
      }
    });
    this._webphone.userAgent.on('unregistered', (e) => {
      console.log('web phone unregistered event', e);
      this._onWebphoneUnregistered();
    });
    this._webphone.userAgent.on('registrationFailed', (response, cause) => {
      console.error('Webphone Register Error:', response, cause);
      // For 401
      if (!response && cause === 'Connection Error') {
        return;
      }
      const message = (response && response.data) || response;
      if (
        message &&
        typeof message === 'string' &&
        this._webphone.userAgent.transport.isSipErrorCode(message)
      ) {
        // error is handled in webphone sdk;
        return;
      }
      // don't handled in connection is disconnecting
      if (this.disconnected || this.disconnecting) {
        return;
      }
      let errorCode;
      // limit logic:
      /*
       * Specialties of this flow are next:
       *   6th WebRTC in another browser receives 6th ‘EndpointID’ and 1st ‘InstanceID’,
       *   which has been given previously to the 1st ‘EndpointID’.
       *   It successfully registers on WSX by moving 1st ‘EndpointID’ to a blocklist state.
       *   When 1st WebRTC client re-registers on expiration timeout,
       *   WSX defines that 1st ‘EndpointID’ is blocklisted and responds with ‘SIP/2.0 403 Forbidden,
       *   instance id is intercepted by another registration’ and remove it from block list.
       *   So if 1st WebRTC will send re-register again with the same ‘InstanceID’,
       *   it will be accepted and 6th ‘EndpointID’ will be blocklisted.
       *   (But the WebRTC client must logout on receiving SIP/2.0 403 Forbidden error and in case of login -
       *   provision again via Platform API and receive new InstanceID)
       */
      const statusCode = response
        ? response.statusCode || response.status_code
        : null;
      switch (statusCode) {
        // Webphone account over limit
        case 603: {
          errorCode = webphoneErrors.webphoneCountOverLimit;
          break;
        }
        // Internal server error
        case 500: {
          errorCode = webphoneErrors.internalServerError;
          break;
        }
        // Timeout
        case 504: {
          errorCode = webphoneErrors.serverTimeout;
          break;
        }
        default: {
          errorCode = webphoneErrors.unknownError;
          break;
        }
      }
      this._onConnectError({ errorCode, statusCode });
    });
    this._webphone.userAgent.on('invite', (session) => {
      console.log('UA invite');
      this._onInvite(session);
    });
    // sip provision expired
    this._webphone.userAgent.on('provisionUpdate', () => {
      if (this.sessions.length === 0) {
        this._alert.warning({
          message: webphoneErrors.provisionUpdate,
          allowDuplicates: false,
        });
        this.connect({
          force: true,
          skipDLCheck: true,
          skipConnectDelay: true,
        });
        return;
      }
      this._reconnectAfterSessionEnd = {
        reason: webphoneErrors.provisionUpdate,
      };
    });
    // websocket transport connecting event
    this._webphone.userAgent.transport.on('connecting', () => {
      // reconnecting event
      console.log('web phone connecting event');
      if (this.connected || this.connectError) {
        this._alert.warning({
          message: webphoneErrors.serverConnecting,
          allowDuplicates: false,
        });
        this.store.dispatch({
          type: this.actionTypes.reconnect,
        });
      }
    });
    // Server connection closed event after 10 time retry with primary server and backup server
    this._webphone.userAgent.transport.on('closed', () => {
      console.log('web phone closed event');
      this.store.dispatch({
        type: this.actionTypes.setRetryCounts,
        retryCounts: 20,
      });
      this._onConnectError({
        errorCode: webphoneErrors.connectFailed,
        ttl: 0,
      });
    });
    this._webphone.userAgent.transport.on('transportError', () => {
      console.log('WebSocket transportError occurred');
    });
    this._webphone.userAgent.transport.on('wsConnectionError', () => {
      this.store.dispatch({
        type: this.actionTypes.connectError,
      });
    });
    // Timeout to switch back to primary server
    this._webphone.userAgent.transport.on('switchBackProxy', () => {
      if (this.sessions.length === 0) {
        this.connect({
          skipConnectDelay: true,
          force: true,
          skipDLCheck: true,
        });
        return;
      }
      this._reconnectAfterSessionEnd = {
        reason: null,
      };
    });
  }

  @proxify
  async _connect() {
    if (!this._auth.loggedIn) {
      return;
    }
    let sipProvision;
    try {
      sipProvision = await this._sipProvision();
    } catch (error) {
      console.error(error, this.connectRetryCounts);
      if (
        error &&
        error.message &&
        error.message.indexOf('Feature [WebPhone] is not available') > -1
      ) {
        this._rolesAndPermissions.refreshServiceFeatures();
        return;
      }
      this._onConnectError({
        errorCode: webphoneErrors.sipProvisionError,
        statusCode: null,
        ttl: 0,
      });
      return;
    }
    await this._createWebphone(sipProvision);
  }

  async _waitStillTabActive() {
    if (!this._tabManager || this._tabManager.active) {
      return;
    }
    await sleep(INACTIVE_SLEEP_DELAY);
    await this._waitStillTabActive();
  }

  _isAvailableToConnect({ force }) {
    if (!this.enabled || !this._auth.loggedIn) {
      return false;
    }
    // do not connect if it is connecting
    // do not reconnect when user disconnected
    if (this.connecting || this.disconnecting || this.inactiveDisconnecting) {
      return false;
    }
    // do not connect when connected unless force
    if (!force && this.connected) {
      return false;
    }
    return true;
  }

  /**
   * connect a web phone.
   */
  @proxify
  async connect({
    force = false,
    skipTimeout = true,
    skipConnectDelay = false,
    skipDLCheck = false,
    skipTabActiveCheck = false,
  } = {}) {
    if (!isBrowserSupport()) {
      this.store.dispatch({
        type: this.actionTypes.connectError,
        errorCode: webphoneErrors.browserNotSupported,
      });
      this._alert.warning({
        message: webphoneErrors.browserNotSupported,
        ttl: 0,
      });
      return;
    }
    if (!this._isAvailableToConnect({ force })) {
      return;
    }
    if (!skipTabActiveCheck) {
      await this._waitStillTabActive();
    }
    if (!this._isAvailableToConnect({ force })) {
      return;
    }
    // when last connect is connect error, use reconnect (will show connecting badge)
    this.store.dispatch({
      type:
        this.connectError || force
          ? this.actionTypes.reconnect
          : this.actionTypes.connect,
    });
    if (!skipConnectDelay && this._connectDelay > 0) {
      await sleep(this._connectDelay);
    }
    if (!skipDLCheck) {
      try {
        if (!this._auth.loggedIn) {
          return;
        }
        const phoneLines = await this._fetchDL();
        if (phoneLines.length === 0) {
          this._alert.warning({
            message: webphoneErrors.noOutboundCallWithoutDL,
          });
        }
      } catch (error) {
        console.error('fetch DL failed', error);
        this._alert.warning({
          message: webphoneErrors.checkDLError,
          allowDuplicates: false,
        });
      }
    }
    if (this.disconnected || this.disconnecting || !this._auth.loggedIn) {
      return;
    }
    if (this._connectTimeout) {
      clearTimeout(this._connectTimeout);
    }
    if (force || skipTimeout) {
      await this._connect();
      return;
    }
    this._connectTimeout = setTimeout(() => {
      this._connectTimeout = null;
      this._connect();
    }, this._getConnectTimeoutTtl());
  }

  _releaseVideoElementsOnSessionsEmpty() {
    if (this.videoElementPrepared && this.sessions.length === 0) {
      // Pause video elements to release system Video Wake Lock RCINT-15582
      if (!this._remoteVideo.paused) {
        this._remoteVideo.pause();
        this._remoteVideo.srcObject = null;
      }
      if (!this._localVideo.paused) {
        this._localVideo.pause();
      }
    }
  }

  _reconnectWebphoneIfNecessaryOnSessionsEmpty() {
    if (this._reconnectAfterSessionEnd && this.sessions.length === 0) {
      if (this._reconnectAfterSessionEnd.reason) {
        this._alert.warning({
          message: this._reconnectAfterSessionEnd.reason,
          allowDuplicates: false,
        });
      }
      this._reconnectAfterSessionEnd = null;
      this.connect({ skipConnectDelay: true, force: true, skipDLCheck: true });
    }
  }

  _getConnectTimeoutTtl() {
    if (this.connectRetryCounts < 7) {
      return this._reconnectDelays[this.connectRetryCounts];
    }
    return this._reconnectDelays[6];
  }

  async _onConnectError({ errorCode, statusCode, ttl }) {
    if (
      this.connectRetryCounts > 2 ||
      this.reconnecting ||
      this.connected ||
      this.connectError
    ) {
      this.store.dispatch({
        type: this.actionTypes.connectError,
        errorCode,
        statusCode,
      });
      this._alert.danger({
        message: errorCode,
        ttl,
        allowDuplicates: false,
        payload: {
          statusCode,
        },
      });
      this._hideConnectingAlert();
      // Need to show unavailable badge and reconnect in background when third retry
      // sleep before next reconnect for slient reconnect in background
      await sleep(this._getConnectTimeoutTtl());
      if (!this.connectError) {
        return;
      }
      this.connect({ skipConnectDelay: true, force: true, skipDLCheck: true });
      return;
    }
    this.store.dispatch({
      type: this.actionTypes.connectFailed,
      errorCode,
      statusCode,
    });
    if (this.connectRetryCounts === 1) {
      this._alert.warning({
        message: errorCode,
        ttl,
        allowDuplicates: false,
        payload: {
          statusCode,
          isConnecting: true,
        },
      });
      this._hideConnectFailedAlert();
    }
    this.connect({
      skipDLCheck: true,
      skipConnectDelay: true,
      skipTimeout: false,
    });
  }

  _onWebphoneRegistered(provisionData) {
    this.store.dispatch({
      type: this.actionTypes.registered,
      device: provisionData.device,
    });
    this._alert.info({
      message: webphoneErrors.connected,
    });
    this._hideRegisterErrorAlert();
    this._setCurrentInstanceAsActiveWebphone();
    this._eventEmitter.emit(EVENTS.webphoneRegistered);
  }

  _onWebphoneUnregistered() {
    this._removeCurrentInstanceFromActiveWebphone();
    if (
      this.disconnecting ||
      this.inactiveDisconnecting ||
      this.disconnected ||
      this.inactive ||
      !!this._stopWebphoneUserAgentPromise
    ) {
      // unregister by our app
      return;
    }
    // unavailable, unregistered by some errors
    this.store.dispatch({
      type: this.actionTypes.connectError,
    });
    this._eventEmitter.emit(EVENTS.webphoneUnregistered);
  }

  _setCurrentInstanceAsActiveWebphone() {
    if (this._disconnectOnInactive && this._tabManager) {
      localStorage.setItem(this._activeWebphoneKey, this._tabManager.id);
    }
  }

  _removeCurrentInstanceFromActiveWebphone() {
    if (this._disconnectOnInactive && this._tabManager) {
      const activeWebphoneInstance = localStorage.getItem(
        this._activeWebphoneKey,
      );
      if (activeWebphoneInstance === this._tabManager.id) {
        localStorage.removeItem(this._activeWebphoneKey);
      }
    }
  }

  _createOtherWebphoneInstanceListener() {
    if (!this._disconnectOnInactive || !this._tabManager) {
      return;
    }
    window.addEventListener('storage', (e) => {
      // disconnect to inactive when other tabs' web phone connected
      if (e.key === this._activeWebphoneKey) {
        if (!this.connected || !document.hidden) {
          return;
        }
        if (e.newValue === this._tabManager.id) {
          return;
        }
        if (this.sessions.length === 0) {
          this._disconnectToInactive();
          return;
        }
        this._disconnectInactiveAfterSessionEnd = true;
      }
      // unhold active calls in current tab
      if (e.key === this._activeWebphoneActiveCallKey) {
        this._holdOtherSession(e.newValue);
      }
    });
  }

  async _disconnectToInactive() {
    this.store.dispatch({
      type: this.actionTypes.disconnectOnInactive,
    });
    await this._removeWebphone();
    this.store.dispatch({
      type: this.actionTypes.unregisteredOnInactive,
    });
  }

  _makeWebphoneInactiveOnSessionsEmpty() {
    if (this._disconnectInactiveAfterSessionEnd && this.sessions.length === 0) {
      this._disconnectInactiveAfterSessionEnd = false;
      if (!document.hidden) {
        // set to active
        if (this._tabManager && this._tabManager.active) {
          this._setCurrentInstanceAsActiveWebphone();
        }
        return;
      }
      this._disconnectToInactive();
    }
  }

  _onTabActive() {
    if (!this._disconnectOnInactive) {
      return;
    }
    if (this.connected) {
      this._setCurrentInstanceAsActiveWebphone();
      return;
    }
    if (this.inactive) {
      this.connect({
        skipDLCheck: true,
        force: true,
        skipTabActiveCheck: true,
      });
    }
  }

  _hideConnectingAlert() {
    const alertIds = this._alert.messages
      .filter((m) => {
        for (let i = 0, len = registerErrors.length; i < len; i += 1) {
          if (
            m.message === registerErrors[i] &&
            m.payload &&
            m.payload.isConnecting === true
          )
            return true;
        }
        return false;
      })
      .map((m) => m.id);
    if (alertIds.length) {
      this._alert.dismiss(alertIds);
    }
  }

  async _hideConnectFailedAlert() {
    const alertIds = this._alert.messages
      .filter((m) => {
        for (let i = 0, len = registerErrors.length; i < len; i += 1) {
          if (m.message === registerErrors[i] && !m.payload.isConnecting)
            return true;
        }
        return false;
      })
      .map((m) => m.id);
    if (alertIds.length) {
      this._alert.dismiss(alertIds);
    }
  }

  _hideRegisterErrorAlert() {
    const alertIds = this._alert.messages
      .filter((m) => {
        for (let i = 0, len = registerErrors.length; i < len; i += 1) {
          if (m.message === registerErrors[i]) return true;
        }
        return false;
      })
      .map((m) => m.id);
    if (alertIds.length) {
      this._alert.dismiss(alertIds);
    }
  }

  async _disconnect() {
    if (this.disconnected || this.disconnecting) {
      return;
    }
    if (this._connectTimeout) {
      clearTimeout(this._connectTimeout);
    }
    this.store.dispatch({
      type: this.actionTypes.disconnect,
    });
    if (this._webphone) {
      this._sessions.forEach((session) => {
        this.hangup(session);
      });
      await this._removeWebphone();
      this._sessions = new Map();
      this._updateSessions();
    }
    this.store.dispatch({
      type: this.actionTypes.unregistered,
    });
  }

  @proxify
  async disconnect() {
    await this._disconnect();
  }

  async _playExtendedControls(session) {
    session.__rc_extendedControlStatus = extendedControlStatus.playing;
    const controls = session.__rc_extendedControls.slice();
    for (let i = 0, len = controls.length; i < len; i += 1) {
      if (
        session.__rc_extendedControlStatus === extendedControlStatus.playing
      ) {
        if (controls[i] === ',') {
          await sleep(2000);
        } else {
          await this._sendDTMF(controls[i], session);
        }
      } else {
        return;
      }
    }
    session.__rc_extendedControlStatus = extendedControlStatus.stopped;
  }

  _onAccepted(session) {
    session.on('accepted', (incomingResponse) => {
      if (session.__rc_callStatus === sessionStatus.finished) {
        return;
      }
      console.log('accepted');
      session.__rc_callStatus = sessionStatus.connected;
      extractHeadersData(session, incomingResponse.headers);
      this._onCallStart(session);
      if (
        session.__rc_extendedControls &&
        session.__rc_extendedControlStatus === extendedControlStatus.pending
      ) {
        this._playExtendedControls(session);
      }
    });
    session.on('progress', (incomingResponse) => {
      console.log('progress...');
      session.__rc_callStatus = sessionStatus.connecting;
      extractHeadersData(session, incomingResponse.headers);
      this._updateSessions();
    });
    session.on('rejected', () => {
      console.log('rejected');
      session.__rc_callStatus = sessionStatus.finished;
      this._onCallEnd(session);
    });
    session.on('failed', (response, cause) => {
      console.log('Event: Failed');
      console.log(cause);
      session.__rc_callStatus = sessionStatus.finished;
      this._onCallEnd(session);
    });
    session.on('terminated', () => {
      console.log('Event: Terminated');
      session.__rc_callStatus = sessionStatus.finished;
      this._onCallEnd(session);
    });
    session.on('cancel', () => {
      console.log('Event: Cancel');
      session.__rc_callStatus = sessionStatus.finished;
      this._onCallEnd(session);
    });
    session.on('refer', () => {
      console.log('Event: Refer');
    });
    session.on('replaced', (newSession) => {
      console.log('Event: replaced', newSession);
      session.__rc_callStatus = sessionStatus.replaced;
      newSession.__rc_callStatus = sessionStatus.connected;
      newSession.__rc_direction = callDirections.inbound;
      this._addSession(newSession);
      this._onAccepted(newSession);
    });
    session.on('muted', () => {
      console.log('Event: Muted');
      session.__rc_isOnMute = true;
      session.__rc_callStatus = sessionStatus.onMute;
      this._updateSessions();
    });
    session.on('unmuted', () => {
      console.log('Event: Unmuted');
      session.__rc_isOnMute = false;
      session.__rc_callStatus = sessionStatus.connected;
      this._updateSessions();
    });
    session.on('SessionDescriptionHandler-created', () => {
      session.sessionDescriptionHandler.on('userMediaFailed', () => {
        this._audioSettings.onGetUserMediaError();
      });
    });
  }

  _onInvite(session) {
    session.__rc_creationTime = Date.now();
    session.__rc_lastActiveTime = Date.now();
    session.__rc_direction = callDirections.inbound;
    session.__rc_callStatus = sessionStatus.connecting;
    extractHeadersData(session, session.request.headers);
    session.on('rejected', () => {
      console.log('Event: Rejected');
      this._onCallEnd(session);
    });
    session.on('terminated', () => {
      console.log('Event: Terminated');
      this._onCallEnd(session);
    });
    this._onCallRing(session);
  }

  @proxify
  async answer(sessionId) {
    const sipSession = this._sessions.get(sessionId);
    const session = this.sessions.find((session) => session.id === sessionId);
    if (!session || !isRing(session)) {
      return;
    }
    try {
      await this._holdOtherSession(sessionId);
      this._onAccepted(sipSession, 'inbound');
      await sipSession.accept(this.acceptOptions);
      this.store.dispatch({
        // for track
        type: this.actionTypes.callAnswer,
      });
    } catch (e) {
      console.log('Accept failed');
      console.error(e);
      if (e.code !== INCOMING_CALL_INVALID_STATE_ERROR_CODE) {
        // FIXME:
        // 2 means the call is answered
        this._onCallEnd(sipSession);
      }
    }
  }

  @proxify
  async reject(sessionId) {
    const session = this._sessions.get(sessionId);
    if (!session || session.__rc_callStatus === sessionStatus.finished) {
      return;
    }
    try {
      await session.reject();
    } catch (e) {
      console.error(e);
      this._onCallEnd(session);
    }
  }

  @proxify
  async resume(sessionId) {
    await this.unhold(sessionId);
  }

  @proxify
  async forward(sessionId, forwardNumber) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return false;
    }
    try {
      let validatedResult;
      let validPhoneNumber;
      if (!this._permissionCheck) {
        validatedResult = validateNumbers(
          [forwardNumber],
          this._regionSettings,
          this._brand.id,
        );
        validPhoneNumber = validatedResult[0];
      } else {
        validatedResult = await this._numberValidate.validateNumbers([
          forwardNumber,
        ]);
        if (!validatedResult.result) {
          validatedResult.errors.forEach((error) => {
            this._alert.warning({
              message: callErrors[error.type],
              payload: {
                phoneNumber: error.phoneNumber,
              },
            });
          });
          return false;
        }
        validPhoneNumber =
          validatedResult.numbers[0] && validatedResult.numbers[0].e164;
      }
      session.__rc_isForwarded = true;
      await session.forward(validPhoneNumber, this.acceptOptions);
      console.log('Forwarded');
      this._onCallEnd(session);
      this._addTrackAfterForward();
      return true;
    } catch (e) {
      console.error(e);
      this._alert.warning({
        message: webphoneErrors.forwardError,
      });
      this._addTrackAfterForward();
      return false;
    }
  }

  _addTrackAfterForward() {
    if (this.activeSession && !this.activeSession.isOnHold) {
      const rawActiveSession = this._sessions.get(this.activeSession.id);
      this._addTrack(rawActiveSession);
    }
  }

  @proxify
  async mute(sessionId) {
    try {
      this._sessionHandleWithId(sessionId, (session) => {
        session.__rc_isOnMute = true;
        session.mute();
        this._updateSessions();
      });
      return true;
    } catch (e) {
      console.error(e);
      this._alert.warning({
        message: webphoneErrors.muteError,
      });
      return false;
    }
  }

  @proxify
  async unmute(sessionId) {
    this._sessionHandleWithId(sessionId, (session) => {
      session.__rc_isOnMute = false;
      session.unmute();
      this._updateSessions();
    });
  }

  @proxify
  async hold(sessionId) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return false;
    }
    if (session.localHold) {
      return true;
    }
    try {
      await session.hold();
      session.__rc_callStatus = sessionStatus.onHold;
      this._updateSessions();
      this._onCallHold(session);
      return true;
    } catch (e) {
      console.error('hold error:', e);
      this._alert.warning({
        message: webphoneErrors.holdError,
      });
      return false;
    }
  }

  async _holdOtherSession(currentSessionId) {
    await Promise.all(
      Array.from(this._sessions, async ([sessionId, session]) => {
        if (currentSessionId === sessionId) {
          return;
        }
        if (session.localHold) {
          return;
        }
        if (session.__rc_callStatus === sessionStatus.connecting) {
          return;
        }
        try {
          await session.hold();
        } catch (e) {
          console.error('Hold call fail');
          throw e;
        }
        session.__rc_callStatus = sessionStatus.onHold;
        this._onCallHold(session);
      }),
    );
    this._updateSessions();
    // update cached sessions
    this.store.dispatch({
      type: this.actionTypes.onholdCachedSession,
    });
  }

  @proxify
  async unhold(sessionId) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return;
    }
    try {
      if (session.localHold) {
        await this._holdOtherSession(session.id);
        this._onBeforeCallResume(session);
        await session.unhold();
        session.__rc_callStatus = sessionStatus.connected;
        this._updateSessions();
        this._onCallResume(session);
      }
    } catch (e) {
      console.log(e);
    }
  }

  @proxify
  async startRecord(sessionId) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return;
    }
    // If the status of current session is not connected,
    // the recording process can not be started.
    if (session.__rc_callStatus === sessionStatus.connecting) {
      return;
    }
    try {
      session.__rc_recordStatus = recordStatus.pending;
      this._updateSessions();
      await session.startRecord();
      session.__rc_recordStatus = recordStatus.recording;
      this._updateSessions();
    } catch (e) {
      console.error(e);
      session.__rc_recordStatus = recordStatus.idle;
      this._updateSessions();
      // Recording has been disabled
      if (e && e.code === -5) {
        this._alert.danger({
          message: webphoneErrors.recordDisabled,
        });
        // Disabled phone recording
        session.__rc_recordStatus = recordStatus.noAccess;
        this._updateSessions();
        return;
      }
      this._alert.danger({
        message: webphoneErrors.recordError,
        payload: {
          errorCode: e.code,
        },
      });
    }
  }

  @proxify
  async stopRecord(sessionId) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return;
    }
    try {
      session.__rc_recordStatus = recordStatus.pending;
      this._updateSessions();
      await session.stopRecord();
      session.__rc_recordStatus = recordStatus.idle;
      this._updateSessions();
    } catch (e) {
      console.error(e);
      session.__rc_recordStatus = recordStatus.recording;
      this._updateSessions();
    }
  }

  @proxify
  async park(sessionId) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return;
    }
    try {
      const result = await session.park();
      console.log('Parked');
      if (result['park extension']) {
        this._alert.success({
          message: webphoneMessages.parked,
          payload: {
            parkedNumber: `*${result['park extension']}`,
          },
          ttl: 0,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  @proxify
  async transfer(transferNumber, sessionId) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return;
    }
    try {
      session.__rc_isOnTransfer = true;
      this._updateSessions();
      let numberResult;
      let validPhoneNumber;
      if (!this._permissionCheck) {
        numberResult = validateNumbers(
          [transferNumber],
          this._regionSettings,
          this._brand.id,
        );
        validPhoneNumber = numberResult && numberResult[0];
      } else {
        numberResult = await this._numberValidate.validateNumbers([
          transferNumber,
        ]);
        if (!numberResult.result) {
          numberResult.errors.forEach((error) => {
            this._alert.warning({
              message: callErrors[error.type],
              payload: {
                phoneNumber: error.phoneNumber,
              },
            });
          });
          session.__rc_isOnTransfer = false;
          this._updateSessions();
          return;
        }
        validPhoneNumber =
          numberResult.numbers[0] && numberResult.numbers[0].e164;
      }
      await session.transfer(validPhoneNumber);
      session.__rc_isOnTransfer = false;
      this._updateSessions();
      this._onCallEnd(session);
    } catch (e) {
      console.error(e);
      session.__rc_isOnTransfer = false;
      this._updateSessions();
      this._alert.danger({
        message: webphoneErrors.transferError,
      });
    }
  }

  @proxify
  async startWarmTransfer(transferNumber, sessionId) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return;
    }
    try {
      session.__rc_isOnTransfer = true;
      this._updateSessions();
      const numberResult = validateNumbers(
        [transferNumber],
        this._regionSettings,
        this._brand.id,
      );
      const validPhoneNumber = numberResult && numberResult[0];
      const fromNumber =
        session.__rc_direction === callDirections.outbound
          ? session.request.from.uri.user
          : session.request.to.uri.user;
      await this.makeCall({
        toNumber: validPhoneNumber,
        fromNumber,
        homeCountryId: this._regionSettings.homeCountryId,
        extendedControls: '',
        transferSessionId: sessionId,
      });
    } catch (e) {
      console.error(e);
      session.__rc_isOnTransfer = false;
      this._updateSessions();
      this._alert.danger({
        message: webphoneErrors.transferError,
      });
    }
  }

  @proxify
  async completeWarmTransfer(newSessionId) {
    const newSession = this._sessions.get(newSessionId);
    if (!newSession) {
      return;
    }
    const oldSessionId = newSession.__rc_transferSessionId;
    const oldSession = this._sessions.get(oldSessionId);
    if (!oldSession) {
      return;
    }
    newSession.__rc_isOnTransfer = true;
    this._updateSessions();
    try {
      await oldSession.warmTransfer(newSession);
    } catch (e) {
      console.error(e);
      newSession.__rc_isOnTransfer = false;
      this._updateSessions();
      this._alert.danger({
        message: webphoneErrors.transferError,
      });
    }
  }

  @proxify
  async flip(flipValue, sessionId) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return;
    }
    try {
      await session.flip(flipValue);
      // this._onCallEnd(session);
      session.__rc_isOnFlip = true;
      console.log('Flipped');
    } catch (e) {
      session.__rc_isOnFlip = false;
      this._alert.warning({
        message: webphoneErrors.flipError,
      });
      console.error(e);
    }
    this._updateSessions();
  }

  @proxify
  async _sendDTMF(dtmfValue, session) {
    try {
      await session.dtmf(dtmfValue, 100);
    } catch (e) {
      console.error(e);
    }
  }

  @proxify
  async sendDTMF(dtmfValue, sessionId) {
    const session = this._sessions.get(sessionId);
    if (session) {
      await this._sendDTMF(dtmfValue, session);
    }
  }

  @proxify
  async hangup(sessionId) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return;
    }
    try {
      this._onBeforeCallEnd(session);
      await session.terminate();
    } catch (e) {
      console.error(e);
      this._onCallEnd(session);
    }
  }

  @proxify
  async toVoiceMail(sessionId) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return;
    }
    try {
      session.__rc_isToVoicemail = true;
      await session.toVoicemail();
    } catch (e) {
      console.error(e);
      this._onCallEnd(session);
      this._alert.warning({
        message: webphoneErrors.toVoiceMailError,
      });
    }
  }

  @proxify
  async replyWithMessage(sessionId, replyOptions) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return;
    }
    try {
      session.__rc_isReplied = true;
      await session.replyWithMessage(replyOptions);
    } catch (e) {
      console.error(e);
      this._onCallEnd(session);
    }
  }

  _addTrack(rawSession) {
    if (rawSession) {
      rawSession.addTrack(this._remoteVideo, this._localVideo);
    }
  }

  _sessionHandleWithId(sessionId, func) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return null;
    }
    return func(session);
  }

  async _invite(
    toNumber,
    { inviteOptions, extendedControls, transferSessionId },
  ) {
    if (!this._webphone) {
      this._alert.warning({
        message: this.errorCode,
      });
      return null;
    }

    if (
      toNumber.length > 6 &&
      (!this._availabilityMonitor || !this._availabilityMonitor.isVoIPOnlyMode)
    ) {
      const phoneLines = await this._fetchDL();
      if (phoneLines.length === 0) {
        this._alert.warning({
          message: webphoneErrors.noOutboundCallWithoutDL,
        });
        return null;
      }
    }

    await this._holdOtherSession();
    const session = this._webphone.userAgent.invite(toNumber, inviteOptions);
    session.__rc_direction = callDirections.outbound;
    session.__rc_callStatus = sessionStatus.connecting;
    session.__rc_creationTime = Date.now();
    session.__rc_lastActiveTime = Date.now();
    session.__rc_fromNumber = inviteOptions.fromNumber;
    session.__rc_extendedControls = extendedControls;
    session.__rc_extendedControlStatus = extendedControlStatus.pending;
    session.__rc_transferSessionId = transferSessionId;
    this._onAccepted(session);
    this._onCallInit(session);
    return session;
  }

  /**
   * start an outbound call.
   * @param {toNumber} recipient number
   * @param {fromNumber} call Id
   * @param {homeCountryId} homeCountry Id
   */
  @proxify
  async makeCall({
    toNumber,
    fromNumber,
    homeCountryId,
    extendedControls,
    transferSessionId,
  }) {
    const inviteOptions = {
      sessionDescriptionHandlerOptions: this.acceptOptions
        .sessionDescriptionHandlerOptions,
      fromNumber,
      homeCountryId,
    };
    const result = await this._invite(toNumber, {
      inviteOptions,
      extendedControls,
      transferSessionId,
    });
    return result;
  }

  /**
   * switch a active call into web phone session.
   */
  @proxify
  async switchCall({ id, from, direction, to, sipData }, homeCountryId) {
    const extraHeaders = [];
    extraHeaders.push(
      `Replaces: ${id};to-tag=${sipData.fromTag};from-tag=${sipData.toTag}`,
    );
    extraHeaders.push('RC-call-type: replace');
    const toNumber =
      direction === callDirections.outbound ? to.phoneNumber : from.phoneNumber;
    const fromNumber =
      direction === callDirections.outbound ? from.phoneNumber : to.phoneNumber;
    const inviteOptions = {
      sessionDescriptionHandlerOptions: this.acceptOptions
        .sessionDescriptionHandlerOptions,
      fromNumber,
      homeCountryId,
      extraHeaders,
    };
    const session = await this._invite(toNumber, {
      inviteOptions,
    });
    return session;
  }

  @proxify
  async updateSessionMatchedContact(sessionId, contact) {
    this._sessionHandleWithId(sessionId, (session) => {
      session.__rc_contactMatch = contact;
      this._updateSessions();
    });
  }

  @proxify
  setSessionCaching(sessionIds) {
    this.store.dispatch({
      type: this.actionTypes.setSessionCaching,
      cachingSessionIds: sessionIds,
    });
  }

  @proxify
  clearSessionCaching() {
    this.store.dispatch({
      type: this.actionTypes.clearSessionCaching,
      sessions: [...this._sessions.values()].map(normalizeSession),
    });
  }

  _updateSessions() {
    this.store.dispatch({
      type: this.actionTypes.updateSessions,
      sessions: [...this._sessions.values()].map(normalizeSession),
    });
  }

  _addSession(session) {
    this._sessions.set(session.id, session);
    this._updateSessions();
  }

  _removeSession(session) {
    this._sessions.delete(session.id);
    this._updateSessions();
  }

  @proxify
  async toggleMinimized(sessionId) {
    this._sessionHandleWithId(sessionId, (session) => {
      session.__rc_minimized = !session.__rc_minimized;
      this._updateSessions();
    });
  }

  _setActiveWebphoneActiveCallId(session) {
    if (!this._disconnectOnInactive) {
      return;
    }
    const currentId = localStorage.getItem(this._activeWebphoneActiveCallKey);
    if (currentId !== session.id) {
      localStorage.setItem(this._activeWebphoneActiveCallKey, session.id);
    }
  }

  _onCallInit(session) {
    this._addSession(session);
    const normalizedSession = find((x) => x.id === session.id, this.sessions);
    this.store.dispatch({
      type: this.actionTypes.callInit,
      session: normalizedSession,
      sessions: this.sessions,
    });
    if (
      this._contactMatcher &&
      (!this._tabManager || this._tabManager.active)
    ) {
      this._contactMatcher.triggerMatch();
    }
    this._eventEmitter.emit(
      EVENTS.callInit,
      normalizedSession,
      this.activeSession,
    );
    this._setActiveWebphoneActiveCallId(session);
  }

  _onCallStart(session) {
    this._addSession(session);
    const normalizedSession = find((x) => x.id === session.id, this.sessions);
    this.store.dispatch({
      type: this.actionTypes.callStart,
      session: normalizedSession,
      sessions: this.sessions,
    });
    this._eventEmitter.emit(
      EVENTS.callStart,
      normalizedSession,
      this.activeSession,
    );
    this._setActiveWebphoneActiveCallId(session);
  }

  _onCallRing(session) {
    this._addSession(session);
    const normalizedSession = find((x) => x.id === session.id, this.sessions);
    this.store.dispatch({
      type: this.actionTypes.callRing,
      session: normalizedSession,
      sessions: this.sessions,
    });
    if (
      this._contactMatcher &&
      (!this._tabManager || this._tabManager.active)
    ) {
      this._contactMatcher.triggerMatch();
    }
    if (this.activeSession && !isOnHold(this.activeSession)) {
      this._webphone.userAgent.audioHelper.playIncoming(false);
    }
    this._eventEmitter.emit(
      EVENTS.callRing,
      normalizedSession,
      this.ringSession,
    );
  }

  _onBeforeCallEnd(session) {
    const normalizedSession = find((x) => x.id === session.id, this.sessions);
    this._eventEmitter.emit(
      EVENTS.beforeCallEnd,
      normalizedSession,
      this.activeSession,
    );
  }

  _onCallEnd(session) {
    session.__rc_extendedControlStatus = extendedControlStatus.stopped;
    const normalizedSession = find((x) => x.id === session.id, this.sessions);
    if (!normalizedSession) {
      return;
    }
    if (session.__rc_transferSessionId) {
      const transferSession = this._sessions.get(
        session.__rc_transferSessionId,
      );
      if (transferSession) {
        transferSession.__rc_isOnTransfer = false;
      }
    }
    this._removeSession(session);
    this.store.dispatch({
      type: this.actionTypes.callEnd,
      session: normalizedSession,
      sessions: this.sessions,
    });
    this._eventEmitter.emit(
      EVENTS.callEnd,
      normalizedSession,
      this.activeSession,
      this.ringSession,
    );
    this._releaseVideoElementsOnSessionsEmpty();
    this._reconnectWebphoneIfNecessaryOnSessionsEmpty();
    this._makeWebphoneInactiveOnSessionsEmpty();
  }

  _onBeforeCallResume(session) {
    const normalizedSession = find((x) => x.id === session.id, this.sessions);
    this._eventEmitter.emit(
      EVENTS.beforeCallResume,
      normalizedSession,
      this.activeSession,
    );
  }

  _onCallResume(session) {
    const normalizedSession = find((x) => x.id === session.id, this.sessions);
    this.store.dispatch({
      type: this.actionTypes.callResume,
      session: normalizedSession,
    });
    this._eventEmitter.emit(
      EVENTS.callResume,
      normalizedSession,
      this.activeSession,
    );
    this._setActiveWebphoneActiveCallId(session);
  }

  _onCallHold(session) {
    const normalizedSession = find((x) => x.id === session.id, this.sessions);
    this._eventEmitter.emit(
      EVENTS.callHold,
      normalizedSession,
      this.activeSession,
    );
  }

  /**
   * Inform user what is happening with webphone,
   * this will be invoked when webphone itself run into error situation
   */
  @proxify
  async showAlert() {
    if (!this.errorCode) {
      return;
    }
    this._alert.danger({
      message: this.errorCode,
      allowDuplicates: false,
      payload: {
        statusCode: this.statusCode,
      },
    });
  }

  onCallStart(handler) {
    if (typeof handler === 'function') {
      this._eventEmitter.on(EVENTS.callStart, handler);
    }
  }

  onCallInit(handler) {
    if (typeof handler === 'function') {
      this._eventEmitter.on(EVENTS.callInit, handler);
    }
  }

  onCallRing(handler) {
    if (typeof handler === 'function') {
      this._eventEmitter.on(EVENTS.callRing, handler);
    }
  }

  onCallEnd(handler) {
    if (typeof handler === 'function') {
      this._eventEmitter.on(EVENTS.callEnd, handler);
    }
  }

  onBeforeCallResume(handler) {
    if (typeof handler === 'function') {
      this._eventEmitter.on(EVENTS.beforeCallResume, handler);
    }
  }

  onCallResume(handler) {
    if (typeof handler === 'function') {
      this._eventEmitter.on(EVENTS.callResume, handler);
    }
  }

  onCallHold(handler) {
    if (typeof handler === 'function') {
      this._eventEmitter.on(EVENTS.callHold, handler);
    }
  }

  onBeforeCallEnd(handler) {
    if (typeof handler === 'function') {
      this._eventEmitter.on(EVENTS.beforeCallEnd, handler);
    }
  }

  onWebphoneRegistered(handler) {
    if (typeof handler === 'function') {
      this._eventEmitter.on(EVENTS.webphoneRegistered, handler);
      return () => {
        this._eventEmitter.off(EVENTS.webphoneRegistered, handler);
      };
    }
  }

  onWebphoneUnregistered(handler) {
    if (typeof handler === 'function') {
      this._eventEmitter.on(EVENTS.webphoneUnregistered, handler);
      return () => {
        this._eventEmitter.off(EVENTS.webphoneUnregistered, handler);
      };
    }
  }

  loadAudio() {
    if (
      this._webphone &&
      this._webphone.userAgent &&
      this._webphone.userAgent.audioHelper
    ) {
      this._webphone.userAgent.audioHelper.loadAudio({
        incoming: this.incomingAudio,
        outgoing: this.outgoingAudio,
      });
    }
  }

  @proxify
  setOutgoingAudio({ fileName, dataUrl }) {
    // TODO validate filePath?
    this.store.dispatch({
      type: this.actionTypes.setOutgoingAudio,
      fileName,
      dataUrl,
    });
    this.loadAudio();
  }

  @proxify
  resetOutgoingAudio() {
    this.store.dispatch({
      type: this.actionTypes.resetOutgoingAudio,
    });
    this.loadAudio();
  }

  @proxify
  setIncomingAudio({ fileName, dataUrl }) {
    // TODO validate filePath?
    this.store.dispatch({
      type: this.actionTypes.setIncomingAudio,
      fileName,
      dataUrl,
    });
    this.loadAudio();
  }

  @proxify
  resetIncomingAudio() {
    this.store.dispatch({
      type: this.actionTypes.resetIncomingAudio,
    });
    this.loadAudio();
  }

  @proxify
  setRingtone({
    incomingAudio,
    incomingAudioFile,
    outgoingAudio,
    outgoingAudioFile,
  }) {
    const isIncomingDefault =
      incomingAudioFile === DEFAULT_AUDIO &&
      incomingAudio === defaultIncomingAudio;
    const isOutgoingDefault =
      outgoingAudioFile === DEFAULT_AUDIO &&
      outgoingAudio === defaultOutgoingAudio;
    this.store.dispatch({
      type: this.actionTypes.setRingtone,
      incomingAudio: isIncomingDefault ? null : incomingAudio,
      incomingAudioFile: isIncomingDefault ? DEFAULT_AUDIO : incomingAudioFile,
      outgoingAudio: isOutgoingDefault ? null : outgoingAudio,
      outgoingAudioFile: isOutgoingDefault ? DEFAULT_AUDIO : outgoingAudioFile,
    });
    this.loadAudio();
  }

  get status() {
    return this.state.status;
  }

  get originalSessions() {
    return this._sessions;
  }

  get ready() {
    return this.state.status === moduleStatuses.ready;
  }

  get pending() {
    return this.state.status === moduleStatuses.pending;
  }

  get ringSessionId() {
    return this.state.ringSessionId;
  }

  get activeSessionId() {
    return this.state.activeSessionId;
  }

  @selector
  sessionPhoneNumbers = [
    () => this.sessions,
    (sessions) => {
      const outputs = [];
      sessions.forEach((session) => {
        outputs.push(session.to);
        outputs.push(session.from);
      });
      return outputs;
    },
  ];

  /**
   * Current active session(Outbound and InBound that answered)
   */
  @selector
  activeSession = [
    () => this.activeSessionId,
    () => this.sessions,
    (activeSessionId, sessions) => {
      if (!activeSessionId) {
        return null;
      }
      const activeSession = find(
        (session) => session.id === activeSessionId,
        sessions,
      );
      return activeSession;
    },
  ];

  /**
   * Current ring session(inbound)
   */
  @selector
  ringSession = [
    () => this.ringSessionId,
    () => this.sessions,
    (ringSessionId, sessions) => {
      if (!ringSessionId) {
        return null;
      }
      const ringSession = find(
        (session) => session.id === ringSessionId,
        sessions,
      );
      return ringSession;
    },
  ];

  get sessions() {
    return this.state.sessions;
  }

  @selector
  ringSessions = [
    () => this.sessions,
    (sessions) => filter((session) => isRing(session), sessions),
  ];

  @selector
  onHoldSessions = [
    () => this.sessions,
    (sessions) => filter((session) => isOnHold(session), sessions),
  ];

  get lastEndedSessions() {
    return this.state.lastEndedSessions;
  }

  @selector
  cachedSessions = [
    () => this.sessions,
    (sessions) => filter((session) => session.cached, sessions),
  ];

  get videoElementPrepared() {
    return this.state.videoElementPrepared;
  }

  get enabled() {
    return this._rolesAndPermissions.webphoneEnabled;
  }

  get connectionStatus() {
    return this.state.connectionStatus;
  }

  get connectRetryCounts() {
    return this.state.connectRetryCounts;
  }

  get acceptOptions() {
    return {
      sessionDescriptionHandlerOptions: {
        constraints: {
          audio: {
            deviceId: this._audioSettings.inputDeviceId,
          },
          video: false,
        },
      },
    };
  }

  get isOnTransfer() {
    return this.activeSession && this.activeSession.isOnTransfer;
  }

  get errorCode() {
    return this.state.errorCode;
  }

  get statusCode() {
    return this.state.statusCode;
  }

  get device() {
    return this.state.device;
  }

  get disconnecting() {
    return this.connectionStatus === connectionStatus.disconnecting;
  }

  get inactiveDisconnecting() {
    return this.connectionStatus === connectionStatus.inactiveDisconnecting;
  }

  get inactive() {
    return this.connectionStatus === connectionStatus.inactive;
  }

  get connecting() {
    return this.connectionStatus === connectionStatus.connecting;
  }

  get reconnecting() {
    return this.connectionStatus === connectionStatus.reconnecting;
  }

  get connected() {
    return this.connectionStatus === connectionStatus.connected;
  }

  get disconnected() {
    return this.connectionStatus === connectionStatus.disconnected;
  }

  get connectFailed() {
    return this.connectionStatus === connectionStatus.connectFailed;
  }

  get connectError() {
    return this.connectionStatus === connectionStatus.connectError;
  }

  /*
   * Together with `CallingSettings` module to check if webphone is
   * Unavailable.
   */
  get isUnavailable() {
    return (
      this.ready &&
      this._auth.loggedIn &&
      (!this._audioSettings.userMedia ||
        this.reconnecting ||
        this.connectError ||
        this.inactive)
    );
  }

  get incomingAudioFile() {
    return this._storage.getItem(this._storageKey).incomingAudioFile;
  }

  get incomingAudioDataUrl() {
    return this._storage.getItem(this._storageKey).incomingAudioDataUrl;
  }

  get incomingAudio() {
    return this.incomingAudioDataUrl || defaultIncomingAudio;
  }

  get outgoingAudioFile() {
    return this._storage.getItem(this._storageKey).outgoingAudioFile;
  }

  get outgoingAudioDataUrl() {
    return this._storage.getItem(this._storageKey).outgoingAudioDataUrl;
  }

  get outgoingAudio() {
    return this.outgoingAudioDataUrl || defaultOutgoingAudio;
  }

  get defaultIncomingAudio() {
    return defaultIncomingAudio;
  }

  get defaultOutgoingAudio() {
    return defaultOutgoingAudio;
  }

  get defaultIncomingAudioFile() {
    return DEFAULT_AUDIO;
  }

  get defaultOutgoingAudioFile() {
    return DEFAULT_AUDIO;
  }

  @selector
  ringingCallOnView = [
    () => this.ringSessions,
    (sessions) => find((session) => !session.minimized, sessions),
  ];
}
