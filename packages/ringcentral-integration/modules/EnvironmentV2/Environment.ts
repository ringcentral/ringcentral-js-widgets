import {
  action,
  globalStorage,
  RcModuleV2,
  state,
} from '@ringcentral-integration/core';
import { SDK } from '@ringcentral/sdk';

import { SDKConfig } from '../../lib/createSdkConfig';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import { Deps, SetDataOptions } from './Environment.interface';

const DEFAULT_RECORDING_HOST =
  'https://apps.ringcentral.com/integrations/recording/index.html';

@Module({
  name: 'Environment',
  deps: [
    'Client',
    'GlobalStorage',
    'SdkConfig',
    { dep: 'EnvironmentOptions', optional: true },
  ],
})
export class Environment extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
      enableGlobalCache: true,
      storageKey: 'environment',
    });
    this.recordingHostState = this._defaultRecordingHost;
  }

  @globalStorage
  @state
  server: SDKConfig['server'] = SDK.server.sandbox;

  @globalStorage
  @state
  recordingHostState: string = null;

  @globalStorage
  @state
  enabled = false;

  @state
  changeCounter = 0;

  onInit() {
    this._initClientService();
  }

  @action
  setEnvData({
    server,
    recordingHost,
    enabled,
    environmentChanged,
  }: SetDataOptions) {
    this.server = server;
    this.recordingHostState = recordingHost;
    this.enabled = enabled;
    if (environmentChanged) {
      this.changeCounter++;
    }
  }

  private _initClientService() {
    if (this.enabled) {
      this._deps.client.service = new SDK({
        ...this._deps.sdkConfig,
        discoveryServer: this.server,
        server: this.server,
      });
    }
  }

  private _changeEnvironment(enabled: boolean, server: SDKConfig['server']) {
    const newConfig = {
      ...this._deps.sdkConfig,
    };
    if (enabled) {
      newConfig.server = server;
      newConfig.discoveryServer = server;
    }
    this._deps.client.service = new SDK(newConfig);
  }

  @proxify
  async setData({ server, recordingHost, enabled }: SetDataOptions) {
    const environmentChanged =
      this.enabled !== enabled || (enabled && this.server !== server);
    if (environmentChanged) {
      // recordingHost changed no need to set to SDK
      this._changeEnvironment(enabled, server);
    }

    this.setEnvData({
      server,
      recordingHost,
      enabled,
      environmentChanged,
    });
  }

  get recordingHost() {
    return this.enabled ? this.recordingHostState : this._defaultRecordingHost;
  }

  protected get _defaultRecordingHost() {
    return (
      this._deps.environmentOptions?.defaultRecordingHost ??
      DEFAULT_RECORDING_HOST
    );
  }
}
