import RcModule from 'ringcentral-integration/lib/RcModule';
import { Module } from 'ringcentral-integration/lib/di';
import ensureExist from 'ringcentral-integration/lib/ensureExist';
import { selector } from 'ringcentral-integration/lib/selector';
import proxify from 'ringcentral-integration/lib/proxy/proxify';
import moduleStatuses from 'ringcentral-integration/enums/moduleStatuses';
import actionTypes from './actionTypes';
import getConnectivityMangerReducer from './getConnectivityMangerReducer';
import connectivityTypes from './connectivityTypes';

/**
 * @class
 * @description Connectivity manager module
 */
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
export default class ConnectivityManager extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Alert} params.alert - alert module instance
   * @param {Client} params.client - client module instance
   * @param {Environment} params.environment - environment module instance
   * @param {Number} params.timeToRetry - time to Retry
   * @param {Number} params.heartBeatInterval - heart beat interval
   * @param {Function} params.checkConnectionFunc - function to check network
   */
  constructor({
    auth,
    oAuth,
    alert,
    callingSettings,
    audioSettings,
    webphone,
    connectivityMonitor,
    availabilityMonitor,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._auth = auth;
    this._oAuth = oAuth;
    this._callingSettings = callingSettings;
    this._audioSettings = audioSettings;
    this._webphone = webphone;
    this._availabilityMonitor = availabilityMonitor;
    this._alert = alert;
    this._connectivityMonitor = connectivityMonitor;
    this._reducer = getConnectivityMangerReducer(this.actionTypes);
    this._oldConnectivityType = '';
  }

  async _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (
      this.ready &&
      this.connectivityType !== this._oldConnectivityType
    ) {
      this._oldConnectivityType = this.connectivityType;
      this.showConnectivityAlert();
    }
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  _shouldInit() {
    return (
      (!this._callingSettings || this._callingSettings.ready) &&
      (!this._audioSettings || this._audioSettings.ready) &&
      (!this._webphone || this._webphone.ready) &&
      (!this._availabilityMonitor || this._availabilityMonitor.ready) &&
      this.pending
    );
  }

  @proxify
  checkWebphoneAndConnect() {
    if (
      !this._callingSettings ||
      !this._callingSettings.ready ||
      !this._callingSettings.isWebphoneMode
    ) {
      return;
    }
    if (this._audioSettings && this._audioSettings.ready) {
      this._audioSettings.showAlert();
      this._audioSettings.getUserMedia();
    }
    if (this._webphone && this._webphone.ready) {
      this._webphone.connect({ force: true, skipConnectDelay: true });
    }
  }

  @proxify
  checkStatus() {
    if (!this._availabilityMonitor) {
      return;
    }

    this._availabilityMonitor.healthCheck();
  }

  _showAlert(message) {
    if (message) {
      this._alert.danger({
        message,
        allowDuplicates: false,
      });
    }
  }

  _hideAlerts() {
    const alertIds = this._alert.messages
      .filter((m) => {
        for (const type in connectivityTypes) {
          if (m.message === connectivityTypes[type]) return true;
        }
        return false;
      })
      .map((m) => m.id);
    if (alertIds.length) {
      this._alert.dismiss(alertIds);
    }
  }

  @proxify
  showConnectivityAlert() {
    if (
      !this.connectivityType ||
      this.connectivityType === connectivityTypes.webphoneUnavailable
    ) {
      this._hideAlerts();
    } else {
      this._showAlert(this.connectivityType);
    }
  }

  get status() {
    return this.state.status;
  }

  get ready() {
    return this.state.status === moduleStatuses.ready;
  }

  get pending() {
    return this.state.status === moduleStatuses.pending;
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
      this._callingSettings.isWebphoneMode &&
      (!this._webphone.ready ||
        this._webphone.disconnected ||
        this._webphone.connecting ||
        this._webphone.connectFailed)
    );
  }

  get webphoneConnecting() {
    return (
      this._webphone &&
      this._webphone.ready &&
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
        (this._webphone.reconnecting ||
          this._webphone.connectError ||
          this._webphone.inactive))
    );
  }

  get proxyRetryCount() {
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

  @selector
  connectivityType = [
    () => this._connectivityMonitor.networkLoss,
    () => this._connectivityMonitor.connectivity,
    () => this.proxyRetryCount,
    () => this.isVoIPOnlyModeActivated,
    () => this.isLimitedModeActivated,
    () => this.webphoneAvailable,
    () => this.webphoneUnavailable,
    (
      networkLoss,
      connectivity,
      proxyRetryCount,
      isVoIPOnlyModeActivated,
      isLimitedModeActivated,
      webphoneAvailable,
      webphoneUnavailable,
    ) => {
      if (networkLoss) return connectivityTypes.networkLoss;
      if (proxyRetryCount) return connectivityTypes.offline;
      if (!connectivity) return connectivityTypes.offline;
      if (isVoIPOnlyModeActivated) {
        if (webphoneAvailable) return connectivityTypes.voipOnly;
        return connectivityTypes.serverUnavailable;
      }
      if (webphoneUnavailable) return connectivityTypes.webphoneUnavailable;
      if (isLimitedModeActivated) return connectivityTypes.survival;
      return null;
    },
  ];

  @selector
  mode = [
    () => this.connectivityType,
    (connectivityType) => {
      if (
        connectivityType === connectivityTypes.networkLoss ||
        connectivityType === connectivityTypes.serverUnavailable
      )
        return connectivityTypes.offline;
      return connectivityType;
    },
  ];

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
