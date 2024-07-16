import {
  action,
  globalStorage,
  RcModuleV2,
  state,
} from '@ringcentral-integration/core';
import { SDK } from '@ringcentral/sdk';

import type { SDKConfig } from '../../lib/createSdkConfig';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';

import type { Deps, SetDataOptions } from './Environment.interface';
import { localStorageDataTrackingTimestamp } from './enabledDataTrackingTimestamp';

const DEFAULT_RECORDING_HOST =
  'https://apps.ringcentral.com/integrations/recording/v3.0/rc/index.html';
const TWO_HOURS_IN_MILLISECONDS = 2 * 60 * 60 * 1000;

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

  get enabledDataTrackingTimestamp() {
    return localStorageDataTrackingTimestamp.get();
  }

  @globalStorage
  @state
  enabled = false;

  @state
  changeCounter = 0;

  @action
  setEnvData({
    server,
    recordingHost,
    enabled,
    allowDataTracking,
  }: SetDataOptions) {
    this.server = server;
    this.recordingHostState = recordingHost;
    this.enabled = enabled;
    localStorageDataTrackingTimestamp.set(
      allowDataTracking ? Date.now() : null,
    );
  }

  @action
  updateChangeCounter() {
    this.changeCounter++;
  }

  protected async changeEnvironment() {
    const sdkConfig = this.getSdkConfig();
    if (sdkConfig.enableDiscovery) {
      // Clear discovery data before switching to new env
      const discovery = this._deps.client.service.platform().discovery();
      if (discovery) {
        await discovery.removeExternalData?.();
        await discovery.removeInitialData?.();
      }
    }
    this._deps.client.service = new SDK(sdkConfig);
    if (sdkConfig.enableDiscovery && sdkConfig.discoveryAutoInit === false) {
      // make sure to init discovery API if discoveryAutoInit is deliberately set to false
      this._deps.client.service.platform().initDiscovery();
    }
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
    allowDataTracking = false,
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
      allowDataTracking,
    });

    if (isEnvChanged) {
      // apply changes
      await this.changeEnvironment();
      // notify change at last
      this.updateChangeCounter();
    }
  }

  get recordingHost() {
    return this.enabled ? this.recordingHostState : this._defaultRecordingHost;
  }

  get allowDataTracking() {
    if (!this.useDataTrackingSetting) return true;

    const timestamp = this.enabledDataTrackingTimestamp;
    if (!timestamp) return false;

    const isWithinTwoHours = Date.now() - timestamp < TWO_HOURS_IN_MILLISECONDS;

    if (!isWithinTwoHours) {
      // clear data tracking setting if it's expired for prevent get Date.now() anymore
      localStorageDataTrackingTimestamp.set(null);
    }

    return isWithinTwoHours;
  }

  get useDataTrackingSetting() {
    return this._deps.environmentOptions?.useDataTrackingSetting;
  }

  protected get _defaultRecordingHost() {
    return (
      this._deps.environmentOptions?.defaultRecordingHost ??
      DEFAULT_RECORDING_HOST
    );
  }
}
