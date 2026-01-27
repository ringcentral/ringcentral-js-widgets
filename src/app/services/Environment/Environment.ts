import type { SDKConfig } from '@ringcentral-integration/commons/lib/createSdkConfig';
import {
  action,
  inject,
  injectable,
  optional,
  delegate,
  RcModule,
  state,
  StoragePlugin,
  watch,
  PortManager,
  globalStorage,
  subscribe,
} from '@ringcentral-integration/next-core';
import {
  onUpdateEntry,
  updateStorageEntry,
  getMeta,
  getMfeDeps,
} from '@ringcentral-integration/next-micro';
import { SDK } from '@ringcentral/sdk';

import { Client } from '../Client';

import type {
  EnvironmentOptions,
  MfeDeps,
  SetDataOptions,
} from './Environment.interface';

const DEFAULT_RECORDING_HOST =
  'https://apps.ringcentral.com/integrations/recording/v3.0/rc/index.html';
const TWO_HOURS_IN_MILLISECONDS = 2 * 60 * 60 * 1000;

@injectable({
  name: 'Environment',
})
export class Environment extends RcModule {
  constructor(
    protected _client: Client,
    protected _storage: StoragePlugin,
    @inject('SdkConfig') protected _sdkConfig: SDKConfig,
    private _portManager: PortManager,
    @optional('EnvironmentOptions')
    protected _environmentOptions?: EnvironmentOptions,
  ) {
    super();
    this._storage.enable(this, {
      whitelist: ['server', 'recordingHostState', 'enabled', 'mfeDepsInfo'],
    });
    this.recordingHostState = this._defaultRecordingHost;
    if (globalThis.localStorage && this.mfeName) {
      onUpdateEntry((name, newValue) => {
        if (newValue.meta?.local) return;
        this.updateStorageMfeInfo();
      });
      if (this._portManager.shared) {
        this._portManager.onMainTab(() => {
          this.watchMfeDepsInfo();
        });
      } else {
        this.watchMfeDepsInfo();
      }
    }
  }

  get mfeDeps() {
    return getMfeDeps();
  }

  get mfeName() {
    const meta = getMeta();
    return meta?.data.main;
  }

  override async onInit() {
    if (this.enabled) {
      await this.changeEnvironment();
    }
  }

  watchMfeDepsInfo() {
    const unsubscribe = subscribe(this, () => {
      if (this.mfeDepsInfo.length < Object.keys(this.mfeDeps).length) {
        this.setMfeDepsInfo(
          Object.entries(this.mfeDeps).map(([name, { entry }]) => ({
            name,
            entry,
          })),
        );
      }
    });
    const stopWatching = watch(
      this,
      () => this.mfeDepsInfo,
      () => {
        this.updateStorageMfeInfo();
      },
    );
    return () => {
      unsubscribe();
      stopWatching();
    };
  }

  updateStorageMfeInfo() {
    if (this.enabled) {
      this.mfeDepsInfo.forEach(({ name, entry }) => {
        updateStorageEntry(name, {
          entry,
          version: '*',
          meta: { local: true },
        });
      });
    }
  }

  @globalStorage
  @state
  mfeDepsInfo: MfeDeps = [];

  @action
  _setMfeDepsInfo(mfeDeps: MfeDeps) {
    this.mfeDepsInfo = mfeDeps;
  }

  @delegate('server')
  async setMfeDepsInfo(mfeDeps: MfeDeps) {
    this._setMfeDepsInfo(mfeDeps);
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

  @globalStorage
  @state
  enabledDataTrackingTimestamp: number | null = null;

  @state
  changeCounter = 0;

  @action
  private _setEnvData({
    server,
    recordingHost,
    enabled,
    allowDataTracking,
    mfeDepsInfo,
  }: SetDataOptions) {
    this.server = server;
    this.recordingHostState = recordingHost;
    this.enabled = enabled;
    this.mfeDepsInfo = JSON.parse(mfeDepsInfo || '[]');
    this._toggleEnableAnalytics(allowDataTracking);
  }

  @action
  private _toggleEnableAnalytics(allowDataTracking: boolean | undefined) {
    this.enabledDataTrackingTimestamp = allowDataTracking ? Date.now() : null;
  }

  @action
  updateChangeCounter() {
    this.changeCounter++;
  }

  async changeEnvironment() {
    const sdkConfig = this._getSdkConfig();
    if (sdkConfig.enableDiscovery) {
      // Clear discovery data before switching to new env
      const discovery = this._client.service.platform().discovery();
      if (discovery) {
        await discovery.removeExternalData?.();
        await discovery.removeInitialData?.();
      }
    }
    await this._client.setService(sdkConfig);
  }

  private _getSdkConfig() {
    const newConfig = {
      ...this._sdkConfig,
    };
    if (this.enabled) {
      newConfig.server = this.server;
      newConfig.discoveryServer = this.server;
    }
    return newConfig;
  }

  @delegate('server')
  async setData({
    server,
    recordingHost,
    enabled,
    allowDataTracking = false,
    environmentChanged = false,
    mfeDepsInfo,
  }: SetDataOptions) {
    // `recordingHost` change no need to set to SDK
    const isEnvChanged =
      environmentChanged ||
      this.enabled !== enabled ||
      (enabled && this.server !== server);

    this._setEnvData({
      server,
      recordingHost,
      enabled,
      allowDataTracking,
      mfeDepsInfo,
    });

    if (isEnvChanged) {
      // apply changes
      await this.changeEnvironment();
      // notify change at last
      this.updateChangeCounter();
    }
  }

  @delegate('server')
  async toggleAnalytics(enable = false) {
    this._toggleEnableAnalytics(enable);
  }

  get allowDataTracking() {
    if (!this.debugDataTrackingEnable) return true;

    const timestamp = this.enabledDataTrackingTimestamp;
    if (!timestamp) return false;

    const isWithinTwoHours = Date.now() - timestamp < TWO_HOURS_IN_MILLISECONDS;

    return isWithinTwoHours;
  }

  get recordingHost() {
    return this.enabled ? this.recordingHostState : this._defaultRecordingHost;
  }

  /**
   * when that be true, the data tracking will not auto be tracked, will base on `allowDataTracking` setting to decide whether to track data
   */
  get debugDataTrackingEnable() {
    return Boolean(
      // in production mode, use data tracking setting to avoid data tracking in those test environment
      ((process.env.NODE_ENV === 'production' ||
        // also in test mode same as production to able to test that
        process.env.NODE_ENV === 'test') &&
        process.env.BUILD_ENVIRONMENT &&
        ['dev', 'local', 'reg'].includes(process.env.BUILD_ENVIRONMENT)) ||
        // in development mode always use data tracking setting, to avoid data tracking in dev mode
        process.env.NODE_ENV === 'development',
    );
  }

  protected get _defaultRecordingHost() {
    return (
      this._environmentOptions?.defaultRecordingHost ?? DEFAULT_RECORDING_HOST
    );
  }
}
