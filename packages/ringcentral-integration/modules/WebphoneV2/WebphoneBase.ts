import CreateSipRegistrationResponse from '@rc-ex/core/definitions/CreateSipRegistrationResponse';
import SipRegistrationDeviceInfo from '@rc-ex/core/definitions/SipRegistrationDeviceInfo';
import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
  track,
  watch,
} from '@ringcentral-integration/core';
import { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';
import { EventEmitter } from 'events';
import PhoneLinesInfo from 'ringcentral-client/build/definitions/PhoneLinesInfo';
import RingCentralWebphone from 'ringcentral-web-phone';
import defaultIncomingAudio from 'ringcentral-web-phone/audio/incoming.ogg';
import defaultOutgoingAudio from 'ringcentral-web-phone/audio/outgoing.ogg';
import { WebPhoneUserAgent } from 'ringcentral-web-phone/lib/userAgent';
import { WebphoneSession } from '../../interfaces/Webphone.interface';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import sleep from '../../lib/sleep';
import { trackEvents } from '../Analytics';
import { SipInstanceManager } from '../../lib/SipInstanceManager';
import { connectionStatus } from './connectionStatus';
import { EVENTS } from './events';
import { Deps } from './Webphone.interface';
import { webphoneErrors } from './webphoneErrors';
import {
  isBrowserSupport,
  isChrome,
  isEnableMidLinesInSDP,
} from './webphoneHelper';

export const DEFAULT_AUDIO = 'default';

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
  name: 'Webphone',
  deps: [
    'Auth',
    'Alert',
    'Client',
    'NumberValidate',
    'AppFeatures',
    'ExtensionFeatures',
    'Brand',
    'RegionSettings',
    'AudioSettings',
    'Storage',
    { dep: 'AvailabilityMonitor', optional: true },
    { dep: 'TabManager', optional: true },
    { dep: 'ContactMatcher', optional: true },
    { dep: 'Prefix', optional: true },
    { dep: 'WebphoneOptions', optional: true },
  ],
})
export class WebphoneBase extends RcModuleV2<Deps> {
  protected _reconnectDelays = AUTO_RETRIES_DELAY;
  protected _disconnectOnInactive: boolean;
  protected _activeWebphoneKey: string;
  protected _webphoneInstanceKey: string;

  protected _webphone?: RingCentralWebphone;
  protected _sipInstanceManager: WebphoneInstanceManager;
  protected _remoteVideo?: HTMLVideoElement;
  protected _localVideo?: HTMLVideoElement;
  protected _sipInstanceId?: string;

