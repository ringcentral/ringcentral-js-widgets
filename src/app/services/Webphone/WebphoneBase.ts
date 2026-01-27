import type CreateSipRegistrationResponse from '@rc-ex/core/lib/definitions/CreateSipRegistrationResponse';
import type SipRegistrationDeviceInfo from '@rc-ex/core/lib/definitions/SipRegistrationDeviceInfo';
import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import type { WebphoneSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import { SipInstanceManager } from '@ringcentral-integration/commons/lib/SipInstanceManager';
import { removeNonISO8859Chars } from '@ringcentral-integration/core';
import type { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';
import type {
  AppFeatures,
  Auth,
  Client,
  ExtensionDevice,
  ExtensionFeatures,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  RingCentralExtensions,
  WebSocketSubscription as Subscription,
  track,
} from '@ringcentral-integration/micro-auth/src/app/services';
import type { NumberValidate } from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  Brand,
  type BrowserLogger,
  Toast,
} from '@ringcentral-integration/micro-core/src/app/services';
import type {
  PortManager,
  StoragePlugin,
} from '@ringcentral-integration/next-core';
import {
  action,
  computed,
  delegate,
  dynamic,
  fromWatchValue,
  optional,
  RcModule,
  state,
  storage,
  watch,
} from '@ringcentral-integration/next-core';
import { sleep } from '@ringcentral-integration/utils';
import { EventEmitter } from 'events';
import RingCentralWebphone from 'ringcentral-web-phone';
import type { WebPhoneUserAgent } from 'ringcentral-web-phone/lib/userAgent';
import {
  BehaviorSubject,
  combineLatest,
  firstValueFrom,
  filter,
  map,
  race,
  throwError,
  timeout,
  timer,
} from 'rxjs';

import type { AudioSettings } from '../AudioSettings';

import { WebphoneAudioHelper } from './AudioHelper';
import type { WebphoneOptions } from './Webphone.interface';
import defaultIncomingAudio from './audio/incoming.mp3';
import defaultOutgoingAudio from './audio/outgoing.mp3';
import { connectionStatus } from './connectionStatus';
import { EVENTS } from './events';
import { t } from './i18n';
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

const DEFAULT_WEBSOCKET_RECOVERY_TIMEOUT = 8 * 1000;
const REALTIME_RECOVERY_QUICK_RETRY_LIMIT = 2;

type ToastWebphoneError =
  | 'webphoneCountOverLimit'
  | 'internalServerError'
  | 'serverTimeout'
  | 'unknownError'
  | 'sipProvisionError'
  | 'connectFailed'
  | 'webphoneForbidden'
  | 'requestTimeout';

type WebphoneError =
  | 'provisionUpdate'
  | 'serverConnecting'
  | 'browserNotSupported'
  | ToastWebphoneError;

export class WebphoneBase extends RcModule {
  protected _reconnectDelays = AUTO_RETRIES_DELAY;
  rcWebphoneInstance$ = new BehaviorSubject<RingCentralWebphone | undefined>(
    undefined,
  );

  get _webphone() {
    return this.rcWebphoneInstance$.value;
  }

  _remoteVideo?:
    | (HTMLVideoElement & { setSinkId?: (id: string) => void })
    | null = null;
  _localVideo?: HTMLVideoElement | null = null;
  protected _sipInstanceManager?: SipInstanceManager;
  protected _sipInstanceId?: string | null;

  protected _connectTimeout?: NodeJS.Timeout | null = null;
  private _realtimeRecoveryRetryTimeout?: NodeJS.Timeout | null = null;
  protected _reconnectAfterSessionEnd?: { reason?: string | null } | null =
    null;
  protected _eventEmitter = new EventEmitter();
  protected _stopWebphoneUserAgentPromise?: Promise<unknown> | null = null;
  protected _removedWebphoneAtBeforeUnload = false;

  @dynamic('BrowserLogger')
  protected _browserLogger?: BrowserLogger;

  constructor(
    protected _brand: Brand,
    protected _auth: Auth,
    protected _toast: Toast,
    protected _client: Client,
    protected _numberValidate: NumberValidate,
    protected _appFeatures: AppFeatures,
    protected _extensionFeatures: ExtensionFeatures,
    protected _extensionDevice: ExtensionDevice,
    protected _audioSettings: AudioSettings,
    protected _storage: StoragePlugin,
    protected _portManager: PortManager,
    protected _ringCentralExtensions: RingCentralExtensions,
    @optional('WebphoneOptions')
    protected _webphoneOptions: WebphoneOptions,
    @optional('Subscription')
    protected _subscription?: Subscription,
    @optional('Prefix') protected _prefix?: string,
  ) {
    super();
    this._storage.enable(this);

    if (this._portManager.shared) {
      this._portManager.onMainTab(() => {
        this.initialize();
      });
      this._portManager.onServer(() => {
        this.handleLogout();
        return () => {
          // disconnect webphone when server port switch to client tab
          this.disconnect();
        };
      });
    } else {
      this.initialize();
      this.handleLogout();
    }

    if (globalThis.document) {
      this.handleListeners();
      this._sipInstanceManager = new SipInstanceManager(
        `${this._prefix}-webphone-inactive-sip-instance`,
      );
    }
  }

  isMainClient = true;

  protected handleLogout() {
    this._auth.addBeforeLogoutHandler(async () => {
      await this._beforeLogout();
    });
  }

  @delegate('mainClient')
  async _beforeLogout() {
    this._sipInstanceId = null;
    await this._disconnect();
  }

  @state
  connectionStatus: ObjectMapValue<typeof connectionStatus> =
    connectionStatus.disconnected;

  @state
  connectRetryCounts = 0;

  @state
  realtimeRecoveryRetryCounts = 0;

  @state
  errorCode?: WebphoneError | null = null;

  @state
  statusCode?: number | null = null;

  @state
  device?: SipRegistrationDeviceInfo | null = null;

  @action
  _setConnectionStatus(status: ObjectMapValue<typeof connectionStatus>) {
    this.connectionStatus = status;
  }

  @delegate('server')
  async setConnectionStatus(status: ObjectMapValue<typeof connectionStatus>) {
    this._setConnectionStatus(status);
  }

  @action
  _setStateOnConnectError(
    errorCode?: WebphoneError,
    statusCode?: number | null,
  ) {
    this.connectionStatus = connectionStatus.connectError;
    this.device = null;
    if (errorCode) {
      this.errorCode = errorCode;
    }
    if (statusCode) {
      this.statusCode = statusCode;
    }
  }

  @delegate('server')
  async setStateOnConnectError(
    errorCode?: WebphoneError,
    statusCode?: number | null,
  ) {
    this._setStateOnConnectError(errorCode, statusCode);
  }

  @action
  _setStateOnConnectFailed(errorCode?: WebphoneError, statusCode?: number) {
    this.connectionStatus = connectionStatus.connectFailed;
    this.device = null;
    if (errorCode) {
      this.errorCode = errorCode;
    }
    if (statusCode) {
      this.statusCode = statusCode;
    }
  }

  @delegate('server')
  async setStateOnConnectFailed(
    errorCode?: WebphoneError,
    statusCode?: number,
  ) {
    this._setStateOnConnectFailed(errorCode, statusCode);
  }

  @action
  _setStateOnConnect() {
    this.connectionStatus = connectionStatus.connecting;
    this.device = null;
    this.connectRetryCounts += 1;
  }

  @delegate('server')
  async setStateOnConnect() {
    this._setStateOnConnect();
  }

  @action
  _setStateOnReconnect() {
    this.connectionStatus = connectionStatus.reconnecting;
    this.device = null;
    this.connectRetryCounts += 1;
  }

  @delegate('server')
  async setStateOnReconnect() {
    this._setStateOnReconnect();
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

  @delegate('server')
  async setStateOnRegistered(device: SipRegistrationDeviceInfo) {
    this._setStateOnRegistered(device);
  }

  @action
  _setStateOnUnregistered() {
    this.connectionStatus = connectionStatus.disconnected;
    this.device = null;
    this.connectRetryCounts = 0;
  }

  @delegate('server')
  async setStateOnUnregistered() {
    this._setStateOnUnregistered();
  }

  @action
  _setStateWhenUnregisteredOnInactive() {
    this.connectionStatus = connectionStatus.inactive;
    this.device = null;
    this.connectRetryCounts = 0;
  }

  @delegate('server')
  async setStateWhenUnregisteredOnInactive() {
    this._setStateWhenUnregisteredOnInactive();
  }

  @action
  _setStoreOnDisconnect() {
    if (!this.disconnected) {
      // page unload event async change state with `disconnecting`
      // ensure that the `disconnected` state is not reset to `disconnecting`
      this.connectionStatus = connectionStatus.disconnecting;
    }
    this.device = null;
  }

  @delegate('server')
  async setStoreOnDisconnect() {
    this._setStoreOnDisconnect();
  }

  @action
  _setDevice(device?: { id: string } | null) {
    this.device = device;
  }

  @delegate('server')
  async setDevice(device?: { id: string } | null) {
    this._setDevice(device);
  }

  @action
  _setRetryCounts(retryCounts: number) {
    this.connectRetryCounts = retryCounts;
  }

  @delegate('server')
  async setRetryCounts(retryCounts: number) {
    this._setRetryCounts(retryCounts);
  }

  @action
  _setRealtimeRecoveryRetryCounts(retryCounts: number) {
    this.realtimeRecoveryRetryCounts = retryCounts;
  }

  @delegate('server')
  async setRealtimeRecoveryRetryCounts(retryCounts: number) {
    this._setRealtimeRecoveryRetryCounts(retryCounts);
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
    incomingAudioFile?: string | null;
    incomingAudioDataUrl?: string | null;
    outgoingAudioFile?: string | null;
    outgoingAudioDataUrl?: string | null;
  } = {
    incomingAudioFile: DEFAULT_AUDIO,
    incomingAudioDataUrl: null,
    outgoingAudioFile: DEFAULT_AUDIO,
    outgoingAudioDataUrl: null,
  };

  @action
  _setRingtoneIntoStorage(
    incomingAudioFile?: string | null,
    incomingAudioDataUrl?: string | null,
    outgoingAudioFile?: string | null,
    outgoingAudioDataUrl?: string | null,
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

  private _prepareVideoElement() {
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
  }

  private _destroyVideoElement() {
    if (this._remoteVideo) {
      this._remoteVideo.remove();
      this._remoteVideo = null;
    }
    if (this._localVideo) {
      this._localVideo.remove();
      this._localVideo = null;
    }
  }

  protected initialize() {
    if (!this.disconnected) {
      this.setStateOnUnregistered();
    }
    watch(
      this,
      () => this.shouldUpdateRingtoneVolume,
      () => {
        if (this.ready && this._webphone && this._webphone.userAgent) {
          this._webphone.userAgent.audioHelper.setVolume(
            this._audioSettings.ringtoneVolume,
          );
        }
      },
    );
    watch(
      this,
      () => this._audioSettings.callVolume,
      () => {
        if (this.ready && this._remoteVideo) {
          this._remoteVideo.volume = this._audioSettings.callVolume;
        }
      },
    );
    watch(
      this,
      () => this.shouldSetSinkId,
      () => {
        if (
          this.ready &&
          this._audioSettings.supportDevices &&
          this._remoteVideo &&
          this._remoteVideo.setSinkId
        ) {
          this._remoteVideo.setSinkId(this._audioSettings.outputDeviceId);
        }
      },
    );
    watch(
      this,
      () => this.shouldSetRingtoneSinkId,
      () => {
        if (
          this.ready &&
          this._audioSettings.supportDevices &&
          this._webphone &&
          this._webphone.userAgent &&
          this._webphone.userAgent.audioHelper &&
          // @ts-expect-error
          this._webphone.userAgent.audioHelper.setDeviceId
        ) {
          // @ts-expect-error
          this._webphone.userAgent.audioHelper.setDeviceId(
            this._audioSettings.ringtoneDeviceId,
          );
        }
      },
    );
  }

  protected handleListeners() {
    if (globalThis.document) {
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
      window.addEventListener('pagehide', () => {
        // mark current instance id as inactive, so app can reuse it after refresh
        if (this._sipInstanceId) {
          this._sipInstanceManager!.setInstanceInactive(
            this._sipInstanceId,
            this._auth.endpointId!,
          );
          this._sipInstanceId = null;
        }
        // disconnect if web phone is not disconnected at beforeunload
        if (
          !this._removedWebphoneAtBeforeUnload &&
          (!this._portManager.shared ||
            (this._portManager.shared && this._portManager.isMainTab))
        ) {
          this._disconnect();
        }
        this._destroyVideoElement();
      });
    }
  }

  @computed((that: WebphoneBase) => [
    that.ready,
    that._audioSettings.ringtoneVolume,
  ])
  get shouldUpdateRingtoneVolume(): any[] {
    return [this.ready, this._audioSettings.ringtoneVolume];
  }

  @computed((that: WebphoneBase) => [
    that.ready,
    that._audioSettings.supportDevices,
    that._audioSettings.ringtoneDeviceId,
  ])
  get shouldSetRingtoneSinkId(): any[] {
    return [
      this.ready,
      this._audioSettings.supportDevices,
      this._audioSettings.ringtoneDeviceId,
    ];
  }

  @computed((that: WebphoneBase) => [
    that.ready,
    that._audioSettings.supportDevices,
    that._audioSettings.outputDeviceId,
  ])
  get shouldSetSinkId(): any[] {
    return [
      this.ready,
      this._audioSettings.supportDevices,
      this._audioSettings.outputDeviceId,
    ];
  }

  override _shouldInit() {
    return (
      this._auth.loggedIn &&
      this._appFeatures.ready &&
      this._extensionFeatures.ready &&
      this._numberValidate.ready &&
      this._audioSettings.ready &&
      this.pending
    );
  }

  override _shouldReset() {
    return (
      (!this._auth.loggedIn ||
        !this._appFeatures.ready ||
        !this._extensionFeatures.ready ||
        !this._numberValidate.ready ||
        !this._audioSettings.ready) &&
      this.ready
    );
  }

  @delegate('server')
  async _sipProvision(): Promise<CreateSipRegistrationResponse | undefined> {
    try {
      const response = await this._client.service
        .platform()
        .post('/restapi/v1.0/client-info/sip-provision', {
          sipInfo: [{ transport: 'WSS' }],
        });
      return response.json();
    } catch (error: any) {
      console.error(error, this.connectRetryCounts);
      if (
        error &&
        error.message &&
        error.message.indexOf('Feature [WebPhone] is not available') > -1
      ) {
        this._extensionFeatures.fetchData();
        return;
      }
      this._onConnectError({
        errorCode: 'sipProvisionError',
        statusCode: null,
        ttl: 0,
      });
      return;
    }
  }

  /**
   * Check if the user has a digital line to make outbound calls
   *
   * @returns `true` if DL check passed, false if DL check failed
   */
  validateDeviceLines() {
    if (!this._auth.loggedIn) return false;

    this.logger.log('validateDeviceLines', this._extensionDevice.data);

    // when DL check failed, will not have data in extensionDevice
    if (!this._extensionDevice.data) {
      this._toast.warning({
        message: t('checkDLError', {
          brandName: this._brand.name as string,
        }),
        group: `${this.identifier}_dl_failed`,
        allowDuplicates: false,
      });
      return false;
    }

    const phoneLines = this._extensionDevice.phoneLines;
    if (phoneLines.length === 0) {
      this._toast.warning({
        message: t('noOutboundCallWithoutDL'),
        group: `${this.identifier}_dl_failed`,
      });
      return false;
    }

    return true;
  }

  @delegate('server')
  async _fetchDL() {
    await this._extensionDevice.fetchData();
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
    this.rcWebphoneInstance$.next(undefined);
  }

  _waitUnregistered(userAgent: WebPhoneUserAgent) {
    return new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
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

  @delegate('server')
  protected async _webphoneLogConnector(
    level: 'debug' | 'log' | 'warn' | 'error',
    category: string,
    label: string,
    content: string,
  ) {
    // TODO: filter by log level
    this._browserLogger?.log(category, label, content);
  }

  async _createWebphone(provisionData: CreateSipRegistrationResponse) {
    this.logger.log(`_createWebphone`, provisionData);

    await this._removeWebphone();
    if (!this._sipInstanceId) {
      this._sipInstanceId = this._sipInstanceManager!.getInstanceId(
        this._auth.endpointId!,
      );
    }
    const webphone = new RingCentralWebphone(provisionData, {
      appKey: this._webphoneOptions.appKey,
      appName: removeNonISO8859Chars(this._webphoneOptions.appName),
      appVersion: this._webphoneOptions.appVersion,
      uuid: this._auth.endpointId,
      logLevel: this._webphoneOptions.webphoneLogLevel ?? 2, // error 0, warn 1, log: 2, debug: 3
      builtinEnabled: false,
      // use custom log connector to filter out time strings as it will be duplicated
      connector: (...args: Parameters<WebphoneBase['_webphoneLogConnector']>) =>
        this._webphoneLogConnector(...args),

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
      autoStop: false, // handle auto stop by this module, fix memory leak issue https://github.com/ringcentral/ringcentral-web-phone/pull/332
      ...(this._webphoneOptions.webphoneSDKOptions ?? {}),
    });
    this.rcWebphoneInstance$.next(webphone);
    // @ts-ignore
    webphone.userAgent.audioHelper = new WebphoneAudioHelper({
      enabled: true,
    });
    this.loadAudio();
    webphone.userAgent.audioHelper.setVolume(
      this._audioSettings.ringtoneVolume,
    );
    // Webphone userAgent registered event
    webphone.userAgent.on('registered', () => {
      if (!this.connected) {
        this._onWebphoneRegistered(provisionData);
      }
    });
    webphone.userAgent.on('unregistered', (e) => {
      console.log('web phone unregistered event', e);
      this._onWebphoneUnregistered();
    });
    webphone.userAgent.on('registrationFailed', (response, cause) => {
      console.error('Webphone Register Error:', response, cause);
      // For 401
      if (!response && cause === 'Connection Error') {
        return;
      }
      const message = (response && response.data) || response;
      if (
        message &&
        typeof message === 'string' &&
        webphone!.userAgent.transport.isSipErrorCode(message)
      ) {
        // error is handled in webphone sdk;
        return;
      }
      // don't handled in connection is disconnecting
      if (this.disconnected || this.disconnecting) {
        return;
      }
      let errorCode: WebphoneError;
      // limit logic:
      /*
       * Specialties of this flow are next:
       *   6th WebRTC in another browser receives 6th 'EndpointID' and 1st 'InstanceID',
       *   which has been given previously to the 1st 'EndpointID'.
       *   It successfully registers on WSX by moving 1st 'EndpointID' to a blocklist state.
       *   When 1st WebRTC client re-registers on expiration timeout,
       *   WSX defines that 1st 'EndpointID' is blacklisted and responds with 'SIP/2.0 403 Forbidden,
       *   instance id is intercepted by another registration' and remove it from block list.
       *   So if 1st WebRTC will send re-register again with the same 'InstanceID',
       *   it will be accepted and 6th 'EndpointID' will be blacklisted.
       *   (But the WebRTC client must logout on receiving SIP/2.0 403 Forbidden error and in case of login -
       *   provision again via Platform API and receive new InstanceID)
       */
      const statusCode = response
        ? response.statusCode || response.status_code
        : null;
      switch (statusCode) {
        // Webphone account over limit
        case 403:
        case 603: {
          errorCode = 'webphoneCountOverLimit';
          break;
        }
        // Internal server error
        case 500: {
          errorCode = 'internalServerError';
          break;
        }
        // Timeout
        case 504: {
          errorCode = 'serverTimeout';
          break;
        }
        default: {
          errorCode = 'unknownError';
          break;
        }
      }
      this._onConnectError({ errorCode, statusCode });
    });
    webphone.userAgent.on('invite', (session) => {
      this.logger.log(`invite`, session);
      this._onInvite(session as WebphoneSession);
    });
    // webphone.userAgent.on('inviteSent', (session) => {
    //   console.log('UA invite');
    //   this._addSession(session as WebphoneSession);
    // });
    // sip provision expired
    // TODO: should check that type issue in ringcentral-web-phone
    // @ts-ignore
    webphone.userAgent.on('provisionUpdate', (e) => {
      this.logger.log(`provisionUpdate`, e);
      if (Object.keys(this.originalSessions).length === 0) {
        this._toast.warning({
          message: t('provisionUpdate'),
          allowDuplicates: false,
          group: this.identifier,
        });
        this.connect({
          force: true,
          skipDLCheck: true,
          skipConnectDelay: true,
        });
        return;
      }
      this._reconnectAfterSessionEnd = {
        reason: t('provisionUpdate'),
      };
    });
    // websocket transport connecting event
    webphone.userAgent.transport.on('connecting', async (e) => {
      this.logger.log(`connecting`, e);
      // reconnecting event
      if (this.connected || this.connectError) {
        this._toast.warning({
          message: t('serverConnecting'),
          allowDuplicates: false,
          group: this.identifier,
        });
        await this.setStateOnReconnect();
      }
    });
    // Server connection closed event after 10 time retry with primary server and backup server
    webphone.userAgent.transport.on('closed', async (e) => {
      this.logger.log(`closed`, e);
      await this.setRetryCounts(20);
      this._onConnectError({
        errorCode: 'connectFailed',
        ttl: 0,
      });
    });
    webphone.userAgent.transport.on('transportError', (e) => {
      this.logger.log(`transportError`, e);
    });
    webphone.userAgent.transport.on('wsConnectionError', async (e) => {
      this.logger.log(`wsConnectionError`, e);
      await this.setConnectionStatus(connectionStatus.connectError);
    });
    // Timeout to switch back to primary server
    webphone.userAgent.transport.on('switchBackProxy', (e) => {
      this.logger.log(`switchBackProxy`, e);
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

  private async _waitModuleReady(module?: RcModule, timeoutMs: number = 30000) {
    if (!module || module.ready) return;
    try {
      await firstValueFrom(
        module.ready$.pipe(
          filter((ready) => Boolean(ready)),
          timeout({
            each: timeoutMs,
            with: () =>
              throwError(
                () => new Error(`Module ready timeout after ${timeoutMs}ms`),
              ),
          }),
        ),
      );
    } catch (error) {
      if (process.env.NODE_ENV !== 'test') {
        this.logger.warn(
          `[${this.identifier}] > waitModuleReady failed`,
          error,
        );
      }
    }
  }

  /**
   * Check realtime channel readiness status and log warnings if not ready
   * @returns true if both websocket and subscription are ready, false otherwise
   */
  private _checkRealtimeReadiness({
    ringCentralExtensions,
    subscription,
    shouldWaitForSubscription,
    timeoutMs,
  }: {
    ringCentralExtensions: RingCentralExtensions;
    subscription?: Subscription;
    shouldWaitForSubscription: boolean;
    timeoutMs: number;
  }): boolean {
    const websocketReady = ringCentralExtensions.isWebSocketReady;
    const subscriptionReady =
      !shouldWaitForSubscription || Boolean(subscription?.subscriptionReady);

    const isReady = websocketReady && subscriptionReady;

    if (!isReady && process.env.NODE_ENV !== 'test') {
      this.logger.warn(
        `[${this.identifier}] > realtime channel not ready after ${timeoutMs}ms`,
        {
          websocketReady,
          subscriptionReady,
          shouldWaitForSubscription,
        },
      );
    }

    return isReady;
  }

  protected async _awaitRealtimeRecovery({
    recover = true,
    timeout = this._webphoneOptions?.webSocketRecoveryTimeout ??
      DEFAULT_WEBSOCKET_RECOVERY_TIMEOUT,
  }: {
    recover?: boolean;
    timeout?: number;
  } = {}) {
    if (process.env.NODE_ENV === 'test') return true;
    const startTime = Date.now();
    const ringCentralExtensions = this._ringCentralExtensions;
    if (!ringCentralExtensions) {
      return true;
    }

    // Wait for module ready with a portion of the total timeout (1/4 or max 5s)
    const moduleReadyTimeout = Math.min(timeout / 4, 5000);
    await this._waitModuleReady(ringCentralExtensions, moduleReadyTimeout);

    if (recover && !ringCentralExtensions.isWebSocketReady) {
      try {
        await ringCentralExtensions.recoverWebSocketConnection();
      } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
          this.logger.warn(
            `[${this.identifier}] > recoverWebSocketConnection failed`,
            error,
          );
        }
      }
    }

    const subscription = this._subscription;
    if (subscription) {
      const elapsed = Date.now() - startTime;
      const remainingTimeout = Math.max(timeout - elapsed, 1000);
      await this._waitModuleReady(subscription, remainingTimeout);
    }

    const shouldWaitForSubscription =
      !!subscription &&
      (subscription.filters.length > 0 ||
        Boolean(subscription.subscriptionInfo));

    const readinessStreams = [
      fromWatchValue(
        ringCentralExtensions,
        () => ringCentralExtensions.isWebSocketReady,
      ).pipe(
        filter(Boolean),
        map(() => true),
      ),
    ];

    if (shouldWaitForSubscription && subscription) {
      readinessStreams.push(
        fromWatchValue(subscription, () => subscription.subscriptionReady).pipe(
          filter(Boolean),
          map(() => true),
        ),
      );
    }

    // Calculate remaining timeout for the final readiness check
    const elapsed = Date.now() - startTime;
    const remainingTimeout = Math.max(timeout - elapsed, 0);

    if (remainingTimeout === 0) {
      return this._checkRealtimeReadiness({
        ringCentralExtensions,
        subscription,
        shouldWaitForSubscription,
        timeoutMs: timeout,
      });
    }

    const readiness$ = combineLatest(readinessStreams).pipe(map(() => true));

    const isReady = await firstValueFrom(
      race([readiness$, timer(remainingTimeout).pipe(map(() => false))]),
    );

    if (!isReady) {
      return this._checkRealtimeReadiness({
        ringCentralExtensions,
        subscription,
        shouldWaitForSubscription,
        timeoutMs: timeout,
      });
    }

    return true;
  }

  // eslint-disable-next-line
  async _onInvite(session: WebphoneSession) {
    // override
  }

  @delegate('mainClient')
  async _connect() {
    this.logger.log('_connect');

    if (!this._auth.loggedIn) return;

    const sipProvision = await this._sipProvision();
    if (sipProvision) {
      await this._createWebphone(sipProvision);
    }
  }

  _isAvailableToConnect({ force }: { force: boolean }) {
    this.logger.log('check available to connect', {
      loggedIn: this._auth.loggedIn,
      force,
      enabled: this.enabled,
      connectionStatus: this.connectionStatus,
    });

    if (!this.enabled || !this._auth.loggedIn) {
      return false;
    }
    // do not connect if it is connecting
    // do not reconnect when user disconnected
    if (
      this.connecting ||
      this.disconnecting ||
      this.inactiveDisconnecting ||
      this.reconnecting
    ) {
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
  @delegate('mainClient')
  async connect({
    force = false,
    skipTimeout = true,
    skipConnectDelay = false,
    skipDLCheck = false,
  } = {}) {
    this.logger.log('connect', {
      force,
      skipTimeout,
      skipConnectDelay,
      skipDLCheck,
    });
    if (!isBrowserSupport()) {
      await this.setStateOnConnectError('browserNotSupported', null);
      this._toast.warning({
        message: t('browserNotSupported'),
        group: this.identifier,
        ttl: 0,
      });
      return;
    }

    this.logger.log('wait for loggedIn');

    await firstValueFrom(this._auth.isLoggedIn$);
    await firstValueFrom(this._extensionFeatures.dataReady$);

    this._clearRealtimeRecoveryRetryTimeout();

    const shouldRecover =
      !!this._ringCentralExtensions &&
      !this._ringCentralExtensions.isWebSocketReady;

    const realtimeReady = await this._awaitRealtimeRecovery({
      recover: shouldRecover,
    });

    if (!realtimeReady) {
      this.logger.warn('WSG WebSocket connection not ready');

      const nextRealtimeRetryCounts = this.realtimeRecoveryRetryCounts + 1;
      await this.setRealtimeRecoveryRetryCounts(nextRealtimeRetryCounts);

      if (nextRealtimeRetryCounts <= REALTIME_RECOVERY_QUICK_RETRY_LIMIT) {
        // First few attempts: quick retry without showing error
        this.logger.log(
          `WebSocket timeout, quick retry (attempt ${nextRealtimeRetryCounts})`,
        );
        this.connect({
          skipDLCheck: true,
          skipConnectDelay: true,
          skipTimeout: false,
        });
      } else {
        // After multiple failures: show error and retry in background
        this.logger.warn(
          `WebSocket timeout after ${nextRealtimeRetryCounts} attempts, showing error and retrying in background`,
        );
        await this.setStateOnConnectError('connectFailed', null);
        this.showErrorToast({
          errorCode: 'serverConnecting',
          isConnecting: false,
        });

        // Delayed background retry
        const retryDelay = this._getConnectTimeoutTtl();
        this.logger.log(`Will retry in ${retryDelay}ms`);
        this._scheduleRealtimeRecoveryRetry(retryDelay);
      }
      return;
    }

    await this.setRealtimeRecoveryRetryCounts(0);

    const isAvailableToConnect = this._isAvailableToConnect({ force });

    this.logger.log('isAvailableToConnect', isAvailableToConnect);

    if (!isAvailableToConnect) return;

    // when last connect is connect error, use reconnect (will show connecting badge)
    if (this.connectError || force) {
      await this.setStateOnReconnect();
    } else {
      await this.setStateOnConnect();
    }
    const connectDelay = this._webphoneOptions!.connectDelay ?? 0;

    this.logger.log('connect to webphone delay', {
      skipConnectDelay,
      connectDelay,
    });

    if (!skipConnectDelay && connectDelay > 0) {
      await sleep(connectDelay);
    }
    if (!skipDLCheck) {
      // in new project, we don't need to check device lines every time when make call, only validate device lines use ExtensionDevice
      if (process.env.THEME_SYSTEM !== 'spring-ui') {
        await this._fetchDL();
      }

      this.validateDeviceLines();
    }

    this.logger.log('before connect check the connect status', {
      connectionStatus: this.connectionStatus,
      loggedIn: this._auth.loggedIn,
    });

    if (this.disconnected || this.disconnecting || !this._auth.loggedIn) {
      return;
    }
    if (this._connectTimeout) {
      clearTimeout(this._connectTimeout);
    }

    this.logger.log('before connect check the connect status', {
      connectionStatus: this.connectionStatus,
      loggedIn: this._auth.loggedIn,
      skipTimeout,
    });

    if (force || skipTimeout) {
      await this._connect();
      return;
    }

    const connectTimeoutTTL = this._getConnectTimeoutTtl();

    this.logger.log('before connect timeout TTL', {
      connectTimeoutTTL,
    });
    this._connectTimeout = setTimeout(() => {
      this._connectTimeout = null;
      this._connect();
    }, connectTimeoutTTL);
  }

  _getConnectTimeoutTtl() {
    return this._reconnectDelays[
      Math.min(this.connectRetryCounts, this._reconnectDelays.length - 1)
    ];
  }

  private _clearRealtimeRecoveryRetryTimeout() {
    if (this._realtimeRecoveryRetryTimeout) {
      clearTimeout(this._realtimeRecoveryRetryTimeout);
      this._realtimeRecoveryRetryTimeout = null;
    }
  }

  private _scheduleRealtimeRecoveryRetry(delay: number) {
    this._clearRealtimeRecoveryRetryTimeout();
    this._realtimeRecoveryRetryTimeout = setTimeout(async () => {
      this._realtimeRecoveryRetryTimeout = null;
      if (this.connectError && this._auth.loggedIn) {
        this.connect({
          skipConnectDelay: true,
          force: true,
          skipDLCheck: true,
        });
      }
    }, delay);
  }

  showErrorToast({
    errorCode,
    statusCode = this.statusCode,
    ttl,
    isConnecting = false,
  }: {
    errorCode: WebphoneError;
    statusCode?: number | null;
    ttl?: number;
    isConnecting?: boolean;
  }) {
    const message = (() => {
      if (
        errorCode === 'sipProvisionError' ||
        errorCode === 'webphoneForbidden' ||
        errorCode === 'requestTimeout' ||
        errorCode === 'serverTimeout' ||
        errorCode === 'internalServerError' ||
        errorCode === 'unknownError'
      ) {
        if (statusCode && isConnecting) {
          return t('registeringWithStatusCode', {
            errorCode: statusCode,
            brandName: this._brand.name,
          });
        }
        if (statusCode) {
          return t('failWithStatusCode', {
            errorCode: statusCode,
            brandName: this._brand.name,
          });
        }
        if (isConnecting) {
          return t('registeringWithoutStatusCode', {
            brandName: this._brand.name,
          });
        }
        return t('failWithoutStatusCode', {
          brandName: this._brand.name,
        });
      }

      return t(errorCode);
    })();

    return this._toast.danger({
      message,
      ttl,
      allowDuplicates: false,
      group: `${this.identifier}_${isConnecting ? 'connecting' : 'failed'}`,
    });
  }

  @delegate('mainClient')
  async _onConnectError({
    errorCode,
    statusCode,
    ttl,
  }: {
    errorCode: ToastWebphoneError;
    statusCode?: number | null;
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
      await this.setStateOnConnectError(errorCode, statusCode);

      this.showErrorToast({ ttl, errorCode, statusCode, isConnecting: false });

      await this._hideConnectingAlert();
      // Need to show unavailable badge and reconnect in background when third retry
      // sleep before next reconnect for slient reconnect in background
      await sleep(this._getConnectTimeoutTtl());
      if (!this.connectError) {
        return;
      }
      this.connect({ skipConnectDelay: true, force: true, skipDLCheck: true });
      return;
    }
    await this.setStateOnConnectFailed(errorCode, statusCode!);
    if (this.connectRetryCounts === 1) {
      this.showErrorToast({ ttl, errorCode, statusCode, isConnecting: true });
      await this._hideConnectFailedAlert();
    }
    this.connect({
      skipDLCheck: true,
      skipConnectDelay: true,
      skipTimeout: false,
    });
  }

  async _onWebphoneRegistered(provisionData: CreateSipRegistrationResponse) {
    await this.setStateOnRegistered(provisionData.device!);
    await this._hideRegisterErrorAlert();
    await this._awaitRealtimeRecovery();
    this._eventEmitter.emit(EVENTS.webphoneRegistered);
  }

  async _onWebphoneUnregistered() {
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
    await this.setStateOnConnectError();
    this._eventEmitter.emit(EVENTS.webphoneUnregistered);
  }

  async _disconnectToInactive() {
    await this.setConnectionStatus(connectionStatus.inactiveDisconnecting);
    await this.setDevice(null);
    await this._removeWebphone();
    await this.setStateWhenUnregisteredOnInactive();
  }

  private async _hideConnectingAlert() {
    await this._toast.dismissByGroup([`${this.identifier}_connecting`]);
  }

  private async _hideConnectFailedAlert() {
    await this._toast.dismissByGroup([`${this.identifier}_failed`]);
  }

  private async _hideRegisterErrorAlert() {
    const identifier = this.identifier;
    await this._toast.dismissByGroup([
      identifier!,
      `${identifier}_failed`,
      `${identifier}_connecting`,
    ]);
  }

  async _disconnect() {
    if (this.disconnected || this.disconnecting) {
      return;
    }
    if (this._connectTimeout) {
      clearTimeout(this._connectTimeout);
    }
    // this method will send event through webphone socket to ensure the webphone is disconnected, we must ensure not await this method to avoid the `_removeWebphone` event not trigger in sync when pagehide
    this.setStoreOnDisconnect();
    if (this._webphone) {
      await this._removeWebphone();
    }
    await this.setStateOnUnregistered();
  }

  @delegate('mainClient')
  async disableMainClient() {
    this.isMainClient = false;
  }

  @delegate('mainClient')
  async disconnect() {
    this._sipInstanceId = null;
    await this._disconnect();
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
      // @ts-expect-error
      this._webphone.userAgent.audioHelper.setDeviceId(
        this._audioSettings.ringtoneDeviceId,
      );
    }
  }

  @delegate('mainClient')
  async setOutgoingAudio({
    fileName,
    dataUrl,
  }: {
    fileName: string;
    dataUrl: string;
  }) {
    // TODO: validate filePath?
    this._setOutgoingAudioIntoStorage(fileName, dataUrl);
    this.loadAudio();
  }

  @delegate('mainClient')
  async resetOutgoingAudio() {
    this._resetOutgoingAudio();
    this.loadAudio();
  }

  @delegate('mainClient')
  async setIncomingAudio({
    fileName,
    dataUrl,
  }: {
    fileName: string;
    dataUrl: string;
  }) {
    // TODO: validate filePath?
    this._setIncomingAudioIntoStorage(fileName, dataUrl);
    this.loadAudio();
  }

  @delegate('server')
  async setIncomingAudioIntoStorage({
    fileName,
    dataUrl,
  }: {
    fileName: string;
    dataUrl: string;
  }) {
    this._setIncomingAudioIntoStorage(fileName, dataUrl);
  }

  @delegate('mainClient')
  async loadClientAudio() {
    this.loadAudio();
  }

  @delegate('mainClient')
  async resetIncomingAudio() {
    this._resetIncomingAudio();
    this.loadAudio();
  }

  @delegate('mainClient')
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

  /**
   * !! It can only be called in a non-shared shared worker.
   */
  get originalSessions() {
    if (
      process.env.NODE_ENV === 'development' &&
      this._portManager.isWorkerMode &&
      this._portManager.isServer
    ) {
      console.error(
        `originalSessions can only be called in a non-shared shared worker.`,
      );
    }
    return (this._webphone?.userAgent.sessions ?? {}) as {
      [key: string]: WebphoneSession;
    };
  }

  // for backward compatibility v1
  get _sessions() {
    return new Map(Object.entries(this.originalSessions));
  }

  get enabled() {
    return this._appFeatures.isWebPhoneEnabled;
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

  get incomingAudio() {
    // support turn off ringtone
    if (this.incomingAudioDataUrl === '') {
      return '';
    }
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
