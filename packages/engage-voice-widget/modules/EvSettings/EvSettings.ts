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
    'Storage',
    { dep: 'EvSettingsOptions', optional: true },
  ],
})
class EvSettings extends RcModuleV2<DepsModules, EvSettingsState>
  implements Settings {
  constructor({
    evClient,
    evAuth,
    evSessionConfig,
    storage,
    enableCache = true,
  }) {
    super({
      modules: {
        evClient,
        evAuth,
        evSessionConfig,
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
    this.state.config = config;
  }

  @action
  setIsManualOffhook(isManualOffhook: boolean) {
    this.state.isManualOffhook = isManualOffhook;
  }

  @action
  setOffhook(status: boolean) {
    this.state.isOffhook = status;
  }

  @action
  setOffhooking(offhooking: boolean) {
    this.state.isOffhooking = offhooking;
  }

  @action
  offhookInitHandle() {
    this.state.isOffhooking = false;
    this.state.isOffhook = true;
  }

  @action
  offhookTermHandle() {
    this.state.isOffhooking = false;
    this.state.isOffhook = false;
    this.state.isManualOffhook = false;
  }

  onInit() {
    if (
      this._modules.evAuth.isFreshLogin ||
      (this._modules.evSessionConfig.tabManagerEnabled &&
        !this._modules.evSessionConfig.isConfigSuccessByLocal)
    ) {
      this.offhookTermHandle();
    }
  }

  offHook() {
    this.setOffhooking(true);
    if (this.state.isOffhook) {
      this.setIsManualOffhook(false);
      this._modules.evClient.offhookTerm();
    } else {
      this.setIsManualOffhook(true);
      this._modules.evClient.offhookInit();
    }
  }
}

export { EvSettings };
