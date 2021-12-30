import { SDK } from '@ringcentral/sdk';

import moduleStatuses from '../../enums/moduleStatuses';
import { Module } from '../../lib/di';
import proxify from '../../lib/proxy/proxify';
import RcModule from '../../lib/RcModule';
import actionTypes from './actionTypes';
import getEnvironmentReducer, {
  getEnabledReducer,
  getRecordingHostReducer,
  getServerReducer,
} from './getEnvironmentReducer';

/**
 * @class
 * @description Environment module manages which api server the app calls.
 */
@Module({
  deps: [
    'Client',
    'GlobalStorage',
    'SdkConfig',
    { dep: 'EnvironmentOptions', optional: true },
  ],
})
export default class Environment extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {GlobalStorage} params.globalStorage - globalStorage module instance
   * @param {String} params.environmentOptions - default recording host uri
   * @param {Object} params.sdkConfig - sdk config
   */
  constructor({
    client,
    globalStorage,
    environmentOptions = {},
    sdkConfig,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._client = client;
    this._globalStorage = globalStorage;
    this._sdkConfig = sdkConfig;
    this._reducer = getEnvironmentReducer(this.actionTypes);
    this._serverStorageKey = 'environmentServer';
    this._recordingHostStoragekey = 'environmentRecordingHost';
    this._enabledStorageKey = 'environmentEnabled';
    this._defaultRecordingHost =
      environmentOptions.defaultRecordingHost ??
      'https://apps.ringcentral.com/integrations/recording/index.html';
    this._globalStorage.registerReducer({
      key: this._serverStorageKey,
      reducer: getServerReducer({
        types: this.actionTypes,
        defaultServer: SDK.server.sandbox,
      }),
    });
    this._globalStorage.registerReducer({
      key: this._recordingHostStoragekey,
      reducer: getRecordingHostReducer({
        types: this.actionTypes,
        defaultRecordingHost: this._defaultRecordingHost,
      }),
    });
    this._globalStorage.registerReducer({
      key: this._enabledStorageKey,
      reducer: getEnabledReducer(this.actionTypes),
    });
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  _onStateChange() {
    if (this._shouldInit()) {
      this._initClientService();
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    }
  }

  _shouldInit() {
    return this._globalStorage.ready && !this.ready;
  }

  _initClientService() {
    if (this.enabled) {
      this._client.service = new SDK({
        ...this._sdkConfig,
        discoveryServer: this.server,
        server: this.server,
      });
    }
  }

  _changeEnvironment(enabled, server) {
    const newConfig = {
      ...this._sdkConfig,
    };
    if (enabled) {
      newConfig.server = server;
      newConfig.discoveryServer = server;
    }
    this._client.service = new SDK(newConfig);
  }

  @proxify
  async setData({ server, recordingHost, enabled }) {
    const environmentChanged =
      this.enabled !== enabled || (enabled && this.server !== server);
    if (environmentChanged) {
      // recordingHost changed no need to set to SDK
      this._changeEnvironment(enabled, server);
    }

    this.store.dispatch({
      type: this.actionTypes.setData,
      server,
      recordingHost,
      enabled,
      environmentChanged,
    });
  }

  get status() {
    return this.state.status;
  }

  get ready() {
    return this.state.status === moduleStatuses.ready;
  }

  get server() {
    return this._globalStorage.getItem(this._serverStorageKey);
  }

  get recordingHost() {
    if (this.enabled) {
      return this._globalStorage.getItem(this._recordingHostStoragekey);
    }
    return this._defaultRecordingHost;
  }

  get enabled() {
    return this._globalStorage.getItem(this._enabledStorageKey);
  }

  get changeCounter() {
    return this.state.changeCounter;
  }
}
