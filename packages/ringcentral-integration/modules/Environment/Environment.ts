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
  'https://apps.ringcentral.com/integrations/recording/v3.0/rc/index.html';

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

  override onInit() {
    if (this.enabled) {
      this.changeEnvironment();
    }
  }

  @globalStorage
  @state
  server: SDKConfig['server'] = SDK.server.sandbox;

  @globalStorage
  @state
  recordingHostState: string | null = null;

  @globalStorage
  @state
  enabled = false;

  @state
  changeCounter = 0;

  @action
  setEnvData({ server, recordingHost, enabled }: SetDataOptions) {
    this.server = server;
    this.recordingHostState = recordingHost;
    this.enabled = enabled;
  }

  @action
  updateChangeCounter() {
    this.changeCounter++;
  }

  changeEnvironment() {
    const sdkConfig = this.getSdkConfig();
    this._deps.client.service = new SDK(sdkConfig);
  }

  getSdkConfig() {
    const newConfig = {
      ...this._deps.sdkConfig,
    };
    if (this.enabled) {
      newConfig.server = this.server;
      newConfig.discoveryServer = this.server;
    }
    return newConfig;
  }

  @proxify
  async setData({
    server,
    recordingHost,
    enabled,
    environmentChanged = false,
  }: SetDataOptions) {
    // `recordingHost` change no need to set to SDK
    const isEnvChanged =
      environmentChanged ||
      this.enabled !== enabled ||
      (enabled && this.server !== server);

    this.setEnvData({
      server,
      recordingHost,
      enabled,
    });

    if (isEnvChanged) {
      // apply changes
      this.changeEnvironment();
      // notify change at last
      this.updateChangeCounter();
    }
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
