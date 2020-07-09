import {
  action,
  RcModuleState,
  RcModuleV2,
  state,
  storage,
  createSelector,
} from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

import { DepsModules, Settings, State } from './EvSettings.interface';

type EvSettingsState = RcModuleState<EvSettings, State>;

@Module({
  name: 'EvSettings',
  deps: [
    'EvClient',
    'EvAuth',
    'EvSessionConfig',
    'Beforeunload',
    'Storage',
    { dep: 'EvSettingsOptions', optional: true },
  ],
})
class EvSettings extends RcModuleV2<DepsModules, EvSettingsState>
  implements Settings {
  private _beforeunloadHandler = () =>
    this._modules.evSessionConfig.shouldBlockBrowser;

  constructor({
    evClient,
    evAuth,
    evSessionConfig,
    beforeunload,
    storage,
    enableCache = true,
  }) {
    super({
      modules: {
        evClient,
        evAuth,
        evSessionConfig,
        beforeunload,
        storage,
      },
      enableCache,
      storageKey: 'EvSettings',
    });
  }

  @storage
  @state
  isOffhook = false;

  @storage
  @state
  isManualOffhook = false;

  @storage
  @state
  isOffhooking = false;

  @storage
  @state
  config = {};

  get loginType() {
    return this._modules.evSessionConfig.loginType;
  }

  getOffhookState = createSelector(
    () => this.isOffhooking,
    () => this.isOffhook,
    (isOffhooking, isOffhook) => {
      if (isOffhooking) {
        return isOffhook ? 'disconnecting' : 'connecting';
      }

      return isOffhook ? 'connected' : 'disconnected';
    },
  );

  @action
  setConfig(config) {
    this.config = config;
  }

  @action
  setIsManualOffhook(isManualOffhook: boolean) {
    this.isManualOffhook = isManualOffhook;
  }

  @action
  setOffhook(status: boolean) {
    this.isOffhook = status;
    this._checkBeforeunload();
  }

  @action
  setOffhooking(offhooking: boolean) {
    this.isOffhooking = offhooking;
  }

  @action
  setOffhookInit() {
    this.isOffhooking = false;
    this.isOffhook = true;
    this._checkBeforeunload();
  }

  @action
  setOffhookTerm() {
    this.isOffhooking = false;
    this.isOffhook = false;
    this.isManualOffhook = false;
    this._checkBeforeunload();
  }

  onInit() {
    if (
      this._modules.evAuth.isFreshLogin ||
      !this._modules.evSessionConfig.isConfigTab
    ) {
      this.setOffhookTerm();
    }
  }

  offHook() {
    this.setOffhooking(true);
    if (this.isOffhook) {
      this.setIsManualOffhook(false);
      this._modules.evClient.offhookTerm();
    } else {
      this.setIsManualOffhook(true);
      this._modules.evClient.offhookInit();
    }
  }

  private _checkBeforeunload() {
    if (this.isOffhook) {
      this._modules.beforeunload.add(this._beforeunloadHandler);
    } else {
      this._modules.beforeunload.remove(this._beforeunloadHandler);
    }
  }
}

export { EvSettings };
