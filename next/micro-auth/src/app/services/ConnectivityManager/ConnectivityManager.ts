import {
  Toast,
  ToastManager,
} from '@ringcentral-integration/micro-core/src/app/services';
import type {
  AudioSettings,
  CallingSettings,
  Webphone,
} from '@ringcentral-integration/micro-phone/src/app/services';
import {
  computed,
  injectable,
  optional,
  delegate,
  RcModule,
  watch,
  dynamic,
} from '@ringcentral-integration/next-core';

import { Auth } from '../Auth';
import { AvailabilityMonitor } from '../AvailabilityMonitor';
import { ConnectivityMonitor } from '../ConnectivityMonitor';
import { OAuth } from '../OAuth';

import type {
  ConnectivityManagerOptions,
  ConnectivityType,
} from './ConnectivityManager.interface';
import { t } from './i18n';

@injectable({
  name: 'ConnectivityManager',
})
class ConnectivityManager extends RcModule {
  constructor(
    protected _toastManager: ToastManager,
    protected _toast: Toast,
    protected _oAuth: OAuth,
    protected _auth: Auth,
    protected _connectivityMonitor: ConnectivityMonitor,
    @optional()
    protected _availabilityMonitor?: AvailabilityMonitor,
    @optional('ConnectivityManagerOptions')
    protected _connectivityManagerOptions?: ConnectivityManagerOptions,
  ) {
    super();
  }

  @dynamic('CallingSettings')
  protected readonly _callingSettings?: CallingSettings;

  @dynamic('AudioSettings')
  protected readonly _audioSettings?: AudioSettings;

  @dynamic('Webphone')
  protected readonly _webphone?: Webphone;

  override onInitOnce() {
    watch(
      this,
      () => this.connectivityType,
      () => {
        if (this.ready) {
          this.showConnectivityToast();
        }
      },
    );
  }

  @delegate('server')
  async checkWebphoneAndConnect() {
    if (
      !this._callingSettings ||
      (this._callingSettings &&
        (!this._callingSettings.ready || !this._callingSettings.isWebphoneMode))
    ) {
      return;
    }
    if (this._audioSettings && this._audioSettings.ready) {
      this._audioSettings.checkAudioAvailable({
        checkIfNoDevices: true,
      });
    }
    if (this._webphone && this._webphone.ready) {
      this._webphone.connect({ force: true, skipConnectDelay: true });
    }
  }

  @delegate('server')
  async checkStatus() {
    if (!this._availabilityMonitor) {
      return;
    }

    this._availabilityMonitor.healthCheck();
  }

  private _showToast(messageType: ConnectivityType) {
    if (!messageType) {
      return;
    }

    return this._toast.danger({
      message: t(messageType as never),
      allowDuplicates: false,
      group: this.identifier,
    });
  }

  @delegate('server')
  async showConnectivityToast() {
    if (
      !this.connectivityType ||
      this.connectivityType === 'webphoneUnavailable'
    ) {
      this._toast.dismissByGroup([this.identifier]);
    } else {
      // in spring-ui, we don't show toast when networkLoss or voipOnly
      if (process.env.THEME_SYSTEM === 'spring-ui') {
        if (
          this.connectivityType === 'networkLoss' ||
          this.connectivityType === 'voipOnly'
        ) {
          return;
        }
      }
      this._showToast(this.connectivityType);
    }
  }

  get webphoneAvailable() {
    return (
      this._webphone &&
      this._callingSettings &&
      this._audioSettings &&
      this._audioSettings.ready &&
      this._callingSettings.ready &&
      this._auth.ready &&
      this._auth.loggedIn &&
      this._callingSettings.isWebphoneMode &&
      this._audioSettings.userMedia &&
      this._webphone.connected
    );
  }

  get isWebphoneInitializing() {
    return (
      !!this._callingSettings?.isWebphoneMode &&
      this._webphone &&
      (!this._webphone.ready ||
        this._webphone.disconnected ||
        this._webphone.connecting ||
        this._webphone.connectFailed)
    );
  }

  get webphoneConnecting() {
    return (
      !!this._webphone?.ready &&
      (this._webphone.connecting || this._webphone.reconnecting)
    );
  }

  get webphoneUnavailable() {
    return (
      this._webphone &&
      this._callingSettings &&
      this._audioSettings &&
      this._audioSettings.ready &&
      this._auth.ready &&
      this._auth.loggedIn &&
      this._callingSettings.isWebphoneMode &&
      (!this._audioSettings.userMedia ||
        this._webphone.reconnecting ||
        this._webphone.connectError ||
        this._webphone.inactive)
    );
  }

  // TODO: fix oAuth type
  get proxyRetryCount(): boolean {
    // @ts-ignore
    return this._oAuth && this._oAuth.proxyRetryCount > 0;
  }

  get isVoIPOnlyModeActivated() {
    return (
      !!this._availabilityMonitor && this._availabilityMonitor.isVoIPOnlyMode
    );
  }

  get isLimitedModeActivated() {
    return (
      !!this._availabilityMonitor && this._availabilityMonitor.isLimitedMode
    );
  }

  get hasLimitedStatusError() {
    return (
      !!this._availabilityMonitor &&
      this._availabilityMonitor.hasLimitedStatusError
    );
  }

  @computed((that: ConnectivityManager) => [
    that._connectivityMonitor.networkLoss,
    that._connectivityMonitor.connectivity,
    that.proxyRetryCount,
    that.isVoIPOnlyModeActivated,
    that.isLimitedModeActivated,
    that.webphoneAvailable,
    that.webphoneUnavailable,
  ])
  get connectivityType(): ConnectivityType | null {
    if (this._connectivityMonitor.networkLoss) return 'networkLoss';
    if (this.proxyRetryCount) return 'offline';
    if (!this._connectivityMonitor.connectivity) return 'offline';
    if (this.isVoIPOnlyModeActivated) {
      if (this.webphoneAvailable) return 'voipOnly';
      return 'serverUnavailable';
    }
    if (this.webphoneUnavailable) return 'webphoneUnavailable';
    if (this.isLimitedModeActivated) return 'survival';
    return null;
  }

  @computed((that: ConnectivityManager) => [that.connectivityType])
  get mode(): ConnectivityType | null {
    if (
      this.connectivityType === 'networkLoss' ||
      this.connectivityType === 'serverUnavailable'
    )
      return 'offline';
    return this.connectivityType;
  }

  get isWebphoneUnavailableMode() {
    return this.mode === 'webphoneUnavailable';
  }

  get isOfflineMode() {
    return this.mode === 'offline';
  }

  get isVoipOnlyMode() {
    return this.mode === 'voipOnly';
  }
}

export { ConnectivityManager };
