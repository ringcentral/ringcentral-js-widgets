import { RcModuleV2, watch, computed } from '@ringcentral-integration/core';
import { Module } from '@ringcentral-integration/commons/lib/di';
import { proxify } from '@ringcentral-integration/commons/lib/proxy/proxify';
import { connectivityTypes } from './connectivityTypes';
import { Deps } from './ConnectivityManager.interface';

@Module({
  deps: [
    'Alert',
    'OAuth',
    'Auth',
    'ConnectivityMonitor',
    { dep: 'AvailabilityMonitor', optional: true },
    { dep: 'CallingSettings', optional: true },
    { dep: 'AudioSettings', optional: true },
    { dep: 'Webphone', optional: true },
  ],
})
class ConnectivityManager extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  onInitOnce() {
    watch(
      this,
      () => this.connectivityType,
      () => {
        if (this.ready) {
          this.showConnectivityAlert();
        }
      },
    );
  }

  @proxify
  async checkWebphoneAndConnect() {
    if (
      !this._deps.callingSettings ||
      (this._deps.callingSettings &&
        (!this._deps.callingSettings.ready ||
          !this._deps.callingSettings.isWebphoneMode))
    ) {
      return;
    }
    if (this._deps.audioSettings && this._deps.audioSettings.ready) {
      this._deps.audioSettings.showAlert();
      this._deps.audioSettings.getUserMedia();
    }
    if (this._deps.webphone && this._deps.webphone.ready) {
      this._deps.webphone.connect({ force: true, skipConnectDelay: true });
    }
  }

  @proxify
  async checkStatus() {
    if (!this._deps.availabilityMonitor) {
      return;
    }

    this._deps.availabilityMonitor.healthCheck();
  }

  _showAlert(message: string) {
    if (message) {
      this._deps.alert.danger({
        message,
        allowDuplicates: false,
      });
    }
  }

  _hideAlerts() {
    const alertIds = this._deps.alert.messages
      .filter((m) => {
        for (const type in connectivityTypes) {
          if (
            m.message ===
            connectivityTypes[type as keyof typeof connectivityTypes]
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

  @proxify
  async showConnectivityAlert() {
    if (
      !this.connectivityType ||
      this.connectivityType === connectivityTypes.webphoneUnavailable
    ) {
      this._hideAlerts();
    } else {
      this._showAlert(this.connectivityType);
    }
  }

  get webphoneAvailable() {
    return (
      this._deps.webphone &&
      this._deps.callingSettings &&
      this._deps.audioSettings &&
      this._deps.audioSettings.ready &&
      this._deps.callingSettings.ready &&
      this._deps.auth.ready &&
      this._deps.auth.loggedIn &&
      this._deps.callingSettings.isWebphoneMode &&
      this._deps.audioSettings.userMedia &&
      this._deps.webphone.connected
    );
  }

  get isWebphoneInitializing() {
    return (
      !!this._deps.callingSettings?.isWebphoneMode &&
      (!this._deps.webphone.ready ||
        this._deps.webphone.disconnected ||
        this._deps.webphone.connecting ||
        this._deps.webphone.connectFailed)
    );
  }

  get webphoneConnecting() {
    return (
      !!this._deps.webphone?.ready &&
      (this._deps.webphone.connecting || this._deps.webphone.reconnecting)
    );
  }

  get webphoneUnavailable() {
    return (
      this._deps.webphone &&
      this._deps.callingSettings &&
      this._deps.audioSettings &&
      this._deps.audioSettings.ready &&
      this._deps.auth.ready &&
      this._deps.auth.loggedIn &&
      this._deps.callingSettings.isWebphoneMode &&
      (!this._deps.audioSettings.userMedia ||
        this._deps.webphone.reconnecting ||
        this._deps.webphone.connectError ||
        this._deps.webphone.inactive)
    );
  }

  // todo: fix oAuth type
  get proxyRetryCount(): boolean {
    // @ts-ignore
    return this._deps.oAuth && this._deps.oAuth.proxyRetryCount > 0;
  }

  get isVoIPOnlyModeActivated() {
    return (
      !!this._deps.availabilityMonitor &&
      this._deps.availabilityMonitor.isVoIPOnlyMode
    );
  }

  get isLimitedModeActivated() {
    return (
      !!this._deps.availabilityMonitor &&
      this._deps.availabilityMonitor.isLimitedMode
    );
  }

  get hasLimitedStatusError() {
    return (
      !!this._deps.availabilityMonitor &&
      this._deps.availabilityMonitor.hasLimitedStatusError
    );
  }

  @computed((that: ConnectivityManager) => [
    that._deps.connectivityMonitor.networkLoss,
    that._deps.connectivityMonitor.connectivity,
    that.proxyRetryCount,
    that.isVoIPOnlyModeActivated,
    that.isLimitedModeActivated,
    that.webphoneAvailable,
    that.webphoneUnavailable,
  ])
  get connectivityType() {
    if (this._deps.connectivityMonitor.networkLoss)
      return connectivityTypes.networkLoss;
    if (this.proxyRetryCount) return connectivityTypes.offline;
    if (!this._deps.connectivityMonitor.connectivity)
      return connectivityTypes.offline;
    if (this.isVoIPOnlyModeActivated) {
      if (this.webphoneAvailable) return connectivityTypes.voipOnly;
      return connectivityTypes.serverUnavailable;
    }
    if (this.webphoneUnavailable) return connectivityTypes.webphoneUnavailable;
    if (this.isLimitedModeActivated) return connectivityTypes.survival;
    return null;
  }

  @computed((that: ConnectivityManager) => [that.connectivityType])
  get mode() {
    if (
      this.connectivityType === connectivityTypes.networkLoss ||
      this.connectivityType === connectivityTypes.serverUnavailable
    )
      return connectivityTypes.offline;
    return this.connectivityType;
  }

  get isWebphoneUnavailableMode() {
    return this.mode === connectivityTypes.webphoneUnavailable;
  }

  get isOfflineMode() {
    return this.mode === connectivityTypes.offline;
  }

  get isVoipOnlyMode() {
    return this.mode === connectivityTypes.voipOnly;
  }
}

export { ConnectivityManager };