  protected _connectTimeout?: NodeJS.Timeout;
  protected _isFirstRegister: boolean;
  protected _reconnectAfterSessionEnd?: { reason?: string };
  protected _disconnectInactiveAfterSessionEnd: boolean;
  protected _eventEmitter: EventEmitter;
  protected _stopWebphoneUserAgentPromise?: Promise<unknown> = null;
  protected _removedWebphoneAtBeforeUnload: boolean;

  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'Webphone',
    });
    this._disconnectOnInactive =
      deps.webphoneOptions?.disconnectOnInactive ?? false;
    this._activeWebphoneKey = `${deps.prefix}-active-webphone-key`;

    this._webphone = null;
    this._remoteVideo = null;
    this._localVideo = null;
    this._reconnectAfterSessionEnd = null;
    this._disconnectInactiveAfterSessionEnd = false;
    this._connectTimeout = null;
    this._isFirstRegister = true;
    this._eventEmitter = new EventEmitter();
    this._sipInstanceManager = new SipInstanceManager(
      `${deps.prefix}-webphone-inactive-sip-instance`,
    );
    this._removedWebphoneAtBeforeUnload = false;
  }

  @state
  videoElementPrepared: boolean = false;

  @state
  connectionStatus: ObjectMapValue<typeof connectionStatus> =
    connectionStatus.disconnected;

  @state
  connectRetryCounts: number = 0;

  @state
  errorCode?: string = null;

  @state
  statusCode?: number = null;

  @state
  device?: SipRegistrationDeviceInfo = null;

  @action
  _setVideoElementPrepared(prepared: boolean) {
    this.videoElementPrepared = prepared;
  }

  @action
  _setConnectionStatus(status: ObjectMapValue<typeof connectionStatus>) {
    this.connectionStatus = status;
  }

  @action
  _setStateOnConnectError(errorCode?: string, statusCode?: number) {
    this.connectionStatus = connectionStatus.connectError;
    this.device = null;
    if (errorCode) {
      this.errorCode = errorCode;
    }
    if (statusCode) {
      this.statusCode = statusCode;
    }
  }

  @action
  _setStateOnConnectFailed(errorCode?: string, statusCode?: number) {
    this.connectionStatus = connectionStatus.connectFailed;
    this.device = null;
    if (errorCode) {
      this.errorCode = errorCode;
    }
    if (statusCode) {
      this.statusCode = statusCode;
    }
  }

  @action
  _setStateOnConnect() {
    this.connectionStatus = connectionStatus.connecting;
    this.device = null;
    this.connectRetryCounts += 1;
  }

  @action
  _setStateOnReconnect() {
    this.connectionStatus = connectionStatus.reconnecting;
    this.device = null;
    this.connectRetryCounts += 1;
  }

  @track(trackEvents.webRTCRegistration)
  @action
  _setStateOnRegistered(device: SipRegistrationDeviceInfo) {
    this.connectionStatus = connectionStatus.connected;
    this.device = device;
    this.errorCode = null;
    this.statusCode = null;
    this.connectRetryCounts = 0;
  }

  @action
  _setStateOnUnregistered() {
    this.connectionStatus = connectionStatus.disconnected;
    this.device = null;
    this.connectRetryCounts = 0;
  }

  @action
  _setStateWhenUnregisteredOnInactive() {
    this.connectionStatus = connectionStatus.inactive;
    this.device = null;
    this.connectRetryCounts = 0;
  }

  @action
  _setStoreOnDisconnect() {
    this.connectionStatus = connectionStatus.disconnecting;
    this.device = null;
  }

  @action
  _setDevice(device?: { id: string }) {
    this.device = device;
  }

  @action
  _setRetryCounts(retryCounts: number) {
    this.connectRetryCounts = retryCounts;
  }

  get incomingAudioFile() {
    return this.data.incomingAudioFile;
  }

  get incomingAudioDataUrl() {
    return this.data.incomingAudioDataUrl;
  }

  get outgoingAudioFile() {
    return this.data.outgoingAudioFile;
  }

  get outgoingAudioDataUrl() {
    return this.data.outgoingAudioDataUrl;
  }

  @storage
  @state
  data: {
    incomingAudioFile: string;
    incomingAudioDataUrl: string;
    outgoingAudioFile: string;
    outgoingAudioDataUrl: string;
  } = {
    incomingAudioFile: DEFAULT_AUDIO,
    incomingAudioDataUrl: null,
    outgoingAudioFile: DEFAULT_AUDIO,
    outgoingAudioDataUrl: null,
  };

  @action
  _setRingtoneIntoStorage(
    incomingAudioFile?: string,
    incomingAudioDataUrl?: string,
    outgoingAudioFile?: string,
    outgoingAudioDataUrl?: string,
  ) {
    this.data.incomingAudioFile = incomingAudioFile;
    this.data.incomingAudioDataUrl = incomingAudioDataUrl;
    this.data.outgoingAudioFile = outgoingAudioFile;
    this.data.outgoingAudioDataUrl = outgoingAudioDataUrl;
  }

  @action
  _setIncomingAudioIntoStorage(fileName: string, dataUrl: string) {
    this.data.incomingAudioFile = fileName;
    this.data.incomingAudioDataUrl = dataUrl;
  }

  @action
  _resetIncomingAudio() {
    this.data.incomingAudioFile = DEFAULT_AUDIO;
    this.data.incomingAudioDataUrl = null;
  }

  @action
  _setOutgoingAudioIntoStorage(fileName: string, dataUrl: string) {
    this.data.outgoingAudioFile = fileName;
    this.data.outgoingAudioDataUrl = dataUrl;
  }

  @action
  _resetOutgoingAudio() {
    this.data.outgoingAudioFile = DEFAULT_AUDIO;
    this.data.outgoingAudioDataUrl = null;
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

    this._remoteVideo.volume = this._deps.audioSettings.callVolume;
    if (this._deps.audioSettings.supportDevices) {
      if (
        this._remoteVideo.setSinkId &&
        this._deps.audioSettings.outputDeviceId
      ) {
        this._remoteVideo.setSinkId(this._deps.audioSettings.outputDeviceId);
      }
    }

    this._setVideoElementPrepared(true);
  }

  async _initModule() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      if (document.readyState === 'loading') {
        window.addEventListener('load', () => {
          this._prepareVideoElement();
        });
      } else {
        this._prepareVideoElement();
      }
      window.addEventListener('beforeunload', () => {
        if (!this._webphone) {
          return;
        }
        if (Object.keys(this.originalSessions).length > 0) {
          return;
        }
        this._removedWebphoneAtBeforeUnload = true;
        // disconnect webphone at beforeunload if there are not active sessions
        this._disconnect();
        // set timeout to reconnect web phone is before unload cancel
        setTimeout(() => {
          this._removedWebphoneAtBeforeUnload = false;
          this.connect({
            force: true,
            skipConnectDelay: true,
            skipDLCheck: true,
          });
        }, 4000);
      });
      window.addEventListener('unload', () => {
        // mark current instance id as inactive, so app can reuse it after refresh
        if (this._sipInstanceId) {
          this._sipInstanceManager.setInstanceInactive(
            this._sipInstanceId,
            this._deps.auth.endpointId,
          );
          this._sipInstanceId = null;
        }
        // disconnect if web phone is not disconnected at beforeunload
        if (!this._removedWebphoneAtBeforeUnload) {
          this._disconnect();
        }
        this._removeCurrentInstanceFromActiveWebphone();
      });
    }
    this._createOtherWebphoneInstanceListener();
    await super._initModule();
  }

  onInitOnce() {
    this._deps.auth.addBeforeLogoutHandler(async () => {
      this._sipInstanceId = null;
      await this._disconnect();
    });
    watch(
      this,
      () => this.shouldUpdateRingtoneVolume,
      () => {
        if (this.ready && this._webphone && this._webphone.userAgent) {
          const ringtoneMuted = this._deps.audioSettings.ringtoneMuted;
          this._webphone.userAgent.audioHelper.setVolume(
            ringtoneMuted ? 0 : this._deps.audioSettings.ringtoneVolume,
          );
        }
      },
    );
    watch(
      this,
      () => this._deps.audioSettings.callVolume,
      () => {
        if (this.ready && this._remoteVideo) {
          this._remoteVideo.volume = this._deps.audioSettings.callVolume;
        }
      },
    );
    watch(
      this,
      () => this.shouldSetSinkId,
      () => {
        if (
          this.ready &&
          this._deps.audioSettings.supportDevices &&
          this._remoteVideo &&
          this._remoteVideo.setSinkId
        ) {
          this._remoteVideo.setSinkId(this._deps.audioSettings.outputDeviceId);
        }
      },
    );
    watch(
      this,
      () => this.shouldTriggerOnTabActive,
      () => {
        if (
          this.ready &&
          this._deps.tabManager?.ready &&
          this._deps.tabManager?.active
        ) {
          this._onTabActive();
        }
      },
    );
  }

  @computed((that: WebphoneBase) => [
    that.ready,
    that._deps.audioSettings.ringtoneVolume,
    that._deps.audioSettings.ringtoneMuted,
  ])
  get shouldUpdateRingtoneVolume(): any[] {
    return [
      this.ready,
      this._deps.audioSettings.ringtoneVolume,
      this._deps.audioSettings.ringtoneMuted,
    ];
  }

  @computed((that: WebphoneBase) => [
    that.ready,
    that._deps.audioSettings.supportDevices,
    that._deps.audioSettings.outputDeviceId,
  ])
  get shouldSetSinkId(): any[] {
    return [
      this.ready,
      this._deps.audioSettings.supportDevices,
      this._deps.audioSettings.outputDeviceId,
    ];
  }

  @computed((that: WebphoneBase) => [
    that.ready,
    that._deps.tabManager?.ready,
    that._deps.tabManager?.active,
  ])
  get shouldTriggerOnTabActive(): any[] {
    return [
      this.ready,
      this._deps.tabManager?.ready,
      this._deps.tabManager?.active,
    ];
  }

  _shouldInit() {
    return (
      this._deps.auth.loggedIn &&
      this._deps.appFeatures.ready &&
      this._deps.extensionFeatures.ready &&
      this._deps.numberValidate.ready &&
      this._deps.audioSettings.ready &&
      this._deps.storage.ready &&
      (!this._deps.tabManager || this._deps.tabManager.ready) &&
      this.pending
    );
  }

  _shouldReset() {
    return (
      (!this._deps.auth.loggedIn ||
        !this._deps.appFeatures.ready ||
        !this._deps.extensionFeatures.ready ||
        !this._deps.numberValidate.ready ||
        (!!this._deps.tabManager && !this._deps.tabManager.ready) ||
        !this._deps.audioSettings.ready) &&
      this.ready
    );
  }

  @proxify
  async _sipProvision(): Promise<CreateSipRegistrationResponse> {
    const response = await this._deps.client.service
      .platform()
      .post('/restapi/v1.0/client-info/sip-provision', {
        sipInfo: [{ transport: 'WSS' }],
      });
    return response.json();
  }

  async _fetchDL() {
    const response = await this._deps.client
      .account()
      .extension()
      .device()
      .list();
    const devices = response.records;
    let phoneLines: PhoneLinesInfo[] = [];
    devices.forEach((device) => {
      if (
        !device.phoneLines ||
        (device.phoneLines as PhoneLinesInfo[]).length === 0
      ) {
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
      // clean audio instances at web phone sdk
      this._webphone.userAgent.audioHelper.loadAudio({});
    } catch (e) {
      console.error(e);
      // ignore clean listener error
    }
    this._webphone = null;
  }

  _waitUnregistered(userAgent: WebPhoneUserAgent) {
    return new Promise((resolve, reject) => {
      let timeout = setTimeout(() => {
        timeout = null;
        reject(new Error('unregistered timeout'));
      }, 2000);
      userAgent.once('unregistered', () => {
        if (timeout) {
          clearTimeout(timeout);
        }
        resolve();
      });
    });
  }

  async _createWebphone(provisionData: CreateSipRegistrationResponse) {
    await this._removeWebphone();
    if (!this._sipInstanceId) {
      this._sipInstanceId = this._sipInstanceManager.getInstanceId(
        this._deps.auth.endpointId,
      );
    }
    this._webphone = new RingCentralWebphone(provisionData, {
      appKey: this._deps.webphoneOptions.appKey,
      appName: this._deps.webphoneOptions.appName,
      appVersion: this._deps.webphoneOptions.appVersion,
      uuid: this._deps.auth.endpointId,
      logLevel: this._deps.webphoneOptions.webphoneLogLevel ?? 1, // error 0, warn 1, log: 2, debug: 3
      audioHelper: {
        enabled: true, // enables audio feedback when web phone is ringing or making a call
      },
      media: {
        remote: this._remoteVideo,
        local: this._localVideo,
      },
      enableQos: isChrome(),
      enableMidLinesInSDP: isEnableMidLinesInSDP(),
      instanceId: this._sipInstanceId, // reuse sip instance id to avoid 603 issue at reconnection
      ...(this._deps.webphoneOptions.webphoneSDKOptions ?? {}),
    });
    this.loadAudio();
    this._webphone.userAgent.audioHelper.setVolume(
      this._deps.audioSettings.ringtoneMuted
        ? 0
        : this._deps.audioSettings.ringtoneVolume,
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
      this._onInvite(session as WebphoneSession);
    });
    // this._webphone.userAgent.on('inviteSent', (session) => {
    //   console.log('UA invite');
    //   this._addSession(session as WebphoneSession);
    // });
    // sip provision expired
    this._webphone.userAgent.on('provisionUpdate', () => {
      if (Object.keys(this.originalSessions).length === 0) {
        this._deps.alert.warning({
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
        this._deps.alert.warning({
          message: webphoneErrors.serverConnecting,
          allowDuplicates: false,
        });
        this._setStateOnReconnect();
      }
    });
    // Server connection closed event after 10 time retry with primary server and backup server
    this._webphone.userAgent.transport.on('closed', () => {
      console.log('web phone closed event');
      this._setRetryCounts(20);
      this._onConnectError({
        errorCode: webphoneErrors.connectFailed,
        ttl: 0,
      });
    });
    this._webphone.userAgent.transport.on('transportError', () => {
      console.log('WebSocket transportError occurred');
    });
    this._webphone.userAgent.transport.on('wsConnectionError', () => {
      this._setConnectionStatus(connectionStatus.connectError);
    });
    // Timeout to switch back to primary server
    this._webphone.userAgent.transport.on('switchBackProxy', () => {
      if (Object.keys(this.originalSessions).length === 0) {
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

  // eslint-disable-next-line
  _onInvite(session: WebphoneSession) {
    // override
  }

  @proxify
  async _connect() {
    if (!this._deps.auth.loggedIn) {
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
        this._deps.extensionFeatures.fetchData();
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
    if (!this._deps.tabManager || this._deps.tabManager.active) {
      return;
    }
    await sleep(INACTIVE_SLEEP_DELAY);
    await this._waitStillTabActive();
  }

  _isAvailableToConnect({ force }: { force: boolean }) {
    if (!this.enabled || !this._deps.auth.loggedIn) {
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
      this._setStateOnConnectError(webphoneErrors.browserNotSupported, null);
      this._deps.alert.warning({
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
    if (this.connectError || force) {
      this._setStateOnReconnect();
    } else {
      this._setStateOnConnect();
    }
    const connectDelay = this._deps.webphoneOptions.connectDelay ?? 0;
    if (!skipConnectDelay && connectDelay > 0) {
      await sleep(connectDelay);
    }
    if (!skipDLCheck) {
      try {
        if (!this._deps.auth.loggedIn) {
          return;
        }
        const phoneLines = await this._fetchDL();
        if (phoneLines.length === 0) {
          this._deps.alert.warning({
            message: webphoneErrors.noOutboundCallWithoutDL,
          });
        }
      } catch (error) {
        console.error('fetch DL failed', error);
        this._deps.alert.warning({
          message: webphoneErrors.checkDLError,
          allowDuplicates: false,
        });
      }
    }
    if (this.disconnected || this.disconnecting || !this._deps.auth.loggedIn) {
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

  _getConnectTimeoutTtl() {
    if (this.connectRetryCounts < 7) {
      return this._reconnectDelays[this.connectRetryCounts];
    }
    return this._reconnectDelays[6];
  }

  async _onConnectError({
    errorCode,
    statusCode,
    ttl,
  }: {
    errorCode?: string;
    statusCode?: number;
    ttl?: number;
  }) {
    if (statusCode === 403 && this._sipInstanceId) {
      // recreate sip instance id if server send 403
      this._sipInstanceId = null;
    }
    if (
      this.connectRetryCounts > 2 ||
      this.reconnecting ||
      this.connected ||
      this.connectError
    ) {
      this._setStateOnConnectError(errorCode, statusCode);
      this._deps.alert.danger({
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
    this._setStateOnConnectFailed(errorCode, statusCode);
    if (this.connectRetryCounts === 1) {
      this._deps.alert.warning({
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

  _onWebphoneRegistered(provisionData: CreateSipRegistrationResponse) {
    this._setStateOnRegistered(provisionData.device);
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
    this._setStateOnConnectError();
    this._eventEmitter.emit(EVENTS.webphoneUnregistered);
  }

  _setCurrentInstanceAsActiveWebphone() {
    if (this._disconnectOnInactive && this._deps.tabManager) {
      localStorage.setItem(this._activeWebphoneKey, this._deps.tabManager.id);
    }
  }

  _removeCurrentInstanceFromActiveWebphone() {
    if (this._disconnectOnInactive && this._deps.tabManager) {
      const activeWebphoneInstance = localStorage.getItem(
        this._activeWebphoneKey,
      );
      if (activeWebphoneInstance === this._deps.tabManager.id) {
        localStorage.removeItem(this._activeWebphoneKey);
      }
    }
  }

  _createOtherWebphoneInstanceListener() {
    if (!this._disconnectOnInactive || !this._deps.tabManager) {
      return;
    }
    window.addEventListener('storage', (e) => {
      this._onStorageChangeEvent(e);
    });
  }

  _onStorageChangeEvent(e: StorageEvent) {
    // disconnect to inactive when other tabs' web phone connected
    if (e.key === this._activeWebphoneKey) {
      if (!this.connected || !document.hidden) {
        return;
      }
      if (e.newValue === this._deps.tabManager.id) {
        return;
      }
      if (Object.keys(this.originalSessions).length === 0) {
        this._disconnectToInactive();
        return;
      }
      this._disconnectInactiveAfterSessionEnd = true;
    }
  }

  async _disconnectToInactive() {
    this._setConnectionStatus(connectionStatus.inactiveDisconnecting);
    this._setDevice(null);
    await this._removeWebphone();
    this._setStateWhenUnregisteredOnInactive();
  }

  _makeWebphoneInactiveOnSessionsEmpty() {
    if (
      this._disconnectInactiveAfterSessionEnd &&
      Object.keys(this.originalSessions).length === 0
    ) {
      this._disconnectInactiveAfterSessionEnd = false;
      if (!document.hidden) {
        // set to active
        if (this._deps.tabManager && this._deps.tabManager.active) {
          this._setCurrentInstanceAsActiveWebphone();
        }
        return;
      }
      this._disconnectToInactive();
    }
  }

  async _onTabActive() {
    if (!this._disconnectOnInactive) {
      return;
    }
    if (this.connected) {
      this._setCurrentInstanceAsActiveWebphone();
      return;
    }
    await sleep(500);
    if (!this._deps.tabManager.active) {
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
    const alertIds = this._deps.alert.messages
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
      this._deps.alert.dismiss(alertIds);
    }
  }

  async _hideConnectFailedAlert() {
    const alertIds = this._deps.alert.messages
      .filter((m) => {
        for (let i = 0, len = registerErrors.length; i < len; i += 1) {
          if (m.message === registerErrors[i] && !m.payload.isConnecting)
            return true;
        }
        return false;
      })
      .map((m) => m.id);
    if (alertIds.length) {
      this._deps.alert.dismiss(alertIds);
    }
  }

  _hideRegisterErrorAlert() {
    const alertIds = this._deps.alert.messages
      .filter((m) => {
        for (let i = 0, len = registerErrors.length; i < len; i += 1) {
          if (m.message === registerErrors[i]) return true;
        }
        return false;
      })
      .map((m) => m.id);
    if (alertIds.length) {
      this._deps.alert.dismiss(alertIds);
    }
  }

  async _disconnect() {
    if (this.disconnected || this.disconnecting) {
      return;
    }
    if (this._connectTimeout) {
      clearTimeout(this._connectTimeout);
    }
    this._setStoreOnDisconnect();
    if (this._webphone) {
      await this._removeWebphone();
    }
    this._setStateOnUnregistered();
  }

  @proxify
  async disconnect() {
    this._sipInstanceId = null;
    await this._disconnect();
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
    this._deps.alert.danger({
      message: this.errorCode,
      allowDuplicates: false,
      payload: {
        statusCode: this.statusCode,
      },
    });
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
  async setOutgoingAudio({
    fileName,
    dataUrl,
  }: {
    fileName: string;
    dataUrl: string;
  }) {
    // TODO validate filePath?
    this._setOutgoingAudioIntoStorage(fileName, dataUrl);
    this.loadAudio();
  }

  @proxify
  async resetOutgoingAudio() {
    this._resetOutgoingAudio();
    this.loadAudio();
  }

  @proxify
  async setIncomingAudio({
    fileName,
    dataUrl,
  }: {
    fileName: string;
    dataUrl: string;
  }) {
    // TODO validate filePath?
    this._setIncomingAudioIntoStorage(fileName, dataUrl);
    this.loadAudio();
  }

  @proxify
  async resetIncomingAudio() {
    this._resetIncomingAudio();
    this.loadAudio();
  }

  @proxify
  async setRingtone({
    incomingAudio,
    incomingAudioFile,
    outgoingAudio,
    outgoingAudioFile,
  }: {
    incomingAudio: string;
    incomingAudioFile: string;
    outgoingAudio: string;
    outgoingAudioFile: string;
  }) {
    const isIncomingDefault =
      incomingAudioFile === DEFAULT_AUDIO &&
      incomingAudio === defaultIncomingAudio;
    const isOutgoingDefault =
      outgoingAudioFile === DEFAULT_AUDIO &&
      outgoingAudio === defaultOutgoingAudio;
    this._setRingtoneIntoStorage(
      isIncomingDefault ? DEFAULT_AUDIO : incomingAudioFile,
      isIncomingDefault ? null : incomingAudio,
      isOutgoingDefault ? DEFAULT_AUDIO : outgoingAudioFile,
      isOutgoingDefault ? null : outgoingAudio,
    );
    this.loadAudio();
  }

  get originalSessions() {
    return (this._webphone?.userAgent.sessions ?? {}) as {
      [key: string]: WebphoneSession;
    };
  }

  // for backward compatibility v1
  get _sessions() {
    return new Map(Object.entries(this.originalSessions));
  }

  get enabled() {
    return this._deps.appFeatures.isWebPhoneEnabled;
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
      this._deps.auth.loggedIn &&
      (!this._deps.audioSettings.userMedia ||
        this.reconnecting ||
        this.connectError ||
        this.inactive)
    );
  }

  get incomingAudio() {
    return this.incomingAudioDataUrl || this.defaultIncomingAudio;
  }

  get outgoingAudio() {
    return this.outgoingAudioDataUrl || this.defaultOutgoingAudio;
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
}
